#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const codeRoot = process.cwd();
const standaloneSiteRepo = fs.existsSync(path.join(codeRoot, ".git"));
const repoRoot = standaloneSiteRepo ? codeRoot : path.resolve(codeRoot, "..");
const codeRelPrefix = standaloneSiteRepo ? "" : "code/";
const codeRel = (rel) => `${codeRelPrefix}${rel}`;

const requiredDocs = standaloneSiteRepo
  ? [
      "LOCAL_P0_BUILD.md",
      "CANONICAL_INTEGRATION_REPORT.md",
      "BROWSER_ACCESSIBILITY_EVIDENCE_REPORT.md",
      "STAGING_HOSTING_ROLLBACK_REPORT.md",
      "REMOTE_SYNC_RESULT.md",
      "REMOTE_SYNC_RESULT.json",
      codeRel("evidence/owner-legal-privacy/review-pack-index.md"),
      codeRel("evidence/staging-hosting-rollback/final/production-readiness-gap.md"),
      codeRel("evidence/owner-go-no-go/remote-sync-plan.md"),
      "docs/qa/stage-17f-owner-legal-content-qa-v1.md",
      "docs/qa/stage-17f-public-copy-review-checklist-v1.md",
      "docs/seo/stage-16-yandex-semantic-service-map-v1.md",
      "docs/strategy/stage-16-selling-seo-content-architecture-v1.md",
      "docs/content/stage-16-page-block-blueprints-v1.md",
      "docs/content/stage-16-client-need-hooks-and-lead-path-v1.md",
      "docs/owner-review/stage-17g-owner-legal-signoff-packet-v1.md",
      "docs/owner-review/stage-17g-route-decision-log-v1.md",
      "docs/owner-review/stage-17g-go-no-go-review-checklist-v1.md",
      "docs/owner-review/stage-17g-owner-review-index-v1.md",
      "docs/owner-review/stage-17h-human-decision-intake-protocol-v1.md",
      "docs/launch/stage-17h-blocker-closure-roadmap-v1.md",
      "docs/launch/stage-17i-commit-readiness-worktree-audit-v1.md",
      "docs/launch/stage-17j-worktree-integration-and-local-commit-readiness-v1.md"
    ]
  : [
      "docs/operations/project-finalization-readiness-v1.md",
      "docs/operations/launch-finalization-roadmap-v1.md",
      "docs/operations/live-launch-gates-v1.md",
      "docs/qa/browser-evidence-requirements-v1.md",
      "docs/qa/accessibility-finalization-checklist-v1.md",
      "docs/crm-analytics/sales-channel-readiness-v1.md"
    ];

const finalizationEvidence = [
  codeRel("evidence/finalization/summary.md"),
  codeRel("evidence/finalization/launch-readiness-proof.json")
];

const p0EvidenceFiles = [
  codeRel("evidence/p0/summary.md"),
  codeRel("evidence/p0/route-manifest-proof.json"),
  codeRel("evidence/p0/sitemap-proof.json"),
  codeRel("evidence/p0/rendered-route-proof.json"),
  codeRel("evidence/p0/metadata-proof.json"),
  codeRel("evidence/p0/collector-proof.json"),
  codeRel("evidence/p0/feature-flags-proof.json"),
  codeRel("evidence/p0/safety-guard-proof.json")
];

const requiredPackageScripts = [
  "check:p0-semantic",
  "evidence:p0",
  "check:p0-evidence",
  "check:fns-blog-news",
  "check:p0-full",
  "check:launch-readiness",
  "check:finalization",
  "evidence:browser",
  "check:browser-evidence",
  "evidence:accessibility",
  "check:accessibility-evidence",
  "check:local-p0-browser"
];

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

