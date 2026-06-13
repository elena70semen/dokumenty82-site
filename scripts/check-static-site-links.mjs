#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const sitemapPath = path.join(root, "public/sitemap.xml");
const siteHost = "https://dokumenty82.ru";
const issues = [];
const expectedBreadcrumbParents = {
  "/otvet-na-trebovanie-ifns/": "/srochnye-voprosy/",
  "/deklaraciya-usn/": "/otchetnost/",
  "/otvet-na-zapros-banka/": "/bank-i-115-fz/",
  "/dokumenty-dlya-banka-115-fz/": "/bank-i-115-fz/",
  "/yuridicheskiy-adres-simferopol/": "/adres-egryul-direktor/",
  "/nedostovernost-yuridicheskogo-adresa/": "/adres-egryul-direktor/",
  "/smena-yuridicheskogo-adresa-ooo/": "/adres-egryul-direktor/",
  "/smena-direktora-ooo/": "/adres-egryul-direktor/",
  "/srochnoe-oformlenie-sotrudnikov/": "/kadry/",
  "/perehod-na-ausn/": "/nalogi-i-rezhimy/",
  "/nulevaya-otchetnost-ooo/": "/otchetnost/",
  "/nulevaya-otchetnost-ip/": "/otchetnost/",
  "/otchetnost-elektronno/": "/otchetnost/",
  "/vosstanovlenie-buhucheta/": "/otchetnost/",
  "/buhgalterskoe-soprovozhdenie-ooo/": "/soprovozhdenie/",
  "/buhgalterskoe-soprovozhdenie-ip/": "/soprovozhdenie/",
  "/kadrovoe-soprovozhdenie/": "/kadry/",
  "/registraciya-ooo/": "/registraciya-i-likvidaciya/",
  "/registraciya-ip/": "/registraciya-i-likvidaciya/",
  "/likvidaciya-ooo/": "/registraciya-i-likvidaciya/",
  "/ausn-krym/": "/nalogi-i-rezhimy/",
  "/raschet-nalogovoy-nagruzki/": "/nalogi-i-rezhimy/",
  "/nds-pri-usn-2026/": "/nalogi-i-rezhimy/"
};
const forbiddenStructuredDataPattern =
  /"@type"\s*:\s*"(?:Review|AggregateRating|Rating)"|"(?:priceRange|openingHours|openingHoursSpecification|legalName|taxID|vatID|sameAs|offers|potentialAction)"\s*:/i;

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function assert(condition, message) {
  if (!condition) issues.push(message);
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

function htmlFileForRoute(route) {
  return candidateFilesForRoute(route).find((file) => fs.existsSync(file)) ?? null;
}

function routeToCanonical(route) {
  if (route === "/") return `${siteHost}/`;
  if (route === "/policy") return `${siteHost}/policy`;
  return `${siteHost}${route}`;
}

function stripTags(value) {
  return decodeHtml(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(html) {
  return decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMetaDescription(html) {
  const direct = html.match(/<meta\b(?=[^>]*\bname=["']description["'])(?=[^>]*\bcontent=["']([^"']*)["'])[^>]*>/i);
  const reverse = html.match(/<meta\b(?=[^>]*\bcontent=["']([^"']*)["'])(?=[^>]*\bname=["']description["'])[^>]*>/i);
  return decodeHtml((direct ?? reverse)?.[1] ?? "").replace(/\s+/g, " ").trim();
}

function extractCanonical(html) {
  return decodeHtml(html.match(/<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/i)?.[1] ?? "");
}

function extractH1(html) {
  const matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  return {
    count: matches.length,
    text: stripTags(matches[0]?.[1] ?? "")
  };
}

function parseJsonLd(html, sourceFile) {
  const scripts = [...html.matchAll(/<script\b(?=[^>]*type=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi)].map(
    (match) => match[1].trim()
  );
  const parsed = [];

  for (const script of scripts) {
    try {
      parsed.push(JSON.parse(script));
    } catch (error) {
      issues.push(`${path.relative(root, sourceFile)} has invalid JSON-LD: ${error.message}`);
    }
  }

  return { scripts, parsed };
}

function flattenJsonLd(items) {
  return items.flatMap((item) => {
    if (Array.isArray(item)) return flattenJsonLd(item);
    if (item && typeof item === "object" && Array.isArray(item["@graph"])) return flattenJsonLd(item["@graph"]);
    return [item];
  });
}

function jsonLdTypes(items) {
  return flattenJsonLd(items).flatMap((item) => {
    const type = item && typeof item === "object" ? item["@type"] : null;
    return Array.isArray(type) ? type : type ? [type] : [];
  });
}

function findBreadcrumbList(items) {
  return flattenJsonLd(items).find((item) => item && typeof item === "object" && item["@type"] === "BreadcrumbList");
}

function itemToRoute(item) {
  if (!item || typeof item !== "object") return null;
  const route = normalizeInternalPath(String(item.item ?? ""));
  return route;
}

function addUniqueOwner(map, value, route, label) {
  if (!value) return;
  const owner = map.get(value);
  if (owner) issues.push(`duplicate ${label}: ${owner} and ${route}: ${value}`);
  map.set(value, route);
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

const titleOwners = new Map();
const descriptionOwners = new Map();
const h1Owners = new Map();

for (const loc of sitemapLocs) {
  const route = normalizeInternalPath(loc);
  if (!route) continue;

  const file = htmlFileForRoute(route);
  assert(Boolean(file), `sitemap route missing rendered HTML file: ${route}`);
  if (!file) continue;

  const html = read(file);
  const rel = path.relative(root, file);
  const title = extractTitle(html);
  const description = extractMetaDescription(html);
  const canonical = extractCanonical(html);
  const h1 = extractH1(html);
  const jsonLd = parseJsonLd(html, file);
  const types = jsonLdTypes(jsonLd.parsed);
  const rawJsonLd = jsonLd.scripts.join("\n");

  assert(Boolean(title), `${rel} missing <title>.`);
  assert(Boolean(description), `${rel} missing meta description.`);
  assert(h1.count === 1, `${rel} must have exactly one H1; found ${h1.count}.`);
  assert(Boolean(h1.text), `${rel} missing visible H1 text.`);
  assert(canonical === routeToCanonical(route), `${rel} canonical mismatch: expected ${routeToCanonical(route)}, got ${canonical || "MISSING"}.`);
  assert(!forbiddenStructuredDataPattern.test(rawJsonLd), `${rel} contains forbidden structured data property/type.`);

  addUniqueOwner(titleOwners, title, route, "title");
  addUniqueOwner(descriptionOwners, description, route, "description");
  addUniqueOwner(h1Owners, h1.text, route, "H1");

  if (route === "/") {
    assert(types.includes("WebSite"), "homepage must include WebSite structured data.");
    assert(types.includes("ProfessionalService"), "homepage must include safe ProfessionalService structured data.");
    continue;
  }

  const breadcrumb = findBreadcrumbList(jsonLd.parsed);
  assert(Boolean(breadcrumb), `${rel} missing BreadcrumbList structured data.`);
  if (!breadcrumb || typeof breadcrumb !== "object") continue;

  const items = Array.isArray(breadcrumb.itemListElement) ? breadcrumb.itemListElement : [];
  const itemRoutes = items.map(itemToRoute);
  assert(itemRoutes[0] === "/", `${rel} BreadcrumbList must start at home.`);
  assert(itemRoutes[itemRoutes.length - 1] === route, `${rel} BreadcrumbList must end at current canonical route.`);

  const expectedParent = expectedBreadcrumbParents[route];
  if (expectedParent) {
    assert(items.length >= 3, `${rel} BreadcrumbList must include home, parent hub and current route.`);
    assert(itemRoutes[1] === expectedParent, `${rel} BreadcrumbList parent mismatch: expected ${expectedParent}, got ${itemRoutes[1] ?? "MISSING"}.`);
  } else {
    assert(items.length >= 2, `${rel} BreadcrumbList must include home and current route.`);
  }
}

if (issues.length > 0) {
  console.error("Static export link check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`PASS static export links/SEO: ${htmlFiles.length} HTML files checked, ${sitemapLocs.length} sitemap URLs verified.`);
