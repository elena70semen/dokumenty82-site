import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "docs", "rebuild");
const siteUrl = "https://dokumenty82.ru";

async function listHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "_next" || entry.name === "node_modules") {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function routeFromFile(filePath) {
  const rel = path.relative(root, filePath).replaceAll(path.sep, "/");
  if (rel === "index.html") return "/";
  if (rel === "404.html") return "/404.html";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
}

function attr(html, tagPattern, attrName) {
  const match = html.match(tagPattern);
  if (!match) return null;
  const tag = match[0];
  const attrMatch = tag.match(new RegExp(`${attrName}=["']([^"']*)["']`, "i"));
  return attrMatch?.[1] ?? null;
}

function textMatch(html, pattern) {
  const match = html.match(pattern);
  if (!match) return null;
  return decodeHtml(match[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function decodeHtml(value) {
  return value
    .replaceAll("&quot;", "\"")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'");
}

function extractMeta(html, name) {
  return attr(html, new RegExp(`<meta\\s+[^>]*name=["']${name}["'][^>]*>`, "i"), "content");
}

function extractProperty(html, property) {
  return attr(html, new RegExp(`<meta\\s+[^>]*property=["']${property}["'][^>]*>`, "i"), "content");
}

function extractLink(html, rel) {
  return attr(html, new RegExp(`<link\\s+[^>]*rel=["']${rel}["'][^>]*>`, "i"), "href");
}

function parseSitemap(xml) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((urlMatch) => {
    const block = urlMatch[1];
    const get = (tag) => block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))?.[1] ?? null;
    return {
      loc: get("loc"),
      lastmod: get("lastmod"),
      changefreq: get("changefreq"),
      priority: get("priority"),
    };
  });
}

function publicPathFromLoc(loc) {
  if (!loc?.startsWith(siteUrl)) return null;
  return loc.slice(siteUrl.length) || "/";
}

const [htmlFiles, sitemapXml, robotsTxt] = await Promise.all([
  listHtmlFiles(root),
  readFile(path.join(root, "sitemap.xml"), "utf8"),
  readFile(path.join(root, "robots.txt"), "utf8"),
]);

const sitemap = parseSitemap(sitemapXml);
const sitemapPaths = new Set(sitemap.map((entry) => publicPathFromLoc(entry.loc)).filter(Boolean));

const pages = [];
for (const filePath of htmlFiles.sort()) {
  const html = await readFile(filePath, "utf8");
  const route = routeFromFile(filePath);
  const rel = path.relative(root, filePath).replaceAll(path.sep, "/");
  pages.push({
    route,
    file: rel,
    inSitemap: sitemapPaths.has(route),
    title: textMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: extractMeta(html, "description"),
    robots: extractMeta(html, "robots"),
    canonical: extractLink(html, "canonical"),
    h1: textMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i),
    ogTitle: extractProperty(html, "og:title"),
    ogDescription: extractProperty(html, "og:description"),
    hasMetrika109869928: html.includes("109869928"),
    hasCookieNotice: html.includes("политика конфиденциальности") && html.includes("cookies"),
  });
}

const contract = {
  generatedAt: new Date().toISOString(),
  siteUrl,
  metrikaId: "109869928",
  source: "current static production snapshot in repository",
  robots: robotsTxt,
  sitemap,
  pages,
  gates: {
    preserveIndexedRoutes: true,
    preserveCanonicals: true,
    preserveTitlesAndDescriptionsUnlessApproved: true,
    preserveMetrika: true,
    preserveCookieNotice: true,
    doNotDeployRebuildWithoutParityReport: true,
  },
};

const publicPages = pages.filter((page) => page.inSitemap);
const noindexPages = pages.filter((page) => !page.inSitemap || page.robots?.includes("noindex"));
const missing = publicPages.filter((page) => !page.title || !page.description || !page.canonical || !page.h1 || !page.hasMetrika109869928);

await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, "seo-contract.json"), `${JSON.stringify(contract, null, 2)}\n`, "utf8");
await writeFile(
  path.join(outDir, "seo-contract.md"),
  [
    "# SEO Contract For Source Rebuild",
    "",
    "This file is generated from the current static production snapshot. Treat it as the do-not-break contract for the rebuild.",
    "",
    `- Site: ${siteUrl}`,
    `- Metrika: ${contract.metrikaId}`,
    `- Sitemap URLs: ${sitemap.length}`,
    `- HTML files scanned: ${pages.length}`,
    `- Public sitemap pages scanned: ${publicPages.length}`,
    `- Noindex / non-sitemap files scanned: ${noindexPages.length}`,
    `- Public pages with missing contract fields: ${missing.length}`,
    "",
    "## Protected Rules",
    "",
    "- Do not change indexed URLs without an explicit redirect and Webmaster re-crawl plan.",
    "- Do not change title, description, canonical, robots, H1, or sitemap membership without an approved SEO diff.",
    "- Keep Yandex.Metrika 109869928 and the cookie/privacy notice on public pages.",
    "- Keep the rebuild local until parity checks pass.",
    "",
    "## Sitemap Routes",
    "",
    ...sitemap.map((entry) => `- ${entry.loc}`),
    "",
    "## Missing Fields",
    "",
    ...(missing.length ? missing.map((page) => `- ${page.route}`) : ["- none"]),
    "",
  ].join("\n"),
  "utf8",
);

console.log(JSON.stringify({
  pages: pages.length,
  sitemap: sitemap.length,
  publicPages: publicPages.length,
  missing: missing.length,
  outDir: path.relative(root, outDir).replaceAll(path.sep, "/"),
}, null, 2));
