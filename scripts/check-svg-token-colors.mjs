#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const tokens = JSON.parse(fs.readFileSync(path.join(root, "lib/brand/brand-tokens.json"), "utf8"));
const svgDir = path.join(root, "public/assets/brand");
const allowed = new Set(["#000000", "#FFFFFF"]);

function collectHex(value) {
  if (typeof value === "string") {
    for (const match of value.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
      const hex = match[0].length === 4
        ? `#${match[0][1]}${match[0][1]}${match[0][2]}${match[0][2]}${match[0][3]}${match[0][3]}`
        : match[0];
      allowed.add(hex.toUpperCase());
    }
  } else if (Array.isArray(value)) {
    value.forEach(collectHex);
  } else if (value && typeof value === "object") {
    Object.values(value).forEach(collectHex);
  }
}

collectHex(tokens);

let failed = false;
for (const file of fs.readdirSync(svgDir).filter((item) => item.endsWith(".svg")).sort()) {
  const fullPath = path.join(svgDir, file);
  const source = fs.readFileSync(fullPath, "utf8");
  const rgbaCount = (source.match(/rgba?\(/g) || []).length;

  for (const match of source.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
    const hex = match[0].length === 4
      ? `#${match[0][1]}${match[0][1]}${match[0][2]}${match[0][2]}${match[0][3]}${match[0][3]}`
      : match[0];
    if (!allowed.has(hex.toUpperCase())) {
      console.error(`FAIL ${file}: off-token hex ${match[0]}`);
      failed = true;
    }
  }

  console.log(`PASS ${file}: token hex colors only; rgba/opacity refs ${rgbaCount}`);
}

if (failed) {
  process.exit(1);
}
