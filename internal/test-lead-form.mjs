import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import test from "node:test";

// Unit tests only: no browser, listener, HTTP server or real network request.
const source = fs.readFileSync(new URL("../assets/lead-form.js", import.meta.url), "utf8");
const settle = () => new Promise((resolve) => setImmediate(resolve));
const response = (status = 200, payload = { ok: true, id: "mock-id", crm_status: "sent" }) => ({
  ok: status >= 200 && status < 300, status,
  json: async () => payload,
});

function element(extra = {}) {
  const listeners = new Map();
  const classes = new Set();
  return Object.assign({
    value: "", textContent: "", dataset: {}, children: [], disabled: false,
    classList: { add: (name) => classes.add(name), remove: (name) => classes.delete(name), contains: (name) => classes.has(name) },
    appendChild(child) { this.children.push(child); },
    setAttribute() {},
    focus() { this.focused = true; },
    addEventListener(name, callback, options) {
      const list = listeners.get(name) || [];
      list.push({ callback, once: options?.once });
      listeners.set(name, list);
    },
    emit(name) {
      const list = listeners.get(name) || [];
      listeners.set(name, list.filter((item) => !item.once));
      for (const item of list) item.callback({ preventDefault() {} });
    },
  }, extra);
}

function fixture(options = {}) {
  const goals = [];
  const requests = [];
  const inputs = {
    name: element({ value: "Mock visitor" }),
    phone: element({ value: "+7 (978) 000-00-00" }),
    message: element({ value: "Mock request" }),
    privacy: element({ value: "1", checked: true }),
    company_website: element(),
    task_type: element({ value: options.topic || "Разбор ситуации", options: [
      "Разбор ситуации", "Подбор бухгалтерских услуг", "Бухгалтерское сопровождение ИП", "Бухгалтерское сопровождение ООО",
    ].map((value) => ({ value })) }),
  };
  if (options.quick) inputs.lead_mode = element({ value: "quick" });
  const fileInput = element({ files: options.files || [] });
  for (const [name, input] of Object.entries(inputs)) input.name = name;
  const timers = new Map();
  let nextTimer = 0;
  const list = element();
  const picker = element();
  const status = element();
  const submit = element({ textContent: "Отправить заявку" });
  let resets = 0;
  let nativeValid = options.nativeValid !== false;
  const form = element({
    action: "/api/lead",
    checkValidity: () => nativeValid && inputs.privacy.checked,
    querySelector(selector) {
      if (selector === 'input[type="file"]') return options.noFileInput ? null : fileInput;
      if (selector === 'button[type="submit"]') return submit;
      if (selector === '[role="status"][aria-live]') return status;
      if (selector === ".lead-file-list") return list;
      if (selector === ".lead-file-picker-status") return picker;
      if (selector === ":invalid") return !inputs.privacy.checked ? inputs.privacy : options.invalidField ? inputs[options.invalidField] : null;
      const name = selector.match(/\[name="([^"]+)"\]/)?.[1];
      return name ? inputs[name] || null : null;
    },
    reset() { resets++; fileInput.files = []; nativeValid = false; },
  });
  const document = element({
    querySelectorAll: (selector) => selector === 'form[data-lead-form="amo"]' ? [form] : [],
    querySelector: () => null,
    createElement: () => element(),
  });
  const window = {
    location: { pathname: options.path || "/razbor-situacii/", search: options.search || "" },
    d82TrackGoal: options.track || ((name, params) => goals.push({ name, params })),
    d82GetAttribution: options.attribution || (() => Promise.resolve({ yandex_client_id: "1234567890" })),
  };
  class MockFormData {
    constructor() { this.entries = []; this.taskType = inputs.task_type.value; }
    append(key, value) { this.entries.push([key, value]); }
  }
  vm.runInNewContext(source, {
    document, window, FormData: MockFormData, URLSearchParams,
    ...(options.noAbortController ? {} : { AbortController }),
    setTimeout: (callback, delay) => {
      const id = ++nextTimer;
      timers.set(id, { callback, delay });
      return id;
    },
    clearTimeout: (id) => timers.delete(id),
    fetch: (...args) => {
      requests.push(args);
      return options.fetch ? options.fetch(...args) : Promise.resolve(response());
    },
  });
  document.emit("DOMContentLoaded");
  return { form, inputs, fileInput, status, submit, goals, requests, resets: () => resets,
    timers,
    expireTimers: () => {
      const pending = [...timers.values()];
      timers.clear();
      for (const timer of pending) timer.callback();
    },
    fail: () => goals.find((goal) => goal.name === "goal_form_submit_fail"),
    successes: () => goals.filter((goal) => goal.name === "lead_submit_success") };
}

