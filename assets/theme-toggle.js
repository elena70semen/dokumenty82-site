(function () {
  "use strict";

  const storageKey = "d82_theme";
  const root = document.documentElement;
  const icons = {
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 15.1A9 9 0 0 1 8.9 3.2 9 9 0 1 0 20.8 15.1Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>',
  };

  const readSavedTheme = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch (_error) {
      return null;
    }
  };

  const savedTheme = readSavedTheme();
  root.dataset.theme = savedTheme === "dark" ? "dark" : "light";
  root.style.colorScheme = root.dataset.theme;

  const syncButtons = () => {
    const isDark = root.dataset.theme === "dark";
    const label = isDark ? "Включить светлую тему" : "Включить тёмную тему";
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.innerHTML = isDark ? icons.sun : icons.moon;
      button.setAttribute("aria-label", label);
      button.setAttribute("aria-pressed", String(isDark));
      button.title = label;
    });
  };

  const applyTheme = (theme, persist) => {
    root.dataset.theme = theme === "dark" ? "dark" : "light";
    root.style.colorScheme = root.dataset.theme;
    if (persist) {
      try {
        localStorage.setItem(storageKey, root.dataset.theme);
      } catch (_error) {
        // The selected theme still works for the current page when storage is unavailable.
      }
    }
    syncButtons();
  };

  const createButton = (extraClass) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `theme-toggle ${extraClass}`;
    button.addEventListener("click", () => {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
    });
    return button;
  };

  const mountButtons = () => {
    const desktopActions = document.querySelector(".site-header .header-actions");
    if (desktopActions && !desktopActions.querySelector(".theme-toggle")) {
      desktopActions.prepend(createButton("theme-toggle-desktop"));
    }

    const mobileActions = document.querySelector(".site-header .mobile-contact-panel");
    if (mobileActions && !mobileActions.querySelector(".theme-toggle")) {
      mobileActions.prepend(createButton("theme-toggle-mobile"));
    }
    syncButtons();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountButtons, { once: true });
  } else {
    mountButtons();
  }

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey) {
      applyTheme(event.newValue === "dark" ? "dark" : "light", false);
    }
  });
})();
