#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

const requiredTopLevelNavigation = [
  { label: "Разбор ситуации", href: "/razbor-situacii/" },
  { label: "Отчётность", href: "/otchetnost/" },
  { label: "Банк и 115-ФЗ", href: "/bank-i-115-fz/" },
  { label: "Адрес и ЕГРЮЛ", href: "/adres-egryul-direktor/" },
  { label: "Регистрация", href: "/registraciya-i-likvidaciya/" },
  { label: "Налоги и режимы", href: "/nalogi-i-rezhimy/" },
  { label: "Кадры", href: "/kadry/" },
  { label: "Сопровождение", href: "/soprovozhdenie/" },
  { label: "Контакты", href: "/kontakty/" }
];

const requiredProductBlockFamilies = [
  "route_intent",
  "when_this_page_fits",
  "what_we_check",
  "documents_data_needed",
  "how_work_starts",
  "what_is_not_promised",
  "related_routes",
  "faq_direction",
  "safe_final_cta",
  "client_information"
];

const noindexFoundationRoutes = ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/"];
const blockedPublicNavigationRoutes = [...noindexFoundationRoutes, "/faq/", "/internal/graphics-proof/", "/internal/visual-detail-kit/"];
const unsafeFeatureFlags = [
  "formsLive",
  "crmSuccessEnabled",
  "analyticsEnabled",
  "metricaEnabled",
  "maxEnabled",
  "telegramEnabled",
  "messagingRevealEnabled",
  "mapEnabled",
  "cookieNoticeEnabled"
];

const sourceSyncedDocs = [
  "docs/content/stage-18h-route-copy-block-quality-plan-v1.md",
  "docs/ux/stage-18h-navigation-menu-and-route-flow-plan-v1.md"
];

function repoPath(rel) {
  return path.join(root, rel);
}

function read(rel) {
  return fs.existsSync(repoPath(rel)) ? fs.readFileSync(repoPath(rel), "utf8") : "";
}

function readJson(rel) {
  return JSON.parse(read(rel));
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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countExactNavPair(text, item) {
  const pattern = new RegExp(`\\{ label: "${escapeRegExp(item.label)}", href: "${escapeRegExp(item.href)}" \\}`, "g");
  return [...text.matchAll(pattern)].length;
}

function countToken(text, token) {
  return [...text.matchAll(new RegExp(escapeRegExp(token), "g"))].length;
}

function listFiles(dir) {
  const full = repoPath(dir);
  if (!fs.existsSync(full)) return [];

  return fs.readdirSync(full, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(full, entry.name);
    const rel = path.relative(root, file);

    if (entry.isDirectory()) {
      if ([".git", ".next", "node_modules", "out"].includes(entry.name)) return [];
      if (rel.startsWith(`lib${path.sep}pricing`) || rel.startsWith(`lib${path.sep}brand`)) return [];
      return listFiles(rel);
    }

    return /\.(ts|tsx|js|jsx|mjs|conf|xml|txt)$/i.test(entry.name) ? [file] : [];
  });
}

const semanticPayload = readJson("lib/seo/semantic-route-data.json");
const semanticRoutes = Array.isArray(semanticPayload.routes) ? semanticPayload.routes : [];
const indexedRoutes = semanticRoutes.filter((route) => route.indexed);
const noindexRoutes = semanticRoutes.filter((route) => !route.indexed);

const packageText = read("package.json");
const homeDataText = read("lib/home/home-page-data.ts");
const headerText = read("components/Header.tsx");
const footerText = read("components/Footer.tsx");
const routePageDataText = read("lib/routes/route-page-data.ts");
const dynamicRouteTemplateText = read("app/[slug]/page.tsx");
const staticRouteTemplateText = read("components/routes/RoutePage.tsx");
const productFoundationText = read("lib/product-foundation.ts");
const productComponentText = read("components/routes/RouteProductFoundation.tsx");
const contentText = read("lib/content.ts");
const routesText = read("lib/routes.ts");
const featureFlagsText = read("lib/feature-flags.ts");
const sitemapText = read("public/sitemap.xml");
const runtimeText = listFiles(".")
  .filter((file) => {
    const rel = path.relative(root, file);
    return rel.startsWith("app/") || rel.startsWith("components/") || rel.startsWith("lib/") || rel.startsWith("public/") || rel.startsWith("server/");
  })
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

