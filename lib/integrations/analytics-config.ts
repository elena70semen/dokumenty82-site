export type AnalyticsMode = "stub";

const STUB_METRIKA_ID = "00000000";

const envAnalyticsEnabled = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ENABLED === "true";
const envAnalyticsMode = process.env.NEXT_PUBLIC_ANALYTICS_MODE === "live" ? "live" : "stub";
const envMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() || STUB_METRIKA_ID;
const envHasRealMetrikaId = /^[1-9]\d{5,}$/.test(envMetrikaId);

export const analyticsConfig = {
  enabled: false,
  mode: "stub" satisfies AnalyticsMode,
  yandexMetrikaId: STUB_METRIKA_ID,
  domain: "dokumenty82.ru",
  siteUrl: "https://dokumenty82.ru/",
  canLoadScript: false,
  canSendEvents: false,
  envRequestedLive: envAnalyticsEnabled && envAnalyticsMode === "live" && envHasRealMetrikaId
} as const;

export function isAnalyticsStubbed() {
  return !analyticsConfig.enabled && !analyticsConfig.canLoadScript && !analyticsConfig.canSendEvents;
}
