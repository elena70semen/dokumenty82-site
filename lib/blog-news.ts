export const blogNewsSection = {
  label: "Блог и новости",
  preferredFraming: "Материалы, новости и обновления для бизнеса",
  href: "/blog/",
  indexing: "noindex",
  includeInSitemap: false,
  launchStatus: "FOUNDATION_NOINDEX"
} as const;

export const blogNewsCategories = [
  {
    label: "Обновления ФНС",
    href: "/blog/obnovleniya-fns/",
    section: "obnovleniya-fns",
    description: "Будущая рубрика для безопасных source-attributed обновлений ФНС и ИФНС.",
    indexing: "noindex",
    includeInSitemap: false
  },
  {
    label: "Разборы ситуаций",
    href: "/blog/razbory/",
    section: "razbory",
    description: "Будущая рубрика для evergreen-разборов, которые помогают выбрать безопасный следующий шаг.",
    indexing: "noindex",
    includeInSitemap: false
  }
] as const;

export const fnsSourceTypes = [
  "official_news",
  "regional_ifns_news",
  "binding_letter",
  "appeal_decision",
  "faq",
  "warning",
  "open_data_update",
  "other"
] as const;

export const validationStatuses = ["NOT_CHECKED", "PASSED", "FAILED", "NEEDS_MANUAL_REVIEW"] as const;

export const publicationStatuses = [
  "DRAFT",
  "READY_FOR_REVIEW",
  "APPROVED",
  "AUTO_PUBLISHED",
  "AUTO_REJECTED",
  "ROLLED_BACK",
  "ARCHIVED"
] as const;

export const reviewModes = ["editorial_required", "auto_allowed_low_risk", "exact_source_noindex_only"] as const;

export const blogNewsFeatureFlags = {
  blogNewsEnabled: false,
  fnsMonitoringEnabled: false,
  liveFetchEnabled: false,
  autoDraftEnabled: false,
  autoRewriteEnabled: false,
  autoValidationEnabled: false,
  autoPublicationEnabled: false,
  blogNewsIndexingEnabled: false,
  newsSitemapEnabled: false,
  fnsImagesEnabled: false,
  serverSchedulerEnabled: false,
  rollbackEnabled: false,
  analyticsEnabled: false
} as const;

export const fnsSourceAllowlist = {
  hosts: ["nalog.gov.ru"],
  liveUrlsEnabled: false,
  credentialsRequired: false,
  ownerApprovalRequired: true,
  legalReviewRequired: true
} as const;

export const blockedSourcePatterns = [
  "service output",
  "личный кабинет",
  "interactive services",
  "forms",
  "images",
  "personal data",
  "search results pages",
  "analytics portals unless later approved"
] as const;

export const requiredValidationGates = [
  "source_allowlist",
  "source_type",
  "archive_flag",
  "dedupe",
  "attribution",
  "added_value",
  "similarity_overlap",
  "legal_wording",
  "forbidden_phrases",
  "official_affiliation_claims",
  "images_not_copied",
  "no_uploads_or_forms",
  "canonical_robots_sitemap",
  "schema",
  "secret_scan",
  "telegram_max_deep_link_scan"
] as const;

export const futureSchedulerContract = {
  activeInThisPr: false,
  runtime: "future server-side cron/systemd/timer outside frontend rendering",
  pipeline:
    "approved FNS/IFNS source -> fetch -> normalize -> dedupe -> classify -> rewrite -> validation gates -> publish candidate -> build -> evidence -> atomic deploy -> rollback",
  liveFetchEnabled: false,
  liveRewriteProviderEnabled: false,
  writesDirectlyToLivePublicDirectory: false,
  activationRequires: [
    "owner acceptance",
    "legal acceptance",
    "source allowlist acceptance",
    "server acceptance",
    "QA/evidence acceptance",
    "rollback test",
    "manual review pilot"
  ]
} as const;
