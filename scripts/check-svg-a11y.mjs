#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const svgDir = path.join(root, "public/assets/brand");
let failed = false;

for (const file of fs.readdirSync(svgDir).filter((item) => item.endsWith(".svg")).sort()) {
  const fullPath = path.join(svgDir, file);
  const source = fs.readFileSync(fullPath, "utf8");
  const issues = [];

  if (!/<svg\b[^>]*\bviewBox=/i.test(source)) issues.push("missing viewBox");
  if (!/<title\b[^>]*>/i.test(source)) issues.push("missing title");
  if (!/<desc\b[^>]*>/i.test(source)) issues.push("missing desc");
  if (!/(role=["']img["']|aria-labelledby=|aria-label=)/i.test(source)) issues.push("missing accessible role/label metadata");
  if (/<image\b/i.test(source)) issues.push("embedded raster image");
  if (/(href|xlink:href)=["']https?:\/\//i.test(source)) issues.push("external link/reference");

  const approvedMatches = [...source.matchAll(/\bAPPROVED\b/g)];
  for (const match of approvedMatches) {
    const start = Math.max(0, match.index - 32);
    const context = source.slice(start, match.index + 40);
    if (!/NOT\s+APPROVED|not\s+approved|requires .*approval|approval/i.test(context)) {
      issues.push("APPROVED metadata without explicit denial/context");
      break;
    }
  }

  if (issues.length) {
    failed = true;
    console.error(`FAIL ${file}: ${issues.join(", ")}`);
  } else {
    console.log(`PASS ${file}`);
  }
}

if (failed) {
  process.exit(1);
}
