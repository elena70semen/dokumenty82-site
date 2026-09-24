const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const origin = "https://dokumenty82.test";
const routes = [
  "/registraciya-ip/", "/smena-yuridicheskogo-adresa-ooo/", "/smena-direktora-ooo/",
  "/likvidaciya-ooo/", "/registraciya-ooo/", "/izmenenie-okved-ip/",
  "/yuridicheskiy-adres-simferopol/", "/adres-egryul-direktor/",
  "/dokumenty-dlya-banka-115-fz/", "/otvet-na-zapros-banka/", "/bank-i-115-fz/",
  "/srochnye-voprosy/", "/registraciya-i-likvidaciya/", "/buhgalterskie-uslugi/",
  "/buhgalterskoe-soprovozhdenie-ooo/", "/vosstanovlenie-buhucheta/",
  "/otchetnost/", "/sdacha-otchetnosti-ip/",
];
const viewports = [
  { width: 1440, height: 900, maxHero: 720, maxHeading: 48, maxVisualRightGap: 45 },
  { width: 1024, height: 900, maxHero: 720, maxHeading: 44, maxVisualRightGap: 22 },
  { width: 768, height: 900, maxHero: 1000, maxHeading: 42 },
  { width: 390, height: 844, maxHero: 1150, maxHeading: 36 },
];
const mimeTypes = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8", ".png": "image/png",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff",
};

