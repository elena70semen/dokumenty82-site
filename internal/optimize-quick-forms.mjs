import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetFrom = "/assets/lead-form.js?v=202608291400";
const assetTo = "/assets/lead-form.js?v=202608312100";
let optimized = 0;

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(root, entry.name, "index.html");
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, "utf8");
  const original = html;
  html = html.replace(/<form class="[^"]*lead-quick-form[^"]*"[\s\S]*?<\/form>/g, (form) => {
    if (!form.includes('name="lead_mode"')) {
      form = form.replace(
        /(<input type="hidden" name="task_type"[^>]*\/>)/,
        '$1\n        <input type="hidden" name="lead_mode" value="quick" />',
      );
    }
    form = form
      .replace(/<label>Имя<input type="text" name="name" autocomplete="name" required /g,
        '<label>Имя (необязательно)<input type="text" name="name" autocomplete="name" ')
      .replace(/(<label class="lead-quick-message">)([^<]*?)(<textarea name="message" rows="3") required /g,
        (_match, open, label, textarea) => `${open}${label.trim()} (необязательно)${textarea} `);
    return form;
  });
  html = html.replaceAll(assetFrom, assetTo);

  if (html !== original) {
    fs.writeFileSync(file, html, "utf8");
    if (html.includes('name="lead_mode" value="quick"')) optimized += 1;
  }
}

console.log(`Optimized ${optimized} quick lead forms.`);
