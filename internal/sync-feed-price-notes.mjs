import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const feed = fs.readFileSync(path.join(root, "services.yml"), "utf8");
const offers = [...feed.matchAll(/<offer\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/offer>/gi)].map((match) => {
  const value = (tag) => match[2].match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"))?.[1].trim() || "";
  return { id: match[1], url: value("url"), price: Number(value("price")) };
});

const formatPrice = (price) => new Intl.NumberFormat("ru-RU").format(price).replaceAll(" ", " ");

for (const offer of offers) {
  if (!offer.url || !Number.isFinite(offer.price)) throw new Error(`Invalid feed offer ${offer.id}`);
  const route = new URL(offer.url).pathname;
  const file = route === "/" ? path.join(root, "index.html") : path.join(root, route.slice(1), "index.html");
  if (!fs.existsSync(file)) throw new Error(`Missing service page for ${offer.id}: ${route}`);

  const note = `
        <!-- d82-feed-price:start -->
        <div class="service-price-note" aria-label="Стоимость услуги">
          <span>Стоимость услуги</span>
          <strong>от ${formatPrice(offer.price)} ₽</strong>
          <small>Точный состав и стоимость согласуем до начала работ.</small>
        </div>
        <!-- d82-feed-price:end -->`;
  let html = fs.readFileSync(file, "utf8");

  if (html.includes("<!-- d82-feed-price:start -->")) {
    html = html.replace(/\s*<!-- d82-feed-price:start -->[\s\S]*?<!-- d82-feed-price:end -->/, note);
  } else {
    const hero = /(<div class="[^"]*\bhero-copy-panel\b[^"]*">[\s\S]*?)(\s*<div class="actions">)/i;
    if (!hero.test(html)) throw new Error(`Hero actions missing for ${offer.id}: ${route}`);
    html = html.replace(hero, `$1${note}$2`);
  }

  fs.writeFileSync(file, html);
}

console.log(`Synced feed prices to ${offers.length} service pages.`);
