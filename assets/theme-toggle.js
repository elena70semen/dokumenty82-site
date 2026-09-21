(function () {
  "use strict";

  const root = document.documentElement;

  root.dataset.theme = "light";
  root.style.colorScheme = "light";

  try {
    localStorage.setItem("d82_theme", "light");
  } catch (_error) {
    // The light presentation remains active when storage is unavailable.
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
