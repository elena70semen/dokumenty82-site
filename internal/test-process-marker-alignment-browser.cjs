const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const origin = "https://dokumenty82.test";
const mimeTypes = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8", ".png": "image/png",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff",
};

const routes = [
  "/", "/adres-egryul-direktor/", "/buhgalterskoe-soprovozhdenie-ooo/",
  "/dokumenty-dlya-banka-115-fz/", "/izmenenie-okved-ip/", "/likvidaciya-ooo/",
  "/otchetnost/", "/otvet-na-zapros-banka/", "/registraciya-i-likvidaciya/",
  "/registraciya-ip/", "/registraciya-ooo/", "/sdacha-otchetnosti-ip/",
  "/smena-direktora-ooo/", "/smena-yuridicheskogo-adresa-ooo/", "/srochnye-voprosy/",
  "/vosstanovlenie-buhucheta/", "/yuridicheskiy-adres-simferopol/",
];

async function routeLocal(route) {
  const request = route.request();
  const url = new URL(request.url());
  if (url.origin !== origin || request.method() !== "GET") return route.abort();
  if (["/assets/metrika-goals.js", "/assets/crm-attribution.js"].includes(url.pathname)) {
    return route.fulfill({ contentType: "application/javascript", body: "window.d82TrackGoal=function(){};window.d82GetAttribution=async()=>({});" });
  }
  const relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  let file = path.resolve(root, relative || "index.html");
  if (!file.startsWith(root + path.sep) && file !== root) return route.abort();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return route.abort();
  return route.fulfill({ contentType: mimeTypes[path.extname(file)] || "application/octet-stream", body: fs.readFileSync(file) });
}

async function measurements(page) {
  return page.locator("#main :is(.process-grid, .steps) .step").evaluateAll((steps) => steps.map((step) => {
    const marker = step.querySelector(".step-number").getBoundingClientRect();
    const card = step.querySelector(".step-card").getBoundingClientRect();
    const rail = step.querySelector(".step-rail").getBoundingClientRect();
    return {
      markerCenter: marker.left + marker.width / 2,
      cardCenter: card.left + card.width / 2,
      markerRight: marker.right,
      cardLeft: card.left,
      railHeight: rail.height,
      markerWidth: marker.width,
    };
  }));
}

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || "chrome", headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: "block" });
    await context.route("**/*", routeLocal);
    const page = await context.newPage();

    for (const pathname of routes) {
      await page.goto(origin + pathname, { waitUntil: "load" });
      const stepCount = await page.locator("#main :is(.process-grid, .steps) .step").count();
      assert.ok(stepCount >= 3, `${pathname} process steps missing at ${page.url()} (${await page.title()})`);

      for (const width of [1440, 768]) {
        await page.setViewportSize({ width, height: 900 });
        const values = await measurements(page);
        assert.ok(values.length >= 3, `${pathname} process steps at ${width}px`);
        for (const [index, value] of values.entries()) {
          const delta = Math.abs(value.markerCenter - value.cardCenter);
          assert.ok(delta <= 1, `${pathname} step ${index + 1} marker is ${delta.toFixed(2)}px off-center at ${width}px`);
        }
      }

      await page.setViewportSize({ width: 390, height: 844 });
      const mobile = await measurements(page);
      for (const [index, value] of mobile.entries()) {
        assert.ok(value.markerRight <= value.cardLeft, `${pathname} step ${index + 1} mobile marker must stay in the vertical rail`);
        assert.ok(value.railHeight > value.markerWidth, `${pathname} step ${index + 1} mobile rail must remain vertical`);
      }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      assert.ok(overflow <= 1, `${pathname} mobile overflow ${overflow}`);
      await page.setViewportSize({ width: 1440, height: 900 });
    }

    console.log(JSON.stringify({ routes: routes.length, widths: [1440, 768, 390], result: "PASS" }));
    await context.close();
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
