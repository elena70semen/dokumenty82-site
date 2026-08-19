import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const route = "/buhgalterskie-uslugi/";
const url = `https://dokumenty82.ru${route}`;
const title = "Бухгалтерские услуги в Симферополе для ИП и ООО | от 10 000 ₽";
const description = "Бухгалтерские услуги для ИП и ООО в Симферополе: учёт, отчётность, налоги, сотрудники и ответы на требования. От 10 000 ₽ в месяц.";
const template = fs.readFileSync(path.join(root, "registraciya-i-likvidaciya", "index.html"), "utf8");

const faq = [
  ["Сколько стоят бухгалтерские услуги?", "Сопровождение начинается от 10 000 ₽ в месяц. Итоговая стоимость зависит от режима налогообложения, количества операций и сотрудников, состояния учёта, банков, касс и дополнительных задач."],
  ["Можно передать только отчётность без полного сопровождения?", "Да. Сначала проверяем форму бизнеса, режим, период, операции и сотрудников, затем определяем состав обязательных форм и стоимость разовой задачи."],
  ["Работаете и с ИП, и с ООО?", "Да. Для ИП и ООО предусмотрены отдельные маршруты, потому что состав учёта, отчётности и документов у них различается."],
  ["Что делать, если учёт давно не вёлся?", "Начинаем с диагностики периодов, базы, банковских выписок, первичных документов и уже сданной отчётности. После этого можно оценить объём восстановления и дальнейшего сопровождения."],
];

const sourceSchema = template.match(/<!-- d82-service-schema:start -->[\s\S]*?<script type="application\/ld\+json">([\s\S]*?)<\/script>[\s\S]*?<!-- d82-service-schema:end -->/)?.[1];
if (!sourceSchema) throw new Error("Service schema template not found");
const commonGraph = JSON.parse(sourceSchema)["@graph"].filter((node) => ["LocalBusiness", "WebSite"].some((type) => {
  const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
  return types.includes(type);
}));

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    ...commonGraph,
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: "Бухгалтерские услуги для ИП и ООО в Симферополе",
      description,
      inLanguage: "ru-RU",
      isPartOf: { "@id": "https://dokumenty82.ru/#website" },
      about: { "@id": `${url}#service` },
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: "Бухгалтерские услуги для ИП и ООО",
      description: "Регулярное бухгалтерское и налоговое сопровождение, отчётность, восстановление учёта и отдельные бухгалтерские задачи для бизнеса в Симферополе.",
      serviceType: "Бухгалтерские услуги",
      url,
      provider: { "@id": "https://dokumenty82.ru/#business" },
      areaServed: [
        { "@type": "City", name: "Симферополь" },
        { "@type": "AdministrativeArea", name: "Республика Крым" },
      ],
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "10000",
        priceCurrency: "RUB",
        offerCount: "3",
        url: "https://dokumenty82.ru/ceny/",
      },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://dokumenty82.ru/razbor-situacii/",
        availableLanguage: "ru-RU",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://dokumenty82.ru/" },
        { "@type": "ListItem", position: 2, name: "Услуги", item: "https://dokumenty82.ru/uslugi/" },
        { "@type": "ListItem", position: 3, name: "Бухгалтерские услуги", item: url },
      ],
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

