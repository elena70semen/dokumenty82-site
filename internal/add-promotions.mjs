import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const templatePath = path.join(root, "ceny", "index.html");
const promotionsDirectory = path.join(root, "akcii");
const promotionsPath = path.join(promotionsDirectory, "index.html");
const assetVersion = "202608251900";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://dokumenty82.ru/akcii/#webpage",
      url: "https://dokumenty82.ru/akcii/",
      name: "Акции и специальные предложения для бизнеса в Симферополе",
      description: "Предложения для безопасного старта, смены бухгалтера, проверки рисков и комплексного сопровождения бизнеса.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": "https://dokumenty82.ru/#website" },
      about: { "@id": "https://dokumenty82.ru/#business" },
      mainEntity: { "@id": "https://dokumenty82.ru/akcii/#offers" },
    },
    {
      "@type": "ItemList",
      "@id": "https://dokumenty82.ru/akcii/#offers",
      name: "Специальные предложения",
      numberOfItems: 9,
      itemListElement: [
        "Безопасная смена бухгалтера",
        "Бухгалтерия + Право",
        "Карта рисков и точек роста бизнеса",
        "Документы по строительному объекту под ключ",
        "Единое окно для бизнеса",
        "Бизнес-старт под ключ",
        "Сайт с SEO-стартом и аналитикой",
        "Деловая почта под контролем",
        "Рекомендация с выгодой для двоих",
      ].map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: `https://dokumenty82.ru/akcii/#offer-${index + 1}`,
      })),
    },
  ],
};