const finalizationDocs = standaloneSiteRepo
  ? [
      "LOCAL_P0_BUILD.md",
      "CANONICAL_INTEGRATION_REPORT.md",
      "BROWSER_ACCESSIBILITY_EVIDENCE_REPORT.md",
      "STAGING_HOSTING_ROLLBACK_REPORT.md",
      codeRel("evidence/finalization/summary.md"),
      codeRel("evidence/owner-legal-privacy/public-launch-blockers.md"),
      codeRel("evidence/staging-hosting-rollback/final/production-readiness-gap.md")
    ]
  : [
      "docs/operations/project-finalization-readiness-v1.md",
      "docs/operations/live-launch-gates-v1.md",
      "docs/crm-analytics/sales-channel-readiness-v1.md",
      codeRel("evidence/finalization/summary.md")
    ];

const issues = [];
const operationalBlockers = [
  "staging deploy proof missing expected",
  "rollback proof missing expected",
  "owner/legal acceptance missing expected",
  "CRM/forms/analytics acceptance missing expected",
  "no-PII analytics payload proof missing expected",
  "Search Console/Yandex Webmaster setup missing expected",
  "PR #49 merged foundation-only; FNS live fetch, scheduler, rewrite provider, autopublish and indexing remain blocked"
];

function repoPath(rel) {
  return path.join(repoRoot, rel);
}

function exists(rel) {
  return fs.existsSync(repoPath(rel));
}

function read(rel) {
  return exists(rel) ? fs.readFileSync(repoPath(rel), "utf8") : "";
}

function hasPassedStatus(rel) {
  if (!exists(rel)) return false;
  try {
    return JSON.parse(read(rel)).status === "passed";
  } catch {
    return false;
  }
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === ".next" || entry.name === "out") {
      return [];
    }

    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full);
    return full;
  });
}

function assert(condition, message) {
  if (!condition) issues.push(message);
}

for (const rel of [...requiredDocs, ...finalizationEvidence, ...p0EvidenceFiles]) {
  assert(exists(rel), `Missing required file: ${rel}`);
}

const packageJson = JSON.parse(read(codeRel("package.json")) || "{}");
for (const scriptName of requiredPackageScripts) {
  assert(Boolean(packageJson.scripts?.[scriptName]), `Missing package script: ${scriptName}`);
}

const secretFiles = listFiles(repoRoot).filter((file) => {
  const base = path.basename(file);
  return base === ".env" || /\.(pem|key)$/i.test(base);
});
assert(secretFiles.length === 0, `Secret-like files found: ${secretFiles.map((file) => path.relative(repoRoot, file)).join(", ")}`);

const appCodeFiles = [
  ...listFiles(path.join(codeRoot, "app")),
  ...listFiles(path.join(codeRoot, "components")),
  ...listFiles(path.join(codeRoot, "lib"))
].filter((file) => {
  const relFromCode = path.relative(codeRoot, file);
  return /\.(ts|tsx|js|jsx|mjs)$/i.test(file) && !relFromCode.startsWith(`lib${path.sep}pricing${path.sep}`);
});

const forbiddenPublicPhrases =
  /официальный центр|при налоговой|партн[её]р ФНС|центр ФНС|официальный представитель|100% результат|гарантируем|без отказа|срочно за 1 день/i;
