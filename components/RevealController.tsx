"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealSelectors = [
      "[data-reveal]",
      "main section > .container-premium > *",
      "main article",
      "main aside",
      "main details",
      "main form",
      "main img",
      "main .dark-glass-card",
      "main .glass-panel"
    ].join(",");
    const items = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors)).filter((item) => {
      if (item.closest("header, footer, [data-no-reveal]")) return false;
      const closestReveal = item.closest(".reveal-block");
      return !closestReveal || closestReveal === item;
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => {
        item.classList.add("reveal-block");
        item.classList.remove("reveal-ready");
        item.classList.add("is-visible");
      });
      return;
    }

    let frameId = 0;
    let timeoutId = 0;
    let lastScrollY = window.scrollY;
    let scrollDirection: "down" | "up" = "down";

    items.forEach((item, index) => {
      item.classList.remove("is-visible");
      item.classList.add("reveal-block", "reveal-ready");
      item.dataset.revealEnter = scrollDirection;
      item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 45}ms`);
    });

    const setVisible = (item: HTMLElement) => {
      if (item.classList.contains("is-visible")) return;

      item.dataset.revealEnter = scrollDirection;
      item.classList.remove("reveal-ready");
      item.classList.add("is-visible");
    };

    const setHidden = (item: HTMLElement) => {
      if (!item.classList.contains("is-visible") && item.classList.contains("reveal-ready")) {
        return;
      }

      item.dataset.revealEnter = scrollDirection;
      item.classList.remove("is-visible");
      item.classList.add("reveal-ready");
    };

    const updateVisibility = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (Math.abs(scrollDelta) > 5) {
        scrollDirection = scrollDelta > 0 ? "down" : "up";
        lastScrollY = currentScrollY;
      }

      const viewportHeight = window.innerHeight;
      const enterTop = viewportHeight * 0.96;
      const enterBottom = viewportHeight * 0.04;
      const resetGap = Math.min(220, Math.max(120, viewportHeight * 0.14));

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const isInsideRevealBand = rect.top < enterTop && rect.bottom > enterBottom;
        const isFarOutsideViewport = rect.bottom < -resetGap || rect.top > viewportHeight + resetGap;

        if (isInsideRevealBand) {
          setVisible(item);
          return;
        }

        if (isFarOutsideViewport) {
          setHidden(item);
        }
      });

      frameId = 0;
    };

    const scheduleVisibilityUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateVisibility);
    };

    scheduleVisibilityUpdate();
    timeoutId = window.setTimeout(scheduleVisibilityUpdate, 180);

    window.addEventListener("scroll", scheduleVisibilityUpdate, { passive: true });
    window.addEventListener("resize", scheduleVisibilityUpdate);
    window.addEventListener("load", scheduleVisibilityUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", scheduleVisibilityUpdate);
      window.removeEventListener("resize", scheduleVisibilityUpdate);
      window.removeEventListener("load", scheduleVisibilityUpdate);
    };
  }, [pathname]);

  return null;
}
