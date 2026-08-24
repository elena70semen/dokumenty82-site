import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const feedFile = path.join(root, "services.yml");
const offerRating = "0";
const offerReviewCount = "0";
let feed = fs.readFileSync(feedFile, "utf8");

feed = feed
  .replace(
    /<param name="Рейтинг">[^<]*<\/param>/g,
    `<param name="Рейтинг">${offerRating}</param>`,
  )
  .replace(
    /<param name="Число отзывов">[^<]*<\/param>/g,
    `<param name="Число отзывов">${offerReviewCount}</param>`,
  );

fs.writeFileSync(feedFile, feed);

const offers = [...feed.matchAll(/<offer\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/offer>/gi)].map((match) => {
  const value = (tag) => match[2].match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"))?.[1].trim() || "";
  return { id: match[1], url: value("url"), price: Number(value("price")) };
});

const formatPrice = (price) => new Intl.NumberFormat("ru-RU").format(price).replaceAll(" ", " ");

const syncServiceOfferSchema = (html, offer, route) => {
  const schemaRegion = /<!-- d82-service-schema:start -->\s*<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>\s*<!-- d82-service-schema:end -->/i;
  const match = html.match(schemaRegion);
  const updateSchema = (schema) => {
    const nodes = Array.isArray(schema["@graph"]) ? schema["@graph"] : [schema];
    const service = nodes.find((node) => {
      const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
      return types.includes("Service");
    });
    if (!service) return false;
    service.offers = {
      "@type": "Offer",
      price: offer.price,
      priceCurrency: "RUB",
      url: offer.url,
      availability: "https://schema.org/InStock",
    };

    if (route !== "/") {
      if (!Array.isArray(schema["@graph"])) {
        throw new Error(`Schema graph missing for ${offer.id}: ${route}`);
      }
      const webPage = nodes.find((node) => {
        const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
        return types.includes("WebPage");
      });
      const breadcrumbData = {
        "@type": "BreadcrumbList",
        "@id": `${offer.url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: "https://dokumenty82.ru/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Услуги",
            item: "https://dokumenty82.ru/uslugi/",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: webPage?.name || service.name,
            item: offer.url,
          },
        ],
      };
      const breadcrumb = nodes.find((node) => {
        const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
        return types.includes("BreadcrumbList");
      });
      if (breadcrumb) {
        for (const key of Object.keys(breadcrumb)) delete breadcrumb[key];
        Object.assign(breadcrumb, breadcrumbData);
      } else {
        schema["@graph"].push(breadcrumbData);
      }
      if (webPage) webPage.breadcrumb = { "@id": breadcrumbData["@id"] };
    }
    return true;
  };
  const serialize = (schema) => {
    const json = JSON.stringify(schema, null, 2)
      .split("\n")
      .map((line) => `      ${line}`)
      .join("\n");
    return `<!-- d82-service-schema:start -->\n    <script type="application/ld+json">\n${json}\n    </script>\n    <!-- d82-service-schema:end -->`;
  };

  if (match) {
    const schema = JSON.parse(match[1]);
    if (!updateSchema(schema)) throw new Error(`Service node missing for ${offer.id}: ${route}`);
    return html.replace(schemaRegion, serialize(schema));
  }

  const scriptPattern = /<script[^>]+type="application\/ld\+json"[^>]*>\s*([\s\S]*?)\s*<\/script>/gi;
  for (const scriptMatch of html.matchAll(scriptPattern)) {
    let schema;
    try {
      schema = JSON.parse(scriptMatch[1]);
    } catch {
      continue;
    }
    if (updateSchema(schema)) return html.replace(scriptMatch[0], serialize(schema));
  }
  throw new Error(`Service schema block missing for ${offer.id}: ${route}`);
};

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

  html = syncServiceOfferSchema(html, offer, route);

  fs.writeFileSync(file, html);
}

console.log(`Synced feed offer ratings, prices and Offer schema to ${offers.length} service pages.`);
