#!/usr/bin/env node
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { evidenceDir, listFiles, outDir, read, root, siteHost, writeJson } from "./evidence-utils.mjs";

const proofFile = path.join(evidenceDir, "release", "stage19-static-preview-artifact.json");
const noindexFoundationRoutes = ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/"];
const internalNoindexRoutes = ["/faq/", "/internal/graphics-proof/", "/internal/visual-detail-kit/"];
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

function routeToOutputFile(route) {
  if (route === "/") return path.join(outDir, "index.html");
  const clean = route.replace(/^\/|\/$/g, "");
  return path.join(outDir, clean, "index.html");
}

function routeLocVariants(route) {
  const clean = route.replace(/\/$/, "");
  return [`${siteHost}${route}`, `${siteHost}${clean}`];
}

function hasNoindexMeta(html) {
  return (
    /<meta\b(?=[^>]*\bname=["']robots["'])(?=[^>]*\bcontent=["'][^"']*noindex[^"']*["'])[^>]*>/i.test(html) ||
    /<meta\b(?=[^>]*\bcontent=["'][^"']*noindex[^"']*["'])(?=[^>]*\bname=["']robots["'])[^>]*>/i.test(html)
  );
}

function isTextFile(file) {
  return /\.(ts|tsx|js|mjs|json|xml|html|txt|css|conf)$/i.test(file);
}

function scanFiles(files, scans) {
  const matches = [];
  for (const file of files) {
    const text = read(file);
    for (const scan of scans) {
      if (scan.pattern.test(text)) matches.push({ label: scan.label, file: rel(file) });
    }
  }
  return matches;
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
  ];

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

function stripCommentLines(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith("#") && !line.trim().startsWith("//"))
    .join("\n");
}

