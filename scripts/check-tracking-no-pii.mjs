#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { evidenceDir, listFiles, outDir, read, root, writeJson } from "./evidence-utils.mjs";

const APPROVED_METRIKA_ID = "109869928";
const proofFile = path.join(evidenceDir, "finalization", "tracking-no-pii-proof.json");
const issues = [];

const requiredGoals = [
  "goal_call_click",
  "goal_route_click",
  "goal_contacts_click",
  "goal_razbor_situacii_click",
  "goal_docs_show_click",
  "goal_service_card_click",
  "goal_fallback_contact_click",
  "goal_form_start",
  "goal_form_submit_attempt",
  "goal_form_submit_success",
  "goal_form_submit_fail",
  "goal_related_route_click"
];

const forbiddenPayloadKeys = [
  "name",
  "phone",
  "email",
  "message",
  "comment",
  "passport",
  "uploaded_file",
  "document_file",
  "file",
  "inn",
  "ogrn",
  "kpp",
  "client_id"
];

function rel(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function exists(file) {
  return fs.existsSync(file);
}

function fail(message) {
  issues.push(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function readRel(file) {
  return read(path.join(root, file));
}

function textFilesUnder(...dirs) {
  return dirs
    .flatMap((dir) => listFiles(path.join(root, dir), { skip: new Set([".git", ".next", "node_modules"]) }))
    .filter((file) => /\.(ts|tsx|js|jsx|mjs|html|json|txt|xml)$/i.test(file));
}

function scan(files, scans) {
  const matches = [];
  for (const file of files) {
    const text = read(file);
    for (const item of scans) {
      if (item.pattern.test(text)) matches.push({ label: item.label, file: rel(file) });
    }
  }
  return matches;
}

const featureFlagsText = readRel("lib/feature-flags.ts");
const analyticsConfigText = readRel("lib/integrations/analytics-config.ts");
const analyticsEventsText = readRel("lib/integrations/analytics-events.ts");
const sourceCaptureText = readRel("lib/integrations/source-capture.ts");
const sourceCaptureComponentText = readRel("components/analytics/SourceCapture.tsx");
const metrikaComponentText = readRel("components/analytics/YandexMetrika.tsx");
const layoutText = readRel("app/layout.tsx");
const packageText = readRel("package.json");

for (const [flag, expected] of Object.entries({
  formsLive: false,
  crmEnabled: false,
  crmSuccessEnabled: false,
  paidTrafficAllowed: false,
  analyticsEnabled: true,
  metricaEnabled: true,
  maxEnabled: false,
  telegramEnabled: false,
  messagingRevealEnabled: false,
  mapEnabled: false,
  cookieNoticeEnabled: false
})) {
  assert(new RegExp(`${flag}:\\s*${expected}`).test(featureFlagsText), `feature flag mismatch: ${flag} must be ${expected}`);
}

assert(analyticsConfigText.includes(`YANDEX_METRIKA_ID = "${APPROVED_METRIKA_ID}"`), "analytics config must use approved Yandex Metrika counter 109869928.");
assert(/enabled:\s*true/.test(analyticsConfigText), "analytics config must be enabled for approved production counter.");
assert(/mode:\s*"production"/.test(analyticsConfigText), 'analytics config must use mode: "production".');
assert(/canLoadScript:\s*true/.test(analyticsConfigText), "analytics config must allow Metrika script loading.");
assert(/canSendEvents:\s*true/.test(analyticsConfigText), "analytics config must allow safe reachGoal events.");
assert(/webvisor:\s*false/.test(analyticsConfigText), "Webvisor must remain disabled.");
assert(/ecommerce:\s*false/.test(analyticsConfigText), "Ecommerce/dataLayer must remain disabled.");

assert(/mc\.yandex\.ru\/metrika\/tag\.js/.test(metrikaComponentText), "YandexMetrika component must load mc.yandex.ru tag.js.");
assert(new RegExp(`ym\\(\\$\\{counterId\\}, 'init'`).test(metrikaComponentText), "YandexMetrika component must call ym(counterId, 'init', ...).");
assert(new RegExp(`watch/\\$\\{counterId\\}`).test(metrikaComponentText), "YandexMetrika component must include noscript watch URL.");
assert(/<YandexMetrika \/>/.test(layoutText), "Root layout must render YandexMetrika.");

for (const goal of requiredGoals) {
  assert(analyticsEventsText.includes(goal), `analytics goal missing: ${goal}`);
}

assert(/metrikaReachGoal\(Number\(analyticsConfig\.yandexMetrikaId\), "reachGoal", goal, event\.params\)/.test(analyticsEventsText), "reachGoal bridge must send only sanitized event params.");
assert(/backend_acceptance_required/.test(analyticsEventsText), "goal_form_submit_success must remain gated by backend/CRM acceptance.");
assert(/metrika_not_ready/.test(analyticsEventsText), "reachGoal bridge must fail closed when Metrika is not ready.");

for (const key of [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "yclid",
  "page_slug",
  "page_type",
  "cta_label",
  "cta_location",
  "lead_topic",
  "collector_type",
  "related_href"
]) {
  assert(sourceCaptureText.includes(`"${key}"`), `safe source context key missing: ${key}`);
}

for (const key of forbiddenPayloadKeys) {
  assert(!new RegExp(`["']${key}["']`).test(sourceCaptureText), `PII/private key must not be allowlisted in source capture: ${key}`);
}

assert(/sessionStorage/.test(sourceCaptureText), "UTM/source context must be preserved in sessionStorage.");
assert(/captureSourceFromLocation/.test(sourceCaptureComponentText), "SourceCapture must collect URL attribution.");
assert(/trackAnalyticsGoal/.test(sourceCaptureComponentText), "SourceCapture must dispatch safe CTA goals.");

const runtimeFiles = textFilesUnder("app", "components", "lib", "public");
const uiFiles = runtimeFiles.filter((file) => {
  const relative = rel(file);
  return relative.startsWith("app/") || relative.startsWith("components/");
});

const runtimeMatches = scan(runtimeFiles, [
  { label: "unapproved Metrika counter", pattern: new RegExp(`ym\\(\\s*(?!${APPROVED_METRIKA_ID}\\b)[1-9]\\d{5,}|counterId\\s*[:=]\\s*(?!["']?${APPROVED_METRIKA_ID}\\b)[1-9]\\d{5,}`) },
  { label: "Google analytics", pattern: /\bgtag\s*\(|googletagmanager|GoogleAnalytics|\bG-[A-Z0-9]{6,}\b|\bUA-\d+-\d+\b/i },
  { label: "CRM webhook", pattern: /https?:\/\/[^\s"'`]*(?:crm|bitrix|amocrm|webhook)|CRM_WEBHOOK_URL\s*[:=]\s*https?:\/\//i },
  { label: "public upload", pattern: /<input\b[^>]*type=["']file|type:\s*["']file|PUBLIC_UPLOADS_ENABLED\s*=\s*true/i },
  { label: "messaging deep link", pattern: /t\.me\/|telegram\.me\/|max:\/\/|wa\.me\/|whatsapp/i },
  { label: "paid traffic enabled", pattern: /paidTrafficAllowed:\s*true|PUBLIC_LIVE_ALLOWED\s*=\s*true/i },
  { label: "Webvisor/session replay/ecommerce enabled", pattern: /webvisor\s*:\s*true|session\s*replay|sessionReplay|ecommerce\s*:\s*(?:true|["']dataLayer["'])/i }
]);

for (const match of runtimeMatches) {
  fail(`${match.label} matched in ${match.file}`);
}

for (const file of uiFiles) {
  const text = read(file);
  if (/data-analytics-goal=\{?analyticsGoalNames\.formSubmitSuccess|data-analytics-goal=["']goal_form_submit_success["']/.test(text)) {
    fail(`goal_form_submit_success must not be attached to UI interactions: ${rel(file)}`);
  }

  for (const key of forbiddenPayloadKeys) {
    const dataAttr = `data-${key.replaceAll("_", "-")}`;
    if (new RegExp(`${dataAttr}=`, "i").test(text)) {
      fail(`PII/private data attribute must not feed analytics: ${dataAttr} in ${rel(file)}`);
    }
  }
}

assert(packageText.includes('"check:tracking-no-pii": "node scripts/check-tracking-no-pii.mjs"'), "package.json must expose check:tracking-no-pii.");
assert(packageText.includes("npm run check:tracking-no-pii"), "check:finalization must include check:tracking-no-pii.");

const outExists = exists(outDir);
const builtHtmlFiles = outExists
  ? listFiles(outDir, { skip: new Set([]) }).filter((file) => /\.(html|js|txt|xml)$/i.test(file))
  : [];
const builtText = builtHtmlFiles.map((file) => read(file)).join("\n");
const buildOutput = {
  checked: outExists,
  htmlAndJsFilesChecked: builtHtmlFiles.length,
  hasApprovedCounter: new RegExp(APPROVED_METRIKA_ID).test(builtText),
  hasMetrikaHost: /mc\.yandex\.ru/.test(builtText),
  hasInit: new RegExp(`ym\\(${APPROVED_METRIKA_ID},\\s*['"]init['"]`).test(builtText),
  hasWatch: new RegExp(`watch/${APPROVED_METRIKA_ID}`).test(builtText),
  hasFaviconSvg: /\/favicon\.svg/.test(builtText),
  noWebvisorTrue: !/webvisor["']?\s*:\s*true/i.test(builtText),
  noEcommerceDataLayer: !/ecommerce["']?\s*:\s*["']dataLayer["']/i.test(builtText),
  noUnapprovedYmId: !new RegExp(`ym\\((?!${APPROVED_METRIKA_ID}\\b)[1-9]\\d{5,}`).test(builtText),
  noFormSuccessGoalInUi: !/data-analytics-goal=["']goal_form_submit_success["']/.test(builtText)
};

if (outExists) {
  assert(buildOutput.hasApprovedCounter, "build output must include approved Metrika counter 109869928.");
  assert(buildOutput.hasMetrikaHost, "build output must include mc.yandex.ru.");
  assert(buildOutput.hasInit, "build output must include ym(109869928, 'init', ...).");
  assert(buildOutput.hasWatch, "build output must include noscript /watch/109869928.");
  assert(buildOutput.hasFaviconSvg, "build output must reference /favicon.svg.");
  assert(buildOutput.noWebvisorTrue, "build output must not enable Webvisor.");
  assert(buildOutput.noEcommerceDataLayer, "build output must not enable ecommerce/dataLayer.");
  assert(buildOutput.noUnapprovedYmId, "build output must not include an unapproved Metrika counter.");
  assert(buildOutput.noFormSuccessGoalInUi, "build output must not attach submit-success goal to UI.");
}

const proof = {
  status: issues.length === 0 ? "passed" : "failed",
  generatedAt: new Date().toISOString(),
  approvedMetrikaId: APPROVED_METRIKA_ID,
  featureFlags: {
    formsLive: false,
    crmEnabled: false,
    crmSuccessEnabled: false,
    paidTrafficAllowed: false,
    analyticsEnabled: true,
    metricaEnabled: true
  },
  goals: requiredGoals,
  piiPayloadAllowlist: [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "yclid",
    "page_slug",
    "page_type",
    "cta_label",
    "cta_location",
    "lead_topic",
    "collector_type",
    "related_href",
    "failure_reason"
  ],
  forbiddenPayloadKeys,
  buildOutput,
  runtimeFilesChecked: runtimeFiles.map(rel).sort(),
  issues
};

writeJson(proofFile, proof);

if (issues.length > 0) {
  console.error("Tracking no-PII check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  console.error(`Proof: ${rel(proofFile)}`);
  process.exit(1);
}

console.log("PASS tracking no-PII: approved Metrika 109869928, safe goals and no-PII payload guard verified.");
console.log(`Proof: ${rel(proofFile)}`);
