#!/usr/bin/env node
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const proofDir = path.join(root, "release-proof");
const manifestPath = path.join(proofDir, "artifact-manifest.json");

const keyRoutes = [
  "/",
  "/razbor-situacii/",
  "/kontakty/",
  "/policy",
  "/otchetnost/",
  "/bank-i-115-fz/",
  "/otvet-na-trebovanie-ifns/",
  "/deklaraciya-usn/",
  "/otvet-na-zapros-banka/",
  "/dokumenty-dlya-banka-115-fz/",
  "/registraciya-ooo/",
  "/registraciya-ip/"
];

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(full) : [full];
  });
}

function rel(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function sha256(file) {
  if (!fs.existsSync(file)) return null;
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function checksumEntry(file) {
  const exists = fs.existsSync(file);
  return {
    path: rel(file),
    exists,
    bytes: exists ? fs.statSync(file).size : 0,
    sha256: exists ? sha256(file) : null
  };
}

function routeToHtmlFile(route) {
  if (route === "/") return path.join(outDir, "index.html");
  const clean = route.replace(/^\/+|\/+$/g, "");
  if (!clean) return path.join(outDir, "index.html");

  const indexFile = path.join(outDir, clean, "index.html");
  const flatFile = path.join(outDir, `${clean}.html`);
  return fs.existsSync(indexFile) || !fs.existsSync(flatFile) ? indexFile : flatFile;
}

function commitSha() {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;

  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return "UNKNOWN";
  }
}

function packageName() {
  const packagePath = path.join(root, "package.json");
  if (!fs.existsSync(packagePath)) return "UNKNOWN";

  try {
    return JSON.parse(fs.readFileSync(packagePath, "utf8")).name ?? "UNKNOWN";
  } catch {
    return "UNKNOWN";
  }
}

const allOutFiles = listFiles(outDir);
const htmlFiles = allOutFiles.filter((file) => file.endsWith(".html"));
const assetFiles = allOutFiles.filter((file) => !file.endsWith(".html"));

const importantFiles = [
  path.join(outDir, "index.html"),
  fs.existsSync(path.join(outDir, "robots.txt")) ? path.join(outDir, "robots.txt") : path.join(root, "public", "robots.txt"),
  fs.existsSync(path.join(outDir, "sitemap.xml")) ? path.join(outDir, "sitemap.xml") : path.join(root, "public", "sitemap.xml")
];

const manifest = {
  schemaVersion: "p0-01.release-artifact-manifest.v1",
  commitSha: commitSha(),
  generatedAt: new Date().toISOString(),
  nodeVersion: process.version,
  packageName: packageName(),
  outDir: rel(outDir),
  outDirExists: fs.existsSync(outDir),
  htmlFileCount: htmlFiles.length,
  assetFileCount: assetFiles.length,
  sitemapExists: fs.existsSync(path.join(outDir, "sitemap.xml")) || fs.existsSync(path.join(root, "public", "sitemap.xml")),
  robotsExists: fs.existsSync(path.join(outDir, "robots.txt")) || fs.existsSync(path.join(root, "public", "robots.txt")),
  importantFileChecksums: Object.fromEntries(importantFiles.map((file) => [rel(file), checksumEntry(file)])),
  keyRouteChecksums: keyRoutes.map((route) => {
    const file = routeToHtmlFile(route);
    return {
      route,
      ...checksumEntry(file)
    };
  })
};

fs.mkdirSync(proofDir, { recursive: true });
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Generated release artifact manifest: ${rel(manifestPath)}`);