async function routeLocal(route) {
  const request = route.request();
  const url = new URL(request.url());
  if (url.origin !== origin) return route.fulfill({ status: 204, body: "" });
  if (request.method() !== "GET") return route.abort();
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

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || "chrome", headless: true });
  try {
    const context = await browser.newContext({ viewport: viewports[0], serviceWorkers: "block" });
    await context.route("**/*", routeLocal);
    const page = await context.newPage();
    const results = [];

    for (const pathname of routes) {
      await page.goto(origin + pathname, { waitUntil: "load" });
      const pointCount = await page.locator("#main.service-page .hero-service-point").count();
      assert.ok(pointCount >= 3, `${pathname} must keep its service points`);
      assert.equal(
        await page.locator("#main.service-page .hero-service-point small").count(),
        pointCount,
        `${pathname} must keep the supporting copy in the document`,
      );

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(40);
        await page.waitForFunction(() => [...document.querySelectorAll("#main.service-page .service-hero-visual img")]
          .every((img) => img.complete && img.naturalWidth > 0));
        await page.waitForTimeout(80);
        await page.waitForFunction(() => [...document.querySelectorAll("#main.service-page .service-hero-visual img")]
          .every((img) => img.complete && img.naturalWidth > 0));
        const metric = await page.evaluate(() => {
          const hero = document.querySelector("#main.service-page .service-hero");
          const frame = hero.querySelector(".service-hero-frame");
          const heading = hero.querySelector("h1");
          const visual = hero.querySelector(".service-hero-visual");
          const details = [...document.querySelectorAll("#main.service-page .hero-service-point small")];
          const accents = [...heading.querySelectorAll("span")];
          const actions = [...hero.querySelectorAll(".hero-commerce .button")];
          const priceTiers = [...hero.querySelectorAll(".hero-price-inline .price-tier")];
          const tierTops = priceTiers.map((node) => node.getBoundingClientRect().top);
          const bankSteps = document.querySelector("#main.bank-115-hub-page .service-hero + .bank-hero-steps");
          const bankStepParts = bankSteps ? [...bankSteps.querySelectorAll(".hero-service-point")].map((card) => ({
            number: card.querySelector(".bank-step-number").getBoundingClientRect(),
            icon: card.querySelector(".point-icon").getBoundingClientRect(),
          })) : [];
          const bankStepCards = bankSteps ? [...bankSteps.querySelectorAll(".hero-service-point")].map((card) => card.getBoundingClientRect()) : [];
          const bankStepGaps = bankStepCards.slice(1).map((card, index) => innerWidth >= 700
            ? card.left - bankStepCards[index].right
            : card.top - bankStepCards[index].bottom);
          return {
            heroHeight: hero.getBoundingClientRect().height,
            headingSize: parseFloat(getComputedStyle(heading).fontSize),
            visualHeight: visual.getBoundingClientRect().height,
            visualRightGap: frame.getBoundingClientRect().right - visual.getBoundingClientRect().right,
            maxActionHeight: Math.max(...actions.map((node) => node.getBoundingClientRect().height)),
            hiddenDetails: details.every((node) => getComputedStyle(node).display === "none"),
            visibleAccents: accents.every((node) => getComputedStyle(node).webkitTextFillColor !== "rgba(0, 0, 0, 0)"),
            actionsFit: actions.every((node) => node.scrollWidth <= node.clientWidth + 1 && node.scrollHeight <= node.clientHeight + 1),
            priceTierSpread: tierTops.length ? Math.max(...tierTops) - Math.min(...tierTops) : 0,
            priceHeight: hero.querySelector(".hero-price-inline")?.getBoundingClientRect().height || 0,
            bankStepsOutsideHero: !hero.querySelector(".bank-hero-steps") && !!bankSteps,
            bankStepsCenterDelta: bankSteps ? Math.abs(bankSteps.getBoundingClientRect().left + bankSteps.getBoundingClientRect().width / 2 - innerWidth / 2) : 0,
            bankStepPartsSeparate: bankStepParts.every(({ number, icon }) => number.right <= icon.left),
            bankStepMinimumGap: bankStepGaps.length ? Math.min(...bankStepGaps) : 0,
            headingLineRatio: parseFloat(getComputedStyle(heading).lineHeight) / parseFloat(getComputedStyle(heading).fontSize),
            leadLineRatio: parseFloat(getComputedStyle(hero.querySelector(".service-lead")).lineHeight) / parseFloat(getComputedStyle(hero.querySelector(".service-lead")).fontSize),
            overflow: document.documentElement.scrollWidth - innerWidth,
            imageLoaded: [...visual.querySelectorAll("img")].every((img) => img.complete && img.naturalWidth > 0),
          };
        });
        assert.ok(metric.heroHeight <= viewport.maxHero, `${pathname} hero is ${metric.heroHeight}px at ${viewport.width}px`);
        assert.ok(metric.headingSize <= viewport.maxHeading, `${pathname} heading is ${metric.headingSize}px at ${viewport.width}px`);
        assert.ok(metric.visualHeight > 250, `${pathname} visual is too small at ${viewport.width}px`);
        if (viewport.maxVisualRightGap) {
          assert.ok(metric.visualRightGap <= viewport.maxVisualRightGap, `${pathname} visual right gap is ${metric.visualRightGap}px at ${viewport.width}px`);
        }
        assert.ok(metric.maxActionHeight <= 62, `${pathname} action height is ${metric.maxActionHeight}px at ${viewport.width}px`);
        assert.equal(metric.hiddenDetails, true, `${pathname} supporting copy must move out of the first-screen hierarchy`);
        assert.equal(metric.visibleAccents, true, `${pathname} heading accent is transparent at ${viewport.width}px`);
        assert.equal(metric.actionsFit, true, `${pathname} action label is clipped at ${viewport.width}px`);
        if (pathname === "/bank-i-115-fz/") {
          assert.ok(metric.priceTierSpread <= 1, `${pathname} price tiers are not horizontal at ${viewport.width}px`);
          assert.ok(metric.priceHeight <= 62, `${pathname} horizontal price bar is ${metric.priceHeight}px at ${viewport.width}px`);
          assert.equal(metric.bankStepsOutsideHero, true, `${pathname} steps must sit immediately below the hero at ${viewport.width}px`);
          assert.ok(metric.bankStepsCenterDelta <= 1, `${pathname} steps are ${metric.bankStepsCenterDelta}px off-center at ${viewport.width}px`);
          assert.equal(metric.bankStepPartsSeparate, true, `${pathname} step numbers overlap their icons at ${viewport.width}px`);
          assert.ok(
            metric.bankStepMinimumGap >= (viewport.width >= 1000 ? 80 : viewport.width >= 700 ? 16 : 10),
            `${pathname} step gap is ${metric.bankStepMinimumGap}px at ${viewport.width}px`,
          );
          if (viewport.width >= 1000) {
            assert.ok(metric.headingLineRatio >= 1.1, `${pathname} heading line-height is too tight at ${viewport.width}px`);
            assert.ok(metric.leadLineRatio >= 1.7, `${pathname} lead line-height is too tight at ${viewport.width}px`);
          }
        }
        assert.equal(metric.imageLoaded, true, `${pathname} hero image failed at ${viewport.width}px`);
        assert.ok(metric.overflow <= 1, `${pathname} horizontal overflow ${metric.overflow}px at ${viewport.width}px`);
        results.push({ pathname, width: viewport.width, heroHeight: Math.round(metric.heroHeight) });
      }
    }

    console.log(JSON.stringify({ result: "PASS", routes: routes.length, checks: results.length }));
    await context.close();
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
