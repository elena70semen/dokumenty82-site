#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { evidenceDir, listFiles, outDir, read, root, writeJson } from "./evidence-utils.mjs";

const envExampleFile = path.join(root, ".env.example");
const proofFile = path.join(evidenceDir, "release", "stage19-staging-env-contract.json");
const issues = [];

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

function gitValue(command, fallback = "UNKNOWN") {
  try {
    return execSync(command, { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return fallback;
  }
}

function parseEnv(text) {
  const values = new Map();
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator === -1) continue;
    values.set(line.slice(0, separator).trim(), line.slice(separator + 1).trim());
  }
  return values;
}

function isTextFile(file) {
  return /\.(ts|tsx|js|mjs|json|xml|html|txt|css|conf|yml|yaml)$/i.test(file);
}

function trackedFiles() {
  const output = gitValue("git ls-files -z", "");
  return output
    .split("\0")
    .filter(Boolean)
    .map((file) => path.join(root, file));
}

function activeRuntimeFiles() {
  const candidates = [
    ...listFiles(path.join(root, "app")),
    ...listFiles(path.join(root, "components")),
    ...listFiles(path.join(root, "lib")),
    ...listFiles(path.join(root, "public")),
    ...listFiles(path.join(root, "server")),
    path.join(root, "package.json"),
    path.join(root, "next.config.ts"),
    ...(exists(outDir) ? listFiles(outDir, { skip: new Set([]) }) : [])
  ].flat();

  return candidates
    .filter((file) => exists(file) && fs.statSync(file).isFile())
    .filter((file) => {
      const relative = rel(file);
      return (
        !relative.startsWith("lib/pricing/") &&
        !relative.startsWith("public/assets/brand/") &&
        !relative.startsWith("out/_next/static/") &&
        !/\.svg$/i.test(relative)
      );
    })
    .filter(isTextFile);
}

function secretScanFiles() {
  return trackedFiles()
    .filter((file) => exists(file) && fs.statSync(file).isFile())
    .filter((file) => {
      const relative = rel(file);
      return (
        !relative.startsWith("docs/") &&
        !relative.startsWith("evidence/") &&
        relative !== "scripts/check-staging-env-contract.mjs" &&
        relative !== "package-lock.json" &&
        !relative.startsWith("public/assets/brand/") &&
        !/\.svg$/i.test(relative)
      );
    })
    .filter(isTextFile);
}

function scanFiles(files, scans) {
  const matches = [];
  for (const file of files) {
    const text = read(file);
    for (const scan of scans) {
      if (scan.pattern.test(text)) {
        matches.push({ label: scan.label, file: rel(file) });
      }
    }
  }
  return matches;
}

function stripCommentLines(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith("#") && !line.trim().startsWith("//"))
    .join("\n");
}

const envText = read(envExampleFile);
const env = parseEnv(envText);

assert(exists(envExampleFile), ".env.example is missing.");
assert(env.get("PUBLIC_LIVE_ALLOWED") === "false", ".env.example must keep PUBLIC_LIVE_ALLOWED=false.");
assert(env.get("NEXT_PUBLIC_ANALYTICS_MODE") === "stub", ".env.example must keep NEXT_PUBLIC_ANALYTICS_MODE=stub.");
assert(env.get("NEXT_PUBLIC_YANDEX_METRIKA_ENABLED") === "false", ".env.example must keep Metrika disabled.");
assert(env.get("NEXT_PUBLIC_YANDEX_METRIKA_ID") === "00000000", ".env.example must use the stub Metrika ID.");
assert(env.get("NEXT_PUBLIC_YANDEX_WEBMASTER_VERIFICATION") === "", ".env.example must keep Yandex Webmaster verification empty.");
assert(env.get("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION") === "", ".env.example must keep Google site verification empty.");
assert(env.get("CRM_FORMS_ENABLED") === "false", ".env.example must keep CRM/forms disabled.");
assert(env.get("CRM_WEBHOOK_URL") === "", ".env.example must keep CRM_WEBHOOK_URL empty.");
assert(env.get("PUBLIC_UPLOADS_ENABLED") === "false", ".env.example must keep public uploads disabled.");
assert(env.get("PUBLIC_MESSAGING_LINKS_ENABLED") === "false", ".env.example must keep public messaging links disabled.");
assert(env.get("STAGING_ENVIRONMENT") === "local", ".env.example must keep STAGING_ENVIRONMENT=local.");
assert(env.get("STAGING_INDEXING_ALLOWED") === "false", ".env.example must keep staging indexing disabled.");