const main = `<main>
    <section class="hero hero-inner hero-stack">
      <div class="glass-panel hero-copy-panel">
        <p class="eyebrow">Бухгалтерия для бизнеса</p>
        <h1>Бухгалтерские услуги для ИП и ООО в Симферополе</h1>
        <p>Ведём бухгалтерский и налоговый учёт, готовим отчётность, контролируем обязательные сроки и разбираем требования ИФНС. Состав работы определяем по фактической нагрузке бизнеса.</p>
        <div class="actions"><a class="button button-lime" href="/razbor-situacii/">Обсудить задачу</a><a class="button button-ghost" href="/ceny/">Тарифы и цены</a></div>
      </div>
      <aside class="glass-panel hero-choice-panel">
        <p class="eyebrow">Выберите формат</p>
        <h2>От разовой задачи до полного сопровождения</h2>
        <p class="hero-choice-description">Разделяем постоянное ведение учёта, отдельную отчётность и восстановление прошлых периодов.</p>
        <ul class="compact-list">
          <li><a href="/soprovozhdenie/"><span>01</span><div><strong>Сопровождение ИП</strong><small>Учёт, налоги и отчётность предпринимателя.</small></div></a></li>
          <li><a href="/buhgalterskoe-soprovozhdenie-ooo/"><span>02</span><div><strong>Сопровождение ООО</strong><small>Бухгалтерский и налоговый контур компании.</small></div></a></li>
          <li><a href="/otchetnost/"><span>03</span><div><strong>Разовая отчётность</strong><small>Формы и периоды без постоянного ведения.</small></div></a></li>
          <li><a href="/vosstanovlenie-buhucheta/"><span>04</span><div><strong>Восстановление учёта</strong><small>Диагностика и разбор незакрытых периодов.</small></div></a></li>
        </ul>
      </aside>
    </section>

    <section class="section page-rich-section rich-intro-section">
      <div class="section-header">
        <p class="eyebrow">Состав услуг</p>
        <h2>Бухгалтерия, налоги и документы в одном рабочем контуре</h2>
        <p>Бухгалтерские услуги нужны не только перед сдачей декларации. Регулярная работа связывает первичные документы, банк, кассу, сотрудников, налоги, отчётность и ответы на запросы контролирующих органов.</p>
      </div>
      <div class="card-grid two rich-card-grid">
        <article class="glass-card rich-card"><span>01</span><h3>Ведение учёта</h3><p>Отражаем хозяйственные операции, проверяем документы и сохраняем понятную связь между банковскими движениями, договорами и учётной базой.</p></article>
        <article class="glass-card rich-card"><span>02</span><h3>Налоги и отчётность</h3><p>Определяем обязательные формы и платежи по режиму, периоду, операциям и сотрудникам, контролируем календарь подготовки и отправки.</p></article>
        <article class="glass-card rich-card"><span>03</span><h3>Зарплата и сотрудники</h3><p>Учитываем выплаты, кадровые события и связанную отчётность, чтобы данные по сотрудникам не расходились между документами и расчётами.</p></article>
        <article class="glass-card rich-card"><span>04</span><h3>Банк и ИФНС</h3><p>Разбираем требования и запросы по существу: период, операция, основание, подтверждающие документы и логика письменного ответа.</p></article>
      </div>
    </section>

    <section class="section page-rich-section route-graphic-panel">
      <div class="section-header">
        <p class="eyebrow">Кому подходит</p>
        <h2>Отдельные маршруты для ИП и организаций</h2>
        <p>Общий запрос «нужен бухгалтер» может означать разный объём работы. Поэтому сначала определяем форму бизнеса и состояние учёта, а затем переводим задачу на точную страницу.</p>
      </div>
      <div class="card-grid two rich-card-grid">
        <a class="glass-card related-card" href="/soprovozhdenie/"><span>01</span><h3>Бухгалтерские услуги для ИП</h3><p>Для предпринимателей на УСН, патенте, АУСН или ОСНО: учёт операций, налоги, сотрудники и обязательная отчётность.</p></a>
        <a class="glass-card related-card" href="/buhgalterskoe-soprovozhdenie-ooo/"><span>02</span><h3>Бухгалтерские услуги для ООО</h3><p>Для компаний с бухгалтерским и налоговым учётом, директором, сотрудниками, расчётными счетами и корпоративными документами.</p></a>
        <a class="glass-card related-card" href="/sdacha-otchetnosti-ip/"><span>03</span><h3>Сдача отчётности ИП</h3><p>Разовая подготовка обязательных форм предпринимателя после проверки режима, периода и фактических операций.</p></a>
        <a class="glass-card related-card" href="/sdacha-otchetnosti-ooo/"><span>04</span><h3>Сдача отчётности ООО</h3><p>Подготовка бухгалтерской, налоговой и связанной отчётности организации за конкретный период.</p></a>
      </div>
    </section>

    <section class="section page-rich-section">
      <div class="section-header">
        <p class="eyebrow">Стоимость</p>
        <h2>Тариф зависит от реальной сложности учёта</h2>
        <p>Базовая стоимость сопровождения начинается от 10 000 ₽ в месяц. До согласования тарифа проверяем параметры, которые действительно меняют объём работы.</p>
      </div>
      <div class="card-grid two rich-card-grid">
        <article class="glass-card rich-card"><span>01</span><h3>Налоговый режим</h3><p>УСН, патент, АУСН, ОСНО, НДС и совмещение режимов требуют разного состава регистров, расчётов и отчётности.</p></article>
        <article class="glass-card rich-card"><span>02</span><h3>Операции и документы</h3><p>Учитываем количество банковских движений, продаж, закупок, договоров, касс, счетов и первичных документов.</p></article>
        <article class="glass-card rich-card"><span>03</span><h3>Сотрудники</h3><p>Зарплата, кадровые события, выплаты и отчётность по персоналу формируют отдельный регулярный участок работы.</p></article>
        <article class="glass-card rich-card"><span>04</span><h3>Состояние базы</h3><p>Если документы не собраны или прошлые периоды требуют восстановления, сначала оцениваем разовую подготовительную работу.</p></article>
      </div>
      <div class="actions"><a class="button button-lime" href="/ceny/">Сравнить тарифы</a><a class="button button-ghost" href="/razbor-situacii/">Получить расчёт</a></div>
    </section>

    <section class="section page-rich-section">
      <div class="section-header">
        <p class="eyebrow">Начало работы</p>
        <h2>Какие вводные понадобятся бухгалтеру</h2>
        <p>Полный архив заранее не нужен. Для первой оценки достаточно определить форму бизнеса, режим, текущий период и основные участки учёта.</p>
      </div>
      <div class="card-grid two rich-card-grid">
        <article class="glass-card rich-card"><span>01</span><h3>Регистрационные данные</h3><p>ИНН, форма бизнеса, применяемые налоговые режимы, виды деятельности и дата начала работы.</p></article>
        <article class="glass-card rich-card"><span>02</span><h3>Операции</h3><p>Примерное количество банковских движений и документов, наличие кассы, эквайринга, маркетплейсов или внешнеэкономических операций.</p></article>
        <article class="glass-card rich-card"><span>03</span><h3>Сотрудники</h3><p>Численность, выплаты, кадровые события и наличие уже настроенного зарплатного участка.</p></article>
        <article class="glass-card rich-card"><span>04</span><h3>Текущее состояние</h3><p>Какие периоды закрыты, что уже сдано, есть ли требования ИФНС, расхождения по ЕНС или пробелы в первичных документах.</p></article>
      </div>
    </section>

    <section class="section page-rich-section insight-links-section">
      <div class="section-header">
        <p class="eyebrow">Актуально на 19 августа</p>
        <h2>Разъяснения ФНС для бухгалтерии</h2>
        <p>Отдельно собрали изменения по отчётности, НДС и цифровой сверке данных. Каждая заметка ведёт к официальному источнику.</p>
      </div>
      <nav class="insight-link-list" aria-label="Актуальные разъяснения ФНС для бухгалтерии">
        <a href="/novosti/kachestvo-nalogovogo-administrirovaniya-2026/"><strong>Сверка данных перед отправкой</strong><span>Как проследить показатель от первичного документа до декларации.</span></a>
        <a href="/novosti/nalogovye-vebinary-iyul-2026/"><strong>Налог на прибыль в 2026 году</strong><span>Рабочий чек-лист по итогам вебинара специалиста ФНС.</span></a>
        <a href="/novosti/formaty-nds-s-1-iyulya-2026/"><strong>Новые электронные форматы по НДС</strong><span>Что проверить в программе, ЭДО и обязательных реквизитах.</span></a>
        <a href="/novosti/nalogovyy-kalendar/"><strong>Налоговый календарь</strong><span>Ближайшие сроки документов, уведомлений и платежей.</span></a>
      </nav>
    </section>

    <section class="section page-rich-section faq-section">
      <div class="section-header">
        <p class="eyebrow">Частые вопросы</p>
        <h2>Что уточняют перед передачей бухгалтерии</h2>
        <p>Коротко о стоимости, разовых задачах и переходе на сопровождение.</p>
      </div>
      <div class="faq-list">
        ${faq.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("\n        ")}
      </div>
    </section>

    <section class="section page-rich-section related-section">
      <div class="section-header">
        <p class="eyebrow">Смежные задачи</p>
        <h2>Когда одного сопровождения недостаточно</h2>
        <p>Отдельные маршруты помогают не смешивать регулярный учёт с восстановлением, налоговой диагностикой и требованиями.</p>
      </div>
      <div class="card-grid two rich-card-grid">
        <a class="glass-card related-card" href="/vosstanovlenie-buhucheta/"><span>01</span><h3>Восстановление бухгалтерского учёта</h3><p>Если база не велась, документы утрачены или отчётные периоды закрыты не полностью.</p></a>
        <a class="glass-card related-card" href="/nalogi-i-rezhimy/"><span>02</span><h3>Налоги и режимы</h3><p>Если нужно сравнить налоговые последствия до изменения режима или модели работы.</p></a>
        <a class="glass-card related-card" href="/sverka-s-nalogovoy/"><span>03</span><h3>Сверка с налоговой</h3><p>Если сальдо ЕНС, начисления и платежи расходятся с данными бизнеса.</p></a>
        <a class="glass-card related-card" href="/otvet-na-trebovanie-ifns/"><span>04</span><h3>Ответ на требование ИФНС</h3><p>Если налоговая уже запросила пояснения или документы за конкретный период.</p></a>
      </div>
    </section>
  </main>`;

let html = template
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`)
  .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
  .replace(/<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="Бухгалтерские услуги в Симферополе для ИП и ООО" />')
  .replace(/<meta property="og:description" content="[^"]*" \/>/, '<meta property="og:description" content="Учёт, отчётность, налоги и сотрудники для ИП и ООО. Офис на ул. Мате Залки, 1." />')
  .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`)
  .replace(/<!-- d82-service-schema:start -->[\s\S]*?<!-- d82-service-schema:end -->/, `<!-- d82-service-schema:start -->\n    <script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>\n    <!-- d82-service-schema:end -->`)
  .replace(/<main>[\s\S]*?<\/main>/, main);

const directory = path.join(root, route.slice(1));
fs.mkdirSync(directory, { recursive: true });
fs.writeFileSync(path.join(directory, "index.html"), html, "utf8");
