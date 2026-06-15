#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const evidenceDir = path.join(root, "evidence/p0");
const siteHost = "https://dokumenty82.ru";

const p0Routes = [
  "/",
  "/razbor-situacii/",
  "/kontakty/",
  "/policy",
  "/otvet-na-trebovanie-ifns/",
  "/otvet-na-zapros-banka/",
  "/dokumenty-dlya-banka-115-fz/",
  "/deklaraciya-usn/",
  "/nulevaya-otchetnost-ooo/",
  "/nulevaya-otchetnost-ip/",
  "/registraciya-ooo/",
  "/registraciya-ip/",
  "/yuridicheskiy-adres-simferopol/",
  "/nedostovernost-yuridicheskogo-adresa/"
];

const documentHeavyRoutes = [
  "/otvet-na-trebovanie-ifns/",
  "/otvet-na-zapros-banka/",
  "/dokumenty-dlya-banka-115-fz/",
  "/deklaraciya-usn/",
  "/nulevaya-otchetnost-ooo/",
  "/nulevaya-otchetnost-ip/",
  "/yuridicheskiy-adres-simferopol/",
  "/nedostovernost-yuridicheskogo-adresa/"
];

const unsafeFlags = [
  "formsLive",
  "crmSuccessEnabled",
  "analyticsEnabled",
  "maxEnabled",
  "telegramEnabled",
  "messagingRevealEnabled",
  "mapEnabled",
  "cookieNoticeEnabled"
];

const evidenceFiles = [
  "route-manifest-proof.json",
  "sitemap-proof.json",
  "rendered-route-proof.json",
  "metadata-proof.json",
  "collector-proof.json",
  "feature-flags-proof.json",
  "safety-guard-proof.json",
  "summary.md"
];

const issues = [];

function normalizePath(route) {
  if (route === "/") return "/";
  if (route === "/policy") return "/policy";
  return route.endsWith("/") ? route : `${route}/`;
}

function expectedCanonical(route) {
  if (route === "/") return `${siteHost}/`;
  if (route === "/policy") return `${siteHost}/policy`;
  return `${siteHost}${normalizePath(route)}`;
}

function readJson(name) {
  const file = path.join(evidenceDir, name);
  if (!fs.existsSync(file)) {
    issues.push(`Missing evidence file: code/evidence/p0/${name}`);
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    issues.push(`Invalid JSON in code/evidence/p0/${name}: ${error.message}`);
    return null;
  }
}

function byRoute(rows) {
  return new Map((rows ?? []).map((row) => [row.route, row]));
}

for (const file of evidenceFiles) {
  if (!fs.existsSync(path.join(evidenceDir, file))) {
    issues.push(`Missing evidence file: code/evidence/p0/${file}`);
  }
}

const routeManifestProof = readJson("route-manifest-proof.json");
const sitemapProof = readJson("sitemap-proof.json");
const renderedRouteProof = readJson("rendered-route-proof.json");
const metadataProof = readJson("metadata-proof.json");
const collectorProof = readJson("collector-proof.json");
const featureFlagsProof = readJson("feature-flags-proof.json");
const safetyGuardProof = readJson("safety-guard-proof.json");

const manifestByRoute = byRoute(routeManifestProof?.p0RouteCoverage);
const renderedByRoute = byRoute(renderedRouteProof);
const metadataByRoute = byRoute(metadataProof);
const collectorByRoute = byRoute(collectorProof);