const secretLike = /OPENAI_API_KEY|sk-[A-Za-z0-9]|token=|secret=|webhook/i;
const uploadInput = /<input\b[^>]*\btype=["']file["']|type:\s*["']file["']/i;
const telegramMaxDeepLink = /t\.me\/|telegram\.me\/|max:\/\//i;

for (const file of appCodeFiles) {
  const text = fs.readFileSync(file, "utf8");
  const rel = path.relative(repoRoot, file);

  assert(!forbiddenPublicPhrases.test(text), `Forbidden public phrase found in app code: ${rel}`);
  assert(!secretLike.test(text), `Secret-like text found in app code: ${rel}`);
  assert(!uploadInput.test(text), `Public upload input found in app code: ${rel}`);
  assert(!telegramMaxDeepLink.test(text), `Final Telegram/MAX deep link found in app code: ${rel}`);
}

const flagsText = read(codeRel("lib/feature-flags.ts"));
for (const flag of unsafeFeatureFlags) {
  assert(new RegExp(`${flag}:\\s*false`).test(flagsText), `Unsafe feature flag must remain false: ${flag}`);
}

const combinedFinalizationText = finalizationDocs.map(read).join("\n");
const stage17fQaText = read("docs/qa/stage-17f-owner-legal-content-qa-v1.md");
const stage17fCopyText = read("docs/qa/stage-17f-public-copy-review-checklist-v1.md");
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
assert(
  /Public launch(?: verdict)?:\s*`NOT_PUBLIC_LAUNCH_READY`/.test(combinedFinalizationText),
  "Public launch verdict must remain NOT_PUBLIC_LAUNCH_READY."
);
assert(
  /PUBLIC_LIVE_ALLOWED\s*=\s*false|Public live:\s*`false`/.test(combinedFinalizationText),
  "PUBLIC_LIVE_ALLOWED must remain false."
);
assert(
  /Paid traffic(?: verdict)?:\s*`BLOCKS_PAID_TRAFFIC`/.test(combinedFinalizationText),
  "Paid traffic verdict must remain BLOCKS_PAID_TRAFFIC."
);
assert(
  /FNS autopublish(?: verdict)?:\s*`BLOCKED_UNTIL_SERVER_LEGAL_OWNER_ACCEPTANCE`/.test(combinedFinalizationText),
  "FNS autopublish verdict must remain blocked."
);
assert(
  /Status:\s*`READY_WITH_CONDITIONS`/.test(stage17fQaText) && /OWNER_LEGAL_REVIEW_REQUIRED/.test(stage17fQaText),
  "Stage 17F owner/legal/content QA must be ready with conditions and owner/legal-gated."
);
assert(
  /Status:\s*`READY_FOR_OWNER_REVIEW`/.test(stage17fCopyText) && /NOT_READY_FOR_PUBLIC_LIVE/.test(stage17fCopyText),
  "Stage 17F public copy checklist must be ready for owner review only and not public-live ready."
);
assert(
  /Status:\s*`READY_WITH_CONDITIONS`/.test(stage16YandexSemanticMapText) &&
    !/Status:\s*`MISSING_EXPECTED`/.test(stage16YandexSemanticMapText) &&
    /Approved Route Map/.test(stage16YandexSemanticMapText) &&
    /Route-Level HOLD Risks/.test(stage16YandexSemanticMapText) &&
    /PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage16YandexSemanticMapText),
  "Stage 16 Yandex semantic service map must be resolved, route-backed and public-live gated."
);
assert(
  /Status:\s*`READY_WITH_CONDITIONS`/.test(stage16SellingSeoArchitectureText) &&
    !/Status:\s*`MISSING_EXPECTED`/.test(stage16SellingSeoArchitectureText) &&
    /Site Architecture Model/.test(stage16SellingSeoArchitectureText) &&
    /User Journey Model/.test(stage16SellingSeoArchitectureText) &&
    /Page Type Model/.test(stage16SellingSeoArchitectureText) &&
    /Route Group Model/.test(stage16SellingSeoArchitectureText) &&
    /SEO Architecture/.test(stage16SellingSeoArchitectureText) &&
    /Selling Architecture/.test(stage16SellingSeoArchitectureText) &&
    /Source-To-Site Implementation Rules/.test(stage16SellingSeoArchitectureText) &&
    /Launch And Public-Live Boundaries/.test(stage16SellingSeoArchitectureText) &&
    /PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage16SellingSeoArchitectureText),
  "Stage 16 selling SEO content architecture must be resolved, source-backed and public-live gated."
);
assert(
  /Status:\s*`READY_WITH_CONDITIONS`/.test(stage16PageBlockBlueprintsText) &&
    !/Status:\s*`MISSING_EXPECTED`/.test(stage16PageBlockBlueprintsText) &&
    /Money Page Blueprint/.test(stage16PageBlockBlueprintsText) &&
    /Noindex Foundation Page Blueprint/.test(stage16PageBlockBlueprintsText) &&
    /PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage16PageBlockBlueprintsText),
  "Stage 16 page block blueprints must be resolved and public-live gated."
);
assert(
  /Status:\s*`READY_WITH_CONDITIONS`/.test(stage16ClientNeedHooksText) &&
    !/Status:\s*`MISSING_EXPECTED`/.test(stage16ClientNeedHooksText) &&
    /Hook-To-Route Map/.test(stage16ClientNeedHooksText) &&
    /Owner\/Legal Review Boundary/.test(stage16ClientNeedHooksText) &&
    /PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage16ClientNeedHooksText),
  "Stage 16 client need hooks and lead path must be resolved and public-live gated."
);
assert(
  /Status:\s*`READY_FOR_OWNER_REVIEW`/.test(stage17gSignoffPacketText) &&
    /OWNER_LEGAL_REVIEW_REQUIRED/.test(stage17gSignoffPacketText) &&
    /BACKEND_CRM_REVIEW_REQUIRED/.test(stage17gSignoffPacketText) &&
    /OPS_REVIEW_REQUIRED/.test(stage17gSignoffPacketText) &&
    /PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17gSignoffPacketText),
  "Stage 17G owner/legal sign-off packet must be ready for owner review while keeping owner/legal, CRM and ops gates closed."
);
assert(
  /Routes included:\s*36/.test(stage17gRouteDecisionLogText) &&
    /Routes approved for public live:\s*0/.test(stage17gRouteDecisionLogText) &&
    /OWNER_LEGAL_REVIEW_REQUIRED/.test(stage17gRouteDecisionLogText) &&
    /BACKEND_CRM_REVIEW_REQUIRED/.test(stage17gRouteDecisionLogText) &&
    /NOT_PUBLIC_LIVE_READY/.test(stage17gRouteDecisionLogText),
  "Stage 17G route decision log must include all 36 routes and approve zero routes for public live."
);
assert(
  /Status:\s*`READY_WITH_CONDITIONS`/.test(stage17gGoNoGoChecklistText) &&
    /Search Console\/Yandex Webmaster/.test(stage17gGoNoGoChecklistText) &&
    /Transport protocol proof/.test(stage17gGoNoGoChecklistText) &&
    /MISSING_EXPECTED/.test(stage17gGoNoGoChecklistText) &&
    /BLOCKED/.test(stage17gGoNoGoChecklistText) &&
    /NOT_PUBLIC_LIVE_READY/.test(stage17gGoNoGoChecklistText),
  "Stage 17G go/no-go checklist must keep missing expected blockers and not-public-live status."
);
assert(
  /Status:\s*`READY_FOR_OWNER_REVIEW`/.test(stage17gOwnerReviewIndexText) &&
    /stage-17g-route-decision-log-v1\.md/.test(stage17gOwnerReviewIndexText) &&
    /stage-17g-go-no-go-review-checklist-v1\.md/.test(stage17gOwnerReviewIndexText) &&
    /stage-17f-owner-legal-content-qa-v1\.md/.test(stage17gOwnerReviewIndexText) &&
    /stage-17h-human-decision-intake-protocol-v1\.md/.test(stage17gOwnerReviewIndexText) &&
    /PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17gOwnerReviewIndexText),
  "Stage 17G owner review index must point to the route log, go/no-go checklist, Stage 17F QA and Stage 17H intake protocol while keeping public live false."
);
assert(
  /Status:\s*`READY_FOR_OWNER_REVIEW`/.test(stage17hDecisionIntakeText) &&
    /No decision can be recorded as approved without explicit human-provided evidence/.test(stage17hDecisionIntakeText) &&
    /public live cannot become true from route approval alone/i.test(stage17hDecisionIntakeText) &&
    /PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17hDecisionIntakeText),
  "Stage 17H human decision intake protocol must prevent fake approvals and keep public live false."
);
assert(
  /Status:\s*`READY_WITH_CONDITIONS`/.test(stage17hBlockerRoadmapText) &&
    /Owner\/legal route approval/.test(stage17hBlockerRoadmapText) &&
    /Transport network proof/.test(stage17hBlockerRoadmapText) &&
    /Public live go\/no-go/.test(stage17hBlockerRoadmapText) &&
    /NOT_PUBLIC_LIVE_READY/.test(stage17hBlockerRoadmapText) &&
    /PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17hBlockerRoadmapText),
  "Stage 17H blocker closure roadmap must list remaining blockers without approving public live."
);
assert(
  /Status:\s*`READY_WITH_CONDITIONS`/.test(stage17iCommitReadinessText) &&
    /READY_WITH_CONDITIONS_FOR_REVIEW/.test(stage17iCommitReadinessText) &&
    /No staging, commit, push, merge, deploy or DNS action was performed/.test(stage17iCommitReadinessText) &&
    /PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17iCommitReadinessText),
  "Stage 17I commit readiness audit must be review-only and public-live gated."
);
assert(
  /Status:\s*`READY_WITH_CONDITIONS`/.test(stage17jWorktreeIntegrationText) &&
    /SAFE_AFTER_CHECKS_PASS/.test(stage17jWorktreeIntegrationText) &&
    /Push status:\s*`BLOCKED`/.test(stage17jWorktreeIntegrationText) &&
    /No human approval is recorded/.test(stage17jWorktreeIntegrationText) &&
    /stage17\/source-site-owner-review-readiness/.test(stage17jWorktreeIntegrationText) &&
    /PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(stage17jWorktreeIntegrationText),
  "Stage 17J worktree integration report must keep local commits check-gated, push blocked and public live false."
);

