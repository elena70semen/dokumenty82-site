#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const files = {
  content: path.join(root, "lib/content.ts"),
  routes: path.join(root, "lib/routes.ts"),
  flags: path.join(root, "lib/feature-flags.ts"),
  sitemap: path.join(root, "public/sitemap.xml"),
  blog: path.join(root, "app/blog/page.tsx"),
  faq: path.join(root, "app/faq/page.tsx"),
  policy: path.join(root, "app/policy/page.tsx"),
  footer: path.join(root, "components/Footer.tsx")
};

const requiredFiles = Object.entries(files);
const issues = [];

for (const [label, file] of requiredFiles) {
  if (!fs.existsSync(file)) {
    issues.push(`Missing ${label}: ${path.relative(root, file)}`);
  }
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

const contentText = read(files.content);
const routesText = read(files.routes);
const flagsText = read(files.flags);
const sitemapText = read(files.sitemap);
const blogText = read(files.blog);
const faqText = read(files.faq);
const policyText = read(files.policy);
const footerText = read(files.footer);

const sitemapLocs = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

function expectText(label, text, pattern, message) {
  if (!pattern.test(text)) {
    issues.push(`${label}: ${message}`);
  }
}

expectText("content", contentText, /slug:\s*"nedostovernost-yuridicheskogo-adresa"/, "missing approved P0 route content");
expectText("content", contentText, /primaryCtaLabel:\s*cta\.docs/, "missing show-documents primary collector for address unreliability route");
expectText("routes", routesText, /path:\s*"\/policy"/, "missing /policy in route manifest");
expectText("routes", routesText, /"\/nedostovernost-yuridicheskogo-adresa\/"/, "missing address unreliability route in manifest");
expectText("routes", routesText, /path:\s*"\/blog\/"[\s\S]*?APPROVED_IN_ROUTE_REGISTRY[\s\S]*?includeInSitemap:\s*false[\s\S]*?indexing:\s*"noindex"/, "missing approved noindex handling for /blog/");
expectText("routes", routesText, /path:\s*"\/blog\/obnovleniya-fns\/"[\s\S]*?APPROVED_IN_ROUTE_REGISTRY[\s\S]*?includeInSitemap:\s*false[\s\S]*?indexing:\s*"noindex"/, "missing approved noindex handling for /blog/obnovleniya-fns/");
expectText("routes", routesText, /path:\s*"\/blog\/razbory\/"[\s\S]*?APPROVED_IN_ROUTE_REGISTRY[\s\S]*?includeInSitemap:\s*false[\s\S]*?indexing:\s*"noindex"/, "missing approved noindex handling for /blog/razbory/");
expectText("routes", routesText, /path:\s*"\/faq\/"[\s\S]*?ROUTE_REGISTRY_REVIEW_REQUIRED[\s\S]*?indexing:\s*"noindex"/, "missing noindex/review handling for /faq/");
expectText("routes", routesText, /path:\s*"\/internal\/graphics-proof\/"[\s\S]*?ROUTE_REGISTRY_REVIEW_REQUIRED[\s\S]*?indexing:\s*"noindex"/, "missing noindex/review handling for /internal/graphics-proof/");
expectText("blog", blogText, /robots:\s*{[\s\S]*?index:\s*false[\s\S]*?follow:\s*true/, "missing noindex metadata");
expectText("faq", faqText, /robots:\s*{[\s\S]*?index:\s*false[\s\S]*?follow:\s*true/, "missing noindex metadata");
if (!/canonical:\s*"\/policy"/.test(policyText) && !/<link\s+rel="canonical"\s+href=\{`\$\{site\.domain\}\/policy`\}/.test(policyText)) {
  issues.push("policy: missing canonical /policy");
}
expectText("policy", policyText, /<h1[\s\S]*?Политика конфиденциальности и обработки данных[\s\S]*?<\/h1>/, "missing visible policy H1");
expectText("footer", footerText, /href="\/policy"/, "missing visible /policy footer link");

const requiredSitemapLocs = [
  "https://dokumenty82.ru/policy",
  "https://dokumenty82.ru/nedostovernost-yuridicheskogo-adresa/"
];

for (const loc of requiredSitemapLocs) {
  if (!sitemapLocs.includes(loc)) {
    issues.push(`sitemap: missing ${loc}`);
  }
}

const forbiddenSitemapLocs = [
  "https://dokumenty82.ru/blog/",
  "https://dokumenty82.ru/blog/obnovleniya-fns/",
  "https://dokumenty82.ru/blog/razbory/",
  "https://dokumenty82.ru/faq/",
  "https://dokumenty82.ru/blog",
  "https://dokumenty82.ru/blog/obnovleniya-fns",
  "https://dokumenty82.ru/blog/razbory",
  "https://dokumenty82.ru/faq",
  "https://dokumenty82.ru/internal/graphics-proof/",
  "https://dokumenty82.ru/internal/graphics-proof"
];

for (const loc of forbiddenSitemapLocs) {
  if (sitemapLocs.includes(loc)) {
    issues.push(`sitemap: unapproved route must be excluded: ${loc}`);
  }
}

if (/path:\s*"\/novosti\/?"|href=["']\/novosti\/?["']|<loc>https:\/\/dokumenty82\.ru\/novosti\/?<\/loc>/.test(`${routesText}\n${sitemapText}\n${blogText}`)) {
  issues.push("forbidden /novosti/ public route found");
}

if (/path:\s*"\/news\/?"|href=["']\/news\/?["']|<loc>https:\/\/dokumenty82\.ru\/news\/?<\/loc>/.test(`${routesText}\n${sitemapText}\n${blogText}`)) {
  issues.push("forbidden /news/ public route found");
}

const requiredClosedFlags = [
  "formsLive",
  "crmEnabled",
  "crmSuccessEnabled",
  "paidTrafficAllowed",
  "maxEnabled",
  "telegramEnabled",
  "messagingRevealEnabled",
  "mapEnabled",
  "cookieNoticeEnabled"
];

for (const flag of requiredClosedFlags) {
  const pattern = new RegExp(`${flag}:\\s*false`);
  if (!pattern.test(flagsText)) {
    issues.push(`feature-flags: ${flag} must default to false`);
  }
}

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".next" || entry.name === "node_modules" || entry.name === "out" || entry.name.startsWith(".")) {
      return [];
    }

    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return listFiles(full);
    }

    return full;
  });
}

