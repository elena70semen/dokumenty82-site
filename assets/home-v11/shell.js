(() => {
  "use strict";
  const HEADER = "<header class=\"uh\" data-block=\"header\"><div class=\"container\"><div class=\"uh-main\"><a data-link=\"header.brand\" href=\"/\" class=\"uh-brand\"><img src=\"/assets/home-v11/header-lockup.png\" class=\"uh-logo\" width=\"198\" height=\"66\" alt=\"Документы для бизнеса — ИИ-центр\" loading=\"eager\" decoding=\"async\"></a><a data-link=\"header.email\" href=\"mailto:info@dokumenty82.ru\" class=\"uh-email\"><svg class=\"icon\" viewbox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.65\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M3 6h18v13H3zM3 6l9 7 9-7\"></path></svg><span>info@dokumenty82.ru</span></a><div class=\"uh-channels\" aria-label=\"Мессенджеры и сообщество\"><a class=\"uh-channel\" aria-label=\"Написать в MAX — новая вкладка\" href=\"https://max.ru/+79789640639\" target=\"_blank\" rel=\"noopener noreferrer\"><img src=\"/assets/home-v11/channel-max.png\" class=\"\" width=\"26\" height=\"26\" alt=\"\" loading=\"eager\" decoding=\"async\"><span>MAX</span></a><a data-link=\"header.telegram\" href=\"https://t.me/%2B79789987222\" class=\"uh-channel\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Написать в Telegram — новая вкладка\"><img src=\"/assets/home-v11/channel-telegram.png\" class=\"\" width=\"27\" height=\"27\" alt=\"\" loading=\"eager\" decoding=\"async\"><span>Telegram</span></a><button type=\"button\" class=\"uh-channel\" data-channel=\"VK\" aria-haspopup=\"dialog\" aria-controls=\"channel-status\" aria-label=\"VK — проверить подключение в макете\"><img src=\"/assets/home-v11/channel-vk.png\" class=\"\" width=\"26\" height=\"26\" alt=\"\" loading=\"eager\" decoding=\"async\"><span>VK</span></button></div><a data-link=\"header.phone\" href=\"tel:+79789987222\" class=\"uh-phone\" aria-label=\"Позвонить: +7 (978) 998-72-22\"><svg class=\"icon\" viewbox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.65\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M7 3l3 5-2 2c2 3 3 4 6 6l2-2 5 3c-1 5-4 5-7 3C8 17 5 14 3 8 2 5 4 3 7 3Z\"></path></svg><span>+7 (978) 998-72-22</span></a><button type=\"button\" class=\"uh-menu\" id=\"menu-toggle\" aria-expanded=\"false\" aria-controls=\"header-nav\" aria-label=\"Открыть меню\"><svg class=\"icon\" viewbox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.65\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M4 6h16M4 12h16M4 18h16\"></path></svg><svg class=\"icon\" viewbox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.65\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M6 6l12 12M18 6 6 18\"></path></svg></button></div><nav class=\"uh-nav\" id=\"header-nav\" aria-label=\"Основная навигация\"><a data-link=\"nav.0\" href=\"/razbor-situacii/\" class=\"uh-navlink uh-action\">Описать задачу<span class=\"uh-cta-arrow\"><svg class=\"icon\" viewbox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.65\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M5 12h14m-5-5 5 5-5 5\"></path></svg></span></a><a data-link=\"nav.1\" href=\"/uslugi/\" class=\"uh-navlink\">Услуги</a><a data-link=\"nav.2\" href=\"/otchetnost/\" class=\"uh-navlink\">Отчётность</a><a data-link=\"nav.3\" href=\"/bank-i-115-fz/\" class=\"uh-navlink\">Банк и 115-ФЗ</a><a data-link=\"nav.4\" href=\"/blog/\" class=\"uh-navlink\">Блог</a><a data-link=\"nav.5\" href=\"/novosti/\" class=\"uh-navlink\">Новости</a><a data-link=\"nav.6\" href=\"/akcii/\" class=\"uh-navlink\">Акции</a><a data-link=\"nav.7\" href=\"/ceny/\" class=\"uh-navlink\">Цены</a><a data-link=\"nav.8\" href=\"/o-proekte/\" class=\"uh-navlink\">О нас</a><a data-link=\"nav.9\" href=\"/kontakty/\" class=\"uh-navlink\">Контакты</a></nav></div></header>\n    ";
  const FOOTER = "<footer aria-label=\"Подвал сайта\" class=\"db-footer\" data-block=\"footer\" id=\"footer\"><div class=\"db-container\"><div class=\"footer-grid\"><div class=\"brand-area\"><a aria-label=\"Документы для бизнеса — главная\" class=\"footer-brand\" data-link=\"footer.0\" href=\"/\"><img alt=\"\" decoding=\"async\" height=\"55\" loading=\"lazy\" src=\"/assets/home-v11/brand-inverse.png\" width=\"52\"><span class=\"brand-copy\"><span class=\"brand-name\">Документы<br>  для бизнеса</span><span class=\"brand-descriptor\">ИИ-центр</span></span></a><p class=\"brand-description\">Бухгалтерия и документы для ИП и ООО в Симферополе и по Крыму.</p><a aria-label=\"Рейтинг организации в Яндексе — откроется в новой вкладке\" class=\"rating-link\" data-link=\"footer.1\" href=\"https://yandex.ru/sprav/widget/rating-badge/1302424560?type=rating\" rel=\"noopener noreferrer\" target=\"_blank\">Рейтинг организации в Яндексе <svg aria-hidden=\"true\" fill=\"none\" focusable=\"false\" height=\"16\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.7\" viewbox=\"0 0 24 24\" width=\"16\"><path d=\"M6 18 18 6M7 6h11v11\"></path></svg></a></div><section aria-labelledby=\"footer-contact-title\" class=\"contact-area\"><p class=\"footer-label\" id=\"footer-contact-title\">Связаться с нами</p><a class=\"contact-phone\" data-link=\"footer.2\" href=\"tel:+79789987222\"><span>+7 (978)</span>  <span>998-72-22</span></a><a class=\"contact-address\" data-link=\"footer.3\" href=\"/kontakty/\">Симферополь<br> ул. им. Мате Залки, 1</a><a class=\"contact-email\" data-link=\"footer.4\" href=\"mailto:info@dokumenty82.ru\">info@dokumenty82.ru</a><div aria-label=\"Мессенджеры и сообщество\" class=\"footer-channels\"><a aria-label=\"Написать в MAX — новая вкладка\" class=\"channel\" href=\"https://max.ru/+79789640639\" target=\"_blank\" rel=\"noopener noreferrer\">MAX</a><a aria-label=\"Написать в Telegram — откроется в новой вкладке\" class=\"channel\" data-link=\"footer.5\" href=\"https://t.me/%2B79789987222\" rel=\"noopener noreferrer\" target=\"_blank\">Telegram</a><button aria-controls=\"channel-status\" aria-haspopup=\"dialog\" aria-label=\"VK — адрес сообщества ещё не указан\" class=\"channel pending\" data-channel=\"VK\" type=\"button\">VK</button></div></section><nav aria-labelledby=\"footer-nav-title\" class=\"navigation-area\"><p class=\"footer-label\" id=\"footer-nav-title\">Разделы</p><ul class=\"footer-links\"><li><a class=\"\" data-footer-link=\"01\" data-link=\"footer.6\" href=\"/buhgalterskie-uslugi/\">Бухгалтерия</a></li><li><a class=\"\" data-footer-link=\"02\" data-link=\"footer.7\" href=\"/uslugi/\">Услуги</a></li><li><a class=\"\" data-footer-link=\"03\" data-link=\"footer.8\" href=\"/o-proekte/\">О центре</a></li><li><a class=\"\" data-footer-link=\"04\" data-link=\"footer.9\" href=\"/otchetnost/\">Отчётность</a></li><li><a class=\"\" data-footer-link=\"05\" data-link=\"footer.10\" href=\"/ceny/\">Цены</a></li><li><a class=\"\" data-footer-link=\"06\" data-link=\"footer.11\" href=\"/otzyvy/\">Отзывы</a></li><li><a class=\"\" data-footer-link=\"07\" data-link=\"footer.12\" href=\"/otvet-na-trebovanie-ifns/\">Ответ ИФНС</a></li><li><a class=\"\" data-footer-link=\"08\" data-link=\"footer.13\" href=\"/faq/\">Вопросы и ответы</a></li><li><a class=\"\" data-footer-link=\"09\" data-link=\"footer.14\" href=\"/novosti/\">Новости</a></li><li><a class=\"\" data-footer-link=\"10\" data-link=\"footer.15\" href=\"/otvet-na-zapros-banka/\">Банк и 115-ФЗ</a></li><li><a class=\"\" data-footer-link=\"11\" data-link=\"footer.16\" href=\"/kontakty/\">Контакты</a></li><li><a class=\"\" data-footer-link=\"12\" data-link=\"footer.17\" href=\"/rekvizity/\">Реквизиты</a></li></ul></nav></div><div class=\"footer-bottom\"><p>© 2026 Документы для бизнеса</p><div class=\"legal-links\"><a class=\"\" data-link=\"footer.18\" href=\"/policy/\">Конфиденциальность</a><a class=\"\" data-link=\"footer.19\" href=\"/oferta/\">Публичная оферта</a></div></div></div></footer>\n    ";

  function createElement(markup) {
    const template = document.createElement("template");
    template.innerHTML = markup.trim();
    return template.content.firstElementChild;
  }

  function init() {
    const oldHeader = document.querySelector("header.site-header");
    const oldFooter = document.querySelector("footer.site-footer");
    if (!oldHeader || !oldFooter) return;

    document.documentElement.classList.add("js");
    const header = createElement(HEADER);
    const footer = createElement(FOOTER);
    oldHeader.replaceWith(header);
    oldFooter.replaceWith(footer);

    const nav = header.querySelector("#header-nav");
    const toggle = header.querySelector("#menu-toggle");
    const cabinetLink = document.createElement("a");
    cabinetLink.className = "uh-navlink uh-cabinet-link";
    cabinetLink.href = "/cabinet/";
    cabinetLink.textContent = "Личный кабинет";
    nav.append(cabinetLink);

    const currentPath = location.pathname.replace(/\/{2,}/g, "/");
    nav.querySelectorAll("a[href^='/']").forEach((link) => {
      if (link.getAttribute("href") === currentPath) link.setAttribute("aria-current", "page");
    });

    const setMenu = (open, restoreFocus = false) => {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
      if (restoreFocus && toggle.getClientRects().length) toggle.focus({ preventScroll: true });
    };

    toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("pointerdown", (event) => {
      if (nav.classList.contains("open") && !event.target.closest(".uh")) setMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !nav.classList.contains("open")) return;
      setMenu(false, true);
      event.preventDefault();
    });
    window.matchMedia("(min-width: 1200px)").addEventListener?.("change", (event) => {
      if (event.matches) setMenu(false);
    });

    let dialog = document.getElementById("channel-status");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.id = "channel-status";
      dialog.className = "channel-status";
      dialog.setAttribute("aria-labelledby", "channel-status-title");
      dialog.setAttribute("aria-describedby", "channel-status-text");
      dialog.innerHTML = '<h2 id="channel-status-title">VK: указать сообщество</h2><p id="channel-status-text">Адрес сообщества VK ещё не подтверждён. В тестовой сборке ссылка не подставлена.</p><button id="close-status" type="button">Закрыть</button>';
      footer.after(dialog);
    }
    let dialogTrigger = null;
    document.querySelectorAll('[data-channel="VK"]').forEach((button) => {
      button.addEventListener("click", () => {
        dialogTrigger = button;
        setMenu(false);
        dialog.showModal();
        dialog.querySelector("button")?.focus();
      });
    });
    dialog.querySelector("button")?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => dialogTrigger?.focus({ preventScroll: true }));
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();

