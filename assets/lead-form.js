(function () {
  const MAX_FILES = 6;
  const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
  const ATTRIBUTION_TIMEOUT_MS = 3500;
  const REQUEST_TIMEOUT_MS = 120000;
  const UPLOAD_TIMEOUT_MS = 300000;

  function formatBytes(value) {
    if (value >= 1024 * 1024) return (value / 1024 / 1024).toFixed(1) + " МБ";
    if (value >= 1024) return Math.round(value / 1024) + " КБ";
    return value + " Б";
  }

  function setStatus(form, message) {
    const status = form.querySelector('[role="status"][aria-live]');
    if (status) status.textContent = message;
  }

  function selectedFiles(input) {
    return Array.prototype.slice.call(input && input.files ? input.files : []);
  }

  function validateFiles(files) {
    const total = files.reduce(function (sum, file) { return sum + file.size; }, 0);
    if (files.length > MAX_FILES) {
      return "Можно приложить не больше 6 файлов.";
    }
    if (total > MAX_TOTAL_BYTES) {
      return "Файлы весят " + formatBytes(total) + ". Лимит - 20 МБ.";
    }
    return "";
  }

  function renderFiles(form) {
    const input = form.querySelector('input[type="file"]');
    const list = form.querySelector(".lead-file-list");
    const pickerStatus = form.querySelector(".lead-file-picker-status");
    if (!input || !list) return "";

    const files = selectedFiles(input);
    list.textContent = "";
    if (pickerStatus) {
      pickerStatus.textContent = files.length === 0
        ? "Файлы не выбраны"
        : files.length === 1
          ? files[0].name
          : "Выбрано файлов: " + files.length;
    }
    files.forEach(function (file) {
      const item = document.createElement("li");
      const name = document.createElement("span");
      const size = document.createElement("span");
      name.textContent = file.name;
      size.textContent = formatBytes(file.size);
      item.appendChild(name);
      item.appendChild(size);
      list.appendChild(item);
    });

    return validateFiles(files);
  }

  function fireGoal(name, params) {
    try {
      if (typeof window.d82TrackGoal === "function") {
        window.d82TrackGoal(name, params);
        return;
      }
      if (typeof window.ym !== "function") return;
      window.ym(109869928, "reachGoal", name, Object.assign({
        path: window.location.pathname,
      }, params || {}));
    } catch (_) {}
  }

  function appendAttribution(data) {
    if (typeof window.d82GetAttribution !== "function") {
      return Promise.resolve(data);
    }
    let timer;
    // Analytics is optional; a missing callback must not block a real request.
    return Promise.race([
      Promise.resolve().then(function () { return window.d82GetAttribution(); }),
      new Promise(function (resolve) {
        timer = setTimeout(function () { resolve({}); }, ATTRIBUTION_TIMEOUT_MS);
      }),
    ])
      .then(function (attribution) {
        Object.keys(attribution || {}).forEach(function (key) {
          const value = String(attribution[key] || "").trim();
          if (value) data.append(key, value);
        });
        return data;
      })
      .catch(function () { return data; })
      .finally(function () { clearTimeout(timer); });
  }

  function failForm(form, reason, message, httpStatus, field) {
    setStatus(form, message);
    // Fixed values only: never send field values, filenames or exception text.
    const params = { form: "amo_lead", reason: reason };
    if (Number.isInteger(httpStatus) && httpStatus >= 100 && httpStatus <= 599) {
      params.http_status = httpStatus;
    }
    if (["name", "phone", "email", "message", "privacy"].includes(field)) {
      params.field = field;
    }
    fireGoal("goal_form_submit_fail", params);
  }

  function postLead(form, data, hasFiles) {
    const controller = typeof AbortController === "function" ? new AbortController() : null;
    let timer;
    const request = Promise.resolve().then(function () {
      return fetch(form.action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" },
        ...(controller ? { signal: controller.signal } : {}),
      });
    }).then(function (response) {
      return response.json().catch(function () { return null; }).then(function (payload) {
        if (!response.ok || !payload || payload.ok !== true || !payload.id
            || !["sent", "stored_only"].includes(payload.crm_status)) {
          throw { reason: "server", http_status: response.status };
        }
        return payload;
      });
    });
    // Cover both headers and body; a late response must not reset a newer attempt.
    const deadline = new Promise(function (_, reject) {
      timer = setTimeout(function () {
        reject({ reason: "timeout" });
        if (controller) controller.abort();
      }, hasFiles ? UPLOAD_TIMEOUT_MS : REQUEST_TIMEOUT_MS);
    });
    return Promise.race([request, deadline]).finally(function () { clearTimeout(timer); });
  }

  function validPhone(value) {
    const raw = String(value || "").trim();
    if (/[A-Za-zА-Яа-я]/.test(raw)) return false;
    let digits = raw.replace(/\D/g, "");
    if (digits.startsWith("00")) digits = digits.slice(2);
    if (digits.length === 10) digits = "7" + digits;
    else if (digits.length === 11 && digits.startsWith("8")) digits = "7" + digits.slice(1);
    return /^[1-9]\d{7,14}$/.test(digits);
  }

  function wireForm(form) {
    form.setAttribute("novalidate", "");

    // Only a fixed service label is carried into the shared contact form.
    // Keep a user's restored selection and never prefill personal information.
    if (window.location.pathname === "/razbor-situacii/") {
      const topics = new Map([
        ["accounting", "Подбор бухгалтерских услуг"],
        ["accounting-ip", "Бухгалтерское сопровождение ИП"],
        ["accounting-ooo", "Бухгалтерское сопровождение ООО"],
      ]);
      const topic = topics.get(new URLSearchParams(window.location.search).get("service"));
      const select = form.querySelector('select[name="task_type"]');
      if (topic && select && select.value === "Разбор ситуации" &&
          Array.from(select.options).some(function (option) { return option.value === topic; })) {
        select.value = topic;
      }
    }

    const fileInput = form.querySelector('input[type="file"]');
    const submit = form.querySelector('button[type="submit"]');
    const submitLabel = submit ? submit.textContent : "Отправить заявку";
    let sending = false;

    if (fileInput) {
      fileInput.addEventListener("change", function () {
        const message = renderFiles(form);
        setStatus(form, message || "");
      });
    }

    form.addEventListener("input", function () {
      if (!form.dataset.started) {
        form.dataset.started = "true";
        fireGoal("goal_form_start");
      }
    }, { once: true });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (sending) return;

      const trap = form.querySelector('input[name="company_website"]');
      if (trap && trap.value) return;

      fireGoal("goal_form_submit_attempt", {
        form: "amo_lead",
      });

      const fileMessage = renderFiles(form);
      if (fileMessage) {
        failForm(form, "files", fileMessage);
        if (fileInput) fileInput.focus();
        return;
      }

      const isQuickLead = Boolean(form.querySelector('input[name="lead_mode"][value="quick"]'));
      const emptyText = (isQuickLead ? [] : ["name", "message"]).map(function (name) {
        return form.querySelector('[name="' + name + '"]');
      }).find(function (field) {
        return field && !String(field.value || "").trim();
      });
      const phone = form.querySelector('[name="phone"]');
      const invalidPhone = phone && !validPhone(phone.value);
      if (!form.checkValidity() || emptyText || invalidPhone) {
        const invalid = emptyText || (invalidPhone && phone) || form.querySelector(":invalid");
        const field = invalid && invalid.name;
        const messages = new Map([
          ["name", "Укажите, как к вам обращаться."],
          ["phone", "Укажите телефон с кодом страны, например +7 (978) 123-45-67. Добавочный номер можно написать в описании."],
          ["email", "Проверьте email или оставьте это необязательное поле пустым."],
          ["message", "Коротко опишите, с каким вопросом нужна помощь."],
          ["privacy", "Подтвердите согласие на обработку данных, чтобы отправить заявку."],
        ]);
        failForm(form, "fields", messages.get(field) || "Проверьте обязательные поля и согласие на обработку данных.", undefined, field);
        if (invalid) invalid.focus();
        return;
      }

      const data = new FormData(form);
      const hasFiles = selectedFiles(fileInput).length > 0;
      sending = true;
      form.classList.add("is-sending");
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Отправляем...";
      }
      setStatus(form, "Отправляем заявку.");

      appendAttribution(data)
        .then(function (payloadData) {
          return postLead(form, payloadData, hasFiles);
        })
        .then(function (payload) {
          form.reset();
          renderFiles(form);
          setStatus(form, "Заявка отправлена. Мы свяжемся с вами по указанному телефону.");
          fireGoal("lead_submit_success", {
            form: "amo_lead",
            crm_status: payload.crm_status,
          });
        })
        .catch(function (error) {
          const serverError = error && error.reason === "server";
          if (error && error.reason === "timeout") {
            failForm(form, "timeout",
              "Подтверждение от сервера не пришло вовремя. Данные сохранены в форме. Заявка могла поступить: уточните её приём по телефону или в мессенджере перед повторной отправкой.");
            return;
          }
          failForm(form, serverError ? "server" : "network",
            serverError
              ? "Сервер не подтвердил приём заявки. Позвоните или напишите в мессенджер, прежде чем отправлять повторно."
              : "Не удалось получить ответ. Проверьте соединение; перед повторной отправкой можно уточнить приём по телефону или в мессенджере.",
            serverError ? error.http_status : undefined);
        })
        .finally(function () {
          sending = false;
          form.classList.remove("is-sending");
          if (submit) {
            submit.disabled = false;
            submit.textContent = submitLabel;
          }
        });
    });
  }

  function wirePromotionLinks() {
    const form = document.querySelector('#promotion-contact form[data-lead-form="amo"]');
    const select = form && form.querySelector('select[name="task_type"]');
    if (!select) return;

    document.querySelectorAll("[data-promotion]").forEach(function (link) {
      link.addEventListener("click", function () {
        const promotion = String(link.dataset.promotion || "").trim();
        if (!promotion) return;
        select.value = promotion;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('form[data-lead-form="amo"]').forEach(wireForm);
    wirePromotionLinks();
  });
})();
