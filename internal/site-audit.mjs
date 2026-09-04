import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const serviceFeed = fs.readFileSync(path.join(root, "services.yml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(https:\/\/dokumenty82\.ru(?:\/[^<]*)?)<\/loc>/g)].map((match) => match[1]);
const registry = JSON.parse(fs.readFileSync(path.join(root, "seo-route-registry.json"), "utf8"));
const legalName = "Индивидуальный предприниматель Барков Андрей Андреевич";
const taxId = "672908329933";
const ogrnip = "325670000053721";

const decode = (value) => value
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">");

const cleanText = (value) => decode(value)
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const meta = (html, name) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${escaped}["']`, "i"),
  ];
  return patterns.map((pattern) => html.match(pattern)?.[1]).find(Boolean) || "";
};

const pages = urls.map((url) => {
  const route = new URL(url).pathname;
  const file = route === "/" ? path.join(root, "index.html") : path.join(root, route.slice(1), "index.html");
  const html = fs.readFileSync(file, "utf8");
  const title = cleanText(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
  const h1 = cleanText(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1]
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1]
    || "";
  const mainHtml = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
  const schemaBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim());
  const paragraphs = [...mainHtml.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => cleanText(match[1]))
    .filter((text) => text.length >= 90 && !text.includes("Сайт использует cookies"));
  const visible = cleanText(mainHtml);
  return {
    route,
    file,
    html,
    title,
    description: meta(html, "description"),
    robots: meta(html, "robots"),
    canonical,
    h1,
    mainHtml,
    words: visible.split(/\s+/).filter(Boolean).length,
    visible,
    paragraphs,
    schemaBlocks,
  };
});

const duplicateValues = (field) => {
  const groups = new Map();
  for (const page of pages) {
    const value = page[field];
    if (!value) continue;
    const routes = groups.get(value) || [];
    routes.push(page.route);
    groups.set(value, routes);
  }
  return [...groups.entries()].filter(([, routes]) => routes.length > 1);
};

const paragraphOwners = new Map();
for (const page of pages) {
  for (const paragraph of new Set(page.paragraphs)) {
    const routes = paragraphOwners.get(paragraph) || [];
    routes.push(page.route);
    paragraphOwners.set(paragraph, routes);
  }
}

const repeatedParagraphs = [...paragraphOwners.entries()]
  .filter(([, routes]) => routes.length > 1)
  .sort((a, b) => b[1].length - a[1].length || b[0].length - a[0].length);

const feedTagValue = (block, tag) => decode(
  block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"))?.[1] || "",
).trim();

const feedParamValue = (block, name) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return decode(
    block.match(new RegExp(`<param\\s+name=["']${escaped}["'][^>]*>([\\s\\S]*?)<\\/param>`, "i"))?.[1] || "",
  ).trim();
};

