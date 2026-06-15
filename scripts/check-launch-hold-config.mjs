#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

function read(rel) {
  const full = path.join(root, rel);
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : "";
}

function assert(condition, message) {
  if (!condition) issues.push(message);
}

const flagsText = read("lib/feature-flags.ts");
const layoutText = read("app/layout.tsx");
const robotsText = read("public/robots.txt");

const closedFlags = [
  "publicLiveAllowed",
  "metricaEnabled",
  "analyticsEnabled",
  "formsLive",
  "crmEnabled",
  "crmSuccessEnabled",
  "paidTrafficAllowed",
  "localProfilesPublic",
  "maxEnabled",
  "telegramEnabled",
  "messagingEnabled",
  "messagingRevealEnabled",
  "mapEnabled",
  "cookieNoticeEnabled"
];

for (const flag of closedFlags) {
  assert(new RegExp(`${flag}:\\s*false`).test(flagsText), `HOLD mode requires ${flag}: false`);
}

assert(/siteRuntimeMode/.test(flagsText), "Feature flags must expose siteRuntimeMode.");
assert(/STATIC_CONTACT_ONLY_LAUNCH_CANDIDATE/.test(flagsText), "HOLD mode must expose STATIC_CONTACT_ONLY_LAUNCH_CANDIDATE.");
assert(/index:\s*siteFeatureFlags\.publicLiveAllowed/.test(layoutText), "Root robots.index must stay gated by publicLiveAllowed.");
assert(/follow:\s*siteFeatureFlags\.publicLiveAllowed/.test(layoutText), "Root robots.follow must stay gated by publicLiveAllowed.");
assert(
  /PUBLIC_LIVE_ALLOWED=false/.test(robotsText) || /^Disallow:\s*\/\s*$/m.test(robotsText),
  "HOLD mode robots.txt must disclose PUBLIC_LIVE_ALLOWED=false or block public crawling."
);

if (issues.length > 0) {
  console.error("Launch HOLD config check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("PASS launch HOLD config: public live, analytics, forms, CRM, paid traffic, messaging and local profiles are all closed.");
