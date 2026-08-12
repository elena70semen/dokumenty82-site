import fs from "node:fs";
import path from "node:path";

import { newsItems } from "./news-registry.mjs";

const root = path.resolve(import.meta.dirname, "..");
const requestedRoutes = new Set(process.argv.slice(2).filter((value) => value.startsWith("/")));
const footerOnly = process.argv.includes("--footer-only");
const navigationOnly = process.argv.includes("--navigation-only");
const footerLinks = `<div class="footer-links">
          <a href="/razbor-situacii/">Разбор ситуации</a>
          <a href="/uslugi/">Услуги</a>
          <a href="/otchetnost/">Отчётность</a>
          <a href="/bank-i-115-fz/">Банк и 115-ФЗ</a>
          <a href="/otzyvy/">Отзывы</a>
          <a href="/novosti/">Новости</a>
          <a href="/ceny/">Цены</a>
          <a href="/kontakty/">Контакты</a>
          <a href="/rekvizity/">Реквизиты</a>
        </div>`;
const footerNavigation = `<nav aria-label="Разделы сайта">
        <strong>Разделы</strong>
        ${footerLinks}
        <a class="button button-lime footer-policy-button" href="/policy/">Конфиденциальность и безопасность</a>
      </nav>`;
const footerButtons = `<div class="footer-buttons"><a class="button button-lime" href="tel:+79789987222">Позвонить</a><a class="button button-ghost" href="/kontakty/">Контакты</a></div>`;
const faviconLinks = `<link rel="icon" href="https://dokumenty82.ru/favicon.png" type="image/png" sizes="120x120" />
    <link rel="icon" href="https://dokumenty82.ru/favicon.svg" type="image/svg+xml" sizes="any" />
    <link rel="shortcut icon" href="https://dokumenty82.ru/favicon.ico" type="image/x-icon" />
    <link rel="apple-touch-icon" href="https://dokumenty82.ru/apple-touch-icon.png" sizes="180x180" />`;
const taxCalendarRoute = "/novosti/nalogovyy-kalendar/";
const taxCalendarDescription = "Налоговый календарь для ИП и организаций: ближайшие сроки отчетности, уведомлений и платежей в июле и августе 2026 года со ссылками на ФНС.";
const refreshedNewsRoutes = new Set([
  "/novosti/",
  "/novosti/sroki-uvedomleniy-i-platezhey-iyul-2026/",
  "/novosti/nalogovye-vebinary-iyul-2026/",
  "/novosti/doverennye-lica-inostrannyh-organizaciy-tks/",
  "/novosti/servis-vypiski-na-nalogovyy-vychet/",
  "/novosti/kachestvo-nalogovogo-administrirovaniya-2026/",
]);
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const indexedRoutes = new Set(
  [...sitemap.matchAll(/<loc>https:\/\/dokumenty82\.ru([^<]*)<\/loc>/g)].map((match) => match[1] || "/"),
);

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  if ([".git", "server"].includes(entry.name)) return [];
  const full = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(full) : entry.name === "index.html" ? [full] : [];
});

const articleTemplate = path.join(root, "novosti", "formaty-nds-s-1-iyulya-2026", "index.html");
for (const item of newsItems.filter((entry) => entry.article && (!requestedRoutes.size || requestedRoutes.has(entry.route)))) {
  const target = path.join(root, item.route.slice(1), "index.html");
  if (!fs.existsSync(target)) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(articleTemplate, target);
  }
}

const taxCalendarTarget = path.join(root, taxCalendarRoute.slice(1), "index.html");
if (!fs.existsSync(taxCalendarTarget)) {
  fs.mkdirSync(path.dirname(taxCalendarTarget), { recursive: true });
  fs.copyFileSync(path.join(root, "novosti", "index.html"), taxCalendarTarget);
}

const decode = (value) => value
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">");

const text = (value = "") => decode(value)
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const escapeHtml = (value) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const routeForFile = (file) => {
  const relative = path.relative(root, path.dirname(file)).split(path.sep).join("/");
  return relative ? `/${relative}/` : "/";
};

const shorten = (value, max = 150) => {
  if (value.length <= max) return value;
  const clipped = value.slice(0, max + 1);
  const boundary = Math.max(clipped.lastIndexOf(". "), clipped.lastIndexOf("; "), clipped.lastIndexOf(", "));
  return `${clipped.slice(0, boundary > 85 ? boundary + 1 : max).trim()}…`;
};

const removeLocation = (value) => value
  .replace(/\s+в Симферополе/gi, "")
  .replace(/\s+для бизнеса/gi, "")
  .replace(/:\s*что проверить$/i, "")
  .trim();

const genericOrderSection = /\s*<section class="section">\s*<p class="eyebrow">Порядок<\/p>\s*<h2>Как мы подходим к задаче<\/h2>\s*<p>Не стоит отвечать вслепую\. Сначала нужно понять, какой вопрос задан, какие документы уже есть и что относится к ситуации\.<\/p>[\s\S]*?<\/section>\s*/;

const repeatedCopy = {
  practical: "Собрали основные сценарии, документы и вводные, чтобы страница была полезной сама по себе.",
  process: "Двигаемся по шагам: сначала факты и документы, затем маршрут и следующий безопасный шаг.",
  assurance: "Не обещаем решения за ИФНС, банк или регистрирующий орган, но помогаем подготовить понятную документальную позицию.",
  faq: "Короткие ответы по типовым сомнениям перед обращением.",
  related: "Если задача шире одной страницы, эти разделы помогут собрать полный маршрут.",
  relatedCard: "Открыть смежный маршрут и уточнить вводные по этой части задачи.",
};

