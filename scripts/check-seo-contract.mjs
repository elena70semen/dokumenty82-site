import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

async function findRepoRoot(startDir) {
  let dir = path.resolve(startDir);

  while (true) {
    try {
      await readFile(path.join(dir, "docs", "rebuild", "seo-contract.json"), "utf8");
      return dir;
    } catch {
      const parent = path.dirname(dir);
      if (parent === dir) {
        throw new Error("Cannot find docs/rebuild/seo-contract.json in cwd or parent directories");
      }
      dir = parent;
    }
  }
}

const root = await findRepoRoot(process.cwd());
const contractPath = path.join(root, "docs", "rebuild", "seo-contract.json");
const targetArg = process.argv[2] ?? ".";
const targetRoot = path.resolve(process.cwd(), targetArg);
const contract = JSON.parse(await readFile(contractPath, "utf8"));

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
  const rel = path.relative(targetRoot, filePath).replaceAll(path.sep, "/");
  if (rel === "index.html") return "/";
  if (rel === "404.html") return "/404.html";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
}

function attr(html, tagPattern, attrName) {
  const match = html.match(tagPattern);
  if (!match) return null;
  const attrMatch = match[0].match(new RegExp(`${attrName}=["']([^"']*)["']`, "i"));
  return attrMatch?.[1] ?? null;
}

function decodeHtml(value) {
  return (value ?? "")
    .replaceAll("&quot;", "\"")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'");
}

function textMatch(html, pattern) {
  return decodeHtml(html.match(pattern)?.[1]?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() ?? null);
}

function extractMeta(html, name) {
  return attr(html, new RegExp(`<meta\\s+[^>]*name=["']${name}["'][^>]*>`, "i"), "content");
}

function extractLink(html, rel) {
  return attr(html, new RegExp(`<link\\s+[^>]*rel=["']${rel}["'][^>]*>`, "i"), "href");
}

function normalize(value) {
  return decodeHtml(value).replace(/\s+/g, " ").trim();
}

const htmlFiles = await listHtmlFiles(targetRoot);
const pages = new Map();
for (const filePath of htmlFiles) {
  const html = await readFile(filePath, "utf8");
  pages.set(routeFromFile(filePath), {
    title: textMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: extractMeta(html, "description"),
    robots: extractMeta(html, "robots"),
    canonical: extractLink(html, "canonical"),
    h1: textMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i),
    hasMetrika109869928: html.includes("109869928"),
    hasCookieNotice: html.includes("cookie-notice") || (html.includes("cookies") && html.includes("policy")),
  });
}

const protectedPages = contract.pages.filter((page) => page.inSitemap);
const failures = [];

for (const expected of protectedPages) {
  const actual = pages.get(expected.route);
  if (!actual) {
    failures.push(`${expected.route}: missing page`);
    continue;
  }

  for (const key of ["title", "description", "robots", "canonical", "h1"]) {
    if (normalize(actual[key]) !== normalize(expected[key])) {
      failures.push(`${expected.route}: ${key} changed`);
    }
  }

  if (!actual.hasMetrika109869928) {
    failures.push(`${expected.route}: Metrika 109869928 missing`);
  }

  if (!actual.hasCookieNotice) {
    failures.push(`${expected.route}: cookie/privacy notice missing`);
  }
}

const result = {
  target: path.relative(root, targetRoot).replaceAll(path.sep, "/") || ".",
  protectedPages: protectedPages.length,
  failures: failures.length,
};

if (failures.length) {
  console.error(JSON.stringify({ ...result, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(result, null, 2));
