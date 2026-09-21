// Offline browser regression: all files are served through Playwright routing.
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
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });
    await context.route("**/*", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin === origin && url.pathname === "/api/ai-chat") {
        return route.fulfill({ status: 200, contentType: "application/json",
          body: JSON.stringify({ ok: true, answer: "Передам точную цену специалисту.", suggest_lead: true }) });
      }
      if (url.origin === origin && url.pathname === "/api/lead") {
        return route.fulfill({ status: 200, contentType: "application/json",
          body: JSON.stringify({ ok: true, id: "offline", crm_status: "sent" }) });
      }
      if (![origin, "https://dokumenty82.ru"].includes(url.origin) || request.method() !== "GET") {
        return route.abort();
      }
      if (["/assets/metrika-goals.js", "/assets/crm-attribution.js"].includes(url.pathname)) {
        return route.fulfill({ contentType: "application/javascript", body:
          "window.d82TrackGoal=function(){};window.d82GetAttribution=function(){return Promise.resolve({});};" });
      }
      const relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
      let file = path.resolve(root, relative || "index.html");
      if (!file.startsWith(root + path.sep) && file !== root) return route.abort();
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return route.abort();
      return route.fulfill({ contentType: mimeTypes[path.extname(file)] || "application/octet-stream", body: fs.readFileSync(file) });
    });

    const page = await context.newPage();
    await page.goto(origin + "/", { waitUntil: "load" });

    const cookie = page.locator("#cookie-notice");
    assert.equal(await cookie.getByRole("button", { name: "Понятно" }).isVisible(), true);
    const cookieHeight = await cookie.evaluate((node) => node.getBoundingClientRect().height);
    assert.ok(cookieHeight < 844 * 0.55, `Cookie notice is too tall: ${cookieHeight}`);
    await cookie.getByRole("button", { name: "Понятно" }).click();

    for (const width of [320, 360, 390, 430]) {
      await page.setViewportSize({ width, height: 844 });
      const visibleFloating = await page.locator(".ai-chat-widget, .client-portal-widget, .quick-page-nav").evaluateAll((nodes) =>
        nodes.filter((node) => {
          const box = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          return style.display !== "none" && style.visibility !== "hidden" && box.width > 0 && box.height > 0;
        }).map((node) => node.className));
      assert.deepEqual(visibleFloating, ["ai-chat-widget is-chat-ready"], `Floating actions at ${width}px`);
    }

    const summary = page.locator(".mobile-menu summary");
    await summary.click();
    const cabinet = page.locator('.mobile-nav-grid a[href="/cabinet/"]');
    assert.equal(await cabinet.isVisible(), true);
    await page.keyboard.press("Escape");
    assert.equal(await page.locator(".mobile-menu").getAttribute("open"), null);
    assert.equal(await summary.evaluate((node) => document.activeElement === node), true);

    const widget = page.locator(".ai-chat-widget");
    await widget.click();
    const panel = page.locator(".ai-chat-panel");
    const lead = page.locator(".ai-chat-lead");
    assert.equal(await panel.isVisible(), true);
    assert.equal(await lead.isHidden(), true);
    assert.match(await page.locator(".ai-chat-safety").innerText(), /пароли.*SMS-коды.*паспортные данные.*банковские секреты.*документы/);

    for (const message of ["Сколько стоит старт?", "А дальше какая цена?"]) {
      await page.locator("#ai-chat-text").fill(message);
      await page.locator(".ai-chat-send").click();
      await page.locator(".ai-chat-status").filter({ hasText: "Передать специалисту" }).waitFor();
      assert.equal(await lead.isHidden(), true, "Lead form opened without explicit escalation");
    }

    await page.locator(".ai-chat-escalate").click();
    assert.equal(await lead.isVisible(), true);
    assert.match(await page.locator(".ai-chat-lead-note").innerText(), /переписку.*имя.*телефон/);
    assert.equal(await lead.locator('a[href="/policy/"]').count(), 1);
    await page.keyboard.press("Escape");
    assert.equal(await panel.isHidden(), true);
    assert.equal(await widget.evaluate((node) => document.activeElement === node), true);

    console.log(JSON.stringify({ widths: [320, 360, 390, 430], aiLeadExplicitOnly: true, result: "PASS" }));
    await context.close();
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
