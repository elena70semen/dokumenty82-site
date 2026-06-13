#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

const files = {
  flags: "lib/feature-flags.ts",
  layout: "app/layout.tsx",
  robots: "public/robots.txt",
  packageJson: "package.json",
  workflow: ".github/workflows/site-ci.yml"
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

const flagsText = read(files.flags);
const layoutText = read(files.layout);
const robotsText = read(files.robots);
const packageText = read(files.packageJson);
const workflowText = read(files.workflow);

const requiredClosedFlags = [
  "publicLiveAllowed",
  "formsLive",
  "crmEnabled",
  "crmSuccessEnabled",
  "analyticsEnabled",
  "metricaEnabled",
  "paidTrafficAllowed",
  "localProfilesPublic",
  "maxEnabled",
  "telegramEnabled",
  "messagingEnabled",
  "messagingRevealEnabled",
  "mapEnabled",
  "cookieNoticeEnabled"
];

for (const flag of requiredClosedFlags) {
  assert(new RegExp(`${flag}:\\s*false`).test(flagsText), `Feature flag must default to false while launch gates are closed: ${flag}`);
}

assert(/formPlaceholdersEnabled:\s*true/.test(flagsText), "Safe placeholder forms should remain enabled for the static contact-only candidate.");
assert(/siteRuntimeMode/.test(flagsText), "Feature flags must expose siteRuntimeMode.");
assert(/STATIC_CONTACT_ONLY_LAUNCH_CANDIDATE/.test(flagsText), "Closed launch mode must be named STATIC_CONTACT_ONLY_LAUNCH_CANDIDATE.");

let packageJson = {};
try {
  packageJson = JSON.parse(packageText);
} catch (error) {
  issues.push(`package.json is not valid JSON: ${error.message}`);
}

assert(
  packageJson.scripts?.["check:launch-live-config"] === "node scripts/check-launch-live-config.mjs",
  "package.json must expose check:launch-live-config."
);
assert(
  packageJson.scripts?.["check:finalization"]?.includes("check:launch-live-config"),
  "check:finalization must run check:launch-live-config."
);
assert(/check:launch-live-config/.test(workflowText), "Site CI workflow must run check:launch-live-config explicitly.");

const publicLiveDisabled = /publicLiveAllowed:\s*false/.test(flagsText);

if (publicLiveDisabled) {
  assert(/siteFeatureFlags/.test(layoutText), "app/layout.tsx must read siteFeatureFlags.");
  assert(/index:\s*siteFeatureFlags\.publicLiveAllowed/.test(layoutText), "Root metadata robots.index must be gated by publicLiveAllowed.");
  assert(/follow:\s*siteFeatureFlags\.publicLiveAllowed/.test(layoutText), "Root metadata robots.follow must be gated by publicLiveAllowed.");
  assert(/googleBot:\s*{[\s\S]*?index:\s*siteFeatureFlags\.publicLiveAllowed/.test(layoutText), "Googlebot index must be gated by publicLiveAllowed.");
  assert(/googleBot:\s*{[\s\S]*?follow:\s*siteFeatureFlags\.publicLiveAllowed/.test(layoutText), "Googlebot follow must be gated by publicLiveAllowed.");

  assert(/PUBLIC_LIVE_ALLOWED=false/.test(robotsText), "robots.txt must disclose that PUBLIC_LIVE_ALLOWED=false.");
  assert(/^Disallow:\s*\/\s*$/m.test(robotsText), "robots.txt must disallow crawling while publicLiveAllowed=false.");
  assert(!/^Allow:\s*\/\s*$/m.test(robotsText), "robots.txt must not allow all crawling while publicLiveAllowed=false.");
}

const blockedLivePatterns = [
  [/publicLiveAllowed:\s*true/, "publicLiveAllowed must not be true."],
  [/formsLive:\s*true/, "formsLive must not be true."],
  [/crmEnabled:\s*true/, "crmEnabled must not be true."],
  [/crmSuccessEnabled:\s*true/, "crmSuccessEnabled must not be true."],
  [/analyticsEnabled:\s*true/, "analyticsEnabled must not be true."],
  [/metricaEnabled:\s*true/, "metricaEnabled must not be true."],
  [/paidTrafficAllowed:\s*true/, "paidTrafficAllowed must not be true."],
  [/localProfilesPublic:\s*true/, "localProfilesPublic must not be true."],
  [/messagingEnabled:\s*true/, "messagingEnabled must not be true."],
  [/messagingRevealEnabled:\s*true/, "messagingRevealEnabled must not be true."]
];

for (const [pattern, message] of blockedLivePatterns) {
  assert(!pattern.test(flagsText), message);
}

if (issues.length > 0) {
  console.error("Launch live config check failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("PASS launch live config: PUBLIC_LIVE_ALLOWED=false; indexing, live forms, CRM, analytics, Metrica, messaging, local profiles and paid traffic remain gated.");