assert(semanticRoutes.length === 39, `Expected 39 semantic routes; found ${semanticRoutes.length}.`);
assert(indexedRoutes.length === 36, `Expected 36 indexed public routes; found ${indexedRoutes.length}.`);
assert(noindexRoutes.length === 3, `Expected 3 noindex foundation routes; found ${noindexRoutes.length}.`);

for (const doc of sourceSyncedDocs) {
  assert(fs.existsSync(repoPath(doc)), `Missing synced Stage 18H source doc: ${doc}`);
  assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(read(doc)), `Stage 18H doc must preserve PUBLIC_LIVE_ALLOWED false: ${doc}`);
  assert(/PENDING_HUMAN_REVIEW|MISSING_EXPECTED|NOT_PUBLIC_LIVE_READY/.test(read(doc)), `Stage 18H doc must preserve human-review/HOLD boundary: ${doc}`);
}

assert(packageText.includes('"check:route-content"'), "package.json missing check:route-content script.");
assert(packageText.includes("npm run check:route-content"), "check:finalization must include check:route-content.");

assert(/homeNavigation/.test(headerText), "Header must consume shared homeNavigation data.");
assert(/homeFooter\.routes/.test(footerText), "Footer must consume shared homeFooter routes.");

for (const item of requiredTopLevelNavigation) {
  assert(
    countExactNavPair(homeDataText, item) >= 2,
    `Top-level nav/footer route must be present twice in shared data: ${item.label} -> ${item.href}`
  );
}

for (const route of blockedPublicNavigationRoutes) {
  assert(!homeDataText.includes(`href: "${route}"`), `Blocked/noindex route found in public navigation data: ${route}`);
  assert(!headerText.includes(route), `Blocked/noindex route found in header source: ${route}`);
  assert(!footerText.includes(route), `Blocked/noindex route found in footer source: ${route}`);
}

for (const route of noindexFoundationRoutes) {
  assert(!sitemapText.includes(`https://dokumenty82.ru${route}`), `Noindex foundation route found in sitemap: ${route}`);
}

assert(/id="main-content"/.test(dynamicRouteTemplateText), "Dynamic route template must expose main-content id.");
assert(/id="main-content"/.test(staticRouteTemplateText), "Static route template must expose main-content id.");
assert(/data-route-page-template="dynamic"/.test(dynamicRouteTemplateText), "Dynamic route template missing Stage 18H template marker.");
assert(/data-route-page-template="static"/.test(staticRouteTemplateText), "Static route template missing Stage 18H template marker.");
assert(/data-route-hardening-blocks=/.test(dynamicRouteTemplateText), "Dynamic route template missing route hardening block marker.");
assert(/RouteProductFoundation/.test(dynamicRouteTemplateText), "Dynamic route template must render RouteProductFoundation.");
assert(/RouteProductFoundation/.test(staticRouteTemplateText), "Static route template must render RouteProductFoundation.");

for (const marker of [
  "RouteHero",
  "RouteSituationPanel",
  "RouteServiceScope",
  "RouteProcess",
  "RouteDocumentsPanel",
  "RouteRelatedLinks",
  "RouteLocalContact",
  "RouteSafetyNote"
]) {
  assert(staticRouteTemplateText.includes(marker), `Static route template missing required route block component: ${marker}`);
}

for (const family of requiredProductBlockFamilies) {
  assert(productFoundationText.includes(family), `Product foundation data missing block family: ${family}`);
  assert(productComponentText.includes(family), `Product foundation component missing block family: ${family}`);
}