test("invalid native fields/consent do not POST and keep the existing failure goal", async () => {
  const f = fixture({ nativeValid: false });
  f.form.emit("submit");
  await settle();
  assert.equal(f.requests.length, 0);
  assert.equal(f.fail().params.reason, "fields");
});

test("whitespace-only required text does not POST", async () => {
  const f = fixture();
  f.inputs.message.value = "   ";
  f.form.emit("submit");
  await settle();
  assert.equal(f.requests.length, 0);
  assert.equal(f.fail().params.reason, "fields");
  assert.equal(f.fail().params.field, "message");
  assert.equal(f.inputs.message.focused, true);
  assert.match(f.status.textContent, /опишите/);
});

test("quick lead can POST with only phone and consent", async () => {
  const f = fixture({ quick: true });
  f.inputs.name.value = "";
  f.inputs.message.value = "";
  f.form.emit("submit");
  await settle();
  await settle();
  assert.equal(f.requests.length, 1);
  assert.equal(f.successes().length, 1);
});

test("invalid telephone is rejected before POST without changing the server contract", async () => {
  for (const phone of ["123", "перезвоните", "+7 978 000-00-00 доб. 15"]) {
    const f = fixture();
    f.inputs.phone.value = phone;
    f.form.emit("submit");
    await settle();
    assert.equal(f.requests.length, 0);
    assert.equal(f.fail().params.reason, "fields");
    assert.equal(f.fail().params.field, "phone");
    assert.equal(f.inputs.phone.focused, true);
    assert.doesNotMatch(JSON.stringify(f.goals), /перезвоните|доб\./);
  }
});

for (const [label, files] of [
  ["too many files", Array.from({ length: 7 }, () => ({ name: "private-name.pdf", size: 1 }))],
  ["files above 20 MiB", [{ name: "private-name.pdf", size: 20 * 1024 * 1024 + 1 }]],
]) {
  test(`${label}: no POST and no filename in analytics`, async () => {
    const f = fixture({ files });
    f.form.emit("submit");
    await settle();
    assert.equal(f.requests.length, 0);
    assert.equal(f.fail().params.reason, "files");
    assert.doesNotMatch(JSON.stringify(f.goals), /private-name/);
  });
}

test("server refusal restores the form and sends only a fixed reason and status", async () => {
  const f = fixture({ fetch: async () => response(503, { message: "private-response@example.invalid" }) });
  f.form.emit("submit");
  await settle();
  assert.equal(f.fail().params.reason, "server");
  assert.equal(f.fail().params.http_status, 503);
  assert.equal(f.submit.disabled, false);
  assert.equal(f.resets(), 0);
  assert.equal(f.successes().length, 0);
  assert.doesNotMatch(JSON.stringify(f.goals), /private-response/);
});

test("network error has a fixed reason, safe message and allows a manual retry", async () => {
  let calls = 0;
  const f = fixture({ fetch: () => ++calls === 1
    ? Promise.reject(new Error("private-network@example.invalid"))
    : Promise.resolve(response()) });
  f.form.emit("submit");
  await settle();
  assert.equal(f.fail().params.reason, "network");
  assert.doesNotMatch(JSON.stringify(f.goals) + f.status.textContent, /private-network/);
  assert.equal(f.submit.disabled, false);
  assert.equal(f.resets(), 0);
  f.form.emit("submit");
  await settle();
  assert.equal(f.requests.length, 2);
  assert.equal(f.successes().length, 1);
});

test("a request that never answers times out without clearing data or retrying", async () => {
  const f = fixture({ fetch: () => new Promise(() => {}) });
  f.form.emit("submit");
  await settle();
  assert.equal(f.requests.length, 1);
  assert.equal(f.submit.disabled, true);
  assert.equal(f.timers.size, 1);
  assert.equal([...f.timers.values()][0].delay, 120000);
  const signal = f.requests[0][1].signal;
  f.expireTimers();
  await settle();
  assert.equal(signal.aborted, true);
  assert.equal(f.fail().params.reason, "timeout");
  assert.equal(f.submit.disabled, false);
  assert.equal(f.form.classList.contains("is-sending"), false);
  assert.equal(f.inputs.phone.value, "+7 (978) 000-00-00");
  assert.equal(f.resets(), 0);
  assert.equal(f.successes().length, 0);
  assert.equal(f.requests.length, 1);
  assert.match(f.status.textContent, /приём|приема/);
  assert.doesNotMatch(JSON.stringify(f.goals), /978|Mock/);
});

