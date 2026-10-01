const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const origin = "https://dokumenty82.test";
const output = path.join(root, ".codex-tmp", "promo-qa-20261001");
const mime = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8", ".png": "image/png",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon",
};

async function localRoute(route) {
  const request = route.request();
  const url = new URL(request.url());
  if (url.origin === origin && url.pathname === "/api/lead") {
    return route.fulfill({ status: 200, contentType: "application/json",
      body: JSON.stringify({ ok: true, id: "browser-qa", crm_status: "sent" }) });
  }
  if (url.origin !== origin || request.method() !== "GET") return route.abort();
  if (url.pathname === "/assets/metrika-goals.js") {
    return route.fulfill({ contentType: "application/javascript", body:
      "window.__goals=[];window.d82TrackGoal=(n,p)=>window.__goals.push({n,p});window.d82GetAttribution=async()=>({utm_source:'owner_qa',utm_medium:'test',yclid:'qa-yclid',landing_page:'/buhgalteriya-pravo-50/?utm_source=owner_qa'});"
    });
  }
  const rel = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  let file = path.resolve(root, rel || "index.html");
  if (!file.startsWith(root + path.sep) && file !== root) return route.abort();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return route.abort();
  return route.fulfill({ contentType: mime[path.extname(file)] || "application/octet-stream", body: fs.readFileSync(file) });
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || "chrome", headless: true });
  try {
    const context = await browser.newContext({ serviceWorkers: "block" });
    await context.route("**/*", localRoute);
    const page = await context.newPage();
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(origin + "/buhgalteriya-pravo-50/?utm_source=owner_qa&utm_medium=test", { waitUntil: "load" });
      assert.equal(await page.locator("h1").count(), 1, width + " one H1");
      assert.match(await page.locator(".promo-hero-copy").innerText(), /каждый платёж в течение всего срока договора/, width + " terms");
      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
        cta: document.querySelector(".promo-hero-copy .button")?.getBoundingClientRect().top,
        art: document.querySelector(".promo-hero-visual")?.getBoundingClientRect().top,
      }));
      assert.ok(dimensions.scroll <= dimensions.client + 1, width + " horizontal overflow " + JSON.stringify(dimensions));
      if (width <= 768) assert.ok(dimensions.cta < dimensions.art, width + " CTA before illustration");
      if (width === 1440 || width === 390 || width === 320) {
        await page.locator(".promo-hero").screenshot({ path: path.join(output, "hero-" + width + ".png") });
      }
    }
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(origin + "/buhgalteriya-pravo-50/?utm_source=owner_qa&utm_medium=test", { waitUntil: "load" });
    const form = page.locator("form.promo-lead-form");
    await form.locator('input[name="phone"]').fill("+7 (978) 000-00-00");
    await form.locator('select[name="business_form"]').selectOption("ip");
    await form.locator('input[name="privacy"]').check();
    const sent = page.waitForRequest((req) => req.url().endsWith("/api/lead") && req.method() === "POST");
    await form.locator('button[type="submit"]').click();
    const payload = (await sent).postData() || "";
    for (const value of ["accounting_legal_combo", "promo_buh_pravo_50", "accounting-legal-50-20260928", "owner_qa", "qa-yclid", "current_url", "business_form", "ip"]) {
      assert.ok(payload.includes(value), "multipart includes " + value);
    }
    await assert.doesNotReject(() => form.getByText("Заявка доставлена менеджеру", { exact: false }).waitFor({ timeout: 5000 }));
    const goals = await page.evaluate(() => window.__goals || []);
    assert.equal(goals.filter((x) => x.n === "lead_submit_success").length, 1);
    await form.screenshot({ path: path.join(output, "form-390.png") });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(origin + "/", { waitUntil: "load" });
    assert.equal(await page.locator('.home-promo-entry a[href="/buhgalteriya-pravo-50/"]').count(), 1);
    await page.locator(".home-promo-entry").screenshot({ path: path.join(output, "home-entry-1440.png") });
    await page.goto(origin + "/akcii/", { waitUntil: "load" });
    assert.equal(await page.locator('#offer-2 a[href="/buhgalteriya-pravo-50/"]').count(), 1);
    await page.locator("#offer-2").screenshot({ path: path.join(output, "offer-entry-1440.png") });
    console.log("Promo landing browser QA: 5 widths, no overflow, CTA order, one CRM-confirmed success, attribution OK");
    console.log("Screenshots: " + output);
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
