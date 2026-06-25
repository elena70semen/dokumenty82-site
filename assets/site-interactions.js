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

    document.querySelectorAll("header nav a[href]").forEach(function (link) {
      if (link.getAttribute("href") === current.href) {
        link.classList.add("d82-nav-current");
        link.setAttribute("aria-current", path === current.href ? "page" : "location");
      }
    });
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
    wireQuickNavigation();
    wireMobileMenu();
    markActiveNavigation();
    wirePlaceholderForms();
    addFooterMessengerLinks();
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