const main = `<main>
      <section class="hero hero-inner promotions-hero">
        <div class="glass-panel hero-copy-panel promotions-hero-copy">
          <p class="eyebrow">Предложения для бизнеса</p>
          <h1>Акции без мелкого шрифта и случайных скидок</h1>
          <p>Собрали предложения для безопасного старта, смены бухгалтера, проверки рисков и комплексного сопровождения. Сначала уточняем задачу, затем фиксируем состав, условия и результат.</p>
          <div class="actions"><a class="button button-lime" href="#promotion-contact">Подобрать предложение</a><a class="button button-ghost" href="/ceny/">Посмотреть цены</a></div>
        </div>
        <aside class="glass-panel promotions-hero-summary">
          <div class="promotions-summary-intro">
            <p class="eyebrow">Как это работает</p>
            <h2>Сначала задача, затем предложение</h2>
          </div>
          <ul class="promotion-check-list"><li><strong>Проверяем применимость</strong><span>Предложение должно подходить к вашей ситуации.</span></li><li><strong>Фиксируем состав</strong><span>Объём и границы работы согласуем до старта.</span></li><li><strong>Обещаем только проверяемое</strong><span>Результат формулируем без неподтверждённых гарантий.</span></li></ul>
        </aside>
      </section>

      <section class="section promotions-section" aria-labelledby="priority-offers-title">
        <div class="section-header">
          <p class="eyebrow">С чего начать</p>
          <h2 id="priority-offers-title">Четыре предложения первой очереди</h2>
          <p>Это самые понятные точки входа: переход от другого бухгалтера, поддержка учёта и права, диагностика рисков и документы по строительному объекту.</p>
        </div>
        <div class="promotion-grid promotion-grid-priority">
          <article class="glass-card promotion-card is-priority" id="offer-1">
            <p class="promotion-kicker">Переход без остановки работы</p>
            <h3>Безопасная смена бухгалтера</h3>
            <p class="promotion-hook">Недовольны бухгалтером, но боитесь перехода?</p>
            <p>Принимаем базу и документы, проверяем состояние учёта и ближайшие сроки, после чего составляем понятный план перехода.</p>
            <ul class="promotion-result-list"><li>диагностика базы и обязательств</li><li>перечень недостающих данных</li><li>план передачи учёта</li></ul>
            <a class="button button-ghost" href="#promotion-contact" data-promotion="Безопасная смена бухгалтера">Обсудить переход</a>
          </article>
          <article class="glass-card promotion-card is-priority" id="offer-2">
            <p class="promotion-kicker">Два направления в одном маршруте</p>
            <h3>Бухгалтерия + Право</h3>
            <p class="promotion-hook">Юрист нужен до проблемы, а не после.</p>
            <p>Соединяем регулярное бухгалтерское сопровождение с правовым модулем там, где документы, договоры и решения влияют на учёт и риски.</p>
            <ul class="promotion-result-list"><li>единая точка контакта</li><li>согласованные бухгалтерские и правовые действия</li><li>меньше разрывов между документами и учётом</li></ul>
            <a class="button button-ghost" href="#promotion-contact" data-promotion="Бухгалтерия + Право">Уточнить состав</a>
          </article>
          <article class="glass-card promotion-card is-priority" id="offer-3">
            <p class="promotion-kicker">Бесплатная экспресс-диагностика</p>
            <h3>Карта рисков и точек роста бизнеса</h3>
            <p class="promotion-hook">3 риска. 3 точки роста. 3 первых шага.</p>
            <p>Проводим первичный разбор ситуации и формируем короткую карту наблюдений, чтобы понять, какие вопросы требуют внимания в первую очередь.</p>
            <ul class="promotion-result-list"><li>три заметных риска</li><li>три возможные точки роста</li><li>три ближайших действия</li></ul>
            <a class="button button-ghost" href="#promotion-contact" data-promotion="Карта рисков и точек роста бизнеса">Запросить диагностику</a>
          </article>
          <article class="glass-card promotion-card is-priority" id="offer-4">
            <p class="promotion-kicker">Для строительных компаний</p>
            <h3>Документы по объекту под ключ</h3>
            <p class="promotion-hook">Вы строите — мы ведём документы по объекту.</p>
            <p>Собираем документальный маршрут по объекту: договоры, сметы, дополнительные работы, акты, переписку и претензионные материалы.</p>
            <ul class="promotion-result-list"><li>структура документов по объекту</li><li>контроль связей между работами и актами</li><li>понятный список следующих документов</li></ul>
            <a class="button button-ghost" href="#promotion-contact" data-promotion="Документы по строительному объекту под ключ">Обсудить объект</a>
          </article>
        </div>
      </section>

      <section class="section promotions-section" aria-labelledby="more-offers-title">
        <div class="section-header">
          <p class="eyebrow">Другие возможности</p>
          <h2 id="more-offers-title">Предложения для старта и развития</h2>
          <p>Комплексные варианты для запуска бизнеса, цифровой инфраструктуры и повседневного контроля.</p>
        </div>
        <div class="promotion-grid">
          <article class="glass-card promotion-card" id="offer-5">
            <p class="promotion-kicker">Комплексное сопровождение</p>
            <h3>Единое окно для бизнеса</h3>
            <p class="promotion-hook">Все ключевые задачи бизнеса — в одном центре.</p>
            <p>Связываем бухгалтерию, право, документы, сайт и цифровые решения в один понятный маршрут с ответственными по каждому направлению.</p>
            <a class="promotion-text-link" href="#promotion-contact" data-promotion="Единое окно для бизнеса">Подобрать состав <span aria-hidden="true">→</span></a>
          </article>
          <article class="glass-card promotion-card" id="offer-6">
            <p class="promotion-kicker">Для нового проекта</p>
            <h3>Бизнес-старт под ключ</h3>
            <p class="promotion-hook">Откройте бизнес — начните принимать клиентов.</p>
            <p>Собираем стартовый маршрут бизнеса и при подходящем составе работ добавляем сайт-визитку в качестве подарка.</p>
            <a class="promotion-text-link" href="#promotion-contact" data-promotion="Бизнес-старт под ключ">Обсудить запуск <span aria-hidden="true">→</span></a>
          </article>
          <article class="glass-card promotion-card" id="offer-7">
            <p class="promotion-kicker">Цифровой старт</p>
            <h3>Сайт с SEO-стартом и аналитикой</h3>
            <p class="promotion-hook">Не просто сайт — готовая основа для продвижения.</p>
            <p>Создаём сайт, подключаем аналитику и выполняем базовую техническую подготовку к поисковому продвижению без обещаний конкретной позиции.</p>
            <a class="promotion-text-link" href="#promotion-contact" data-promotion="Сайт с SEO-стартом и аналитикой">Уточнить формат <span aria-hidden="true">→</span></a>
          </article>
          <article class="glass-card promotion-card" id="offer-8">
            <p class="promotion-kicker">Контроль корреспонденции</p>
            <h3>Деловая почта под контролем</h3>
            <p class="promotion-hook">Важные письма и сроки — под контролем.</p>
            <p>Организуем получение деловой корреспонденции, уведомления, сканирование и согласованную передачу материалов.</p>
            <a class="promotion-text-link" href="#promotion-contact" data-promotion="Деловая почта под контролем">Узнать условия <span aria-hidden="true">→</span></a>
          </article>
        </div>
      </section>

      <section class="section promotion-referral" id="offer-9">
        <div>
          <p class="eyebrow">Для клиентов и партнёров</p>
          <h2>Рекомендация с выгодой для двоих</h2>
          <p>Если по рекомендации приходит новый клиент, бонус получает и он, и тот, кто нас рекомендовал. Формат бонуса и условия фиксируем до начала работы.</p>
        </div>
        <div class="promotion-referral-action"><p class="promotion-hook">Рекомендуйте нас — выгоду получают оба.</p><a class="button button-ghost" href="#promotion-contact" data-promotion="Рекомендация с выгодой для двоих">Узнать о бонусе</a></div>
      </section>

      <section class="section promotion-conditions" aria-labelledby="promotion-conditions-title">
        <div class="section-header">
          <p class="eyebrow">Условия</p>
          <h2 id="promotion-conditions-title">Сначала проверяем применимость</h2>
          <p>Акция не заменяет основную услугу и не ухудшает её состав. До старта письменно согласуем задачу, результат, ограничения и следующий шаг.</p>
        </div>
        <div class="promotion-condition-grid">
          <div><strong>Без скрытых обещаний</strong><span>Не гарантируем решения ведомств, банков, сроки регистрации или позиции в поиске.</span></div>
          <div><strong>Состав зависит от задачи</strong><span>Объём работ, бонусы и подарки подтверждаем после первичного разбора.</span></div>
          <div><strong>Совмещение согласуем отдельно</strong><span>Предложения не суммируются автоматически, если это прямо не зафиксировано.</span></div>
        </div>
      </section>

      <section class="section lead-capture-section promotion-contact" id="promotion-contact" aria-labelledby="promotion-contact-title">
        <div class="section-header">
          <p class="eyebrow">Первый контакт</p>
          <h2 id="promotion-contact-title">Подберём предложение под вашу ситуацию</h2>
          <p>Оставьте контакты и выберите интересующее предложение. Мы проверим применимость и согласуем условия до начала работ.</p>
        </div>
        <form class="crm-lead-form lead-capture-form" action="/api/lead" method="post" data-lead-form="amo">
          <input type="hidden" name="source_page" value="/akcii/" />
          <input class="lead-form-trap" type="text" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <div class="form-grid">
            <label>Имя<input type="text" name="name" autocomplete="name" required placeholder="Как к вам обращаться" /></label>
            <label>Телефон<input type="tel" name="phone" inputmode="tel" autocomplete="tel" required placeholder="+7..." /></label>
            <label>Email<input type="email" name="email" autocomplete="email" placeholder="Для копии ответа" /></label>
            <label>Предложение<select name="task_type" required><option value="Карта рисков и точек роста бизнеса">Карта рисков и точек роста</option><option value="Безопасная смена бухгалтера">Безопасная смена бухгалтера</option><option value="Бухгалтерия + Право">Бухгалтерия + Право</option><option value="Документы по строительному объекту под ключ">Документы по строительному объекту</option><option value="Единое окно для бизнеса">Единое окно для бизнеса</option><option value="Бизнес-старт под ключ">Бизнес-старт под ключ</option><option value="Сайт с SEO-стартом и аналитикой">Сайт с SEO-стартом и аналитикой</option><option value="Деловая почта под контролем">Деловая почта под контролем</option><option value="Рекомендация с выгодой для двоих">Рекомендация с выгодой для двоих</option></select></label>
            <label class="form-span-2">Коротко о задаче<textarea name="message" rows="4" required placeholder="Что нужно сделать и что уже есть на руках"></textarea></label>
          </div>
          <label class="lead-consent"><input type="checkbox" name="privacy" value="1" required /><span>Согласен на обработку данных по <a href="/policy/" target="_blank" rel="noopener">политике конфиденциальности</a>.</span></label>
          <div class="lead-form-actions"><button class="button button-lime" type="submit">Отправить заявку</button><a class="button button-ghost" href="tel:+79789987222">Позвонить</a></div>
          <p class="form-note" role="status" aria-live="polite"></p>
        </form>
      </section>
    </main>`;

