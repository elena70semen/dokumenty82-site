#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

const requiredDocs = [
  "AGENTS.md",
  "docs/source-to-site/source-to-site-alignment-contract-v1.md",
  "docs/source-to-site/source-to-site-current-sync-status-v1.md",
  "docs/source-to-site/site-repo-stage-16-assembly-handoff-v1.md",
  "docs/source-to-site/transport-protocol-launch-gate-sync-v1.md",
  "docs/launch/stage-15-site-foundation-status-v1.md",
  "docs/launch/stage-16-source-package-status-v1.md",
  "docs/launch/stage-16-selling-seo-content-status-v1.md",
  "docs/launch/stage-17-repository-conformance-checklist-v1.md",
  "docs/launch/stage-17-repository-conformance-report-v1.md",
  "docs/launch/stage-17-project-vector-audit-v1.md",
  "docs/seo/stage-17-service-route-coverage-audit-v1.md",
  "docs/qa/stage-17f-owner-legal-content-qa-v1.md",
  "docs/qa/stage-17f-public-copy-review-checklist-v1.md",
  "docs/owner-review/stage-17g-owner-legal-signoff-packet-v1.md",
  "docs/owner-review/stage-17g-route-decision-log-v1.md",
  "docs/owner-review/stage-17g-go-no-go-review-checklist-v1.md",
  "docs/owner-review/stage-17g-owner-review-index-v1.md",
  "docs/owner-review/stage-17h-human-decision-intake-protocol-v1.md",
  "docs/launch/stage-17h-blocker-closure-roadmap-v1.md",
  "docs/launch/stage-17i-commit-readiness-worktree-audit-v1.md",
  "docs/launch/stage-17j-worktree-integration-and-local-commit-readiness-v1.md",
  "docs/strategy/stage-15-site-seo-content-structure-roadmap-v1.md",
  "docs/strategy/stage-15-source-to-site-content-matrix-v1.md",
  "docs/content/stage-15-text-quality-standards-v1.md",
  "docs/frontend/stage-15-mobile-layout-standards-v1.md",
  "docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md",
  "docs/content/stage-16-selling-page-block-library-v1.md",
  "docs/strategy/stage-16-selling-seo-content-architecture-v1.md",
  "docs/content/stage-16-page-block-blueprints-v1.md",
  "docs/content/stage-16-client-need-hooks-and-lead-path-v1.md",
  "docs/seo/stage-16-route-group-semantic-coverage-v1.md",
  "docs/seo/stage-16-yandex-semantic-service-map-v1.md",
  "docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md",
  "docs/frontend/stage-16-route-implementation-checklist-v1.md"
];

const missingExpectedDocs = [];

function repoPath(rel) {
  return path.join(root, rel);
}

function exists(rel) {
  return fs.existsSync(repoPath(rel));
}

function read(rel) {
  return exists(rel) ? fs.readFileSync(repoPath(rel), "utf8") : "";
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", ".next", "node_modules", "out"].includes(entry.name)) return [];

    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full);
    return full;
  });
}

function assert(condition, message) {
  if (!condition) issues.push(message);
}

function hasUnsafePublicLiveTrueMarker(text, rel) {
  return text.split("\n").some((line) => {
    if (!/PUBLIC_LIVE_ALLOWED\s*=\s*true/i.test(line)) return false;

    const isDocumentedProhibition =
      rel.startsWith("docs/") &&
      /(appears anywhere|no-go|forbidden|must not|do not|without approval|is enabled|if any|remain true)/i.test(line);

    return !isDocumentedProhibition;
  });
}

for (const rel of requiredDocs) {
  assert(exists(rel), `Missing required Stage 15/16 source-to-site file: ${rel}`);
}

for (const rel of missingExpectedDocs) {
  assert(exists(rel), `Missing MISSING_EXPECTED placeholder: ${rel}`);
  assert(/MISSING_EXPECTED/.test(read(rel)), `Placeholder must state MISSING_EXPECTED: ${rel}`);
}

const allTextFiles = listFiles(root).filter((file) => /\.(ts|tsx|js|mjs|json|xml|txt|md|css|conf)$/i.test(file));

for (const file of allTextFiles) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  const text = fs.readFileSync(file, "utf8");
  assert(!hasUnsafePublicLiveTrueMarker(text, rel), `Public live true marker found in ${rel}`);
}

