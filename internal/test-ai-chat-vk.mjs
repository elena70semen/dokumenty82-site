import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import test from "node:test";

const source = fs.readFileSync(new URL("../assets/ai-chat.js", import.meta.url), "utf8")
  .replace(/\}\)\(\);\s*$/, "window.qaSubmitLead = submitLead;})();");
const pixel = fs.readFileSync(new URL("../assets/vk-pixel.js", import.meta.url), "utf8");
const settle = () => new Promise(resolve => setImmediate(resolve));
function fixture(payload = { ok: true, id: "qa-id", crm_status: "sent" }, status = 200) {
  const form = { elements: { name: { value: "QA only" }, phone: { value: "79780000000" },
    email: { value: "" }, privacy: { checked: true } }, checkValidity: () => true,
    reset() { this.resetCount = (this.resetCount || 0) + 1; } };
  const window = { location: { href: "https://dokumenty82.ru/" },
    d82ContactFields: { normalizePhone: value => value, showReceipt() {} } };
  const document = { referrer: "", addEventListener() {}, querySelector: () => null,
    querySelectorAll: () => [], head: { appendChild() {} }, getElementById: () => null,
    createElement: () => ({}) };
  const requests = [];
  class FormData { append() {} }
  vm.runInNewContext(pixel + "\n" + source, { window, document, URL, URLSearchParams, FormData,
    fetch: async (...args) => { requests.push(args); return { ok: status < 300, json: async () => payload }; } });
  return { window, form, requests, submit: () => window.qaSubmitLead({ preventDefault() {}, currentTarget: form }),
    goals: () => window._tmr.filter(e => e.type === "reachGoal") };
}
test("AI lead sends one VK goal after confirmed CRM delivery without Metrika", async () => {
  const f = fixture();
  f.submit(); f.submit();
  assert.equal(f.goals().length, 0);
  await settle();
  assert.equal(f.requests.length, 1);
  assert.equal(f.goals().length, 1);
  assert.equal(f.goals()[0].goal, "leadSubmitSuccess");
  assert.equal(f.form.resetCount, 1);
});
test("AI stored-only, missing confirmation and server errors are not VK conversions", async () => {
  for (const [payload, status] of [[{ ok: true, id: "id", crm_status: "stored_only" }, 202],
    [{ ok: true, crm_status: "sent" }, 200], [{ ok: true, id: "id", crm_status: "sent" }, 500]]) {
    const f = fixture(payload, status);
    f.submit(); await settle();
    assert.equal(f.goals().length, 0);
    assert.equal(f.form.resetCount, undefined);
  }
});
test("AI invalid contact does not create a request or VK goal", async () => {
  const f = fixture();
  f.form.elements.privacy.checked = false;
  f.submit(); await settle();
  assert.equal(f.requests.length, 0);
  assert.equal(f.goals().length, 0);
});