if (/NEXT_PUBLIC_YANDEX_METRIKA_ID=(?!00000000\b)[1-9]\d{5,}/.test(envText)) {
  fail(".env.example must not contain a real Yandex Metrika ID.");
}

for (const key of ["NEXT_PUBLIC_YANDEX_WEBMASTER_VERIFICATION", "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION", "CRM_WEBHOOK_URL"]) {
  const value = env.get(key) ?? "";
  if (value.trim() !== "") fail(`${key} must remain an empty placeholder.`);
}

if (/=\s*(?:ya29\.|sk-[A-Za-z0-9]|ghp_|github_pat_|xox[baprs]-|-----BEGIN [A-Z ]*PRIVATE KEY-----)/.test(envText)) {
  fail(".env.example appears to contain a real secret value.");
}

const trackedForbiddenEnvFiles = trackedFiles()
  .map(rel)
  .filter((file) => [".env", ".env.local", ".env.production", ".env.staging", ".env.preview"].includes(file));

if (trackedForbiddenEnvFiles.length > 0) {
  fail(`Real env files must not be committed: ${trackedForbiddenEnvFiles.join(", ")}`);
}

const activeMatches = scanFiles(activeRuntimeFiles(), [
  { label: "public live enabled", pattern: /PUBLIC_LIVE_ALLOWED\s*=\s*true|data-public-live-allowed=["']true/i },
  { label: "live analytics enabled", pattern: /NEXT_PUBLIC_(?:ANALYTICS|YANDEX_METRIKA)_ENABLED\s*=\s*true/i },
  { label: "real Metrika ID", pattern: /NEXT_PUBLIC_YANDEX_METRIKA_ID\s*=\s*(?!00000000\b)[1-9]\d{5,}|counterId\s*[:=]\s*(?!["']?00000000\b)[1-9]\d{5,}/i },
  { label: "active Metrika script", pattern: /mc\.yandex\.ru|\bym\s*\(\s*[1-9]\d{5,}/i },
  { label: "CRM webhook", pattern: /https?:\/\/[^\s"'`]*(?:crm|bitrix|amocrm|webhook)|CRM_WEBHOOK_URL\s*=\s*https?:\/\//i },
  { label: "public upload", pattern: /<input\b[^>]*type=["']file|PUBLIC_UPLOADS_ENABLED\s*=\s*true/i },
  { label: "messaging deep link", pattern: /t\.me\/|telegram\.me\/|max:\/\/|wa\.me\/|whatsapp|PUBLIC_MESSAGING_LINKS_ENABLED\s*=\s*true/i },
  { label: "staging indexing enabled", pattern: /STAGING_INDEXING_ALLOWED\s*=\s*true/i },
  { label: "Webvisor/session replay/ecommerce", pattern: /webvisor|session\s*replay|sessionReplay|ecommerce/i }
]);

for (const match of activeMatches) {
  fail(`${match.label} matched in ${match.file}`);
}

const nginxReferenceFile = path.join(root, "server", "nginx", "dokumenty82.static-tcp-only.reference.conf");
const nginxActiveText = stripCommentLines(read(nginxReferenceFile));
if (/listen\s+[^;]*\bquic\b/i.test(nginxActiveText)) fail("Active nginx listen ... quic directive found.");
if (/Alt-Svc\s*:\s*h3/i.test(nginxActiveText)) fail("Active h3 Alt-Svc header found.");
if (/HTTP\/3|HTTP3|QUIC|UDP\/443/i.test(nginxActiveText)) fail("Active HTTP/3/QUIC/UDP text found outside comments.");

const secretMatches = scanFiles(secretScanFiles(), [
  { label: "private key", pattern: /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/ },
  { label: "GitHub token", pattern: /\b(?:ghp_|github_pat_)[A-Za-z0-9_]{20,}\b/ },
  { label: "OpenAI-style API key", pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/ },
  { label: "OAuth token", pattern: /\bya29\.[A-Za-z0-9_-]{20,}\b/ },
  { label: "Slack token", pattern: /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/ },
  {
    label: "env secret assignment",
    pattern:
      /\b(?:YANDEX|GOOGLE|CRM|BEGET|DEPLOY|VERCEL|NETLIFY|API|WEBHOOK)[A-Z0-9_]*(?:TOKEN|SECRET|KEY|PASSWORD|URL)[^\S\r\n]*[:=][^\S\r\n]*["']?(?!$|["']|false\b|true\b|00000000\b|stub\b|local\b|placeholder\b|REPLACE_ME\b|your_|process\.env|secrets\.)[A-Za-z0-9_:/?&%.-]{16,}/i
  }
]);

for (const match of secretMatches) {
  fail(`${match.label} matched in ${match.file}`);
}

const secretFilesChecked = secretScanFiles().map(rel).sort();
const runtimeFilesChecked = activeRuntimeFiles().map(rel).sort();
const proof = {
  status: issues.length === 0 ? "passed" : "failed",
  timestamp: new Date().toISOString(),
  git: {
    branch: gitValue("git branch --show-current"),
    commit: gitValue("git rev-parse --short HEAD")
  },
  envExamplePath: ".env.example",
  publicLiveAllowed: false,
  analytics: {
    mode: "stub",
    enabled: false
  },
  metrika: {
    enabled: false,
    id: "stub",
    rawId: env.get("NEXT_PUBLIC_YANDEX_METRIKA_ID") ?? ""
  },
  webmasterPlaceholders: {
    yandex: env.get("NEXT_PUBLIC_YANDEX_WEBMASTER_VERIFICATION") ?? "",
    google: env.get("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION") ?? ""
  },
  crmForms: {
    enabled: false,
    webhookConfigured: false
  },
  uploads: {
    enabled: false
  },
  messaging: {
    enabled: false
  },
  stagingIndexingAllowed: false,
  realEnvFilesCommitted: trackedForbiddenEnvFiles,
  secretsScan: {
    status: secretMatches.length === 0 ? "passed" : "failed",
    filesCheckedCount: secretFilesChecked.length,
    checkedAreas: [
      ".env.example",
      ".github/workflows",
      "app",
      "components",
      "lib",
      "next.config.ts",
      "package.json",
      "public",
      "scripts",
      "server"
    ]
  },
  runtimeScan: {
    status: activeMatches.length === 0 ? "passed" : "failed",
    filesCheckedCount: runtimeFilesChecked.length,
    checkedAreas: ["app", "components", "lib", "public", "server", "package.json", "next.config.ts", "out"]
  },
  transport: {
    http3: "BLOCKED_BY_DEFAULT",
    quic: "BLOCKED_BY_DEFAULT",
    udp443: "BLOCKED_BY_DEFAULT",
    h3AltSvc: "BLOCKED_BY_DEFAULT"
  },
  releaseVerdict: "GO_WITH_CONDITIONS",
  publicLiveAllowed: false,
  issues
};

writeJson(proofFile, proof);

if (issues.length > 0) {
  console.error("Staging environment contract failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  console.error(`Proof: ${rel(proofFile)}`);
  process.exit(1);
}

console.log("PASS staging env contract: safe env defaults, placeholders, disabled integrations, secrets scan and transport guard verified.");
console.log(`Proof: ${rel(proofFile)}`);