const blogNewsConfigPresent = exists(codeRel("lib/blog-news.ts"));
assert(blogNewsConfigPresent, "Blog/news foundation config must exist after PR #49 merge.");

const blogNewsText = read(codeRel("lib/blog-news.ts"));
const routesText = read(codeRel("lib/routes.ts"));

const blogFlags = [
  "blogNewsEnabled",
  "fnsMonitoringEnabled",
  "liveFetchEnabled",
  "autoDraftEnabled",
  "autoRewriteEnabled",
  "autoValidationEnabled",
  "autoPublicationEnabled",
  "blogNewsIndexingEnabled",
  "newsSitemapEnabled",
  "fnsImagesEnabled",
  "serverSchedulerEnabled",
  "rollbackEnabled",
  "analyticsEnabled"
];

for (const flag of blogFlags) {
  assert(new RegExp(`${flag}:\\s*false`).test(blogNewsText), `Blog/news flag must remain false: ${flag}`);
}

for (const route of ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/"]) {
  const routeBlock = routesText.match(new RegExp(`path:\\s*"${route.replace(/\//g, "\\/")}"[\\s\\S]*?(?=\\n\\s*}\\n|\\n\\s*},)`))?.[0] ?? "";
  assert(routeBlock.includes('includeInSitemap: false'), `Blog/news route must be excluded from sitemap: ${route}`);
  assert(routeBlock.includes('indexing: "noindex"'), `Blog/news route must remain noindex: ${route}`);
}