const flagsText = read("lib/feature-flags.ts");
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
  assert(new RegExp(`${flag}:\\s*false`).test(flagsText), `Unsafe feature flag must stay false: ${flag}`);
}

const runtimeFiles = allTextFiles.filter((file) => {
  const rel = path.relative(root, file).split(path.sep).join("/");
  if (!/^(app|components|lib|public|server)\//.test(rel)) return false;
  if (rel.startsWith("lib/pricing/")) return false;
  return /\.(ts|tsx|js|mjs|xml|txt|css|conf)$/i.test(rel);
});

const forbiddenRuntimePatterns = [
  [/цена|стоимость|скидк|прайс|тариф|руб\.|₽/i, "price/discount claim"],
  [/гарант|100% результат|без отказа/i, "guarantee/result claim"],
  [/отзыв|рейтинг|ReviewRating|AggregateRating/i, "review/rating claim"],
  [/\bкейс(ы|ов|а|ам|ами)?\b|case\s+stud/i, "case claim"],
  [/срочно за 1 день|точн(ый|ые|ого) срок|дедлайн/i, "exact deadline claim"],
  [/\bИНН\b|\bОГРН\b|\bКПП\b|р\/с|расч[её]тный сч[её]т/i, "legal identifier or requisites"],
  [/(режим работы|часы работы|график работы)\s*[:—-]\s*\S/i, "working-hours value"],
  [/(пн|понедельник|вт|вторник|ср|среда|чт|четверг|пт|пятница|сб|суббота|вс|воскресенье)[\s\S]{0,40}\d{1,2}[:.]\d{2}/i, "working-hours schedule"],
  [/(офис\s*(№|номер|n|#)\s*\d+|номер\s+офиса\s*\d+|\b\d+\s*этаж\b|\bэтаж\s*\d+\b)/i, "office number or floor"],
  [/заявка отправлена|заявка принята|успешно отправ/i, "false success text"],
  [/webhook|crmEndpoint|crm_endpoint/i, "CRM webhook/endpoint text"],
  [/hidden\s+seo|seo-only|keyword-stuff|display:\s*none[^;]*(ключ|keyword)/i, "hidden SEO text"],
  [/t\.me\/|telegram\.me\/|max:\/\//i, "messaging deep link"],
  [/<input\b[^>]*\btype=["']file["']|type:\s*["']file["']/i, "public upload input"]
];

for (const file of runtimeFiles) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  const text = fs.readFileSync(file, "utf8");

  for (const [pattern, label] of forbiddenRuntimePatterns) {
    assert(!pattern.test(text), `${label} found in runtime file: ${rel}`);
  }
}

const sitemapText = read("public/sitemap.xml");
for (const route of ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/", "/faq/", "/internal/graphics-proof/"]) {
  assert(!new RegExp(`<loc>https://dokumenty82\\.ru${route}</loc>`).test(sitemapText), `Noindex route appears in sitemap: ${route}`);
}

const linkedRecoveryRoute = runtimeFiles.some((file) => fs.readFileSync(file, "utf8").includes("/vosstanovlenie-buhucheta/"));
if (linkedRecoveryRoute) {
  const contentText = read("lib/content.ts");
  assert(/slug:\s*"vosstanovlenie-buhucheta"/.test(contentText), "Linked /vosstanovlenie-buhucheta/ route must keep a content slug.");
  assert(/href:\s*"\/vosstanovlenie-buhucheta\/"/.test(contentText), "Linked /vosstanovlenie-buhucheta/ route must keep a content href.");
  assert(
    /<loc>https:\/\/dokumenty82\.ru\/vosstanovlenie-buhucheta\/<\/loc>/.test(sitemapText),
    "Linked /vosstanovlenie-buhucheta/ route must remain in sitemap while indexed."
  );
}

function stripConfComments(text) {
  return text
    .split("\n")
    .map((line) => line.replace(/\s*#.*/, ""))
    .join("\n");
}

const configFiles = allTextFiles.filter((file) => {
  const rel = path.relative(root, file).split(path.sep).join("/");
  return /(^server\/|^nginx\/|Caddyfile$|\.conf$)/i.test(rel);
});

for (const file of configFiles) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  const uncommented = stripConfComments(fs.readFileSync(file, "utf8"));
  assert(!/listen\s+[^;]*\bquic\b/i.test(uncommented), `Active listen ... quic found in ${rel}`);
  assert(!/Alt-Svc[^;\n]*h3/i.test(uncommented), `Active Alt-Svc h3 advertisement found in ${rel}`);
  assert(!/http3\s+on/i.test(uncommented), `Active HTTP/3 enablement found in ${rel}`);
}

const transportText = read("docs/source-to-site/transport-protocol-launch-gate-sync-v1.md");
assert(/HTTP\/3[\s\S]*BLOCKED_BY_DEFAULT/.test(transportText), "Transport gate must keep HTTP/3 blocked by default.");
assert(/QUIC[\s\S]*BLOCKED_BY_DEFAULT/.test(transportText), "Transport gate must keep QUIC blocked by default.");
assert(/UDP\/443[\s\S]*BLOCKED_BY_DEFAULT/.test(transportText), "Transport gate must keep UDP/443 blocked by default.");

const vectorAuditText = read("docs/launch/stage-17-project-vector-audit-v1.md");
assert(/VECTOR_ALIGNED_WITH_CONDITIONS|VECTOR_DRIFT_DETECTED/.test(vectorAuditText), "Stage 17 project vector audit must state vector status.");
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(vectorAuditText), "Stage 17 project vector audit must keep public live false.");

const coverageAuditText = read("docs/seo/stage-17-service-route-coverage-audit-v1.md");
const ownerLegalQaText = read("docs/qa/stage-17f-owner-legal-content-qa-v1.md");
const publicCopyChecklistText = read("docs/qa/stage-17f-public-copy-review-checklist-v1.md");
const stage16YandexSemanticMapText = read("docs/seo/stage-16-yandex-semantic-service-map-v1.md");
const stage16SellingSeoArchitectureText = read("docs/strategy/stage-16-selling-seo-content-architecture-v1.md");
const stage16PageBlockBlueprintsText = read("docs/content/stage-16-page-block-blueprints-v1.md");
const stage16ClientNeedHooksText = read("docs/content/stage-16-client-need-hooks-and-lead-path-v1.md");
const stage17gSignoffPacketText = read("docs/owner-review/stage-17g-owner-legal-signoff-packet-v1.md");
const stage17gRouteDecisionLogText = read("docs/owner-review/stage-17g-route-decision-log-v1.md");
const stage17gGoNoGoChecklistText = read("docs/owner-review/stage-17g-go-no-go-review-checklist-v1.md");
const stage17gOwnerReviewIndexText = read("docs/owner-review/stage-17g-owner-review-index-v1.md");
const stage17hDecisionIntakeText = read("docs/owner-review/stage-17h-human-decision-intake-protocol-v1.md");
const stage17hBlockerRoadmapText = read("docs/launch/stage-17h-blocker-closure-roadmap-v1.md");
const stage17iCommitReadinessText = read("docs/launch/stage-17i-commit-readiness-worktree-audit-v1.md");
const stage17jWorktreeIntegrationText = read("docs/launch/stage-17j-worktree-integration-and-local-commit-readiness-v1.md");
const contentText = read("lib/content.ts");
const routesText = read("lib/routes.ts");

const stage17DynamicSlugs = [
  "srochnye-voprosy",
  "otchetnost",
  "nalogi-i-rezhimy",
  "bank-i-115-fz",
  "adres-egryul-direktor",
  "kadry",
  "soprovozhdenie",
  "registraciya-i-likvidaciya",
  "otvet-na-trebovanie-ifns",
  "deklaraciya-usn",
  "nulevaya-otchetnost-ooo",
  "nulevaya-otchetnost-ip",
  "vosstanovlenie-buhucheta",
  "otchetnost-elektronno",
  "perehod-na-ausn",
  "otvet-na-zapros-banka",
  "dokumenty-dlya-banka-115-fz",
  "yuridicheskiy-adres-simferopol",
  "smena-yuridicheskogo-adresa-ooo",
  "nedostovernost-yuridicheskogo-adresa",
  "smena-direktora-ooo",
  "srochnoe-oformlenie-sotrudnikov",
  "kadrovoe-soprovozhdenie",
  "registraciya-ooo",
  "registraciya-ip",
  "likvidaciya-ooo",
  "buhgalterskoe-soprovozhdenie-ooo",
  "buhgalterskoe-soprovozhdenie-ip",
  "ausn-krym",
  "raschet-nalogovoy-nagruzki",
  "nds-pri-usn-2026"
];

const stage17IndexedRoutes = [
  "/",
  "/razbor-situacii/",
  "/kontakty/",
  "/o-proekte/",
  "/policy",
  ...stage17DynamicSlugs.map((slug) => `/${slug}/`)
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findHardeningEntry(slug) {
  const mapStart = contentText.indexOf("const routeHardeningBySlug");
  if (mapStart < 0) return "";

  const mapText = contentText.slice(mapStart);
  const entryPattern = new RegExp(`\\n  (?:"${escapeRegex(slug)}"|${escapeRegex(slug)})\\s*:\\s*{`);
  const match = entryPattern.exec(mapText);
  if (!match) return "";

  const entryStart = mapStart + match.index;
  const commaEnd = contentText.indexOf("\n  },", entryStart);
  const mapEnd = contentText.indexOf("\n};", entryStart);
  const entryEnd = commaEnd >= 0 && commaEnd < mapEnd ? commaEnd : mapEnd;

  return entryEnd >= 0 ? contentText.slice(entryStart, entryEnd) : contentText.slice(entryStart);
}

assert(/const routeHardeningBySlug/.test(contentText), "Stage 17D/E route hardening map must exist in lib/content.ts.");
assert(/function withRouteHardening/.test(contentText), "Stage 17D/E hardening map must be merged into routePages.");
assert(/getHardeningBlocks/.test(read("app/[slug]/page.tsx")), "Dynamic route template must render Stage 17D/E hardening blocks.");

for (const slug of stage17DynamicSlugs) {
  const entry = findHardeningEntry(slug);
  assert(entry, `Stage 17D/E hardening entry missing for dynamic route: /${slug}/`);
  for (const field of ["whatWeCheck", "documentsOrData", "howWorkStarts", "notPromised"]) {
    assert(entry.includes(`${field}:`), `Stage 17D/E hardening field ${field} missing for dynamic route: /${slug}/`);
  }
}

for (const route of [
  "/srochnoe-oformlenie-sotrudnikov/",
  "/perehod-na-ausn/",
  "/otchetnost-elektronno/",
  "/buhgalterskoe-soprovozhdenie-ooo/",
  "/buhgalterskoe-soprovozhdenie-ip/",
  "/kadrovoe-soprovozhdenie/"
]) {
  const slug = route.replace(/^\/|\/$/g, "");
  assert(
    contentText.includes(`slug: "${slug}"`) && contentText.includes(`href: "${route}"`),
    `Stage 17B/C implemented route must exist in content model: ${route}`
  );
  assert(
    sitemapText.includes(`<loc>https://dokumenty82.ru${route}</loc>`),
    `Stage 17B/C implemented route must exist in sitemap while indexed: ${route}`
  );
}

for (const route of stage17IndexedRoutes) {
  const row = coverageAuditText.split("\n").find((line) => line.startsWith(`| \`${route}\``));
  assert(row, `Stage 17 service-route coverage audit must include indexed route: ${route}`);
  assert(
    row.includes("STAGE_17D_E_HARDENED_WITH_CONDITIONS"),
    `Stage 17 service-route coverage audit must mark indexed route as hardened with conditions: ${route}`
  );

  const qaRow = ownerLegalQaText.split("\n").find((line) => line.startsWith(`| \`${route}\``));
  assert(qaRow, `Stage 17F owner/legal/content QA must include indexed route: ${route}`);
  assert(
    qaRow.includes("READY_WITH_CONDITIONS") && qaRow.includes("OWNER_LEGAL_REVIEW_REQUIRED"),
    `Stage 17F owner/legal/content QA must keep route ready with conditions and owner/legal-gated: ${route}`
  );

  const checklistRow = publicCopyChecklistText.split("\n").find((line) => line.startsWith(`| \`${route}\``));
  assert(checklistRow, `Stage 17F public-copy checklist must include indexed route: ${route}`);
  assert(
    checklistRow.includes("READY_FOR_OWNER_REVIEW") && checklistRow.includes("NOT_READY_FOR_PUBLIC_LIVE"),
    `Stage 17F public-copy checklist must keep route ready for owner review but not public live: ${route}`
  );

  const decisionRow = stage17gRouteDecisionLogText.split("\n").find((line) => line.startsWith(`| \`${route}\``));
  assert(decisionRow, `Stage 17G route decision log must include indexed route: ${route}`);
  assert(
    decisionRow.includes("READY_FOR_OWNER_REVIEW") &&
      decisionRow.includes("OWNER_LEGAL_REVIEW_REQUIRED") &&
      decisionRow.includes("BACKEND_CRM_REVIEW_REQUIRED") &&
      decisionRow.includes("NOT_PUBLIC_LIVE_READY"),
    `Stage 17G route decision log must keep route owner/legal/CRM-gated and not public-live ready: ${route}`
  );
}

for (const route of ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/"]) {
  const row = coverageAuditText.split("\n").find((line) => line.startsWith(`| \`${route}\``));
  assert(row && row.includes("FOUNDATION_NOINDEX_ONLY"), `Blog/news foundation route must remain noindex-only in audit: ${route}`);
}

assert(
  /\| Source approved not implemented \| 0 \|/.test(coverageAuditText),
  "Stage 17 service-route coverage audit must show zero source-approved routes missing after Stage 17B/C."
);
assert(
  !/SOURCE_APPROVED_NOT_IMPLEMENTED/.test(coverageAuditText),
  "Stage 17 service-route coverage audit must not keep old missing-route status after Stage 17B/C."
);
assert(/routeClass:\s*page\.routeClass/.test(routesText), "Route manifest must expose routeClass from content model.");
assert(/relatedPaths:\s*page\.relatedHrefs/.test(routesText), "Route manifest must expose related route paths from content model.");
assert(/pageBlockModel:\s*page\.pageBlockModel/.test(routesText), "Route manifest must expose pageBlockModel from content model.");
assert(/faqTopics:\s*page\.faqTopics/.test(routesText), "Route manifest must expose faqTopics from content model.");
assert(/schemaBoundary:\s*page\.schemaBoundary/.test(routesText), "Route manifest must expose schemaBoundary from content model.");

const sitemapLocCount = (sitemapText.match(/<loc>/g) ?? []).length;
assert(sitemapLocCount === 36, `Sitemap must contain 36 indexed source-approved routes; found ${sitemapLocCount}.`);
assert(/Owner \/ Legal \/ Content QA/.test(ownerLegalQaText), "Stage 17F QA file must state owner/legal/content QA purpose.");
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(ownerLegalQaText), "Stage 17F QA file must keep public live false.");
assert(/Final owner\/legal approval[\s\S]*MISSING_EXPECTED|final owner\/legal approval:\s*`MISSING_EXPECTED`/i.test(ownerLegalQaText), "Stage 17F QA file must keep final owner/legal approval missing expected.");
assert(/Status:\s*`READY_FOR_OWNER_REVIEW`/.test(publicCopyChecklistText), "Stage 17F public-copy checklist must be ready for owner review only.");
assert(/Public launch:\s*`NOT_PUBLIC_LAUNCH_READY`/.test(publicCopyChecklistText), "Stage 17F public-copy checklist must not approve public launch.");

assert(/Status:\s*`READY_WITH_CONDITIONS`/.test(stage16YandexSemanticMapText), "Stage 16 Yandex semantic service map must be resolved and ready with conditions.");
assert(!/Status:\s*`MISSING_EXPECTED`/.test(stage16YandexSemanticMapText), "Stage 16 Yandex semantic service map must not remain a placeholder.");
for (const required of ["approved route map", "Service-To-Route Map", "Route-To-Intent Map", "Hub Vs Money-Page", "Diagnostics Boundaries", "Noindex Content Foundation", "Schema Boundary", "Route-Level HOLD Risks"]) {
  assert(stage16YandexSemanticMapText.toLowerCase().includes(required.toLowerCase()), `Stage 16 Yandex semantic service map must include section: ${required}`);
}
for (const route of stage17IndexedRoutes) {
  assert(stage16YandexSemanticMapText.includes(`| \`${route}\``), `Stage 16 Yandex semantic service map must include indexed route: ${route}`);
}
for (const route of ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/"]) {
  assert(stage16YandexSemanticMapText.includes(`| \`${route}\``), `Stage 16 Yandex semantic service map must include noindex foundation route: ${route}`);
}
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage16YandexSemanticMapText), "Stage 16 Yandex semantic service map must keep public live false.");

assert(/Status:\s*`READY_WITH_CONDITIONS`/.test(stage16SellingSeoArchitectureText), "Stage 16 selling SEO content architecture must be resolved and ready with conditions.");
assert(!/Status:\s*`MISSING_EXPECTED`/.test(stage16SellingSeoArchitectureText), "Stage 16 selling SEO content architecture must not remain a placeholder.");
for (const required of [
  "Purpose",
  "Source-Of-Truth Basis",
  "Canon Summary",
  "HOLD Summary",
  "Site Architecture Model",
  "User Journey Model",
  "Page Type Model",
  "Route Group Model",
  "SEO Architecture",
  "Yandex Semantic Architecture",
  "Selling Architecture",
  "Content Architecture",
  "Page-Block Architecture",
  "Lead Path Architecture",
  "Internal Linking And Anti-Cannibalization",
  "Metadata/H1/Description Rules",
  "FAQ And Schema Boundaries",
  "Mobile-First And Accessibility Requirements",
  "Source-To-Site Implementation Rules",
  "Evidence And QA Requirements",
  "Owner/Legal Review Boundaries",
  "Launch And Public-Live Boundaries",
  "Release Status"
]) {
  assert(stage16SellingSeoArchitectureText.includes(required), `Stage 16 selling SEO content architecture must include section: ${required}`);
}
for (const required of [
  "Homepage",
  "Situation review page",
  "Hub page",
  "Money page",
  "Diagnostic page",
  "Contacts page",
  "Policy page",
  "Noindex foundation page"
]) {
  assert(stage16SellingSeoArchitectureText.includes(required), `Stage 16 selling SEO content architecture must include page type: ${required}`);
}
for (const routeGroup of [
  "Core/local brand entry",
  "Situation review",
  "Urgent/tax questions",
  "Reporting/USN/zero reporting",
  "Bank/115",
  "Address/EGRUL/director",
  "Registration/liquidation",
  "Tax regimes/diagnostics",
  "HR",
  "Support",
  "Contacts",
  "Policy",
  "Blog/news noindex foundation"
]) {
  assert(stage16SellingSeoArchitectureText.includes(routeGroup), `Stage 16 selling SEO content architecture must include route group: ${routeGroup}`);
}
for (const phrase of [
  "one URL owns one main intent",
  "no pressure",
  "no fake urgency",
  "no guarantee",
  "no hidden SEO",
  "No new routes are approved",
  "No decision can be marked approved without explicit human-provided evidence",
  "HTTP/3 / QUIC over UDP/443 requires separate owner/ops approval and proof"
]) {
  assert(stage16SellingSeoArchitectureText.includes(phrase), `Stage 16 selling SEO content architecture must include safety phrase: ${phrase}`);
}
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage16SellingSeoArchitectureText), "Stage 16 selling SEO content architecture must keep public live false.");

assert(/Status:\s*`READY_WITH_CONDITIONS`/.test(stage16PageBlockBlueprintsText), "Stage 16 page block blueprints must be resolved and ready with conditions.");
assert(!/Status:\s*`MISSING_EXPECTED`/.test(stage16PageBlockBlueprintsText), "Stage 16 page block blueprints must not remain a placeholder.");
for (const required of ["Homepage Blueprint", "Situation Review Page Blueprint", "Hub Page Blueprint", "Money Page Blueprint", "Diagnostic Page Blueprint", "Contacts Page Blueprint", "Policy Page Blueprint", "Noindex Foundation Page Blueprint"]) {
  assert(stage16PageBlockBlueprintsText.includes(required), `Stage 16 page block blueprints must include page type: ${required}`);
}
for (const required of ["Hero", "Route intent clarification", "When this page fits", "What we check", "What documents/data may be needed", "How work starts", "What is not promised", "Related routes", "FAQ", "Local/NAP block", "Final safe CTA"]) {
  assert(stage16PageBlockBlueprintsText.includes(required), `Stage 16 page block blueprints must include block family: ${required}`);
}
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage16PageBlockBlueprintsText), "Stage 16 page block blueprints must keep public live false.");

