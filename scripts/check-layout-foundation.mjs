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
const homeHeroText = read("components/home/HomeHero.tsx");
const homeLocalContactText = read("components/home/HomeLocalContact.tsx");
const homeProductText = read("components/home/HomeProductFoundation.tsx");
const routeHeroText = read("components/routes/RouteHero.tsx");
const routeLocalContactText = read("components/routes/RouteLocalContact.tsx");
const routePageText = read("components/routes/RoutePage.tsx");
const dynamicRouteText = read("app/[slug]/page.tsx");
const policyText = read("app/policy/page.tsx");
const productComponentText = read("components/routes/RouteProductFoundation.tsx");
const globalCssText = read("app/globals.css");
const sitemapText = read("public/sitemap.xml");

assert(/<Header\s*\/>/.test(layoutText), "Root layout must render Header.");
assert(/<Footer\s*\/>/.test(layoutText), "Root layout must render Footer.");
assert(/Перейти к содержанию/.test(headerText) && /#main-content/.test(headerText), "Header must include skip link to main content.");
assert(/<nav/.test(headerText) && /aria-label="Основная навигация"/.test(headerText), "Header must expose primary navigation landmark.");
assert(/<details/.test(headerText) && /Мобильная навигация/.test(headerText), "Header must expose mobile-safe navigation.");
assert(/useState/.test(headerText) && /mobileMenuOpen/.test(headerText), "Mobile menu must keep explicit open state.");
assert(/aria-expanded=\{mobileMenuOpen\}/.test(headerText), "Mobile menu summary must expose expanded state.");
assert(/data-mobile-menu-panel="true"/.test(headerText), "Mobile menu panel must expose Stage 20E panel marker.");
assert(/100svh/.test(headerText), "Mobile menu panel must use small-viewport-safe height.");
assert(/onClick=\{closeMobileMenu\}/.test(headerText), "Mobile menu links/actions must close the menu after navigation.");
assert(/Если не уверены, с чего начать/.test(headerText), "Mobile menu must preserve safe first-step guidance.");
assert(/Построить маршрут/.test(headerText) && /href="\/kontakty\/"/.test(headerText), "Header mobile actions must include safe contact route.");
assert(/<footer/.test(footerText) && /aria-label="Служебная навигация"/.test(footerText), "Footer must expose service navigation landmark.");
assert(/Разобрать ситуацию/.test(footerText) && /href="\/razbor-situacii\/"/.test(footerText), "Footer must keep situation review as a visible lead path.");
assert(/min-h-10/.test(footerText) && /min-h-12/.test(footerText), "Footer links and actions must keep mobile touch targets.");
assert(/id="main-content"/.test(routePageText), "Static route page template must expose main-content landmark.");
assert(/<main/.test(dynamicRouteText), "Dynamic route page template must render a main landmark.");
assert(/aria-label="Хлебные крошки"/.test(dynamicRouteText) && /min-h-10/.test(dynamicRouteText), "Dynamic route breadcrumbs must keep readable tap targets.");
assert(/RouteProductFoundation/.test(routePageText), "Static route page template must include product foundation component.");
assert(/RouteProductFoundation/.test(dynamicRouteText), "Dynamic route page template must include product foundation component.");
assert(/data-product-foundation="true"/.test(productComponentText), "Product foundation component must expose runtime data marker.");
assert(/lg:min-h-\[calc\(86vh-88px\)\]/.test(homeHeroText), "Homepage hero must reserve tall hero treatment for desktop only.");
assert(/lg:min-h-\[calc\(78vh-88px\)\]/.test(routeHeroText), "Route hero must reserve tall hero treatment for desktop only.");
assert(/aria-label="Контекст маршрута"/.test(routeHeroText) && /min-h-10/.test(routeHeroText), "Static route breadcrumb context must keep readable tap targets.");
assert(/min-h-1[012]/.test(homeLocalContactText), "Homepage local contact phone link must keep mobile touch target.");
assert(/min-h-1[012]/.test(routeLocalContactText), "Route local contact phone link must keep mobile touch target.");
assert(/<summary[\s\S]*min-h-12/.test(homeProductText), "Homepage FAQ summaries must keep mobile touch targets.");
assert(/<summary[\s\S]*min-h-12/.test(policyText), "Policy FAQ summaries must keep mobile touch targets.");

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
  stage20eMobileUx: {
    menuStateControlled: /mobileMenuOpen/.test(headerText),
    menuPanelSmallViewportBounded: /100svh/.test(headerText),
    menuLinksCloseOnNavigation: /onClick=\{closeMobileMenu\}/.test(headerText),
    footerTouchTargets: /min-h-10/.test(footerText) && /min-h-12/.test(footerText),
    localContactTouchTargets: /min-h-1[012]/.test(homeLocalContactText) && /min-h-1[012]/.test(routeLocalContactText),
    breadcrumbTouchTargets: /min-h-10/.test(dynamicRouteText) && /min-h-10/.test(routeHeroText),
    faqTouchTargets: /<summary[\s\S]*min-h-12/.test(homeProductText) && /<summary[\s\S]*min-h-12/.test(policyText),
    desktopOnlyTallHero: /lg:min-h-\[calc\(86vh-88px\)\]/.test(homeHeroText) && /lg:min-h-\[calc\(78vh-88px\)\]/.test(routeHeroText)
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
