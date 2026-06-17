#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

const files = {
  packageJson: "package.json",
  workflow: ".github/workflows/site-ci.yml",
  flags: "lib/feature-flags.ts",
  eventContext: "lib/tracking/event-context.ts",
  attribution: "lib/tracking/attribution.ts",
  adapter: "lib/tracking/tracking-adapter.ts",
  layout: "app/layout.tsx",
  trackedAction: "components/tracking/TrackedAction.tsx",
  attributionCapture: "components/tracking/AttributionCapture.tsx"
};

function repoPath(rel) {
  return path.join(root, rel);
}

function read(rel) {
  const full = repoPath(rel);
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : "";
}

function assert(condition, message) {
  if (!condition) issues.push(message);
}

for (const [label, rel] of Object.entries(files)) {
  assert(fs.existsSync(repoPath(rel)), `Missing ${label}: ${rel}`);
}

const packageText = read(files.packageJson);
const workflowText = read(files.workflow);
const flagsText = read(files.flags);
const eventContextText = read(files.eventContext);
const attributionText = read(files.attribution);
const adapterText = read(files.adapter);
const layoutText = read(files.layout);
const trackedActionText = read(files.trackedAction);
const attributionCaptureText = read(files.attributionCapture);

let packageJson = {};
try {
  packageJson = JSON.parse(packageText);
} catch (error) {
  issues.push(`package.json is not valid JSON: ${error.message}`);
}

assert(packageJson.scripts?.["check:tracking-no-pii"] === "node scripts/check-tracking-no-pii.mjs", "package.json must expose check:tracking-no-pii.");
assert(packageJson.scripts?.["check:finalization"]?.includes("check:tracking-no-pii"), "check:finalization must run check:tracking-no-pii.");
assert(/check:tracking-no-pii/.test(workflowText), "Site CI workflow must run check:tracking-no-pii explicitly.");

assert(/analyticsEnabled:\s*false/.test(flagsText), "analyticsEnabled must remain false until a non-Metrica provider is approved.");
assert(/metricaEnabled:\s*true/.test(flagsText), "metricaEnabled must be true after the Yandex Metrica counter is installed.");

const forbiddenKeys = [
  "phone",
  "email",
  "name",
  "message",
  "comment",
  "question",
  "documents",
  "document_text",
  "file",
  "file_name",
  "scan",
  "inn",
  "ogrn",
  "passport",
  "requisites",
  "bank",
  "crm_notes"
];
const safeBlock = eventContextText.match(/safeTrackingParamKeys\s*=\s*\[([\s\S]*?)\]\s*as const/)?.[1] ?? "";
const forbiddenBlock = eventContextText.match(/forbiddenTrackingParamKeys\s*=\s*\[([\s\S]*?)\]\s*as const/)?.[1] ?? "";

for (const key of forbiddenKeys) {
  assert(new RegExp(`"${key}"`).test(forbiddenBlock), `Forbidden tracking key must be listed: ${key}`);
  assert(!new RegExp(`"${key}"`).test(safeBlock), `Forbidden tracking key must not be in safeTrackingParamKeys: ${key}`);
}

for (const attr of [
  "data-tracked-action",
  "data-event-name",
  "data-page-slug",
  "data-page-type",
  "data-cta-label",
  "data-cta-location",
  "data-lead-topic",
  "data-collector-type"
]) {
  assert(trackedActionText.includes(attr), `TrackedAction must render ${attr}.`);
}

assert(/getStoredAttribution/.test(trackedActionText), "TrackedAction must read stored attribution.");
assert(/trackSafeEvent/.test(trackedActionText), "TrackedAction must call the gated tracking adapter.");
assert(/captureAttributionFromLocation/.test(attributionCaptureText), "AttributionCapture must capture URL attribution params.");
assert(/sessionStorage/.test(attributionText), "Attribution capture should use browser sessionStorage only.");
assert(/!siteFeatureFlags\.analyticsEnabled\s*&&\s*!siteFeatureFlags\.metricaEnabled/.test(adapterText), "Tracking adapter must no-op when analytics and Metrica are disabled.");
assert(/metrica\.call\(window,\s*109869928,\s*"reachGoal"/.test(adapterText), "Metrica reachGoal must stay behind the typed tracking adapter bridge.");
assert(!/\bym\s*\(/.test(adapterText), "Tracking adapter must not call ym(...) directly; use the typed bridge.");
assert(/ym\(109869928,\s*'init'/.test(layoutText), "app/layout.tsx must only initialize the Yandex Metrica counter.");
assert(!/reachGoal/.test(layoutText), "app/layout.tsx must not emit Metrica goals directly.");

const trackingRuntimeText = [eventContextText, attributionText, adapterText, trackedActionText, attributionCaptureText].join("\n");
const externalSendPatterns = [/\bym\s*\(/, /\bgtag\s*\(/, /navigator\.sendBeacon/, /XMLHttpRequest/, /\bfetch\s*\(/, /new\s+Image\s*\(/];
for (const pattern of externalSendPatterns) {
  assert(!pattern.test(trackingRuntimeText), `Tracking layer must not send external events while disabled: ${pattern}`);
}
assert(!/\bFormData\b|querySelector|querySelectorAll|\.(?:value|files)\b/.test(trackingRuntimeText), "Tracking layer must not read visible form field values.");

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === ".next" || entry.name === "out") return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(full) : [full];
  });
}

const appFiles = ["app", "components", "lib/tracking"].flatMap((dir) => listFiles(repoPath(dir))).filter((file) => /\.(ts|tsx|js|jsx)$/i.test(file));
for (const file of appFiles) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  const text = fs.readFileSync(file, "utf8");
  if (rel !== "app/layout.tsx" && /\bym\s*\(/.test(text)) {
    issues.push(`Direct ym(...) call is only allowed for counter init in app/layout.tsx: ${rel}`);
  }
  if (rel !== "app/policy/page.tsx" && /goal_form_submit_success/.test(text)) {
    issues.push(`goal_form_submit_success must not be emitted before backend/CRM acceptance: ${rel}`);
  }
  for (const key of forbiddenKeys) {
    const dataAttr = `data-${key.replaceAll("_", "-")}`;
    assert(!text.includes(dataAttr), `Forbidden PII data attribute found in ${rel}: ${dataAttr}`);
  }
}

if (issues.length > 0) {
  console.error("Tracking no-PII check failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("PASS tracking no-PII: CTA context and URL attribution are captured only as safe data; Yandex Metrica pageview counter is enabled.");
