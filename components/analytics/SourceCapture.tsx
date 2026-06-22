"use client";

import { useEffect } from "react";
import { analyticsGoalNames, trackAnalyticsGoal, type AnalyticsGoalName } from "@/lib/integrations/analytics-events";
import { captureSourceFromDataset, captureSourceFromLocation } from "@/lib/integrations/source-capture";

function getPageSlugFromPath(pathname: string) {
  if (pathname === "/" || pathname === "") return "home";
  return pathname.replace(/^\/|\/$/g, "") || "home";
}

function getPageTypeFromPath(pathname: string) {
  if (pathname === "/" || pathname === "") return "homepage";
  if (pathname.startsWith("/kontakty")) return "contact_page";
  if (pathname.startsWith("/policy")) return "legal";
  if (pathname.startsWith("/blog")) return "blog_noindex";
  return "route";
}

function isAnalyticsGoalName(value: string | undefined): value is AnalyticsGoalName {
  return Object.values(analyticsGoalNames).includes(value as AnalyticsGoalName);
}

export function SourceCapture() {
  useEffect(() => {
    captureSourceFromLocation({
      page_slug: getPageSlugFromPath(window.location.pathname),
      page_type: getPageTypeFromPath(window.location.pathname)
    });

    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest("[data-analytics-goal]") : null;
      if (!(target instanceof HTMLElement)) return;

      const goal = target.dataset.analyticsGoal;
      if (!isAnalyticsGoalName(goal)) return;

      const pageContext = {
        page_slug: target.dataset.pageSlug || getPageSlugFromPath(window.location.pathname),
        page_type: target.dataset.pageType || getPageTypeFromPath(window.location.pathname),
        cta_label: target.dataset.ctaLabel,
        cta_location: target.dataset.ctaLocation,
        collector_type: target.dataset.collectorType,
        lead_topic: target.dataset.leadTopic,
        related_href: target.dataset.relatedHref
      };

      captureSourceFromDataset(target.dataset);
      trackAnalyticsGoal(goal, pageContext);
    }

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return null;
}