function routeForFile(file) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  return relative === "index.html" ? "/" : `/${relative.replace(/\/index\.html$/, "")}/`;
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "server", "internal", "node_modules"].includes(entry.name)) return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : entry.name === "index.html" ? [full] : [];
  });
}

function updateNavigation(html, route) {
  html = html.replace(/(<nav class="desktop-nav"[^>]*>)([\s\S]*?)(<\/nav>)/g, (_match, open, links, close) => {
    const cleaned = links.replace(/<a class="[^"]*" href="\/akcii\/">Акции<\/a>/g, "");
    const active = route === "/akcii/" ? " is-active" : "";
    return `${open}${cleaned.replace(/(<a class="[^"]*" href="\/novosti\/">Новости<\/a>)/, `$1<a class="nav-promo${active}" href="/akcii/">Акции</a>`)}${close}`;
  });
  html = html.replace(/(<div class="mobile-nav-grid">)([\s\S]*?)(<\/div>)/g, (_match, open, links, close) => {
    const cleaned = links.replace(/<a(?: class="[^"]*")? href="\/akcii\/">Акции<\/a>/g, "");
    return `${open}${cleaned.replace(/(<a href="\/novosti\/">Новости<\/a>)/, '$1<a class="nav-promo" href="/akcii/">Акции</a>')}${close}`;
  });
  return html;
}

let page = fs.readFileSync(templatePath, "utf8");
page = page.replace(/<title>[\s\S]*?<\/title>/, "<title>Акции для бизнеса в Симферополе | Документы для бизнеса</title>");
page = page.replace(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="Акции для бизнеса в Симферополе: безопасная смена бухгалтера, диагностика рисков, бизнес-старт, бухгалтерия и право, документы по объекту." />');
page = page.replace(/<link rel="canonical" href="[^"]*" \/>/, '<link rel="canonical" href="https://dokumenty82.ru/akcii/" />');
page = page.replace(/<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="Акции и специальные предложения для бизнеса" />');
page = page.replace(/<meta property="og:description" content="[^"]*" \/>/, '<meta property="og:description" content="Понятные предложения для старта, смены бухгалтера, проверки рисков и комплексного сопровождения бизнеса." />');
page = page.replace(/<meta property="og:url" content="[^"]*" \/>/, '<meta property="og:url" content="https://dokumenty82.ru/akcii/" />');
page = page.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
page = page.replace(/<main>[\s\S]*?<\/main>/, main);
page = page.replace(/(\s*<script src="\/assets\/metrika-goals\.js\?v=\d+" defer><\/script>)/, '\n    <script src="/assets/lead-form.js?v=202608061600" defer></script>$1');
page = page.replace(/lead-form\.js\?v=\d+/g, `lead-form.js?v=${assetVersion}`);
page = updateNavigation(page, "/akcii/");
page = page.replace(/class="is-active" href="\/ceny\/"/, 'class="" href="/ceny/"');
fs.mkdirSync(promotionsDirectory, { recursive: true });
fs.writeFileSync(promotionsPath, page, "utf8");

const homePath = path.join(root, "index.html");
let home = fs.readFileSync(homePath, "utf8");
home = home.replace(/\s*<section class="section promotions-teaser"[\s\S]*?<\/section>\s*/g, "\n");
const teaser = `
    <section class="section promotions-teaser" aria-labelledby="promotions-teaser-title">
      <div class="section-header promotions-teaser-header"><div><p class="eyebrow">Акции</p><h2 id="promotions-teaser-title">Предложения для безопасного старта и перехода</h2><p>Не случайные скидки, а понятные точки входа с заранее обозначенным результатом.</p></div><a class="button button-ghost" href="/akcii/">Все акции</a></div>
      <div class="promotion-teaser-grid"><a class="glass-card" href="/akcii/#offer-1"><strong>Безопасная смена бухгалтера</strong><span>Проверим базу, сроки и соберём план перехода.</span></a><a class="glass-card" href="/akcii/#offer-3"><strong>Карта рисков и точек роста</strong><span>3 риска, 3 точки роста и 3 первых шага.</span></a><a class="glass-card" href="/akcii/#offer-6"><strong>Бизнес-старт под ключ</strong><span>Документальный маршрут и сайт-визитка при подходящих условиях.</span></a></div>
    </section>
`;
home = home.replace(/(\s*<section id="documents")/, `${teaser}$1`);
fs.writeFileSync(homePath, home, "utf8");

let updated = 0;
for (const file of walk(root)) {
  const before = fs.readFileSync(file, "utf8");
  if (!before.includes('class="desktop-nav"')) continue;
  const after = updateNavigation(before, routeForFile(file))
    .replace(/site\.css\?v=\d+/g, `site.css?v=${assetVersion}`)
    .replace(/lead-form\.js\?v=\d+/g, `lead-form.js?v=${assetVersion}`)
    .replace(/metrika-goals\.js\?v=\d+/g, `metrika-goals.js?v=${assetVersion}`);
  if (after === before) continue;
  fs.writeFileSync(file, after, "utf8");
  updated += 1;
}

console.log(`Promotions page created; navigation updated in ${updated} files.`);