assert(/Status:\s*`READY_WITH_CONDITIONS`/.test(stage16ClientNeedHooksText), "Stage 16 client need hooks and lead path must be resolved and ready with conditions.");
assert(!/Status:\s*`MISSING_EXPECTED`/.test(stage16ClientNeedHooksText), "Stage 16 client need hooks and lead path must not remain a placeholder.");
for (const hook of ["пришло требование", "банк запросил документы", "нужно понять, что подготовить", "нужно не ошибиться с маршрутом", "нужно собрать документы перед подачей", "нужно понять, подходит ли режим", "есть риск отказа, приостановки или недостоверности", "ситуация срочная, но нужен разбор документов", "нужно понять, с чего начать"]) {
  assert(stage16ClientNeedHooksText.includes(hook), `Stage 16 client need hooks must include safe hook: ${hook}`);
}
for (const required of ["Safe Hook Principles", "Forbidden Exaggeration", "Hook-To-Route Map", "Lead Path By Page Type", "CTA Safety Rules", "Owner/Legal Review Boundary", "Source-To-Site Sync Rule"]) {
  assert(stage16ClientNeedHooksText.includes(required), `Stage 16 client need hooks must include section: ${required}`);
}
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage16ClientNeedHooksText), "Stage 16 client need hooks and lead path must keep public live false.");