const textFiles = listFiles(root).filter((file) => /\.(ts|tsx|js|mjs|json|xml|txt|md|css)$/i.test(file));

const forbiddenPublicPhrases =
  /официальный центр|при налоговой|партн[её]р ФНС|центр ФНС|официальный представитель|100% результат|гарантируем|без отказа|срочно за 1 день/i;
const telegramMaxLinks = /t\.me\/|telegram\.me\/|max:\/\//i;
const uploadInputs = /type=["']file["']|type:\s*["']file["']/i;
const secretLike = /OPENAI_API_KEY|sk-[A-Za-z0-9]|token=|secret=|webhook/i;

for (const file of textFiles) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  if (rel.startsWith("scripts/") || rel.startsWith("lib/pricing/") || rel.startsWith("evidence/") || rel.startsWith("docs/")) {
    continue;
  }

  const text = read(file);

  if (forbiddenPublicPhrases.test(text)) {
    issues.push(`forbidden phrase in ${rel}`);
  }

  if (telegramMaxLinks.test(text)) {
    issues.push(`final Telegram/MAX deep link found in ${rel}`);
  }

  if (uploadInputs.test(text)) {
    issues.push(`public upload input found in ${rel}`);
  }

  if (secretLike.test(text)) {
    issues.push(`secret-like token/webhook text found in ${rel}`);
  }
}

const secretFiles = listFiles(root).filter((file) => /\.(env|pem|key)$/i.test(file) || path.basename(file) === ".env");
if (secretFiles.length > 0) {
  issues.push(`secret-like files found: ${secretFiles.map((file) => path.relative(root, file)).join(", ")}`);
}

if (issues.length > 0) {
  console.error("P0 semantic alignment check failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(
  `PASS P0 semantic alignment: ${sitemapLocs.length} sitemap URLs, /policy and /nedostovernost-yuridicheskogo-adresa/ included, /blog/, /faq/ and /internal/graphics-proof/ noindex/excluded, feature gates closed.`
);
