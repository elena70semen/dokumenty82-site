import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const siteCssVersion = "202608181225";

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  if ([".git", "internal", "server"].includes(entry.name)) return [];
  const full = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(full) : entry.name === "index.html" ? [full] : [];
});

const targetId = (index) => `orientation-detail-${String(index + 1).padStart(2, "0")}`;

const linkHeroOrientations = (html, file) => {
  const asidePattern = /<aside class="glass-panel hero-choice-panel">[\s\S]*?<\/aside>/i;
  const aside = html.match(asidePattern)?.[0];
  if (!aside) return html;

  let result = html.replace(
    /\/assets\/site\.css\?v=\d+/g,
    `/assets/site.css?v=${siteCssVersion}`,
  );
  if (!aside.includes('<div class="compact-row">')) return result;

  let linkIndex = 0;
  const linkedAside = aside.replace(
    /<li><div class="compact-row">([\s\S]*?)<\/div><\/li>/g,
    (_match, content) => `<li><a href="#${targetId(linkIndex++)}">${content}</a></li>`,
  );

  if (linkIndex !== 4) {
    throw new Error(`${path.relative(root, file)}: expected 4 static orientation rows, found ${linkIndex}`);
  }

  let targetIndex = 0;
  result = result.replace(asidePattern, linkedAside).replace(
    /<article class="glass-card[^\"]*rich-card[^\"]*"([^>]*)>/gi,
    (match, attributes) => {
      if (targetIndex >= 4) return match;
      const id = targetId(targetIndex++);
      if (/\bid\s*=/.test(attributes)) return match;
      return match.replace(/>$/, ` id="${id}">`);
    },
  );

  if (targetIndex !== 4) {
    throw new Error(`${path.relative(root, file)}: expected 4 rich-card targets, found ${targetIndex}`);
  }

  for (let index = 0; index < 4; index += 1) {
    const id = targetId(index);
    if (!result.includes(`href="#${id}"`) || !result.includes(`id="${id}"`)) {
      throw new Error(`${path.relative(root, file)}: incomplete orientation target ${id}`);
    }
  }

  return result;
};

let updated = 0;
for (const file of walk(root)) {
  const current = fs.readFileSync(file, "utf8");
  const next = linkHeroOrientations(current, file);
  if (next === current) continue;
  fs.writeFileSync(file, next);
  updated += 1;
  console.log(`Linked hero orientations: ${path.relative(root, file)}`);
}

console.log(`Updated pages: ${updated}`);
