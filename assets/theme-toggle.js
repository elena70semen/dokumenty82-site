(function () {
  "use strict";

  const root = document.documentElement;

  root.dataset.theme = "dark";
  root.style.colorScheme = "dark";

  try {
    localStorage.setItem("d82_theme", "dark");
  } catch (_error) {
    // Dark mode remains active when storage is unavailable.
  }

  const removeThemeControls = () => {
    document.querySelectorAll(".theme-toggle").forEach((button) => button.remove());
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", removeThemeControls, { once: true });
  } else {
    removeThemeControls();
  }
})();
