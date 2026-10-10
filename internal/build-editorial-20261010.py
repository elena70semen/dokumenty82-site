"""Publish the reviewed October content without regenerating forms or the site shell.

Run with Python 3 from any directory. Data and retirement decisions are versioned;
deleted pages remain recoverable in Git and in the previous server release.
"""
from pathlib import Path
import json
import re
import html

ROOT = Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / 'internal/editorial-20261010.json').read_text(encoding='utf-8'))
DATE = DATA['checkedAt']
ORIGIN = 'https://dokumenty82.ru'
E = html.escape


def read(route):
    return (ROOT / route.strip('/') / 'index.html').read_text(encoding='utf-8')


def write(route, value):
    target = ROOT / route.strip('/') / 'index.html'
    target.parent.mkdir(parents=True, exist_ok=True)
    value = re.sub(r'^[ \t]+$', '', value, flags=re.M)
    target.write_text(value, encoding='utf-8', newline='\n')


def art(name, role='remaining-section-art', eager=False):
    folder = '/assets/remaining-heroes-v2/'
    assert (ROOT / (folder + name + '.webp').lstrip('/')).is_file(), name
    alt = {'reuse-otchetnost': 'Отчётность и документы бизнеса', 'nds-pri-usn-2026': 'Учёт НДС при УСН', 'smena-buhgaltera': 'Передача учёта новому бухгалтеру', 'sdacha-otchetnosti-ooo': 'Подготовка и проверка отчётности ООО'}[name]
    return f'<figure class="{role}"><img src="{folder}{name}.webp" srcset="{folder}{name}-640.webp 640w, {folder}{name}.webp 1672w" sizes="(max-width: 980px) 100vw, 50vw" alt="{E(alt)}" width="1672" height="941" loading="{"eager" if eager else "lazy"}" decoding="async" /></figure>'


def links(items):
    return '<div class="actions">' + ''.join(f'<a class="button button-ghost" href="{r}">{E(t)}</a>' for r, t in items) + '</div>'


def section(title, intro, cards, image=None, extra='', section_id=''):
    card_html = ''.join(f'<article class="glass-card rich-card"><span>{i:02}</span><h3>{E(t)}</h3><p>{E(p)}</p></article>' for i, (t, p) in enumerate(cards, 1))
    return f'<section class="remaining-content-section section page-rich-section"{f" id={chr(34)}{section_id}{chr(34)}" if section_id else ""}><div class="remaining-section-inner">{art(image) if image else ""}<div class="section-header"><p class="eyebrow">Практика · 10 октября 2026</p><h2>{E(title)}</h2><p>{E(intro)}</p></div><div class="card-grid two rich-card-grid">{card_html}</div>{extra}</div></section>'


def metadata(s, route, title, description):
    s = re.sub(r'<title>.*?</title>', '<title>' + E(title) + ' | Документы для бизнеса</title>', s)
    for attr, key, value in [('name', 'description', description), ('property', 'og:title', title), ('property', 'og:description', description), ('property', 'og:url', ORIGIN + route)]:
        s = re.sub(rf'(<meta {attr}="{key}" content=")[^"]*("[^>]*>)', lambda m: m[1] + E(value, quote=True) + m[2], s)
    s = re.sub(r'(<link rel="canonical" href=")[^"]+', lambda m: m[1] + ORIGIN + route, s)
    return s