const serviceOffers = [...serviceFeed.matchAll(/<offer\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/offer>/gi)]
  .map((match) => ({
    id: match[1],
    block: match[2],
    name: feedTagValue(match[2], "name"),
    url: feedTagValue(match[2], "url"),
    picture: feedTagValue(match[2], "picture"),
    price: feedTagValue(match[2], "price"),
    currencyId: feedTagValue(match[2], "currencyId"),
    categoryId: feedTagValue(match[2], "categoryId"),
    description: feedTagValue(match[2], "description"),
    priceFrom: /<price\s+[^>]*from=["']true["'][^>]*>/i.test(match[2]),
    rating: feedParamValue(match[2], "Рейтинг"),
    reviewCount: feedParamValue(match[2], "Число отзывов"),
  }));

const serviceCategories = new Set(
  [...serviceFeed.matchAll(/<category\s+id="([^"]+)"[^>]*>/gi)].map((match) => match[1]),
);

const serviceSets = new Map(
  [...serviceFeed.matchAll(/<set\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/set>/gi)]
    .map((match) => [match[1], feedTagValue(match[2], "url")]),
);

const requiredServiceParams = [
  "Рейтинг",
  "Число отзывов",
  "Годы опыта",
  "Регион",
  "Конверсия",
  "Работа по договору",
  "Безналичный расчет",
];
const numericServiceParams = new Set(["Рейтинг", "Число отзывов", "Годы опыта", "Конверсия"]);

const duplicateServiceField = (field) => {
  const groups = new Map();
  for (const offer of serviceOffers) {
    const value = offer[field];
    if (!value) continue;
    const ids = groups.get(value) || [];
    ids.push(offer.id);
    groups.set(value, ids);
  }
  return [...groups.entries()].filter(([, ids]) => ids.length > 1);
};

const issues = [];
const cleanParamRules = fs.readFileSync(path.join(root, "robots.txt"), "utf8")
  .split(/\r?\n/)
  .map((line) => line.split("#", 1)[0].trim())
  .filter((line) => /^Clean-param:/i.test(line))
  .map((line) => line.slice(line.indexOf(":") + 1).trim());
const globalCleanParams = new Set(cleanParamRules
  .filter((rule) => rule.split(/\s+/).length === 1)
  .flatMap((rule) => rule.split("&")));
for (const param of ["utm_device", "utm_match"]) {
  if (!globalCleanParams.has(param)) issues.push(`robots.txt: missing global Clean-param for ${param}`);
}
if (cleanParamRules.some((rule) => rule.length > 500)) issues.push("robots.txt: Clean-param rule exceeds 500 characters");
const sitemapRoutes = new Set(pages.map((page) => page.route));
const pagesByRoute = new Map(pages.map((page) => [page.route, page]));
const registryRoutes = new Set(registry.indexable_routes);
const indexNowKeyFiles = fs.readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /^[A-Za-z0-9-]{8,128}\.txt$/.test(entry.name))
  .filter((entry) => fs.readFileSync(path.join(root, entry.name), "utf8").trim() === entry.name.slice(0, -4));

