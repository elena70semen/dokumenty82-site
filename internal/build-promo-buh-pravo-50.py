"""Build the accounting + legal promotion landing from the current site shell."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "akcii" / "index.html"
TARGET = ROOT / "buhgalteriya-pravo-50" / "index.html"
URL = "https://dokumenty82.ru/buhgalteriya-pravo-50/"
TITLE = "Бухгалтерия + право со скидкой 50% в Симферополе | Документы для бизнеса"
DESCRIPTION = (
    "Бухгалтерское и юридическое сопровождение ИП и малого бизнеса по единому договору. "
    "Скидка 50% на каждый платёж весь срок договора. Состав и стоимость согласуем до начала работы."
)


def build():
    source = SOURCE.read_text(encoding="utf-8")
    head, rest = source.split("    <main class=\"remaining-page\">", 1)
    _, tail = rest.split("    </main>", 1)
    head = head.replace(
        "<title>Акции для бизнеса в Симферополе | Документы для бизнеса</title>",
        f"<title>{TITLE}</title>",
    ).replace(
        '<meta name="description" content="Акции для бизнеса в Симферополе: безопасная смена бухгалтера, диагностика рисков, бизнес-старт, бухгалтерия и право, документы по объекту." />',
        f'<meta name="description" content="{DESCRIPTION}" />',
    ).replace(
        'href="https://dokumenty82.ru/akcii/"',
        f'href="{URL}"',
        1,
    ).replace(
        '<meta property="og:title" content="Акции и специальные предложения для бизнеса" />',
        f'<meta property="og:title" content="{TITLE}" />',
    ).replace(
        '<meta property="og:description" content="Понятные предложения для старта, смены бухгалтера, проверки рисков и комплексного сопровождения бизнеса." />',
        f'<meta property="og:description" content="{DESCRIPTION}" />',
    ).replace(
        '<meta property="og:url" content="https://dokumenty82.ru/akcii/" />',
        f'<meta property="og:url" content="{URL}" />',
    )
    schema_start = head.index('    <script type="application/ld+json">')
    schema_end = head.index('</script>', schema_start) + len('</script>')
    schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": URL + "#webpage",
        "url": URL,
        "name": TITLE,
        "description": DESCRIPTION,
        "inLanguage": "ru-RU",
        "isPartOf": {"@id": "https://dokumenty82.ru/#website"},
        "about": {"@id": "https://dokumenty82.ru/#business"},
    }
    head = head[:schema_start] + (
        '    <script type="application/ld+json">'
        + json.dumps(schema, ensure_ascii=False, separators=(",", ":"))
        + '</script>'
    ) + head[schema_end:]
    head = head.replace(
        "  </head>",
        '    <meta property="og:image" content="https://dokumenty82.ru/assets/promo-buh-pravo-50/hero.webp" />\n'
        '    <link rel="stylesheet" href="/assets/promo-buh-pravo-50.css?v=20261001-2" />\n'
        "  </head>",
        1,
    )
    main = '''    <main class="remaining-page promo-landing">
      <section class="hero hero-inner remaining-hero promo-hero" aria-labelledby="promo-title">
        <div class="glass-panel hero-copy-panel promo-hero-copy">
          <p class="eyebrow">Комплексное сопровождение · Симферополь и Крым</p>
          <h1 id="promo-title">Бухгалтерия и право.<br />Один договор.</h1>
          <p class="promo-offer-line"><span>−50%</span> на каждый платёж в течение всего срока договора</p>
          <p class="promo-lede">Помогаем решать бухгалтерские и юридические задачи ИП и малого бизнеса согласованно. Состав работ и стоимость обоих направлений фиксируем до начала сопровождения.</p>
          <p class="promo-hero-note">Акция действует с 28 сентября 2026 года без даты окончания.</p>
          <div class="actions"><a class="button button-lime" href="#zayavka">Обсудить комплексное сопровождение</a><a class="button button-ghost" href="tel:+79789987222">Позвонить</a></div>
          <a class="promo-text-link" href="#usloviya">Как действует скидка <span aria-hidden="true">→</span></a>
        </div>
        <figure class="remaining-hero-visual promo-hero-visual"><img src="/assets/promo-buh-pravo-50/hero.webp" srcset="/assets/promo-buh-pravo-50/hero-640.webp 640w, /assets/promo-buh-pravo-50/hero.webp 1280w" sizes="(max-width: 980px) calc(100vw - 48px), (max-width: 1536px) 44vw, 680px" alt="Бухгалтерские документы и деловой договор на одном столе" width="1280" height="853" loading="eager" fetchpriority="high" decoding="async" /></figure>
      </section>

      <section class="section promo-section" aria-labelledby="promo-value-title">
        <div class="section-header"><p class="eyebrow">Совместная работа</p><h2 id="promo-value-title">Когда бухгалтерия и право работают согласованно</h2><p>Договоры, первичные документы, платежи и отчётность связаны. Мы собираем эти вопросы в один рабочий план, чтобы важные изменения не оставались между специалистами.</p></div>
        <div class="promo-grid promo-grid-three">
          <article class="glass-card promo-card"><figure class="promo-card-media"><img src="/assets/promo-buh-pravo-50/documents.webp" srcset="/assets/promo-buh-pravo-50/documents-640.webp 640w, /assets/promo-buh-pravo-50/documents.webp 1280w" sizes="(max-width: 700px) 100vw, 32vw" alt="Первичные документы, бухгалтерская книга и калькулятор" width="1280" height="853" loading="lazy" decoding="async" /></figure><div class="promo-card-body"><h3>Документы и учёт</h3><p>Уточняем условия сделки и документы, затем отражаем операции и готовим обязательные расчёты по согласованному составу.</p></div></article>
          <article class="glass-card promo-card"><figure class="promo-card-media"><img src="/assets/promo-buh-pravo-50/tax-legal.webp" srcset="/assets/promo-buh-pravo-50/tax-legal-640.webp 640w, /assets/promo-buh-pravo-50/tax-legal.webp 1280w" sizes="(max-width: 700px) 100vw, 32vw" alt="Налоговые расчёты рядом с деловым договором" width="1280" height="853" loading="lazy" decoding="async" /></figure><div class="promo-card-body"><h3>Налоги и правовые вопросы</h3><p>Если решение затрагивает документы и налоги, разбираем их взаимное влияние до согласования действий.</p></div></article>
          <article class="glass-card promo-card"><figure class="promo-card-media"><img src="/assets/promo-buh-pravo-50/shared-plan.webp" srcset="/assets/promo-buh-pravo-50/shared-plan-640.webp 640w, /assets/promo-buh-pravo-50/shared-plan.webp 1280w" sizes="(max-width: 700px) 100vw, 32vw" alt="Рабочий план между бухгалтерскими и договорными документами" width="1280" height="853" loading="lazy" decoding="async" /></figure><div class="promo-card-body"><h3>Один рабочий план</h3><p>Фиксируем задачи, обмен информацией, стоимость и зоны ответственности в едином договоре.</p></div></article>
        </div>
      </section>

      <section class="section promo-section" aria-labelledby="promo-scope-title">
        <div class="section-header"><p class="eyebrow">Состав сопровождения</p><h2 id="promo-scope-title">Что входит в комплекс</h2><p>Оба направления работают по одному договору. Конкретный объём согласуем после оценки ваших задач.</p></div>
        <div class="promo-grid promo-grid-two">
          <article class="glass-card promo-card"><figure class="promo-card-media"><img src="/assets/promo-buh-pravo-50/accounting.webp" srcset="/assets/promo-buh-pravo-50/accounting-640.webp 640w, /assets/promo-buh-pravo-50/accounting.webp 1280w" sizes="(max-width: 700px) 100vw, 48vw" alt="Бухгалтерская книга, расчёты и упорядоченная первичка" width="1280" height="853" loading="lazy" decoding="async" /></figure><div class="promo-card-body"><p class="promo-card-kicker">Учёт и отчётность</p><h3>Бухгалтерское сопровождение</h3><p>Определяем регулярные участки учёта, отчётность, налоги, работу с первичными документами и, при необходимости, задачи по сотрудникам. Состав зависит от формы бизнеса, режима и нагрузки.</p><div class="promo-card-links"><a href="/soprovozhdenie/">Бухгалтерия ИП</a><a href="/buhgalterskoe-soprovozhdenie-ooo/">Бухгалтерия ООО</a></div></div></article>
          <article class="glass-card promo-card"><figure class="promo-card-media"><img src="/assets/promo-buh-pravo-50/legal.webp" srcset="/assets/promo-buh-pravo-50/legal-640.webp 640w, /assets/promo-buh-pravo-50/legal.webp 1280w" sizes="(max-width: 700px) 100vw, 48vw" alt="Подготовленные деловые договоры и документы" width="1280" height="853" loading="lazy" decoding="async" /></figure><div class="promo-card-body"><p class="promo-card-kicker">Договоры и документы</p><h3>Юридическое сопровождение</h3><p>Согласуем, какие текущие договоры, документы и правовые вопросы бизнеса требуют сопровождения. Перечень работ, объём и границы фиксируем в том же договоре.</p><p class="promo-card-foot">Разовые и дополнительные задачи обсуждаем отдельно, если они не входят в согласованный состав.</p></div></article>
        </div>
      </section>

      <section class="section promo-section promo-discount" id="usloviya" aria-labelledby="promo-discount-title">
        <div class="promo-feature-intro"><div class="section-header"><p class="eyebrow">Условия акции</p><h2 id="promo-discount-title">Как действует скидка 50%</h2><p>Скидка относится к общей стоимости регулярного бухгалтерского и юридического сопровождения по единому договору.</p></div><figure class="promo-section-art"><img src="/assets/promo-buh-pravo-50/discount.webp" srcset="/assets/promo-buh-pravo-50/discount-640.webp 640w, /assets/promo-buh-pravo-50/discount.webp 1280w" sizes="(max-width: 800px) 100vw, 40vw" alt="Единый договор и последовательность регулярных платежей" width="1280" height="853" loading="lazy" decoding="async" /></figure></div>
        <ol class="promo-steps">
          <li><span>01</span><p>Оцениваем бухгалтерскую нагрузку и юридические задачи, согласуем регулярный состав обоих направлений.</p></li>
          <li><span>02</span><p>До подписания договора показываем обычную стоимость согласованного комплекса, сумму скидки 50% и итоговую стоимость.</p></li>
          <li><span>03</span><p>Закрепляем условия в едином договоре; скидка применяется <strong>к каждому платежу в течение всего срока этого договора</strong>.</p></li>
        </ol>
        <p class="promo-condition-note">Акция действует с 28.09.2026 без даты окончания. Конкретные услуги, стоимость и порядок оплаты указываются в договоре. На разовые услуги условие 50% автоматически не распространяется.</p>
        <a class="button button-lime" href="#zayavka">Обсудить состав и стоимость</a>
      </section>

      <section class="section promo-section promo-onboarding" aria-labelledby="promo-process-title">
        <div class="promo-feature-intro"><div class="section-header"><p class="eyebrow">Начало работы</p><h2 id="promo-process-title">От обращения до согласованного сопровождения</h2><p>Для первого разговора достаточно рассказать о бизнесе и задаче. Полный архив документов заранее не нужен.</p></div><figure class="promo-section-art"><img src="/assets/promo-buh-pravo-50/process.webp" srcset="/assets/promo-buh-pravo-50/process-640.webp 640w, /assets/promo-buh-pravo-50/process.webp 1280w" sizes="(max-width: 800px) 100vw, 40vw" alt="Документы разложены по этапам начала работы" width="1280" height="853" loading="lazy" decoding="async" /></figure></div>
        <ol class="promo-process">
          <li><span>01</span><p>Коротко опишите бизнес: ИП или ООО, налоговый режим и основные текущие задачи.</p></li>
          <li><span>02</span><p>Уточним бухгалтерскую нагрузку и регулярные юридические вопросы, отделим их от разовых работ.</p></li>
          <li><span>03</span><p>Подготовим состав, обычную стоимость, скидку 50% и итоговую стоимость для обсуждения.</p></li>
          <li><span>04</span><p>После согласования закрепим условия в едином договоре и начнём работу по согласованному порядку.</p></li>
        </ol>
      </section>

      <section class="section promo-section promo-provider" aria-labelledby="promo-provider-title">
        <div class="promo-provider-copy"><div class="section-header"><p class="eyebrow">Исполнитель</p><h2 id="promo-provider-title">Кто оказывает услуги</h2><p>Проект «Документы для бизнеса». Сторона договора — ИП Барков Андрей Андреевич. Офис для согласованных встреч: Симферополь, ул. им. Мате Залки, 1.</p></div>
        <div class="promo-card-links"><a href="/rekvizity/">Реквизиты исполнителя</a><a href="/kontakty/">Контакты и офис</a><a href="/otzyvy/">Отзывы клиентов</a></div></div>
        <figure class="promo-section-art"><img src="/assets/promo-buh-pravo-50/provider.webp" srcset="/assets/promo-buh-pravo-50/provider-640.webp 640w, /assets/promo-buh-pravo-50/provider.webp 1280w" sizes="(max-width: 800px) 100vw, 45vw" alt="Переговорная для встречи с клиентом" width="1280" height="853" loading="lazy" decoding="async" /></figure>
      </section>

      <section class="section promo-section promo-faq-section" aria-labelledby="promo-faq-title">
        <div class="promo-feature-intro"><div class="section-header"><p class="eyebrow">Коротко об условиях</p><h2 id="promo-faq-title">Частые вопросы</h2></div><figure class="promo-section-art"><img src="/assets/promo-buh-pravo-50/faq.webp" srcset="/assets/promo-buh-pravo-50/faq-640.webp 640w, /assets/promo-buh-pravo-50/faq.webp 1280w" sizes="(max-width: 800px) 100vw, 40vw" alt="Подготовленные материалы для ответов на вопросы о договоре" width="1280" height="853" loading="lazy" decoding="async" /></figure></div>
        <div class="promo-faq">
          <details><summary>Скидка действует только на первый месяц?</summary><p>Нет. По единому договору на бухгалтерское и юридическое сопровождение скидка 50% применяется к каждому платежу в течение всего срока договора.</p></details>
          <details><summary>Есть ли дата окончания акции?</summary><p>Акция действует с 28 сентября 2026 года без даты окончания.</p></details>
          <details><summary>Можно заказать только бухгалтерию?</summary><p>Да, бухгалтерское сопровождение доступно отдельно. Условие скидки 50% относится именно к единому договору на бухгалтерское и юридическое сопровождение.</p></details>
          <details><summary>Сколько стоит комплекс?</summary><p>Цена зависит от объёма бухгалтерских и юридических задач. До начала работы согласуем обычную стоимость, скидку 50%, итоговую стоимость и зафиксируем их в договоре.</p></details>
          <details><summary>Нужно сразу отправлять документы?</summary><p>Нет. Для первого разговора достаточно кратко описать бизнес и задачу; безопасный канал передачи документов согласуем отдельно.</p></details>
        </div>
      </section>

      <section class="section lead-capture-section promo-contact" id="zayavka" aria-labelledby="promo-contact-title">
        <div class="section-header"><p class="eyebrow">Обращение</p><h2 id="promo-contact-title">Обсудим бухгалтерию и право для вашего бизнеса</h2><p>Оставьте контакт и пару слов о задаче. Уточним состав обоих направлений и подготовим предложение со скидкой 50% по единому договору.</p></div>
        <div class="promo-contact-layout">
        <form class="crm-lead-form lead-capture-form promo-lead-form" action="/api/lead" method="post" data-lead-form="amo">
          <input type="hidden" name="source_page" value="/buhgalteriya-pravo-50/" />
          <input type="hidden" name="task_type" value="Бухгалтерия + право — 50%" />
          <input type="hidden" name="offer_id" value="accounting-legal-50-20260928" />
          <input type="hidden" name="service" value="accounting_legal_combo" />
          <input type="hidden" name="promo" value="promo_buh_pravo_50" />
          <input type="hidden" name="lead_mode" value="quick" />
          <input class="lead-form-trap" type="text" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <div class="form-grid">
            <label>Как к вам обращаться <span class="promo-optional">необязательно</span><input type="text" name="name" autocomplete="name" placeholder="Ваше имя" /></label>
            <label>Телефон (обязательно)<input type="tel" name="phone" inputmode="tel" autocomplete="tel" required placeholder="+7..." /></label>
            <label>Форма бизнеса<select name="business_form"><option value="unknown">Пока не знаю или другое</option><option value="ip">ИП</option><option value="ooo">ООО</option></select></label>
            <label class="form-span-2">Коротко о задаче <span class="promo-optional">необязательно</span><textarea name="message" rows="4" placeholder="Что нужно по бухгалтерии и правовым вопросам"></textarea></label>
          </div>
          <label class="lead-consent"><input type="checkbox" name="privacy" value="1" required /><span>Согласен на обработку данных по <a href="/policy/" target="_blank" rel="noopener">политике конфиденциальности</a>.</span></label>
          <div class="lead-form-actions"><button class="button button-lime" type="submit">Обсудить комплексное сопровождение</button><a class="button button-ghost" href="tel:+79789987222">Позвонить</a></div>
          <p class="form-note" role="status" aria-live="polite"></p>
        </form>
        <aside class="promo-contact-aside"><figure class="promo-section-art"><img src="/assets/promo-buh-pravo-50/contact.webp" srcset="/assets/promo-buh-pravo-50/contact-640.webp 640w, /assets/promo-buh-pravo-50/contact.webp 1280w" sizes="(max-width: 800px) 100vw, 34vw" alt="Телефон и чистый лист для первого обращения" width="1280" height="853" loading="lazy" decoding="async" /></figure><div class="promo-contact-links"><a href="tel:+79789987222">+7 (978) 998-72-22</a><a href="https://t.me/centr_reg" target="_blank" rel="noopener">Telegram @centr_reg</a><span>MAX: +7 (978) 964-06-39</span></div></aside>
        </div>
      </section>
    </main>'''
    image_captions = {
        "hero": "Два направления · один договор",
        "documents": "Документы и учёт",
        "tax-legal": "Налоги и договоры",
        "shared-plan": "Единый рабочий план",
        "accounting": "Учёт · налоги · отчётность",
        "legal": "Договоры и правовые вопросы",
        "discount": "−50% на каждый платёж",
        "process": "От обращения до договора",
        "provider": "Встреча по записи · Симферополь",
        "faq": "Ответы об условиях",
        "contact": "Обсудим вашу задачу",
    }
    for image_name, caption in image_captions.items():
        image_marker = f'src="/assets/promo-buh-pravo-50/{image_name}.webp"'
        image_start = main.index(image_marker)
        figure_end = main.index('</figure>', image_start)
        main = (
            main[:figure_end]
            + f'<figcaption class="promo-image-label">{caption}</figcaption>'
            + main[figure_end:]
        )
    TARGET.parent.mkdir(exist_ok=True)
    page = head + main + tail
    page = page.replace(
        '/assets/lead-form.js?v=20260927-release1',
        '/assets/lead-form.js?v=20261001-promo1',
    )
    TARGET.write_text(page, encoding="utf-8")


if __name__ == "__main__":
    build()
