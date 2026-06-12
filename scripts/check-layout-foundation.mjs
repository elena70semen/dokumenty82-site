#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

const requiredNavRoutes = [
  "/razbor-situacii/",
  "/otchetnost/",
  "/bank-i-115-fz/",
  "/adres-egryul-direktor/",
  "/registraciya-i-likvidaciya/",
  "/nalogi-i-rezhimy/",
  "/kadry/",
  "/soprovozhdenie/",
  "/kontakty/"
];

function repoPath(rel) {
  return path.join(root, rel);
}

function read(rel) {
  return fs.existsSync(repoPath(rel)) ? fs.readFileSync(repoPath(rel), "utf8") : "";
}

function assert(condition, message) {
  if (!condition) issues.push(message);
}

function ensureDir(dir) {
  fs.mkdirSync(repoPath(dir), { recursive: true });
}

function writeEvidence(rel, payload) {
  ensureDir(path.dirname(rel));
  fs.writeFileSync(repoPath(rel), `${JSON.stringify(payload, null, 2)}\n`);
}

const layoutText = read("app/layout.tsx");
const headerText = read("components/Header.tsx");
const footerText = read("components/Footer.tsx");
const homeNavText = read("lib/home/home-page-data.ts");
const routePageText = read("components/routes/RoutePage.tsx");
const dynamicRouteText = read("app/[slug]/page.tsx");
const productComponentText = read("components/routes/RouteProductFoundation.tsx");
const globalCssText = read("app/globals.css");
const sitemapText = read("public/sitemap.xml");

assert(/<Header\s*\/>/.test(layoutText), "Root layout must render Header.");
assert(/<Footer\s*\/>/.test(layoutText), "Root layout must render Footer.");
assert(/Перейти к содержанию/.test(headerText) && /#main-content/.test(headerText), "Header must include skip link to main content.");
assert(/<nav/.test(headerText) && /aria-label="Основная навигация"/.test(headerText), "Header must expose primary navigation landmark.");
assert(/<details/.test(headerText) && /Мобильная навигация/.test(headerText), "Header must expose mobile-safe navigation.");
assert(/Если не уверены, с чего начать/.test(headerText), "Mobile menu must preserve safe first-step guidance.");
assert(/Построить маршрут/.test(headerText) && /href="\/kontakty\/"/.test(headerText), "Header mobile actions must include safe contact route.");
assert(/<footer/.test(footerText) && /aria-label="Служебная навигация"/.test(footerText), "Footer must expose service navigation landmark.");
assert(/Разобрать ситуацию/.test(footerText) && /href="\/razbor-situacii\/"/.test(footerText), "Footer must keep situation review as a visible lead path.");
assert(/id="main-content"/.test(routePageText), "Static route page template must expose main-content landmark.");
assert(/<main/.test(dynamicRouteText), "Dynamic route page template must render a main landmark.");
assert(/RouteProductFoundation/.test(routePageText), "Static route page template must include product foundation component.");
assert(/RouteProductFoundation/.test(dynamicRouteText), "Dynamic route page template must include product foundation component.");
assert(/data-product-foundation="true"/.test(productComponentText), "Product foundation component must expose runtime data marker.");

for (const route of requiredNavRoutes) {
  assert(homeNavText.includes(`href: "${route}"`), `Home navigation data missing required route: ${route}`);
}

for (const route of ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/"]) {
  assert(!sitemapText.includes(`https://dokumenty82.ru${route}`), `Noindex foundation route found in sitemap: ${route}`);
}

assert(/@media\s*\(max-width:\s*760px\)/.test(globalCssText), "Global CSS must include mobile layout media query.");
assert(/overflow-x:\s*hidden/.test(globalCssText), "Global CSS must guard against horizontal overflow.");
assert(/focus-visible/.test(globalCssText) || /focus-visible/.test(headerText), "Layout must include visible focus styles.");

const evidence = {
  status: issues.length === 0 ? "passed" : "failed",
  checkedAt: new Date().toISOString(),
  requiredNavRoutes,
  shell: {
    header: /<Header\s*\/>/.test(layoutText),
    footer: /<Footer\s*\/>/.test(layoutText),
    skipLink: /#main-content/.test(headerText),
    mobileNav: /<details/.test(headerText)
  },
  issues
};

writeEvidence("evidence/frontend/stage18-layout-foundation.json", evidence);

if (issues.length > 0) {
  console.error("Stage 18 layout foundation check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`PASS Stage 18 layout foundation: shell, navigation, mobile and product blocks verified.`);