assert(/Status:\s*`READY_FOR_OWNER_REVIEW`/.test(stage17gSignoffPacketText), "Stage 17G owner/legal sign-off packet must be ready for owner review.");
for (const marker of [
  "OWNER_LEGAL_REVIEW_REQUIRED",
  "BACKEND_CRM_REVIEW_REQUIRED",
  "OPS_REVIEW_REQUIRED",
  "MISSING_EXPECTED",
  "BLOCKED",
  "NOT_PUBLIC_LIVE_READY"
]) {
  assert(stage17gSignoffPacketText.includes(marker), `Stage 17G owner/legal sign-off packet must include status marker: ${marker}`);
}
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17gSignoffPacketText), "Stage 17G owner/legal sign-off packet must keep public live false.");
assert(/Routes included:\s*36/.test(stage17gRouteDecisionLogText), "Stage 17G route decision log must state 36 included routes.");
assert(/Status:\s*`READY_FOR_OWNER_REVIEW`/.test(stage17gRouteDecisionLogText), "Stage 17G route decision log must be ready for owner review.");
assert(/Routes approved for public live:\s*0/.test(stage17gRouteDecisionLogText), "Stage 17G route decision log must approve zero routes for public live.");
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17gRouteDecisionLogText), "Stage 17G route decision log must keep public live false.");
assert(/Status:\s*`READY_WITH_CONDITIONS`/.test(stage17gGoNoGoChecklistText), "Stage 17G go/no-go checklist must be ready with conditions.");
assert(/Search Console\/Yandex Webmaster/.test(stage17gGoNoGoChecklistText), "Stage 17G go/no-go checklist must include Search Console/Yandex Webmaster gate.");
assert(/Transport protocol proof/.test(stage17gGoNoGoChecklistText), "Stage 17G go/no-go checklist must include transport protocol proof gate.");
assert(/MISSING_EXPECTED/.test(stage17gGoNoGoChecklistText), "Stage 17G go/no-go checklist must keep missing expected blockers.");
assert(/BLOCKED/.test(stage17gGoNoGoChecklistText), "Stage 17G go/no-go checklist must keep blockers.");
assert(/NOT_PUBLIC_LIVE_READY/.test(stage17gGoNoGoChecklistText), "Stage 17G go/no-go checklist must not approve public live.");
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17gGoNoGoChecklistText), "Stage 17G go/no-go checklist must keep public live false.");
assert(/Status:\s*`READY_FOR_OWNER_REVIEW`/.test(stage17gOwnerReviewIndexText), "Stage 17G owner review index must be ready for owner review.");
for (const rel of [
  "docs/owner-review/stage-17g-owner-legal-signoff-packet-v1.md",
  "docs/owner-review/stage-17g-route-decision-log-v1.md",
  "docs/owner-review/stage-17g-go-no-go-review-checklist-v1.md",
  "docs/owner-review/stage-17h-human-decision-intake-protocol-v1.md",
  "docs/launch/stage-17h-blocker-closure-roadmap-v1.md",
  "docs/strategy/stage-16-selling-seo-content-architecture-v1.md",
  "docs/qa/stage-17f-owner-legal-content-qa-v1.md",
  "docs/qa/stage-17f-public-copy-review-checklist-v1.md"
]) {
  assert(stage17gOwnerReviewIndexText.includes(rel), `Stage 17G owner review index must link review artifact: ${rel}`);
}
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17gOwnerReviewIndexText), "Stage 17G owner review index must keep public live false.");

