#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

const exactHomepageDescription =
  "Центр подготовки документов в Симферополе. Разберём ситуацию и подготовим документы: регистрация, отчётность, ЕГРЮЛ, юридический адрес, банк и 115-ФЗ. Офис рядом с налоговой.";

const requiredRoutes = [
  "/razbor-situacii/",
  "/otchetnost/",
  "/bank-i-115-fz/",
  "/adres-egryul-direktor/",
  "/registraciya-i-likvidaciya/",
  "/nalogi-i-rezhimy/",
  "/kadry/",
  "/soprovozhdenie/",
  "/kontakty/"
];

const requiredSituationRoutes = [
  "/razbor-situacii/",
  "/srochnye-voprosy/",
  "/otchetnost/",
  "/otvet-na-zapros-banka/",
  "/dokumenty-dlya-banka-115-fz/",
  "/adres-egryul-direktor/",
  "/registraciya-i-likvidaciya/",
  "/nalogi-i-rezhimy/",
  "/kadry/"
];

const requiredHomeBlocks = [
  "situation_selector",
  "start_path",
  "priority_tasks",
  "route_groups",
  "client_information",
  "local_trust",
  "faq",
  "final_cta"
];

function repoPath(rel) {
  return path.join(root, rel);
}

function read(rel) {
  return fs.existsSync(repoPath(rel)) ? fs.readFileSync(repoPath(rel), "utf8") : "";
}

function assert(condition, message) {
  if (!condition) issues.push(message);
}

function ensureDir(dir) {
  fs.mkdirSync(repoPath(dir), { recursive: true });
}

function writeEvidence(rel, payload) {
  ensureDir(path.dirname(rel));
  fs.writeFileSync(repoPath(rel), `${JSON.stringify(payload, null, 2)}\n`);
}

const pageText = read("app/page.tsx");
const layoutText = read("app/layout.tsx");
const homePageText = read("components/home/HomePage.tsx");
const homeFoundationText = read("components/home/HomeProductFoundation.tsx");
const homeDataText = read("lib/home/home-page-data.ts");

assert(pageText.includes(exactHomepageDescription), "Homepage metadata must preserve approved description.");
assert(layoutText.includes(exactHomepageDescription), "Root metadata must preserve approved homepage description direction.");
assert(/<HomeHero\s*\/>/.test(homePageText), "Homepage must render strong hero.");
assert(/<HomeProductFoundation\s*\/>/.test(homePageText), "Homepage must render product foundation section.");
assert(/<HomeRouteCards\s*\/>/.test(homePageText), "Homepage must render route group cards.");
assert(/<HomeProcess\s*\/>/.test(homePageText), "Homepage must render start/process path.");
assert(/<HomeLocalContact\s*\/>/.test(homePageText), "Homepage must render local trust/NAP block.");

for (const marker of requiredHomeBlocks) {
  assert(homeFoundationText.includes(marker), `Homepage product foundation missing marker: ${marker}`);
}

for (const exportName of ["homeSituationSelector", "homeStartPath", "homeClientInformation", "homeFaq"]) {
  assert(homeDataText.includes(`export const ${exportName}`), `Homepage data missing ${exportName}.`);
}

for (const route of requiredRoutes) {
  assert(homeDataText.includes(`href: "${route}"`) || homeFoundationText.includes(`href="${route}"`), `Homepage missing required route path: ${route}`);
}

for (const route of requiredSituationRoutes) {
  assert(homeDataText.includes(`href: "${route}"`), `Homepage situation selector missing route path: ${route}`);
}

assert(/primaryCta:\s*\{ label: "Разобрать ситуацию", href: "\/razbor-situacii\/" \}/.test(homeDataText), "Homepage hero primary CTA must point to /razbor-situacii/.");
assert(/phoneCta:\s*\{ label: "Позвонить", href: site\.phoneHref \}/.test(homeDataText), "Homepage hero must expose phone CTA through confirmed phone href.");
assert(/Не знаю, с чего начать/.test(homeDataText), "Homepage situation selector must include unsure-start path.");

for (const route of ["/blog/", "/blog/obnovleniya-fns/", "/blog/razbory/"]) {
  assert(!homeDataText.includes(`href: "${route}"`), `Homepage navigation must not include noindex route: ${route}`);
}

assert(!/гарантируем|100%\s*результат|отзывы|рейтинг|цена от|стоимость от/i.test(homeDataText + homeFoundationText), "Homepage contains forbidden public proof/price wording.");
assert(/публичная страница не принимает файлы|без загрузки файлов на сайте|файлы не загружаются/i.test(homeDataText + homeFoundationText), "Homepage must preserve no-upload client information.");
assert(/офис рядом с налоговой/i.test(homeDataText), "Homepage must preserve neutral local marker.");

const evidence = {
  status: issues.length === 0 ? "passed" : "failed",
  checkedAt: new Date().toISOString(),
  requiredHomeBlocks,
  requiredRoutes,
  requiredSituationRoutes,
  exactHomepageDescription,
  publicLiveAllowed: false,
  issues
};

writeEvidence("evidence/frontend/stage18-homepage-structure.json", evidence);

if (issues.length > 0) {
  console.error("Stage 18 homepage structure check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`PASS Stage 18 homepage structure: router, lead path, local trust, FAQ and final CTA verified.`);
