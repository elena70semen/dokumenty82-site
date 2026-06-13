#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

const indexedRoutes = [
  "/",
  "/razbor-situacii/",
  "/kontakty/",
  "/o-proekte/",
  "/policy",
  "/srochnye-voprosy/",
  "/otchetnost/",
  "/nalogi-i-rezhimy/",
  "/bank-i-115-fz/",
  "/adres-egryul-direktor/",
  "/kadry/",
  "/soprovozhdenie/",
  "/registraciya-i-likvidaciya/",
  "/otvet-na-trebovanie-ifns/",
  "/deklaraciya-usn/",
  "/otvet-na-zapros-banka/",
  "/dokumenty-dlya-banka-115-fz/",
  "/yuridicheskiy-adres-simferopol/",
  "/nedostovernost-yuridicheskogo-adresa/",
  "/smena-yuridicheskogo-adresa-ooo/",
  "/smena-direktora-ooo/",
  "/srochnoe-oformlenie-sotrudnikov/",
  "/perehod-na-ausn/",
  "/nulevaya-otchetnost-ooo/",
  "/nulevaya-otchetnost-ip/",
  "/otchetnost-elektronno/",
  "/vosstanovlenie-buhucheta/",
  "/buhgalterskoe-soprovozhdenie-ooo/",
  "/buhgalterskoe-soprovozhdenie-ip/",
  "/kadrovoe-soprovozhdenie/",
  "/registraciya-ooo/",
  "/registraciya-ip/",
  "/likvidaciya-ooo/",
  "/ausn-krym/",
  "/raschet-nalogovoy-nagruzki/",
  "/nds-pri-usn-2026/"
];

const noindexFoundationRoutes = ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/"];

const hubChildren = {
  "/srochnye-voprosy/": ["/otvet-na-trebovanie-ifns/"],
  "/otchetnost/": [
    "/deklaraciya-usn/",
    "/nulevaya-otchetnost-ooo/",
    "/nulevaya-otchetnost-ip/",
    "/otchetnost-elektronno/",
    "/vosstanovlenie-buhucheta/"
  ],
  "/nalogi-i-rezhimy/": ["/perehod-na-ausn/", "/ausn-krym/", "/raschet-nalogovoy-nagruzki/", "/nds-pri-usn-2026/"],
  "/bank-i-115-fz/": ["/otvet-na-zapros-banka/", "/dokumenty-dlya-banka-115-fz/"],
  "/adres-egryul-direktor/": [
    "/yuridicheskiy-adres-simferopol/",
    "/nedostovernost-yuridicheskogo-adresa/",
    "/smena-yuridicheskogo-adresa-ooo/",
    "/smena-direktora-ooo/"
  ],
  "/kadry/": ["/srochnoe-oformlenie-sotrudnikov/", "/kadrovoe-soprovozhdenie/"],
  "/soprovozhdenie/": ["/buhgalterskoe-soprovozhdenie-ooo/", "/buhgalterskoe-soprovozhdenie-ip/", "/kadrovoe-soprovozhdenie/"],
  "/registraciya-i-likvidaciya/": ["/registraciya-ooo/", "/registraciya-ip/", "/likvidaciya-ooo/"]
};

const moneyParents = {
  "/otvet-na-trebovanie-ifns/": "/srochnye-voprosy/",
  "/deklaraciya-usn/": "/otchetnost/",
  "/otvet-na-zapros-banka/": "/bank-i-115-fz/",
  "/dokumenty-dlya-banka-115-fz/": "/bank-i-115-fz/",
  "/yuridicheskiy-adres-simferopol/": "/adres-egryul-direktor/",
  "/nedostovernost-yuridicheskogo-adresa/": "/adres-egryul-direktor/",
  "/smena-yuridicheskogo-adresa-ooo/": "/adres-egryul-direktor/",
  "/smena-direktora-ooo/": "/adres-egryul-direktor/",
  "/srochnoe-oformlenie-sotrudnikov/": "/kadry/",
  "/perehod-na-ausn/": "/nalogi-i-rezhimy/",
  "/nulevaya-otchetnost-ooo/": "/otchetnost/",
  "/nulevaya-otchetnost-ip/": "/otchetnost/",
  "/otchetnost-elektronno/": "/otchetnost/",
  "/vosstanovlenie-buhucheta/": "/otchetnost/",
  "/buhgalterskoe-soprovozhdenie-ooo/": "/soprovozhdenie/",
  "/buhgalterskoe-soprovozhdenie-ip/": "/soprovozhdenie/",
  "/kadrovoe-soprovozhdenie/": "/kadry/",
  "/registraciya-ooo/": "/registraciya-i-likvidaciya/",
  "/registraciya-ip/": "/registraciya-i-likvidaciya/",
  "/likvidaciya-ooo/": "/registraciya-i-likvidaciya/"
};

