"""Retire obsolete news, refresh the permanent calendar, and sync public references."""
from pathlib import Path
import json
import re
import subprocess
import runpy

ROOT = Path(__file__).resolve().parent.parent
helper = runpy.run_path(str(ROOT / 'internal/build-editorial-20261010.py'))
read, write, metadata, update_schema = [helper[k] for k in ['read', 'write', 'metadata', 'update_page_schema']]
data = helper['DATA']
retired = json.loads((ROOT / 'internal/retired-news-20261010.json').read_text(encoding='utf-8'))['routes']
E = helper['E']
date = data['checkedAt']
origin = helper['ORIGIN']

calendar = read('/novosti/nalogovyy-kalendar/')
entries = [
    ('2026-10-15', 'employers ip ooo', 'Взносы на травматизм за сентябрь', 'Платёж в СФР по страхованию от несчастных случаев и профзаболеваний. Проверьте начисление за сентябрь, получателя и исполнение платёжного поручения. Эти взносы не входят в ЕНП.', 'sfrPayment'),
    ('2026-10-26', 'employers ip ooo', 'РСВ и раздел 2 ЕФС-1 за девять месяцев', 'Для плательщиков соответствующих взносов. РСВ направляется в ФНС, раздел 2 ЕФС-1 — в СФР. Учитывайте свои обязанности; после отправки каждой формы проверьте итоговый ответ получателя.', 'sfrReport'),
    ('2026-10-26', 'vat ip ooo', 'Декларация по НДС за третий квартал', 'Для плательщиков и налоговых агентов при наличии соответствующей обязанности. 25 октября — воскресенье, срок переносится на понедельник. Проверьте данные книг и итоговый протокол приёма.', 'vat'),
    ('2026-10-26', 'usn ip ooo', 'Уведомление об авансе УСН за девять месяцев', 'При наличии суммы авансового платежа сверьте расчёт и реквизиты уведомления. По обычной УСН квартальную декларацию не представляют. Уведомление и платёж — отдельные действия.', 'usn'),
    ('2026-10-28', 'usn ip ooo', 'Авансовый платёж УСН за девять месяцев', 'Проверьте сумму аванса с учётом предыдущих начислений, уменьшений и применимых правил. До срока уплаты обеспечьте достаточность средств на ЕНС.', 'usn'),
    ('2026-10-28', 'vat ip ooo', 'Первая треть НДС за третий квартал', 'По общему порядку квартальный НДС уплачивается тремя частями. Для исключений порядок проверяют отдельно. Сверьте начисление с принятой декларацией.', 'vat')
]
rendered = ''
list_items = []
for i, (day, groups, title, text, source) in enumerate(entries, 1):
    ident = 'october-'+day[-2:]+'-'+str(i)
    rendered += f'<article class="tax-calendar-entry" id="{ident}" data-calendar-entry data-month="october" data-groups="{groups}"><time class="calendar-entry-date" datetime="{day}"><strong>{day[-2:]}</strong><span>октября</span></time><div class="calendar-entry-copy"><h3>{E(title)}</h3><p>{E(text)}</p></div><div class="calendar-entry-action"><a class="news-more" href="{data["sources"][source]}" target="_blank" rel="noopener noreferrer">Официальный источник ↗</a></div></article>'
    list_items.append({'@type':'ListItem','position':i,'name':day+': '+title,'url':origin+'/novosti/nalogovyy-kalendar/#'+ident})
