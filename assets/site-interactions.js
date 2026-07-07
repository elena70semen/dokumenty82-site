(function () {
  const PHONE_HREF = "tel:+79789987222";
  const TELEGRAM_PHONE = "+79789987222";
  const TELEGRAM_HREF = "tg://resolve?phone=79789987222";
  const MAX_PHONE = "+79789640639";
  const MAX_HREF = "https://max.ru/";
  const EMAIL_HREF = "mailto:info@dokumenty82.ru";
  const COOKIE_KEY = "d82_cookie_notice_closed";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function normalizeText(value) {
    return (value || "").replace(/\s+/g, " ").trim();
  }

  const METRIKA_COUNTER_ID = 109869928;
  const METRIKA_ALLOWED_GOALS = {
    goal_call_click: true,
    goal_route_click: true,
    goal_docs_show_click: true,
    goal_form_start: true,
    goal_form_submit_attempt: true,
    goal_form_submit_fail: true,
    goal_related_route_click: true,
    consultation_cta_click: true,
    hero_cta_click: true,
    fallback_contact_click: true,
    service_card_click: true,
    scenario_card_click: true,
    support_bridge_click: true,
  };
  const METRIKA_GOAL_ALIASES = {
    contact_route_click: "goal_route_click",
  };

  function safeMetrikaGoalName(value) {
    const raw = normalizeText(value);
    const goalName = METRIKA_GOAL_ALIASES[raw] || raw;
    return METRIKA_ALLOWED_GOALS[goalName] ? goalName : "";
  }

  function sendMetrikaGoal(goalName) {
    const safeGoalName = safeMetrikaGoalName(goalName);
    if (!safeGoalName || typeof window.ym !== "function") return;

    try {
      window.ym(METRIKA_COUNTER_ID, "reachGoal", safeGoalName);
    } catch (_) {
      /* Keep CTA behavior intact if Metrika is blocked or unavailable. */
    }
  }

  function wireMetrikaGoals() {
    document.addEventListener("click", function (event) {
      const target = event.target.closest && event.target.closest("[data-event-name]");
      if (!target) return;
      sendMetrikaGoal(target.getAttribute("data-event-name"));
    }, true);
  }

  function wireCookieNotice() {
    const notice = document.querySelector('aside[aria-label*="cookies"], aside[aria-label*="cookie"], aside[aria-label*="Cookie"]');
    if (!notice) return;

    if (window.localStorage && localStorage.getItem(COOKIE_KEY) === "1") {
      notice.hidden = true;
      return;
    }

    const button = notice.querySelector("button");
    if (!button) return;

    button.addEventListener("click", function () {
      notice.hidden = true;
      try {
        localStorage.setItem(COOKIE_KEY, "1");
      } catch (_) {
        /* localStorage may be unavailable in strict privacy modes. */
      }
    });
  }

  function wireQuickNavigation() {
    const topButton = document.querySelector('button[aria-label="Перейти к шапке"]');
    const footerButton = document.querySelector('button[aria-label="Перейти к футеру"]');

    if (topButton) {
      topButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    if (footerButton) {
      footerButton.addEventListener("click", function () {
        const footer = document.querySelector("footer");
        if (footer) {
          footer.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }

  function wireMobileMenu() {
    document.querySelectorAll("header details").forEach(function (menu) {
      menu.addEventListener("click", function (event) {
        const link = event.target.closest && event.target.closest("a[href]");
        if (link) {
          window.setTimeout(function () {
            menu.open = false;
          }, 80);
        }
      });

      menu.addEventListener("toggle", function () {
        document.documentElement.classList.toggle("mobile-menu-open", menu.open);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      document.querySelectorAll("header details[open]").forEach(function (menu) {
        menu.open = false;
      });
    });

    document.addEventListener("click", function (event) {
      document.querySelectorAll("header details[open]").forEach(function (menu) {
        if (!menu.contains(event.target)) {
          menu.open = false;
        }
      });
    });
  }

  function markActiveNavigation() {
    const path = window.location.pathname || "/";
    const activeClasses = [
      "bg-[rgba(159,203,22,0.16)]",
      "text-[color:var(--text-inverse)]",
      "shadow-[inset_0_0_0_1px_rgba(159,203,22,0.24)]",
    ];
    const inactiveClasses = [
      "text-[color:var(--text-inverse-muted)]",
      "hover:bg-[rgba(255,255,255,0.1)]",
      "hover:text-[color:var(--text-inverse)]",
    ];
    const groups = [
      {
        href: "/otchetnost/",
        paths: [
          "/otchetnost/",
          "/deklaraciya-usn/",
          "/nulevaya-otchetnost-ooo/",
          "/nulevaya-otchetnost-ip/",
          "/vosstanovlenie-buhucheta/",
        ],
      },
      {
        href: "/bank-i-115-fz/",
        paths: [
          "/bank-i-115-fz/",
          "/otvet-na-zapros-banka/",
          "/dokumenty-dlya-banka-115-fz/",
        ],
      },
      {
        href: "/razbor-situacii/",
        paths: [
          "/razbor-situacii/",
          "/srochnye-voprosy/",
          "/otvet-na-trebovanie-ifns/",
        ],
      },
      {
        href: "/#documents",
        paths: [
          "/",
          "/adres-egryul-direktor/",
          "/kadry/",
          "/soprovozhdenie/",
          "/registraciya-i-likvidaciya/",
          "/registraciya-ooo/",
          "/registraciya-ip/",
          "/likvidaciya-ooo/",
          "/nalogi-i-rezhimy/",
          "/ausn-krym/",
          "/raschet-nalogovoy-nagruzki/",
          "/nds-pri-usn-2026/",
          "/yuridicheskiy-adres-simferopol/",
          "/nedostovernost-yuridicheskogo-adresa/",
          "/smena-yuridicheskogo-adresa-ooo/",
          "/smena-direktora-ooo/",
        ],
      },
      {
        href: "/kontakty/",
        paths: ["/kontakty/"],
      },
      {
        href: "/o-proekte/",
        paths: ["/o-proekte/"],
      },
      {
        href: "/blog/",
        paths: ["/blog/", "/blog/razbory/"],
      },
      {
        href: "/blog/obnovleniya-fns/",
        paths: ["/blog/obnovleniya-fns/"],
      },
    ];

    const current = groups.find(function (group) {
      return group.paths.indexOf(path) !== -1;
    });

    if (!current) return;

    if (document.documentElement.getAttribute("data-d82-current-nav") !== current.href) {
      document.documentElement.setAttribute("data-d82-current-nav", current.href);
    }

    document.querySelectorAll("header nav a[href]").forEach(function (link) {
      const isCurrent = link.getAttribute("href") === current.href;

      if (isCurrent) {
        inactiveClasses.forEach(function (className) {
          link.classList.remove(className);
        });
        activeClasses.forEach(function (className) {
          link.classList.add(className);
        });
        link.classList.add("d82-nav-current");
        const ariaCurrent = path === current.href ? "page" : "location";
        if (link.getAttribute("aria-current") !== ariaCurrent) {
          link.setAttribute("aria-current", ariaCurrent);
        }
      } else {
        link.classList.remove("d82-nav-current");
        link.removeAttribute("aria-current");
        activeClasses.forEach(function (className) {
          link.classList.remove(className);
        });
        inactiveClasses.forEach(function (className) {
          link.classList.add(className);
        });
      }
    });
  }

  function enforceHeaderState() {
    markActiveNavigation();
    addHeaderMessengerLinks();
  }

  function scheduleHeaderRepair() {
    [0, 80, 220, 520, 1000, 1800, 3200].forEach(function (delay) {
      window.setTimeout(enforceHeaderState, delay);
    });

    const header = document.querySelector("header");
    if (!header || !("MutationObserver" in window)) return;

    let pending = false;
    const observer = new MutationObserver(function () {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(function () {
        pending = false;
        enforceHeaderState();
      });
    });

    observer.observe(header, {
      attributes: true,
      attributeFilter: ["class", "aria-current"],
      childList: true,
      subtree: true,
    });

    window.setTimeout(function () {
      observer.disconnect();
    }, 9000);
  }

  function setFormStatus(form, message) {
    const status = form.querySelector('[role="status"][aria-live], [id$="-message"]');
    if (status) {
      status.textContent = message;
    }
  }

  function createContactAction(label, href, className) {
    const link = document.createElement("a");
    link.className = className || "d82-form-contact-action";
    link.href = href;
    link.textContent = label;
    if (href.indexOf("http") === 0) {
      link.rel = "noopener";
      link.target = "_blank";
    }
    return link;
  }

  function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value).then(function () { return true; }).catch(function () { return false; });
    }
    return Promise.resolve(false);
  }

  function openMaxContact(onResult) {
    copyText(MAX_PHONE).then(function (ok) {
      if (onResult) {
        onResult(ok);
      }
      window.setTimeout(function () {
        window.open(MAX_HREF, "_blank", "noopener");
      }, 240);
    });
  }

  function createHeaderMessengerStrip(isMobile) {
    const links = document.createElement("div");
    links.className = isMobile
      ? "d82-header-messenger-links d82-header-messenger-links-mobile"
      : "d82-header-messenger-links";
    links.setAttribute("aria-label", "Quick contacts");

    const telegram = document.createElement("a");
    telegram.className = "d82-header-messenger d82-header-messenger-telegram";
    telegram.href = TELEGRAM_HREF;
    telegram.title = "Telegram " + TELEGRAM_PHONE;
    telegram.setAttribute("aria-label", "Telegram");
    telegram.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="12" fill="#2AABEE"></circle><path d="M18.7 6.5 16.8 17c-.1.8-.6 1-1.2.6l-3.4-2.5-1.7 1.6c-.2.2-.4.4-.7.4l.2-3.5 6.4-5.8c.3-.3-.1-.4-.4-.2l-7.9 5-3.4-1.1c-.7-.2-.7-.7.2-1.1l13.1-5c.6-.2 1.1.2.7 1.1Z" fill="#fff"></path></svg>';
    links.appendChild(telegram);

    const max = document.createElement("button");
    max.type = "button";
    max.className = "d82-header-messenger d82-header-messenger-max";
    max.title = "MAX " + MAX_PHONE;
    max.setAttribute("aria-label", "MAX");
    max.innerHTML = '<span aria-hidden="true">MAX</span>';
    max.addEventListener("click", function () {
      openMaxContact();
    });
    links.appendChild(max);

    const email = document.createElement("a");
    email.className = "d82-header-messenger d82-header-messenger-email";
    email.href = EMAIL_HREF;
    email.title = "info@dokumenty82.ru";
    email.setAttribute("aria-label", "Email");
    email.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2.5" y="4.5" width="19" height="15" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"></rect><path d="m5.5 8 6.5 5 6.5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    links.appendChild(email);

    return links;
  }

  function addHeaderMessengerLinks() {
    document.querySelectorAll('header a[data-cta-location="header"][data-collector-type="situation_review"]').forEach(function (cta) {
      cta.replaceWith(createHeaderMessengerStrip(false));
    });

    document.querySelectorAll('header a[data-cta-location="mobile_header"][data-collector-type="situation_review"]').forEach(function (cta) {
      cta.replaceWith(createHeaderMessengerStrip(true));
    });
  }

  function addFormContactActions(form) {
    if (form.querySelector(".d82-form-contact-actions")) return;

    const status = form.querySelector('[role="status"][aria-live], [id$="-message"]');
    const actions = document.createElement("div");
    actions.className = "d82-form-contact-actions";

    const title = document.createElement("p");
    title.className = "d82-form-contact-title";
    title.textContent = "Быстрые каналы связи";

    const grid = document.createElement("div");
    grid.className = "d82-form-contact-grid";

    grid.appendChild(createContactAction("Telegram", TELEGRAM_HREF));

    const maxButton = document.createElement("button");
    maxButton.type = "button";
    maxButton.className = "d82-form-contact-action";
    maxButton.textContent = "MAX";
    maxButton.addEventListener("click", function () {
      openMaxContact(function (ok) {
        setFormStatus(form, ok
          ? "Номер MAX скопирован: " + MAX_PHONE + ". Откройте MAX и вставьте номер в поиск контактов."
          : "MAX: " + MAX_PHONE + ". Откройте MAX и найдите контакт по этому номеру.");
      });
    });
    grid.appendChild(maxButton);

    grid.appendChild(createContactAction("Email", EMAIL_HREF));
    actions.appendChild(title);
    actions.appendChild(grid);

    if (status && status.parentNode) {
      status.parentNode.insertBefore(actions, status);
    } else {
      form.appendChild(actions);
    }
  }

  function addFooterMessengerLinks() {
    const footer = document.querySelector("footer");
    const footerGrid = footer && footer.querySelector(".container-premium");
    const target = footerGrid && footerGrid.children[0] ? footerGrid.children[0] : null;
    if (!target || target.querySelector(".d82-footer-messenger-links")) return;

    const links = document.createElement("div");
    links.className = "d82-footer-messenger-links";
    links.setAttribute("aria-label", "Быстрые контакты в мессенджерах");

    const telegram = document.createElement("a");
    telegram.className = "d82-footer-messenger d82-footer-messenger-telegram";
    telegram.href = TELEGRAM_HREF;
    telegram.title = "Telegram " + TELEGRAM_PHONE;
    telegram.setAttribute("aria-label", "Написать в Telegram");
    telegram.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="12" fill="#2AABEE"></circle><path d="M18.7 6.5 16.8 17c-.1.8-.6 1-1.2.6l-3.4-2.5-1.7 1.6c-.2.2-.4.4-.7.4l.2-3.5 6.4-5.8c.3-.3-.1-.4-.4-.2l-7.9 5-3.4-1.1c-.7-.2-.7-.7.2-1.1l13.1-5c.6-.2 1.1.2.7 1.1Z" fill="#fff"></path></svg>';
    links.appendChild(telegram);

    const max = document.createElement("button");
    max.type = "button";
    max.className = "d82-footer-messenger d82-footer-messenger-max";
    max.title = "MAX " + MAX_PHONE;
    max.setAttribute("aria-label", "Написать в MAX");
    max.innerHTML = '<span aria-hidden="true">MAX</span>';
    max.addEventListener("click", function () {
      openMaxContact();
    });
    links.appendChild(max);

    const email = document.createElement("a");
    email.className = "d82-footer-messenger d82-footer-messenger-email";
    email.href = EMAIL_HREF;
    email.title = "info@dokumenty82.ru";
    email.setAttribute("aria-label", "Написать на email");
    email.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2.5" y="4.5" width="19" height="15" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"></rect><path d="m5.5 8 6.5 5 6.5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    links.appendChild(email);

    const rating = target.querySelector(".footer-rating-badge");
    if (rating && rating.nextSibling) {
      target.insertBefore(links, rating.nextSibling);
    } else if (rating) {
      target.appendChild(links);
    } else {
      target.appendChild(links);
    }
  }

  function wireRazborCurrentPageCtas() {
    const path = window.location.pathname || "/";
    if (path !== "/razbor-situacii/") return;

    const target = document.getElementById("route-contact");
    if (!target) return;

    document.querySelectorAll('a[href="/razbor-situacii/"][data-collector-type="situation_review"]').forEach(function (link) {
      link.setAttribute("href", "#route-contact");
      link.dataset.ctaTarget = "route_contact";

      link.addEventListener("click", function (event) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", "#route-contact");
        } else {
          window.location.hash = "route-contact";
        }
      });
    });
  }

  function wirePlaceholderForms() {
    document.querySelectorAll('form[data-form-placeholder="true"]').forEach(function (form) {
      form.setAttribute("novalidate", "");
      form.dataset.interactionsReady = "true";
      addFormContactActions(form);

      form.addEventListener("submit", function (event) {
        event.preventDefault();
        setFormStatus(form, "Форма не отправляет документы через сайт. Позвоните или перейдите в контакты, чтобы согласовать безопасный способ.");
      });

      form.querySelectorAll('button[data-collector-type="form_placeholder"], button[data-event-name="goal_form_submit_attempt"]').forEach(function (button) {
        if (normalizeText(button.textContent) === "Связаться напрямую") {
          button.textContent = "Позвонить напрямую";
          button.setAttribute("aria-label", "Позвонить напрямую");
        }

        button.addEventListener("click", function () {
          setFormStatus(form, "Открываем прямой звонок. Если браузер не предложил позвонить, используйте кнопку с номером рядом.");
          window.setTimeout(function () {
            window.location.href = PHONE_HREF;
          }, 180);
        });
      });
    });
  }

  ready(function () {
    wireCookieNotice();
    wireMetrikaGoals();
    wireQuickNavigation();
    wireMobileMenu();
    enforceHeaderState();
    wirePlaceholderForms();
    addFooterMessengerLinks();
    wireRazborCurrentPageCtas();
    scheduleHeaderRepair();
  });
})();

(() => {
  const LOGO_SRC = "/assets/images/brand-logo-open-book.png?v=20260625-logo-fix";

  function isBrandLogo(img) {
    const src = img.getAttribute("src") || "";
    if (src.indexOf("brand-logo") !== -1) return true;

    return Boolean(
      img.closest(
        'header a[href="/"], footer a[href="/"], header a[href="https://dokumenty82.ru/"], footer a[href="https://dokumenty82.ru/"]'
      )
    );
  }

  function refreshBrandLogos() {
    document.querySelectorAll("header img, footer img").forEach((img) => {
      if (!isBrandLogo(img)) return;
      if (img.getAttribute("src") !== LOGO_SRC) {
        img.setAttribute("src", LOGO_SRC);
      }
      img.removeAttribute("srcset");
      img.classList.add("d82-open-book-logo");
    });
  }

  function startBrandLogoGuard() {
    refreshBrandLogos();
    [120, 400, 900, 1600, 2600].forEach((delay) => {
      window.setTimeout(refreshBrandLogos, delay);
    });

    if ("MutationObserver" in window) {
      const observer = new MutationObserver(refreshBrandLogos);
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["src", "srcset"],
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startBrandLogoGuard, { once: true });
  } else {
    startBrandLogoGuard();
  }
  window.addEventListener("load", refreshBrandLogos, { once: true });
})();
