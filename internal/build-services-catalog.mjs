import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const template = fs.readFileSync(path.join(root, "blog", "obnovleniya-fns", "index.html"), "utf8");

const groups = [
  {
    id: "start",
    eyebrow: "Первый шаг",
    title: "Когда точный маршрут ещё не понятен",
    description: "Начните с описания ситуации или срочного вопроса: сначала определим обязательный шаг, затем нужную услугу и состав документов.",
    items: [
      ["/razbor-situacii/", "Разбор ситуации", "Опишите письмо, запрос, период и цель: поможем отделить основной вопрос от сопутствующих задач."],
      ["/srochnye-voprosy/", "Срочные вопросы", "Маршрут для ситуации, когда срок уже идёт и сначала нужно определить ближайшее безопасное действие."],
    ],
  },
  {
    id: "uchet",
    eyebrow: "Бухгалтерия и налоги",
    title: "Учёт, отчётность и налоговые задачи",
    description: "Регулярное сопровождение и отдельные задачи для ИП и ООО: от выбора режима до восстановления учёта и сдачи отчётности.",
    items: [
      ["/soprovozhdenie/", "Бухгалтерское сопровождение", "Тариф и состав работы подбираются по форме бизнеса, режиму, операциям, сотрудникам и состоянию учёта."],
      ["/buhgalterskoe-soprovozhdenie-ooo/", "Бухгалтерское сопровождение ООО", "Учёт, налоги, сотрудники, отчётность и рабочие ответы на требования для действующей компании."],
      ["/otchetnost/", "Отчётность и налоговые документы", "Общий маршрут по декларациям, нулевой отчётности, срокам и требованиям ИФНС."],
      ["/sdacha-otchetnosti-ip/", "Сдача отчётности ИП", "Проверка режима, периода, операций и обязательных форм индивидуального предпринимателя."],
      ["/sdacha-otchetnosti-ooo/", "Сдача отчётности ООО", "Бухгалтерская, налоговая и связанная отчётность организации с учётом её операций."],
      ["/deklaraciya-usn/", "Декларация УСН", "Подготовка декларации после сверки объекта налогообложения, доходов, расходов и уплаченных сумм."],
      ["/nulevaya-otchetnost-ip/", "Нулевая отчётность ИП", "Проверка, действительно ли период можно считать нулевым и какие формы всё равно обязательны."],
      ["/nulevaya-otchetnost-ooo/", "Нулевая отчётность ООО", "Комплект обязательной отчётности компании при отсутствии деятельности и движений."],
      ["/vosstanovlenie-buhucheta/", "Восстановление бухгалтерского учёта", "Разбор периодов, первичных документов, регистров и разрывов перед восстановлением базы."],
      ["/nalogi-i-rezhimy/", "Налоги и режимы", "Сравнение режимов и последствий с учётом деятельности, оборота, сотрудников и структуры расходов."],
      ["/ausn-krym/", "АУСН в Крыму", "Проверка лимитов, банка, сотрудников, ставок и порядка перехода на автоматизированную УСН."],
      ["/nds-pri-usn-2026/", "НДС при УСН в 2026 году", "Порог, ставка, документы и отчётность для бизнеса на УСН, которого касается НДС."],
      ["/raschet-nalogovoy-nagruzki/", "Расчёт налоговой нагрузки", "Оценка показателей бизнеса и причин отклонения от отраслевых ориентиров."],
      ["/sverka-s-nalogovoy/", "Сверка с налоговой", "Проверка ЕНС, начислений, платежей, задолженности и расхождений с данными учёта."],
    ],
  },
  {
    id: "registraciya",
    eyebrow: "Регистрация и ЕГРЮЛ",
    title: "Открытие, изменения и прекращение бизнеса",
    description: "Маршруты для ИП и ООО, а также адреса, директора, ОКВЭД и других сведений в государственных реестрах.",
    items: [
      ["/registraciya-i-likvidaciya/", "Регистрация, изменения и ликвидация", "Общий раздел для выбора регистрационного действия и проверки связанных последствий."],
      ["/registraciya-ip/", "Регистрация ИП", "Виды деятельности, налоговый режим и документы для начала работы предпринимателя."],
      ["/registraciya-ooo/", "Регистрация ООО", "Участники, директор, адрес, устав, ОКВЭД и комплект для создания компании."],
      ["/likvidaciya-ip/", "Ликвидация ИП", "Закрытие ИП с проверкой ЕНС, отчётности, кассы, сотрудников и обязательств."],
      ["/likvidaciya-ooo/", "Ликвидация ООО", "Корпоративные решения, публикации, расчёты и регистрационные этапы ликвидации."],
      ["/izmenenie-okved-ip/", "Изменение ОКВЭД ИП", "Подбор кодов под фактическую деятельность и подготовка заявления для ЕГРИП."],
      ["/izmenenie-okved-ooo/", "Изменение ОКВЭД ООО", "Проверка устава, корпоративное решение и форма Р13014 для новых видов деятельности."],
      ["/adres-egryul-direktor/", "Адрес, ЕГРЮЛ и директор", "Навигация по изменениям адреса, руководителя и сведениям организации."],
      ["/yuridicheskiy-adres-simferopol/", "Юридический адрес в Симферополе", "Проверка адреса, документов собственника и регистрационных рисков."],
      ["/smena-yuridicheskogo-adresa-ooo/", "Смена юридического адреса ООО", "Последовательность смены адреса с учётом устава, региона и состава участников."],
      ["/smena-direktora-ooo/", "Смена директора ООО", "Решение участников, полномочия, заявление и контроль записи в ЕГРЮЛ."],
      ["/nedostovernost-yuridicheskogo-adresa/", "Недостоверность юридического адреса", "Разбор отметки в ЕГРЮЛ и подготовка документов для подтверждения либо изменения адреса."],
    ],
  },
  {
    id: "bank",
    eyebrow: "Банк и требования",
    title: "Запросы банка, 115-ФЗ и требования ИФНС",
    description: "Сначала разбираем, что именно запросил банк или налоговая, затем собираем объяснения и подтверждающие документы по пунктам.",
    items: [
      ["/bank-i-115-fz/", "Банк и 115-ФЗ", "Общий маршрут по банковским запросам, операциям, контрагентам и деловой цели."],
      ["/otvet-na-zapros-banka/", "Ответ на запрос банка", "Структурированный ответ по формулировкам конкретного банковского запроса."],
      ["/dokumenty-dlya-banka-115-fz/", "Документы для банка по 115-ФЗ", "Комплект подтверждений деятельности, операций и экономического смысла платежей."],
      ["/otvet-na-trebovanie-ifns/", "Ответ на требование ИФНС", "Проверка срока, периода, пунктов требования и состава ответа налоговой."],
    ],
  },
  {
    id: "kadry",
    eyebrow: "Кадровые документы",
    title: "Кадровый учёт и документы работодателя",
    description: "Документы по сотрудникам рассматриваем вместе с начислениями, отчётностью и фактическими кадровыми событиями.",
    items: [
      ["/kadry/", "Кадровые документы и сопровождение", "Приём, изменения, увольнение, локальные документы и повторяющиеся кадровые задачи."],
    ],
  },
];

