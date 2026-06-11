#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { ensureDir, evidenceDir, writeJson, writeText } from "./evidence-utils.mjs";

const root = process.cwd();
const repoRoot = path.resolve(root, "..");
const outDir = path.join(evidenceDir, "owner-go-no-go");
const baseRef = process.env.REMOTE_BASE_REF || "origin/main";

function git(command) {
  return execSync(`git ${command}`, { cwd: repoRoot, encoding: "utf8" }).trim();
}

function gitRaw(command) {
  return execSync(`git ${command}`, { cwd: repoRoot, encoding: "utf8" });
}

function tryGit(command) {
  try {
    return git(command);
  } catch {
    return "";
  }
}

function splitLines(value) {
  return value ? value.split(/\r?\n/).filter(Boolean) : [];
}

function fileSize(file) {
  return fs.existsSync(file) ? fs.statSync(file).size : 0;
}

const currentCommit = git("rev-parse --short HEAD");
const branch = git("branch --show-current");
const statusEntries = splitLines(gitRaw("status --porcelain"));
const allowedPackDirty = statusEntries.every((entry) => {
  const file = entry.slice(3).replace(/\\/g, "/");
  return (
    file === "code/package.json" ||
    file === "code/evidence/accessibility/accessibility-proof.json" ||
    file === "code/evidence/browser/browser-route-proof.json" ||
    file === "code/evidence/browser/playwright-smoke-proof.json" ||
    file === "code/evidence/final-local/safety-proof.json" ||
    file === "code/evidence/forms/form-placeholder-proof.json" ||
    file === "code/evidence/rendered/rendered-dom-proof.json" ||
    file === "code/scripts/generate-owner-go-no-go-evidence.mjs" ||
    file === "code/scripts/check-owner-go-no-go-evidence.mjs" ||
    file.startsWith("code/evidence/owner-go-no-go/")
  );
});
const workingTreeClean = statusEntries.length === 0 || allowedPackDirty;
const commitsAhead = splitLines(git(`log --oneline ${baseRef}..HEAD`)).map((line) => {
  const [hash, ...rest] = line.split(" ");
  return { hash, message: rest.join(" ") };
});
const filesAhead = splitLines(git(`diff --name-only ${baseRef}..HEAD`));
const nameStatus = splitLines(git(`diff --name-status ${baseRef}..HEAD`));
const stat = tryGit(`diff --stat ${baseRef}..HEAD`);
const forbiddenPatterns = [
  /^node_modules\//,
  /^code\/node_modules\//,
  /^\.next\//,
  /^code\/\.next\//,
  /^out\//,
  /^code\/out\//,
  /(^|\/)\.env(\.|$)/,
  /(^|\/)\.env\.local$/,
  /\.(pem|key)$/i,
  /dokumenty82-p0-local/i,
  /dokumenty82-site/i,
  /pid$/i,
  /\.log$/i
];
const forbiddenFiles = filesAhead.filter((file) => forbiddenPatterns.some((pattern) => pattern.test(file)));
const screenshots = filesAhead
  .filter((file) => /^code\/evidence\/rendered\/screenshots\/.+\.png$/i.test(file))
  .map((file) => ({ file, size: fileSize(path.join(repoRoot, file)) }));
const evidenceJsonFiles = filesAhead.filter((file) => /^code\/evidence\/.+\.json$/i.test(file));
const binaryFiles = splitLines(git(`diff --numstat ${baseRef}..HEAD`))
  .filter((line) => line.startsWith("-\t-"))
  .map((line) => line.split("\t").at(-1));
const largeFiles = filesAhead
  .map((file) => ({ file, size: fileSize(path.join(repoRoot, file)) }))
  .filter((entry) => entry.size >= 1024 * 1024)
  .sort((a, b) => b.size - a.size);
const repoPath = fs.realpathSync(repoRoot);
const siblingChecks = ["C:\\new\\dokumenty82-site", "C:\\new\\dokumenty82-p0-local"].map((candidate) => {
  const exists = fs.existsSync(candidate);
  const resolved = exists ? fs.realpathSync(candidate) : candidate;
  return {
    path: candidate,
    exists,
    insideCanonicalRepo: exists && resolved.toLowerCase().startsWith(repoPath.toLowerCase())
  };
});
const pendingOwnerGoNoGoCommit = statusEntries.length > 0 && allowedPackDirty;

const proof = {
  reviewedAtLocal: new Date().toISOString(),
  sourceCommit: currentCommit,
  branch,
  baseRef,
  publicLiveAllowed: false,
  productionDeployPerformed: false,
  pushPerformed: false,
  prCreated: false,
  remoteSyncAllowed: process.env.REMOTE_SYNC_ALLOWED === "true",
  workingTreeClean,
  localCommitsAhead: commitsAhead.length + (pendingOwnerGoNoGoCommit ? 1 : 0),
  recommendedSyncMode: "DRAFT_PR",
  ownerDecisionRequired: true,
  publicLaunchReady: false,
  verdict: "REMOTE_SYNC_PREPARED_PUBLIC_RELEASE_HOLD",
  commitsAhead,
  pendingOwnerGoNoGoCommit,
  filesAhead,
  nameStatus,
  statusEntries,
  workingTreeCleanScope: statusEntries.length === 0 ? "actual clean" : "clean except current owner-go-no-go pack files",
  diffStat: stat,
  forbiddenFiles,
  largeFiles,
  binaryFiles,
  screenshots: {
    count: screenshots.length,
    totalBytes: screenshots.reduce((sum, shot) => sum + shot.size, 0),
    largestBytes: screenshots.reduce((max, shot) => Math.max(max, shot.size), 0),
    cleanupDecisionNeeded: screenshots.reduce((sum, shot) => sum + shot.size, 0) > 5 * 1024 * 1024
  },
  evidenceJsonFiles,
  buildArtifactsCommitted: filesAhead.filter((file) => /^code\/out\/|^code\/\.next\/|(^|\/)node_modules\//.test(file)),
  siblingFolders: siblingChecks,
  recommendedOptions: ["NO-GO", "GO PR", "GO DIRECT PUSH", "GO CLEANUP FIRST"]
};

ensureDir(outDir);
writeJson(path.join(outDir, "remote-sync-proof.json"), proof);
writeText(
  path.join(outDir, "remote-sync-proof-summary.md"),
  `# Remote Sync Proof\n\nStatus: ${proof.verdict}\n\nBranch: ${branch}\n\nBase ref: ${baseRef}\n\nLocal commits ahead: ${proof.localCommitsAhead}\n\nFiles ahead: ${filesAhead.length}\n\nForbidden files: ${forbiddenFiles.length ? forbiddenFiles.join(", ") : "none"}\n\nScreenshots: ${proof.screenshots.count}, ${proof.screenshots.totalBytes} bytes\n\nRecommended sync mode: ${proof.recommendedSyncMode}\n\nPush performed: ${proof.pushPerformed}\n\nPR created: ${proof.prCreated}\n`
);

console.log(`Owner go/no-go evidence generated in ${path.relative(root, outDir)}`);
