(function () {
  const CHAT_ENDPOINT = "/api/ai-chat";
  const LEAD_ENDPOINT = "/api/lead";
  const MAX_MESSAGES = 10;
  const MAX_TEXT = 900;

  const state = {
    open: false,
    sending: false,
    messages: [],
  };

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function create(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim().slice(0, MAX_TEXT);
  }

  function fireGoal(name) {
    if (typeof window.ym !== "function") return;
    try { window.ym(109869928, "reachGoal", name); } catch (_) {}
  }

  function syncCookieOffset() {
    const notice = $("#cookie-notice") || $(".cookie-notice");
    const visible = notice && !notice.hidden && window.getComputedStyle(notice).display !== "none";
    document.body.classList.toggle("cookie-open", Boolean(visible));
    if (visible) {
      const offset = Math.ceil(notice.getBoundingClientRect().height + 24);
      document.documentElement.style.setProperty("--cookie-notice-offset", offset + "px");
    } else {
      document.documentElement.style.removeProperty("--cookie-notice-offset");
    }
  }

  function watchCookieNotice() {
    const notice = $("#cookie-notice") || $(".cookie-notice");
    syncCookieOffset();
    if (!notice) return;

    const observer = new MutationObserver(syncCookieOffset);
    observer.observe(notice, { attributes: true, attributeFilter: ["hidden", "style", "class"] });
    notice.addEventListener("click", function () {
      window.setTimeout(syncCookieOffset, 0);
    });
  }

  function addMessage(role, content) {
    const text = cleanText(content);
    if (!text) return;
    state.messages.push({ role, content: text });
    if (state.messages.length > MAX_MESSAGES) {
      state.messages = state.messages.slice(-MAX_MESSAGES);
    }
    renderMessages();
  }

  function transcriptText() {
    return state.messages.map(function (item) {
      return (item.role === "user" ? "Клиент" : "AI") + ": " + item.content;
    }).join("\n");
  }

  function setStatus(message) {
    const status = $(".ai-chat-status");
    if (status) status.textContent = message || "";
  }

  function setBusy(busy) {
    state.sending = busy;
    document.querySelectorAll(".ai-chat-panel button, .ai-chat-panel textarea, .ai-chat-panel input").forEach(function (node) {
      if (node.classList.contains("ai-chat-close")) return;
      node.disabled = busy;
    });
    const submit = $(".ai-chat-send");
    if (submit) submit.textContent = busy ? "Ждем ответ" : "Отправить";
  }

  function renderMessages() {
    const list = $(".ai-chat-messages");
    if (!list) return;
    list.textContent = "";
    state.messages.forEach(function (item) {
      const bubble = create("div", "ai-chat-message ai-chat-message-" + item.role);
      bubble.textContent = item.content;
      list.appendChild(bubble);
    });
    list.scrollTop = list.scrollHeight;
  }

  function buildPanel() {
    if ($(".ai-chat-panel")) return;

    const panel = create("section", "ai-chat-panel");
    panel.hidden = true;
    panel.setAttribute("aria-label", "AI-приемная");
    panel.innerHTML = [
      '<div class="ai-chat-head">',
      '  <img class="ai-chat-portrait" src="/assets/images/ai-consultant-portrait.webp" alt="AI-консультант" loading="lazy" decoding="async">',
      '  <div class="ai-chat-head-copy">',
      '    <div><strong>AI-приемная</strong><small>Документы, банк, ИФНС</small></div>',
      '  </div>',
      '  <button class="ai-chat-close" type="button" aria-label="Закрыть чат">&times;</button>',
      '</div>',
      '<div class="ai-chat-messages" aria-live="polite"></div>',
      '<div class="ai-chat-quick">',
      '  <button type="button" data-ai-prompt="Банк запросил документы, не понимаю что отвечать.">Банк запросил документы</button>',
      '  <button type="button" data-ai-prompt="Пришло требование из налоговой, с чего начать?">Требование ИФНС</button>',
      '  <button type="button" data-ai-prompt="Нужна отчетность, но не понимаю какие данные собрать.">Отчетность</button>',
      '</div>',
      '<form class="ai-chat-form">',
      '  <label for="ai-chat-text">Ваш вопрос</label>',
      '  <textarea id="ai-chat-text" name="message" rows="3" maxlength="900" placeholder="Коротко опишите, что произошло"></textarea>',
      '  <div class="ai-chat-actions">',
      '    <button class="ai-chat-send" type="submit">Отправить</button>',
      '    <button class="ai-chat-escalate" type="button">Передать специалисту</button>',
      '  </div>',
      '</form>',
      '<form class="ai-chat-lead" hidden>',
      '  <label>Имя<input type="text" name="name" autocomplete="name" placeholder="Как к вам обращаться"></label>',
      '  <label>Телефон<input type="tel" name="phone" autocomplete="tel" placeholder="+7"></label>',
      '  <label class="ai-chat-consent"><input type="checkbox" name="privacy" value="1"> Согласен на обработку данных</label>',
      '  <button type="submit">Отправить специалисту</button>',
      '</form>',
      '<p class="ai-chat-status" role="status" aria-live="polite"></p>'
    ].join("");

    document.body.appendChild(panel);

    $(".ai-chat-close", panel).addEventListener("click", closeChat);
    $(".ai-chat-form", panel).addEventListener("submit", function (event) {
      event.preventDefault();
      sendUserMessage();
    });
    $(".ai-chat-escalate", panel).addEventListener("click", showLeadForm);
    $(".ai-chat-lead", panel).addEventListener("submit", submitLead);
    panel.querySelectorAll("[data-ai-prompt]").forEach(function (button) {
      button.addEventListener("click", function () {
        const textarea = $("#ai-chat-text", panel);
        textarea.value = button.dataset.aiPrompt || "";
        sendUserMessage();
      });
    });

    addMessage("assistant", "Здравствуйте. Опишите, что случилось: банк, налоговая, отчетность или регистрационные документы. Я помогу понять ближайший безопасный шаг.");
  }

  function openChat() {
    buildPanel();
    const panel = $(".ai-chat-panel");
    panel.hidden = false;
    state.open = true;
    document.body.classList.add("ai-chat-open");
    fireGoal("goal_ai_chat_open");
    window.setTimeout(function () {
      const textarea = $("#ai-chat-text", panel);
      if (textarea) textarea.focus();
    }, 50);
  }

  function closeChat() {
    const panel = $(".ai-chat-panel");
    if (panel) panel.hidden = true;
    state.open = false;
    document.body.classList.remove("ai-chat-open");
    syncCookieOffset();
  }

  function showLeadForm() {
    buildPanel();
    const form = $(".ai-chat-lead");
    if (form) {
      form.hidden = false;
      const name = form.querySelector('input[name="name"]');
      if (name) name.focus();
    }
    setStatus("Оставьте телефон, и специалист увидит переписку.");
  }

  function sendUserMessage() {
    const textarea = $("#ai-chat-text");
    const message = cleanText(textarea && textarea.value);
    if (!message || state.sending) return;
    textarea.value = "";
    addMessage("user", message);
    setBusy(true);
    setStatus("AI-приемная смотрит ситуацию.");
    fireGoal("goal_ai_chat_message");

    fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: window.location.pathname,
        messages: state.messages,
      }),
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (payload) {
          if (!response.ok) throw new Error(payload.message || "AI-чат временно не ответил.");
          return payload;
        });
      })
      .then(function (payload) {
        addMessage("assistant", payload.answer || "Лучше передать ситуацию специалисту. Оставьте телефон, и мы посмотрим вводные.");
        if (payload.suggest_lead && state.messages.filter(function (item) { return item.role === "user"; }).length >= 2) {
          showLeadForm();
        } else {
          setStatus("");
        }
      })
      .catch(function (error) {
        addMessage("assistant", error.message || "AI-чат временно не ответил. Оставьте телефон, и специалист вернется к ситуации.");
        showLeadForm();
      })
      .finally(function () {
        setBusy(false);
      });
  }

  function submitLead(event) {
    event.preventDefault();
    if (state.sending) return;

    const form = event.currentTarget;
    const name = cleanText(form.elements.name && form.elements.name.value);
    const phone = cleanText(form.elements.phone && form.elements.phone.value);
    const privacy = form.elements.privacy && form.elements.privacy.checked;

    if (!name || !phone || !privacy) {
      setStatus("Заполните имя, телефон и согласие.");
      return;
    }

    const data = new FormData();
    data.append("source_page", window.location.pathname || "/");
    data.append("name", name);
    data.append("phone", phone);
    data.append("email", "");
    data.append("task_type", "AI-чат");
    data.append("message", "Заявка из AI-чата\n\n" + transcriptText());
    data.append("privacy", "1");

    setBusy(true);
    setStatus("Передаем диалог специалисту.");

    fetch(LEAD_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" },
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (payload) {
          if (!response.ok) throw new Error(payload.message || "Не удалось отправить заявку.");
          return payload;
        });
      })
      .then(function () {
        form.reset();
        form.hidden = true;
        setStatus("Готово. Диалог передан специалисту.");
        addMessage("assistant", "Готово, передали диалог специалисту. С вами свяжутся по указанному телефону.");
        fireGoal("goal_ai_chat_lead");
        fireGoal("lead_submit_success");
      })
      .catch(function (error) {
        setStatus(error.message || "Не удалось отправить заявку. Позвоните или напишите в мессенджер.");
      })
      .finally(function () {
        setBusy(false);
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    watchCookieNotice();

    const widget = $(".ai-chat-widget");
    if (!widget) return;
    widget.classList.add("is-chat-ready");
    widget.setAttribute("role", "button");
    widget.setAttribute("aria-haspopup", "dialog");
    widget.addEventListener("click", function (event) {
      event.preventDefault();
      openChat();
    });
  });
})();
