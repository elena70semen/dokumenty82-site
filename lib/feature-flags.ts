export const siteFeatureFlags = {
  publicLiveAllowed: true,
  formsLive: false,
  crmEnabled: false,
  crmSuccessEnabled: false,
  analyticsEnabled: false,
  metricaEnabled: true,
  paidTrafficAllowed: false,
  localProfilesPublic: false,
  maxEnabled: false,
  telegramEnabled: false,
  messagingEnabled: false,
  messagingRevealEnabled: false,
  mapEnabled: false,
  cookieNoticeEnabled: true,
  formPlaceholdersEnabled: true
} as const;

export const siteRuntimeMode = siteFeatureFlags.publicLiveAllowed
  ? "PUBLIC_LIVE"
  : "STATIC_CONTACT_ONLY_LAUNCH_CANDIDATE";

export const publicIndexingAllowed = siteFeatureFlags.publicLiveAllowed;

export type SiteFeatureFlag = keyof typeof siteFeatureFlags;
export type SiteRuntimeMode = typeof siteRuntimeMode;