assert(/Status:\s*`READY_FOR_OWNER_REVIEW`/.test(stage17hDecisionIntakeText), "Stage 17H human decision intake protocol must be ready for owner review.");
for (const status of ["PENDING_HUMAN_REVIEW", "APPROVED_BY_OWNER", "APPROVED_BY_LEGAL", "APPROVED_WITH_NOTES", "REJECTED", "NEEDS_REVISION", "SOURCE_CLARIFICATION_REQUIRED", "BACKEND_CRM_REVIEW_REQUIRED", "OPS_REVIEW_REQUIRED", "NOT_PUBLIC_LIVE_READY"]) {
  assert(stage17hDecisionIntakeText.includes(status), `Stage 17H decision intake protocol must include allowed status: ${status}`);
}
for (const phrase of ["no decision can be recorded as approved", "public live cannot become true from route approval alone", "Owner approval does not replace legal/backend/ops proof", "Legal approval does not enable CRM/forms/analytics automatically", "Staging proof does not enable public live automatically"]) {
  assert(stage17hDecisionIntakeText.toLowerCase().includes(phrase.toLowerCase()), `Stage 17H decision intake protocol must include fake-approval guardrail: ${phrase}`);
}
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17hDecisionIntakeText), "Stage 17H decision intake protocol must keep public live false.");

