(function () {
  "use strict";

  const COUNTER_ID = 109869928;
  const ATTRIBUTION_STORAGE_KEY = "d82_attribution_v1";
  const CLIENT_ID_WAIT_MS = 3000;
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
  const COMMERCIAL_ROUTE_CLUSTERS = new Map([
    ["/uslugi/", "catalog"],
    ["/buhgalterskie-uslugi/", "accounting"],
    ["/soprovozhdenie/", "accounting"],
    ["/buhgalterskoe-soprovozhdenie-ooo/", "accounting"],
    ["/vosstanovlenie-buhucheta/", "accounting"],
    ["/kadry/", "accounting"],
    ["/otchetnost/", "reporting"],
    ["/sdacha-otchetnosti-ip/", "reporting"],
    ["/sdacha-otchetnosti-ooo/", "reporting"],
    ["/nulevaya-otchetnost-ip/", "reporting"],
    ["/nulevaya-otchetnost-ooo/", "reporting"],
    ["/deklaraciya-usn/", "reporting"],
    ["/nalogi-i-rezhimy/", "tax"],
    ["/raschet-nalogovoy-nagruzki/", "tax"],
    ["/ausn-krym/", "tax"],
    ["/nds-pri-usn-2026/", "tax"],
    ["/sverka-s-nalogovoy/", "tax"],
    ["/otvet-na-trebovanie-ifns/", "tax"],
    ["/registraciya-i-likvidaciya/", "registration"],
    ["/registraciya-ip/", "registration"],
    ["/registraciya-ooo/", "registration"],
    ["/likvidaciya-ip/", "registration"],
    ["/likvidaciya-ooo/", "registration"],
    ["/izmenenie-okved-ip/", "registration"],
    ["/izmenenie-okved-ooo/", "registration"],
    ["/adres-egryul-direktor/", "registration"],
    ["/smena-direktora-ooo/", "registration"],
    ["/smena-yuridicheskogo-adresa-ooo/", "registration"],
    ["/yuridicheskiy-adres-simferopol/", "registration"],
    ["/nedostovernost-yuridicheskogo-adresa/", "registration"],
    ["/bank-i-115-fz/", "bank"],
    ["/dokumenty-dlya-banka-115-fz/", "bank"],
    ["/otvet-na-zapros-banka/", "bank"],
    ["/razbor-situacii/", "orientation"],
    ["/srochnye-voprosy/", "orientation"],
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
  let clientIdPromise = null;

  function normalizeClientId(value) {
    const clientId = String(value || "").trim();
    return /^\d{6,80}$/.test(clientId) ? clientId : "";
  }

  function rememberClientId(value) {
    const clientId = normalizeClientId(value);
    if (!clientId) return "";
    attribution.yandex_client_id = clientId;
    storeAttribution(attribution);
    return clientId;
  }

  function getMetrikaClientId() {
    if (clientIdPromise) return clientIdPromise;

    clientIdPromise = new Promise(function (resolve) {
      let settled = false;
      let requestedFromCounter = false;
      const startedAt = Date.now();
      const finish = function (value) {
        if (settled) return;
        const clientId = rememberClientId(value);
        if (!clientId && Date.now() - startedAt < CLIENT_ID_WAIT_MS) return;
        settled = true;
        if (!clientId) clientIdPromise = null;
        resolve(clientId);
      };
      const tryRead = function () {
        if (!requestedFromCounter && typeof window.ym === "function") {
          requestedFromCounter = true;
          try {
            window.ym(COUNTER_ID, "getClientID", finish);
          } catch (_) {}
        }
        if (Date.now() - startedAt < CLIENT_ID_WAIT_MS) {
          window.setTimeout(tryRead, 100);
        } else {
          finish("");
        }
      };
      tryRead();
    });

    return clientIdPromise;
  }

  delete attribution.yandex_client_id;
  storeAttribution(attribution);

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

  function commercialRouteForLink(link) {
    const href = String(link.getAttribute("href") || "").trim();
    if (!href || href.startsWith("#")) return null;
    try {
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return null;
      const cluster = COMMERCIAL_ROUTE_CLUSTERS.get(url.pathname);
      return cluster ? { path: url.pathname, cluster: cluster } : null;
    } catch (_) {
      return null;
    }
  }

  function linkPlacement(link) {
    if (link.closest(".hero")) return "hero";
    if (link.closest(".service-tree-group")) return "service_tree";
    if (link.closest(".related-section, .supplemental-section")) return "related";
    if (link.closest("footer")) return "footer";
    if (link.closest(".desktop-nav, .mobile-nav, .mobile-drawer")) return "navigation";
    return "content";
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
        placement: linkPlacement(link),
      });
    }

    const route = commercialRouteForLink(link);
    if (route && route.path !== window.location.pathname) {
      reachGoal("service_route_click", {
        destination: route.path,
        cluster: route.cluster,
        placement: linkPlacement(link),
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
  getMetrikaClientId();
})();
