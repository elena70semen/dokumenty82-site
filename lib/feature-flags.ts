export const siteFeatureFlags = {
  formsLive: false,
  crmEnabled: false,
  crmSuccessEnabled: false,
  analyticsEnabled: true,
  metricaEnabled: true,
  paidTrafficAllowed: false,
  maxEnabled: false,
  telegramEnabled: false,
  messagingRevealEnabled: false,
  mapEnabled: false,
  cookieNoticeEnabled: false,
  formPlaceholdersEnabled: true
} as const;

export type SiteFeatureFlag = keyof typeof siteFeatureFlags;
