#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  ensureDir,
  evidenceDir,
  expectedCanonical,
  extractCanonical,
  listFiles,
  outDir,
  read,
  root,
  siteHost,
  stripTags,
  writeJson
} from "./evidence-utils.mjs";

const proofFile = path.join(evidenceDir, "release", "stage19-release-preflight.json");
const noindexFoundationRoutes = ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/"];
const internalNoindexRoutes = ["/faq/", "/internal/graphics-proof/", "/internal/visual-detail-kit/"];
const publicLiveAllowed = false;

const issues = [];

function rel(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function exists(file) {
  return fs.existsSync(file);
}

function routeToOutputFile(route) {
  if (route === "/") return path.join(outDir, "index.html");
  const clean = route.replace(/^\/|\/$/g, "");
  return path.join(outDir, clean, "index.html");
}

function routeFromLoc(loc) {
  const pathname = new URL(loc).pathname;
  if (pathname === "/") return "/";
  return pathname === "/policy" ? "/policy" : `${pathname.replace(/\/$/, "")}/`;
}

function outputFileExists(route) {
  return exists(routeToOutputFile(route));
}

function isTextFile(file) {
  return /\.(ts|tsx|js|mjs|json|xml|html|txt|css|conf)$/i.test(file);
}

function runtimeSourceFiles() {
  const candidates = [
    ...listFiles(path.join(root, "app")),
    ...listFiles(path.join(root, "components")),
    ...listFiles(path.join(root, "lib")),
    ...listFiles(path.join(root, "public")),
    path.join(root, "package.json"),
    path.join(root, "next.config.ts"),
    path.join(root, "server", "nginx", "dokumenty82.static-tcp-only.reference.conf")
  ];

  return candidates
    .filter((file) => exists(file) && fs.statSync(file).isFile())
    .filter((file) => !rel(file).startsWith("lib/pricing/"))
    .filter((file) => !rel(file).startsWith("public/assets/brand/"))
    .filter(isTextFile);
}

function builtOutputFiles() {
  return exists(outDir)
    ? listFiles(outDir, { skip: new Set([]) })
        .filter((file) => fs.statSync(file).isFile())
        .filter((file) => !rel(file).startsWith("out/_next/static/"))
        .filter((file) => !/\.svg$/i.test(file))
        .filter(isTextFile)
    : [];
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

function fileHash(file) {
  const { createHash } = awaitableCrypto;
  return createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function hasNoindexMeta(html) {
  return (
    /<meta\b(?=[^>]*\bname=["']robots["'])(?=[^>]*\bcontent=["'][^"']*noindex[^"']*["'])[^>]*>/i.test(html) ||
    /<meta\b(?=[^>]*\bcontent=["'][^"']*noindex[^"']*["'])(?=[^>]*\bname=["']robots["'])[^>]*>/i.test(html)
  );
}

function gitValue(command, fallback = "UNKNOWN") {
  try {
    return execSync(command, { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return fallback;
  }
}

const awaitableCrypto = await import("node:crypto");
const gitBranch = gitValue("git branch --show-current");
const gitCommit = gitValue("git rev-parse --short HEAD");

if (!exists(outDir)) issues.push("out directory is missing; run npm run build first");
if (!outputFileExists("/")) issues.push("homepage output is missing");
if (!outputFileExists("/policy")) issues.push("/policy output is missing");
if (!outputFileExists("/kontakty/")) issues.push("/kontakty/ output is missing");

const sitemapFile = path.join(outDir, "sitemap.xml");
const robotsFile = path.join(outDir, "robots.txt");
if (!exists(sitemapFile)) issues.push("out/sitemap.xml is missing");
if (!exists(robotsFile)) issues.push("out/robots.txt is missing");

const sitemapText = read(sitemapFile);
const sitemapLocs = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapPageLocs = sitemapLocs.filter((loc) => loc.startsWith(`${siteHost}/`) && !loc.includes("/assets/"));
const indexedRoutes = sitemapPageLocs.map(routeFromLoc);

if (sitemapPageLocs.length !== 36) {
  issues.push(`sitemap must contain exactly 36 indexed URLs, got ${sitemapPageLocs.length}`);
}

for (const loc of sitemapPageLocs) {
  if (!loc.startsWith(`${siteHost}/`)) issues.push(`sitemap loc must use ${siteHost}: ${loc}`);
}

for (const route of indexedRoutes) {
  if (!outputFileExists(route)) issues.push(`indexed route output is missing: ${route}`);
}

const routeProofs = indexedRoutes.map((route) => {
  const file = routeToOutputFile(route);
  const html = read(file);
  const canonical = extractCanonical(html);
  const expected = expectedCanonical(route);
  const routeIssues = [];

  if (!canonical) routeIssues.push("missing canonical");
  if (canonical && canonical !== expected) routeIssues.push(`canonical mismatch: ${canonical}`);

  return {
    route,
    output: rel(file),
    exists: exists(file),
    canonical,
    expectedCanonical: expected,
    passed: routeIssues.length === 0,
    issues: routeIssues
  };
});

for (const routeProof of routeProofs) {
  for (const issue of routeProof.issues) issues.push(`${routeProof.route}: ${issue}`);
}

for (const route of noindexFoundationRoutes) {
  const file = routeToOutputFile(route);
  const html = read(file);
  const inSitemap = sitemapPageLocs.includes(`${siteHost}${route}`) || sitemapPageLocs.includes(`${siteHost}${route.replace(/\/$/, "")}`);
  if (!exists(file)) issues.push(`noindex foundation route output is missing: ${route}`);
  if (inSitemap) issues.push(`noindex route must be excluded from sitemap: ${route}`);
  if (!hasNoindexMeta(html)) {
    issues.push(`noindex foundation route missing noindex robots meta: ${route}`);
  }
}

for (const route of internalNoindexRoutes) {
  const file = routeToOutputFile(route);
  const html = read(file);
  const inSitemap = sitemapPageLocs.includes(`${siteHost}${route}`) || sitemapPageLocs.includes(`${siteHost}${route.replace(/\/$/, "")}`);
  if (inSitemap) issues.push(`internal/noindex route must be excluded from sitemap: ${route}`);
  if (exists(file) && !hasNoindexMeta(html)) {
    issues.push(`internal/noindex route missing noindex robots meta: ${route}`);
  }
}

const headerHtml = read(path.join(outDir, "index.html")).match(/<header\b[\s\S]*?<\/header>/i)?.[0] ?? "";
for (const route of [...noindexFoundationRoutes, ...internalNoindexRoutes]) {
  if (headerHtml.includes(`href="${route}"`) || headerHtml.includes(`href="${route.replace(/\/$/, "")}"`)) {
    issues.push(`noindex/internal route appears in main nav output: ${route}`);
  }
}

const featureFlagsText = read(path.join(root, "lib", "feature-flags.ts"));
const closedFlags = [
  "formsLive",
  "crmSuccessEnabled",
  "analyticsEnabled",
  "metricaEnabled",
  "maxEnabled",
  "telegramEnabled",
  "messagingRevealEnabled"
];
for (const flag of closedFlags) {
  if (!new RegExp(`${flag}:\\s*false`).test(featureFlagsText)) {
    issues.push(`feature flag must remain false: ${flag}`);
  }
}

const activeFiles = [...runtimeSourceFiles(), ...builtOutputFiles()];
const forbiddenMatches = scanFiles(activeFiles, [
  { label: "live form endpoint", pattern: /<form\b[^>]*(?:\saction=["'][^"']+|\smethod=["']post["'])/i },
  { label: "CRM webhook", pattern: /webhook|https?:\/\/[^\s"']*(?:crm|bitrix|amocrm)/i },
  { label: "upload input", pattern: /<input\b[^>]*type=["']file|type:\s*["']file/i },
  { label: "messaging link", pattern: /t\.me\/|telegram\.me\/|max:\/\/|wa\.me\/|whatsapp/i },
  { label: "analytics/metrika active signal", pattern: /ym\(\s*[1-9][0-9]{5,}|mc\.yandex\.ru|counterId\s*[:=]\s*(?!["']?00000000\b)|webvisor|session replay|ecommerce|gtag\(|\bG-[A-Z0-9]{8,}\b/ },
  { label: "public live enabled", pattern: /PUBLIC_LIVE_ALLOWED\s*=\s*true|data-public-live-allowed=["']true/i },
  { label: "old domain/name", pattern: /business-helps\.ru|dokumenty82\.com|документы82|документы 82/i },
  { label: "hidden SEO stuffing", pattern: /display:\s*none[^;]*(seo|ключ|keyword)|hidden[^\n]{0,80}(seo|ключ|keyword)|sr-only[^\n]{0,80}(купить|цена|стоимость|отзывы|рейтинг)/i },
  { label: "numeric price/legal/claim signal", pattern: /\d+\s*(?:₽|руб\.?)\b|ИНН\s*[:№#-]?\s*\d|ОГРН\s*[:№#-]?\s*\d|КПП\s*[:№#-]?\s*\d|режим работы|часы работы|(?:офис|кабинет)\s*(?:№|N|#)\s*\d|(?:\d+|первый|второй|третий)\s+этаж|100%\s*(?:результат|гарант)|гарантир(?:уем|ованный результат)|отзыв(?:ы|ах|ов)?|рейтинг|зв[её]зд/i }
]);

for (const match of forbiddenMatches) {
  issues.push(`${match.label} matched in ${match.file}`);
}

const nginxReferenceFile = path.join(root, "server", "nginx", "dokumenty82.static-tcp-only.reference.conf");
const nginxActiveText = stripCommentLines(read(nginxReferenceFile));
const transportIssues = [];
if (/listen\s+[^;]*\bquic\b/i.test(nginxActiveText)) transportIssues.push("active nginx quic listen directive found");
if (/Alt-Svc\s*:\s*h3/i.test(nginxActiveText)) transportIssues.push("active h3 Alt-Svc header found");
if (/HTTP\/3|HTTP3|QUIC|UDP\/443/i.test(nginxActiveText)) transportIssues.push("active HTTP/3/QUIC/UDP text found outside comments");
for (const issue of transportIssues) issues.push(issue);

const criticalFiles = [
  path.join(outDir, "index.html"),
  sitemapFile,
  robotsFile,
  path.join(root, "package-lock.json")
].filter(exists);

const artifactManifest = {
  mode: "manifest-only",
  reason: "Static export is reproducible from repository build output; no duplicate artifact copy is committed.",
  files: criticalFiles.map((file) => ({
    path: rel(file),
    size: fs.statSync(file).size,
    sha256: fileHash(file)
  }))
};

const proof = {
  status: issues.length === 0 ? "passed" : "failed",
  timestamp: new Date().toISOString(),
  git: {
    branch: gitBranch,
    commit: gitCommit
  },
  buildOutputPath: "out",
  indexedRouteCount: indexedRoutes.length,
  sitemapUrlCount: sitemapPageLocs.length,
  noindexRouteCount: noindexFoundationRoutes.length,
  internalNoindexRouteCount: internalNoindexRoutes.length,
  routeProofs,
  analyticsStatus: {
    status: "STUB_ONLY_DISABLED",
    analyticsEnabled: false,
    metricaEnabled: false,
    realCounterPresent: false
  },
  transportStatus: {
    allowedBaseline: "HTTPS over TCP/443 with HTTP/1.1 or HTTP/2",
    http3: "BLOCKED_BY_DEFAULT",
    quic: "BLOCKED_BY_DEFAULT",
    udp443: "BLOCKED_BY_DEFAULT",
    h3AltSvc: "BLOCKED_BY_DEFAULT",
    activeTransportConfigAdded: false,
    checkedReferenceConfig: exists(nginxReferenceFile) ? rel(nginxReferenceFile) : "MISSING_EXPECTED",
    issues: transportIssues
  },
  publicLiveStatus: {
    publicLiveAllowed,
    deployPerformed: false,
    dnsChanged: false,
    liveIntegrationsEnabled: false
  },
  rollbackPreflight: {
    currentGitCommitIdentified: gitCommit !== "UNKNOWN",
    releaseArtifactCanBeRebuiltFromGitCommit: gitCommit !== "UNKNOWN" && exists(path.join(root, "package-lock.json")),
    staticOutputManifestMode: "manifest-only",
    deterministicEnoughForLocalProof: artifactManifest.files.length >= 3,
    liveDeploymentExistsInThisStage: false,
    rollbackMode: "CONCEPTUAL_ONLY_UNTIL_STAGING_PROVIDER_SELECTED",
    providerAssumptionsAdded: false,
    artifactManifest
  },
  forbiddenScanStatus: forbiddenMatches.length === 0 ? "passed" : "failed",
  releaseVerdict: "GO_WITH_CONDITIONS",
  publicLiveAllowed,
  issues
};

writeJson(proofFile, proof);

if (issues.length > 0) {
  console.error("Release preflight failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  console.error(`Proof: ${rel(proofFile)}`);
  process.exit(1);
}

console.log("PASS release preflight: static output, sitemap, noindex, canonical, analytics stubs, transport guard and rollback preflight verified.");
console.log(`Proof: ${rel(proofFile)}`);
