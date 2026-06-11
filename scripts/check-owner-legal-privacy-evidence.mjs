#!/usr/bin/env node
import path from "node:path";
import { evidenceDir, read } from "./evidence-utils.mjs";

const proofFile = path.join(evidenceDir, "owner-legal-privacy", "owner-legal-privacy-proof.json");
const proof = JSON.parse(read(proofFile) || "{}");
const issues = [];

function mustBeTrue(key) {
  if (proof[key] !== true) {
    issues.push(`${key} must be true, got ${proof[key]}`);
  }
}

function mustBeFalse(key) {
  if (proof[key] !== false) {
    issues.push(`${key} must be false, got ${proof[key]}`);
  }
}

mustBeFalse("publicLiveAllowed");
mustBeFalse("formsLive");
mustBeFalse("crmSuccessEnabled");
mustBeFalse("analyticsEnabled");
mustBeFalse("metricaEnabled");
mustBeFalse("maxEnabled");
mustBeFalse("telegramEnabled");
mustBeFalse("mapEnabled");
mustBeFalse("cookieNoticeEnabled");
mustBeFalse("publicLaunchReady");

mustBeTrue("policyRoutePresent");
mustBeTrue("policyFooterLinkPresent");
mustBeTrue("formsPlaceholderOnly");
mustBeTrue("noUpload");
mustBeTrue("noSubmit");
mustBeTrue("noBackendEndpoint");
mustBeTrue("noWebhook");
mustBeTrue("noSecrets");
mustBeTrue("noAnalyticsScripts");
mustBeTrue("noMetricaScripts");
mustBeTrue("noTelegramMaxDeepLinks");
mustBeTrue("noPrices");
mustBeTrue("noGuarantees");
mustBeTrue("noReviewsRatings");
mustBeTrue("ownerLegalReviewRequired");

if (!["HOLD", "NOT_PUBLIC_LAUNCH_READY", "HOLD/NOT_PUBLIC_LAUNCH_READY"].includes(proof.verdict)) {
  issues.push(`verdict must be HOLD/NOT_PUBLIC_LAUNCH_READY, got ${proof.verdict}`);
}

if (proof.missingSources?.length) {
  issues.push(`missing source documents: ${proof.missingSources.join(", ")}`);
}

for (const [key, value] of Object.entries(proof.evidenceStatus ?? {})) {
  if (value !== "passed") issues.push(`${key} evidence must be passed, got ${value}`);
}

if (proof.formAudit?.falseSuccessPresent) {
  issues.push("false success text found in rendered forms");
}

if (!proof.sourceCommit) {
  issues.push("sourceCommit must be recorded");
}

if (issues.length > 0) {
  console.error("Owner/legal/privacy evidence check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("PASS owner/legal/privacy evidence: HOLD status, policy, placeholders, privacy and channel guards verified.");
