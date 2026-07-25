(() => {
  const calendar = document.querySelector("[data-tax-calendar]");
  if (!calendar) return;

  const entries = Array.from(calendar.querySelectorAll("[data-calendar-entry]"));
  const monthButtons = Array.from(calendar.querySelectorAll("[data-calendar-month]"));
  const groupButtons = Array.from(calendar.querySelectorAll("[data-calendar-group]"));
  const count = calendar.querySelector("[data-calendar-count]");
  const empty = calendar.querySelector("[data-calendar-empty]");

  const state = {
    month: "all",
    group: "all",
  };

  const setPressed = (buttons, activeButton) => {
    buttons.forEach((button) => {
      const active = button === activeButton;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("is-active", active);
    });
  };

  const applyFilters = () => {
    let visible = 0;

    entries.forEach((entry) => {
      const monthMatches = state.month === "all" || entry.dataset.month === state.month;
      const groups = (entry.dataset.groups || "").split(/\s+/);
      const groupMatches = state.group === "all" || groups.includes(state.group);
      const show = monthMatches && groupMatches;

      entry.hidden = !show;
      if (show) visible += 1;
    });

    if (count) {
      count.textContent = `${visible} ${visible === 1 ? "срок" : visible > 1 && visible < 5 ? "срока" : "сроков"}`;
    }
    if (empty) empty.hidden = visible !== 0;
  };

  monthButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.month = button.dataset.calendarMonth;
      setPressed(monthButtons, button);
      applyFilters();
    });
  });

  groupButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.group = button.dataset.calendarGroup;
      setPressed(groupButtons, button);
      applyFilters();
    });
  });

  applyFilters();
})();
