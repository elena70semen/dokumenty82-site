#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

const evidenceFiles = [
  "evidence/seo/stage18-semantic-seo-quality.json",
  "evidence/ux/stage18-page-blocks-and-lead-path.json",
  "evidence/frontend/stage18-layout-foundation.json",
  "evidence/frontend/stage18-homepage-structure.json"
];

const noindexRoutes = ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/"];

function repoPath(rel) {
  return path.join(root, rel);
}

function read(rel) {
  return fs.existsSync(repoPath(rel)) ? fs.readFileSync(repoPath(rel), "utf8") : "";
}

function readJson(rel) {
  return JSON.parse(read(rel));
}

function assert(condition, message) {
  if (!condition) issues.push(message);
}

function ensureDir(dir) {
  fs.mkdirSync(repoPath(dir), { recursive: true });
}

function writeEvidence(rel, payload) {
  ensureDir(path.dirname(rel));
  fs.writeFileSync(repoPath(rel), `${JSON.stringify(payload, null, 2)}\n`);
}

function listFiles(dir) {
  const full = repoPath(dir);
  if (!fs.existsSync(full)) return [];

  return fs.readdirSync(full, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(full, entry.name);
    const rel = path.relative(root, file);
    if (entry.isDirectory()) {
      if ([".git", ".next", "node_modules", "out"].includes(entry.name)) return [];
      if (rel.startsWith(`lib${path.sep}pricing`) || rel.startsWith(`lib${path.sep}brand`)) return [];
      return listFiles(rel);
    }
    return /\.(ts|tsx|js|jsx|mjs|conf|xml|txt)$/i.test(entry.name) ? [file] : [];
  });
}

const semanticPayload = readJson("lib/seo/semantic-route-data.json");
const semanticRoutes = Array.isArray(semanticPayload.routes) ? semanticPayload.routes : [];
const indexedRoutes = semanticRoutes.filter((route) => route.indexed);
const sitemapText = read("public/sitemap.xml");
const robotsText = read("public/robots.txt");
const featureFlagsText = read("lib/feature-flags.ts");
const blogNewsText = read("lib/blog-news.ts");
const packageText = read("package.json");
const publicFoundationDocs = [
  "docs/content/stage-18b-page-block-copy-and-leadgen-architecture-v1.md",
  "docs/frontend/stage-18c-layout-foundation-and-component-system-v1.md",
  "docs/content/stage-18d-homepage-structure-and-content-architecture-v1.md",
  "docs/strategy/stage-18e-full-product-site-foundation-master-plan-v1.md",
  "docs/content/stage-18e-route-content-completeness-matrix-v1.md"
];

assert(semanticRoutes.length === 39, `Expected 39 approved routes; found ${semanticRoutes.length}.`);
assert(indexedRoutes.length === 36, `Expected 36 indexed routes; found ${indexedRoutes.length}.`);

for (const route of indexedRoutes) {
  assert(sitemapText.includes(`https://dokumenty82.ru${route.path}`), `Indexed route missing from sitemap: ${route.path}`);
}

for (const route of noindexRoutes) {
  assert(!sitemapText.includes(`https://dokumenty82.ru${route}`), `Noindex route found in sitemap: ${route}`);
}

assert(/User-agent:\s*\*/.test(robotsText), "robots.txt must define user-agent rules.");
assert(/Sitemap:\s*https:\/\/dokumenty82\.ru\/sitemap\.xml/.test(robotsText), "robots.txt must point to canonical sitemap.");

for (const flag of [
  "formsLive",
  "crmSuccessEnabled",
  "analyticsEnabled",
  "metricaEnabled",
  "maxEnabled",
  "telegramEnabled",
  "messagingRevealEnabled",
  "mapEnabled",
  "cookieNoticeEnabled"
]) {
  assert(new RegExp(`${flag}:\\s*false`).test(featureFlagsText), `Unsafe feature flag must remain false: ${flag}`);
}

for (const marker of [
  "liveFetchEnabled: false",
  "autoPublicationEnabled: false",
  "blogNewsIndexingEnabled: false",
  "serverSchedulerEnabled: false",
  "newsSitemapEnabled: false"
]) {
  assert(blogNewsText.includes(marker), `Noindex foundation must keep ${marker}.`);
}

for (const scriptName of ["check:page-blocks", "check:layout", "check:homepage", "check:public-foundation"]) {
  assert(packageText.includes(`"${scriptName}"`), `package.json missing script: ${scriptName}`);
}

for (const doc of publicFoundationDocs) {
  assert(fs.existsSync(repoPath(doc)), `Missing synced Stage 18 product foundation doc: ${doc}`);
  assert(/PUBLIC_LIVE_ALLOWED\s*=\s*false/.test(read(doc)), `Stage 18 product foundation doc must keep public live false: ${doc}`);
}

for (const evidence of evidenceFiles) {
  assert(fs.existsSync(repoPath(evidence)), `Missing prerequisite evidence file: ${evidence}`);
  if (fs.existsSync(repoPath(evidence))) {
    try {
      assert(readJson(evidence).status === "passed", `Evidence file is not passed: ${evidence}`);
    } catch (error) {
      issues.push(`Evidence file is not valid JSON: ${evidence}: ${error.message}`);
    }
  }
}

const runtimeText = listFiles(".")
  .filter((file) => {
    const rel = path.relative(root, file);
    return (
      rel.startsWith("app/") ||
      rel.startsWith("components/") ||
      rel.startsWith("lib/") ||
      rel.startsWith("public/") ||
      rel.startsWith("server/")
    );
  })
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

const unsafePatterns = [
  { pattern: /PUBLIC_LIVE_ALLOWED\s*=\s*true/i, message: "PUBLIC_LIVE_ALLOWED true marker found." },
  { pattern: /Alt-Svc:\s*h3|listen\s+[^;]*quic|http3\s+on|quic_retry\s+on/i, message: "Active HTTP/3/QUIC enablement found." },
  { pattern: /<input\b[^>]*\btype=["']file["']|type:\s*["']file["']/i, message: "Public upload input found." },
  { pattern: /t\.me\/|telegram\.me\/|max:\/\//i, message: "Messaging deep link found." },
  { pattern: /sk-[A-Za-z0-9]|OPENAI_API_KEY|secret=|token=/i, message: "Secret-like runtime text found." },
  { pattern: /гарантируем|100%\s*результат|без отказа|срочно за 1 день/i, message: "Forbidden guarantee/result wording found." },
  { pattern: /ИНН\s*\d|ОГРН\s*\d/i, message: "Legal identifier found in runtime public source." },
  { pattern: /пн-пт|понедельник|режим работы|часы работы/i, message: "Working-hours wording found in runtime public source." }
];

for (const { pattern, message } of unsafePatterns) {
  assert(!pattern.test(runtimeText), message);
}

const evidence = {
  status: issues.length === 0 ? "passed" : "failed",
  checkedAt: new Date().toISOString(),
  approvedRoutes: semanticRoutes.length,
  indexedRoutes: indexedRoutes.length,
  noindexRoutes,
  evidenceInputs: evidenceFiles,
  publicLiveAllowed: false,
  launchVerdict: "NOT_PUBLIC_LIVE_READY",
  issues
};

writeEvidence("evidence/public-foundation/stage18-public-site-foundation.json", evidence);

if (issues.length > 0) {
  console.error("Stage 18 public site foundation check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`PASS Stage 18 public site foundation: 39 routes, 36 indexed routes, noindex boundaries and live blockers verified.`);
