import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import test from "node:test";

const source = fs.readFileSync(new URL("../assets/vk-pixel.js", import.meta.url), "utf8");
function fixture(existing = false) {
  const scripts = [];
  const window = { location: { href: "https://dokumenty82.ru/sdacha-otchetnosti-ip/?utm_source=vk&utm_campaign=qa&phone=private-phone&email=private-email&token=private-token#private-hash" } };
  const document = { referrer: "https://example.invalid/path/?email=private-referrer",
    head: { appendChild(node) { scripts.push(node); } },
    getElementById: () => existing ? {} : scripts.find(s => s.id === "tmr-code"),
    createElement: () => ({}) };
  const context = vm.createContext({ window, document, URL, URLSearchParams });
  const run = () => vm.runInContext(source, context);
  run();
  return { window, scripts, run };
}

test("repeated bootstrap loads one library and one pageView", () => {
  const f = fixture();
  f.run(); f.run();
  assert.equal(f.scripts.length, 1);
  assert.equal(f.scripts[0].src, "https://top-fwz1.mail.ru/js/code.js");
  assert.equal(f.scripts[0].async, true);
  assert.equal(f.window._tmr.length, 1);
  assert.equal(f.window._tmr[0].type, "pageView");
  assert.equal(f.window._tmr[0].id, "3805909");
});
test("an existing vendor script is reused", () => {
  const f = fixture(true);
  assert.equal(f.scripts.length, 0);
  assert.equal(f.window._tmr.length, 1);
});
test("only confirmed distinct receipts produce a goal; receipt contents never leave the page", () => {
  const f = fixture();
  for (const receipt of [null, {}, { ok: true, id: "private-id", crm_status: "stored_only" },
    { ok: false, id: "private-id", crm_status: "sent" }, { ok: true, crm_status: "sent" }]) {
    assert.equal(f.window.d82VkLeadSuccess(receipt), false);
  }
  const receipt = { ok: true, id: "private-id", crm_status: "sent", phone: "private-phone", email: "private-email", files: ["private-file"] };
  assert.equal(f.window.d82VkLeadSuccess(receipt), true);
  f.run();
  assert.equal(f.window.d82VkLeadSuccess(receipt), false);
  assert.equal(f.window._tmr.filter(e => e.type === "reachGoal").length, 1);
  assert.doesNotMatch(JSON.stringify(f.window._tmr), /private|params|value|currency|userid/);
  assert.equal(f.window._tmr[1].goal, "leadSubmitSuccess");
  assert.match(f.window._tmr[1].url, /utm_source=vk/);
  assert.equal(f.window._tmr[1].referrer, "https://example.invalid/path/");
});
test("the shared include covers public pages once and excludes the client cabinet", () => {
  const root = new URL("../", import.meta.url);
  const registry = JSON.parse(fs.readFileSync(new URL("seo-route-registry.json", root), "utf8"));
  for (const route of registry.indexable_routes) {
    const html = fs.readFileSync(new URL(route.slice(1) + "index.html", root), "utf8");
    assert.equal((html.match(/src="\/assets\/vk-pixel\.js/g) || []).length, 1, route);
    assert.equal((html.match(/counter\?id=3805909/g) || []).length, 1, route);
    assert.ok(html.indexOf("vk-pixel.js") < html.indexOf("</head>"), route);
  }
  assert.doesNotMatch(fs.readFileSync(new URL("cabinet/index.html", root), "utf8"), /vk-pixel\.js|3805909/);
});
