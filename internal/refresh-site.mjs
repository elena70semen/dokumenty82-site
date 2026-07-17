import fs from "node:fs";
import path from "node:path";

import { newsItems } from "./news-registry.mjs";

const root = path.resolve(import.meta.dirname, "..");
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
for (const item of newsItems.filter((entry) => entry.article)) {
  const target = path.join(root, item.route.slice(1), "index.html");
  if (!fs.existsSync(target)) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(articleTemplate, target);
  }
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
  const checklist = item.article.checklist.map((point) => `<li>${escapeHtml(point)}</li>`).join("");
  const practical = item.article.practical.map(([title, description], index) => `
        <article class="glass-card rich-card">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(description)}</p>
        </article>`).join("");
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
        ${paragraphs}
        <h2>Что проверить</h2>
        <ul>${checklist}</ul>
        <div class="news-source">
          <span>Официальный источник:</span>
          <a href="${item.article.sourceUrl}" rel="nofollow noopener" target="_blank">${escapeHtml(item.article.sourceTitle)}</a>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="section-header">
        <p class="eyebrow">Связанные страницы</p>
        <h2>Куда перейти дальше</h2>
        <p>Для темы «${escapeHtml(item.title)}» выберите раздел по фактической задаче и соберите только относящиеся к ней документы.</p>
      </div>
      <div class="news-related">${related}</div>
    </section>
    <section class="section page-rich-section route-graphic-panel">
      <div class="section-header">
        <p class="eyebrow">Практический вывод</p>
        <h2>Как применить официальную информацию</h2>
        <p>${escapeHtml(item.summary)} Ниже отделены контрольные точки, которые можно проверить по документам.</p>
      </div>
      <div class="card-grid two rich-card-grid">${practical}
      </div>
    </section>
  </main>`;
};

const refreshRegisteredNews = (html, item) => {
  const context = extractPageContext(html);
  const currentCanonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] || "";
  const expectedCanonical = `https://dokumenty82.ru${item.route}`;
  const oldDescription = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1] || "";
  const fullTitle = `${item.title} | Документы для бизнеса`;

  if (currentCanonical && currentCanonical !== expectedCanonical) html = html.replaceAll(currentCanonical, expectedCanonical);
  if (context.h1) html = html.replaceAll(context.h1, item.title);
  if (oldDescription) html = html.replaceAll(oldDescription, item.summary);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(item.summary)}" />`);
  html = html.replace('<meta property="og:type" content="website" />', '<meta property="og:type" content="article" />');
  html = html.replace(/<meta property="article:modified_time" content="[^"]+"\s*\/?>/i, '<meta property="article:modified_time" content="2026-07-12" />');
  if (!html.includes('property="article:published_time"')) {
    html = html.replace('<meta property="og:type" content="article" />', `<meta property="og:type" content="article" />\n    <meta property="article:published_time" content="${item.dateIso}" />\n    <meta property="article:modified_time" content="2026-07-12" />`);
  }

  const newsSchema = `
    <!-- d82-news-schema:start -->
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: item.title,
      description: item.summary,
      datePublished: item.dateIso,
      dateModified: "2026-07-12",
      mainEntityOfPage: `https://dokumenty82.ru${item.route}`,
      isBasedOn: item.article.sourceUrl,
      author: { "@type": "Organization", name: "Документы для бизнеса", url: "https://dokumenty82.ru/" },
      publisher: { "@id": "https://dokumenty82.ru/#business" },
      inLanguage: "ru-RU",
    })}</script>
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
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  const newsClass = route.startsWith("/novosti/") || route === "/novosti/" ? "is-active" : "";
  html = html.replace(/\/assets\/site\.css\?v=\d+/g, "/assets/site.css?v=202607161622");
  html = html.replace(/\/assets\/metrika-goals\.js\?v=\d+/g, "/assets/metrika-goals.js?v=202607121220");
  html = html.replace(/\/assets\/lead-form\.js\?v=\d+/g, "/assets/lead-form.js?v=202607151704");
  html = html.replace(/\/assets\/ai-chat\.js\?v=\d+/g, "/assets/ai-chat.js?v=202607161622");
  html = html.replace(/(<a[^>]*href="\/policy\/"[^>]*>)Конфиденциальность(?: и безопасность)?(<\/a>)/g, "$1Конфиденциальность и безопасность$2");
  if (!html.includes("/assets/metrika-goals.js")) {
    html = html.replace(
      /(\s*<script src="\/assets\/ai-chat\.js\?v=\d+" defer><\/script>)/,
      '\n    <script src="/assets/metrika-goals.js?v=202607121220" defer></script>$1',
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
  if (indexedRoutes.has(route) && route.startsWith("/novosti/") && route !== "/novosti/") {
    const registered = newsItems.find((item) => item.route === route && item.article);
    const refreshed = registered ? refreshRegisteredNews(html, registered) : refreshNewsArticle(html);
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
