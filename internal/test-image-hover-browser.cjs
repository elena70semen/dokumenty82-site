const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const origin = "https://dokumenty82.test";
const output = path.join(root, ".codex-tmp", "image-hover-qa-20261001");
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8", ".png": "image/png",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
const routes = [...fs.readFileSync(path.join(root, "sitemap.xml"), "utf8")
  .matchAll(/<loc>(https:\/\/dokumenty82\.ru[^<]*)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const imageSelector = 'main img[src^="/assets/"]:not([src*="max-virtual-assistant-qr"])';
const examples = [
  ["home", "/", ".hero-media", "img"],
  ["service", "/buhgalterskoe-soprovozhdenie-ooo/", ".hero-art-panel", "img"],
  ["team", "/o-proekte/", ".team-card", "img"],
  ["news", "/novosti/", ".news-card", "img"],
  ["catalog", "/uslugi/", ".service-tree-group", "img"],
  ["reporting", "/otchetnost/", ".reporting-related-card", "img"],
  ["promo", "/buhgalteriya-pravo-50/", ".promo-card", "img"],
  ["conditions", "/akcii/", ".promotion-condition-grid > div", ".promotion-condition-art"],
];

async function localRoute(route) {
  const url = new URL(route.request().url());
  if (url.origin !== origin || route.request().method() !== "GET") return route.abort();
  let file = path.resolve(root, decodeURIComponent(url.pathname).replace(/^\/+/, "") || "index.html");
  if (!file.startsWith(root + path.sep) && file !== root) return route.abort();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return route.abort();
  return route.fulfill({ contentType: mime[path.extname(file)] || "application/octet-stream", body: fs.readFileSync(file) });
}

async function assertStableLayout(page, route) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  assert.ok(overflow <= 1, `${route} horizontal overflow: ${overflow}`);
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || "chrome", headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference", serviceWorkers: "block" });
    await context.route("**/*", localRoute);
    await context.addInitScript(() => localStorage.setItem("d82_cookie_ok", "1"));
    const page = await context.newPage();
    let imageCount = 0;
    for (const route of routes) {
      await page.goto(origin + route, { waitUntil: "load" });
      assert.equal(await page.locator('link[href^="/assets/image-hover.css"]').count(), 1, route + " shared stylesheet");
      const images = await page.locator(imageSelector).evaluateAll((nodes) => nodes.map((node) => ({
        src: node.getAttribute("src"), transition: getComputedStyle(node).transitionProperty,
        duration: getComputedStyle(node).transitionDuration,
      })));
      for (const image of images) {
        assert.ok(image.transition.includes("transform") && image.duration === "0.6s", `${route} missing image motion: ${JSON.stringify(image)}`);
      }
      imageCount += images.length;
      await assertStableLayout(page, route);
    }
    for (const [name, route, blockSelector, mediaSelector] of examples) {
      await page.goto(origin + route, { waitUntil: "load" });
      const block = page.locator(blockSelector).first();
      const media = block.locator(mediaSelector).first();
      await block.scrollIntoViewIfNeeded();
      if (mediaSelector === "img") await media.evaluate((node) => node.decode());
      await page.mouse.move(0, 0);
      const before = await block.evaluate((node) => ({ width: node.offsetWidth, height: node.offsetHeight, shadow: getComputedStyle(node).boxShadow }));
      await block.hover();
      await page.waitForFunction(({ blockSelector, mediaSelector }) => {
        const block = document.querySelector(blockSelector);
        const media = block.querySelector(mediaSelector);
        const lift = new DOMMatrix(getComputedStyle(block).transform).m42;
        const scale = new DOMMatrix(getComputedStyle(media, mediaSelector === "img" ? null : "::before").transform).m11;
        return Math.abs(lift + 3) < .01 && Math.abs(scale - 1.035) < .001;
      }, { blockSelector, mediaSelector });
      const after = await block.evaluate((node) => ({ width: node.offsetWidth, height: node.offsetHeight, shadow: getComputedStyle(node).boxShadow }));
      assert.equal(after.width, before.width, name + " stable width");
      assert.equal(after.height, before.height, name + " stable height");
      assert.notEqual(after.shadow, before.shadow, name + " shadow deepens");
      await assertStableLayout(page, route);
      await block.screenshot({ path: path.join(output, name + "-hover.png") });
    }
    await page.goto(origin + "/kontakty/", { waitUntil: "load" });
    await page.locator(".contact-max-assistant-poster").hover();
    assert.equal(await page.locator(".contact-max-assistant-poster img").evaluate((node) => getComputedStyle(node).transform), "none", "QR code does not zoom");
    assert.equal(await page.locator(".uh-logo").evaluate((node) => getComputedStyle(node).transform), "none", "logo does not zoom");
    await page.goto(origin + "/cabinet/", { waitUntil: "load" });
    await page.locator(".login-photo").hover();
    await page.waitForFunction(() => Math.abs(new DOMMatrix(getComputedStyle(document.querySelector(".login-photo"), "::before").transform).m11 - 1.035) < .001);
    await page.locator(".login-view").screenshot({ path: path.join(output, "cabinet-hover.png") });

    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const [name, route, selector] of examples) {
      await page.goto(origin + route, { waitUntil: "load" });
      const block = page.locator(selector).first();
      await block.hover();
      assert.equal(await block.evaluate((node) => getComputedStyle(node).transform), "none", name + " reduced motion: no lift");
      const movingImages = await block.locator("img").evaluateAll((nodes) => nodes.filter((node) => getComputedStyle(node).transform !== "none").length);
      assert.equal(movingImages, 0, name + " reduced motion: no zoom");
    }
    await context.close();

    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "no-preference", serviceWorkers: "block" });
    await mobile.route("**/*", localRoute);
    await mobile.addInitScript(() => localStorage.setItem("d82_cookie_ok", "1"));
    const phone = await mobile.newPage();
    for (const route of routes) {
      await phone.goto(origin + route, { waitUntil: "load" });
      await assertStableLayout(phone, route + " mobile");
    }
    for (const [name, route, selector] of examples) {
      await phone.goto(origin + route, { waitUntil: "load" });
      const block = phone.locator(selector).first();
      await block.evaluate((node) => node.addEventListener("click", (event) => event.preventDefault(), { capture: true, once: true }));
      await block.tap();
      assert.equal(await phone.locator(selector).first().evaluate((node) => getComputedStyle(node).transform), "none", name + " touch: no lift");
    }
    await phone.goto(origin + "/buhgalteriya-pravo-50/", { waitUntil: "load" });
    await phone.locator(".promo-grid-three").screenshot({ path: path.join(output, "promo-mobile.png") });
    await mobile.close();
    console.log(JSON.stringify({ result: "PASS", pages: routes.length, images: imageCount, hoverTemplates: examples.length, mobilePages: routes.length, reducedMotion: true, screenshotDirectory: output }));
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
