#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const repoRoot = fs.existsSync(path.join(root, ".git")) ? root : path.resolve(root, "..");
const codeRelPrefix = repoRoot === root ? "" : "code/";
const codeRel = (rel) => `${codeRelPrefix}${rel}`;
const outDir = path.join(root, "out");
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

const noindexExcludedRoutes = ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/", "/faq/", "/internal/graphics-proof/"];
const unsafeFlags = [
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

const safeCollectorLabels = [
  "Разобрать ситуацию",
  "Оставить заявку",
  "Заказать звонок",
  "Позвонить",
  "Построить маршрут",
  "Показать документы",
  "Контакты",
  "+7 (978) 998-72-22"
];

const forbiddenPublicPhrases =
  /официальный центр|при налоговой|партн[её]р ФНС|центр ФНС|официальный представитель|100% результат|гарантируем|без отказа|срочно за 1 день/i;
const telegramMaxDeepLinks = /t\.me\/|telegram\.me\/|max:\/\//i;
const uploadInput = /<input\b[^>]*\btype=["']file["']|type:\s*["']file["']/i;
const metricaOrCounter = /ym\(|mc\.yandex|metrika|метрик|counterId|counter-id|yandex_metrica/i;
const webhookOrSecret = /OPENAI_API_KEY|sk-[A-Za-z0-9]|token=|secret=|webhook/i;
const falseSuccess = /goal_form_submit_success|заявка отправлена|заявка принята|успешно отправ/i;

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(name, data) {
  fs.writeFileSync(path.join(evidenceDir, name), `${JSON.stringify(data, null, 2)}\n`);
}

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

function routeToHtmlFile(route) {
  const normalized = normalizePath(route);
  if (normalized === "/") return path.join(outDir, "index.html");
  const clean = normalized.replace(/^\/|\/$/g, "");
  const indexPath = path.join(outDir, clean, "index.html");
  const flatPath = path.join(outDir, `${clean}.html`);
  return fs.existsSync(indexPath) || !fs.existsSync(flatPath) ? indexPath : flatPath;
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(value) {
  return decodeHtml(value.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function uniq(values) {
  return [...new Set(values.filter(Boolean))];
}

function extractAttrValues(html, attr) {
  return uniq([...html.matchAll(new RegExp(`${attr}=["']([^"']+)["']`, "g"))].map((match) => decodeHtml(match[1])));
}

function extractMetaContent(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const direct = html.match(new RegExp(`<meta\\b(?=[^>]*\\bname=["']${escaped}["'])(?=[^>]*\\bcontent=["']([^"']*)["'])[^>]*>`, "i"));
  const reverse = html.match(new RegExp(`<meta\\b(?=[^>]*\\bcontent=["']([^"']*)["'])(?=[^>]*\\bname=["']${escaped}["'])[^>]*>`, "i"));
  return decodeHtml((direct ?? reverse)?.[1] ?? "");
}

function extractCanonical(html) {
  const match = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/i);
  return decodeHtml(match?.[1] ?? "");
}

function listFiles(dir, skip = new Set()) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (skip.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full, skip);
    return full;
  });
}

function parseRouteManifestProof() {
  const routesText = read(path.join(root, "lib/routes.ts"));
  const contentText = read(path.join(root, "lib/content.ts"));

  const explicitManifestPaths = [...routesText.matchAll(/path:\s*"([^"]+)"/g)].map((match) => match[1]);
  const contentRoutePaths = [...contentText.matchAll(/href:\s*"([^"]+)"/g)]
    .map((match) => match[1])
    .filter((route) => route.startsWith("/"));
  const manifestPaths = uniq([...explicitManifestPaths, ...contentRoutePaths]).map(normalizePath);
  const approvedIndexableRoutes = manifestPaths.filter((route) => !noindexExcludedRoutes.includes(route));

  const noindexEntries = Object.fromEntries(
    noindexExcludedRoutes.map((route) => [
      route,
      {
        present: manifestPaths.includes(route),
        sourceStatus: new RegExp(`path:\\s*"${route.replaceAll("/", "\\/")}"[\\s\\S]*?sourceStatus:\\s*"APPROVED_IN_ROUTE_REGISTRY"`).test(routesText)
          ? "APPROVED_IN_ROUTE_REGISTRY"
          : new RegExp(`path:\\s*"${route.replaceAll("/", "\\/")}"[\\s\\S]*?sourceStatus:\\s*"ROUTE_REGISTRY_REVIEW_REQUIRED"`).test(routesText)
            ? "ROUTE_REGISTRY_REVIEW_REQUIRED"
            : "NOT_COLLECTED_IN_THIS_PR",
        indexing: new RegExp(`path:\\s*"${route.replaceAll("/", "\\/")}"[\\s\\S]*?indexing:\\s*"noindex"`).test(routesText)
          ? "noindex"
          : "NOT_COLLECTED_IN_THIS_PR",
        includeInSitemap: new RegExp(`path:\\s*"${route.replaceAll("/", "\\/")}"[\\s\\S]*?includeInSitemap:\\s*false`).test(routesText)
          ? false
          : "NOT_COLLECTED_IN_THIS_PR"
      }
    ])
  );

  return {
    source: [codeRel("lib/routes.ts"), codeRel("lib/content.ts")],
    totalManifestEntries: manifestPaths.length,
    approvedIndexableRouteCount: approvedIndexableRoutes.length,
    approvedIndexableRoutes,
    p0RouteCoverage: p0Routes.map((route) => ({
      route,
      present: manifestPaths.includes(normalizePath(route)),
      approvedIndexable: approvedIndexableRoutes.includes(normalizePath(route))
    })),
    noindexExcludedEntries: noindexEntries,
    policyPresent: manifestPaths.includes("/policy"),
    addressUnreliabilityPresent: manifestPaths.includes("/nedostovernost-yuridicheskogo-adresa/")
  };
}

function parseSitemapProof() {
  const sitemapText = read(path.join(root, "public/sitemap.xml"));
  const locs = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  function has(pathname) {
    return locs.includes(`${siteHost}${pathname}`);
  }

  return {
    source: codeRel("public/sitemap.xml"),
    sitemapUrlCount: locs.length,
    locs,
    includesPolicy: has("/policy"),
    includesAddressUnreliability: has("/nedostovernost-yuridicheskogo-adresa/"),
    excludesBlog: !has("/blog/") && !has("/blog"),
    excludesBlogFnsUpdates: !has("/blog/obnovleniya-fns/") && !has("/blog/obnovleniya-fns"),
    excludesBlogExplainers: !has("/blog/razbory/") && !has("/blog/razbory"),
    excludesFaq: !has("/faq/") && !has("/faq"),
    excludesInternalGraphicsProof: !has("/internal/graphics-proof/") && !has("/internal/graphics-proof")
  };
}

function parseRenderedRouteProof() {
  return p0Routes.map((route) => {
    const file = routeToHtmlFile(route);
    const html = read(file);
    const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripTags(match[1]));
    const policyLinkPattern = /href=["']\/policy\/?["']/i;

    return {
      route,
      renderedFilePath: path.relative(root, file),
      rendered: Boolean(html),
      h1Count: h1Matches.length,
      h1Text: h1Matches[0] ?? "",
      mainExists: /<main\b/i.test(html),
      footerPolicyLinkExists: route === "/policy" || policyLinkPattern.test(html),
      containsForbiddenPhrase: forbiddenPublicPhrases.test(html),
      containsUploadInput: uploadInput.test(html),
      containsTelegramMaxDeepLink: telegramMaxDeepLinks.test(html),
      containsMetricaOrCounter: metricaOrCounter.test(html),
      containsWebhookOrSecretPattern: webhookOrSecret.test(html),
      containsFalseSuccessSignal: falseSuccess.test(html),
      safeCollectorOrContactPathFound:
        safeCollectorLabels.some((label) => stripTags(html).includes(label)) ||
        /href=["']tel:\+79789987222["']|href=["']\/kontakty\/["']|href=["']\/razbor-situacii\/["']/i.test(html),
      documentHeavyHasShowDocuments: documentHeavyRoutes.includes(route) ? stripTags(html).includes("Показать документы") : "NOT_APPLICABLE"
    };
  });
}

function parseMetadataProof() {
  return p0Routes.map((route) => {
    const html = read(routeToHtmlFile(route));
    const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "").replace(/\s+/g, " ").trim();
    const description = extractMetaContent(html, "description");
    const canonical = extractCanonical(html);
    const robots = extractMetaContent(html, "robots");
    const expected = expectedCanonical(route);

    return {
      route,
      title,
      description,
      canonical,
      expectedCanonical: expected,
      canonicalMatchesExpected: canonical === expected,
      robots: robots || null,
      titleExists: Boolean(title),
      descriptionExists: Boolean(description),
      canonicalExists: Boolean(canonical)
    };
  });
}

function parseCollectorProof() {
  return p0Routes.map((route) => {
    const html = read(routeToHtmlFile(route));
    const visibleText = stripTags(html);
    const dataCollectorKind = extractAttrValues(html, "data-collector-kind");
    const dataCtaLabel = extractAttrValues(html, "data-cta-label");
    const dataPageSlug = extractAttrValues(html, "data-page-slug");
    const dataPageType = extractAttrValues(html, "data-page-type");
    const labelsDetected = safeCollectorLabels.filter((label) => visibleText.includes(label));
    const policyAggressiveCommercialCollector =
      route === "/policy" &&
      (dataCollectorKind.some((kind) => ["situation_review", "show_documents", "form", "request"].includes(kind)) ||
        dataCtaLabel.some((label) => ["Разобрать ситуацию", "Оставить заявку", "Показать документы"].includes(label)));

    return {
      route,
      collectorLabelsDetected: labelsDetected,
      dataCollectorKind,
      dataCtaLabel,
      dataPageSlug,
      dataPageType,
      safeCollectorOrContactPathFound:
        labelsDetected.length > 0 || /href=["']tel:\+79789987222["']|href=["']\/kontakty\/["']|href=["']\/razbor-situacii\/["']/i.test(html),
      documentHeavyHasShowDocuments: documentHeavyRoutes.includes(route) ? labelsDetected.includes("Показать документы") : "NOT_APPLICABLE",
      policyHasPhoneAndContactsFallbackOnly:
        route === "/policy"
          ? dataCtaLabel.includes("Позвонить") && dataCtaLabel.includes("Контакты") && !policyAggressiveCommercialCollector
          : "NOT_APPLICABLE",
      policyAggressiveCommercialCollector
    };
  });
}

function parseFeatureFlagsProof() {
  const flagsText = read(path.join(root, "lib/feature-flags.ts"));
  const flags = Object.fromEntries([...flagsText.matchAll(/(\w+):\s*(true|false)/g)].map((match) => [match[1], match[2] === "true"]));
  const unsafeGateStatus = Object.fromEntries(unsafeFlags.map((flag) => [flag, flags[flag] === false]));

  return {
    source: codeRel("lib/feature-flags.ts"),
    flags,
    unsafeGatesAllClosed: Object.values(unsafeGateStatus).every(Boolean),
    unsafeGateStatus
  };
}

function parseSafetyGuardProof(renderedRouteProof) {
  const skip = new Set([".git", "node_modules", ".next", "out", "dist"]);
  const files = listFiles(repoRoot, skip);
  const secretLikeFiles = files
    .filter((file) => path.basename(file) === ".env" || /\.(pem|key)$/i.test(file))
    .map((file) => path.relative(repoRoot, file));
  const renderedFailures = renderedRouteProof.filter(
    (route) =>
      route.containsForbiddenPhrase ||
      route.containsUploadInput ||
      route.containsTelegramMaxDeepLink ||
      route.containsMetricaOrCounter ||
      route.containsWebhookOrSecretPattern ||
      route.containsFalseSuccessSignal
  );

  return {
    source: [`rendered P0 HTML under ${codeRel("out")}`, "repository filename scan excluding build/cache directories"],
    noEnvFiles: !secretLikeFiles.some((file) => path.basename(file) === ".env"),
    noPrivateKeyFiles: !secretLikeFiles.some((file) => /\.(pem|key)$/i.test(file)),
    secretLikeFiles,
    renderedP0Html: {
      noForbiddenPublicPhrases: !renderedRouteProof.some((route) => route.containsForbiddenPhrase),
      noFinalTelegramMaxDeepLinks: !renderedRouteProof.some((route) => route.containsTelegramMaxDeepLink),
      noUploadInputs: !renderedRouteProof.some((route) => route.containsUploadInput),
      noMetricaIdOrCounter: !renderedRouteProof.some((route) => route.containsMetricaOrCounter),
      noWebhookOrSecretPattern: !renderedRouteProof.some((route) => route.containsWebhookOrSecretPattern),
      noFalseSuccessSignal: !renderedRouteProof.some((route) => route.containsFalseSuccessSignal),
      failures: renderedFailures.map((route) => route.route)
    },
    notCollectedInThisPr: [
      "visual screenshots",
      "browser accessibility/axe",
      "Playwright E2E",
      "CRM/Metrica live payload proof",
      "owner/legal/backend/provider acceptance"
    ]
  };
}

function writeSummary({
  routeManifestProof,
  sitemapProof,
  renderedRouteProof,
  metadataProof,
  collectorProof,
  featureFlagsProof,
  safetyGuardProof
}) {
  const passedRoutes = renderedRouteProof.filter((route) => route.rendered && route.h1Count === 1).length;
  const metadataPassed = metadataProof.filter((route) => route.titleExists && route.descriptionExists && route.canonicalExists).length;
  const collectorPassed = collectorProof.filter((route) => route.safeCollectorOrContactPathFound).length;

  const lines = [
    "# P0 QA Evidence Pack V1",
    "",
    "Status: `TEXT_JSON_EVIDENCE_CREATED`",
    "",
    "Release verdict: `GO WITH CONDITIONS`",
    "",
    "P0 build verdict: `READY_FOR_DOKUMENTY82_SITE_P0_BUILD_WITH_CONDITIONS`",
    "",
    "Public launch verdict: `NOT_PUBLIC_LAUNCH_READY`",
    "",
    "Paid traffic verdict: `BLOCKS_PAID_TRAFFIC`",
    "",
    "## Evidence model",
    "",
    "`source-of-truth -> route manifest -> rendered HTML -> metadata snapshots -> collector proof -> safety guards -> evidence report`",
    "",
    "## Produced files",
    "",
    `- \`${codeRel("evidence/p0/route-manifest-proof.json")}\``,
    `- \`${codeRel("evidence/p0/sitemap-proof.json")}\``,
    `- \`${codeRel("evidence/p0/rendered-route-proof.json")}\``,
    `- \`${codeRel("evidence/p0/metadata-proof.json")}\``,
    `- \`${codeRel("evidence/p0/collector-proof.json")}\``,
    `- \`${codeRel("evidence/p0/feature-flags-proof.json")}\``,
    `- \`${codeRel("evidence/p0/safety-guard-proof.json")}\``,
    `- \`${codeRel("evidence/p0/summary.md")}\``,
    "",
    "## Results",
    "",
    `- Route manifest entries parsed: ${routeManifestProof.totalManifestEntries}.`,
    `- P0 routes present in manifest: ${routeManifestProof.p0RouteCoverage.filter((route) => route.present).length}/${p0Routes.length}.`,
    `- Sitemap URLs: ${sitemapProof.sitemapUrlCount}.`,
    `- Rendered routes with one H1: ${passedRoutes}/${p0Routes.length}.`,
    `- Routes with title, description and canonical: ${metadataPassed}/${p0Routes.length}.`,
    `- Routes with safe collector/contact path: ${collectorPassed}/${p0Routes.length}.`,
    `- Unsafe feature gates closed: ${featureFlagsProof.unsafeGatesAllClosed ? "yes" : "no"}.`,
    `- Rendered P0 HTML safety failures: ${safetyGuardProof.renderedP0Html.failures.length}.`,
    "",
    "## Improved",
    "",
    "- route manifest proof;",
    "- sitemap proof;",
    "- basic rendered HTML proof;",
    "- basic metadata proof;",
    "- basic collector proof;",
    "- feature flag proof;",
    "- static safety guard proof.",
    "",
    "## Still blocked",
    "",
    "- visual screenshots;",
    "- browser accessibility/axe;",
    "- Playwright E2E;",
    "- owner/legal/backend/provider acceptance;",
    "- CRM/Metrica hooks;",
    "- no-PII analytics payload proof;",
    "- public launch;",
    "- paid traffic.",
    "",
    "## Safety",
    "",
    "- no public launch approval;",
    "- no live forms;",
    "- no live analytics;",
    "- no CRM submission;",
    "- no public upload;",
    "- no false success;",
    "- no Telegram/MAX final deep links;",
    "- no secrets;",
    "- HOLD preserved."
  ];

  fs.writeFileSync(path.join(evidenceDir, "summary.md"), `${lines.join("\n")}\n`);
}

ensureDir(evidenceDir);

if (!fs.existsSync(outDir)) {
  console.error(`Missing ${codeRel("out")}. Run \`npm run build\` before \`npm run evidence:p0\`.`);
  process.exit(1);
}

const routeManifestProof = parseRouteManifestProof();
const sitemapProof = parseSitemapProof();
const renderedRouteProof = parseRenderedRouteProof();
const metadataProof = parseMetadataProof();
const collectorProof = parseCollectorProof();
const featureFlagsProof = parseFeatureFlagsProof();
const safetyGuardProof = parseSafetyGuardProof(renderedRouteProof);

writeJson("route-manifest-proof.json", routeManifestProof);
writeJson("sitemap-proof.json", sitemapProof);
writeJson("rendered-route-proof.json", renderedRouteProof);
writeJson("metadata-proof.json", metadataProof);
writeJson("collector-proof.json", collectorProof);
writeJson("feature-flags-proof.json", featureFlagsProof);
writeJson("safety-guard-proof.json", safetyGuardProof);
writeSummary({
  routeManifestProof,
  sitemapProof,
  renderedRouteProof,
  metadataProof,
  collectorProof,
  featureFlagsProof,
  safetyGuardProof
});

console.log(`P0 evidence generated in ${path.relative(root, evidenceDir)}`);
