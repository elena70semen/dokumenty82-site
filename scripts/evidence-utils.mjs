import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const outDir = path.join(root, "out");
export const evidenceDir = path.join(root, "evidence");
export const siteHost = "https://dokumenty82.ru";
export const defaultBaseUrl = process.env.LOCAL_P0_BASE_URL || "http://127.0.0.1:4173";

export const p0Routes = [
  "/",
  "/razbor-situacii/",
  "/kontakty/",
  "/policy/",
  "/otvet-na-trebovanie-ifns/",
  "/otvet-na-zapros-banka/",
  "/dokumenty-dlya-banka-115-fz/",
  "/deklaraciya-usn/",
  "/nulevaya-otchetnost-ooo/",
  "/nulevaya-otchetnost-ip/",
  "/registraciya-ooo/",
  "/registraciya-ip/",
  "/yuridicheskiy-adres-simferopol/",
  "/nedostovernost-yuridicheskogo-adresa/"
];

export const formRoutes = [
  "/razbor-situacii/",
  "/kontakty/",
  "/otvet-na-trebovanie-ifns/",
  "/otvet-na-zapros-banka/",
  "/dokumenty-dlya-banka-115-fz/",
  "/deklaraciya-usn/",
  "/nulevaya-otchetnost-ooo/",
  "/nulevaya-otchetnost-ip/",
  "/yuridicheskiy-adres-simferopol/",
  "/nedostovernost-yuridicheskogo-adresa/"
];

export const screenshotRoutes = [
  { route: "/", slug: "home" },
  { route: "/razbor-situacii/", slug: "razbor-situacii" },
  { route: "/kontakty/", slug: "kontakty" },
  { route: "/policy/", slug: "policy" },
  { route: "/otvet-na-trebovanie-ifns/", slug: "otvet-na-trebovanie-ifns" },
  { route: "/otvet-na-zapros-banka/", slug: "otvet-na-zapros-banka" },
  { route: "/dokumenty-dlya-banka-115-fz/", slug: "dokumenty-dlya-banka-115-fz" },
  { route: "/nedostovernost-yuridicheskogo-adresa/", slug: "nedostovernost-yuridicheskogo-adresa" }
];

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

export function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

export function writeJson(file, data) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

export function writeText(file, text) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, text);
}

export function normalizeRoute(route) {
  if (route === "/") return "/";
  return route.endsWith("/") ? route : `${route}/`;
}

export function routeToHtmlFile(route) {
  const normalized = normalizeRoute(route);
  if (normalized === "/") return path.join(outDir, "index.html");
  const clean = normalized.replace(/^\/|\/$/g, "");
  return path.join(outDir, clean, "index.html");
}

export function routeToUrl(route, baseUrl = defaultBaseUrl) {
  return `${baseUrl.replace(/\/$/, "")}${route}`;
}

export function expectedCanonical(route) {
  if (route === "/") return `${siteHost}/`;
  if (route === "/policy" || route === "/policy/") return `${siteHost}/policy`;
  return `${siteHost}${normalizeRoute(route)}`;
}

export function decodeHtml(value) {
  return String(value)
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function stripTags(value) {
  return decodeHtml(
    String(value)
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

export function countMatches(text, pattern) {
  return [...String(text).matchAll(pattern)].length;
}

export function extractTitle(html) {
  return decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
}

export function extractMetaDescription(html) {
  return decodeHtml(
    html.match(/<meta\b(?=[^>]*\bname=["']description["'])(?=[^>]*\bcontent=["']([^"']*)["'])[^>]*>/i)?.[1] ??
      html.match(/<meta\b(?=[^>]*\bcontent=["']([^"']*)["'])(?=[^>]*\bname=["']description["'])[^>]*>/i)?.[1] ??
      ""
  ).trim();
}

export function extractCanonical(html) {
  return decodeHtml(
    html.match(/<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']*)["'])[^>]*>/i)?.[1] ??
      html.match(/<link\b(?=[^>]*\bhref=["']([^"']*)["'])(?=[^>]*\brel=["']canonical["'])[^>]*>/i)?.[1] ??
      ""
  ).trim();
}

export function extractH1Text(html) {
  return stripTags(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
}

export function attrValues(html, attr) {
  return [...String(html).matchAll(new RegExp(`${attr}=["']([^"']*)["']`, "gi"))].map((match) => decodeHtml(match[1]));
}

export function findDuplicateIds(html) {
  const ids = attrValues(html, "id");
  const seen = new Set();
  const duplicates = new Set();
  for (const id of ids) {
    if (seen.has(id)) duplicates.add(id);
    seen.add(id);
  }
  return [...duplicates];
}

export function listFiles(dir, options = {}) {
  const { skip = new Set(["node_modules", ".next", "out", ".git"]) } = options;
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (skip.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full, options);
    return full;
  });
}

export function routeSummaryLine(route, proof) {
  return `- ${route}: ${proof.passed ? "PASS" : "FAIL"}${proof.failures?.length ? ` (${proof.failures.join("; ")})` : ""}`;
}
