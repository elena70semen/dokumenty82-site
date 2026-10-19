"""Apply the approved lead/content package to the current static composition."""
from pathlib import Path
import json
import os
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
STYLE = '/assets/precontract-audit.css?v=20261019-1'
LEAD_JS = '/assets/lead-form.js?v=20261019-p0-1'
AUDIT_ROUTES = ['index.html', 'ceny/index.html', 'buhgalterskie-uslugi/index.html',
                'soprovozhdenie/index.html', 'buhgalterskoe-soprovozhdenie-ooo/index.html',
                'smena-buhgaltera/index.html']
AUDIT_BLOCK = '''
<!-- d82-precontract-audit:start -->
<section class="precontract-audit" aria-labelledby="precontract-audit-title" id="free-accounting-audit">
  <div class="audit-layout">
    <div>
      <p class="audit-eyebrow">Перед регулярным сопровождением</p>
      <h2 id="precontract-audit-title">Бесплатный аудит учёта</h2>
      <p>Для ИП и ООО, которые рассматривают регулярное сопровождение.</p>
      <p>Для начала достаточно контакта и краткого описания ситуации.</p>
      <div class="audit-actions"><a class="button button-lime" href="/razbor-situacii/?service=free-audit#quick-lead">Запросить бесплатный аудит</a><a class="audit-inline-link" href="tel:+79789987222">Обсудить по телефону</a></div>
    </div>
    <div>
      <h3>Что разберём</h3>
      <ul><li>Организацию учёта и налоговый режим.</li><li>Наличие отчётности, первички и открытых вопросов.</li><li>Готовность передать учёт новому бухгалтеру.</li></ul>
      <h3>Что получите</h3>
      <p>Краткий список выявленных вопросов и ближайших действий.</p>
      <p>Предложение по составу и стоимости сопровождения.</p>
      <p>Срок и объём разбора согласуем после первого разговора.</p>
    </div>
  </div>
  <div class="audit-limit"><p>Предварительный разбор бесплатный и не обязывает заключать договор.</p><p>Это не полный аудит бухгалтерской отчётности.</p><p>Восстановление учёта и пересчёт налогов — отдельные работы.</p><p>Подготовку отчётности и ответы на требования оцениваем отдельно.</p></div>
</section>
<!-- d82-precontract-audit:end -->
'''


def after_hero(text, block):
    start = text.index('<main')
    depth = 0
    for match in re.finditer(r'<(/?)section\b[^>]*>', text[start:], re.I):
        depth += -1 if match[1] else 1
        if depth == 0:
            position = start + match.end()
            return text[:position].rstrip() + '\n' + block.strip() + '\n' + text[position:].lstrip('\n')
    raise ValueError('Hero section not found')


def write(name, transform):
    page = ROOT / name
    old = page.read_text(encoding='utf-8')
    new = transform(old)
    if new != old:
        temporary = page.with_name(page.name + '.lead-content-tmp')
        assert temporary.resolve().is_relative_to(ROOT.resolve())
        temporary.write_text(new, encoding='utf-8', newline='\n')
        os.replace(temporary, page)


def sync_article_metadata(text):
    def update(match):
        data = json.loads(match[2])
        def visit(value):
            if isinstance(value, dict):
                if value.get('@type') in ('Article', 'NewsArticle', 'WebPage'):
                    value['dateModified'] = '2026-10-19'
                for item in value.values(): visit(item)
            elif isinstance(value, list):
                for item in value: visit(item)
        visit(data)
        return match[1] + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + match[3]
    return re.sub(r'(<script[^>]*type="application/ld\+json"[^>]*>)(.*?)(</script>)', update, text, flags=re.S)


