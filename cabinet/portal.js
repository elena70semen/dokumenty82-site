(function () {
  "use strict";

  const state = {
    csrfToken: "",
    dashboard: null,
    organizationId: null,
    caseId: null,
    documentCaseId: "all",
    view: "overview",
  };

  const loginView = document.getElementById("login-view");
  const dashboardView = document.getElementById("dashboard-view");
  const logoutButton = document.getElementById("logout-button");
  const emailForm = document.getElementById("email-form");
  const codeForm = document.getElementById("code-form");
  const emailInput = document.getElementById("login-email");
  const codeInput = document.getElementById("login-code");
  const authStatus = document.getElementById("auth-status");
  const demoCode = document.getElementById("demo-code");
  const workspaceStatus = document.getElementById("workspace-status");
  const toast = document.getElementById("toast");
  let loginEmail = "";
  let toastTimer = null;

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons({
        attrs: {
          "aria-hidden": "true",
          focusable: "false",
        },
      });
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3200);
  }

  function setStatus(node, message, type) {
    node.textContent = message || "";
    node.classList.toggle("is-error", type === "error");
    node.classList.toggle("is-success", type === "success");
  }

  async function api(path, options) {
    const settings = Object.assign({
      credentials: "same-origin",
      headers: {},
    }, options || {});
    if (settings.body && !(settings.body instanceof FormData)) {
      settings.headers["Content-Type"] = "application/json";
    }
    if (state.csrfToken && settings.method && settings.method !== "GET") {
      settings.headers["X-CSRF-Token"] = state.csrfToken;
    }
    const response = await window.fetch(path, settings);
    let payload = {};
    try {
      payload = await response.json();
    } catch (_) {
      payload = { message: "Сервис временно недоступен." };
    }
    if (!response.ok) {
      if (response.status === 401 && !path.includes("/auth/")) {
        showLogin();
        setStatus(authStatus, "Сессия завершена. Войдите ещё раз.", "error");
      }
      const error = new Error(payload.message || "Не удалось выполнить запрос.");
      error.status = response.status;
      throw error;
    }
    return payload;
  }

  function setBusy(form, busy) {
    form.querySelectorAll("button, input, select, textarea").forEach(function (control) {
      control.disabled = busy;
    });
  }

  function formatDate(value, options) {
    if (!value) return "Без срока";
    const source = /^\d{4}-\d{2}-\d{2}$/.test(value) ? value + "T12:00:00" : value;
    const parsed = new Date(source);
    if (Number.isNaN(parsed.getTime())) return value;
    return new Intl.DateTimeFormat("ru-RU", options || { day: "numeric", month: "long" }).format(parsed);
  }

  function currentOrganization() {
    if (!state.dashboard) return null;
    return state.dashboard.organizations.find(function (organization) {
      return organization.id === state.organizationId;
    }) || state.dashboard.organizations[0] || null;
  }

  function allCases(organization) {
    return organization && Array.isArray(organization.cases) ? organization.cases : [];
  }

  function currentCase() {
    const cases = allCases(currentOrganization());
    return cases.find(function (item) { return item.id === state.caseId; }) || cases[0] || null;
  }

  function updateView(view) {
    state.view = view;
    document.querySelectorAll("[data-portal-view]").forEach(function (section) {
      section.classList.toggle("is-hidden", section.getAttribute("data-portal-view") !== view);
    });
    document.querySelectorAll(".nav-button[data-view]").forEach(function (button) {
      const active = button.getAttribute("data-view") === view;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "page" : "false");
    });
    if (view === "documents") renderDocuments();
    if (view === "messages") renderMessages();
    refreshIcons();
  }

  function showLogin() {
    state.csrfToken = "";
    state.dashboard = null;
    loginView.classList.remove("is-hidden");
    dashboardView.classList.add("is-hidden");
    logoutButton.classList.add("is-hidden");
    emailForm.classList.remove("is-hidden");
    codeForm.classList.add("is-hidden");
    demoCode.classList.add("is-hidden");
    setStatus(authStatus, "");
    refreshIcons();
  }

  function showDashboard() {
    loginView.classList.add("is-hidden");
    dashboardView.classList.remove("is-hidden");
    logoutButton.classList.remove("is-hidden");
    renderDashboard();
  }

  function renderOrganizations() {
    const switcher = document.getElementById("organization-switcher");
    const organizations = state.dashboard.organizations || [];
    switcher.innerHTML = organizations.map(function (organization) {
      const active = organization.id === state.organizationId;
      return "<button class=\"organization-button" + (active ? " is-active" : "") + "\" type=\"button\" data-organization-id=\"" + organization.id + "\">" +
        "<span class=\"org-kind\">" + escapeHtml(organization.kind) + "</span>" +
        "<span class=\"org-copy\"><strong>" + escapeHtml(organization.display_name) + "</strong><small>ИНН " + escapeHtml(organization.inn) + "</small></span>" +
        "</button>";
    }).join("");
  }

  function renderSummary(organization) {
    const cases = allCases(organization);
    const activeCases = cases.filter(function (item) { return item.progress < 100; });
    const tasks = cases.flatMap(function (item) { return item.tasks || []; });
    const waitingTasks = tasks.filter(function (item) { return item.status === "current"; });
    const documents = cases.flatMap(function (item) { return item.documents || []; });
    const waitingDocuments = documents.filter(function (item) {
      return /ожида|нужен|запрос/i.test(item.status);
    });
    const deadlines = activeCases.filter(function (item) { return item.deadline; }).sort(function (a, b) {
      return String(a.deadline).localeCompare(String(b.deadline));
    });
    const nextDeadline = deadlines[0];

    const items = [
      { label: "В работе", value: String(activeCases.length), icon: "briefcase-business" },
      { label: "Требуют действия", value: String(waitingTasks.length), icon: "circle-alert" },
      { label: "Ожидаются документы", value: String(waitingDocuments.length), icon: "file-clock" },
      { label: "Ближайший срок", value: nextDeadline ? formatDate(nextDeadline.deadline, { day: "numeric", month: "short" }) : "Нет", icon: "calendar-days" },
    ];
    document.getElementById("summary-grid").innerHTML = items.map(function (item) {
      return "<article class=\"summary-item\"><div><small>" + escapeHtml(item.label) + "</small><strong>" + escapeHtml(item.value) + "</strong></div>" +
        "<span class=\"summary-icon\"><i data-lucide=\"" + item.icon + "\"></i></span></article>";
    }).join("");
  }

  function renderCases(organization) {
    const cases = allCases(organization);
    document.getElementById("case-total").textContent = cases.length + " " + plural(cases.length, "ситуация", "ситуации", "ситуаций");
    const list = document.getElementById("case-list");
    if (!cases.length) {
      list.innerHTML = "<div class=\"empty-state\">Активных ситуаций нет</div>";
      return;
    }
    list.innerHTML = cases.map(function (item) {
      return "<article class=\"case-card\">" +
        "<div><div class=\"case-topline\"><span class=\"case-category\">" + escapeHtml(item.category) + "</span><span class=\"status-pill\">" + escapeHtml(item.status) + "</span></div>" +
        "<h3>" + escapeHtml(item.title) + "</h3><p class=\"case-stage\">" + escapeHtml(item.stage) + "</p></div>" +
        "<div class=\"case-progress\"><div class=\"case-progress-row\"><span>Готовность</span><strong>" + Number(item.progress || 0) + "%</strong></div>" +
        "<div class=\"progress-track\"><span style=\"--progress:" + Number(item.progress || 0) + "%\"></span></div>" +
        "<div class=\"case-deadline\"><i data-lucide=\"calendar-clock\"></i><span>" + escapeHtml(formatDate(item.deadline)) + "</span></div></div>" +
        "</article>";
    }).join("");
  }

  function renderOverviewAside(organization) {
    const cases = allCases(organization).filter(function (item) { return item.progress < 100; });
    const prioritized = cases.slice().sort(function (a, b) {
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return String(a.deadline).localeCompare(String(b.deadline));
    })[0];
    const actionPanel = document.getElementById("next-action-panel");
    if (prioritized) {
      actionPanel.innerHTML = "<span class=\"panel-icon\"><i data-lucide=\"list-checks\"></i></span>" +
        "<h3>Ближайший шаг</h3><p>" + escapeHtml(prioritized.next_action || prioritized.stage) + "</p>" +
        "<div class=\"next-action-meta\"><i data-lucide=\"clock-3\"></i><span>До " + escapeHtml(formatDate(prioritized.deadline)) + "</span></div>";
    } else {
      actionPanel.innerHTML = "<span class=\"panel-icon\"><i data-lucide=\"circle-check-big\"></i></span><h3>Задачи завершены</h3><p>Новых действий пока нет.</p>";
    }

    const managerPanel = document.getElementById("manager-panel");
    managerPanel.innerHTML = "<span class=\"panel-icon\"><i data-lucide=\"user-round-check\"></i></span>" +
      "<h3>" + escapeHtml(organization.manager_name || "Ваш специалист") + "</h3><p>Ведёт текущие ситуации</p>" +
      "<div class=\"manager-contact-list\">" +
      (organization.manager_phone ? "<a href=\"tel:" + escapeHtml(organization.manager_phone.replace(/[^+\d]/g, "")) + "\"><i data-lucide=\"phone\"></i><span>" + escapeHtml(organization.manager_phone) + "</span></a>" : "") +
      (organization.manager_email ? "<a href=\"mailto:" + escapeHtml(organization.manager_email) + "\"><i data-lucide=\"mail\"></i><span>" + escapeHtml(organization.manager_email) + "</span></a>" : "") +
      "</div>";
    document.getElementById("sidebar-manager").textContent = organization.manager_name || "Специалист";
  }

  function renderDocuments() {
    const organization = currentOrganization();
    if (!organization) return;
    const cases = allCases(organization);
    const filters = document.getElementById("document-case-filter");
    filters.innerHTML = "<button type=\"button\" data-document-case=\"all\" class=\"" + (state.documentCaseId === "all" ? "is-active" : "") + "\">Все</button>" +
      cases.map(function (item) {
        const active = String(item.id) === String(state.documentCaseId);
        return "<button type=\"button\" data-document-case=\"" + item.id + "\" class=\"" + (active ? "is-active" : "") + "\">" + escapeHtml(item.title) + "</button>";
      }).join("");

    const uploadSelect = document.getElementById("upload-case");
    uploadSelect.innerHTML = cases.map(function (item) {
      return "<option value=\"" + item.id + "\">" + escapeHtml(item.title) + "</option>";
    }).join("");

    const documents = cases.flatMap(function (caseItem) {
      return (caseItem.documents || []).map(function (documentItem) {
        return Object.assign({}, documentItem, { caseTitle: caseItem.title, caseId: caseItem.id });
      });
    }).filter(function (item) {
      return state.documentCaseId === "all" || String(item.caseId) === String(state.documentCaseId);
    });
    document.getElementById("documents-count").textContent = String(cases.flatMap(function (item) { return item.documents || []; }).length);
    const list = document.getElementById("document-list");
    if (!documents.length) {
      list.innerHTML = "<tr><td colspan=\"5\"><div class=\"empty-state\">Документов пока нет</div></td></tr>";
      refreshIcons();
      return;
    }
    list.innerHTML = documents.map(function (item) {
      const waiting = /ожида|нужен|запрос/i.test(item.status);
      const action = item.download_available
        ? "<a class=\"download-link\" href=\"/api/cabinet/documents/" + item.id + "/download\" title=\"Скачать\" aria-label=\"Скачать " + escapeHtml(item.title) + "\"><i data-lucide=\"download\"></i></a>"
        : "<span class=\"muted\">—</span>";
      return "<tr><td><span class=\"document-name\"><i data-lucide=\"file-text\"></i><span>" + escapeHtml(item.title) + "</span></span></td>" +
        "<td>" + escapeHtml(item.caseTitle) + "</td><td><span class=\"document-status" + (waiting ? " is-waiting" : "") + "\">" + escapeHtml(item.status) + "</span></td>" +
        "<td>" + escapeHtml(formatDate(item.uploaded_at, { day: "2-digit", month: "2-digit", year: "numeric" })) + "</td><td>" + action + "</td></tr>";
    }).join("");
    refreshIcons();
  }

  function renderMessages() {
    const organization = currentOrganization();
    if (!organization) return;
    const cases = allCases(organization);
    if (!cases.some(function (item) { return item.id === state.caseId; })) {
      state.caseId = cases[0] ? cases[0].id : null;
    }
    const list = document.getElementById("conversation-list");
    list.innerHTML = cases.map(function (item) {
      const active = item.id === state.caseId;
      const messages = item.messages || [];
      const last = messages[messages.length - 1];
      return "<button class=\"conversation-button" + (active ? " is-active" : "") + "\" type=\"button\" data-case-id=\"" + item.id + "\">" +
        "<span class=\"conversation-icon\"><i data-lucide=\"messages-square\"></i></span><span class=\"conversation-copy\"><strong>" + escapeHtml(item.title) + "</strong>" +
        "<small>" + escapeHtml(last ? last.body : "Нет сообщений") + "</small></span></button>";
    }).join("");

    const selected = currentCase();
    const header = document.getElementById("conversation-header");
    const feed = document.getElementById("message-feed");
    const form = document.getElementById("message-form");
    if (!selected) {
      header.innerHTML = "";
      feed.innerHTML = "<div class=\"empty-state\">Нет активных ситуаций</div>";
      form.classList.add("is-hidden");
      refreshIcons();
      return;
    }
    form.classList.remove("is-hidden");
    header.innerHTML = "<strong>" + escapeHtml(selected.title) + "</strong><small>" + escapeHtml(selected.status) + " · " + escapeHtml(selected.stage) + "</small>";
    const messages = selected.messages || [];
    feed.innerHTML = messages.length ? messages.map(function (message) {
      return "<article class=\"message-bubble" + (message.author_role === "client" ? " is-client" : "") + "\"><div class=\"message-meta\"><strong>" +
        escapeHtml(message.author_name) + "</strong><time>" + escapeHtml(formatDate(message.created_at, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })) +
        "</time></div><p>" + escapeHtml(message.body) + "</p></article>";
    }).join("") : "<div class=\"empty-state\">Сообщений пока нет</div>";
    window.setTimeout(function () { feed.scrollTop = feed.scrollHeight; }, 0);
    refreshIcons();
  }

  function plural(number, one, few, many) {
    const mod10 = number % 10;
    const mod100 = number % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
  }

  function renderDashboard() {
    const user = state.dashboard.user;
    const organizations = state.dashboard.organizations || [];
    if (!state.organizationId || !organizations.some(function (item) { return item.id === state.organizationId; })) {
      state.organizationId = organizations[0] ? organizations[0].id : null;
    }
    const organization = currentOrganization();
    state.caseId = state.caseId || (organization && organization.cases[0] ? organization.cases[0].id : null);
    document.getElementById("workspace-date").textContent = new Intl.DateTimeFormat("ru-RU", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
    document.getElementById("welcome-title").textContent = user && user.full_name ? "Добрый день, " + user.full_name.split(" ")[0] : "Добрый день";
    renderOrganizations();
    if (organization) {
      renderSummary(organization);
      renderCases(organization);
      renderOverviewAside(organization);
      renderDocuments();
      renderMessages();
      setStatus(workspaceStatus, organization.display_name + " · ИНН " + organization.inn);
    } else {
      document.getElementById("summary-grid").innerHTML = "";
      document.getElementById("case-list").innerHTML = "<div class=\"empty-state\">Организации пока не подключены</div>";
      setStatus(workspaceStatus, "Организации пока не подключены.");
    }
    updateView(state.view);
    refreshIcons();
  }

  async function loadDashboard() {
    setStatus(workspaceStatus, "Обновляю данные…");
    const payload = await api("/api/cabinet/dashboard", { method: "GET" });
    state.dashboard = { user: payload.user, organizations: payload.organizations || [] };
    showDashboard();
  }

  emailForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    loginEmail = emailInput.value.trim();
    setBusy(emailForm, true);
    setStatus(authStatus, "Отправляю код…");
    demoCode.classList.add("is-hidden");
    try {
      const payload = await api("/api/cabinet/auth/request", {
        method: "POST",
        body: JSON.stringify({ email: loginEmail }),
      });
      setStatus(authStatus, payload.message, "success");
      emailForm.classList.add("is-hidden");
      codeForm.classList.remove("is-hidden");
      if (payload.dev_code) {
        demoCode.textContent = "Демо-код: " + payload.dev_code;
        demoCode.classList.remove("is-hidden");
        codeInput.value = payload.dev_code;
      }
      codeInput.focus();
    } catch (error) {
      setStatus(authStatus, error.message, "error");
    } finally {
      setBusy(emailForm, false);
    }
  });

  codeForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    setBusy(codeForm, true);
    setStatus(authStatus, "Проверяю код…");
    try {
      const payload = await api("/api/cabinet/auth/verify", {
        method: "POST",
        body: JSON.stringify({ email: loginEmail, code: codeInput.value }),
      });
      state.csrfToken = payload.csrf_token;
      await loadDashboard();
    } catch (error) {
      setStatus(authStatus, error.message, "error");
    } finally {
      setBusy(codeForm, false);
    }
  });

  document.getElementById("change-email-button").addEventListener("click", function () {
    emailForm.classList.remove("is-hidden");
    codeForm.classList.add("is-hidden");
    demoCode.classList.add("is-hidden");
    codeInput.value = "";
    setStatus(authStatus, "");
    emailInput.focus();
  });

  logoutButton.addEventListener("click", async function () {
    logoutButton.disabled = true;
    try {
      await api("/api/cabinet/logout", { method: "POST", body: JSON.stringify({}) });
    } catch (_) {
      // The local session is cleared even when the server has already expired it.
    } finally {
      logoutButton.disabled = false;
      showLogin();
    }
  });

  document.addEventListener("click", function (event) {
    const organizationButton = event.target.closest("[data-organization-id]");
    if (organizationButton) {
      state.organizationId = Number(organizationButton.getAttribute("data-organization-id"));
      state.caseId = null;
      state.documentCaseId = "all";
      renderDashboard();
      return;
    }
    const navButton = event.target.closest("[data-view]");
    if (navButton) {
      updateView(navButton.getAttribute("data-view"));
      return;
    }
    const targetButton = event.target.closest("[data-view-target]");
    if (targetButton) {
      updateView(targetButton.getAttribute("data-view-target"));
      return;
    }
    const filterButton = event.target.closest("[data-document-case]");
    if (filterButton) {
      state.documentCaseId = filterButton.getAttribute("data-document-case");
      renderDocuments();
      return;
    }
    const conversationButton = event.target.closest("[data-case-id]");
    if (conversationButton) {
      state.caseId = Number(conversationButton.getAttribute("data-case-id"));
      renderMessages();
    }
  });

  document.getElementById("upload-open-button").addEventListener("click", function () {
    document.getElementById("upload-form").classList.remove("is-hidden");
    document.getElementById("upload-file").focus();
  });

  document.getElementById("upload-cancel-button").addEventListener("click", function () {
    document.getElementById("upload-form").classList.add("is-hidden");
    document.getElementById("upload-form").reset();
    setStatus(document.getElementById("upload-status"), "");
  });

  document.getElementById("upload-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.currentTarget;
    const caseId = document.getElementById("upload-case").value;
    const status = document.getElementById("upload-status");
    const data = new FormData();
    data.append("file", document.getElementById("upload-file").files[0]);
    setBusy(form, true);
    setStatus(status, "Загружаю файл…");
    try {
      await api("/api/cabinet/cases/" + caseId + "/documents", { method: "POST", body: data });
      await loadDashboard();
      form.reset();
      form.classList.add("is-hidden");
      showToast("Файл загружен");
      updateView("documents");
    } catch (error) {
      setStatus(status, error.message, "error");
    } finally {
      setBusy(form, false);
    }
  });

  document.getElementById("message-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = document.getElementById("message-body").value.trim();
    if (!state.caseId || !body) return;
    setBusy(form, true);
    try {
      await api("/api/cabinet/cases/" + state.caseId + "/messages", {
        method: "POST",
        body: JSON.stringify({ body: body }),
      });
      document.getElementById("message-body").value = "";
      await loadDashboard();
      updateView("messages");
      showToast("Сообщение отправлено");
    } catch (error) {
      showToast(error.message);
    } finally {
      setBusy(form, false);
    }
  });

  async function bootstrap() {
    refreshIcons();
    try {
      const session = await api("/api/cabinet/session", { method: "GET" });
      if (!session.authenticated) {
        showLogin();
        return;
      }
      state.csrfToken = session.csrf_token;
      await loadDashboard();
    } catch (_) {
      showLogin();
      setStatus(authStatus, "Кабинет временно недоступен.", "error");
    }
  }

  bootstrap();
})();