test("a hanging response body also times out and late confirmation is ignored", async () => {
  let finishBody;
  const f = fixture({ fetch: async () => ({
    ok: true, status: 200,
    json: () => new Promise(resolve => { finishBody = resolve; }),
  }) });
  f.form.emit("submit");
  await settle();
  f.expireTimers();
  await settle();
  assert.equal(f.fail().params.reason, "timeout");
  const message = f.status.textContent;
  finishBody({ ok: true, id: "late-id", crm_status: "sent" });
  await settle();
  assert.equal(f.status.textContent, message);
  assert.equal(f.successes().length, 0);
  assert.equal(f.resets(), 0);
  assert.equal(f.timers.size, 0);
});

test("timeout works without AbortController and ignores a late network response", async () => {
  let finish;
  const f = fixture({ noAbortController: true, fetch: () => new Promise(resolve => { finish = resolve; }) });
  f.form.emit("submit");
  await settle();
  f.expireTimers();
  await settle();
  assert.equal(f.fail().params.reason, "timeout");
  assert.equal(f.submit.disabled, false);
  finish(response());
  await settle();
  assert.equal(f.successes().length, 0);
  assert.equal(f.resets(), 0);
  assert.equal(f.requests.length, 1);
});

test("document uploads get a longer deadline and clear it on confirmed success", async () => {
  let finish;
  const f = fixture({ files: [{ name: "private-name.pdf", size: 1024 }],
    fetch: () => new Promise(resolve => { finish = resolve; }) });
  f.form.emit("submit");
  await settle();
  assert.equal([...f.timers.values()][0].delay, 300000);
  finish(response());
  await settle();
  assert.equal(f.successes().length, 1);
  assert.equal(f.requests[0][1].signal.aborted, false);
  assert.equal(f.timers.size, 0);
  f.expireTimers();
  await settle();
  assert.equal(f.fail(), undefined);
});

test("aborting the transport still records timeout, not a network failure", async () => {
  const f = fixture({ fetch: (_, { signal }) => new Promise((_, reject) => {
    signal.addEventListener("abort", () => reject(new Error("private-abort-details")));
  }) });
  f.form.emit("submit");
  await settle();
  f.expireTimers();
  await settle();
  assert.equal(f.fail().params.reason, "timeout");
  assert.equal(f.goals.filter(g => g.name === "goal_form_submit_fail").length, 1);
  assert.doesNotMatch(JSON.stringify(f.goals), /private-abort/);
});

test("a late expired request cannot complete or unlock a newer manual attempt", async () => {
  const pending = [];
  const f = fixture({ fetch: () => new Promise(resolve => pending.push(resolve)) });
  f.form.emit("submit");
  await settle();
  f.expireTimers();
  await settle();
  f.form.emit("submit");
  await settle();
  assert.equal(f.requests.length, 2);
  pending[0](response());
  await settle();
  assert.equal(f.submit.disabled, true);
  assert.equal(f.successes().length, 0);
  assert.equal(f.resets(), 0);
  pending[1](response());
  await settle();
  assert.equal(f.successes().length, 1);
  assert.equal(f.submit.disabled, false);
  assert.equal(f.resets(), 1);
  assert.equal(f.timers.size, 0);
});

test("a successful HTTP response without the receiver confirmation is not a lead", async () => {
  for (const payload of [{}, { ok: false }, { ok: true }, { ok: true, crm_status: "arbitrary-private-value" }]) {
    const f = fixture({ fetch: async () => response(200, payload) });
    f.form.emit("submit");
    await settle();
    assert.equal(f.successes().length, 0);
    assert.equal(f.fail().params.reason, "server");
    assert.equal(f.resets(), 0);
  }
});

test("non-JSON HTTP 200 is not reported as success", async () => {
  const f = fixture({ fetch: async () => ({ ok: true, status: 200, json: async () => { throw new Error("bad JSON"); } }) });
  f.form.emit("submit");
  await settle();
  assert.equal(f.successes().length, 0);
  assert.equal(f.fail().params.reason, "server");
});

test("duplicate submit while pending makes one POST and one success", async () => {
  let finish;
  const pending = new Promise((resolve) => { finish = resolve; });
  const f = fixture({ fetch: () => pending });
  f.form.emit("submit");
  f.form.emit("submit");
  await settle();
  assert.equal(f.requests.length, 1);
  assert.equal(f.submit.disabled, true);
  finish(response());
  await settle();
  assert.equal(f.successes().length, 1);
  assert.equal(f.resets(), 1);
  assert.equal(f.submit.disabled, false);
  assert.deepEqual(f.requests[0][1].body.entries, [["yandex_client_id", "1234567890"]]);
});

test("the existing stored-only HTTP 202 contract remains accepted", async () => {
  const f = fixture({ fetch: async () => response(202, { ok: true, id: "mock-id", crm_status: "stored_only" }) });
  f.form.emit("submit");
  await settle();
  assert.equal(f.successes().length, 1);
  assert.equal(f.successes()[0].params.crm_status, "stored_only");
});