assert(/Status:\s*`READY_WITH_CONDITIONS`/.test(stage17hBlockerRoadmapText), "Stage 17H blocker closure roadmap must be ready with conditions.");
for (const blocker of ["Owner/legal route approval", "`/policy` final acceptance", "CRM/forms decision", "Analytics/Metrica/no-PII proof", "Search Console/Yandex Webmaster setup", "Staging deploy proof", "Rollback proof", "Transport network proof", "FNS/blog/news live fetch/autopublish/indexing", "Public live go/no-go"]) {
  assert(stage17hBlockerRoadmapText.includes(blocker), `Stage 17H blocker closure roadmap must include blocker: ${blocker}`);
}
assert(/NOT_PUBLIC_LIVE_READY/.test(stage17hBlockerRoadmapText), "Stage 17H blocker closure roadmap must keep public live not ready.");
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17hBlockerRoadmapText), "Stage 17H blocker closure roadmap must keep public live false.");

assert(/Status:\s*`READY_WITH_CONDITIONS`/.test(stage17iCommitReadinessText), "Stage 17I commit readiness audit must be ready with conditions.");
assert(/READY_WITH_CONDITIONS_FOR_REVIEW/.test(stage17iCommitReadinessText), "Stage 17I commit readiness audit must keep review-only commit readiness verdict.");
for (const phrase of ["No staging, commit, push, merge, deploy or DNS action was performed", "do not include secrets", "public live: `NOT_PUBLIC_LIVE_READY`"]) {
  assert(stage17iCommitReadinessText.includes(phrase), `Stage 17I commit readiness audit must include safety phrase: ${phrase}`);
}
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17iCommitReadinessText), "Stage 17I commit readiness audit must keep public live false.");