if (indexNowKeyFiles.length !== 1) issues.push(`IndexNow key files: expected 1, found ${indexNowKeyFiles.length}`);
if (!/<yml_catalog date="\d{4}-\d{2}-\d{2} \d{2}:\d{2}">/.test(serviceFeed)) issues.push("services.yml: invalid catalog date");
if (!/<yml_catalog[\s\S]*?<shop>[\s\S]*?<offers>[\s\S]*?<\/offers>[\s\S]*?<\/shop>[\s\S]*?<\/yml_catalog>/.test(serviceFeed)) {
  issues.push("services.yml: invalid YML catalog structure");
}
if (feedTagValue(serviceFeed, "company") !== legalName) issues.push("services.yml: legal performer name is missing");
if (serviceOffers.length < 30) issues.push(`services.yml: expected at least 30 unique service offers, found ${serviceOffers.length}`);
if (serviceSets.size < 30) issues.push(`services.yml: expected at least 30 unique service sets, found ${serviceSets.size}`);
if (!serviceFeed.includes("<category id=\"2\" parentId=\"1\">Бухгалтерское и налоговое сопровождение</category>")) {
  issues.push("services.yml: accounting services category missing");
}
for (const offer of serviceOffers) {
  if (offer.name !== "Документы для бизнеса") issues.push(`services.yml: ${offer.id} has invalid performer name`);
  if (!offer.url) issues.push(`services.yml: ${offer.id} is missing url`);
  if (!offer.picture) issues.push(`services.yml: ${offer.id} is missing picture`);
  if (!offer.description) issues.push(`services.yml: ${offer.id} is missing description`);
  if (offer.currencyId !== "RUR") issues.push(`services.yml: ${offer.id} currencyId must be RUR`);
  if (!serviceCategories.has(offer.categoryId)) {
    issues.push(`services.yml: ${offer.id} references unknown category ${offer.categoryId || "missing"}`);
  }
  if (!offer.priceFrom) issues.push(`services.yml: ${offer.id} price must use from=\"true\"`);
  if (!Number.isFinite(Number(offer.price)) || Number(offer.price) < 0) issues.push(`services.yml: ${offer.id} has invalid price`);
  const setIds = feedTagValue(offer.block, "set-ids").split(",").map((value) => value.trim()).filter(Boolean);
  if (setIds.length === 0) issues.push(`services.yml: ${offer.id} is missing set-ids`);
  for (const setId of setIds) {
    if (!serviceSets.has(setId)) {
      issues.push(`services.yml: ${offer.id} references unknown set ${setId}`);
    } else if (serviceSets.get(setId) !== offer.url) {
      issues.push(`services.yml: ${offer.id} and set ${setId} use different urls`);
    }
  }
  if (offer.url) {
    const route = new URL(offer.url).pathname;
    const page = pagesByRoute.get(route);
    if (!page) {
      issues.push(`services.yml: ${offer.id} url is not an indexable sitemap page`);
    } else {
      const visiblePrice = page.visible.replace(/\s+/g, "");
      if (!visiblePrice.includes(`${Number(offer.price)}₽`)) {
        issues.push(`services.yml: ${offer.id} price ${offer.price} is not visible on ${route}`);
      }
      const visibleRating = page.visible.replaceAll(",", ".");
      if (Number(offer.rating) > 0 && !visibleRating.includes(offer.rating)) {
        issues.push(`services.yml: ${offer.id} rating ${offer.rating} is not visible on ${route}`);
      }
      if (Number(offer.reviewCount) > 0 && !page.visible.includes(`${offer.reviewCount} отзыв`)) {
        issues.push(`services.yml: ${offer.id} review count ${offer.reviewCount} is not visible on ${route}`);
      }
      const schemaNodes = page.schemaBlocks.flatMap((block) => {
        try {
          const schema = JSON.parse(block);
          return Array.isArray(schema["@graph"]) ? schema["@graph"] : [schema];
        } catch {
          return [];
        }
      });
      const serviceNode = schemaNodes.find((node) => {
        const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
        return types.includes("Service");
      });
      const schemaOffer = Array.isArray(serviceNode?.offers) ? serviceNode.offers[0] : serviceNode?.offers;
      if (!schemaOffer || schemaOffer["@type"] !== "Offer") {
        issues.push(`services.yml: ${offer.id} is missing Offer schema on ${route}`);
      } else {
        if (Number(schemaOffer.price) !== Number(offer.price)) issues.push(`services.yml: ${offer.id} schema price differs from feed`);
        if (schemaOffer.priceCurrency !== "RUB") issues.push(`services.yml: ${offer.id} schema currency must be RUB`);
        if (schemaOffer.url !== offer.url) issues.push(`services.yml: ${offer.id} schema url differs from feed`);
      }
      if (route !== "/") {
        const breadcrumbNode = schemaNodes.find((node) => {
          const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
          return types.includes("BreadcrumbList");
        });
        const breadcrumbItems = breadcrumbNode?.itemListElement;
        if (!Array.isArray(breadcrumbItems) || breadcrumbItems.length < 3) {
          issues.push(`services.yml: ${offer.id} is missing BreadcrumbList schema on ${route}`);
        } else {
          const expectedItems = [
            "https://dokumenty82.ru/",
            "https://dokumenty82.ru/uslugi/",
            offer.url,
          ];
          for (const [index, expectedItem] of expectedItems.entries()) {
            const item = breadcrumbItems[index];
            if (Number(item?.position) !== index + 1 || item?.item !== expectedItem || !item?.name) {
              issues.push(`services.yml: ${offer.id} has invalid breadcrumb item ${index + 1} on ${route}`);
            }
          }
        }
      }
    }
  }
  for (const paramName of requiredServiceParams) {
    const value = feedParamValue(offer.block, paramName);
    if (!value) {
      issues.push(`services.yml: ${offer.id} is missing required param ${paramName}`);
    } else if (numericServiceParams.has(paramName) && (!Number.isFinite(Number(value)) || Number(value) < 0)) {
      issues.push(`services.yml: ${offer.id} has invalid numeric param ${paramName}`);
    }
  }
  if (Number(feedParamValue(offer.block, "Рейтинг")) !== 0) {
    issues.push(`services.yml: ${offer.id} must not use the organization rating as an offer rating`);
  }
  if (Number(feedParamValue(offer.block, "Число отзывов")) !== 0) {
    issues.push(`services.yml: ${offer.id} must not use organization reviews as offer reviews`);
  }
  if (Number(feedParamValue(offer.block, "Годы опыта")) <= 0) issues.push(`services.yml: ${offer.id} has empty experience param`);
}
for (const [id, ids] of duplicateServiceField("id")) issues.push(`services.yml: duplicate offer id ${id} (${ids.join(", ")})`);
for (const [url, ids] of duplicateServiceField("url")) issues.push(`services.yml: duplicate offer url ${url} (${ids.join(", ")})`);
for (const [picture, ids] of duplicateServiceField("picture")) issues.push(`services.yml: duplicate picture url ${picture} (${ids.join(", ")})`);
for (const route of registryRoutes) if (!sitemapRoutes.has(route)) issues.push(`${route}: registry route missing from sitemap`);
for (const route of sitemapRoutes) if (!registryRoutes.has(route)) issues.push(`${route}: sitemap route missing from registry`);