test("analytics failure cannot prevent the request", async () => {
  const f = fixture({ track() { throw new Error("counter blocked"); } });
  assert.doesNotThrow(() => f.form.emit("submit"));
  await settle();
  assert.equal(f.requests.length, 1);
  assert.equal(f.resets(), 1);
});

test("synchronous attribution failure does not disable the form", async () => {
  const f = fixture({ attribution() { throw new Error("attribution unavailable"); } });
  assert.doesNotThrow(() => f.form.emit("submit"));
  await settle();
  assert.equal(f.requests.length, 1);
  assert.equal(f.successes().length, 1);
});

test("an attribution callback that never arrives cannot block submission", async () => {
  const f = fixture({ attribution: () => new Promise(() => {}) });
  f.form.emit("submit");
  await settle();
  assert.equal(f.requests.length, 0);
  assert.equal(f.submit.disabled, true);
  assert.equal(f.timers.size, 1);
  assert.equal([...f.timers.values()][0].delay, 3500);
  f.expireTimers();
  await settle();
  assert.equal(f.requests.length, 1);
  assert.equal(f.successes().length, 1);
  assert.equal(f.submit.disabled, false);
  assert.deepEqual(f.requests[0][1].body.entries, []);
  assert.equal(f.timers.size, 0);
});

test("late attribution cannot mutate the submitted payload or send a duplicate", async () => {
  let resolveAttribution;
  const f = fixture({ attribution: () => new Promise(resolve => { resolveAttribution = resolve; }) });
  f.form.emit("submit");
  await settle();
  f.expireTimers();
  await settle();
  assert.equal(f.requests.length, 1);
  resolveAttribution({ yandex_client_id: "late-client-id" });
  await settle();
  assert.equal(f.requests.length, 1);
  assert.deepEqual(f.requests[0][1].body.entries, []);
  assert.equal(f.successes().length, 1);
});

test("honeypot does not send a request or a conversion", async () => {
  const f = fixture();
  f.inputs.company_website.value = "bot.invalid";
  f.form.emit("submit");
  await settle();
  assert.equal(f.requests.length, 0);
  assert.equal(f.goals.length, 0);
});

test("unchecked consent prevents a request", async () => {
  const f = fixture();
  f.inputs.privacy.checked = false;
  f.form.emit("submit");
  await settle();
  assert.equal(f.requests.length, 0);
  assert.equal(f.fail().params.reason, "fields");
  assert.equal(f.fail().params.field, "privacy");
  assert.equal(f.inputs.privacy.focused, true);
});

test("supported phone formats pass without rewriting the field", async () => {
  for (const phone of ["+7 (978) 000-00-00", "8 978 000 00 00", "9780000000", "0079780000000", "+375291234567"]) {
    const f = fixture();
    f.inputs.phone.value = phone;
    f.form.emit("submit");
    await settle();
    assert.equal(f.requests.length, 1);
    assert.equal(f.inputs.phone.value, phone);
  }
});

test("six files at exactly 20 MiB remain valid", async () => {
  const files = Array.from({ length: 6 }, (_, i) => ({ name: `mock-${i}.pdf`, size: i ? 1 : 20 * 1024 * 1024 - 5 }));
  const f = fixture({ files });
  f.form.emit("submit");
  await settle();
  assert.equal(f.requests.length, 1);
  assert.equal(f.successes().length, 1);
});

test("service links select only the fixed accounting topic without sending a lead or goal", async () => {
  for (const [service, topic] of [["accounting", "Подбор бухгалтерских услуг"], ["accounting-ip", "Бухгалтерское сопровождение ИП"], ["accounting-ooo", "Бухгалтерское сопровождение ООО"]]) {
    const f = fixture({ search: `?service=${service}` });
    assert.equal(f.inputs.task_type.value, topic);
    assert.equal(f.requests.length, 0);
    assert.equal(f.goals.length, 0);
    f.form.emit("submit");
    await settle();
    assert.equal(f.requests[0][1].body.taskType, topic);
  }
});

test("unknown topics, other pages and restored user choices are not overwritten", () => {
  for (const options of [
    { search: "?service=__proto__" },
    { search: "?service=%3Cscript%3Eprivate%3C%2Fscript%3E" },
    { search: "?service=accounting-ip", path: "/deklaraciya-usn/" },
    { search: "?service=accounting-ip", topic: "Запрос банка" },
  ]) {
    const f = fixture(options);
    assert.equal(f.inputs.task_type.value, options.topic || "Разбор ситуации");
    assert.equal(f.requests.length, 0);
    assert.equal(f.goals.length, 0);
  }
});