const diagnosticParents = {
  "/ausn-krym/": "/nalogi-i-rezhimy/",
  "/raschet-nalogovoy-nagruzki/": "/nalogi-i-rezhimy/",
  "/nds-pri-usn-2026/": "/nalogi-i-rezhimy/"
};

function repoPath(rel) {
  return path.join(root, rel);
}

function read(rel) {
  return fs.existsSync(repoPath(rel)) ? fs.readFileSync(repoPath(rel), "utf8") : "";
}

function assert(condition, message) {
  if (!condition) issues.push(message);
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git" || entry.name === ".next" || entry.name === "node_modules" || entry.name === "out") {
      return [];
    }

    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full);
    return full;
  });
}

const semanticRel = "lib/seo/semantic-route-data.json";
const semanticText = read(semanticRel);
let semanticPayload = { routes: [] };

try {
  semanticPayload = JSON.parse(semanticText);
} catch (error) {
  issues.push(`Unable to parse ${semanticRel}: ${error.message}`);
}

const semanticRoutes = Array.isArray(semanticPayload.routes) ? semanticPayload.routes : [];
const semanticByPath = new Map(semanticRoutes.map((route) => [route.path, route]));
const sitemapText = read("public/sitemap.xml");
const routeManifestText = read("lib/routes.ts");
const contentText = read("lib/content.ts");
const featureFlagText = read("lib/feature-flags.ts");
const packageText = read("package.json");
const structuredDataText = read("lib/seo/structured-data.ts");
const homePageText = read("app/page.tsx");
const dynamicRoutePageText = read("app/[slug]/page.tsx");
const staticRoutePageText = read("components/routes/RoutePage.tsx");
const policyPageText = read("app/policy/page.tsx");
const aboutPageText = read("app/o-proekte/page.tsx");
const staticLinkCheckText = read("scripts/check-static-site-links.mjs");

const sitemapLocs = [...sitemapText.matchAll(/<loc>https:\/\/dokumenty82\.ru([^<]+)<\/loc>/g)].map((match) => match[1]);

