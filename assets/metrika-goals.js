(function () {
  "use strict";

  const COUNTER_ID = 109869928;
  const NAMED_GOALS = new Set([
    "hero_cta_click",
    "goal_form_submit_attempt",
  ]);

  function reachGoal(name, params) {
    if (!name || typeof window.ym !== "function") return;
    try {
      window.ym(COUNTER_ID, "reachGoal", name, params || {});
    } catch (_) {}
  }

  function goalForLink(link) {
    const href = String(link.getAttribute("href") || "").trim();
    if (href.startsWith("tel:")) return "contact_phone";
    if (href.startsWith("mailto:")) return "contact_email";
    if (href.startsWith("https://t.me/") || href.startsWith("tg://")) return "contact_telegram";
    if (href.startsWith("https://max.ru/")) return "contact_max";
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
        path: window.location.pathname,
        href: String(link.getAttribute("href") || "").slice(0, 180),
      });
    }
  }, true);

  window.d82TrackGoal = reachGoal;
})();