const extractPageContext = (html) => {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
  const h1 = text(main.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]);
  const topic = removeLocation(h1);
  const sectionHeaders = [...main.matchAll(/<div class="section-header">([\s\S]*?)<\/div>/gi)]
    .map((match) => ({
      eyebrow: text(match[1].match(/<p class="eyebrow">([\s\S]*?)<\/p>/i)?.[1]),
      title: text(match[1].match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i)?.[1]),
      description: text([...match[1].matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].at(-1)?.[1]),
    }))
    .filter((header) => header.title && !["Что важно проверить", "От обращения к понятному результату", "Что получает клиент и почему лучше не затягивать", "Частые вопросы", "Куда перейти дальше"].includes(header.title));
  const cards = [...main.matchAll(/<article class="glass-card[^"]*rich-card[^"]*">([\s\S]*?)<\/article>/gi)]
    .map((match) => {
      const title = text(match[1].match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/i)?.[1]);
      const paragraph = text(match[1].match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1]);
      const listItem = text(match[1].match(/<li\b[^>]*>([\s\S]*?)<\/li>/i)?.[1]);
      return { title, description: paragraph || listItem };
    })
    .filter((card) => card.title && card.description);
  return { main, h1, topic, sectionHeaders, cards };
};

const buildHeroAside = ({ topic, sectionHeaders, cards }) => {
  const lead = sectionHeaders[0];
  const selectedCards = cards.slice(0, 4);
  while (selectedCards.length < 4) {
    selectedCards.push({
      title: selectedCards.length === 3 ? "Следующий шаг" : `Контрольная точка ${selectedCards.length + 1}`,
      description: `Уточняем только те сведения, которые относятся к теме «${topic}».`,
    });
  }
  const items = selectedCards.map((card, index) => `
          <li><div class="compact-row"><span>${String(index + 1).padStart(2, "0")}</span><div><strong>${escapeHtml(card.title)}</strong><small>${escapeHtml(shorten(card.description))}</small></div></div></li>`).join("");
  return `<aside class="glass-panel hero-choice-panel">
        <p class="eyebrow">${escapeHtml(lead?.eyebrow || "Ориентиры")}</p>
        <h2>Перед работой: ${escapeHtml(topic)}</h2>
        <p class="hero-choice-description">${escapeHtml(lead?.description || `Сверяем исходные условия по теме «${topic}» и отделяем их от соседних задач.`)}</p>
        <ul class="compact-list">${items}
        </ul>
      </aside>`;
};

const refreshServicePage = (html) => {
  html = html.replace(genericOrderSection, "\n    ");
  const context = extractPageContext(html);
  if (!context.h1) return html;

  html = html.replace(/<aside class="glass-panel hero-choice-panel">[\s\S]*?<\/aside>/i, buildHeroAside(context));
  html = html.replaceAll(repeatedCopy.practical, `Ниже собраны проверки и документы именно для задачи «${context.topic}»; соседние вопросы вынесены в отдельные маршруты.`);
  html = html.replaceAll(repeatedCopy.process, `Порядок работы по теме «${context.topic}» начинается с основания и периода, затем переходит к проверке комплекта и контрольному следующему шагу.`);
  html = html.replaceAll(repeatedCopy.assurance, `По задаче «${context.topic}» мы отвечаем за логику проверки и качество подготовки материалов. Решение уполномоченного органа, банка или другой стороны процедуры зависит от фактических данных.`);
  html = html.replaceAll(repeatedCopy.faq, `Ответы на вопросы, которые обычно возникают до начала работы по теме «${context.topic}».`);
  html = html.replaceAll(repeatedCopy.related, `Смежные разделы помогают проверить, не затрагивает ли задача «${context.topic}» другие документы или процедуры.`);

  html = html.replace(/(<a class="glass-card related-card" href="([^"]+)">[\s\S]*?<h3>([\s\S]*?)<\/h3>\s*)<p>Открыть смежный маршрут и уточнить вводные по этой части задачи\.<\/p>/gi, (_match, start, _href, targetTitle) => {
    const target = text(targetTitle);
    return `${start}<p>Проверить раздел «${escapeHtml(target)}», если он влияет на задачу «${escapeHtml(context.topic)}».</p>`;
  });
  return html;
};