def apply():
    for name in AUDIT_ROUTES:
        def audit(text):
            text = re.sub(r'\n*<!-- d82-precontract-audit:start -->.*?<!-- d82-precontract-audit:end -->\n*', '\n', text, flags=re.S)
            return after_hero(text, AUDIT_BLOCK)
        write(name, audit)
    write('index.html', lambda t: t.replace(
        'Первый полный период учёта для нового бизнеса, затем регулярное сопровождение.',
        'Регулярное ведение учёта, налогов и отчётности по согласованному составу.'))
    note = '<div class="accounting-payment-note"><p>Первый полный месяц — по согласованному месячному тарифу.</p><p>Отдельной платы за подключение нет.</p><p>Восстановление прошлых периодов оцениваем отдельно.</p></div>'
    for name in ['index.html', 'ceny/index.html']:
        def payment(text):
            text = re.sub(r'<p class="accounting-payment-note">.*?</p>', '', text, flags=re.S)
            return text.replace('<div class="audit-actions">', note + '\n<div class="audit-actions">', 1)
        write(name, payment)

    write('razbor-situacii/index.html', lambda t: t.replace(
        '<input type="hidden" name="source_page" value="/razbor-situacii/" />',
        '<input type="hidden" name="source_page" value="/razbor-situacii/" />\n        <input type="hidden" name="lead_type" value="" />') if 'name="lead_type"' not in t else t)
    def audit_forms(text):
        if 'value="Бесплатный аудит перед сопровождением"' not in text:
            text = text.replace('<option value="Подбор бухгалтерских услуг">', '<option value="Бесплатный аудит перед сопровождением">Бесплатный аудит перед сопровождением</option>\n              <option value="Подбор бухгалтерских услуг">', 1)
        business = '<label data-audit-business hidden>Форма бизнеса (необязательно)<select name="business_form"><option value="unknown">Уточним при разговоре</option><option value="ip">ИП</option><option value="ooo">ООО</option></select></label>'
        context = '<p class="lead-audit-context" data-audit-context hidden>Тема: бесплатный аудит учёта перед сопровождением. Для начала достаточно контакта и краткой задачи; документы необязательны.</p>'
        def form(match):
            block = match[0]
            if 'data-audit-context' not in block:
                block = re.sub(r'(<form\b[^>]*>)', r'\1\n' + context, block, count=1)
                block = block.replace('<div class="form-grid">', '<div class="form-grid">\n' + business, 1)
            return block
        return re.sub(r'<form\b[^>]*data-lead-form="amo"[^>]*>.*?</form>', form, text, flags=re.S)
    write('razbor-situacii/index.html', audit_forms)

    old_tax = 'На 10 октября 2026 года действующий порог освобождения — 20 млн рублей. Для освобождения с начала 2027 года доход 2026 года сравнивают с 15 млн рублей. Поэтому годовой прогноз проверяем отдельно от текущего месяца.'
    new_tax = 'Проверено 19 октября 2026 года: для освобождения с начала 2027 года доход за 2026 год сравнивают с 20 млн рублей. Текущий доход 2027 года также контролируют относительно 20 млн рублей. Год дохода и год применения освобождения учитываем отдельно.'
    def tax_service(text):
        text = text.replace(old_tax, new_tax)
        if 'data-tax-source="20261019"' not in text:
            text = text.replace('<a class="button button-ghost" href="/novosti/nds-usn-podgotovka-2027/">',
                '<p class="form-note" data-tax-source="20261019">Основание: <a href="https://nalog.garant.ru/fns/nk/3780a465c57513165f942ba713db0691/" target="_blank" rel="noopener noreferrer">пункты 1 и 5 статьи 145 НК РФ</a>, редакция после закона от 04.07.2026 № 228-ФЗ.</p><a class="button button-ghost" href="/novosti/nds-usn-podgotovka-2027/">')
        return text
    write('nds-pri-usn-2026/index.html', tax_service)
    replacements = {
        'порог освобождения от НДС 15 млн рублей': 'порог освобождения от НДС 20 млн рублей',
        'Порог освобождения от НДС для 2027 года отличается от действующего порога 2026 года.': 'Для 2027 года сохраняется порог 20 млн рублей; отдельно проверяют доход прошлого года и превышение в текущем году.',
        'Разделяйте пороги 2026 и 2027 годов': 'Проверяйте доход прошлого и текущего года',
        'По действующей информации ФНС в 2026 году порог освобождения — 20 млн рублей. Для освобождения с начала 2027 года оценивается доход за 2026 год относительно 15 млн рублей. С 2028 года предусмотрен порог 10 млн рублей. Различайте год, за который определяют доход, и год применения освобождения.': 'По пункту 1 статьи 145 НК РФ для освобождения с начала 2027 года доход за 2026 год должен быть не выше 20 млн рублей. По пункту 5 той же статьи при превышении 20 млн рублей в течение 2027 года обязанности плательщика НДС возникают с первого числа следующего месяца. Закон от 04.07.2026 № 228-ФЗ сохраняет текущий порог 20 млн рублей на 2026–2029 годы. Прежняя шкала 15 млн в 2027 году и 10 млн с 2028 года больше не применяется.',
    }
    def tax_article(text):
        for old, new in replacements.items(): text = text.replace(old, new)
        if 'data-tax-checked' not in text:
            text = text.replace('</h1>', '</h1><p class="form-note" data-tax-checked="20261019">Обновлено 19 октября 2026 года. Проверено по <a href="https://nalog.garant.ru/fns/nk/3780a465c57513165f942ba713db0691/" target="_blank" rel="noopener noreferrer">статье 145 НК РФ</a> и <a href="https://www.nalog.gov.ru/rn58/news/activities_fts/16640074/" target="_blank" rel="noopener noreferrer">разъяснению ФНС</a>.</p>', 1)
        return sync_article_metadata(text)
    write('novosti/nds-usn-podgotovka-2027/index.html', tax_article)
    def source_data(text):
        for old,new in {**replacements, old_tax:new_tax}.items(): text=text.replace(old,new)
        return text
    write('internal/editorial-20261010.json', source_data)
    write('internal/editorial-20261010.json', lambda t: re.sub(
        r'("vatUsn"\s*:\s*")[^"]+',
        r'\1https://nalog.garant.ru/fns/nk/3780a465c57513165f942ba713db0691/', t))

    def promotion_terms(text):
        text = text.replace('Бесплатная экспресс-диагностика', 'Предварительный разбор бизнеса')
        text = text.replace('3 риска. 3 точки роста. 3 первых шага.', 'Риски и ближайшие действия — по вашей ситуации.')
        text = text.replace('три заметных риска', 'заметные риски').replace('три возможные точки роста', 'возможные точки роста').replace('три ближайших действия', 'ближайшие действия')
        text = text.replace('Собираем стартовый маршрут бизнеса и при подходящем составе работ добавляем сайт-визитку в качестве подарка.', 'Согласуем регистрацию, документы и цифровые инструменты для запуска. Состав пакета, срок и стоимость фиксируем в договоре.')
        if 'class="promotion-terms-note"' not in text:
            text = text.replace('<section class="remaining-content-section section promotions-section', '<section class="remaining-content-section section promotions-section', 1)
            text = re.sub(r'(<h1\b[^>]*>.*?</h1>)', r'\1<p class="promotion-terms-note">Скидка 50% действует на условиях отдельной акции. Остальные карточки — услуги: их состав, сроки и стоимость согласуем до начала работы.</p>', text, count=1, flags=re.S)
        # The current collection has eight visible service cards, no referral bonus card.
        text = re.sub(r'<option value="Рекомендация с выгодой для двоих">.*?</option>', '', text, flags=re.S)
        def schema(match):
            data=json.loads(match[2])
            for item in data.get('@graph',[]):
                if item.get('@type')=='ItemList':
                    item['itemListElement']=[x for x in item.get('itemListElement',[]) if not str(x.get('url','')).endswith('#offer-9')]
                    item['numberOfItems']=len(item['itemListElement'])
            return match[1]+json.dumps(data,ensure_ascii=False,separators=(',',':'))+match[3]
        return re.sub(r'(<script[^>]*type="application/ld\+json"[^>]*>)(.*?)(</script>)', schema, text, flags=re.S)
    write('akcii/index.html', promotion_terms)
    def upload_policy(text):
        old = 'Сначала лучше согласовать безопасный канал. Открытая публичная передача чувствительных файлов не рекомендуется.'
        new = 'Файлы в форме заявки необязательны. Приложенные документы используем для разбора вашего обращения. Если материалы содержат чувствительные персональные сведения, сначала согласуйте их передачу со специалистом. Не отправляйте пароли, SMS-коды и секреты доступа.'
        return text.replace(old, new)
    write('policy/index.html', upload_policy)

    files=subprocess.check_output(['git','ls-files','*.html'],cwd=ROOT,text=True).splitlines()
    for name in files:
        if name.startswith('internal/'): continue
        def assets(text):
            text=re.sub(r'/assets/lead-form\.js(?:\?[^"\s<>]*)?',LEAD_JS,text)
            text=text.replace('https://t.me/centr_reg','https://t.me/+79789987222')
            if name in AUDIT_ROUTES+['razbor-situacii/index.html'] and STYLE not in text:
                text=text.replace('</head>',f'    <link rel="stylesheet" href="{STYLE}" />\n</head>',1)
            return text
        write(name,assets)
    print('Lead/content package applied')


if __name__ == '__main__':
    apply()
