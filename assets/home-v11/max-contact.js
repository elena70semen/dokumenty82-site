(() => {
  const phone = "+7 978 964-06-39";

  async function copyPhone() {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(phone);
        return true;
      } catch (_) {}
    }
    const field = document.createElement("textarea");
    field.value = phone;
    field.setAttribute("aria-hidden", "true");
    field.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
    document.body.append(field);
    field.select();
    let copied = false;
    try { copied = document.execCommand("copy"); } catch (_) {}
    field.remove();
    return copied;
  }

  function showHint(copied) {
    let hint = document.getElementById("max-contact-hint");
    if (!hint) {
      hint = document.createElement("div");
      hint.id = "max-contact-hint";
      hint.setAttribute("role", "status");
      hint.style.cssText = "position:fixed;z-index:10000;left:50%;bottom:24px;transform:translateX(-50%);max-width:min(480px,calc(100vw - 32px));padding:14px 18px;border:1px solid #bddde9;border-radius:14px;background:#fff;color:#0b2440;box-shadow:0 16px 40px #0b244040;font:500 14px/1.5 Arial,sans-serif;text-align:center";
      document.body.append(hint);
    }
    hint.textContent = copied
      ? `Номер MAX ${phone} скопирован. Найдите его в контактах MAX.`
      : `Найдите нас в MAX по номеру ${phone}.`;
    hint.hidden = false;
    clearTimeout(hint._timer);
    hint._timer = setTimeout(() => { hint.hidden = true; }, 7000);
  }

  function createHeaderLink() {
    const link = document.createElement("a");
    link.className = "uh-channel uh-channel-max";
    link.href = "/kontakty/#max-assistant";
    link.dataset.maxQrLink = "";
    link.innerHTML = '<img src="/assets/home-v11/channel-max.png" width="27" height="27" alt=""><span>MAX</span>';
    link.title = "Перейти к QR-коду помощника в MAX";
    link.setAttribute("aria-label", "Перейти к QR-коду помощника в MAX на странице контактов");
    return link;
  }

  function createButton(className, label) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.dataset.maxContact = "";
    button.textContent = label;
    button.title = `Скопировать номер ${phone} для поиска в MAX`;
    button.setAttribute("aria-label", `Скопировать номер ${phone} и найти нас в MAX`);
    return button;
  }

  function init() {
    const styles = document.createElement("style");
    styles.textContent = ".db-footer .footer-channel-max{font-family:inherit;cursor:pointer}";
    document.head.append(styles);
    const header = document.querySelector(".uh-channels");
    if (header && !header.querySelector("[data-max-qr-link]")) {
      header.append(createHeaderLink());
    }
    const footer = document.querySelector(".footer-channels");
    if (footer && !footer.querySelector("[data-max-contact]")) {
      footer.append(createButton("channel footer-channel-max", "MAX"));
    }
    document.addEventListener("click", async (event) => {
      if (!event.target.closest("[data-max-contact]")) return;
      const copied = await copyPhone();
      showHint(copied);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
