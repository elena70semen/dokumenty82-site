import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pageEnhancements } from "../src/data/page-enhancements.mjs";

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(sourceRoot, "dist");
const publicRoot = path.join(sourceRoot, "public");
const stylesPath = path.join(sourceRoot, "src", "styles", "site.css");

const routes = JSON.parse(await readFile(path.join(sourceRoot, "src", "data", "routes.json"), "utf8"));
const site = JSON.parse(await readFile(path.join(sourceRoot, "src", "data", "site.json"), "utf8"));
const fnsNews = JSON.parse(await readFile(path.join(sourceRoot, "src", "data", "fns-news.json"), "utf8"));
const assetVersion = new Date().toISOString().replace(/\D/g, "").slice(0, 14);

await rm(distRoot, { recursive: true, force: true });
await mkdir(distRoot, { recursive: true });
await cp(publicRoot, distRoot, { recursive: true });
await mkdir(path.join(distRoot, "assets"), { recursive: true });
await cp(stylesPath, path.join(distRoot, "assets", "site.css"));

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

function routeToFile(route) {
  if (route === "/") return path.join(distRoot, "index.html");
  return path.join(distRoot, route.replace(/^\/|\/$/g, ""), "index.html");
}

function activeClass(pageRoute, item) {
  if (item.match?.some((prefix) => pageRoute === prefix || pageRoute.startsWith(prefix))) return " is-active";
  if (item.href !== "/#documents" && pageRoute === item.href) return " is-active";
  return "";
}

function canonicalFor(route) {
  return `${site.siteUrl}${route === "/" ? "/" : route}`;
}

function upsertPage(page) {
  const index = routes.pages.findIndex((item) => item.route === page.route);
  if (index >= 0) {
    routes.pages[index] = { ...routes.pages[index], ...page };
    return;
  }
  routes.pages.push(page);
}

