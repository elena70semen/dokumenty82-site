const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const origin = "https://dokumenty82.test";
const specs = [
  { route: "/smena-yuridicheskogo-adresa-ooo/", h1: "Смена юридического адреса ООО: один или два этапа", headings: [1, 8, 21], forms: 0 },
  { route: "/smena-direktora-ooo/", h1: "Смена директора ООО: решение, нотариус и новая запись ЕГРЮЛ", headings: [1, 8, 21], forms: 0 },
  { route: "/likvidaciya-ooo/", h1: "Добровольная ликвидация ООО в Симферополе", headings: [1, 8, 17], forms: 1 },
  { route: "/registraciya-ooo/", h1: "Регистрация ООО в Симферополе", headings: [1, 8, 19], forms: 1 },
];
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
    await context.route("**/*", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin === origin && url.pathname === "/api/lead") {
        const body = request.postData() || "";
        assert.match(body, /name="source_page"[\s\S]*\/(?:likvidaciya-ooo|registraciya-ooo)\//);
        assert.match(body, /name="phone"/);
        assert.match(body, /name="privacy"[\s\S]*\r\n1\r\n/);
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
    const consoleErrors = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push({ url: page.url(), text: message.text() }); });
    const results = [];
    for (const spec of specs) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(origin + spec.route, { waitUntil: "load" });
      const cookieButton = page.locator("#cookie-notice button");
      if (await cookieButton.isVisible()) await cookieButton.click();
      assert.deepEqual(
        await Promise.all(["h1", "h2", "h3"].map((tag) => page.locator(`main ${tag}`).count())),
        spec.headings,
      );
      assert.equal((await page.locator("main h1").innerText()).replace(/\s+/g, " ").trim(), spec.h1);
      assert.equal(await page.locator("main form").count(), spec.forms);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute("content"), "index, follow");
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://dokumenty82.ru" + spec.route);
      assert.equal((await page.locator("body").innerText()).includes("Получить расчёт"), false);
      assert.equal((await page.locator("body").innerText()).includes("Рассчитать"), false);
      if (!spec.forms) assert.equal(await page.locator(".hero-consult-button").getAttribute("href"), "/razbor-situacii/");

      for (const width of [1440, 1024, 768, 390, 320]) {
        await page.setViewportSize({ width, height: width >= 768 ? 900 : 844 });
        await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(40);
        const metric = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - innerWidth,
          h1Color: getComputedStyle(document.querySelector("main h1")).color,
          h2Color: getComputedStyle(document.querySelector("main h2")).color,
          allImagesLoaded: [...document.images].every((img) => img.complete && img.naturalWidth > 0),
        }));
        assert.ok(metric.overflow <= 1, `${spec.route}: horizontal overflow ${metric.overflow}px at ${width}`);
        assert.equal(metric.allImagesLoaded, true, `${spec.route}: broken image at ${width}`);
        assert.equal(metric.h1Color, "rgb(11, 36, 64)");
        assert.equal(metric.h2Color, "rgb(11, 36, 64)");
      }

      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator("#menu-toggle").click();
      assert.equal(await page.locator("#header-nav").isVisible(), true);
      await page.keyboard.press("Escape");
      assert.equal(await page.locator("#menu-toggle").getAttribute("aria-expanded"), "false");

      if (spec.forms) {
        await page.locator('#request input[name="name"]').fill("Тест");
        await page.locator('#request input[name="phone"]').fill("+7 978 000-00-00");
        await page.locator('#request textarea[name="message"]').fill("Тестовая консультация");
        await page.locator('#request input[name="privacy"]').check();
        await page.locator('#request button[type="submit"]').click();
        await page.locator('#request [role="status"]').filter({ hasText: /принят|отправлен|спасибо/i }).waitFor({ timeout: 5000 });
      }

      results.push({ route: spec.route, widths: [1440, 1024, 768, 390, 320], form: Boolean(spec.forms) });
    }
    assert.deepEqual([...new Set(broken)], []);
    assert.deepEqual(consoleErrors, []);
    console.log(JSON.stringify({ result: "PASS", pages: results }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
