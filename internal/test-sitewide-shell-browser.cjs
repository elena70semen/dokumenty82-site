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

async function routeLocal(route) {
  const request = route.request();
  const url = new URL(request.url());
  if (url.origin === origin && url.pathname === "/api/ai-chat") {
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, answer: "Ответ специалиста", suggest_lead: false }) });
  }
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

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || "chrome", headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: "block" });
    await context.route("**/*", routeLocal);
    const page = await context.newPage();
    const pages = ["/", "/ceny/", "/buhgalterskie-uslugi/", "/smena-buhgaltera/", "/kontakty/", "/novosti/formaty-nds-s-1-iyulya-2026/"];

    for (const pathname of pages) {
      await page.goto(origin + pathname, { waitUntil: "load" });
      await page.locator("header.uh").waitFor();
      assert.equal(await page.locator("header.site-header").count(), 0, pathname);
      assert.equal(await page.locator("footer.db-footer").count(), 1, pathname);
      const ratingBadge = page.locator('.db-footer .footer-rating iframe[title="Рейтинг организации в Яндексе"]');
      assert.equal(await ratingBadge.count(), 1, `${pathname} Yandex rating badge`);
      assert.equal(await ratingBadge.getAttribute("src"), "https://yandex.ru/sprav/widget/rating-badge/1302424560?type=rating", pathname);
      assert.equal(await ratingBadge.isVisible(), true, `${pathname} Yandex rating badge visible`);
      assert.equal(await page.locator(".db-footer .rating-link").count(), 0, `${pathname} text rating link removed`);
      assert.equal(await page.locator(".db-footer [data-footer-link]").count(), 12, pathname);
      assert.equal(await page.locator(".uh-logo").evaluate((image) => image.naturalWidth > 0), true, pathname);
      assert.equal(await page.locator('.uh-nav a[href="/cabinet/"]').isHidden(), true, `${pathname} desktop cabinet`);
      assert.equal(await page.locator('.db-footer [data-footer-link="01"]').evaluate((link) => getComputedStyle(link).backgroundColor), "rgba(0, 0, 0, 0)", `${pathname} footer links`);
      assert.equal(await page.locator('.db-footer [data-footer-link="01"]').evaluate((link) => getComputedStyle(link).color), "rgb(227, 237, 246)", `${pathname} footer link color`);
      const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      assert.ok(desktopOverflow <= 1, `${pathname} desktop overflow ${desktopOverflow}`);

      await page.setViewportSize({ width: 390, height: 844 });
      const toggle = page.locator("#menu-toggle");
      assert.equal(await toggle.isVisible(), true, pathname);
      await toggle.click();
      assert.equal(await page.locator('.uh-nav a[href="/cabinet/"]').isVisible(), true, pathname);
      await page.keyboard.press("Escape");
      assert.equal(await toggle.getAttribute("aria-expanded"), "false", pathname);
      assert.equal(await toggle.evaluate((node) => document.activeElement === node), true, pathname);
      const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      assert.ok(mobileOverflow <= 1, `${pathname} mobile overflow ${mobileOverflow}`);
      await page.setViewportSize({ width: 1440, height: 900 });
    }

    await page.goto(origin + "/kontakty/", { waitUntil: "load" });
    await page.locator("header.uh").waitFor();
    assert.equal(await page.locator(".yandex-map-embed iframe").isVisible(), true, "Contact map must stay visible");

    await page.locator(".ai-chat-widget").click();
    const portrait = page.locator(".ai-chat-portrait");
    assert.equal(await portrait.isVisible(), true, "AI receptionist portrait must stay visible");
    await page.waitForFunction(() => document.querySelector(".ai-chat-portrait")?.naturalWidth > 0);
    assert.equal(await portrait.evaluate((image) => image.naturalWidth > 0), true, "AI receptionist portrait failed to load");

    console.log(JSON.stringify({ pages, mapVisible: true, portraitVisible: true, result: "PASS" }));
    await context.close();
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
