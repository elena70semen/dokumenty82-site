#!/usr/bin/env node
import path from "node:path";
import { evidenceDir, read } from "./evidence-utils.mjs";

const proofFile = path.join(evidenceDir, "owner-legal-privacy", "owner-legal-privacy-proof.json");
const proof = JSON.parse(read(proofFile) || "{}");
const issues = [];

const expectedMode = "PUBLIC_LIVE_METRICA_NO_PII_WITH_COOKIE_NOTICE";
const expectedVerdict = "PUBLIC_LIVE_METRICA_NO_PII_WITH_COOKIE_NOTICE_OWNER_LEGAL_REVIEW_REQUIRED";

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

function mustAllTrue(groupName, group) {
  for (const [key, value] of Object.entries(group ?? {})) {
    if (Array.isArray(value)) {
      if (value.length !== 0) issues.push(`${groupName}.${key} must be empty, got ${value.join(", ")}`);
    } else if (value !== true) {
      issues.push(`${groupName}.${key} must be true, got ${value}`);
    }
  }
}

if (proof.mode !== expectedMode) {
  issues.push(`mode must be ${expectedMode}, got ${proof.mode}`);
}

if (proof.verdict !== expectedVerdict) {
  issues.push(`verdict must be ${expectedVerdict}, got ${proof.verdict}`);
}

mustBeTrue("publicLiveAllowed");
mustBeTrue("metricaEnabled");
mustBeTrue("cookieNoticeEnabled");
mustBeTrue("formPlaceholdersEnabled");
mustBeTrue("ownerLegalReviewRequired");
mustBeTrue("policyRoutePresent");

mustBeFalse("formsLive");
mustBeFalse("crmEnabled");
mustBeFalse("crmSuccessEnabled");
mustBeFalse("analyticsEnabled");
mustBeFalse("paidTrafficAllowed");
mustBeFalse("localProfilesPublic");
mustBeFalse("maxEnabled");
mustBeFalse("telegramEnabled");
mustBeFalse("messagingEnabled");
mustBeFalse("messagingRevealEnabled");
mustBeFalse("mapEnabled");
mustBeFalse("ownerLegalAcceptance");
mustBeFalse("legalApproved");

mustAllTrue("policyDisclosure", proof.policyDisclosure);
mustAllTrue("cookieNotice", proof.cookieNotice);
mustAllTrue("trackingNoPii", proof.trackingNoPii);
mustAllTrue("analyticsProviderStatus", proof.analyticsProviderStatus);

if (proof.formAudit?.formPlaceholderCount !== proof.formAudit?.expectedFormPlaceholderCount) {
  issues.push(`form placeholder count mismatch: ${proof.formAudit?.formPlaceholderCount}/${proof.formAudit?.expectedFormPlaceholderCount}`);
}

for (const key of ["formActionCount", "methodPostCount", "submitControlCount", "fileInputCount"]) {
  if (proof.formAudit?.[key] !== 0) {
    issues.push(`formAudit.${key} must be 0, got ${proof.formAudit?.[key]}`);
  }
}

for (const key of ["noUpload", "noBackendEndpoint", "noFalseSuccessCopy"]) {
  if (proof.formAudit?.[key] !== true) {
    issues.push(`formAudit.${key} must be true, got ${proof.formAudit?.[key]}`);
  }
}

mustAllTrue("safetyAudit", proof.safetyAudit);

if (proof.missingSiteDocs?.length) {
  issues.push(`missing site documents: ${proof.missingSiteDocs.join(", ")}`);
}

if (!proof.siteCommit) {
  issues.push("siteCommit must be recorded");
}

if (proof.sourceTruthAvailable && !proof.sourceCommit) {
  issues.push("sourceCommit must be recorded when sourceTruthAvailable=true");
}

if (issues.length > 0) {
  console.error("Owner/legal/privacy evidence check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("PASS owner/legal/privacy evidence: public live Metrica, cookie notice, no-PII tracking and closed CRM/forms/upload gates verified; owner/legal review remains required.");