def update_page_schema(s, route, title=None, description=None):
    def transform(match):
        data = json.loads(match[1])
        for node in data.get('@graph', [data]):
            if node.get('@type') in ['WebPage', 'CollectionPage', 'Article', 'NewsArticle']:
                node['dateModified'] = DATE
                if title: node['name'] = title
                if description: node['description'] = description
        return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '</script>'
    return re.sub(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', transform, s, flags=re.S)


# Keep the current header, footer, styles, controls and contactability scripts.
template = read('/blog/').replace('<!-- editorial-current-2026-10-10 -->', '')
articles = DATA['articles']
for item in articles:
    route = item['route']
    title = item['title']
    body = ''
    for entry in item['sections']:
        refs = entry.get('sources', [entry['source']] if entry.get('source') else [])
        citations = ''.join(f'<a href="{DATA["sources"][key]}" target="_blank" rel="noopener noreferrer">{E(key_to_label)}</a> ' for key, key_to_label in [(k, {'sfrPayment': 'Срок у СФР', 'sfrReport': 'Отчётность СФР', 'vat': 'Порядок НДС у ФНС', 'rsv': 'РСВ у ФНС', 'usn': 'Порядок УСН у ФНС', 'vatUsn': 'НДС при УСН: ФНС'}[k]) for k in refs])
        body += f'<article class="glass-card rich-card"><h3>{E(entry["title"])}</h3><p>{E(entry["text"])}</p>{f"<p class=source-note>{citations}</p>" if citations else ""}</article>'
    main = f'''<!-- editorial-current-2026-10-10 --><main class="remaining-page">
    <section class="hero hero-inner remaining-hero"><div class="glass-panel hero-copy-panel"><p class="eyebrow">{'Новости и сроки' if item['kind'] == 'news' else 'Практическая памятка'} · <time datetime="{DATE}">10 октября 2026</time></p><h1>{E(title)}</h1><p>{E(item['summary'])}</p><div class="news-tags">{''.join('<span>'+E(t)+'</span>' for t in item['tags'])}</div>{links([('/novosti/' if item['kind']=='news' else '/blog/', 'Все материалы'), ('/razbor-situacii/', 'Обсудить задачу')])}</div>{art(item['image'], 'remaining-hero-visual', True)}</section>
    <section class="remaining-content-section section page-rich-section"><div class="remaining-section-inner"><div class="section-header"><p class="eyebrow">По шагам</p><h2>{'Сроки и действия' if item['kind']=='news' else 'Что проверить'}</h2><p>Материал подготовлен 10 октября 2026 года. Сопоставьте каждый пункт со своей ситуацией.</p></div><div class="card-grid two rich-card-grid">{body}</div></div></section>
    <section class="remaining-content-section section page-rich-section"><div class="remaining-section-inner"><div class="section-header"><p class="eyebrow">Контрольный список</p><h2>{'До завершения отчётного периода' if 'otchetnost-9' in route else 'Что зафиксировать по результату проверки'}</h2></div><div class="glass-card rich-card"><ul class="rich-list">{''.join('<li>'+E(p)+'</li>' for p in item['checklist'])}</ul></div></div></section>
    <section class="remaining-content-section section page-rich-section"><div class="remaining-section-inner"><div class="section-header"><p class="eyebrow">По вашей задаче</p><h2>Связанные материалы и помощь специалиста</h2></div>{links(item['related'])}</div></section></main>'''
    s = re.sub(r'<main\b[^>]*>.*?</main>', lambda _: main, template, flags=re.S)
    s = metadata(s, route, title, item['description'])
    graph = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', template, re.S)[1])['@graph']
    graph = [n for n in graph if n.get('@type') not in ['WebPage', 'CollectionPage', 'BreadcrumbList']]
    graph += [{'@type': 'WebPage', '@id': ORIGIN+route+'#webpage', 'url': ORIGIN+route, 'name': title, 'description': item['description'], 'dateModified': DATE, 'isPartOf': {'@id': ORIGIN+'/#website'}}, {'@type': 'NewsArticle' if item['kind']=='news' else 'Article', 'headline': title, 'description': item['summary'], 'datePublished': DATE, 'dateModified': DATE, 'mainEntityOfPage': {'@id': ORIGIN+route+'#webpage'}, 'image': ORIGIN+'/assets/remaining-heroes-v2/'+item['image']+'.webp', 'author': {'@type':'Organization', 'name':'Документы для бизнеса', 'url':ORIGIN+'/o-proekte/'}, 'publisher': {'@id':ORIGIN+'/#business'}, 'inLanguage':'ru-RU'}]
    s = re.sub(r'<script type="application/ld\+json">.*?</script>', '', s, flags=re.S)
    s = s.replace('</head>', '<script type="application/ld+json">'+json.dumps({'@context':'https://schema.org','@graph':graph}, ensure_ascii=False, separators=(',', ':'))+'</script>\n</head>')
    write(route, s)

for item in DATA['serviceRefresh']:
    s = read(item['route'])
    extra = links(item['links'])
    if item.get('source'):
        extra += f'<p class="source-note">Проверено 10 октября 2026: <a href="{DATA["sources"][item["source"]]}" target="_blank" rel="noopener noreferrer">официальные правила ФНС</a>.</p>'
    new_section = section(item['title'], item['intro'], item['cards'], extra=extra, section_id='editorial-practice')
    # Replace a whole standalone section, retaining the surrounding shell verbatim.
    sections = list(re.finditer(r'<section\b[^>]*>.*?</section>', s, re.S))
    target = next((m for m in sections if 'id="editorial-practice"' in m[0]), None)
    if target is None:
        target = next((m for m in sections if re.search(r'<h2\b[^>]*>'+re.escape(item['replaceHeading'])+r'</h2>', m[0])), None)
    if target is None: raise ValueError('Missing replacement section '+item['route'])
    assert '<form' not in target[0]
    if 'service-section' in target[0]:
        new_section = new_section.replace('class="remaining-content-section section page-rich-section"', 'class="service-section"').replace('class="remaining-section-inner"', 'class="container"')
    s = s[:target.start()] + new_section + s[target.end():]
    if item['route']=='/blog/razbory/':
        s = re.sub(r' id="orientation-detail-0[1-4]"', '', s)
        counter = [0]
        def orientation_id(m):
            if counter[0] >= 4: return m[0]
            counter[0] += 1
            return m[0][:-1]+f' id="orientation-detail-{counter[0]:02}">'
        s = re.sub(r'<article class="glass-card rich-card">', orientation_id, s)
    s = update_page_schema(s, item['route'])
    write(item['route'], s)

# Hub cards carry concise original summaries, not repeated article paragraphs.
card_summaries = {
    '/novosti/otchetnost-9-mesyacev-oktyabr-2026/': '15, 26 и 28 октября: разделяем сдачу форм, уведомления и платежи.',
    '/novosti/nds-usn-podgotovka-2027/': 'Проверяем годовой доход и договоры перед изменением порога освобождения.',
    '/blog/peredacha-ucheta-checklist/': 'База, документы, отчёты и доступы в одном реестре передачи.',
    '/blog/kak-proverit-priem-otchetnosti/': 'Какие подтверждения сохранить после отправки и что делать с отказом.'
}


def article_cards(selected):
    return ''.join(f'<a class="glass-card rich-card" href="{i["route"]}">{art(i["image"], "remaining-card-art")}<p class="eyebrow"><time datetime="2026-10-10">10 октября 2026</time></p><h3>{E(i["title"])}</h3><p>{card_summaries[i["route"]]}</p></a>' for i in selected)


for route, title, intro, selected in [('/novosti/', 'Новости и сроки для бизнеса', 'Проверено на 10 октября 2026 года: отчётность за девять месяцев и подготовка налоговых решений на следующий год.', articles[:2]), ('/blog/', 'Блог: документы, учёт и контроль результата', 'Практические памятки для собственника и руководителя: как передать учёт и проверить, что отчёты действительно приняты.', articles[2:])]:
    s = read(route)
    hero = re.search(r'<main\b[^>]*>\s*(<section\b[^>]*>.*?</section>)', s, re.S)[1]
    hero = re.sub(r'<h1>.*?</h1>', '<h1>'+title+'</h1>', hero, count=1, flags=re.S)
    hero = re.sub(r'(<h1>.*?</h1>\s*)<p>.*?</p>', lambda m:m[1]+'<p>'+intro+'</p>', hero, count=1, flags=re.S)
    current = f'<section class="remaining-content-section section page-rich-section"><div class="remaining-section-inner"><div class="section-header"><p class="eyebrow">Обновлено 10 октября 2026</p><h2>{"Актуальные публикации" if route=="/novosti/" else "Памятки для работы"}</h2></div><div class="card-grid two rich-card-grid">{article_cards(selected)}</div></div></section>'
    second = f'<section class="remaining-content-section section page-rich-section"><div class="remaining-section-inner"><div class="section-header"><p class="eyebrow">{"Ближайшие даты" if route=="/novosti/" else "Налоги этой осенью"}</p><h2>{"Календарь октября 2026" if route=="/novosti/" else "Официальные сроки и налоговые правила"}</h2><p>{"Фильтры по режиму и работникам помогают выделить свои обязанности." if route=="/novosti/" else "Новости с проверенными источниками вынесены отдельно от практических инструкций."}</p></div>{links([('/novosti/nalogovyy-kalendar/', 'Открыть календарь'), ('/blog/razbory/', 'Разборы по ситуациям')])}</div></section>'
    if route=='/blog/': second += f'<section class="remaining-content-section section page-rich-section"><div class="remaining-section-inner"><div class="card-grid two rich-card-grid">{article_cards(articles[:2])}</div></div></section>'
    conclusion = section('Как пользоваться материалами', 'Выберите вопрос, который нужно решить сейчас. Инструкция помогает собрать исходные данные; состав работы по конкретной организации согласуем после проверки.', [('Сроки и формы', 'Даты публикаций и проверки указаны отдельно. Для ближайших обязательств открывайте календарь с применимыми фильтрами.'), ('Решение по документам', 'Для разбора нужны форма, период и описание ситуации. Файл с чувствительными данными передавайте только согласованным способом.')], extra=links([('/razbor-situacii/', 'Обсудить документы'), ('/smena-buhgaltera/', 'Смена бухгалтера'), ('/otvet-na-trebovanie-ifns/', 'Ответ ИФНС')]))
    # Avoid reusing long concluding copy verbatim across hubs.
    if route=='/novosti/': conclusion = section('От официального срока к рабочему плану', 'Для каждой применимой обязанности отмечайте ответственного, состояние данных и подтверждение результата. Список дат сам по себе не заменяет подготовку.', [('Перед отправкой', 'Выберите актуальную форму, проверьте период и согласуйте цифры с учётными данными.'), ('После отправки', 'Сохраните ответы получателя и отдельно проверьте исполнение платежей по вашей системе налогообложения.')], extra=links([('/sdacha-otchetnosti-ip/', 'Отчётность ИП'), ('/sdacha-otchetnosti-ooo/', 'Отчётность ООО')]))
    if route=='/novosti/':
        conclusion += section('Как читаем официальное сообщение', 'Сначала проверяем источник и дату, затем переводим правило в список действий. Публикация на сайте не означает, что обязанность возникает у каждого читателя.', [('Дата публикации и дата действия', 'Новость может описывать уже действующий порядок или будущие изменения. Для решения важна дата вступления правила в силу и отчётный период, к которому оно относится.'), ('Круг плательщиков', 'Отмечаем режим, работников и операции, на которые распространяется сообщение. Особые условия конкретного региона или меры поддержки не переносим на всех предпринимателей.'), ('Что подготовить', 'Вместе с датой определяем исходные сведения, подтверждения и ответственного. Если нужных документов нет, их получение становится отдельной задачей до отправки формы.'), ('Как проверить результат', 'После выполнения сохраняем подтверждения. Статус отправки, приём отчёта и уплата налога контролируются по отдельности; при расхождении возвращаемся к конкретной операции.')])
    else:
        conclusion += section('С какого вопроса начать разбор', 'Подготовьте описание ситуации до выбора шаблона или услуги. Это помогает прочитать памятку применительно к вашей задаче.', [('Что произошло', 'Название документа, отправитель и период дают больше информации, чем общая просьба «разобраться с налогами». Если документа нет, опишите действие, которое хотите выполнить.'), ('Какие материалы уже есть', 'Отметьте выписки, базу, первичку и ответы контролирующего органа. Отдельно укажите, чего не хватает и у кого можно запросить недостающий материал.'), ('Какой результат нужен', 'Разделяйте подготовку документа, проверку отправленной формы и исправление прошлого учёта. У этих задач разные исходные данные и критерии завершения.'), ('Когда требуется действие', 'Если срок указан в письме, зафиксируйте его вместе с датой получения. Для плановой передачи учёта согласуйте период, который завершает прежний исполнитель.')])
    s = re.sub(r'<!-- editorial-(?:blog|news)-[^>]*-->', '', s)
    s = s.replace('<!-- editorial-current-2026-10-10 -->', '')
    s = re.sub(r'<main\b[^>]*>.*?</main>', lambda _: '<!-- editorial-current-2026-10-10 --><main class="remaining-page">'+hero+current+second+conclusion+'</main>', s, flags=re.S)
    s = metadata(s, route, title, intro)
    s = update_page_schema(s, route, title, intro)
    write(route, s)

print('Updated four editorial articles, nine service/guide pages and two hubs.')
