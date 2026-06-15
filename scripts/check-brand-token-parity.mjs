#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tokensPath = path.join(root, "lib/brand/brand-tokens.json");
const tsPath = path.join(root, "lib/brand/brand-tokens.ts");
const svgDir = path.join(root, "public/assets/brand");

const fail = (message) => {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
};

const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf8"));
const ts = fs.readFileSync(tsPath, "utf8");

const requiredSections = [
  "meta",
  "colors",
  "expressivePalette",
  "serviceContours",
  "assets",
  "modes",
  "surfaceRoles",
  "accentBudget",
  "colorPairRules",
  "contrastPairs",
  "renderRoles",
  "backgroundFamilies",
  "typographyRoles",
  "channelSafeZones",
  "assetStatus",
  "qaScripts",
];

for (const section of requiredSections) {
  if (!Object.prototype.hasOwnProperty.call(tokens, section)) {
    fail(`brand-tokens.json missing required section ${section}`);
  }
}

if (!ts.includes("brand-tokens.json") || !ts.includes("ServiceContourKey")) {
  fail("brand-tokens.ts must be a safe JSON wrapper exporting ServiceContourKey");
}

const contourCount = Object.keys(tokens.serviceContours || {}).length;
if (contourCount < 11) {
  fail(`expected at least 11 serviceContours, got ${contourCount}`);
}

const assetEntries = Object.entries(tokens.assets || {});
for (const [key, value] of assetEntries) {
  if (typeof value !== "string" || !value.startsWith("/assets/brand/")) {
    fail(`asset ${key} must point to /assets/brand/*.svg`);
    continue;
  }

  const localPath = path.join(root, "public", value.replace(/^\/assets\//, "assets/"));
  if (!fs.existsSync(localPath)) {
    fail(`asset ${key} target does not exist: ${value}`);
  }
}

const svgCount = fs.readdirSync(svgDir).filter((file) => file.endsWith(".svg")).length;
if (assetEntries.length < Math.min(12, svgCount)) {
  fail(`asset token count ${assetEntries.length} is unexpectedly low for ${svgCount} SVG files`);
}

if (!process.exitCode) {
  console.log(`PASS token parity: ${contourCount} contours, ${assetEntries.length} asset tokens, ${svgCount} SVG files`);
}