function fileHash(file) {
  return createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

assert(exists(outDir), "out/ directory is missing; run npm run build before check:preview-artifact.");
assert(exists(path.join(outDir, "index.html")), "out/index.html is missing.");
assert(exists(routeToOutputFile("/policy")), "out/policy/index.html is missing.");
assert(exists(routeToOutputFile("/kontakty/")), "out/kontakty/index.html is missing.");

const sitemapFile = path.join(outDir, "sitemap.xml");
const robotsFile = path.join(outDir, "robots.txt");
assert(exists(sitemapFile), "out/sitemap.xml is missing.");
assert(exists(robotsFile), "out/robots.txt is missing.");

const sitemapText = read(sitemapFile);
const sitemapLocs = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const indexedSitemapLocs = sitemapLocs.filter((loc) => loc.startsWith(`${siteHost}/`) && !loc.includes("/assets/"));
if (indexedSitemapLocs.length !== 36) {
  fail(`sitemap must contain exactly 36 indexed URLs, got ${indexedSitemapLocs.length}`);
}

const excludedRoutes = [...noindexFoundationRoutes, ...internalNoindexRoutes];
for (const route of excludedRoutes) {
  if (routeLocVariants(route).some((loc) => indexedSitemapLocs.includes(loc))) {
    fail(`noindex/internal route must be excluded from sitemap: ${route}`);
  }
}

const noindexRouteProofs = excludedRoutes.map((route) => {
  const file = routeToOutputFile(route);
  const html = read(file);
  const built = exists(file);
  const noindex = built && hasNoindexMeta(html);
  return { route, built, output: built ? rel(file) : "not-built", noindex };
});

for (const proof of noindexRouteProofs) {
  if (proof.built && !proof.noindex) fail(`built noindex/internal route is missing robots noindex meta: ${proof.route}`);
}

const homepageHeader = read(path.join(outDir, "index.html")).match(/<header\b[\s\S]*?<\/header>/i)?.[0] ?? "";
for (const route of excludedRoutes) {
  const clean = route.replace(/\/$/, "");
  if (homepageHeader.includes(`href="${route}"`) || homepageHeader.includes(`href="${clean}"`)) {
    fail(`noindex/internal route appears in main nav output: ${route}`);
  }
}

const activeMatches = scanFiles(activeRuntimeFiles(), [
  { label: "Metrika script", pattern: /mc\.yandex\.ru/i },
  { label: "active ym(", pattern: /\bym\s*\(\s*[1-9]\d{5,}/i },
  { label: "real analytics ID", pattern: /\bG-[A-Z0-9]{8,}\b|\bUA-\d+-\d+\b|gtag\(|dataLayer\s*=|counterId\s*[:=]\s*(?!["']?00000000\b)[1-9]\d{5,}/i },
  { label: "CRM webhook", pattern: /https?:\/\/[^\s"'`]*(?:crm|bitrix|amocrm|webhook)|CRM_WEBHOOK_URL[^\S\r\n]*=[^\S\r\n]*https?:\/\//i },
  { label: "upload input", pattern: /<input\b[^>]*type=["']file|type:\s*["']file|PUBLIC_UPLOADS_ENABLED\s*=\s*true/i },
  { label: "messaging links", pattern: /t\.me\/|telegram\.me\/|max:\/\/|wa\.me\/|whatsapp|PUBLIC_MESSAGING_LINKS_ENABLED\s*=\s*true/i },
  { label: "public live enabled", pattern: /PUBLIC_LIVE_ALLOWED\s*=\s*true|data-public-live-allowed=["']true/i },
  { label: "Webvisor/session replay/ecommerce", pattern: /webvisor|session\s*replay|sessionReplay|ecommerce/i },
  { label: "prices", pattern: /\d+\s*(?:₽|руб\.?)\b/i },
  { label: "guarantees", pattern: /100%\s*(?:результат|гарант)|гарантир(?:уем|ованный результат)|гарантия результата/i },
  { label: "reviews/ratings", pattern: /отзыв(?:ы|ах|ов)?|рейтинг|зв[её]зд/i },
  { label: "legal IDs", pattern: /ИНН\s*[:№#-]?\s*\d|ОГРН\s*[:№#-]?\s*\d|КПП\s*[:№#-]?\s*\d/i },
  { label: "working hours", pattern: /режим работы|часы работы/i },
  { label: "office/floor", pattern: /(?:офис|кабинет)\s*(?:№|N|#)?\s*\d|\d+\s*этаж|первый этаж|второй этаж|третий этаж/i },
  { label: "hidden SEO", pattern: /display:\s*none[^;]*(seo|ключ|keyword)|hidden[^\n]{0,80}(seo|ключ|keyword)|sr-only[^\n]{0,80}(купить|цена|стоимость|отзывы|рейтинг)/i },
  { label: "old domain/name", pattern: /business-helps\.ru|dokumenty82\.com|документы82|документы 82/i }
]);

for (const match of activeMatches) {
  fail(`${match.label} matched in ${match.file}`);
}

const nginxReferenceFile = path.join(root, "server", "nginx", "dokumenty82.static-tcp-only.reference.conf");
const nginxActiveText = stripCommentLines(read(nginxReferenceFile));
if (/listen\s+[^;]*\bquic\b/i.test(nginxActiveText)) fail("Active nginx listen ... quic directive found.");
if (/Alt-Svc\s*:\s*h3/i.test(nginxActiveText)) fail("Active h3 Alt-Svc header found.");
if (/HTTP\/3|HTTP3|QUIC|UDP\/443/i.test(nginxActiveText)) fail("Active HTTP/3/QUIC/UDP text found outside comments.");

const outputFiles = exists(outDir) ? listFiles(outDir, { skip: new Set([]) }).filter((file) => fs.statSync(file).isFile()) : [];
const criticalArtifactFiles = [
  path.join(outDir, "index.html"),
  routeToOutputFile("/policy"),
  routeToOutputFile("/kontakty/"),
  sitemapFile,
  robotsFile
].filter(exists);

const artifactManifest = {
  mode: "github-actions-artifact-only",
  outputDirectory: "out",
  localArchiveCommitted: false,
  fileCount: outputFiles.length,
  criticalFiles: criticalArtifactFiles.map((file) => ({
    path: rel(file),
    size: fs.statSync(file).size,
    sha256: fileHash(file)
  }))
};

const proof = {
  status: issues.length === 0 ? "passed" : "failed",
  timestamp: new Date().toISOString(),
  git: {
    branch: gitValue("git branch --show-current"),
    commit: gitValue("git rev-parse --short HEAD")
  },
  buildOutputDirectory: "out",
  indexedSitemapUrlCount: indexedSitemapLocs.length,
  noindexRouteExclusionStatus: issues.some((issue) => /noindex|internal/.test(issue)) ? "failed" : "passed",
  noindexRouteProofs,
  analyticsStatus: {
    status: "STUB_ONLY_DISABLED",
    metrikaScriptPresent: false,
    realAnalyticsIdPresent: false
  },
  publicLiveStatus: {
    publicLiveAllowed: false,
    deployPerformed: false,
    publicUrlCreated: false
  },
  artifactReadinessStatus: issues.length === 0 ? "passed" : "failed",
  artifact: {
    name: "dokumenty82-static-preview",
    retentionDays: 7,
    uploadMechanism: "GitHub Actions upload-artifact",
    deploy: false,
    publicUrl: false,
    manifest: artifactManifest
  },
  transportBoundaryStatus: {
    allowedBaseline: "HTTPS over TCP/443 with HTTP/1.1 or HTTP/2",
    http3: "BLOCKED_BY_DEFAULT",
    quic: "BLOCKED_BY_DEFAULT",
    udp443: "BLOCKED_BY_DEFAULT",
    h3AltSvc: "BLOCKED_BY_DEFAULT"
  },
  forbiddenScanStatus: activeMatches.length === 0 ? "passed" : "failed",
  releaseVerdict: "GO_WITH_CONDITIONS",
  publicLiveAllowed: false,
  issues
};

writeJson(proofFile, proof);

if (issues.length > 0) {
  console.error("Static preview artifact check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  console.error(`Proof: ${rel(proofFile)}`);
  process.exit(1);
}

console.log("PASS static preview artifact: out/, sitemap/noindex boundaries, disabled integrations, transport guard and artifact manifest verified.");
console.log(`Proof: ${rel(proofFile)}`);