const navItems = [
  { href: "/razbor-situacii/", label: "\u0420\u0430\u0437\u0431\u043e\u0440 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0438" },
  { href: "/#documents", label: "\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b" },
  { href: "/otchetnost/", label: "\u041e\u0442\u0447\u0451\u0442\u043d\u043e\u0441\u0442\u044c", match: ["/otchetnost/", "/otvet-na-trebovanie-ifns/", "/deklaraciya-usn/", "/nulevaya-otchetnost-ooo/", "/nulevaya-otchetnost-ip/", "/vosstanovlenie-buhucheta/"] },
  { href: "/bank-i-115-fz/", label: "\u0411\u0430\u043d\u043a \u0438 115-\u0424\u0417", match: ["/bank-i-115-fz/", "/otvet-na-zapros-banka/", "/dokumenty-dlya-banka-115-fz/"] },
  { href: "/blog/", label: "\u0411\u043b\u043e\u0433", match: ["/blog/"] },
  { href: "/novosti/", label: "\u041d\u043e\u0432\u043e\u0441\u0442\u0438", match: ["/novosti/"] },
  { href: "/o-proekte/", label: "\u041e \u043d\u0430\u0441" },
  { href: "/kontakty/", label: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b" },
];

upsertPage({
  route: "/blog/",
  slug: "blog",
  inSitemap: true,
  title: "Блог: разборы документов для бизнеса | Документы для бизнеса",
  description: "Разборы ситуаций, маршруты подготовки документов и переходы к полезным разделам сайта без дубля официальных новостей.",
  robots: "index, follow",
  canonical: canonicalFor("/blog/"),
  h1: "Блог: разборы документов для бизнеса",
});

upsertPage({
  route: "/blog/obnovleniya-fns/",
  slug: "blog/obnovleniya-fns",
  inSitemap: false,
  title: "Новости ФНС переехали | Документы для бизнеса",
  description: "Официальные новости ФНС теперь собраны в отдельном разделе сайта.",
  robots: "noindex, follow",
  canonical: canonicalFor("/blog/obnovleniya-fns/"),
  h1: "Новости ФНС теперь в отдельном разделе",
});

upsertPage({
  route: "/novosti/",
  slug: "novosti",
  inSitemap: true,
  title: "Новости ФНС для бизнеса | Документы для бизнеса",
  description: "Короткие обзоры официальных сообщений ФНС для предпринимателей Симферополя и Крыма.",
  robots: "index, follow",
  canonical: canonicalFor("/novosti/"),
  h1: "Новости ФНС для бизнеса",
});

for (const item of fnsNews) {
  const route = `/novosti/${item.slug}/`;
  upsertPage({
    route,
    slug: `novosti/${item.slug}`,
    inSitemap: true,
    title: `${item.title} | Документы для бизнеса`,
    description: item.summary,
    robots: "index, follow",
    canonical: canonicalFor(route),
    h1: item.title,
    newsItem: item,
  });
}

const cards = [
  ["\u0420\u0430\u0437\u0434\u0435\u043b", "\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b \u0434\u043b\u044f \u0431\u0438\u0437\u043d\u0435\u0441\u0430", "\u041f\u043e\u043a\u0430\u0436\u0438\u0442\u0435 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044e - \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u043c, \u043a\u0430\u043a\u0438\u0435 \u0432\u0432\u043e\u0434\u043d\u044b\u0435 \u043d\u0443\u0436\u043d\u044b \u0434\u0430\u043b\u044c\u0448\u0435.", "/razbor-situacii/"],
  ["\u0420\u0430\u0437\u0434\u0435\u043b", "\u041e\u0442\u0447\u0451\u0442\u043d\u043e\u0441\u0442\u044c \u0438 \u043d\u0430\u043b\u043e\u0433\u043e\u0432\u044b\u0435 \u0432\u043e\u043f\u0440\u043e\u0441\u044b", "\u0420\u0430\u0437\u0431\u0435\u0440\u0451\u043c \u043f\u0435\u0440\u0438\u043e\u0434, \u0440\u0435\u0436\u0438\u043c \u0438 \u0438\u0441\u0445\u043e\u0434\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435.", "/otchetnost/"],
  ["\u0420\u0430\u0437\u0434\u0435\u043b", "\u0411\u0430\u043d\u043a \u0438 115-\u0424\u0417", "\u0421\u043f\u043e\u043a\u043e\u0439\u043d\u043e \u0440\u0430\u0437\u0431\u0435\u0440\u0451\u043c \u0437\u0430\u043f\u0440\u043e\u0441 \u0431\u0430\u043d\u043a\u0430 \u0438 \u043f\u043e\u043d\u044f\u0442\u043d\u044b\u0439 \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0442.", "/bank-i-115-fz/"],
  ["\u0420\u0430\u0437\u0434\u0435\u043b", "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0438 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f", "\u041f\u043e\u043c\u043e\u0436\u0435\u043c \u043d\u0430\u0447\u0430\u0442\u044c \u0441 \u0446\u0435\u043b\u0438 \u0438 \u0441\u043e\u0431\u0440\u0430\u0442\u044c \u0432\u0432\u043e\u0434\u043d\u044b\u0435.", "/registraciya-i-likvidaciya/"],
  ["\u0420\u0430\u0437\u0434\u0435\u043b", "\u041a\u0430\u0434\u0440\u044b", "\u0421\u043c\u043e\u0442\u0440\u0438\u043c \u043a\u0430\u0434\u0440\u043e\u0432\u0443\u044e \u0437\u0430\u0434\u0430\u0447\u0443 \u0438 \u0440\u0430\u0431\u043e\u0447\u0438\u0439 \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0442.", "/kadry/"],
  ["\u0420\u0430\u0437\u0434\u0435\u043b", "\u0421\u043e\u043f\u0440\u043e\u0432\u043e\u0436\u0434\u0435\u043d\u0438\u0435", "\u0412\u044b\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u043c \u043f\u043e\u0440\u044f\u0434\u043e\u043a: \u0447\u0442\u043e \u043f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c, \u0441\u043e\u0431\u0440\u0430\u0442\u044c \u0438 \u043f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u0438\u0442\u044c.", "/soprovozhdenie/"],
];

function messengerLinks() {
  const telegramIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M21.94 4.15c.3-1.31-.46-1.83-1.34-1.48L2.7 9.58c-1.22.48-1.2 1.15-.22 1.45l4.58 1.43 1.76 5.5c.23.7.12.98.78.98.51 0 .74-.23 1.03-.51l2.47-2.4 5.13 3.79c.94.52 1.62.25 1.86-.88l3.35-15.75Zm-14.16 7.98 10.48-6.62c.52-.32 1-.14.6.22l-8.97 8.1-.35 3.74-1.76-5.44Z" />
    </svg>`;
  const maxIcon = `
    <svg viewBox="0 0 64 64" aria-hidden="true" class="max-logo-icon">
      <path fill="#fff" d="M31.7 12.6c-12.2 0-21.2 8.8-21.2 20.2 0 6.3 2.5 11.9 6.7 15.7-.15 2.4-.58 4.6-1.2 6.7-.25.86.65 1.58 1.43 1.13 2.33-1.32 4.7-2.86 6.74-4.59a24.1 24.1 0 0 0 7.53 1.2c12.2 0 21.8-8.82 21.8-20.18S43.9 12.6 31.7 12.6Zm.24 9.1c6.75 0 12.08 4.65 12.08 11.06 0 6.35-5.33 11.05-12.08 11.05-2.73 0-5.14-.7-7.12-2.04l-1.15-.78-1.03.93c-.78.7-1.62 1.38-2.48 2.02.18-.94.32-1.9.42-2.87l.11-1.12-.84-.75c-2.38-2.11-3.82-5.13-3.82-8.44 0-6.41 5.08-11.06 11.91-11.06Z" />
      <path fill="#fff" d="M25.2 35.2c.78-3.22 3.13-5.4 6.6-5.4 3.51 0 5.86 2.13 6.62 5.4h-5.1c-.37-.9-.92-1.33-1.55-1.33-.68 0-1.21.44-1.58 1.33h-5Z" />
    </svg>`;
  const emailIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.75 6.75h14.5v10.5H4.75z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" />
      <path d="m5.35 7.35 6.65 5.15 6.65-5.15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`;

  return `
    <a class="messenger messenger-telegram" href="${escapeHtml(site.telegramHref)}" aria-label="Написать в Telegram">${telegramIcon}</a>
    <a class="messenger messenger-max" href="${escapeHtml(site.maxHref)}" aria-label="Написать в MAX">${maxIcon}</a>
    <a class="messenger messenger-email" href="${escapeHtml(site.emailHref)}" aria-label="Написать на email">${emailIcon}</a>
  `;
}

function header(page) {
  return `
    <header class="site-header">
      <a class="brand" href="/" aria-label="Документы для бизнеса - на главную">
        <img src="/assets/images/brand-logo-open-book.png" alt="" />
        <span><strong>Документы для бизнеса</strong><small>${escapeHtml(site.subtitle)}</small></span>
      </a>
      <nav class="desktop-nav" aria-label="Основная навигация">
        ${navItems.map((item) => `<a class="${activeClass(page.route, item).trim()}" href="${item.href}">${item.label}</a>`).join("")}
      </nav>
      <div class="header-actions" aria-label="Быстрые контакты">${messengerLinks()}<a class="phone-pill" href="${escapeHtml(site.phoneHref)}">${escapeHtml(site.phone)}</a></div>
      <details class="mobile-menu">
        <summary aria-label="Открыть меню"><span></span></summary>
        <nav>${navItems.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}${messengerLinks()}<a href="${escapeHtml(site.phoneHref)}">${escapeHtml(site.phone)}</a></nav>
      </details>
    </header>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="footer-brand">
        <a class="brand" href="/">
          <img src="/assets/images/brand-logo-open-book.png" alt="" />
          <span><strong>Документы для бизнеса</strong><small>${escapeHtml(site.subtitle)}</small></span>
        </a>
        <p>Разберём ситуацию и подготовим документы. Спокойный первый шаг для предпринимателей и компаний в Симферополе.</p>
        <div class="footer-contact-row">
          <iframe src="https://yandex.ru/sprav/widget/rating-badge/1302424560?type=rating" width="150" height="50" frameborder="0" title="Рейтинг организации в Яндексе"></iframe>
          ${messengerLinks()}
        </div>
      </div>
      <nav aria-label="Разделы сайта">
        <strong>Разделы</strong>
        <div class="footer-links">
          <a href="/razbor-situacii/">Разбор ситуации</a>
          <a href="/#documents">Документы</a>
          <a href="/otchetnost/">Отчётность</a>
          <a href="/bank-i-115-fz/">Банк и 115-ФЗ</a>
          <a href="/kontakty/">Контакты</a>
          <a href="/policy/">Политика конфиденциальности</a>
        </div>
      </nav>
      <address>
        <strong>Контакты</strong>
        <span>${escapeHtml(site.address)}</span>
        <span>офис рядом с налоговой</span>
        <a href="${escapeHtml(site.phoneHref)}">${escapeHtml(site.phone)}</a>
        <div class="footer-buttons"><a class="button button-lime" href="${escapeHtml(site.phoneHref)}">Позвонить</a><a class="button button-ghost" href="/kontakty/">Контакты</a></div>
      </address>
    </footer>`;
}

function compactList(items) {
  return `<ul class="compact-list">${items.map(([number, text, href, description]) => {
    const detail = description ? `<small>${escapeHtml(description)}</small>` : "";
    const content = `<span>${escapeHtml(number)}</span><div><strong>${escapeHtml(text)}</strong>${detail}</div>`;
    return href ? `<li><a href="${href}">${content}</a></li>` : `<li><div class="compact-row">${content}</div></li>`;
  }).join("")}</ul>`;
}

function enhancementFor(page) {
  return pageEnhancements[page.route] ?? {};
}

function displayTitle(page) {
  return enhancementFor(page).metaTitle ?? page.title;
}

function displayDescription(page) {
  return enhancementFor(page).metaDescription ?? page.description;
}

function displayH1(page) {
  return enhancementFor(page).h1 ?? page.h1;
}

function displayOgTitle(page) {
  return enhancementFor(page).ogTitle ?? enhancementFor(page).metaTitle ?? page.ogTitle ?? page.title;
}

function displayOgDescription(page) {
  return enhancementFor(page).ogDescription ?? enhancementFor(page).metaDescription ?? page.ogDescription ?? page.description;
}

function faqJsonLd(page) {
  const faq = enhancementFor(page).faq ?? [];
  if (!faq.length) return "";

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function homeBody(page) {
  return `
    <section class="hero hero-stack">
      <div class="glass-panel hero-copy-panel home-hero-copy">
        <p class="hero-location-badge"><span>Симферополь - офис рядом с налоговой</span></p>
        <h1>${escapeHtml(displayH1(page))}</h1>
        <p>${escapeHtml(displayDescription(page))}</p>
        <div class="actions"><a class="button button-lime" href="/razbor-situacii/">Разобрать ситуацию</a><a class="button button-ghost" href="#documents">Документы и услуги</a></div>
      </div>
      <aside class="glass-panel hero-choice-panel">
        <p class="eyebrow">Первый шаг</p>
        <h2>С чего начать?</h2>
        <p class="hero-choice-description">Выберите ближайшую ситуацию — это поможет сразу перейти к нужному маршруту.</p>
        ${compactList([["01", "Пришло требование или письмо", "/otvet-na-trebovanie-ifns/", "Разберём документ, период и что именно нужно ответить."], ["02", "Банк запросил документы", "/otvet-na-zapros-banka/", "Соберём понятный комплект подтверждений без лишнего шума."], ["03", "Нужна отчётность", "/otchetnost/", "Уточним период, режим и исходные данные для подготовки."], ["04", "Неясно, с чего начать", "/razbor-situacii/", "Отделим основной вопрос и предложим ближайший безопасный шаг."]])}
      </aside>
    </section>
    <section id="documents" class="section">
      <p class="eyebrow">Разделы</p>
      <h2>Выберите ближайший вход в задачу</h2>
      <p>Если вопрос смешанный или непонятный, начните с разбора ситуации. Так проще отделить документы, вводные и следующий шаг.</p>
      <div class="card-grid">${cards.map(([label, title, text, href], index) => `<a class="glass-card" href="${href}"><span>${label} ${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></a>`).join("")}</div>
    </section>
    <section class="section">
      <p class="eyebrow">Как проходит</p>
      <h2>От вопроса к спокойному следующему шагу</h2>
      <p>Мы не ускоряем выводы. Сначала смотрим источник вопроса, затем выбираем точный маршрут.</p>
      <div class="card-grid two">${["Описываете ситуацию", "Смотрим вводные", "Выбираем направление", "Фиксируем следующий шаг"].map((title, index) => `<article class="glass-card"><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>Коротко фиксируем вводные и отделяем главный вопрос от сопутствующих тем.</p></article>`).join("")}</div>
    </section>`;
}

function sectionHeader(eyebrow, title, text) {
  return `
    <div class="section-header">
      <p class="eyebrow">${escapeHtml(eyebrow)}</p>
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(text)}</p>
    </div>`;
}

function paragraphList(paragraphs = []) {
  return paragraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join("");
}

function itemList(items = []) {
  return `<ul class="rich-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderSectionCard(section, index) {
  return `
    <article class="glass-card rich-card">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${escapeHtml(section.title)}</h3>
      ${itemList(section.items)}
    </article>`;
}

function renderStepCard(text, index) {
  return `
    <article class="glass-card rich-card rich-step-card">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${escapeHtml(text)}</h3>
    </article>`;
}

function renderFaqCard([question, answer], index) {
  return `
    <article class="glass-card rich-card faq-card">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${escapeHtml(question)}</h3>
      <p>${escapeHtml(answer)}</p>
    </article>`;
}

function renderRelatedLinks(links = []) {
  if (!links.length) return "";
  return `
    <section class="section page-rich-section related-section">
      ${sectionHeader("Смежные страницы", "Куда перейти дальше", "Если задача шире одной страницы, эти разделы помогут собрать полный маршрут.")}
      <div class="card-grid related-grid">
        ${links.map(([href, label], index) => `
          <a class="glass-card related-card" href="${escapeHtml(href)}">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${escapeHtml(label)}</h3>
            <p>Открыть смежный маршрут и уточнить вводные по этой части задачи.</p>
          </a>`).join("")}
      </div>
    </section>`;
}

function renderPageEnhancement(page) {
  const data = pageEnhancements[page.route];
  if (!data) return "";

  return `
    <section class="section page-rich-section rich-intro-section">
      <p class="eyebrow">${escapeHtml(data.eyebrow ?? "Разбор")}</p>
      <h2>${escapeHtml(data.title ?? page.h1)}</h2>
      <div class="rich-copy">${paragraphList(data.intro)}</div>
    </section>
    <section class="section page-rich-section">
      ${sectionHeader("Практический разбор", "Что важно проверить", "Собрали основные сценарии, документы и вводные, чтобы страница была полезной сама по себе.")}
      <div class="card-grid two rich-card-grid">${(data.sections ?? []).map(renderSectionCard).join("")}</div>
    </section>
    <section class="section page-rich-section">
      ${sectionHeader("Как проходит работа", "От обращения к понятному результату", "Двигаемся по шагам: сначала факты и документы, затем маршрут и следующий безопасный шаг.")}
      <div class="card-grid two rich-step-grid">${(data.steps ?? []).map(renderStepCard).join("")}</div>
    </section>
    <section class="section page-rich-section">
      ${sectionHeader("Сроки, результат и риски", "Что получает клиент и почему лучше не затягивать", "Не обещаем решения за ИФНС, банк или регистрирующий орган, но помогаем подготовить понятную документальную позицию.")}
      <div class="card-grid two rich-card-grid">
        <article class="glass-card rich-card">
          <span>01</span>
          <h3>Сроки и результат</h3>
          ${paragraphList(data.result)}
        </article>
        <article class="glass-card rich-card">
          <span>02</span>
          <h3>Риски</h3>
          ${itemList(data.risks)}
        </article>
      </div>
    </section>
    <section class="section page-rich-section faq-section">
      ${sectionHeader("FAQ", "Частые вопросы", "Короткие ответы по типовым сомнениям перед обращением.")}
      <div class="card-grid two faq-grid">${(data.faq ?? []).map(renderFaqCard).join("")}</div>
    </section>
    ${renderRelatedLinks(data.links)}`;
}

function blogBody(page) {
  if (page.route === "/blog/obnovleniya-fns/") {
    return `
    <section class="hero hero-inner">
      <div class="glass-panel hero-copy-panel">
        <p class="eyebrow">Переходник</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p>Чтобы не смешивать наши разборы и официальные сообщения, новости ФНС вынесены в отдельный раздел. Здесь оставлена только навигация для старого адреса.</p>
        <div class="actions"><a class="button button-lime" href="/novosti/">Открыть новости ФНС</a><a class="button button-ghost" href="/blog/">Вернуться в блог</a></div>
      </div>
    </section>`;
  }

  const blogCards = [
    ["01", "Разборы ситуаций", "Практические материалы: что проверить, какие вводные собрать и как выбрать безопасный документальный маршрут.", "/blog/razbory/"],
    ["02", "Срочные вопросы", "Отдельный вход для требований, запросов банка и ситуаций, где нужно быстро понять ближайший шаг.", "/srochnye-voprosy/"],
    ["03", "Документы и услуги", "Основные направления подготовки документов, отчетности и ответов на запросы.", "/#documents"],
    ["04", "Новости ФНС", "Отдельная лента официальных сообщений ФНС с коротким объяснением для бизнеса.", "/novosti/"],
  ];
  return `
    <section class="hero hero-inner">
      <div class="glass-panel hero-copy-panel">
        <p class="eyebrow">Полезные материалы</p>
        <h1>${escapeHtml(displayH1(page))}</h1>
        <p>${escapeHtml(displayDescription(page))}</p>
        <div class="actions"><a class="button button-lime" href="/blog/razbory/">Разборы ситуаций</a><a class="button button-ghost" href="/novosti/">Новости ФНС</a></div>
      </div>
    </section>
    <section class="section">
      ${sectionHeader("Блог", "Наши разборы и маршруты", "В блоге остаются материалы проекта: как подойти к документам, где начинается разбор и когда лучше перейти на страницу услуги. Официальные новости ФНС вынесены отдельно, чтобы не дублировать одну и ту же ленту.")}
      <div class="card-grid two">${blogCards.map(([number, title, text, href]) => `<a class="glass-card" href="${href}"><span>${number}</span><h3>${title}</h3><p>${text}</p></a>`).join("")}</div>
    </section>`;
}

function newsIndexBody(page) {
  return `
    <section class="hero hero-inner">
      <div class="glass-panel hero-copy-panel route-graphic-panel">
        <p class="eyebrow">Официальные источники</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p>${escapeHtml(page.description)}</p>
        <div class="actions"><a class="button button-lime" href="/razbor-situacii/">Разобрать ситуацию</a><a class="button button-ghost" href="/blog/">Блог проекта</a></div>
      </div>
    </section>
    <section class="section">
      ${sectionHeader("Лента", "Коротко о новостях ФНС", "Мы не перепечатываем официальные сообщения полностью. На каждой карточке — спокойное резюме, что может быть важно для документов, отчетности, платежей или ответа на запрос.")}
      <div class="news-grid">
        ${fnsNews.map((item) => newsCard(item)).join("")}
      </div>
    </section>`;
}

function newsCard(item) {
  const tags = (item.tags ?? []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  return `
    <article class="news-card">
      <div class="news-meta">${formatDate(item.date)}</div>
      <h3><a href="/novosti/${escapeHtml(item.slug)}/">${escapeHtml(item.title)}</a></h3>
      <p>${escapeHtml(item.summary)}</p>
      <div class="news-tags">${tags}</div>
      <a class="news-more" href="/novosti/${escapeHtml(item.slug)}/">Открыть заметку</a>
    </article>`;
}

function newsArticleBody(page) {
  const item = page.newsItem;
  if (!item) return newsIndexBody(page);
  const related = (item.related ?? []).map((href) => {
    const route = routes.pages.find((candidate) => candidate.route === href);
    return `<a href="${escapeHtml(href)}">${escapeHtml(route?.h1 ?? href)}</a>`;
  }).join("");

  return `
    <section class="hero hero-inner">
      <article class="glass-panel news-article">
        <p class="eyebrow">Новости ФНС · ${formatDate(item.date)}</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p>${escapeHtml(item.summary)}</p>
        <div class="news-tags">${(item.tags ?? []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      </article>
    </section>
    <section class="section news-article-section">
      <div class="news-article-body">
        ${(item.body ?? []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        <h2>Что проверить бизнесу</h2>
        <ul>${(item.businessImpact ?? []).map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
        <div class="news-source">
          <span>Официальный источник:</span>
          <a href="${escapeHtml(item.sourceUrl)}" rel="nofollow noopener" target="_blank">${escapeHtml(item.sourceTitle)}</a>
        </div>
      </div>
    </section>
    <section class="section">
      ${sectionHeader("Связанные страницы", "Куда перейти дальше", "Если новость касается вашей ситуации, лучше выбрать страницу по задаче и собрать вводные до ответа.")}
      <div class="news-related">${related}</div>
    </section>`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));
}

function aboutBody(page) {
  return `
    <section class="hero hero-inner">
      <div class="glass-panel hero-copy-panel">
        <p class="eyebrow">О проекте</p>
        <h1>${escapeHtml(displayH1(page))}</h1>
        <p>${escapeHtml(displayDescription(page))}</p>
        <div class="actions"><a class="button button-lime" href="/kontakty/">Связаться</a><a class="button button-ghost" href="/#documents">Документы и услуги</a></div>
      </div>
    </section>
    <section class="section">
      ${sectionHeader("Формат работы", "Спокойный первый шаг без лишней публичности", "Сначала фиксируем ситуацию и вводные, затем предлагаем понятный документальный маршрут. Чувствительные материалы не отправляются через открытый публичный поток.")}
      <div class="card-grid two">
        <article class="glass-card"><span>01</span><h3>Локальный офис</h3><p>Работаем в Симферополе и принимаем обращения по документам для бизнеса.</p></article>
        <article class="glass-card"><span>02</span><h3>Разбор вводных</h3><p>Отделяем главный вопрос от сопутствующих тем, чтобы не собирать лишнее.</p></article>
        <article class="glass-card"><span>03</span><h3>Документальный маршрут</h3><p>Подсказываем, какой комплект, ответ или следующий шаг подходит к ситуации.</p></article>
        <article class="glass-card"><span>04</span><h3>Безопасная передача</h3><p>Персональные данные и документы согласуются отдельно, без публичной загрузки.</p></article>
      </div>
    </section>`;
}

function yandexMapPlaceholder() {
  return `
    <section class="section map-section" id="map">
      ${sectionHeader("Карта", "Офис на карте", "Офис в Симферополе рядом с налоговой. Можно посмотреть точку на карте и построить маршрут.")}
      <div class="yandex-map-embed" aria-label="Яндекс.Карта офиса">
        <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A5009632e210239dd5c72bf481e0341979c2e6d6087bf0d785fb1c44059b5fd84&amp;width=1280&amp;height=525&amp;lang=ru_RU&amp;scroll=true"></script>
      </div>
    </section>`;
}

function contactsBody(page) {
  const contactItems = [
    ["01", "Позвонить", "Быстро согласовать вопрос и удобный способ передачи вводных.", site.phoneHref],
    ["02", "Telegram", "Написать коротко по ситуации и получить дальнейший маршрут.", site.telegramHref],
    ["03", "MAX", "Связаться через MAX, если так удобнее для текущей переписки.", site.maxHref],
    ["04", "Email", "Отправить общий вопрос или запросить безопасный способ передачи материалов.", site.emailHref],
  ];
  return `
    <section class="hero hero-inner">
      <div class="glass-panel hero-copy-panel contact-hero-panel">
        <p class="eyebrow">Контакты</p>
        <h1>${escapeHtml(displayH1(page))}</h1>
        <p>${escapeHtml(displayDescription(page))}</p>
        <div class="contact-inline">
          <a class="button button-lime" href="${escapeHtml(site.phoneHref)}">Позвонить</a>
          <a class="button button-ghost" href="https://yandex.ru/maps/?text=${encodeURIComponent(site.address)}">Построить маршрут</a>
        </div>
      </div>
    </section>
    <section class="section">
      ${sectionHeader("Связаться", "Выберите удобный способ", "Для чувствительных документов сначала согласуем безопасный канал. На сайте не нужно публично загружать персональные данные.")}
      <div class="card-grid two contact-grid">${contactItems.map(([number, title, text, href]) => `<a class="glass-card" href="${escapeHtml(href)}"><span>${number}</span><h3>${title}</h3><p>${text}</p></a>`).join("")}</div>
    </section>
    ${yandexMapPlaceholder()}`;
}

function crmLeadForm() {
  return `
    <form class="crm-lead-form" method="post" enctype="multipart/form-data" data-crm-form="amo" data-endpoint="">
      <div class="form-grid">
        <label>Тема обращения<input name="subject" autocomplete="off" placeholder="Например: запрос банка, требование ИФНС" /></label>
        <label>Контакт<input name="contact" autocomplete="tel email" placeholder="Телефон, email или мессенджер" /></label>
      </div>
      <label>Что нужно разобрать<textarea name="message" rows="5" placeholder="Коротко опишите ситуацию без чувствительных данных"></textarea></label>
      <label>Файлы<input name="files" type="file" multiple /></label>
      <p class="form-note">Форма подготовлена под отправку в AmoCRM через серверный endpoint. До подключения endpoint файлы не отправляются.</p>
      <button class="button button-lime" type="submit" disabled>Отправка будет подключена позже</button>
    </form>`;
}

function pageBody(page) {
  if (page.route === "/") return homeBody(page);
  if (page.route === "/novosti/") return newsIndexBody(page);
  if (page.route.startsWith("/novosti/")) return newsArticleBody(page);
  if (page.route.startsWith("/blog/")) return blogBody(page);
  if (page.route === "/o-proekte/") return aboutBody(page);
  if (page.route === "/kontakty/") return contactsBody(page);
  return innerBody(page);
}

function innerBody(page) {
  const heroPanelClass = page.route === "/razbor-situacii/"
    ? "glass-panel hero-copy-panel route-graphic-panel"
    : "glass-panel hero-copy-panel";

  return `
    <section class="hero hero-inner hero-stack">
      <div class="${heroPanelClass}">
        <p class="eyebrow">Документы для бизнеса</p>
        <h1>${escapeHtml(displayH1(page))}</h1>
        <p>${escapeHtml(displayDescription(page))}</p>
        <div class="actions"><a class="button button-lime" href="/razbor-situacii/">Разобрать ситуацию</a><a class="button button-ghost" href="/kontakty/">Контакты</a></div>
      </div>
      <aside class="glass-panel hero-choice-panel">
        <p class="eyebrow">Безопасный маршрут</p>
        <h2>Сначала фиксируем вводные</h2>
        <p class="hero-choice-description">Коротко отделим главный вопрос от сопутствующих тем и выберем следующий шаг.</p>
        ${compactList([["01", "Что произошло", "/razbor-situacii/", "Опишите запрос, письмо или задачу в двух-трёх фразах."], ["02", "Какие документы есть", "/#documents", "Отделим готовые материалы от того, что ещё нужно уточнить."], ["03", "Что нужно показать", "/kontakty/", "Выберем безопасный способ без публичной загрузки файлов."], ["04", "Куда двигаться дальше", "/razbor-situacii/", "Соберём маршрут: ответ, комплект документов или контакт."]])}
      </aside>
    </section>
    <section class="section">
      <p class="eyebrow">Порядок</p>
      <h2>Как мы подходим к задаче</h2>
      <p>Не стоит отвечать вслепую. Сначала нужно понять, какой вопрос задан, какие документы уже есть и что относится к ситуации.</p>
      <div class="card-grid two">
        <article class="glass-card"><span>01</span><h3>Что важно на старте</h3><p>Короткое описание ситуации, документ или запрос, период и цель обращения.</p></article>
        <article class="glass-card"><span>02</span><h3>Что не публикуем</h3><p>Персональные данные, реквизиты и чувствительные материалы остаются вне открытого сайта.</p></article>
        <article class="glass-card"><span>03</span><h3>Как связаться</h3><p>Можно позвонить, написать в мессенджер или перейти в контакты.</p></article>
        <article class="glass-card"><span>04</span><h3>Следующий шаг</h3><p>После разбора станет понятно, какой комплект документов или маршрут нужен.</p></article>
      </div>
    </section>
    ${renderPageEnhancement(page)}`;
}

function metrika(id) {
  return `<script type="text/javascript">
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${id}', 'ym');
      ym(${id}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute; left:-9999px;" alt="" /></div></noscript>`;
}

function pageHtml(page) {
  const canonical = page.canonical ? `<link rel="canonical" href="${escapeHtml(page.canonical)}" />` : "";
  const faqSchema = faqJsonLd(page);
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(displayTitle(page))}</title>
    <meta name="description" content="${escapeHtml(displayDescription(page))}" />
    <meta name="robots" content="${escapeHtml(page.robots ?? "index, follow")}" />
    <meta name="googlebot" content="index, follow, max-image-preview:large" />
    ${canonical}
    <meta property="og:title" content="${escapeHtml(displayOgTitle(page))}" />
    <meta property="og:description" content="${escapeHtml(displayOgDescription(page))}" />
    <meta property="og:url" content="${escapeHtml(page.canonical ?? `${site.siteUrl}${page.route}`)}" />
    <meta property="og:site_name" content="Документы для бизнеса" />
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:type" content="website" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="alternate icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/assets/site.css?v=${assetVersion}" />
${faqSchema ? `    ${faqSchema}\n` : ""}    ${metrika(site.metrikaId)}
  </head>
  <body>
    ${header(page)}
    <main>${pageBody(page)}</main>
    ${footer()}
    <a class="ai-chat-widget" href="/razbor-situacii/" aria-label="Задать вопрос срочно">
      <span>AI</span>
      <strong>Задать вопрос срочно</strong>
    </a>
    <div class="cookie-notice" id="cookie-notice"><p>Сайт использует cookies и техническую аналитику. Продолжая пользоваться сайтом, вы соглашаетесь с <a href="/policy/">политикой конфиденциальности</a>.</p><button type="button">Понятно</button></div>
    <script>
      (() => {
        const notice = document.getElementById('cookie-notice');
        if (!notice) return;
        document.body.classList.add('cookie-open');
        const hideNotice = () => {
          document.body.classList.remove('cookie-open');
          notice.hidden = true;
          notice.setAttribute('aria-hidden', 'true');
          notice.style.display = 'none';
        };
        try {
          if (localStorage.getItem('d82_cookie_ok') === '1') {
            hideNotice();
            return;
          }
        } catch (error) {}
        notice.querySelector('button')?.addEventListener('click', () => {
          try { localStorage.setItem('d82_cookie_ok', '1'); } catch (error) {}
          hideNotice();
        });
      })();
    </script>
  </body>
</html>`;
}

function sitemapXml() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries = routes.pages
    .filter((page) => page.inSitemap && !String(page.robots ?? "").toLowerCase().includes("noindex"))
    .sort((a, b) => a.route.localeCompare(b.route, "ru"))
    .map((page) => {
      const loc = page.canonical ?? canonicalFor(page.route);
      const changefreq = page.route.startsWith("/novosti/") ? "weekly" : "monthly";
      const priority = page.route === "/" ? "1.0" : page.route === "/novosti/" || page.route === "/blog/" ? "0.7" : "0.6";
      return `  <url>
    <loc>${escapeHtml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

for (const page of routes.pages) {
  const filePath = routeToFile(page.route);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, pageHtml(page), "utf8");
}

await writeFile(path.join(distRoot, "sitemap.xml"), sitemapXml(), "utf8");

console.log(JSON.stringify({
  pages: routes.pages.length,
  dist: path.relative(sourceRoot, distRoot).replaceAll(path.sep, "/"),
}, null, 2));
