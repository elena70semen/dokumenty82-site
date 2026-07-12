(function () {
  const MAX_FILES = 6;
  const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

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
    if (!input || !list) return "";

    const files = selectedFiles(input);
    list.textContent = "";
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

  function fireGoal(name) {
    if (typeof window.ym !== "function") return;
    try { window.ym(109869928, "reachGoal", name); } catch (_) {}
  }

  function wireForm(form) {
    form.setAttribute("novalidate", "");

    const fileInput = form.querySelector('input[type="file"]');
    const submit = form.querySelector('button[type="submit"]');

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

      const trap = form.querySelector('input[name="company_website"]');
      if (trap && trap.value) return;

      const fileMessage = renderFiles(form);
      if (fileMessage) {
        setStatus(form, fileMessage);
        fireGoal("goal_form_submit_fail");
        return;
      }

      if (!form.checkValidity()) {
        setStatus(form, "Заполните имя, телефон, описание ситуации и согласие.");
        fireGoal("goal_form_submit_fail");
        return;
      }

      const data = new FormData(form);
      form.classList.add("is-sending");
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Отправляем...";
      }
      setStatus(form, "Отправляем заявку.");

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" },
      })
        .then(function (response) {
          return response.json().catch(function () { return {}; }).then(function (payload) {
            if (!response.ok) {
              throw new Error(payload.message || "Не удалось отправить форму.");
            }
            return payload;
          });
        })
        .then(function () {
          form.reset();
          renderFiles(form);
          setStatus(form, "Заявка отправлена. Мы свяжемся с вами по указанному телефону.");
          fireGoal("lead_submit_success");
        })
        .catch(function (error) {
          setStatus(form, error.message || "Форма временно недоступна. Позвоните или напишите в мессенджер.");
          fireGoal("goal_form_submit_fail");
        })
        .finally(function () {
          form.classList.remove("is-sending");
          if (submit) {
            submit.disabled = false;
            submit.textContent = "Отправить заявку";
          }
        });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('form[data-lead-form="amo"]').forEach(wireForm);
  });
})();
