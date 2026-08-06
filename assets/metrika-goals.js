(function () {
  "use strict";

  const COUNTER_ID = 109869928;
  const ATTRIBUTION_STORAGE_KEY = "d82_attribution_v1";
  const ATTRIBUTION_QUERY_KEYS = [
    "yclid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ];
  const NAMED_GOALS = new Set([
    "hero_cta_click",
    "goal_form_submit_attempt",
  ]);

  function readStoredAttribution() {
    try {
      return JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}") || {};
    } catch (_) {
      return {};
    }
  }

  function storeAttribution(value) {
    try {
      window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(value));
    } catch (_) {}
  }

  function captureAttribution() {
    const stored = readStoredAttribution();
    const query = new URLSearchParams(window.location.search);
    ATTRIBUTION_QUERY_KEYS.forEach(function (key) {
      const value = String(query.get(key) || "").trim();
      if (value && !stored[key]) stored[key] = value.slice(0, 500);
    });
    if (!stored.landing_page) {
      stored.landing_page = (window.location.pathname + window.location.search).slice(0, 1000);
    }
    if (!stored.referrer && document.referrer) {
      stored.referrer = document.referrer.slice(0, 1000);
    }
    storeAttribution(stored);
    return stored;
  }

  const attribution = captureAttribution();

  function getMetrikaClientId() {
    if (attribution.yandex_client_id) {
      return Promise.resolve(attribution.yandex_client_id);
    }

    return new Promise(function (resolve) {
      let settled = false;
      const startedAt = Date.now();
      const finish = function (value) {
        if (settled) return;
        settled = true;
        const clientId = String(value || "").trim();
        if (clientId) {
          attribution.yandex_client_id = clientId.slice(0, 80);
          storeAttribution(attribution);
        }
        resolve(clientId);
      };
      const tryRead = function () {
        if (typeof window.ym === "function") {
          try {
            window.ym(COUNTER_ID, "getClientID", finish);
            window.setTimeout(function () { finish(""); }, 1200);
            return;
          } catch (_) {}
        }
        if (Date.now() - startedAt < 2200) {
          window.setTimeout(tryRead, 100);
        } else {
          finish("");
        }
      };
      tryRead();
    });
  }

  function reachGoal(name, params) {
    if (!name || typeof window.ym !== "function") return;
    try {
      window.ym(COUNTER_ID, "reachGoal", name, Object.assign({
        path: window.location.pathname,
      }, params || {}));
    } catch (_) {}
  }

  function goalForLink(link) {
    const href = String(link.getAttribute("href") || "").trim();
    if (href.startsWith("tel:")) return "contact_phone";
    if (href.startsWith("mailto:")) return "contact_email";
    if (href.startsWith("https://t.me/") || href.startsWith("tg://")) return "contact_telegram";
    if (href.startsWith("https://max.ru/")) return "contact_max";
    if (href === "/razbor-situacii/" || href.startsWith("/razbor-situacii/#")) return "consultation_cta_click";
    if (href === "/kontakty/" || href.startsWith("/kontakty/#")) return "contact_route";
    if (href.includes("yandex.ru/maps/org/1302424560/reviews")) return "review_yandex_click";
    return "";
  }

  document.addEventListener("click", function (event) {
    const origin = event.target && event.target.closest ? event.target : null;
    if (!origin) return;

    const named = origin.closest("[data-event-name]");
    if (named) {
      const name = String(named.getAttribute("data-event-name") || "").trim();
      if (NAMED_GOALS.has(name)) reachGoal(name);
    }

    const link = origin.closest("a[href]");
    if (!link) return;
    const linkGoal = goalForLink(link);
    if (linkGoal) {
      reachGoal(linkGoal, {
        href: String(link.getAttribute("href") || "").slice(0, 180),
        text: String(link.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120),
      });
    }
  }, true);

  window.d82TrackGoal = reachGoal;
  window.d82GetAttribution = function () {
    return getMetrikaClientId().then(function () {
      return Object.assign({}, attribution);
    });
  };
})();
