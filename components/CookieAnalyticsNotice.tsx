"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteFeatureFlags } from "@/lib/feature-flags";

const storageKey = "dokumenty82_cookie_analytics_notice_v1";

export function CookieAnalyticsNotice() {
  const [isVisible, setIsVisible] = useState<boolean>(siteFeatureFlags.cookieNoticeEnabled);

  useEffect(() => {
    if (!siteFeatureFlags.cookieNoticeEnabled) return;

    try {
      setIsVisible(window.localStorage.getItem(storageKey) !== "dismissed");
    } catch {
      setIsVisible(true);
    }
  }, []);

  if (!siteFeatureFlags.cookieNoticeEnabled || !isVisible) {
    return null;
  }

  function dismissNotice() {
    try {
      window.localStorage.setItem(storageKey, "dismissed");
    } catch {
      // The notice stays non-blocking even when localStorage is unavailable.
    }

    setIsVisible(false);
  }

  return (
    <aside
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto grid max-w-3xl gap-4 rounded-[8px] border border-[rgba(255,255,255,0.18)] bg-[rgba(17,24,33,0.86)] p-4 text-[color:var(--text-inverse)] shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-md sm:grid-cols-[1fr_auto] sm:items-center"
      role="status"
      aria-label="Уведомление об аналитике и cookies"
    >
      <p className="text-sm font-semibold leading-6 text-[color:var(--text-inverse-muted)]">
        Сайт использует техническую аналитику и cookies, чтобы улучшать работу страниц. В события не передаются тексты
        сообщений, документов или сканов. Подробнее:{" "}
        <Link href="/policy/" className="text-[color:var(--lime-signal)] underline underline-offset-4">
          политика конфиденциальности
        </Link>
        .
      </p>
      <button
        type="button"
        className="min-h-11 rounded-[8px] bg-[var(--lime-signal)] px-5 py-3 text-sm font-black text-[color:var(--lime-text)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
        onClick={dismissNotice}
      >
        Понятно
      </button>
    </aside>
  );
}