const escapeHtml = (value) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const allItems = groups.flatMap((group) => group.items);
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://dokumenty82.ru/uslugi/#page",
      url: "https://dokumenty82.ru/uslugi/",
      name: "Услуги для бизнеса в Симферополе",
      description: "Каталог бухгалтерских, налоговых и регистрационных услуг, подготовки отчётности и документов для банка в Симферополе.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": "https://dokumenty82.ru/#website" },
      mainEntity: { "@id": "https://dokumenty82.ru/uslugi/#list" },
    },
    {
      "@type": "ItemList",
      "@id": "https://dokumenty82.ru/uslugi/#list",
      name: "Услуги центра подготовки документов",
      numberOfItems: allItems.length,
      itemListElement: allItems.map(([route, name], index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://dokumenty82.ru${route}`,
        name,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://dokumenty82.ru/" },
        { "@type": "ListItem", position: 2, name: "Услуги", item: "https://dokumenty82.ru/uslugi/" },
      ],
    },
  ],
};

const groupSections = groups.map((group) => `
    <section class="section page-rich-section route-graphic-panel" id="${group.id}">
      <div class="section-header">
        <p class="eyebrow">${escapeHtml(group.eyebrow)}</p>
        <h2>${escapeHtml(group.title)}</h2>
        <p>${escapeHtml(group.description)}</p>
      </div>
      <div class="card-grid two related-grid">${group.items.map(([route, title, description], index) => `
        <a class="glass-card related-card" href="${route}"><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></a>`).join("")}
      </div>
    </section>`).join("");

