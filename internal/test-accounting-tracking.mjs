import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import test from "node:test";

const source = fs.readFileSync(new URL("../assets/metrika-goals.js", import.meta.url), "utf8");

function fixture() {
  const goals = [];
  let click;
  const window = {
    location: { origin: "https://dokumenty82.ru", pathname: "/buhgalterskie-uslugi/", search: "" },
    sessionStorage: { getItem: () => null, setItem() {} },
    setTimeout() {}, // No background work: the mocked counter answers immediately.
    ym(id, action, name, params) {
      assert.equal(id, 109869928);
      if (action === "getClientID") name("1234567890");
      else goals.push({ name, params });
    },
  };
  const document = { referrer: "", addEventListener(name, listener) { if (name === "click") click = listener; } };
  vm.runInNewContext(source, { window, document, URL, URLSearchParams });
  return {
    window, goals,
    click(href) {
      const link = { textContent: "Подобрать тариф", getAttribute: () => href,
        closest: (selector) => selector === "a[href]" || selector === ".hero" ? link : null };
      click({ target: link });
    },
  };
}

test("old and accounting contact URLs preserve the consultation goal exactly once", () => {
  for (const href of ["/razbor-situacii/", "/razbor-situacii/#route-contact",
    "/razbor-situacii/?service=accounting#route-contact",
    "/razbor-situacii/?service=accounting-ip#route-contact",
    "/razbor-situacii/?service=accounting-ooo#route-contact"]) {
    const f = fixture();
    f.click(href);
    assert.equal(f.goals.filter(g => g.name === "consultation_cta_click").length, 1);
    assert.equal(f.goals.filter(g => g.name === "service_route_click").length, 1);
    assert.equal(f.goals.some(g => g.name === "lead_submit_success"), false);
  }
});

test("contact channels and accounting routes keep their existing goals", () => {
  for (const [href, goal] of [["tel:+79780000000", "contact_phone"], ["mailto:mock@example.invalid", "contact_email"],
    ["https://t.me/mock", "contact_telegram"], ["https://max.ru/mock", "contact_max"],
    ["/kontakty/", "contact_route"], ["/soprovozhdenie/", "service_route_click"],
    ["/buhgalterskoe-soprovozhdenie-ooo/", "service_route_click"]]) {
    const f = fixture();
    f.click(href);
    assert.equal(f.goals.filter(g => g.name === goal).length, 1);
  }
});

test("similar external or unrelated URLs are not consultation goals", () => {
  for (const href of ["https://example.invalid/razbor-situacii/?service=accounting", "/razbor-situacii-extra/", "/ceny/"]) {
    const f = fixture();
    f.click(href);
    assert.equal(f.goals.some(g => g.name === "consultation_cta_click"), false);
  }
});

test("live ClientID and landing attribution contract remain unchanged", async () => {
  const f = fixture();
  const attribution = await f.window.d82GetAttribution();
  assert.equal(attribution.yandex_client_id, "1234567890");
  assert.equal(attribution.landing_page, "/buhgalterskie-uslugi/");
  assert.equal(f.goals.length, 0);
});
