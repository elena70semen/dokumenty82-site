#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

const priorityRoutes = [
  "/",
  "/razbor-situacii/",
  "/kontakty/",
  "/policy",
  "/otchetnost/",
  "/bank-i-115-fz/",
  "/otvet-na-trebovanie-ifns/",
  "/deklaraciya-usn/",
  "/otvet-na-zapros-banka/",
  "/dokumenty-dlya-banka-115-fz/",
  "/yuridicheskiy-adres-simferopol/",
  "/nedostovernost-yuridicheskogo-adresa/",
  "/registraciya-ooo/",
  "/registraciya-ip/",
  "/vosstanovlenie-buhucheta/"
];

const noindexFoundationRoutes = ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/"];
const allowedCtaLabels = new Set([
  "Разобрать ситуацию",
  "Позвонить",
  "Построить маршрут",
  "Показать документы",
  "Контакты",
  "Перейти в контакты"
]);
const requiredBlockFamilies = [
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

    return /\.(ts|tsx|js|jsx|mjs|json|xml|txt|conf)$/i.test(entry.name) ? [file] : [];
  });
}

function extractObjectBlock(text, key) {
  const token = `"${key}": {`;
  const start = text.indexOf(token);
  if (start === -1) return "";

  const objectStart = text.indexOf("{", start);
  let depth = 0;

  for (let index = objectStart; index < text.length; index += 1) {
    const char = text[index];
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) return text.slice(start, index + 1);
  }

  return "";
}