calendar, n = re.subn(r'(<div class="tax-calendar-list">).*?(</div>\s*<p class="tax-calendar-empty")', lambda m:m[1]+rendered+m[2], calendar, count=1, flags=re.S)
assert n == 1
calendar = re.sub(r'<button[^>]*data-calendar-month="september".*?</button>', '', calendar, flags=re.S)
calendar = calendar.replace('Сентябрь — октябрь 2026', 'Октябрь 2026 · проверено 10 октября').replace('5 сроков', '6 сроков').replace('27 сентября 2026 года', '10 октября 2026 года').replace('<!-- editorial-calendar-2026-09-27 -->', '<!-- editorial-calendar-2026-10-10 -->')
calendar = re.sub(r'<aside class="calendar-hero-status.*?</aside>', '<aside class="calendar-hero-status remaining-hero-followup" aria-label="Ближайший срок"><time datetime="2026-10-15">15</time><strong>октября 2026 года</strong><span>Ближайший срок из подборки: взносы на травматизм за сентябрь. Остальные контрольные точки выберите по своим обязанностям.</span></aside>', calendar, count=1, flags=re.S)
calendar = re.sub(r'Даты сверены с официальными материалами ФНС(?: и СФР)*', 'Даты сверены с официальными материалами ФНС и СФР', calendar)
calendar = calendar.replace('Ближайшие даты отчетности, уведомлений и платежей собраны в одном месте. Выберите месяц и тип бизнеса, чтобы оставить только относящиеся к вам контрольные точки.', 'Основные контрольные точки октября 2026 года по УСН, НДС и взносам. Отфильтруйте подборку по своей задаче; полный состав обязанностей проверяйте по режиму, работникам и операциям.')
description = 'Налоговый календарь на октябрь 2026 года: сроки 15, 26 и 28 октября по взносам, НДС и УСН. Фильтры по ИП, ООО, работодателям и налогам.'
calendar = metadata(calendar, '/novosti/nalogovyy-kalendar/', 'Налоговый календарь: октябрь 2026', description)
def calendar_schema(m):
    s = json.loads(m[1])
    for node in s.get('@graph',[s]):
        if node.get('@type')=='WebPage':
            node['dateModified']=date
            node['description']=description
        if node.get('@type')=='ItemList':
            node['name']='Контрольные сроки октября 2026 года'
            node['numberOfItems']=len(entries)
            node['itemListElement']=list_items
    return '<script type="application/ld+json">'+json.dumps(s,ensure_ascii=False,separators=(',',':'))+'</script>'
calendar = re.sub(r'<script type="application/ld\+json">(.*?)</script>', calendar_schema, calendar, flags=re.S)
write('/novosti/nalogovyy-kalendar/', calendar)

# Remove stale cards completely; do not retain a false headline on a new target.
for target in ROOT.rglob('*.html'):
    if any(p.startswith('.') for p in target.relative_to(ROOT).parts) or target.relative_to(ROOT).parts[0] in ['internal','server']: continue
    route = '/'+'/'.join(target.relative_to(ROOT).parts[:-1])+'/'
    if route in retired: continue
    s = target.read_text(encoding='utf-8')
    before = s
    def replace_anchor(m):
        href = m[1]
        if href not in retired: return m[0]
        is_deadline = 'sroki-' in href or 'otchetnost-' in href
        replacement = retired[href].get('target', '/novosti/nalogovyy-kalendar/' if is_deadline else '/novosti/')
        label = 'НДС на УСН: подготовка к 2027 году' if retired[href]['status']==301 else 'Календарь октября 2026' if is_deadline else 'Актуальные новости ФНС и СФР'
        if 'class="news-card"' in m[0]:
            return f'<a class="news-card" href="{replacement}"><span>Обновлено 10.10.2026</span><b>{label}</b><small>Открыть актуальные материалы.</small></a>'
        return f'<a href="{replacement}">{label}</a>'
    s = re.sub(r'<a\b[^>]*href="([^"]+)"[^>]*>.*?</a>', replace_anchor, s, flags=re.S)
    if s != before: target.write_text(s,encoding='utf-8',newline='\n')

# The deleted files are individually validated and tracked. No recursive deletion.
for route in retired:
    target = (ROOT / route.strip('/') / 'index.html').resolve()
    assert target.is_relative_to((ROOT/'novosti').resolve())
    if target.exists():
        tracked = subprocess.check_output(['git','ls-files','--',str(target.relative_to(ROOT))],cwd=ROOT,text=True).strip()
        assert tracked, target
        target.unlink()

