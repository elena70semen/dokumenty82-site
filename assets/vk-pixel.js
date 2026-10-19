(function (window, document) {
  "use strict";

  // One bootstrap per document, even if the shared template is included twice.
  if (window.d82VkPixel) return;
  window.d82VkPixel = { id: "3805909", version: "20261019-1" };
  const sent = new Set();
  const queryKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid"];

  function pageContext() {
    const url = new URL(window.location.href);
    const query = new URLSearchParams();
    queryKeys.forEach(function (key) {
      const value = url.searchParams.get(key);
      if (value) query.set(key, value.slice(0, 120));
    });
    url.search = query.toString();
    url.hash = "";
    let referrer = "";
    try {
      const previous = new URL(document.referrer);
      referrer = previous.origin + previous.pathname;
    } catch (_) {}
    return { url: url.href, referrer: referrer };
  }

  // Called only with the confirmed /api/lead response. IDs stay in memory;
  // contact data, descriptions, files and CRM IDs never enter the pixel queue.
  window.d82VkLeadSuccess = function (receipt) {
    if (!receipt || receipt.ok !== true || !receipt.id || receipt.crm_status !== "sent") return false;
    const id = String(receipt.id);
    if (sent.has(id)) return false;
    try {
      const queue = window._tmr || (window._tmr = []);
      queue.push(Object.assign({ id: "3805909", type: "reachGoal", goal: "leadSubmitSuccess" }, pageContext()));
      sent.add(id);
      return true;
    } catch (_) {
      // Advertising failures must never reject a successfully submitted form.
      return false;
    }
  };

  try {
    const queue = window._tmr || (window._tmr = []);
    queue.push(Object.assign({ id: "3805909", type: "pageView", start: Date.now() }, pageContext()));
    if (!document.getElementById("tmr-code")) {
      const script = document.createElement("script");
      script.id = "tmr-code";
      script.async = true;
      script.src = "https://top-fwz1.mail.ru/js/code.js";
      document.head.appendChild(script);
    }
  } catch (_) {}
})(window, document);