const refreshNewsArticle = (html) => {
  const context = extractPageContext(html);
  if (!context.h1) return html;
  const summary = text(html.match(/<article class="glass-panel news-article">[\s\S]*?<h1[^>]*>[\s\S]*?<\/h1>\s*<p>([\s\S]*?)<\/p>/i)?.[1]);
  const checklist = [...html.matchAll(/<section class="section news-article-section">[\s\S]*?<li>([\s\S]*?)<\/li>/gi)].map((match) => text(match[1]));
  const allChecklist = [...(html.match(/<section class="section news-article-section">([\s\S]*?)<\/section>/i)?.[1] || "").matchAll(/<li>([\s\S]*?)<\/li>/gi)].map((match) => text(match[1]));
  const points = allChecklist.length ? allChecklist : checklist;
  const related = [...html.matchAll(/<div class="news-related">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/gi)].map((match) => text(match[1]));
  const p = (index, fallback) => escapeHtml(points[index] || fallback);
  const practical = `<section class="section page-rich-section route-graphic-panel">

    <div class="section-header">
      <p class="eyebrow">Практический вывод</p>
      <h2>Что проверить по теме этой публикации</h2>
      <p>${escapeHtml(summary)} Применимость новости оцениваем по фактическим операциям, периоду и документам конкретной организации или ИП.</p>
    </div>
      <div class="card-grid two rich-card-grid">
        <article class="glass-card rich-card">
          <span>01</span>
          <h3>Определить, кого касается изменение</h3>
          <p>Сопоставьте тему «${escapeHtml(context.topic)}» со своим режимом, операциями и ближайшими отчётными обязанностями.</p>
        </article>
        <article class="glass-card rich-card">
          <span>02</span>
          <h3>Поставить первую контрольную точку</h3>
          <p>${p(0, "Проверьте исходные документы и настройки до следующей обязательной даты.")}</p>
        </article>
        <article class="glass-card rich-card">
          <span>03</span>
          <h3>Проверить подтверждения</h3>
          <p>${p(1, "Сохраните документы, протоколы и сведения, на которых основана выбранная позиция.")}</p>
        </article>
        <article class="glass-card rich-card">
          <span>04</span>
          <h3>Выбрать связанный маршрут</h3>
          <p>Если изменение уже влияет на практическую задачу, используйте раздел «${escapeHtml(related[0] || "Разбор ситуации")}» или согласуйте вводные по теме «${escapeHtml(context.topic)}» до отправки документов.</p>
        </article>
      </div>
    </section>`;
  html = html.replace(/<section class="section page-rich-section route-graphic-panel">[\s\S]*?<h2>Как использовать эту новость<\/h2>[\s\S]*?<\/section>/i, practical);
  html = html.replaceAll("Если новость касается вашей ситуации, лучше выбрать страницу по задаче и собрать вводные до ответа.", `Для темы «${context.topic}» выберите связанный раздел по фактической задаче и только затем собирайте комплект.`);
  html = html.replace(/Если изменение уже влияет на практическую задачу, используйте раздел «([^"<]+)" или согласуйте вводные до отправки документов\./g, `Если изменение уже влияет на практическую задачу, используйте раздел «$1» или согласуйте вводные по теме «${context.topic}» до отправки документов.`);
  return html;
};

const buildNewsMain = (item) => {
  const related = item.article.related.map(([href, label]) => `<a href="${href}">${escapeHtml(label)}</a>`).join("");
  const paragraphs = item.article.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  const sections = (item.article.sections || []).map((section) => {
    const sectionParagraphs = (section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    const sectionList = section.items?.length
      ? `<ul>${section.items.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>`
      : "";
    return `<h2>${escapeHtml(section.title)}</h2>${sectionParagraphs}${sectionList}`;
  }).join("");
  const checklist = item.article.checklist.map((point) => `<li>${escapeHtml(point)}</li>`).join("");
  const practical = item.article.practical.map(([title, description], index) => `
        <article class="glass-card rich-card">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(description)}</p>
        </article>`).join("");
  const faq = (item.article.faq || []).map(([question, answer]) => `
        <article class="glass-card faq-card">
          <h3>${escapeHtml(question)}</h3>
          <p>${escapeHtml(answer)}</p>
        </article>`).join("");
  const faqSection = faq ? `
    <section class="section">
      <div class="section-header">
        <p class="eyebrow">Частые вопросы</p>
        <h2>${escapeHtml(item.article.faqTitle || "Что важно уточнить")}</h2>
        <p>${escapeHtml(item.article.faqIntro || "Ответы относятся к описанной ситуации. Для решения по конкретному документу сверяйте период, основание и фактические данные.")}</p>
      </div>
      <div class="card-grid two faq-grid">${faq}
      </div>
    </section>` : "";
  const reviewed = item.reviewed
    ? `<span>Материал проверен редакцией: ${escapeHtml(item.reviewed)}</span>`
    : "";
  return `<main>
    <section class="hero hero-inner">
      <article class="glass-panel news-article">
        <p class="eyebrow">Новости ФНС · ${escapeHtml(item.date)}</p>
        <h1>${escapeHtml(item.title)}</h1>
        <p>${escapeHtml(item.summary)}</p>
        <div class="news-tags">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      </article>
    </section>
    <section class="section news-article-section">
      <div class="news-article-body">
        ${paragraphs}${sections}
        <h2>${escapeHtml(item.article.checklistTitle || "Что проверить")}</h2>
        <ul>${checklist}</ul>
        <div class="news-source">
          <span>Официальный источник:</span>
          <a href="${item.article.sourceUrl}" rel="nofollow noopener" target="_blank">${escapeHtml(item.article.sourceTitle)}</a>
          ${reviewed}
        </div>
      </div>
    </section>${faqSection}
    <section class="section">
      <div class="section-header">
        <p class="eyebrow">${escapeHtml(item.article.relatedEyebrow || "Связанные страницы")}</p>
        <h2>${escapeHtml(item.article.relatedTitle || "Куда перейти дальше")}</h2>
        <p>${escapeHtml(item.article.relatedIntro || `Для темы «${item.title}» выберите раздел по фактической задаче и соберите только относящиеся к ней документы.`)}</p>
      </div>
      <div class="news-related">${related}</div>
    </section>
    <section class="section page-rich-section route-graphic-panel">
      <div class="section-header">
        <p class="eyebrow">${escapeHtml(item.article.practicalEyebrow || "Практический вывод")}</p>
        <h2>${escapeHtml(item.article.practicalTitle || "Как применить официальную информацию")}</h2>
        <p>${escapeHtml(item.article.practicalIntro || `${item.summary} Ниже отделены контрольные точки, которые можно проверить по документам.`)}</p>
      </div>
      <div class="card-grid two rich-card-grid">${practical}
      </div>
    </section>
  </main>`;
};

const buildTaxCalendarMain = () => `<main>
    <section class="hero hero-inner calendar-hero">
      <div class="glass-panel hero-copy-panel route-graphic-panel">
        <p class="eyebrow">Контроль сроков</p>
        <h1>Налоговый календарь для ИП и организаций</h1>
        <p>Ближайшие даты отчетности, уведомлений и платежей собраны в одном месте. Выберите месяц и тип бизнеса, чтобы оставить только относящиеся к вам контрольные точки.</p>
        <div class="actions"><a class="button button-lime" href="#calendar">Показать сроки</a><a class="button button-ghost" href="/novosti/">Все новости</a></div>
      </div>
      <aside class="calendar-hero-status" aria-label="Ближайший налоговый срок">
        <time datetime="2026-07-27">27</time>
        <strong>июля 2026 года</strong>
        <span>Ближайший общий срок для части отчетности и уведомлений. Состав обязанностей зависит от режима, работников, имущества и операций.</span>
      </aside>
    </section>
    <section class="section" id="calendar" data-tax-calendar>
      <div class="section-header">
        <p class="eyebrow">Июль — август 2026</p>
        <h2>Выберите свои контрольные даты</h2>
        <p>Календарь разделяет представление отчетности, уведомление об исчисленных суммах и фактическую уплату. Это разные действия, даже когда сроки стоят рядом.</p>
      </div>
      <div class="tax-calendar-toolbar" aria-label="Фильтры налогового календаря">
        <div class="calendar-filter-set" aria-label="Месяц">
          <span class="calendar-filter-label">Месяц</span>
          <button class="calendar-filter-button is-active" type="button" data-calendar-month="all" aria-pressed="true">Все</button>
          <button class="calendar-filter-button" type="button" data-calendar-month="july" aria-pressed="false">Июль</button>
          <button class="calendar-filter-button" type="button" data-calendar-month="august" aria-pressed="false">Август</button>
        </div>
        <div class="calendar-filter-set" aria-label="Кому относится">
          <span class="calendar-filter-label">Кому относится</span>
          <button class="calendar-filter-button is-active" type="button" data-calendar-group="all" aria-pressed="true">Всем</button>
          <button class="calendar-filter-button" type="button" data-calendar-group="ip" aria-pressed="false">ИП</button>
          <button class="calendar-filter-button" type="button" data-calendar-group="ooo" aria-pressed="false">ООО</button>
          <button class="calendar-filter-button" type="button" data-calendar-group="employers" aria-pressed="false">Работодателям</button>
          <button class="calendar-filter-button" type="button" data-calendar-group="usn" aria-pressed="false">УСН</button>
          <button class="calendar-filter-button" type="button" data-calendar-group="vat" aria-pressed="false">НДС</button>
        </div>
        <strong class="calendar-result-count" data-calendar-count aria-live="polite">6 сроков</strong>
      </div>
      <div class="tax-calendar-list">
        <article class="tax-calendar-entry" id="july-27" data-calendar-entry data-month="july" data-groups="ip ooo employers usn vat">
          <time class="calendar-entry-date" datetime="2026-07-27"><strong>27</strong><span>июля</span></time>
          <div class="calendar-entry-copy">
            <h3>Отчетность за полугодие и уведомления об исчисленных суммах</h3>
            <p>Для части бизнеса наступает срок декларации по НДС за II квартал, 6-НДФЛ и расчета по страховым взносам за полугодие, персонифицированных сведений за июнь, а также уведомлений по НДФЛ, УСН и имущественным авансам. Проверяйте только обязанности своего режима.</p>
            <div class="calendar-entry-tags"><span>ИП</span><span>ООО</span><span>работодатели</span><span>УСН</span><span>НДС</span></div>
          </div>
          <div class="calendar-entry-action">
            <p>Подготовить отчет, уведомление, квитанцию приема и таблицу сумм к уплате.</p>
            <a class="news-more" href="https://www.nalog.gov.ru/rn62/news/activities_fts/16636561/" rel="nofollow noopener" target="_blank">Источник ФНС</a>
          </div>
        </article>
        <article class="tax-calendar-entry" id="july-28" data-calendar-entry data-month="july" data-groups="ip ooo employers usn vat">
          <time class="calendar-entry-date" datetime="2026-07-28"><strong>28</strong><span>июля</span></time>
          <div class="calendar-entry-copy">
            <h3>Уплата июльских налогов, авансов и страховых взносов</h3>
            <p>В зависимости от ситуации перечисляются НДФЛ за 1–22 июля, страховые взносы за июнь, аванс по УСН за полугодие, имущественные авансы организаций и первая треть НДС за II квартал. До платежа сверьте начисления и сальдо ЕНС.</p>
            <div class="calendar-entry-tags"><span>ЕНС</span><span>УСН</span><span>НДФЛ</span><span>взносы</span><span>НДС</span></div>
          </div>
          <div class="calendar-entry-action">
            <p>Сопоставить платеж с отчетом или уведомлением и сохранить подтверждение банка.</p>
            <a class="news-more" href="/novosti/sroki-uvedomleniy-i-platezhey-iyul-2026/">Разбор двух дат</a>
          </div>
        </article>
        <article class="tax-calendar-entry" id="august-3" data-calendar-entry data-month="august" data-groups="ip ooo employers">
          <time class="calendar-entry-date" datetime="2026-08-03"><strong>03</strong><span>августа</span></time>
          <div class="calendar-entry-copy">
            <h3>Уведомление по НДФЛ за 23–31 июля</h3>
            <p>Налоговые агенты представляют уведомление об исчисленном и удержанном НДФЛ за последнюю часть июля. ФНС указывает для этого периода код 33/11; нулевое уведомление без начислений не требуется.</p>
            <div class="calendar-entry-tags"><span>работодатели</span><span>НДФЛ</span><span>уведомление</span></div>
          </div>
          <div class="calendar-entry-action">
            <p>Сверить выплаты, даты удержания, сумму и код периода до подписания.</p>
            <a class="news-more" href="https://www.nalog.gov.ru/rn62/news/activities_fts/16636561/" rel="nofollow noopener" target="_blank">Источник ФНС</a>
          </div>
        </article>
        <article class="tax-calendar-entry" id="august-5" data-calendar-entry data-month="august" data-groups="ip ooo employers">
          <time class="calendar-entry-date" datetime="2026-08-05"><strong>05</strong><span>августа</span></time>
          <div class="calendar-entry-copy">
            <h3>Уплата НДФЛ, удержанного 23–31 июля</h3>
            <p>После уведомления налоговые агенты перечисляют НДФЛ за завершающий период июля. Проверьте, что сумма уведомления совпадает с регистрами по зарплате и обязательство корректно отражено на ЕНС.</p>
            <div class="calendar-entry-tags"><span>работодатели</span><span>НДФЛ</span><span>ЕНС</span></div>
          </div>
          <div class="calendar-entry-action">
            <p>Проверить платеж и отражение суммы по нужному обязательству.</p>
            <a class="news-more" href="/sverka-s-nalogovoy/">Перейти к сверке</a>
          </div>
        </article>
        <article class="tax-calendar-entry" id="august-25" data-calendar-entry data-month="august" data-groups="ip ooo employers vat">
          <time class="calendar-entry-date" datetime="2026-08-25"><strong>25</strong><span>августа</span></time>
          <div class="calendar-entry-copy">
            <h3>Сведения за июль и уведомление по НДФЛ за 1–22 августа</h3>
            <p>Работодатели готовят персонифицированные сведения за июль и уведомление по НДФЛ за период с 1 по 22 августа. Для организаций на ежемесячной отчетности могут возникать отдельные обязанности по налогу на прибыль; плательщики НДС проверяют вторую часть платежного цикла за II квартал.</p>
            <div class="calendar-entry-tags"><span>работодатели</span><span>НДФЛ</span><span>перссведения</span><span>организации</span></div>
          </div>
          <div class="calendar-entry-action">
            <p>Разделить отчетные сведения и уведомление по конкретному налогу.</p>
            <a class="news-more" href="https://www.nalog.gov.ru/rn77/calendar/" rel="nofollow noopener" target="_blank">Календарь ФНС</a>
          </div>
        </article>
        <article class="tax-calendar-entry" id="august-28" data-calendar-entry data-month="august" data-groups="ip ooo employers vat">
          <time class="calendar-entry-date" datetime="2026-08-28"><strong>28</strong><span>августа</span></time>
          <div class="calendar-entry-copy">
            <h3>НДФЛ, взносы за июль и вторая треть НДС за II квартал</h3>
            <p>К этой дате налоговые агенты перечисляют НДФЛ за 1–22 августа, работодатели — страховые взносы за июль, а плательщики НДС — очередную треть налога за II квартал. У организаций возможны и другие ежемесячные платежи по фактическим операциям.</p>
            <div class="calendar-entry-tags"><span>НДФЛ</span><span>взносы</span><span>НДС</span><span>платеж</span></div>
          </div>
          <div class="calendar-entry-action">
            <p>Проверить остаток ЕНС, назначение обязательства и подтверждение исполнения.</p>
            <a class="news-more" href="https://www.nalog.gov.ru/rn77/calendar/" rel="nofollow noopener" target="_blank">Календарь ФНС</a>
          </div>
        </article>
      </div>
      <p class="tax-calendar-empty" data-calendar-empty hidden>Для выбранного сочетания пока нет общих контрольных дат. Проверьте другой фильтр или официальный календарь ФНС.</p>
    </section>
    <section class="section page-rich-section route-graphic-panel">
      <div class="section-header">
        <p class="eyebrow">С 1 августа</p>
        <h2>Налоговые уведомления появятся на Госуслугах автоматически</h2>
        <p>Это изменение касается способа доставки имущественных уведомлений физическим лицам. Оно не выполняет оплату автоматически и не заменяет проверку объектов, льгот и сумм.</p>
      </div>
      <div class="calendar-notice">
        <p>Проверьте доступ к Госуслугам и Личному кабинету ФНС заранее. Если в документе будет неверный объект или период, сначала соберите подтверждение расхождения.</p>
        <a class="button button-lime" href="/novosti/nalogovye-uvedomleniya-gosuslugi-s-1-avgusta-2026/">Что изменится</a>
      </div>
    </section>
    <section class="section">
      <div class="section-header">
        <p class="eyebrow">Как пользоваться</p>
        <h2>Календарь — контрольный список, а не расчет обязательств</h2>
        <p>Общие даты помогают не пропустить проверку. Конкретный состав отчетов и платежей определяется режимом, работниками, имуществом, операциями и применимыми льготами.</p>
      </div>
      <div class="card-grid two rich-card-grid">
        <article class="glass-card rich-card"><span>01</span><h3>Отчет не равен уведомлению</h3><p>Декларация или расчет раскрывают налоговую базу, а уведомление помогает распределить сумму ЕНП до появления начисления у ФНС.</p></article>
        <article class="glass-card rich-card"><span>02</span><h3>Срок может переноситься</h3><p>Если установленная дата приходится на выходной, применяется предусмотренный законом перенос. В календаре указаны фактические ближайшие даты 2026 года.</p></article>
        <article class="glass-card rich-card"><span>03</span><h3>После отправки нужен контроль</h3><p>Сохраните квитанцию о приеме, подтверждение платежа и проверьте отражение обязательства на едином налоговом счете.</p></article>
        <article class="glass-card rich-card"><span>04</span><h3>При сомнении начинайте с фактов</h3><p>Определите режим, период, работников, имущество и операции. Эти данные важнее общего названия налога или формы.</p></article>
      </div>
    </section>
    <section class="section">
      <div class="calendar-notice">
        <p>Даты сверены с официальными материалами ФНС на 25 июля 2026 года. Перед отправкой документа проверяйте актуальный календарь ФНС и свою фактическую обязанность.</p>
        <a class="button button-ghost" href="https://www.nalog.gov.ru/rn77/calendar/" rel="nofollow noopener" target="_blank">Официальный календарь ФНС</a>
      </div>
    </section>
  </main>`;

const refreshTaxCalendarPage = (html) => {
  const fullTitle = "Налоговый календарь для ИП и ООО 2026 | Документы для бизнеса";
  const expectedCanonical = `https://dokumenty82.ru${taxCalendarRoute}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${expectedCanonical}#webpage`,
        url: expectedCanonical,
        name: "Налоговый календарь для ИП и организаций",
        description: taxCalendarDescription,
        dateModified: "2026-07-25",
        inLanguage: "ru-RU",
        isPartOf: { "@id": "https://dokumenty82.ru/#website" },
        about: { "@id": "https://dokumenty82.ru/#business" },
      },
      {
        "@type": "ItemList",
        name: "Ближайшие налоговые сроки июля и августа 2026 года",
        numberOfItems: 6,
        itemListElement: [
          ["2026-07-27", "Отчетность и уведомления"],
          ["2026-07-28", "Налоговые платежи"],
          ["2026-08-03", "Уведомление по НДФЛ"],
          ["2026-08-05", "Уплата НДФЛ"],
          ["2026-08-25", "Сведения и уведомления"],
          ["2026-08-28", "НДФЛ, взносы и НДС"],
        ].map(([date, name], index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${date}: ${name}`,
          url: `${expectedCanonical}#${date.startsWith("2026-07") ? "july" : "august"}-${Number(date.slice(-2))}`,
        })),
      },
    ],
  };

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${fullTitle}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${taxCalendarDescription}" />`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${expectedCanonical}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${fullTitle}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${taxCalendarDescription}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${expectedCanonical}" />`);
  html = html.replace(
    /\s*<!-- d82-service-schema:start -->[\s\S]*?<!-- d82-service-schema:end -->/,
    `\n    <!-- d82-calendar-schema:start -->\n    <script type="application/ld+json">${JSON.stringify(schema)}</script>\n    <!-- d82-calendar-schema:end -->`,
  );
  html = html.replace(/<main>[\s\S]*?<\/main>/i, buildTaxCalendarMain());
  html = html.replace(/\s*<script src="\/assets\/news-feed\.js\?v=\d+" defer><\/script>/, "");
  if (!html.includes("/assets/tax-calendar.js")) {
    html = html.replace(
      /(\s*<script src="\/assets\/metrika-goals\.js\?v=\d+" defer><\/script>)/,
      '\n    <script src="/assets/tax-calendar.js?v=202607251500" defer></script>$1',
    );
  }
  return html;
};

const refreshRegisteredNews = (html, item) => {
  const context = extractPageContext(html);
  const currentCanonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] || "";
  const expectedCanonical = `https://dokumenty82.ru${item.route}`;
  const oldDescription = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1] || "";
  const fullTitle = `${item.seoTitle || item.title} | Документы для бизнеса`;
  const dateModified = item.dateModified || "2026-07-12";

  if (currentCanonical && currentCanonical !== expectedCanonical) html = html.replaceAll(currentCanonical, expectedCanonical);
  if (context.h1) html = html.replaceAll(context.h1, item.title);
  if (oldDescription) html = html.replaceAll(oldDescription, item.summary);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(item.summary)}" />`);
  html = html.replace('<meta property="og:type" content="website" />', '<meta property="og:type" content="article" />');
  html = html.replace(/<meta property="article:modified_time" content="[^"]+"\s*\/?>/i, `<meta property="article:modified_time" content="${dateModified}" />`);
  if (!html.includes('property="article:published_time"')) {
    html = html.replace('<meta property="og:type" content="article" />', `<meta property="og:type" content="article" />\n    <meta property="article:published_time" content="${item.dateIso}" />\n    <meta property="article:modified_time" content="${dateModified}" />`);
  }

  const newsArticleSchema = {
    "@type": "NewsArticle",
    headline: item.title,
    description: item.summary,
    datePublished: item.dateIso,
    dateModified,
    mainEntityOfPage: `https://dokumenty82.ru${item.route}`,
    isBasedOn: item.article.sourceUrl,
    keywords: item.tags,
    author: { "@type": "Organization", name: "Документы для бизнеса", url: "https://dokumenty82.ru/" },
    publisher: { "@id": "https://dokumenty82.ru/#business" },
    inLanguage: "ru-RU",
  };
  const structuredData = item.article.faq?.length
    ? {
        "@context": "https://schema.org",
        "@graph": [
          newsArticleSchema,
          {
            "@type": "FAQPage",
            mainEntity: item.article.faq.map(([question, answer]) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          },
        ],
      }
    : { "@context": "https://schema.org", ...newsArticleSchema };
  const newsSchema = `
    <!-- d82-news-schema:start -->
    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
    <!-- d82-news-schema:end -->`;
  if (html.includes("<!-- d82-news-schema:start -->")) {
    html = html.replace(/\s*<!-- d82-news-schema:start -->[\s\S]*?<!-- d82-news-schema:end -->/, newsSchema);
  } else {
    html = html.replace("  </head>", `${newsSchema}\n  </head>`);
  }
  html = html.replace(/<main>[\s\S]*?<\/main>/i, buildNewsMain(item));
  return html;
};