# Friendly deletion response; Nginx serves it internally with the original 410.
gone = read('/novosti/')
gone = re.sub(r'<main\b[^>]*>.*?</main>', '<main class="remaining-page"><section class="hero hero-inner"><div class="glass-panel hero-copy-panel"><p class="eyebrow">Публикация удалена</p><h1>Эта новость больше не актуальна</h1><p>Старую публикацию убрали. Свежие сроки и материалы доступны в разделе новостей.</p><div class="actions"><a class="button button-lime" href="/novosti/">Актуальные новости</a><a class="button button-ghost" href="/novosti/nalogovyy-kalendar/">Налоговый календарь</a></div></div></section></main>', gone, flags=re.S)
gone = re.sub(r'<script type="application/ld\+json">.*?</script>', '', gone, flags=re.S)
gone = re.sub(r'<link rel="canonical"[^>]*>', '', gone)
gone = re.sub(r'(<meta name="robots" content=")[^"]+', lambda m:m[1]+'noindex, follow', gone)
gone = re.sub(r'<title>.*?</title>', '<title>Публикация удалена | Документы для бизнеса</title>', gone)
(ROOT/'news-retired.html').write_text(gone,encoding='utf-8',newline='\n')

config = ROOT/'server/dokumenty82-legacy-routes.nginx.conf'
text = config.read_text(encoding='utf-8').split('# News retired on 2026-10-10')[0].rstrip()+'\n\n# News retired on 2026-10-10; current topic replacement only where appropriate.\nerror_page 410 /news-retired.html;\nlocation = /news-retired.html { internal; }\n'
for route, rule in retired.items():
    for variant in [route, route.rstrip('/'), route+'index.html']:
        action = 'return 410;' if rule['status']==410 else 'return 301 https://dokumenty82.ru'+rule['target']+'$is_args$args;'
        text += f'location = {variant} {{ {action} }}\n'
config.write_text(text,encoding='utf-8',newline='\n')

registry_path = ROOT/'seo-route-registry.json'
registry = json.loads(registry_path.read_text(encoding='utf-8'))
registry['version']=date
registry['indexable_routes'] = [r for r in registry['indexable_routes'] if r not in retired]
for item in data['articles']:
    if item['route'] not in registry['indexable_routes']: registry['indexable_routes'].append(item['route'])
registry['retired_routes'] = retired
registry_path.write_text(json.dumps(registry,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')

sitemap_path = ROOT/'sitemap.xml'
sitemap = sitemap_path.read_text(encoding='utf-8')
for r in retired:
    sitemap = re.sub(r'\s*<url>\s*<loc>'+re.escape(origin+r)+r'</loc>.*?</url>', '', sitemap, flags=re.S)
for item in data['articles']:
    if origin+item['route'] not in sitemap:
        sitemap = sitemap.replace('</urlset>', f'  <url><loc>{origin}{item["route"]}</loc><lastmod>{date}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>\n</urlset>')
changed = set(subprocess.check_output(['git','diff','--name-only'],cwd=ROOT,text=True).splitlines())
changed |= {i['route'].strip('/')+'/index.html' for i in data['articles']}
def lastmod(m):
    r = m[1][len(origin):]
    file = (r.strip('/')+'/' if r!='/' else '')+'index.html'
    return re.sub(r'<lastmod>.*?</lastmod>', f'<lastmod>{date}</lastmod>', m[0]) if file in changed else m[0]
sitemap = re.sub(r'<url>\s*<loc>(.*?)</loc>.*?</url>', lastmod, sitemap, flags=re.S)
sitemap_path.write_text(sitemap,encoding='utf-8',newline='\n')
print(f'Retired {len(retired)} news routes; updated calendar and sitemap ({len(registry["indexable_routes"])} pages).')
