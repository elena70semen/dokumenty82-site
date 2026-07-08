(function () {
  var badgeSrc = "https://yandex.ru/sprav/widget/rating-badge/1302424560?type=rating";
  var telegramHref = "tg://resolve?phone=79789987222";
  var maxPhone = "+79789640639";
  var maxHref = "https://max.ru/";
  var emailHref = "mailto:info@dokumenty82.ru";

  function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value).catch(function () {
        return false;
      });
    }

    return Promise.resolve(false);
  }

  function createMessengerIcon(kind) {
    var node;

    if (kind === "telegram") {
      node = document.createElement("a");
      node.href = telegramHref;
      node.title = "Telegram +79789987222";
      node.setAttribute("aria-label", "Написать в Telegram");
      node.className = "d82-footer-messenger d82-footer-messenger-telegram";
      node.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="12" fill="#2AABEE"></circle><path d="M18.7 6.5 16.8 17c-.1.8-.6 1-1.2.6l-3.4-2.5-1.7 1.6c-.2.2-.4.4-.7.4l.2-3.5 6.4-5.8c.3-.3-.1-.4-.4-.2l-7.9 5-3.4-1.1c-.7-.2-.7-.7.2-1.1l13.1-5c.6-.2 1.1.2.7 1.1Z" fill="#fff"></path></svg>';
      return node;
    }

    if (kind === "max") {
      node = document.createElement("button");
      node.type = "button";
      node.title = "MAX " + maxPhone;
      node.setAttribute("aria-label", "Написать в MAX");
      node.className = "d82-footer-messenger d82-footer-messenger-max";
      node.innerHTML = '<span aria-hidden="true">MAX</span>';
      node.addEventListener("click", function () {
        copyText(maxPhone).then(function () {
          window.open(maxHref, "_blank", "noopener");
        });
      });
      return node;
    }

    node = document.createElement("a");
    node.href = emailHref;
    node.title = "info@dokumenty82.ru";
    node.setAttribute("aria-label", "Написать на email");
    node.className = "d82-footer-messenger d82-footer-messenger-email";
    node.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2.5" y="4.5" width="19" height="15" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"></rect><path d="m5.5 8 6.5 5 6.5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    return node;
  }

  function ensureContactStrip(target) {
    var strip = target.querySelector(".d82-footer-contact-strip");

    if (!strip) {
      strip = document.createElement("div");
      strip.className = "d82-footer-contact-strip";
      strip.setAttribute("aria-label", "Рейтинг и быстрые контакты");
      target.appendChild(strip);
    }

    return strip;
  }

  function ensureRatingBadge() {
    var footer = document.querySelector("footer");
    if (!footer) {
      return;
    }

    var footerGrid = footer.querySelector(".container-premium");
    var target = footerGrid && footerGrid.children[0] ? footerGrid.children[0] : footer;
    var strip = ensureContactStrip(target);
    var wrapper = footer.querySelector('.footer-rating-badge iframe[src="' + badgeSrc + '"]') ?
      footer.querySelector('.footer-rating-badge iframe[src="' + badgeSrc + '"]').parentElement :
      target.querySelector(".footer-rating-badge");

    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "footer-rating-badge";
      wrapper.setAttribute("aria-label", "Yandex rating badge");
    }

    if (wrapper.parentElement !== strip) {
      strip.appendChild(wrapper);
    }

    footer.querySelectorAll(".footer-rating-badge").forEach(function (node) {
      if (node !== wrapper && !node.querySelector("iframe")) {
        node.remove();
      }
    });

    if (!wrapper.querySelector("iframe")) {
      var iframe = document.createElement("iframe");
      iframe.src = badgeSrc;
      iframe.width = "150";
      iframe.height = "50";
      iframe.frameBorder = "0";
      iframe.title = "Yandex rating badge";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      wrapper.appendChild(iframe);
    }

    ensureMessengerLinks(strip);
  }

  function ensureMessengerLinks(strip) {
    var wrapper = strip.querySelector(".d82-footer-messenger-links");

    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "d82-footer-messenger-links";
      wrapper.setAttribute("aria-label", "Быстрые контакты");
      wrapper.appendChild(createMessengerIcon("telegram"));
      wrapper.appendChild(createMessengerIcon("max"));
      wrapper.appendChild(createMessengerIcon("email"));
    }

    if (wrapper.parentElement !== strip) {
      strip.appendChild(wrapper);
    }
  }

  function runEnhancements() {
    ensureRatingBadge();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runEnhancements);
  } else {
    runEnhancements();
  }

  window.addEventListener("load", runEnhancements);
  window.setTimeout(runEnhancements, 500);
  window.setTimeout(runEnhancements, 1800);
})();
