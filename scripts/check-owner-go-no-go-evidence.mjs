#!/usr/bin/env node
import path from "node:path";
import { evidenceDir, read } from "./evidence-utils.mjs";

const proofFile = path.join(evidenceDir, "owner-go-no-go", "remote-sync-proof.json");
const proof = JSON.parse(read(proofFile) || "{}");
const issues = [];

function mustBeFalse(key) {
  if (proof[key] !== false) issues.push(`${key} must be false, got ${proof[key]}`);
}

function mustBeTrue(key) {
  if (proof[key] !== true) issues.push(`${key} must be true, got ${proof[key]}`);
}

mustBeFalse("publicLiveAllowed");
mustBeFalse("productionDeployPerformed");
mustBeFalse("pushPerformed");
mustBeFalse("prCreated");
mustBeFalse("remoteSyncAllowed");
mustBeFalse("publicLaunchReady");
mustBeTrue("ownerDecisionRequired");

if (!proofFile || !Object.keys(proof).length) issues.push("remote sync proof is missing");
if (proof.localCommitsAhead < 1) issues.push(`localCommitsAhead must be positive, got ${proof.localCommitsAhead}`);
if (proof.recommendedSyncMode !== "DRAFT_PR") issues.push(`recommendedSyncMode must be DRAFT_PR, got ${proof.recommendedSyncMode}`);
if (proof.verdict !== "REMOTE_SYNC_PREPARED_PUBLIC_RELEASE_HOLD") {
  issues.push(`verdict must be REMOTE_SYNC_PREPARED_PUBLIC_RELEASE_HOLD, got ${proof.verdict}`);
}
if (proof.forbiddenFiles?.length) issues.push(`forbidden files detected: ${proof.forbiddenFiles.join(", ")}`);
if (proof.buildArtifactsCommitted?.length) issues.push(`build artifacts detected: ${proof.buildArtifactsCommitted.join(", ")}`);

if (issues.length > 0) {
  console.error("Owner go/no-go evidence check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("PASS owner go/no-go evidence: remote sync prepared, no push/PR/deploy, public release HOLD.");