assert(/Status:\s*`READY_WITH_CONDITIONS`/.test(stage17jWorktreeIntegrationText), "Stage 17J worktree integration report must be ready with conditions.");
for (const phrase of [
  "SAFE_AFTER_CHECKS_PASS",
  "Push status: `BLOCKED`",
  "No human approval is recorded",
  "stage17/source-site-owner-review-readiness",
  "docs/launch/stage-17i-commit-readiness-worktree-audit-v1.md",
  "No push, merge, deploy, DNS, staging, public live or fake approval action is allowed in Stage 17J"
]) {
  assert(stage17jWorktreeIntegrationText.includes(phrase), `Stage 17J worktree integration report must include safety phrase: ${phrase}`);
}
assert(/UNKNOWN_NEEDS_REVIEW`\s*\|\s*0/.test(stage17jWorktreeIntegrationText), "Stage 17J worktree integration report must record zero unknown files.");
assert(/RISKY_DO_NOT_STAGE`\s*\|\s*0/.test(stage17jWorktreeIntegrationText), "Stage 17J worktree integration report must record zero risky files.");
assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17jWorktreeIntegrationText), "Stage 17J worktree integration report must keep public live false.");

if (issues.length > 0) {
  console.error("Stage 16 source-to-site guardrail check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`PASS Stage 16/17 source-to-site guardrails: ${requiredDocs.length} synced/audit/review docs present, Stage 16 source gaps resolved, unsafe flags closed, sitemap/noindex safe, Stage 17D/E route hardening, Stage 17F QA, Stage 17G owner review packet and Stage 17H/17I/17J controls audited, public live false, transport gate closed.`);