const main = `<main>
    <section class="hero hero-inner hero-stack">
      <div class="glass-panel hero-copy-panel">
        <p class="eyebrow">Каталог направлений</p>
        <h1>Услуги для бизнеса в Симферополе</h1>
        <p>Все направления собраны в одном месте: бухгалтерское и налоговое сопровождение, отчётность, регистрация и ликвидация, изменения ЕГРЮЛ, кадровые документы и ответы на запросы банка или ИФНС.</p>
        <div class="actions"><a class="button button-lime" href="/razbor-situacii/">Напишите нам</a><a class="button button-ghost" href="/ceny/">Посмотреть цены</a></div>
      </div>
      <aside class="glass-panel hero-choice-panel">
        <p class="eyebrow">Быстрый переход</p>
        <h2>Выберите направление</h2>
        <ul class="compact-list">
          <li><a href="#uchet"><span>01</span><div><strong>Бухгалтерия и налоги</strong><small>Сопровождение, отчётность, режимы и сверки.</small></div></a></li>
          <li><a href="#registraciya"><span>02</span><div><strong>Регистрация и ЕГРЮЛ</strong><small>ИП, ООО, ликвидация и изменения сведений.</small></div></a></li>
          <li><a href="#bank"><span>03</span><div><strong>Банк и требования</strong><small>115-ФЗ, запросы банка и требования ИФНС.</small></div></a></li>
          <li><a href="#kadry"><span>04</span><div><strong>Кадровые документы</strong><small>Документы работодателя и кадровый учёт.</small></div></a></li>
        </ul>
      </aside>
    </section>
    <section class="section page-rich-section rich-intro-section">
      <p class="eyebrow">Как выбрать</p>
      <h2>Начните с задачи, а не с названия документа</h2>
      <div class="rich-copy"><p>Одна ситуация часто затрагивает несколько направлений. Например, смена деятельности ООО может повлиять на ОКВЭД, устав, налоговый режим, банковские сведения и дальнейшую отчётность.</p><p>Если точная услуга уже понятна, переходите прямо к её странице. Если нет, опишите исходную ситуацию: мы отделим обязательный шаг от сопутствующих задач и заранее согласуем состав работы.</p></div>
    </section>${groupSections}
    <section class="section page-rich-section related-section">
      <div class="section-header"><p class="eyebrow">Нужна ориентация</p><h2>Не нашли точное название задачи</h2><p>Это нормально: сначала можно посмотреть ответы на частые вопросы или начать с короткого разбора ситуации.</p></div>
      <div class="card-grid related-grid">
        <a class="glass-card related-card" href="/razbor-situacii/"><span>01</span><h3>Разобрать ситуацию</h3><p>Опишите, что произошло и какой результат нужен, без выбора услуги вслепую.</p></a>
        <a class="glass-card related-card" href="/faq/"><span>02</span><h3>Частые вопросы</h3><p>Проверьте, какие вводные нужны, как передавать документы и чего ожидать от первого шага.</p></a>
        <a class="glass-card related-card" href="/kontakty/"><span>03</span><h3>Связаться с нами</h3><p>Телефон, мессенджеры, адрес офиса и безопасный способ продолжить общение.</p></a>
      </div>
    </section>
  </main>`;

let html = template;
html = html.replace(/<title>[\s\S]*?<\/title>/i, "<title>Услуги для бизнеса в Симферополе | Бухгалтерия и документы</title>");
html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/i, '<meta name="description" content="Бухгалтерские и налоговые услуги, отчётность, регистрация и ликвидация бизнеса, изменения ЕГРЮЛ и документы по 115-ФЗ в Симферополе." />');
html = html.replace(/<meta name="robots" content="[^"]*"\s*\/>/i, '<meta name="robots" content="index, follow" />');
html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, '<link rel="canonical" href="https://dokumenty82.ru/uslugi/" />');
html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, '<meta property="og:title" content="Услуги для бизнеса в Симферополе" />');
html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, '<meta property="og:description" content="Каталог бухгалтерских, налоговых и регистрационных услуг, отчётности и документов для банка." />');
html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, '<meta property="og:url" content="https://dokumenty82.ru/uslugi/" />');
html = html.replace("  </head>", `    <script type="application/ld+json">${JSON.stringify(schema)}</script>\n  </head>`);
html = html.replace(/<main>[\s\S]*?<\/main>/i, main);
html = html.replace(/<a class="[^"]*" href="\/">Документы<\/a>/g, '<a class="is-active" href="/uslugi/">Услуги</a>');
html = html.replace(/<a href="\/">Документы<\/a>/g, '<a href="/uslugi/">Услуги</a>');
html = html.replaceAll('<a href="/">Документы</a>', '<a href="/uslugi/">Услуги</a>');
html = html.replace(/<nav class="desktop-nav"[\s\S]*?<\/nav>/i, (navigation) => navigation
  .replace(/class="is-active"/g, 'class=""')
  .replace('class="" href="/uslugi/">Услуги</a>', 'class="is-active" href="/uslugi/">Услуги</a>'));
html = html.replace(/[ \t]+$/gm, "");

const directory = path.join(root, "uslugi");
fs.mkdirSync(directory, { recursive: true });
fs.writeFileSync(path.join(directory, "index.html"), html, "utf8");
console.log(`Built /uslugi/ with ${allItems.length} direct service links.`);
