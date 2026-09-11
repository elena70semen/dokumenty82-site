import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const examples = JSON.parse(fs.readFileSync(path.join(root, "internal/service-examples.json"), "utf8"));
const feed = fs.readFileSync(path.join(root, "services.yml"), "utf8");
const catalog = fs.readFileSync(path.join(root, "internal/build-services-catalog.mjs"), "utf8");
const required = new Set([
  ...[...feed.matchAll(/<offer\b[^>]*>([\s\S]*?)<\/offer>/g)]
    .map((match) => new URL(match[1].match(/<url>([^<]+)<\/url>/)[1]).pathname),
  ...[...catalog.matchAll(/\["(\/[^"\s]+\/)",\s*"[^"\n]+",\s*"/g)].map((match) => match[1]),
]);
const routes = examples.map((example) => example.route);
if (routes.length !== new Set(routes).size) throw new Error("Duplicate example route");
if (routes.length !== required.size || routes.some((route) => !required.has(route))) {
  throw new Error("Examples must cover exactly the service feed and service catalog routes");
}

const escapeHtml = (text) => text.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

const marker = /\r?\n    <!-- d82-service-example:start -->[\s\S]*?<!-- d82-service-example:end -->/g;

function sectionEnd(html, predicate) {
  const opening = [...html.matchAll(/<section\b[^>]*>/g)].find((match) => predicate(match[0]));
  if (!opening) return null;
  const tags = /<\/?section\b[^>]*>/g;
  tags.lastIndex = opening.index;
  let depth = 0;
  for (let tag; (tag = tags.exec(html));) {
    depth += tag[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return tags.lastIndex;
  }
  throw new Error("Unclosed section");
}

function update(html, example) {
  for (const key of ["route", "title", "situation", "work", "deliverable"]) {
    if (typeof example[key] !== "string" || !example[key].trim()) throw new Error(`Missing ${key}`);
  }
  const clean = html.replace(marker, "");
  if (/d82-service-example:|id="service-example/.test(clean)) throw new Error(`Unexpected example marker: ${example.route}`);
  const end = sectionEnd(clean, (tag) => /\brich-intro-section\b/.test(tag))
    ?? sectionEnd(clean, (tag) => /\blead-quick-section\b/.test(tag))
    ?? sectionEnd(clean, (tag) => /class="[^"]*\bhero\b/.test(tag));
  if (end === null || end > clean.indexOf("</main>")) throw new Error(`No insertion point: ${example.route}`);
  const cta = clean.includes('id="quick-lead"') ? "#quick-lead"
    : clean.includes('id="route-contact"') ? "#route-contact" : "/razbor-situacii/#quick-lead";
  const eol = clean.includes("\r\n") ? "\r\n" : "\n";
  const documents = Array.isArray(example.documents)
    ? `<ul class="rich-list">${example.documents.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : "";
  const block = `
    <!-- d82-service-example:start -->
    <section class="section page-rich-section service-example-section" id="service-example" aria-labelledby="service-example-title">
      <div class="section-header">
        <p class="eyebrow">Пример ситуации</p>
        <h2 id="service-example-title">${escapeHtml(example.title)}</h2>
        <p>Типовой пример, чтобы понять состав услуги.</p>
      </div>
      <div class="card-grid two rich-card-grid">
        <article class="glass-card rich-card"><span>01</span><h3>С чем обращаются</h3><p>${escapeHtml(example.situation)}</p></article>
        <article class="glass-card rich-card"><span>02</span><h3>Что сделаем</h3><p>${escapeHtml(example.work)}</p></article>
        <article class="glass-card rich-card"><span>03</span><h3>Что подготовим</h3><p>${escapeHtml(example.deliverable)}</p>${documents}</article>
      </div>
      <p class="actions"><a class="button button-lime" href="${cta}">Обсудить похожую задачу</a></p>
    </section>
    <!-- d82-service-example:end -->`.replaceAll("\n", eol);
  return clean.slice(0, end) + block + clean.slice(end);
}

// Validate every candidate before writing any page. Run after a page generator:
// this narrow postprocessor preserves the latest forms, metadata and page copy.
const candidates = examples.map((example) => {
  if (!/^\/[a-z0-9-]+\/$/.test(example.route)) throw new Error("Unexpected route");
  const file = path.join(root, example.route.slice(1), "index.html");
  const before = fs.readFileSync(file, "utf8");
  return { file, route: example.route, before, after: update(before, example) };
});
const changed = candidates.filter(({ before, after }) => before !== after);
if (process.argv.includes("--check")) {
  console.log(`Service examples: ${candidates.length}; out of sync: ${changed.length}`);
  if (changed.length) process.exitCode = 1;
} else {
  for (const { file, after } of changed) fs.writeFileSync(file, after, "utf8");
  console.log(`Service examples: ${candidates.length}; updated: ${changed.length}`);
}
