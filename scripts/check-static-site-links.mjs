#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const sitemapPath = path.join(root, "public/sitemap.xml");
const siteHost = "https://dokumenty82.ru";
const issues = [];

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full);
    return full;
  });
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function normalizeInternalPath(value) {
  const raw = decodeHtml(value.trim());

  if (!raw || raw.startsWith("#")) return null;
  if (/^(tel:|mailto:|sms:|javascript:|data:|blob:)/i.test(raw)) return null;

  let href = raw;

  if (/^https?:\/\//i.test(href)) {
    if (!href.startsWith(`${siteHost}/`) && href !== siteHost) return null;
    href = href.replace(siteHost, "") || "/";
  }

  if (!href.startsWith("/")) return null;

  const withoutHash = href.split("#")[0];
  const withoutQuery = withoutHash.split("?")[0];

  if (!withoutQuery) return "/";
  return withoutQuery;
}

function candidateFilesForRoute(route) {
  if (route === "/") return [path.join(outDir, "index.html")];

  const clean = route.replace(/^\/+|\/+$/g, "");
  if (!clean) return [path.join(outDir, "index.html")];

  return [path.join(outDir, clean, "index.html"), path.join(outDir, `${clean}.html`), path.join(outDir, clean)];
}

function routeExists(route) {
  return candidateFilesForRoute(route).some((file) => fs.existsSync(file));
}

function isAssetPath(route) {
  return /\.[a-z0-9]{2,8}$/i.test(route) || route.startsWith("/_next/") || route.startsWith("/assets/");
}

function assetExists(route) {
  const clean = route.replace(/^\/+/, "");
  return fs.existsSync(path.join(outDir, clean));
}

function checkReference(sourceFile, value) {
  const route = normalizeInternalPath(value);
  if (!route) return;

  if (isAssetPath(route)) {
    if (!assetExists(route)) {
      issues.push(`${path.relative(root, sourceFile)} references missing asset ${route}`);
    }
    return;
  }

  if (!routeExists(route)) {
    issues.push(`${path.relative(root, sourceFile)} references missing route ${route}`);
  }
}

if (!fs.existsSync(outDir)) {
  console.error("Missing out/. Run `npm run build` before `npm run check:static-links`.");
  process.exit(1);
}

const htmlFiles = listFiles(outDir).filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  const html = read(file);
  const hrefs = [...html.matchAll(/\bhref=["']([^"']+)["']/gi)].map((match) => match[1]);
  const srcs = [...html.matchAll(/\bsrc=["']([^"']+)["']/gi)].map((match) => match[1]);

  for (const href of hrefs) checkReference(file, href);
  for (const src of srcs) checkReference(file, src);
}

const sitemapText = read(sitemapPath);
const sitemapLocs = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeHtml(match[1]));

for (const loc of sitemapLocs) {
  if (!loc.startsWith(siteHost)) {
    issues.push(`sitemap loc outside canonical host: ${loc}`);
    continue;
  }

  const route = normalizeInternalPath(loc);
  if (route && !routeExists(route)) {
    issues.push(`sitemap links to missing rendered route ${route}`);
  }
}

const heldRoutes = ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/", "/faq/", "/internal/graphics-proof/", "/internal/visual-detail-kit/"];
const sitemapSet = new Set(sitemapLocs.map((loc) => normalizeInternalPath(loc)).filter(Boolean));

for (const route of heldRoutes) {
  if (sitemapSet.has(route)) {
    issues.push(`held/noindex route must not be present in sitemap: ${route}`);
  }
}

if (issues.length > 0) {
  console.error("Static export link check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`PASS static export links: ${htmlFiles.length} HTML files checked, ${sitemapLocs.length} sitemap URLs verified.`);