function countQuotedItems(block, field) {
  const match = block.match(new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`));
  if (!match) return 0;
  return [...match[1].matchAll(/"[^"]+"/g)].length;
}

const semanticPayload = readJson("lib/seo/semantic-route-data.json");
const semanticRoutes = Array.isArray(semanticPayload.routes) ? semanticPayload.routes : [];
const indexedRoutes = semanticRoutes.filter((route) => route.indexed);
const noindexRoutes = semanticRoutes.filter((route) => !route.indexed);

const productFoundationText = read("lib/product-foundation.ts");
const priorityQualitySection = productFoundationText.slice(productFoundationText.indexOf("const priorityRouteQualityDepthByPath"));
const fullSiteQualitySection = productFoundationText.slice(productFoundationText.indexOf("const fullSiteRouteQualityDepthByPath"));
const manualCoreQualitySection = productFoundationText.slice(productFoundationText.indexOf("const manualCoreRouteCopy"));
const productComponentText = read("components/routes/RouteProductFoundation.tsx");
const contentText = read("lib/content.ts");
const staticRouteDataText = read("lib/routes/route-page-data.ts");
const dynamicRouteTemplateText = read("app/[slug]/page.tsx");
const staticRouteTemplateText = read("components/routes/RoutePage.tsx");
const featureFlagsText = read("lib/feature-flags.ts");
const sitemapText = read("public/sitemap.xml");
const packageText = read("package.json");
const sourceDocs = [
  "docs/content/stage-18k-route-quality-deepening-plan-v1.md",
  "docs/content/stage-18k-route-quality-matrix-v1.md"
];

assert(semanticRoutes.length === 39, `Expected 39 semantic routes; found ${semanticRoutes.length}.`);
assert(indexedRoutes.length === 36, `Expected 36 indexed routes; found ${indexedRoutes.length}.`);
assert(noindexRoutes.length === 3, `Expected 3 noindex foundation routes; found ${noindexRoutes.length}.`);
assert(packageText.includes('"check:route-quality"'), "package.json missing check:route-quality script.");
assert(packageText.includes("npm run check:route-quality"), "check:finalization must include check:route-quality.");
assert(/data-stage18k-route-quality=/.test(productComponentText), "Product foundation must expose Stage 18K route-quality marker.");
assert(/data-stage18k-owner-review=/.test(productComponentText), "Product foundation must expose Stage 18K owner-review marker.");
assert(productFoundationText.includes("fullSiteRouteQualityDepthByPath"), "Product foundation missing Stage 18O full-site route-quality coverage.");
assert(/RouteProductFoundation/.test(dynamicRouteTemplateText), "Dynamic route template must render RouteProductFoundation.");
assert(/RouteProductFoundation/.test(staticRouteTemplateText), "Static route template must render RouteProductFoundation.");

for (const doc of sourceDocs) {
  const text = read(doc);
  assert(text.length > 0, `Missing synced Stage 18K source doc: ${doc}`);
  assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(text), `Stage 18K source doc must preserve PUBLIC_LIVE_ALLOWED false: ${doc}`);
  assert(/READY_FOR_OWNER_REVIEW|PENDING_HUMAN_REVIEW|NOT_PUBLIC_LIVE_READY/.test(text), `Stage 18K source doc must preserve owner-review/public-live boundary: ${doc}`);
}

for (const family of requiredBlockFamilies) {
  assert(productFoundationText.includes(family), `Product foundation missing block family token: ${family}`);
  assert(productComponentText.includes(family), `Product foundation component missing block family token: ${family}`);
}

const routeSpecificCoverage = {};
const fullSiteRouteQualityCoverage = {};
const faqCoverage = {};
const relatedRouteCoverage = {};

for (const routePath of priorityRoutes) {
  const block = extractObjectBlock(priorityQualitySection, routePath);
  routeSpecificCoverage[routePath] = Boolean(block);
  faqCoverage[routePath] = block ? countQuotedItems(block, "faqDirection") : 0;
  relatedRouteCoverage[routePath] = block ? countQuotedItems(block, "relatedRoutePaths") : 0;

  assert(Boolean(block), `Priority route missing Stage 18K route-specific quality data: ${routePath}`);
  assert(countQuotedItems(block, "whenFits") >= 2, `Priority route needs route-specific whenFits depth: ${routePath}`);
  assert(countQuotedItems(block, "whatWeCheck") >= 2, `Priority route needs route-specific whatWeCheck depth: ${routePath}`);
  assert(countQuotedItems(block, "documentsData") >= 2, `Priority route needs route-specific documentsData depth: ${routePath}`);
  assert(faqCoverage[routePath] >= 2, `Priority route needs route-specific FAQ direction: ${routePath}`);
  assert(relatedRouteCoverage[routePath] >= 2, `Priority route needs related route logic: ${routePath}`);
}

for (const route of indexedRoutes) {
  const routeQualityBlock =
    extractObjectBlock(priorityQualitySection, route.path) ||
    extractObjectBlock(fullSiteQualitySection, route.path) ||
    extractObjectBlock(manualCoreQualitySection, route.path);
  const pathPattern = new RegExp(`"${escapeRegExp(route.path)}"`);
  const appearsInRuntime =
    productFoundationText.includes(route.path) ||
    contentText.includes(`href: "${route.path}"`) ||
    staticRouteDataText.includes(`href: "${route.path}"`);

  fullSiteRouteQualityCoverage[route.path] = Boolean(routeQualityBlock);
  assert(Boolean(routeQualityBlock), `Indexed route missing Stage 18O route-quality coverage: ${route.path}`);
  assert(appearsInRuntime || pathPattern.test(productFoundationText), `Indexed route missing runtime/source quality coverage: ${route.path}`);
  assert(Array.isArray(route.pageBlockPurpose) && route.pageBlockPurpose.length > 0, `Indexed route missing page block purpose: ${route.path}`);
  assert(Array.isArray(route.relatedRoutes) && route.relatedRoutes.length > 0, `Indexed route missing related route source data: ${route.path}`);
}

for (const routePath of noindexFoundationRoutes) {
  assert(!sitemapText.includes(`https://dokumenty82.ru${routePath}`), `Noindex foundation route appears in sitemap: ${routePath}`);
}

for (const marker of [
  "formsLive: false",
  "crmEnabled: false",
  "crmSuccessEnabled: false",
  "paidTrafficAllowed: false",
  "telegramEnabled: false",
  "maxEnabled: false",
  "messagingRevealEnabled: false"
]) {
  assert(featureFlagsText.includes(marker), `Unsafe feature flag must remain false: ${marker}`);
}

const runtimeFiles = [...listFiles("app"), ...listFiles("components"), ...listFiles("lib"), ...listFiles("public")]
  .filter((file) => {
    const rel = path.relative(root, file);
    return !rel.startsWith(`lib${path.sep}pricing`) && !rel.startsWith(`lib${path.sep}brand`);
  });

const runtimeText = runtimeFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const dataCtaLabels = [...runtimeText.matchAll(/data-cta-label=["']([^"']+)["']/g)].map((match) => match[1]);

for (const label of dataCtaLabels) {
  assert(allowedCtaLabels.has(label), `Unsafe CTA label found in data-cta-label: ${label}`);
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
  { pattern: /пн-пт|понедельник|режим работы|часы работы/i, message: "Working-hours wording found in runtime public source." },
  { pattern: /hidden[-_\s]?seo|seo[-_\s]?hidden|display:\s*none[^}]{0,120}seo/i, message: "Hidden SEO-only marker found." }
];

for (const { pattern, message } of unsafeRuntimePatterns) {
  assert(!pattern.test(runtimeText), message);
}

const evidence = {
  status: issues.length === 0 ? "passed" : "failed",
  checkedAt: new Date().toISOString(),
  priorityRoutesChecked: priorityRoutes,
  stage18oIndexedRoutesChecked: indexedRoutes.map((route) => route.path),
  indexedRoutesChecked: indexedRoutes.map((route) => route.path),
  noindexRoutesChecked: noindexRoutes.map((route) => route.path),
  routeSpecificBlockCoverage: routeSpecificCoverage,
  fullSiteRouteQualityCoverage,
  faqCoverage,
  relatedRouteCoverage,
  ctaSafety: {
    allowedCtaLabels: [...allowedCtaLabels],
    dataCtaLabelsChecked: dataCtaLabels
  },
  forbiddenScanResult: issues.length === 0 ? "PASS" : "FAIL",
  publicLiveAllowed: false,
  ownerLegalStatus: "PENDING_HUMAN_REVIEW",
  releaseVerdict: "GO_WITH_CONDITIONS",
  issues
};

writeEvidence("evidence/content/stage18-route-quality-depth.json", evidence);

if (issues.length > 0) {
  console.error("Stage 18K route quality depth check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`PASS Stage 18K route quality depth: ${priorityRoutes.length} priority routes and ${indexedRoutes.length} indexed routes checked.`);