const browserEvidencePassed = [
  codeRel("evidence/browser/browser-route-proof.json"),
  codeRel("evidence/rendered/rendered-dom-proof.json"),
  codeRel("evidence/forms/form-placeholder-proof.json"),
  codeRel("evidence/final-local/safety-proof.json")
].every(hasPassedStatus);
const accessibilityEvidencePassed = hasPassedStatus(codeRel("evidence/accessibility/accessibility-proof.json"));
const browserSmokePassed = hasPassedStatus(codeRel("evidence/browser/playwright-smoke-proof.json"));

const blockers = [
  ...(browserEvidencePassed ? [] : ["browser evidence missing expected"]),
  ...(accessibilityEvidencePassed ? [] : ["accessibility evidence missing expected"]),
  ...(browserSmokePassed ? [] : ["Browser/Playwright smoke missing expected"]),
  ...operationalBlockers
];

if (issues.length > 0) {
  console.error("Launch finalization readiness check failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("PASS launch finalization readiness: foundation consistent; Stage 16 source gaps resolved; Stage 17G/17H/17I/17J owner review and local commit controls are gated; public LIVE, paid traffic and FNS autopublish remain blocked.");
console.log("Remaining blockers:");
for (const blocker of blockers) {
  console.log(`- ${blocker}`);
}

console.log("Blog/news dependency: PR_49_MERGED_FOUNDATION_ONLY.");
