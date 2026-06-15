#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(fs.readFileSync(path.join(root, "lib/brand/brand-tokens.json"), "utf8"));

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
  return [0, 2, 4].map((start) => Number.parseInt(full.slice(start, start + 2), 16) / 255);
}

function linear(channel) {
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(linear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

let failed = false;
for (const pair of tokens.contrastPairs || []) {
  const value = ratio(pair.foreground, pair.background);
  const rounded = Math.round(value * 100) / 100;

  if (pair.expectFail) {
    if (rounded > (pair.maximum ?? 3)) {
      console.error(`FAIL ${pair.name}: expected risky pair, got ${rounded}`);
      failed = true;
    } else {
      console.log(`PASS expected restricted pair ${pair.name}: ${rounded}`);
    }
    continue;
  }

  if (rounded < pair.minimum) {
    console.error(`FAIL ${pair.name}: ${rounded} < ${pair.minimum}`);
    failed = true;
  } else {
    console.log(`PASS ${pair.name}: ${rounded} >= ${pair.minimum}`);
  }
}

if (failed) {
  process.exit(1);
}