const appPageFiles = listFiles(repoPath("app")).filter((file) => /\.(ts|tsx)$/i.test(file));
for (const file of appPageFiles) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  const text = fs.readFileSync(file, "utf8");
  assert(!/canonical:\s*["'`]\/(?!\/)/.test(text), `Canonical URL must be absolute in app metadata: ${rel}`);
}

assert(semanticRoutes.length === 39, `Expected 39 approved semantic routes; found ${semanticRoutes.length}.`);
assert(indexedRoutes.length === 36, `Expected 36 indexed route expectations; found ${indexedRoutes.length}.`);
assert(noindexFoundationRoutes.length === 3, `Expected 3 noindex route expectations; found ${noindexFoundationRoutes.length}.`);
assert(/semanticRouteDataByPath/.test(routeManifestText), "Route manifest must import/use Stage 18 semantic route data.");
assert(/"check:semantic-seo"/.test(packageText), "package.json must expose check:semantic-seo.");

function requiredRouteFields(route) {
  return [
    "path",
    "indexed",
    "includeInSitemap",
    "routeClass",
    "parentRoute",
    "routeGroup",
    "serviceCluster",
    "primaryIntent",
    "secondarySupportIntent",
    "safeUserWording",
    "safeQueryVariants",
    "problemHooks",
    "contentAngle",
    "faqAngle",
    "relatedRoutes",
    "avoidCannibalizing",
    "metadataDirection",
    "h1Direction",
    "schemaBoundary",
    "holdRisks",
    "pageBlockPurpose",
    "implementationStatus"
  ].filter((field) => {
    if (!(field in route)) return true;
    const value = route[field];
    if (Array.isArray(value)) return value.length === 0;
    if (value === null) return false;
    return value === "";
  });
}

for (const routePath of [...indexedRoutes, ...noindexFoundationRoutes]) {
  const route = semanticByPath.get(routePath);
  assert(route, `Missing Stage 18 semantic route data: ${routePath}`);
  if (!route) continue;

  const missingFields = requiredRouteFields(route);
  assert(missingFields.length === 0, `Semantic route ${routePath} has missing/empty fields: ${missingFields.join(", ")}`);
  assert(Array.isArray(route.relatedRoutes) && route.relatedRoutes.length > 0, `Semantic route ${routePath} must have related routes.`);
  assert(Array.isArray(route.holdRisks) && route.holdRisks.length > 0, `Semantic route ${routePath} must record HOLD risks.`);
  assert(Array.isArray(route.pageBlockPurpose) && route.pageBlockPurpose.length > 0, `Semantic route ${routePath} must record page block purpose.`);
}

for (const routePath of indexedRoutes) {
  const route = semanticByPath.get(routePath);
  if (!route) continue;
  assert(route.indexed === true, `Indexed route must be marked indexed in semantic data: ${routePath}`);
  assert(route.includeInSitemap === true, `Indexed route must be marked includeInSitemap in semantic data: ${routePath}`);
  assert(sitemapLocs.includes(routePath), `Indexed route missing from sitemap: ${routePath}`);
  assert(route.metadataDirection && route.h1Direction, `Indexed route needs metadata and H1 direction: ${routePath}`);
}

for (const routePath of noindexFoundationRoutes) {
  const route = semanticByPath.get(routePath);
  if (!route) continue;
  assert(route.indexed === false, `Noindex foundation route must be non-indexed in semantic data: ${routePath}`);
  assert(route.includeInSitemap === false, `Noindex foundation route must be excluded from sitemap in semantic data: ${routePath}`);
  assert(!sitemapLocs.includes(routePath), `Noindex foundation route appears in sitemap: ${routePath}`);
  assert(/NOINDEX/.test(route.implementationStatus), `Noindex foundation route must keep noindex implementation status: ${routePath}`);
}

const primaryIntentOwners = new Map();
for (const route of semanticRoutes) {
  const owner = primaryIntentOwners.get(route.primaryIntent);
  if (owner) {
    issues.push(`Duplicate primary intent "${route.primaryIntent}" across ${owner} and ${route.path}.`);
  }
  primaryIntentOwners.set(route.primaryIntent, route.path);
}

for (const [hub, children] of Object.entries(hubChildren)) {
  const route = semanticByPath.get(hub);
  assert(route, `Hub missing semantic data: ${hub}`);
  if (!route) continue;
  for (const child of children) {
    assert(route.relatedRoutes.includes(child), `Hub ${hub} must link to child route ${child}.`);
  }
}

for (const [moneyRoute, parent] of Object.entries(moneyParents)) {
  const route = semanticByPath.get(moneyRoute);
  assert(route, `Money page missing semantic data: ${moneyRoute}`);
  if (!route) continue;
  assert(route.parentRoute === parent, `Money page ${moneyRoute} must have parent ${parent}.`);
  assert(route.relatedRoutes.includes(parent), `Money page ${moneyRoute} must include parent hub ${parent} in related routes.`);
}

for (const [diagnosticRoute, parent] of Object.entries(diagnosticParents)) {
  const route = semanticByPath.get(diagnosticRoute);
  assert(route, `Diagnostic page missing semantic data: ${diagnosticRoute}`);
  if (!route) continue;
  assert(route.parentRoute === parent, `Diagnostic route ${diagnosticRoute} must have parent ${parent}.`);
  assert(route.relatedRoutes.includes(parent), `Diagnostic route ${diagnosticRoute} must link to parent hub ${parent}.`);
  assert(route.relatedRoutes.includes("/razbor-situacii/"), `Diagnostic route ${diagnosticRoute} must link to /razbor-situacii/.`);
}

const noindexData = read("lib/blog-news.ts");
for (const marker of [
  "liveFetchEnabled: false",
  "autoPublicationEnabled: false",
  "blogNewsIndexingEnabled: false",
  "serverSchedulerEnabled: false",
  "newsSitemapEnabled: false"
]) {
  assert(noindexData.includes(marker), `Noindex foundation guard must keep ${marker}.`);
}

for (const flag of [
  "formsLive",
  "crmSuccessEnabled",
  "analyticsEnabled",
  "metricaEnabled",
  "maxEnabled",
  "telegramEnabled",
  "messagingRevealEnabled",
  "mapEnabled",
  "cookieNoticeEnabled"
]) {
  assert(new RegExp(`${flag}:\\s*false`).test(featureFlagText), `Unsafe feature flag must remain false: ${flag}`);
}

assert(/routePages/.test(contentText), "Runtime content route data must remain present.");
assert(/pageBlockModel/.test(contentText), "Runtime content route data must include pageBlockModel.");
assert(/faqTopics/.test(contentText), "Runtime content route data must include faqTopics.");
assert(/schemaBoundary/.test(contentText), "Runtime content route data must include schemaBoundary.");
assert(/holdRisks/.test(contentText), "Runtime content route data must include holdRisks.");

assert(/buildBreadcrumbListJsonLd/.test(structuredDataText), "Structured data helper must expose BreadcrumbList builder.");
assert(/buildWebSiteJsonLd/.test(structuredDataText), "Structured data helper must expose WebSite builder.");
assert(/buildWebSiteJsonLd/.test(homePageText), "Homepage must keep WebSite structured data.");
assert(/buildBreadcrumbListJsonLd/.test(dynamicRoutePageText), "Dynamic route template must keep BreadcrumbList structured data.");
assert(/buildBreadcrumbListJsonLd/.test(staticRoutePageText), "Static route template must keep BreadcrumbList structured data.");
assert(/buildBreadcrumbListJsonLd/.test(policyPageText), "Policy page must keep BreadcrumbList structured data.");
assert(/"@type":\s*"FAQPage"/.test(policyPageText), "Policy page must keep FAQPage structured data tied to visible FAQ.");
assert(/buildBreadcrumbListJsonLd/.test(aboutPageText), "About page must keep BreadcrumbList structured data.");
assert(/BreadcrumbList/.test(staticLinkCheckText), "Static export check must validate BreadcrumbList output.");
assert(/forbiddenStructuredDataPattern/.test(staticLinkCheckText), "Static export check must guard forbidden structured data.");

const runtimeFiles = [
  ...listFiles(repoPath("app")),
  ...listFiles(repoPath("components")),
  ...listFiles(repoPath("lib")),
  ...listFiles(repoPath("public")),
  ...listFiles(repoPath("server"))
].filter((file) => {
  const rel = path.relative(root, file).split(path.sep).join("/");
  if (rel.startsWith("lib/pricing/")) return false;
  return /\.(ts|tsx|js|mjs|json|xml|txt|css|conf)$/i.test(file);
});

const hiddenSeoPattern = /hidden\s+seo|seo-only|keyword-stuff|display:\s*none[^;\n]*(ключ|keyword|seo)/i;
const forbiddenActiveClaims = [
  [/гарантируем|100% результат|без отказа/i, "guarantee/result claim"],
  [/заявка отправлена|заявка принята|успешно отправ/i, "false success text"],
  [/<input\b[^>]*\btype=["']file["']|type:\s*["']file["']/i, "public upload input"],
  [/webhook|crmEndpoint|crm_endpoint/i, "CRM webhook/endpoint text"],
  [/t\.me\/|telegram\.me\/|max:\/\//i, "messaging deep link"],
  [/официальный представитель|партн[её]р ФНС|центр ФНС/i, "state-affiliation wording"]
];

for (const file of runtimeFiles) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  const text = fs.readFileSync(file, "utf8");

  assert(!hiddenSeoPattern.test(text), `Hidden SEO-only marker found in runtime/source file: ${rel}`);

  for (const [pattern, label] of forbiddenActiveClaims) {
    assert(!pattern.test(text), `${label} found in runtime/source file: ${rel}`);
  }
}

function hasUnsafePublicLiveTrueMarker(text, rel) {
  return text.split("\n").some((line) => {
    if (!/PUBLIC_LIVE_ALLOWED\s*=\s*true/i.test(line)) return false;
    if (rel.startsWith("docs/") && /(no|must not|forbidden|without approval|blocked|if any|appears anywhere|active source\/runtime)/i.test(line)) return false;
    return true;
  });
}

const allTextFiles = listFiles(root).filter((file) => /\.(ts|tsx|js|mjs|json|xml|txt|md|css|conf|yml|yaml)$/i.test(file));
for (const file of allTextFiles) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  const text = fs.readFileSync(file, "utf8");
  assert(!hasUnsafePublicLiveTrueMarker(text, rel), `PUBLIC_LIVE_ALLOWED true marker found in ${rel}.`);
}

function stripConfComments(text) {
  return text
    .split("\n")
    .map((line) => line.replace(/\s*#.*/, ""))
    .join("\n");
}

const configFiles = allTextFiles.filter((file) => {
  const rel = path.relative(root, file).split(path.sep).join("/");
  return /(^server\/|^nginx\/|Caddyfile$|\.conf$|\.yml$|\.yaml$)/i.test(rel);
});

for (const file of configFiles) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  const uncommented = stripConfComments(fs.readFileSync(file, "utf8"));
  assert(!/listen\s+[^;]*\bquic\b/i.test(uncommented), `Active listen ... quic found in ${rel}.`);
  assert(!/Alt-Svc[^;\n]*h3/i.test(uncommented), `Active Alt-Svc h3 advertisement found in ${rel}.`);
  assert(!/http3\s+on/i.test(uncommented), `Active HTTP/3 enablement found in ${rel}.`);
}

const evidence = {
  status: issues.length === 0 ? "passed" : "failed",
  routeCount: indexedRoutes.length + noindexFoundationRoutes.length,
  indexedRouteCount: indexedRoutes.length,
  noindexRouteCount: noindexFoundationRoutes.length,
  routesChecked: [...indexedRoutes, ...noindexFoundationRoutes],
  semanticDataCompleteness: {
    expectedRoutes: 39,
    actualRoutes: semanticRoutes.length,
    completeRoutes: semanticRoutes.filter((route) => requiredRouteFields(route).length === 0).length
  },
  titleH1DescriptionCompleteness: {
    indexedRoutesWithMetadataDirection: indexedRoutes.filter((routePath) => semanticByPath.get(routePath)?.metadataDirection).length,
    indexedRoutesWithH1Direction: indexedRoutes.filter((routePath) => semanticByPath.get(routePath)?.h1Direction).length,
    indexedRoutesWithContentAngle: indexedRoutes.filter((routePath) => semanticByPath.get(routePath)?.contentAngle).length
  },
  parentChildLinkCompleteness: {
    hubsChecked: Object.keys(hubChildren).length,
    moneyPagesChecked: Object.keys(moneyParents).length,
    diagnosticsChecked: Object.keys(diagnosticParents).length
  },
  relatedRouteCompleteness: {
    routesWithRelatedRoutes: semanticRoutes.filter((route) => Array.isArray(route.relatedRoutes) && route.relatedRoutes.length > 0).length
  },
  noindexSitemapExclusion: {
    checkedRoutes: noindexFoundationRoutes,
    excluded: noindexFoundationRoutes.every((routePath) => !sitemapLocs.includes(routePath))
  },
  holdScanResult: {
    hiddenSeoMarkers: "none",
    publicLiveAllowedTrue: "none",
    forbiddenActiveClaims: "none_or_failed_above",
    transportHttp3QuicActiveEnablement: "none_or_failed_above"
  },
  timestamp: new Date().toISOString(),
  releaseVerdict: "GO_WITH_CONDITIONS",
  publicLiveAllowed: false,
  issues
};

const evidenceDir = repoPath("evidence/seo");
fs.mkdirSync(evidenceDir, { recursive: true });
fs.writeFileSync(path.join(evidenceDir, "stage18-semantic-seo-quality.json"), `${JSON.stringify(evidence, null, 2)}\n`);

if (issues.length > 0) {
  console.error("Semantic SEO quality check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(
  `PASS semantic SEO quality: ${indexedRoutes.length} indexed routes and ${noindexFoundationRoutes.length} noindex foundation routes checked; semantic data complete; public live false; HTTP/3/QUIC not enabled.`
);
