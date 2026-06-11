#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const repoRoot = fs.existsSync(path.join(root, ".git")) ? root : path.resolve(root, "..");
const siteHost = "https://dokumenty82.ru";
const issues = [];

const files = {
  routes: path.join(root, "lib/routes.ts"),
  blogNews: path.join(root, "lib/blog-news.ts"),
  sitemap: path.join(root, "public/sitemap.xml"),
  blogPage: path.join(root, "app/blog/page.tsx"),
  fnsPage: path.join(root, "app/blog/obnovleniya-fns/page.tsx"),
  explainerPage: path.join(root, "app/blog/razbory/page.tsx")
};

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function routeBlock(routesText, route) {
  const pattern = new RegExp(`{[\\s\\S]*?path:\\s*"${escapeRegExp(route)}"[\\s\\S]*?}`, "m");
  return routesText.match(pattern)?.[0] ?? "";
}

function expect(condition, message) {
  if (!condition) issues.push(message);
}

for (const [label, file] of Object.entries(files)) {
  expect(fs.existsSync(file), `Missing ${label}: ${path.relative(root, file)}`);
}

const routesText = read(files.routes);
const blogNewsText = read(files.blogNews);
const sitemapText = read(files.sitemap);
const appText = [read(files.blogPage), read(files.fnsPage), read(files.explainerPage)].join("\n");
const sitemapLocs = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const plannedRoutes = ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/"];

for (const route of plannedRoutes) {
  const block = routeBlock(routesText, route);
  expect(block, `Route manifest missing planned blog/news route: ${route}`);
  expect(/sourceStatus:\s*"APPROVED_IN_ROUTE_REGISTRY"/.test(block), `Route is not approved as planned content: ${route}`);
  expect(/approvedInRouteRegistry:\s*true/.test(block), `Route is not marked approved in registry: ${route}`);
  expect(/indexing:\s*"noindex"/.test(block), `Route must remain noindex in this PR: ${route}`);
  expect(/includeInSitemap:\s*false/.test(block), `Route must remain excluded from sitemap in this PR: ${route}`);
  expect(!sitemapLocs.includes(`${siteHost}${route}`), `Noindex blog/news route leaked into sitemap: ${route}`);
}

const forbiddenRoutePatterns = [
  /path:\s*"\/novosti\/?"/,
  /path:\s*"\/news\/?"/,
  /href=["']\/novosti\/?["']/,
  /href=["']\/news\/?["']/
];

for (const pattern of forbiddenRoutePatterns) {
  expect(!pattern.test(routesText), `Forbidden public route/link appears in route manifest: ${pattern}`);
  expect(!pattern.test(appText), `Forbidden public route/link appears in app pages: ${pattern}`);
}

expect(!sitemapLocs.some((loc) => /\/novosti\/?$|\/news\/?$/.test(loc)), "Forbidden public /novosti/ or /news/ leaked into sitemap.");
expect(!fs.existsSync(path.join(root, "app/novosti")), "Forbidden app route exists: code/app/novosti");
expect(!fs.existsSync(path.join(root, "app/news")), "Forbidden app route exists: code/app/news");

const requiredFalseFlags = [
  "blogNewsEnabled",
  "fnsMonitoringEnabled",
  "liveFetchEnabled",
  "autoDraftEnabled",
  "autoRewriteEnabled",
  "autoValidationEnabled",
  "autoPublicationEnabled",
  "blogNewsIndexingEnabled",
  "newsSitemapEnabled",
  "fnsImagesEnabled",
  "serverSchedulerEnabled",
  "rollbackEnabled",
  "analyticsEnabled"
];

for (const flag of requiredFalseFlags) {
  expect(new RegExp(`${flag}:\\s*false`).test(blogNewsText), `Blog/news feature flag must default false: ${flag}`);
}

expect(/hosts:\s*\[\s*"nalog\.gov\.ru"\s*\]/.test(blogNewsText), "FNS source allowlist must use nalog.gov.ru host only.");
expect(!/fetch\s*\(\s*["'`]https?:\/\/(?:www\.)?nalog\.gov\.ru/i.test(`${blogNewsText}\n${appText}`), "Live FNS fetch call found.");
expect(!/OPENAI_API_KEY|sk-[A-Za-z0-9]|token=|secret=|webhook/i.test(`${blogNewsText}\n${appText}`), "Secret-like provider text found in blog/news code.");
expect(!/t\.me\/|telegram\.me\/|max:\/\//i.test(`${blogNewsText}\n${appText}`), "Final Telegram/MAX deep link found in blog/news code.");
expect(!/<input\b[^>]*\btype=["']file["']|type:\s*["']file["']/i.test(appText), "Public upload input found in blog/news pages.");
expect(!/www\.nalog\.gov\.ru.*<p>|ФНС России.*предупреждает.*налогоплательщиков/is.test(`${blogNewsText}\n${appText}`), "Full copied FNS sample text appears in blog/news code.");
expect(!/nalog\.gov\.ru[\s\S]*?\.(png|jpe?g|webp|svg)/i.test(`${blogNewsText}\n${appText}`), "FNS image reference found in blog/news code.");
expect(!/PUBLIC_READY|LAUNCH_READY|READY_TO_PUBLISH/i.test(`${blogNewsText}\n${appText}`), "Public launch approval signal found in blog/news code.");

function listFiles(dir, skip = new Set([".git", "node_modules", ".next", "out", "dist"])) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (skip.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full, skip);
    return full;
  });
}

const secretFiles = listFiles(repoRoot).filter((file) => path.basename(file) === ".env" || /\.(pem|key)$/i.test(file));
expect(secretFiles.length === 0, `Secret-like files found: ${secretFiles.map((file) => path.relative(repoRoot, file)).join(", ")}`);

if (issues.length > 0) {
  console.error("FNS blog/news foundation check failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("PASS FNS blog/news foundation: planned routes noindex/excluded, flags closed, no live fetch, no forbidden public routes.");