const refreshNewsHub = (html) => {
  const cards = newsItems.map((item) => `
        <article class="news-card${item.badge ? " is-fresh" : ""}">
          ${item.badge ? `<div class="news-meta-row"><div class="news-meta">${escapeHtml(item.date)}</div><span class="news-fresh">${escapeHtml(item.badge)}</span></div>` : `<div class="news-meta">${escapeHtml(item.date)}</div>`}
          <h3><a href="${item.route}">${escapeHtml(item.title)}</a></h3>
          <p>${escapeHtml(item.cardSummary || item.summary)}</p>
          <div class="news-tags">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          <a class="news-more" href="${item.route}">Открыть заметку</a>
        </article>`).join("");
  const grid = `<div class="news-grid news-feed" data-news-feed tabindex="0" aria-label="Лента новостей ФНС">${cards}
      </div>`;
  html = html.replace(/<div class="news-grid news-feed"[\s\S]*?<\/div>\s*<\/section>/i, `${grid}\n    </section>`);
  html = html.replace(/<span class="news-feed-total">\d+ публикаций<\/span>/, `<span class="news-feed-total">${newsItems.length} публикаций</span>`);
  html = html.replace(/<span class="news-feed-position"([^>]*)>\d+ \/ \d+<\/span>/, `<span class="news-feed-position"$1>01 / ${String(newsItems.length).padStart(2, "0")}</span>`);
  const calendarPromo = `<section class="section calendar-promo-section">
      <div class="calendar-promo">
        <div>
          <p class="eyebrow">Новый инструмент</p>
          <h2>Налоговый календарь для ИП и организаций</h2>
          <p>Ближайшие отчеты, уведомления и платежи на июль и август 2026 года. Фильтры по ИП, ООО, работодателям, УСН и НДС помогают быстро оставить только свои даты.</p>
          <div class="actions"><a class="button button-lime" href="${taxCalendarRoute}">Открыть календарь</a><a class="button button-ghost" href="/novosti/sroki-uvedomleniy-i-platezhey-iyul-2026/">Сроки 27–28 июля</a></div>
        </div>
        <div class="calendar-next-date" aria-label="Ближайший срок 27 июля"><div><strong>27</strong><span>июля · ближайший срок</span></div></div>
      </div>
    </section>`;
  if (html.includes('<section class="section calendar-promo-section">')) {
    html = html.replace(/<section class="section calendar-promo-section">[\s\S]*?<\/section>/i, calendarPromo);
  } else {
    html = html.replace(/(<\/section>\s*)(<section class="section">)/i, `$1${calendarPromo}\n    $2`);
  }
  return html;
};