for (const page of pages) {
  const expectedCanonical = `https://dokumenty82.ru${page.route}`;
  if (!/^index\s*,\s*follow/i.test(page.robots)) issues.push(`${page.route}: robots=${page.robots || "missing"}`);
  if (page.canonical !== expectedCanonical) issues.push(`${page.route}: canonical=${page.canonical || "missing"}`);
  if (!page.title) issues.push(`${page.route}: missing title`);
  if (!page.description) issues.push(`${page.route}: missing description`);
  if (!page.h1) issues.push(`${page.route}: missing h1`);
  if (!page.html.match(/<nav class="desktop-nav"[\s\S]*?href="\/novosti\/"/i)) issues.push(`${page.route}: News missing from desktop navigation`);
  if (!page.html.match(/<nav class="desktop-nav"[\s\S]*?href="\/akcii\/"[^>]*>Акции<\/a>/i)) issues.push(`${page.route}: Promotions missing from desktop navigation`);
  if (!page.html.match(/<nav class="desktop-nav"[\s\S]*?href="\/uslugi\/"[^>]*>Услуги<\/a>/i)) issues.push(`${page.route}: Services catalog missing from desktop navigation`);
  if (!page.html.match(/<nav aria-label="Разделы сайта">[\s\S]*?href="\/buhgalterskie-uslugi\/"[^>]*>Бухгалтерия<\/a>/i)) {
    issues.push(`${page.route}: Accounting services missing from footer navigation`);
  }
  if (!page.html.includes("/assets/metrika-goals.js")) issues.push(`${page.route}: Metrika contact goals script missing`);
  if (!page.html.includes("/assets/theme-toggle.js")) issues.push(`${page.route}: Theme toggle script missing`);
  if (page.html.indexOf("/assets/theme-toggle.js") > page.html.indexOf("/assets/site.css")) {
    issues.push(`${page.route}: Theme toggle script must load before site.css`);
  }
  if (page.html.includes('"ProfessionalService"')) issues.push(`${page.route}: deprecated ProfessionalService schema type`);
  for (const [index, block] of page.schemaBlocks.entries()) {
    try {
      JSON.parse(block);
    } catch (error) {
      issues.push(`${page.route}: invalid JSON-LD block ${index + 1}: ${error.message}`);
    }
  }

  const localReferences = [...page.html.matchAll(/(?:href|src)="(\/[^"]*)"/gi)].map((match) => match[1]);
  for (const reference of new Set(localReferences)) {
    const pathname = reference.split(/[?#]/, 1)[0];
    if (!pathname || pathname.startsWith("/api/") || pathname.startsWith("//")) continue;
    const target = pathname === "/"
      ? path.join(root, "index.html")
      : pathname.endsWith("/")
        ? path.join(root, pathname.slice(1), "index.html")
        : path.join(root, pathname.slice(1));
    if (!fs.existsSync(target)) issues.push(`${page.route}: broken local reference ${reference}`);
  }
}

const homePage = pages.find((page) => page.route === "/");
if (!homePage?.html.includes('"AccountingService"')) issues.push("/: missing AccountingService schema type");
if (!homePage?.html.includes('"hasOfferCatalog"')) issues.push("/: missing service catalog link in business schema");
if (!homePage?.html.includes("https://yandex.ru/maps/org/1302424560/")) issues.push("/: missing Yandex Business sameAs link");
if (!homePage?.html.includes(`"legalName": "${legalName}"`)) issues.push("/: legal business name missing from schema");
if (!homePage?.html.includes(`"taxID": "${taxId}"`)) issues.push("/: INN missing from business schema");

const legalPage = pages.find((page) => page.route === "/rekvizity/");
if (!legalPage) {
  issues.push("/rekvizity/: legal details page missing");
} else {
  for (const value of [legalName, taxId, ogrnip, "Работа выполняется на основании согласованного договора", "Оплата производится безналично"]) {
    if (!legalPage.visible.includes(value)) issues.push(`/rekvizity/: missing required legal detail ${value}`);
  }
}

const pricingPage = pages.find((page) => page.route === "/ceny/");
if (!pricingPage?.html.includes('"OfferCatalog"')) issues.push("/ceny/: missing OfferCatalog schema");
if ((pricingPage?.html.match(/"@type"\s*:\s*"Offer"/g) || []).length < 10) issues.push("/ceny/: too few service offers in schema");

const reviewsPage = pages.find((page) => page.route === "/otzyvy/");
if (!reviewsPage?.html.includes("https://yandex.ru/maps/org/1302424560/reviews/")) issues.push("/otzyvy/: missing Yandex reviews link");

const servicesPage = pages.find((page) => page.route === "/uslugi/");
if (!servicesPage?.html.includes('"@type":"ItemList"')) issues.push("/uslugi/: missing ItemList schema");
if (!servicesPage?.html.includes('class="service-tree-grid"')) issues.push("/uslugi/: service tree navigation missing");
if ((servicesPage?.html.match(/class="service-tree-group"/g) || []).length < 5) issues.push("/uslugi/: service tree has too few groups");
for (const route of serviceOffers.map((offer) => new URL(offer.url).pathname)) {
  if (!servicesPage?.html.includes(`href="${route}"`)) issues.push(`/uslugi/: missing direct link to ${route}`);
}

const commercialHubCoverage = new Map([
  ["/buhgalterskie-uslugi/", [
    "/soprovozhdenie/", "/buhgalterskoe-soprovozhdenie-ooo/", "/sdacha-otchetnosti-ip/",
    "/sdacha-otchetnosti-ooo/", "/vosstanovlenie-buhucheta/", "/kadry/",
    "/raschet-nalogovoy-nagruzki/", "/sverka-s-nalogovoy/", "/otvet-na-trebovanie-ifns/",
  ]],
  ["/otchetnost/", [
    "/deklaraciya-usn/", "/sdacha-otchetnosti-ip/", "/sdacha-otchetnosti-ooo/",
    "/nulevaya-otchetnost-ip/", "/nulevaya-otchetnost-ooo/", "/vosstanovlenie-buhucheta/",
    "/ausn-krym/", "/nalogi-i-rezhimy/", "/otvet-na-trebovanie-ifns/", "/sverka-s-nalogovoy/",
  ]],
  ["/nalogi-i-rezhimy/", [
    "/ausn-krym/", "/raschet-nalogovoy-nagruzki/", "/nds-pri-usn-2026/", "/registraciya-ip/",
    "/izmenenie-okved-ip/", "/izmenenie-okved-ooo/", "/likvidaciya-ip/", "/likvidaciya-ooo/",
    "/deklaraciya-usn/", "/sverka-s-nalogovoy/", "/otvet-na-trebovanie-ifns/", "/nulevaya-otchetnost-ip/",
  ]],
  ["/registraciya-i-likvidaciya/", [
    "/registraciya-ip/", "/registraciya-ooo/", "/likvidaciya-ip/", "/likvidaciya-ooo/",
    "/izmenenie-okved-ip/", "/izmenenie-okved-ooo/", "/adres-egryul-direktor/", "/smena-direktora-ooo/",
    "/smena-yuridicheskogo-adresa-ooo/", "/yuridicheskiy-adres-simferopol/",
    "/nedostovernost-yuridicheskogo-adresa/", "/buhgalterskoe-soprovozhdenie-ooo/",
  ]],
  ["/bank-i-115-fz/", [
    "/otvet-na-zapros-banka/", "/dokumenty-dlya-banka-115-fz/", "/razbor-situacii/", "/kontakty/",
    "/srochnye-voprosy/", "/raschet-nalogovoy-nagruzki/", "/sverka-s-nalogovoy/", "/otvet-na-trebovanie-ifns/",
  ]],
]);
for (const [hubRoute, routes] of commercialHubCoverage) {
  const hubPage = pages.find((page) => page.route === hubRoute);
  if (!hubPage) {
    issues.push(`${hubRoute}: commercial hub missing`);
    continue;
  }
  for (const route of routes) {
    if (!hubPage.mainHtml.includes(`href="${route}"`)) issues.push(`${hubRoute}: missing contextual commercial link to ${route}`);
  }
}

const commercialProofMarkers = new Map([
  ["/registraciya-ip/", [
    "без привязки к банку",
    "через 3 рабочих дня",
    "https://www.nalog.gov.ru/create_business/ip/creation/registration/step4/",
  ]],
  ["/likvidaciya-ooo/", [
    "В течение 3 рабочих дней после решения",
    "Стоимость начинается от 45 000 ₽",
    "https://www.nalog.gov.ru/rn77/related_activities/registration_ip_yl/reg_yl/termination_activities/",
  ]],
  ["/buhgalterskie-uslugi/", [
    "Простое ООО также может обслуживаться по базовому тарифу",
    "фиксируем ежемесячный состав задач и стоимость",
    "сопровождение по всему Крыму и Севастополю",
    "Феодосии, Ялты, Евпатории, Керчи, Севастополя",
  ]],
  ["/soprovozhdenie/", [
    "сопровождение ИП по всему Крыму и Севастополю",
    "Сопровождение ИП без привязки к городу",
  ]],
  ["/buhgalterskoe-soprovozhdenie-ooo/", [
    "сопровождение ООО по всему Крыму и Севастополю",
    "Сопровождение ООО по Крыму и Севастополю",
  ]],
]);
for (const [route, markers] of commercialProofMarkers) {
  const page = pages.find((candidate) => candidate.route === route);
  for (const marker of markers) {
    if (!page?.mainHtml.includes(marker)) issues.push(`${route}: missing commercial proof marker: ${marker}`);
  }
}

for (const route of ["/buhgalterskie-uslugi/", "/soprovozhdenie/", "/buhgalterskoe-soprovozhdenie-ooo/"]) {
  const page = pagesByRoute.get(route);
  if (!page) continue;
  const nodes = page.schemaBlocks.flatMap((block) => {
    try {
      const schema = JSON.parse(block);
      return schema["@graph"] || [schema];
    } catch {
      return [];
    }
  });
  for (const type of ["LocalBusiness", "Service"]) {
    const node = nodes.find((item) => [item["@type"]].flat().includes(type));
    if (!node?.areaServed?.some((area) => area["@type"] === "City" && area.name === "Севастополь")) {
      issues.push(`${route}: Sevastopol missing from ${type} areaServed`);
    }
  }
  if ((page.html.match(/id="quick-lead"/g) || []).length !== 1) {
    issues.push(`${route}: expected one quick lead section`);
  }
  if ((page.html.match(/<script src="\/assets\/lead-form\.js\?/g) || []).length !== 1) {
    issues.push(`${route}: expected one lead form script`);
  }
}

const metrikaGoalsSource = fs.readFileSync(path.join(root, "assets", "metrika-goals.js"), "utf8");
if (!metrikaGoalsSource.includes('reachGoal("service_route_click"')) issues.push("Metrika: service_route_click event missing");
for (const route of new Set(serviceOffers.map((offer) => new URL(offer.url).pathname))) {
  if (!metrikaGoalsSource.includes(`["${route}"`)) issues.push(`Metrika: commercial route mapping missing for ${route}`);
}

const minimumInboundSupport = new Map([
  ["/otvet-na-zapros-banka/", 60],
  ["/ausn-krym/", 8],
  ["/deklaraciya-usn/", 10],
  ["/izmenenie-okved-ip/", 5],
  ["/izmenenie-okved-ooo/", 6],
  ["/kadry/", 7],
  ["/likvidaciya-ip/", 6],
  ["/nedostovernost-yuridicheskogo-adresa/", 7],
  ["/nulevaya-otchetnost-ip/", 6],
  ["/nulevaya-otchetnost-ooo/", 6],
  ["/sdacha-otchetnosti-ip/", 5],
  ["/sdacha-otchetnosti-ooo/", 6],
]);
for (const [route, minimum] of minimumInboundSupport) {
  const inboundPages = pages.filter((page) => page.html.includes(`href="${route}"`)).length;
  if (inboundPages < minimum) issues.push(`${route}: only ${inboundPages} internal referring pages; expected at least ${minimum}`);
}

const faqPage = pages.find((page) => page.route === "/faq/");
if (!faqPage?.html.includes('"@type":"FAQPage"')) issues.push("/faq/: missing FAQPage schema");
if (faqPage) {
  const faqSchemas = faqPage.schemaBlocks
    .map((block) => {
      try { return JSON.parse(block); } catch { return null; }
    })
    .filter((schema) => schema?.["@type"] === "FAQPage");
  const faqQuestions = faqSchemas.flatMap((schema) => schema.mainEntity || []);
  if (faqQuestions.length < 8) issues.push(`/faq/: only ${faqQuestions.length} FAQ questions; expected at least 8`);

  const requiredFaqLinks = [
    "/registraciya-ip/",
    "/registraciya-ooo/",
    "/nalogi-i-rezhimy/",
    "/ausn-krym/",
    "/buhgalterskie-uslugi/",
    "/soprovozhdenie/",
    "/otchetnost/",
    "/bank-i-115-fz/",
    "/dokumenty-dlya-banka-115-fz/",
    "/otvet-na-trebovanie-ifns/",
  ];
  for (const route of requiredFaqLinks) {
    if (!faqPage.mainHtml.includes(`href="${route}"`)) issues.push(`/faq/: missing contextual link to ${route}`);
  }
}

const reviewsContextSources = pages.filter((page) => (
  page.route !== "/otzyvy/" && page.mainHtml.includes('href="/otzyvy/"')
));
if (reviewsContextSources.length === 0) issues.push("/otzyvy/: missing contextual link from another sitemap page");

console.log(`Sitemap pages: ${pages.length}`);
console.log(`Service feed offers: ${serviceOffers.length}`);
console.log(`Technical issues: ${issues.length}`);
for (const issue of issues) console.log(`  ${issue}`);
for (const field of ["title", "description", "h1"]) {
  const duplicates = duplicateValues(field);
  console.log(`Duplicate ${field}: ${duplicates.length}`);
  for (const [value, routes] of duplicates) console.log(`  ${routes.join(", ")} :: ${value}`);
}
console.log(`Repeated long paragraphs: ${repeatedParagraphs.length}`);
for (const [paragraph, routes] of repeatedParagraphs.slice(0, 35)) {
  console.log(`  x${routes.length} ${routes.join(", ")} :: ${paragraph.slice(0, 180)}`);
}
console.log("Word counts:");
for (const page of pages.sort((a, b) => a.words - b.words)) {
  console.log(`  ${String(page.words).padStart(4)} ${page.route}`);
}

const shingles = (value, size = 4) => {
  const words = value.toLocaleLowerCase("ru-RU").match(/[а-яёa-z0-9]+/giu) || [];
  const result = new Set();
  for (let index = 0; index <= words.length - size; index += 1) {
    result.add(words.slice(index, index + size).join(" "));
  }
  return result;
};

const pageShingles = new Map(pages.map((page) => [page.route, shingles(page.visible)]));
const similarities = [];
for (let left = 0; left < pages.length; left += 1) {
  for (let right = left + 1; right < pages.length; right += 1) {
    const a = pageShingles.get(pages[left].route);
    const b = pageShingles.get(pages[right].route);
    let intersection = 0;
    for (const item of a) if (b.has(item)) intersection += 1;
    const union = a.size + b.size - intersection;
    similarities.push({
      left: pages[left].route,
      right: pages[right].route,
      score: union ? intersection / union : 0,
    });
  }
}

console.log("Highest 4-word shingle similarity:");
const sortedSimilarities = similarities.sort((a, b) => b.score - a.score);
for (const item of sortedSimilarities.slice(0, 15)) {
  console.log(`  ${(item.score * 100).toFixed(1).padStart(5)}% ${item.left} <> ${item.right}`);
}

if (process.argv.includes("--strict")) {
  const duplicateCount = ["title", "description", "h1"].reduce((sum, field) => sum + duplicateValues(field).length, 0);
  const tooShort = pages.filter((page) => page.words < 240);
  const highSimilarity = sortedSimilarities[0]?.score > 0.16;
  if (issues.length || duplicateCount || repeatedParagraphs.length || tooShort.length || highSimilarity) {
    console.error(`Strict audit failed: issues=${issues.length}, duplicates=${duplicateCount}, repeated=${repeatedParagraphs.length}, short=${tooShort.length}, max_similarity=${(sortedSimilarities[0]?.score || 0).toFixed(3)}`);
    process.exitCode = 1;
  } else {
    console.log("Strict audit: PASS");
  }
}
