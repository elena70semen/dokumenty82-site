export type AnalyticsMode = "production";

export const YANDEX_METRIKA_ID = "109869928";

export const analyticsConfig = {
  enabled: true,
  mode: "production" satisfies AnalyticsMode,
  yandexMetrikaId: YANDEX_METRIKA_ID,
  domain: "dokumenty82.ru",
  siteUrl: "https://dokumenty82.ru/",
  canLoadScript: true,
  canSendEvents: true,
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: false,
  ecommerce: false
} as const;

export function isAnalyticsProductionReady() {
  return analyticsConfig.enabled && analyticsConfig.canLoadScript && analyticsConfig.canSendEvents;
}
