import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const footer = fs.readFileSync(path.join(root, "internal/compact-footer.html"), "utf8").trim();
export const footerStylesheet = "/assets/footer.css?v=2026091404";

export function applyCompactFooter(html) {
  const pattern = /<footer\b[^>]*class="[^"]*\bsite-footer\b[^"]*"[^>]*>[\s\S]*?<\/footer>/g;
  const matches = [...html.matchAll(pattern)];
  if (!matches.length) return html;
  if (matches.length !== 1) throw new Error("Expected exactly one site footer");
  let result = html.replace(pattern, () => footer);
  const stylesheet = '<link rel="stylesheet" href="' + footerStylesheet + '" />';
  const existing = /<link\b[^>]*href="\/assets\/footer\.css[^"]*"[^>]*>/g;
  if (existing.test(result)) {
    result = result.replace(existing, () => stylesheet);
  } else {
    result = result.replace(/([ \t]*)<\/head>/, (_, indent) => indent + "  " + stylesheet + "\n" + indent + "</head>");
  }
  return result;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const files = execFileSync("git", ["ls-files", "-z", "*.html"], {cwd: root, encoding: "utf8"}).split("\0");
  let changed = 0;
  for (const file of files) {
    if (!file || /^(internal|server|cabinet)\//.test(file)) continue;
    const full = path.join(root, file);
    const before = fs.readFileSync(full, "utf8");
    const after = applyCompactFooter(before);
    if (after !== before) {
      fs.writeFileSync(full, after, "utf8");
      changed += 1;
    }
  }
  console.log("Compact footers updated: " + changed);
}
