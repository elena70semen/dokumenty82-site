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
      codeRel("evidence/owner-go-no-go/remote-sync-plan.md")
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
assert(/publicLiveAllowed:\s*true/.test(flagsText), "Public live flag must be enabled for the production domain.");
assert(/metricaEnabled:\s*true/.test(flagsText), "Yandex Metrica must be enabled for the production domain.");
for (const flag of unsafeFeatureFlags) {
  assert(new RegExp(`${flag}:\\s*false`).test(flagsText), `Unsafe feature flag must remain false: ${flag}`);
}

const combinedFinalizationText = finalizationDocs.map(read).join("\n");
assert(
  /Paid traffic(?: verdict)?:\s*`BLOCKS_PAID_TRAFFIC`/.test(combinedFinalizationText),
  "Paid traffic verdict must remain BLOCKS_PAID_TRAFFIC."
);
assert(
  /FNS autopublish(?: verdict)?:\s*`BLOCKED_UNTIL_SERVER_LEGAL_OWNER_ACCEPTANCE`/.test(combinedFinalizationText),
  "FNS autopublish verdict must remain blocked."
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

console.log("PASS launch finalization readiness: foundation consistent; public site and Metrica are live, while paid traffic and FNS autopublish remain blocked.");
console.log("Remaining blockers:");
for (const blocker of blockers) {
  console.log(`- ${blocker}`);
}

console.log("Blog/news dependency: PR_49_MERGED_FOUNDATION_ONLY.");
