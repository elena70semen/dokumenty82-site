#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

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

const expectedNoindexRoutes = ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/"];
const allowedCtaLabels = new Set([
  "Разобрать ситуацию",
  "Позвонить",
  "Построить маршрут",
  "Показать документы",
  "Контакты",
  "Перейти в контакты"
]);
const unsafeFlags = [
  "formsLive",
  "crmEnabled",
  "crmSuccessEnabled",
  "paidTrafficAllowed",
  "maxEnabled",
  "telegramEnabled",
  "messagingRevealEnabled",
  "mapEnabled",
  "cookieNoticeEnabled"
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
    return /\.(ts|tsx|js|jsx|mjs)$/i.test(entry.name) ? [file] : [];
  });
}

function slugFromPath(routePath) {
  if (routePath === "/") return "page";
  if (routePath === "/policy") return "policy";
  return routePath.replace(/^\/|\/$/g, "");
}

const semanticPayload = readJson("lib/seo/semantic-route-data.json");
const semanticRoutes = Array.isArray(semanticPayload.routes) ? semanticPayload.routes : [];
const indexedRoutes = semanticRoutes.filter((route) => route.indexed);
const noindexRoutes = semanticRoutes.filter((route) => !route.indexed);

const productFoundationText = read("lib/product-foundation.ts");
const productComponentText = read("components/routes/RouteProductFoundation.tsx");
const routeTemplateText = read("app/[slug]/page.tsx");
const staticRoutePageText = read("components/routes/RoutePage.tsx");
const contentText = read("lib/content.ts");
const staticRouteDataText = read("lib/routes/route-page-data.ts");
const featureFlagsText = read("lib/feature-flags.ts");
const formPlaceholderText = read("components/forms/FormPlaceholder.tsx");
const appSourceText = [...listFiles("app"), ...listFiles("components"), ...listFiles("lib")]
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

assert(semanticRoutes.length === 39, `Expected 39 approved semantic routes; found ${semanticRoutes.length}.`);
assert(indexedRoutes.length === 36, `Expected 36 indexed routes; found ${indexedRoutes.length}.`);
assert(noindexRoutes.length === 3, `Expected 3 noindex foundation routes; found ${noindexRoutes.length}.`);

for (const family of requiredBlockFamilies) {
  assert(productFoundationText.includes(family), `Product foundation data must define block family: ${family}`);
  assert(productComponentText.includes(family), `Product foundation component must expose/render block family: ${family}`);
}

assert(/RouteProductFoundation/.test(routeTemplateText), "Dynamic route template must render RouteProductFoundation.");
assert(/RouteProductFoundation/.test(staticRoutePageText), "Static route template must render RouteProductFoundation.");

for (const route of indexedRoutes) {
  const missing = [
    "primaryIntent",
    "problemHooks",
    "safeUserWording",
    "relatedRoutes",
    "faqAngle",
    "pageBlockPurpose",
    "holdRisks"
  ].filter((field) => {
    const value = route[field];
    return Array.isArray(value) ? value.length === 0 : !value;
  });
  assert(missing.length === 0, `Indexed route ${route.path} lacks source fields for product blocks: ${missing.join(", ")}`);

  const slug = slugFromPath(route.path);
  const inRuntimeContent =
    route.path === "/" ||
    route.path === "/policy" ||
    route.path === "/o-proekte/" ||
    staticRouteDataText.includes(`slug: "${slug}"`) ||
    contentText.includes(`slug: "${slug}"`);
  assert(inRuntimeContent, `Indexed route is missing runtime source content: ${route.path}`);
}

for (const routePath of expectedNoindexRoutes) {
  const route = noindexRoutes.find((item) => item.path === routePath);
  assert(route, `Noindex foundation route missing: ${routePath}`);
  assert(route?.includeInSitemap === false, `Noindex foundation route must stay out of sitemap: ${routePath}`);
}

for (const flag of unsafeFlags) {
  assert(new RegExp(`${flag}:\\s*false`).test(featureFlagsText), `Unsafe feature flag must remain false: ${flag}`);
}

assert(/data-form-placeholder="true"/.test(formPlaceholderText), "Placeholder forms must be marked as placeholders.");
assert(/preventDefault/.test(formPlaceholderText), "Placeholder forms must prevent live submit.");
assert(!/\baction=|method=["']post["']|method=["']POST["']/.test(formPlaceholderText), "Placeholder form must not define live action/method.");

const dataCtaLabels = [...appSourceText.matchAll(/data-cta-label=["']([^"']+)["']/g)].map((match) => match[1]);
for (const label of dataCtaLabels) {
  assert(allowedCtaLabels.has(label), `Unsafe CTA label found in data-cta-label: ${label}`);
}

const unsafeRuntimePatterns = [
  { pattern: /<input\b[^>]*\btype=["']file["']|type:\s*["']file["']/i, message: "Public upload input found." },
  { pattern: /webhook|crm[_-]?endpoint|api\/lead|api\/form/i, message: "Potential live CRM/form endpoint found." },
  { pattern: /t\.me\/|telegram\.me\/|max:\/\//i, message: "Messaging deep link found." },
  { pattern: /PUBLIC_LIVE_ALLOWED\s*=\s*true/i, message: "PUBLIC_LIVE_ALLOWED true marker found." },
  { pattern: /гарантируем|100%\s*результат|без отказа|срочно за 1 день/i, message: "Forbidden promise wording found." },
  { pattern: /<form\b[\s\S]*>\s*[\s\S]*(успешно отправлена|заявка отправлена|мы получили заявку)/i, message: "Fake form success wording found." }
];

for (const { pattern, message } of unsafeRuntimePatterns) {
  assert(!pattern.test(appSourceText), message);
}

const evidence = {
  status: issues.length === 0 ? "passed" : "failed",
  checkedAt: new Date().toISOString(),
  indexedRoutes: indexedRoutes.length,
  noindexFoundationRoutes: noindexRoutes.map((route) => route.path),
  requiredBlockFamilies,
  allowedCtaLabels: [...allowedCtaLabels],
  placeholderFormsChecked: true,
  unsafeFeatureFlagsChecked: unsafeFlags,
  issues
};

writeEvidence("evidence/ux/stage18-page-blocks-and-lead-path.json", evidence);

if (issues.length > 0) {
  console.error("Stage 18 page blocks and lead path check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`PASS Stage 18 page blocks and lead path: ${indexedRoutes.length} indexed routes checked; live lead collectors remain disabled.`);
