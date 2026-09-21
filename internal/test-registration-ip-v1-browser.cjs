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

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || "chrome", headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: "block" });
    const broken = [];
    const consoleErrors = [];
    await context.route("**/*", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin === origin && url.pathname === "/api/lead") {
        const postData = request.postData() || "";
        assert.match(postData, /name="source_page"[\s\S]*\/registraciya-ip\//);
        assert.match(postData, /name="task_type"/);
        assert.match(postData, /name="phone"/);
        assert.match(postData, /name="privacy"[\s\S]*\r\n1\r\n/);
        return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, id: "offline", crm_status: "sent" }) });
      }
      if (url.origin !== origin) return route.fulfill({ status: 204, body: "" });
      if (request.method() !== "GET") return route.abort();
      if (["/assets/metrika-goals.js", "/assets/crm-attribution.js"].includes(url.pathname)) {
        return route.fulfill({ contentType: "application/javascript", body: "window.d82TrackGoal=function(){};window.d82GetAttribution=function(){return Promise.resolve({});};" });
      }
      const relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
      let file = path.resolve(root, relative || "index.html");
      if (!file.startsWith(root + path.sep) && file !== root) return route.abort();
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
        broken.push(url.pathname);
        return route.fulfill({ status: 404, body: "Not found" });
      }
      return route.fulfill({ contentType: mimeTypes[path.extname(file)] || "application/octet-stream", body: fs.readFileSync(file) });
    });

    const page = await context.newPage();
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    await page.goto(origin + "/registraciya-ip/", { waitUntil: "load" });
    await page.locator("#cookie-notice button").click();

    assert.equal(await page.locator("main h1").count(), 1);
    assert.equal((await page.locator("main h1").innerText()).replace(/\s+/g, " ").trim(), "Регистрация ИП в Симферополе");
    assert.equal(await page.locator("main h2").count(), 8);
    assert.equal(await page.locator("main h3").count(), 19);
    assert.equal(await page.locator('.hero-consult-button').innerText(), "Получить консультацию");
    assert.equal(await page.locator('.request-form button[type="submit"]').innerText(), "Получить консультацию");
    assert.equal(await page.locator('meta[name="robots"]').getAttribute("content"), "index, follow");
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://dokumenty82.ru/registraciya-ip/");
    assert.equal(await page.locator('img[src="/assets/registration-ip-v1/registration-ip-hero-right.webp"]').count(), 1);

    const widths = [1440, 1024, 768, 390, 320];
    const metrics = [];
    for (const width of widths) {
      await page.setViewportSize({ width, height: width >= 768 ? 900 : 844 });
      await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(50);
      const metric = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - innerWidth,
        h1Color: getComputedStyle(document.querySelector("main h1")).color,
        h2Color: getComputedStyle(document.querySelector("main h2")).color,
        footerColor: getComputedStyle(document.querySelector(".db-footer .footer-links a")).color,
        allImagesLoaded: [...document.images].every((img) => img.complete && img.naturalWidth > 0),
      }));
      assert.ok(metric.overflow <= 1, `Horizontal overflow ${metric.overflow}px at ${width}`);
      assert.equal(metric.allImagesLoaded, true, `Broken image at ${width}`);
      assert.notEqual(metric.h1Color, "rgba(0, 0, 0, 0)");
      assert.notEqual(metric.h2Color, "rgba(0, 0, 0, 0)");
      metrics.push({ width, ...metric });
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator("#menu-toggle").click();
    assert.equal(await page.locator("#header-nav").isVisible(), true);
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#menu-toggle").getAttribute("aria-expanded"), "false");

    await page.locator('#request input[name="name"]').fill("Тест");
    await page.locator('#request input[name="phone"]').fill("+7 978 000-00-00");
    await page.locator('#request textarea[name="message"]').fill("Тестовая консультация");
    await page.locator('#request input[name="privacy"]').check();
    await page.locator('#request button[type="submit"]').click();
    await page.locator('#request [role="status"]').filter({ hasText: /принят|отправлен|спасибо/i }).waitFor({ timeout: 5000 });
    assert.deepEqual([...new Set(broken)], []);
    assert.deepEqual(consoleErrors, []);
    console.log(JSON.stringify({ result: "PASS", metrics }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
