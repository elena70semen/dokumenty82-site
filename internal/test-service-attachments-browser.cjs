// Offline browser regression: files are served from disk; every POST is mocked.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const origin = "https://dokumenty82.test";
const output = path.join(os.tmpdir(), "d82-service-attachments-20260904");
const cases = [
  ["/registraciya-ip/", "Регистрация ИП"],
  ["/likvidaciya-ooo/", "Ликвидация ООО"],
];
const mimeTypes = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8", ".png": "image/png",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff",
};

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || "chromium", headless: true, args: ["--disable-gpu"] });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, serviceWorkers: "block" });
    const posts = [];
    let success = false;
    await context.route("**/*", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin === origin && url.pathname === "/api/lead" && request.method() === "POST") {
        posts.push({ contentType: request.headers()["content-type"], body: request.postDataBuffer().toString("utf8") });
        return route.fulfill({ status: success ? 200 : 503, contentType: "application/json",
          body: JSON.stringify(success ? { ok: true, id: "offline-only", crm_status: "sent" } : { ok: false }) });
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
    for (const [route, topic] of cases) {
      success = false;
      const before = posts.length;
      await page.goto(origin + route, { waitUntil: "load" });
      const cookieButton = page.locator('#cookie-notice button');
      if (await cookieButton.isVisible()) await cookieButton.click();
      const form = page.locator("#quick-lead form");
      const files = form.locator('input[name="files"]');
      const status = form.locator('[role="status"]');
      const name = form.locator('input[name="name"]');
      const phone = form.locator('input[name="phone"]');
      const message = form.locator('textarea[name="message"]');
      const submit = form.locator('button[type="submit"]');
      await name.fill("D82 offline test");
      await phone.fill("+1 202 555 0123");
      await message.fill("OFFLINE_ONLY");
      const filename = "offline-" + "x".repeat(160) + ".txt";
      await files.setInputFiles({ name: filename, mimeType: "text/plain", buffer: Buffer.from("OFFLINE_FILE_CONTENT") });
      assert.equal(await name.inputValue(), "D82 offline test");
      assert.equal(await phone.inputValue(), "+1 202 555 0123");
      assert.equal(await message.inputValue(), "OFFLINE_ONLY");
      assert.equal(page.url(), origin + route);
      assert.equal(await form.locator(".lead-file-list li").count(), 1);
      await files.focus();
      assert.equal(await files.evaluate((element) => document.activeElement === element), true);
      await submit.click();
      await status.filter({ hasText: "Подтвердите согласие" }).waitFor();
      assert.equal(posts.length, before, "Unchecked consent must not POST");
      await form.locator('input[name="privacy"]').check();
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        await form.scrollIntoViewIfNeeded();
        const layout = await form.evaluate((element) => {
          const box = element.getBoundingClientRect();
          const selectors = [".form-file-field", ".lead-file-list", ".lead-consent", ".lead-form-actions"];
          const children = selectors.map((selector) => element.querySelector(selector).getBoundingClientRect());
          const picker = element.querySelector(".lead-file-picker").getBoundingClientRect();
          return {
            viewport: window.innerWidth, left: box.left, right: box.right,
            clientWidth: element.clientWidth, scrollWidth: element.scrollWidth,
            contained: [...children, picker].every((child) => child.left >= box.left - 1 && child.right <= box.right + 1),
            ordered: children.every((child, index) => index === 0 || child.top >= children[index - 1].bottom - 1),
          };
        });
        assert.ok(layout.left >= 0 && layout.right <= width + 1, JSON.stringify({ route, width, layout }));
        assert.ok(layout.scrollWidth <= layout.clientWidth + 1 && layout.contained && layout.ordered,
          JSON.stringify({ route, width, layout }));
        if ([390, 1440].includes(width)) {
          await form.screenshot({ path: path.join(output, route.replaceAll("/", "") + "-" + width + ".png") });
        }
      }
      await submit.click();
      await status.filter({ hasText: "Сервер не подтвердил" }).waitFor();
      assert.equal(posts.length, before + 1);
      assert.equal(await phone.inputValue(), "+1 202 555 0123");
      assert.equal(await files.evaluate((element) => element.files.length), 1);
      const post = posts.at(-1);
      assert.match(post.contentType, /^multipart\/form-data; boundary=/);
      for (const value of [route, topic, "OFFLINE_ONLY", "OFFLINE_FILE_CONTENT", filename, 'name="lead_mode"']) {
        assert.ok(post.body.includes(value), "Missing multipart value: " + value);
      }
      const tooMany = Array.from({ length: 7 }, (_, i) => ({ name: "offline-" + i + ".txt", mimeType: "text/plain", buffer: Buffer.from("test") }));
      await files.setInputFiles(tooMany);
      await submit.click();
      await status.filter({ hasText: "не больше 6 файлов" }).waitFor();
      assert.equal(posts.length, before + 1, "Invalid file count must not POST");
      await files.setInputFiles({ name: "offline-ok.txt", mimeType: "text/plain", buffer: Buffer.from("OFFLINE_FILE_CONTENT") });
      success = true;
      await submit.click();
      await status.filter({ hasText: "Заявка отправлена" }).waitFor();
      assert.equal(posts.length, before + 2);
      assert.equal(await phone.inputValue(), "");
      assert.equal(await files.evaluate((element) => element.files.length), 0);
      assert.equal(await form.locator(".lead-file-list li").count(), 0);
      assert.equal(page.url(), origin + route);
      await phone.fill("+1 202 555 0123");
      await form.locator('input[name="privacy"]').check();
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 1200 });
        await form.evaluate((element) => window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - 100, behavior: "instant" }));
        await form.screenshot({ path: path.join(output, route.replaceAll("/", "") + "-empty-" + width + ".png") });
      }
      await submit.click();
      await status.filter({ hasText: "Заявка отправлена" }).waitFor();
      assert.equal(posts.length, before + 3, "Phone and consent are sufficient without name, message or files");
      assert.equal(await phone.inputValue(), "");
      assert.ok(!posts.at(-1).body.includes("OFFLINE_FILE_CONTENT"));
      console.log(JSON.stringify({ route, viewports: [320, 390, 768, 1440], mockedPosts: 3, result: "PASS" }));
    }
    console.log("Screenshots: " + output);
    await context.close();
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
