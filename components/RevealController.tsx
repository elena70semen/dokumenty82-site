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

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 3) {
        document.body.dataset.scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
        lastScrollY = currentScrollY;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    document.body.dataset.scrollDirection = "down";

    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => {
        item.classList.add("reveal-block");
        item.classList.remove("reveal-ready");
        item.classList.add("is-visible");
      });
      return;
    }

    let frameId = 0;
    window.addEventListener("scroll", onScroll, { passive: true });

    items.forEach((item, index) => {
      item.classList.remove("is-visible");
      item.classList.add("reveal-block", "reveal-ready");
      item.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            entry.target.classList.remove("is-visible");
            entry.target.classList.add("reveal-ready");
            return;
          }

          entry.target.classList.remove("reveal-ready");
          entry.target.classList.add("is-visible");
        });
      },
      {
        root: null,
        rootMargin: "-7% 0px -10% 0px",
        threshold: 0.12
      }
    );

    frameId = window.requestAnimationFrame(() => {
      items.forEach((item) => observer.observe(item));
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      delete document.body.dataset.scrollDirection;
    };
  }, [pathname]);

  return null;
}