const refreshBlogRazbory = (html) => {
  const replacements = new Map([
    ["Наши разборы и маршруты", "Ситуации, с которых начинается документальный маршрут"],
    ["В блоге остаются материалы проекта: как подойти к документам, где начинается разбор и когда лучше перейти на страницу услуги. Официальные новости ФНС вынесены отдельно, чтобы не дублировать одну и ту же ленту.", "Здесь собраны входы в типовые ситуации: письмо из ИФНС, банковский запрос, несданная отчётность или изменение данных компании. Каждый разбор ведёт к своему комплекту документов, а не к универсальному шаблону."],
    ["Практические материалы: что проверить, какие вводные собрать и как выбрать безопасный документальный маршрут.", "Разбор начинается с отправителя, периода и цели документа, после чего становится понятен дальнейший маршрут."],
    ["Отдельный вход для требований, запросов банка и ситуаций, где нужно быстро понять ближайший шаг.", "Страница для случаев, когда срок уже идёт, а границы задачи и обязательный минимум документов пока неясны."],
    ["Основные направления подготовки документов, отчетности и ответов на запросы.", "Каталог направлений поможет перейти от общей ситуации к отчётности, банковскому комплекту или регистрационному действию."],
    ["Отдельная лента официальных сообщений ФНС с коротким объяснением для бизнеса.", "Свежие сообщения ФНС вынесены в самостоятельную ленту и снабжены ссылками на первоисточники."],
  ]);
  for (const [from, to] of replacements) html = html.replaceAll(from, to);
  html = html.replace('<a class="button button-lime" href="/blog/razbory/">Разборы ситуаций</a>', '<a class="button button-lime" href="/razbor-situacii/">Разобрать свою ситуацию</a>');
  return html;
};

