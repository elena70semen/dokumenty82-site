export const siteFeatureFlags = {
  formsLive: false,
  crmSuccessEnabled: false,
  analyticsEnabled: false,
  metricaEnabled: false,
  maxEnabled: false,
  telegramEnabled: false,
  messagingRevealEnabled: false,
  mapEnabled: false,
  cookieNoticeEnabled: false,
  formPlaceholdersEnabled: true
} as const;

export type SiteFeatureFlag = keyof typeof siteFeatureFlags;
