import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const externalProtocols = /^(https?:|mailto:|tel:)/i;
const blockedProtocols = /^(javascript:|data:|vbscript:)/i;

async function listHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listHtmlFiles(fullPath);
    if (entry.isFile() && entry.name.endsWith(".html")) return [fullPath];
    return [];
  }));
  return nested.flat();
}

function pageRoute(file, targetRoot) {
  const relative = path.relative(targetRoot, file).replaceAll("\\", "/");
  if (relative === "index.html") return "/";
  return `/${relative.replace(/\/index\.html$/, "/")}`;
}

function fileForRoute(targetRoot, route) {
  const cleanRoute = route.replace(/^\/+/, "");
  if (!cleanRoute) return path.join(targetRoot, "index.html");
  const directFile = path.join(targetRoot, cleanRoute);
  if (existsSync(directFile) && path.extname(directFile)) return directFile;
  return path.join(targetRoot, cleanRoute, "index.html");
}

function hasAnchor(html, anchor) {
  if (!anchor) return true;
  const escaped = anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b(?:id|name)=["']${escaped}["']`).test(html);
}

function collectAnchors(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref=(["'])(.*?)\1/gis)].map((match) => ({
    tag: match[0],
    href: match[2].trim()
  }));
}

function collectGlassCompactPanels(html) {
  return [...html.matchAll(/<aside\b[^>]*class=(["'])[^"']*\bglass-panel\b[^"']*\1[^>]*>[\s\S]*?<\/aside>/gi)]
    .map((match) => match[0])
    .filter((panel) => /\bcompact-list\b/.test(panel));
}

function verifyHref({ href, file, html, targetRoot, htmlByFile }) {
  if (!href) return "empty href";
  if (blockedProtocols.test(href)) return `blocked href protocol: ${href}`;
  if (/^#/.test(href)) {
    return hasAnchor(html, href.slice(1)) ? null : `missing same-page anchor: ${href}`;
  }
  if (externalProtocols.test(href)) return null;

  const [withoutQuery, hash = ""] = href.split("#");
  const route = withoutQuery.split("?")[0];
  if (!route) return null;
  if (route.startsWith("/assets/") || route === "/favicon.svg" || route === "/favicon.ico") return null;

  const targetFile = route.startsWith("/")
    ? fileForRoute(targetRoot, route)
    : path.resolve(path.dirname(file), route);

  if (!existsSync(targetFile)) return `missing internal target: ${href}`;
  if (hash) {
    const targetHtml = htmlByFile.get(targetFile) ?? "";
    if (!hasAnchor(targetHtml, hash)) return `missing target anchor: ${href}`;
  }
  return null;
}

const targetArg = process.argv[2] ?? "source/dist";
const targetRoot = path.resolve(process.cwd(), targetArg);

if (!existsSync(targetRoot)) {
  console.error(`Target directory does not exist: ${targetRoot}`);
  process.exit(1);
}

const files = await listHtmlFiles(targetRoot);
const htmlByFile = new Map();

for (const file of files) {
  htmlByFile.set(file, await readFile(file, "utf8"));
}

const failures = [];
let linkCount = 0;
let compactPanels = 0;

for (const [file, html] of htmlByFile) {
  const route = pageRoute(file, targetRoot);
  const anchors = collectAnchors(html);
  linkCount += anchors.length;

  for (const anchor of anchors) {
    const error = verifyHref({ ...anchor, file, html, targetRoot, htmlByFile });
    if (error) failures.push({ route, href: anchor.href, error });
  }

  for (const panel of collectGlassCompactPanels(html)) {
    compactPanels += 1;
    if (!/<a\b[^>]*\bhref=/i.test(panel)) {
      failures.push({ route, href: "", error: "glass compact panel has visual rows without links" });
    }
  }
}

const result = {
  checkedPages: files.length,
  checkedLinks: linkCount,
  checkedGlassCompactPanels: compactPanels,
  failures
};

console.log(JSON.stringify(result, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
