(function () {
  const COUNTER_ID = 109869928;
  const ALLOWED_GOALS = {
    goal_call_click: true,
    goal_route_click: true,
    goal_docs_show_click: true,
    goal_form_start: true,
    goal_form_submit_attempt: true,
    goal_form_submit_success: true,
    goal_form_submit_fail: true,
    goal_related_route_click: true,
    consultation_cta_click: true,
    hero_cta_click: true,
    fallback_contact_click: true,
    service_card_click: true,
    scenario_card_click: true,
    support_bridge_click: true,
  };
  const ALIASES = { contact_route_click: "goal_route_click" };

  function normalizeGoal(value) {
    const raw = String(value || "").replace(/\s+/g, " ").trim();
    const goal = ALIASES[raw] || raw;
    return ALLOWED_GOALS[goal] ? goal : "";
  }

  function inferGoal(target) {
    const explicit = normalizeGoal(target.getAttribute("data-event-name"));
    if (explicit) return explicit;

    const link = target.closest && target.closest("a[href]");
    if (!link) return "";

    const href = (link.getAttribute("href") || "").trim();
    if (href.indexOf("tel:") === 0) return "goal_call_click";
    if (
      href.indexOf("mailto:") === 0 ||
      href.indexOf("tg:") === 0 ||
      href.indexOf("https://t.me/") === 0 ||
      href.indexOf("https://max.ru/") === 0
    ) {
      return "fallback_contact_click";
    }
    if (href === "/kontakty/" || href.indexOf("yandex.ru/maps/") !== -1) {
      return "goal_route_click";
    }
    if (href === "/razbor-situacii/" || href.indexOf("/razbor-situacii/#") === 0) {
      return "consultation_cta_click";
    }
    if (link.matches(".glass-card, .related-card, .compact-list a")) {
      return "service_card_click";
    }
    return "";
  }

  document.addEventListener(
    "click",
    function (event) {
      const target = event.target.closest && event.target.closest("[data-event-name], a[href]");
      if (!target || typeof window.ym !== "function") return;

      const goal = inferGoal(target);
      if (!goal) return;
      try {
        window.ym(COUNTER_ID, "reachGoal", goal);
      } catch (_) {}
    },
    true
  );
})();