for (const route of p0Routes) {
  const manifest = manifestByRoute.get(route);
  if (!manifest?.present) {
    issues.push(`P0 route missing from route manifest proof: ${route}`);
  }

  if (!manifest?.approvedIndexable) {
    issues.push(`P0 route is not approved/indexable in route manifest proof: ${route}`);
  }

  const rendered = renderedByRoute.get(route);
  if (!rendered?.rendered) {
    issues.push(`P0 route missing rendered HTML proof: ${route}`);
  }

  if (rendered?.h1Count !== 1) {
    issues.push(`P0 route must have exactly one visible H1 in rendered proof: ${route}`);
  }

  if (!rendered?.mainExists) {
    issues.push(`P0 route missing <main> in rendered proof: ${route}`);
  }

  if (route !== "/policy" && !rendered?.footerPolicyLinkExists) {
    issues.push(`P0 route missing footer /policy link in rendered proof: ${route}`);
  }

  if (rendered?.containsForbiddenPhrase) {
    issues.push(`Forbidden public phrase found in rendered P0 HTML: ${route}`);
  }

  if (rendered?.containsUploadInput) {
    issues.push(`Public upload input found in rendered P0 HTML: ${route}`);
  }

  if (rendered?.containsTelegramMaxDeepLink) {
    issues.push(`Final Telegram/MAX deep link found in rendered P0 HTML: ${route}`);
  }

  if (rendered?.containsWebhookOrSecretPattern) {
    issues.push(`Webhook/secret-like signal found in rendered P0 HTML: ${route}`);
  }

  if (rendered?.containsFalseSuccessSignal) {
    issues.push(`False-success or live success signal found in rendered P0 HTML: ${route}`);
  }

  const metadata = metadataByRoute.get(route);
  if (!metadata?.titleExists) {
    issues.push(`Missing title in metadata proof: ${route}`);
  }

  if (!metadata?.descriptionExists) {
    issues.push(`Missing meta description in metadata proof: ${route}`);
  }

  if (!metadata?.canonicalExists) {
    issues.push(`Missing canonical in metadata proof: ${route}`);
  }

  const canonicalExpected = expectedCanonical(route);
  if (metadata?.canonical !== canonicalExpected) {
    issues.push(`Canonical mismatch in metadata proof: ${route}; expected ${canonicalExpected}; got ${metadata?.canonical ?? "MISSING"}`);
  }

  const collector = collectorByRoute.get(route);
  if (!collector?.safeCollectorOrContactPathFound) {
    issues.push(`Missing safe collector/contact path in collector proof: ${route}`);
  }

  if (documentHeavyRoutes.includes(route) && collector?.documentHeavyHasShowDocuments !== true) {
    issues.push(`Document-heavy P0 route lacks 'Показать документы' collector proof: ${route}`);
  }
}

if (!routeManifestProof?.policyPresent) {
  issues.push("Route manifest proof misses /policy.");
}

if (!routeManifestProof?.addressUnreliabilityPresent) {
  issues.push("Route manifest proof misses /nedostovernost-yuridicheskogo-adresa/.");
}

if (!sitemapProof?.includesPolicy) {
  issues.push("Sitemap proof misses /policy.");
}

if (!sitemapProof?.includesAddressUnreliability) {
  issues.push("Sitemap proof misses /nedostovernost-yuridicheskogo-adresa/.");
}

if (!sitemapProof?.excludesBlog) {
  issues.push("Sitemap proof includes /blog/.");
}

if (!sitemapProof?.excludesBlogFnsUpdates) {
  issues.push("Sitemap proof includes /blog/obnovleniya-fns/.");
}

if (!sitemapProof?.excludesBlogExplainers) {
  issues.push("Sitemap proof includes /blog/razbory/.");
}

if (!sitemapProof?.excludesFaq) {
  issues.push("Sitemap proof includes /faq/.");
}

if (!sitemapProof?.excludesInternalGraphicsProof) {
  issues.push("Sitemap proof includes /internal/graphics-proof/.");
}

const policyCollector = collectorByRoute.get("/policy");
const policyLabels = policyCollector?.dataCtaLabel ?? [];
const policyHasSafeFallback = policyLabels.includes("Позвонить") && policyLabels.includes("Контакты");

if (!policyHasSafeFallback) {
  issues.push("/policy must have phone + contacts fallback only.");
}

if (policyCollector?.policyAggressiveCommercialCollector && !policyHasSafeFallback) {
  issues.push("/policy has aggressive commercial collector proof.");
}

for (const flag of unsafeFlags) {
  if (featureFlagsProof?.flags?.[flag] !== false) {
    issues.push(`Unsafe feature flag must remain false: ${flag}`);
  }
}

if (!featureFlagsProof?.unsafeGatesAllClosed) {
  issues.push("Unsafe feature gates are not all closed.");
}

if (!safetyGuardProof?.noEnvFiles) {
  issues.push("Secret-like .env file found.");
}

if (!safetyGuardProof?.noPrivateKeyFiles) {
  issues.push("Private key-like file found.");
}

const renderedSafety = safetyGuardProof?.renderedP0Html;
if (renderedSafety) {
  const expectedTrue = [
    "noForbiddenPublicPhrases",
    "noFinalTelegramMaxDeepLinks",
    "noUploadInputs",
    "yandexMetrikaCounterPresent",
    "noWebhookOrSecretPattern",
    "noFalseSuccessSignal"
  ];

  for (const key of expectedTrue) {
    if (renderedSafety[key] !== true) {
      issues.push(`Rendered P0 safety guard failed: ${key}`);
    }
  }
}

if (issues.length > 0) {
  console.error("P0 evidence check failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`PASS P0 evidence: ${p0Routes.length} P0 routes, metadata, collectors, feature gates and rendered safety guards verified.`);
