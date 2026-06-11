#!/usr/bin/env node
import path from "node:path";
import { evidenceDir, read } from "./evidence-utils.mjs";

const baseDir = path.join(evidenceDir, "staging-hosting-rollback");
const finalProofFile = path.join(baseDir, "final", "staging-hosting-rollback-proof.json");
const stagingProofFile = path.join(baseDir, "staging", "staging-readiness-proof.json");
const rollbackProofFile = path.join(baseDir, "rollback", "rollback-proof.json");
const securityProofFile = path.join(baseDir, "security", "security-readiness-proof.json");

const finalProof = JSON.parse(read(finalProofFile) || "{}");
const stagingProof = JSON.parse(read(stagingProofFile) || "{}");
const rollbackProof = JSON.parse(read(rollbackProofFile) || "{}");
const securityProof = JSON.parse(read(securityProofFile) || "{}");
const issues = [];

function mustBeFalse(key) {
  if (finalProof[key] !== false) issues.push(`${key} must be false, got ${finalProof[key]}`);
}

function mustBeTrue(key) {
  if (finalProof[key] !== true) issues.push(`${key} must be true, got ${finalProof[key]}`);
}

mustBeFalse("publicLiveAllowed");
mustBeFalse("productionDeployPerformed");
mustBeFalse("pushPerformed");
mustBeFalse("http3Enabled");
mustBeFalse("quicEnabled");
mustBeFalse("udp443Required");
mustBeFalse("h3AltSvcEnabled");
mustBeFalse("productionLaunchReady");

mustBeTrue("staticExportExists");
mustBeTrue("localPreviewPassed");
mustBeTrue("p0RoutesHttp200");
mustBeTrue("nginxReferenceCreated");
mustBeTrue("rollbackRunbookCreated");
mustBeTrue("securityAuditPassed");
mustBeTrue("ownerApprovalRequired");
mustBeTrue("legalApprovalRequired");

if (stagingProof.status !== "passed") issues.push(`staging proof must be passed, got ${stagingProof.status}`);
if (rollbackProof.status !== "passed") issues.push(`rollback proof must be passed, got ${rollbackProof.status}`);
if (securityProof.status !== "passed") issues.push(`security proof must be passed, got ${securityProof.status}`);
if (!["HOLD", "NOT_PUBLIC_LAUNCH_READY", "HOLD/NOT_PUBLIC_LAUNCH_READY"].includes(finalProof.verdict)) {
  issues.push(`verdict must be HOLD/NOT_PUBLIC_LAUNCH_READY, got ${finalProof.verdict}`);
}
if (finalProof.missingSources?.length) {
  issues.push(`missing source documents: ${finalProof.missingSources.join(", ")}`);
}

if (issues.length > 0) {
  console.error("Staging/hosting/rollback evidence check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("PASS staging/hosting/rollback evidence: static export, local preview, TCP-only hosting, rollback and security guards verified.");