let changed = 0;
let navigationUpdates = 0;
let serviceUpdates = 0;
let newsUpdates = 0;
let businessTypeUpdates = 0;

for (const file of walk(root)) {
  const route = routeForFile(file);
  if (requestedRoutes.size && !requestedRoutes.has(route)) continue;
  if (footerOnly && route.startsWith("/internal/")) continue;
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  const newsClass = route.startsWith("/novosti/") || route === "/novosti/" ? "is-active" : "";
  const siteCssVersion = "202608121730";
  html = html.replace(
    /\s*<link rel="icon" href="(?:https:\/\/dokumenty82\.ru)?\/favicon(?:-120)?\.(?:svg|png)"[^>]*\/>\s*(?:<link rel="icon" href="(?:https:\/\/dokumenty82\.ru)?\/favicon\.svg"[^>]*\/>\s*)?(?:<link rel="(?:alternate|shortcut) icon" href="(?:https:\/\/dokumenty82\.ru)?\/favicon\.ico"[^>]*\/>\s*)?(?:<link rel="apple-touch-icon" href="(?:https:\/\/dokumenty82\.ru)?\/apple-touch-icon\.png"[^>]*\/>\s*)?/i,
    `\n    ${faviconLinks}\n    `,
  );
  html = html.replace(/\/assets\/site\.css\?v=\d+/g, `/assets/site.css?v=${siteCssVersion}`);
  html = html.replace(/<nav aria-label="Разделы сайта">[\s\S]*?<\/nav>/g, footerNavigation);
  html = html.replace(/<div class="footer-buttons">[\s\S]*?<\/div>/g, footerButtons);
  html = html.replace(
    /<a class="[^"]*" href="\/">Документы<\/a>/g,
    `<a class="${route === "/uslugi/" ? "is-active" : ""}" href="/uslugi/">Услуги</a>`,
  );
  html = html.replace(
    /<a class="[^"]*" href="\/uslugi\/">Услуги<\/a>/g,
    `<a class="${route === "/uslugi/" ? "is-active" : ""}" href="/uslugi/">Услуги</a>`,
  );
  html = html.replace(/<a href="\/">Документы<\/a>/g, '<a href="/uslugi/">Услуги</a>');
  if (footerOnly || navigationOnly) {
    if (html !== before) {
      fs.writeFileSync(file, html, "utf8");
      changed += 1;
    }
    continue;
  }
  html = html.replace(/\/assets\/metrika-goals\.js\?v=\d+/g, "/assets/metrika-goals.js?v=202608091335");
  html = html.replace(/\/assets\/lead-form\.js\?v=\d+/g, "/assets/lead-form.js?v=202608061600");
  html = html.replace(/\/assets\/ai-chat\.js\?v=\d+/g, "/assets/ai-chat.js?v=202608101300");
  html = html.replace(/(<a[^>]*href="\/policy\/"[^>]*>)Конфиденциальность(?: и безопасность)?(<\/a>)/g, "$1Конфиденциальность и безопасность$2");
  if (!html.includes("/assets/metrika-goals.js")) {
    html = html.replace(
      /(\s*<script src="\/assets\/ai-chat\.js\?v=\d+" defer><\/script>)/,
      '\n    <script src="/assets/metrika-goals.js?v=202608091335" defer></script>$1',
    );
  }

  const withAccountingType = html.replaceAll('"ProfessionalService"', '"AccountingService"');
  if (withAccountingType !== html) businessTypeUpdates += 1;
  html = withAccountingType;
  html = html.replace(
    /"priceRange": "по запросу",/g,
    '"priceRange": "от 3 000 ₽",\n            "currenciesAccepted": "RUB",',
  );

  const withDesktopNews = html.replace(/(<a class="[^"]*" href="\/blog\/">Блог<\/a>)(<a class="[^"]*" href="\/ceny\/">Цены<\/a>)/g, `$1<a class="${newsClass}" href="/novosti/">Новости</a>$2`);
  const withMobileNews = withDesktopNews.replace(/(<a href="\/blog\/">Блог<\/a>)(<a href="\/ceny\/">Цены<\/a>)/g, '$1<a href="/novosti/">Новости</a>$2');
  if (withMobileNews !== html) navigationUpdates += 1;
  html = withMobileNews;

  if (indexedRoutes.has(route) && html.includes("Коротко отделим главный вопрос от сопутствующих тем и выберем следующий шаг.")) {
    const refreshed = refreshServicePage(html);
    if (refreshed !== html) serviceUpdates += 1;
    html = refreshed;
  }
  if (route === taxCalendarRoute) {
    const refreshed = refreshTaxCalendarPage(html);
    if (refreshed !== html) newsUpdates += 1;
    html = refreshed;
  } else if (route.startsWith("/novosti/") && route !== "/novosti/") {
    const registered = newsItems.find((item) => item.route === route && item.article);
    const refreshed = registered
      ? refreshRegisteredNews(html, registered)
      : indexedRoutes.has(route) ? refreshNewsArticle(html) : html;
    if (refreshed !== html) newsUpdates += 1;
    html = refreshed;
  }
  if (route === "/novosti/") html = refreshNewsHub(html);
  if (route === "/blog/razbory/") html = refreshBlogRazbory(html);

  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    changed += 1;
  }
}

console.log(`Changed HTML files: ${changed}`);
console.log(`Navigation updated: ${navigationUpdates}`);
console.log(`Service routes refreshed: ${serviceUpdates}`);
console.log(`News articles refreshed: ${newsUpdates}`);
console.log(`Business type updated: ${businessTypeUpdates}`);

console.log("Sitemap lastmod values are unchanged; update only routes whose indexable content was actually published.");