for (const marker of [
  'data-product-foundation="true"',
  'data-stage18h-route-content="true"',
  'data-owner-legal-status="pending-human-review"',
  'data-public-live-allowed="false"'
]) {
  assert(productComponentText.includes(marker), `Product foundation component missing marker: ${marker}`);
}

for (const token of ["whatWeCheck", "documentsOrData", "howWorkStarts", "notPromised", "relatedHrefs"]) {
  assert(countToken(contentText, token) >= 32, `Dynamic route content should define ${token} for 32 dynamic routes.`);
}

for (const token of ["situation:", "scope:", "process:", "documents:", "related:", "localContact:", "safetyNote:"]) {
  assert(routePageDataText.includes(token), `Static route page data missing route block token: ${token}`);
}

for (const route of indexedRoutes) {
  const fieldsMissing = [
    "primaryIntent",
    "safeUserWording",
    "problemHooks",
    "relatedRoutes",
    "avoidCannibalizing",
    "pageBlockPurpose",
    "holdRisks"
  ].filter((field) => {
    const value = route[field];
    return Array.isArray(value) ? value.length === 0 : !value;
  });

  assert(fieldsMissing.length === 0, `Indexed route lacks semantic route content fields: ${route.path}: ${fieldsMissing.join(", ")}`);
  assert(routesText.includes(`...semanticFields("${route.path}")`) || routesText.includes(`path: "${route.path}"`) || contentText.includes(`href: "${route.path}"`), `Route manifest/runtime source missing indexed route: ${route.path}`);
}

for (const flag of unsafeFeatureFlags) {
  assert(new RegExp(`${flag}:\\s*false`).test(featureFlagsText), `Unsafe feature flag must remain false: ${flag}`);
}

const unsafeRuntimePatterns = [
  { pattern: /PUBLIC_LIVE_ALLOWED\s*=\s*true/i, message: "PUBLIC_LIVE_ALLOWED true marker found in runtime source." },
  { pattern: /Alt-Svc:\s*h3|listen\s+[^;]*quic|http3\s+on|quic_retry\s+on/i, message: "HTTP/3/QUIC enablement found in runtime/config source." },
  { pattern: /<input\b[^>]*\btype=["']file["']|type:\s*["']file["']/i, message: "Public upload input found." },
  { pattern: /\bmethod=["']post["']|\bmethod=["']POST["']|\baction=["'][^"']+["']/i, message: "Live form method/action found." },
  { pattern: /webhook|crm[_-]?endpoint|api\/lead|api\/form/i, message: "Potential live CRM/form endpoint found." },
  { pattern: /t\.me\/|telegram\.me\/|max:\/\//i, message: "Messaging deep link found." },
  { pattern: /гарантируем|100%\s*результат|без отказа|срочно за 1 день/i, message: "Forbidden promise wording found." },
  { pattern: /ИНН\s*\d|ОГРН\s*\d/i, message: "Legal identifier found in runtime public source." },
  { pattern: /пн-пт|понедельник|режим работы|часы работы/i, message: "Working-hours wording found in runtime public source." }
];

for (const { pattern, message } of unsafeRuntimePatterns) {
  assert(!pattern.test(runtimeText), message);
}

const evidence = {
  status: issues.length === 0 ? "passed" : "failed",
  checkedAt: new Date().toISOString(),
  indexedRoutes: indexedRoutes.length,
  noindexFoundationRoutes,
  requiredTopLevelNavigation,
  requiredProductBlockFamilies,
  sourceSyncedDocs,
  publicLiveAllowed: false,
  ownerLegalStatus: "PENDING_HUMAN_REVIEW",
  launchVerdict: "NOT_PUBLIC_LIVE_READY",
  issues
};

writeEvidence("evidence/content/stage18-route-content-and-navigation.json", evidence);

if (issues.length > 0) {
  console.error("Stage 18H route content and navigation check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`PASS Stage 18H route content/navigation: ${indexedRoutes.length} indexed routes and ${requiredTopLevelNavigation.length} menu entries checked.`);
