import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(https:\/\/dokumenty82\.ru(?:\/[^<]*)?)<\/loc>/g)].map((match) => match[1]);
const registry = JSON.parse(fs.readFileSync(path.join(root, "seo-route-registry.json"), "utf8"));

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

const issues = [];
const sitemapRoutes = new Set(pages.map((page) => page.route));
const registryRoutes = new Set(registry.indexable_routes);
const indexNowKeyFiles = fs.readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /^[A-Za-z0-9-]{8,128}\.txt$/.test(entry.name))
  .filter((entry) => fs.readFileSync(path.join(root, entry.name), "utf8").trim() === entry.name.slice(0, -4));

if (indexNowKeyFiles.length !== 1) issues.push(`IndexNow key files: expected 1, found ${indexNowKeyFiles.length}`);
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

const pricingPage = pages.find((page) => page.route === "/ceny/");
if (!pricingPage?.html.includes('"OfferCatalog"')) issues.push("/ceny/: missing OfferCatalog schema");
if ((pricingPage?.html.match(/"@type":"Offer"/g) || []).length < 10) issues.push("/ceny/: too few service offers in schema");

const reviewsPage = pages.find((page) => page.route === "/otzyvy/");
if (!reviewsPage?.html.includes("https://yandex.ru/maps/org/1302424560/reviews/")) issues.push("/otzyvy/: missing Yandex reviews link");

console.log(`Sitemap pages: ${pages.length}`);
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
