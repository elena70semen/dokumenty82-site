import { routePages, site } from "./content";
import { semanticRouteDataByPath, type SemanticRouteData } from "./seo/semantic-route-data";

export type RouteIndexing = "index" | "noindex";
export type RouteSourceStatus = "APPROVED_IN_ROUTE_REGISTRY" | "ROUTE_REGISTRY_REVIEW_REQUIRED";
export type RouteType = "home" | "core" | "hub" | "money" | "diagnostic" | "legal" | "content" | "internal";

export type RouteManifestEntry = {
  path: string;
  title: string;
  type: RouteType;
  sourceStatus: RouteSourceStatus;
  includeInSitemap: boolean;
  indexing: RouteIndexing;
  approvedInRouteRegistry: boolean;
  p0: boolean;
  routeClass?: string;
  routePhase?: string;
  routeGroup?: string;
  parentPath?: string;
  mainIntent?: string;
  relatedPaths?: string[];
  pageBlockModel?: string[];
  faqTopics?: string[];
  schemaBoundary?: string;
  holdRisks?: string[];
  sourceAlignmentNotes?: string[];
  stage18Semantic?: SemanticRouteData;
  primaryIntent?: string;
  secondarySupportIntent?: string;
  serviceCluster?: string;
  safeQueryVariants?: string[];
  problemHooks?: string[];
  antiCannibalizationBoundaries?: string[];
  metadataDirection?: string;
  h1Direction?: string;
  pageBlockPurpose?: string[];
  notes?: string;
};

function semanticFields(path: string) {
  const semantic = semanticRouteDataByPath[path];

  return {
    stage18Semantic: semantic,
    primaryIntent: semantic?.primaryIntent,
    secondarySupportIntent: semantic?.secondarySupportIntent,
    serviceCluster: semantic?.serviceCluster,
    safeQueryVariants: semantic?.safeQueryVariants,
    problemHooks: semantic?.problemHooks,
    antiCannibalizationBoundaries: semantic?.avoidCannibalizing,
    metadataDirection: semantic?.metadataDirection,
    h1Direction: semantic?.h1Direction,
    pageBlockPurpose: semantic?.pageBlockPurpose
  };
}

const p0Paths = new Set([
  "/",
  "/razbor-situacii/",
  "/kontakty/",
  "/otvet-na-trebovanie-ifns/",
  "/otvet-na-zapros-banka/",
  "/dokumenty-dlya-banka-115-fz/",
  "/deklaraciya-usn/",
  "/nulevaya-otchetnost-ooo/",
  "/nulevaya-otchetnost-ip/",
  "/registraciya-ooo/",
  "/registraciya-ip/",
  "/yuridicheskiy-adres-simferopol/",
  "/nedostovernost-yuridicheskogo-adresa/",
  "/policy"
]);

const staticApprovedRoutes: RouteManifestEntry[] = [
  {
    path: "/",
    title: "Документы для бизнеса в Симферополе",
    type: "home",
    sourceStatus: "APPROVED_IN_ROUTE_REGISTRY",
    includeInSitemap: true,
    indexing: "index",
    approvedInRouteRegistry: true,
    p0: true,
    routeClass: "core_home_router",
    routePhase: "17D/E",
    routeGroup: "Group A - core and lead path",
    mainIntent: "Brand and local route selection",
    relatedPaths: ["/razbor-situacii/", "/kontakty/", "/otchetnost/", "/bank-i-115-fz/"],
    pageBlockModel: ["brand_router", "route_cards", "office_first_cta", "safe_collectors"],
    faqTopics: ["brand entry", "local office route", "safe first step"],
    schemaBoundary: "LocalBusiness schema from confirmed visible NAP only.",
    holdRisks: ["local_profile_claims", "unconfirmed_hours", "state_affiliation"],
    sourceAlignmentNotes: ["active-canon-index", "route-registry: home", "stage-17-group-A"],
    ...semanticFields("/")
  },
  {
    path: "/razbor-situacii/",
    title: "Разбор ситуации по документам бизнеса",
    type: "core",
    sourceStatus: "APPROVED_IN_ROUTE_REGISTRY",
    includeInSitemap: true,
    indexing: "index",
    approvedInRouteRegistry: true,
    p0: true,
    routeClass: "core_situation_review",
    routePhase: "17D/E",
    routeGroup: "Group A - core and lead path",
    mainIntent: "Safe first-step triage",
    relatedPaths: ["/kontakty/", "/srochnye-voprosy/", "/otchetnost/", "/bank-i-115-fz/"],
    pageBlockModel: ["triage_scope", "safe_inputs", "next_route_selection", "office_first_cta"],
    faqTopics: ["what to bring", "how triage starts", "what is not replaced"],
    schemaBoundary: "Core route only; no service terms, outcome claims or broad legal advice.",
    holdRisks: ["free_service_implication", "result_promise", "public_upload"],
    sourceAlignmentNotes: ["passport: situation-review", "stage-17-group-A"],
    ...semanticFields("/razbor-situacii/")
  },
  {
    path: "/kontakty/",
    title: "Контакты",
    type: "core",
    sourceStatus: "APPROVED_IN_ROUTE_REGISTRY",
    includeInSitemap: true,
    indexing: "index",
    approvedInRouteRegistry: true,
    p0: true,
    routeClass: "core_contacts_nap",
    routePhase: "17D/E",
    routeGroup: "Group A - core and lead path",
    mainIntent: "Canonical contacts and NAP",
    relatedPaths: ["/razbor-situacii/", "/otchetnost/", "/bank-i-115-fz/"],
    pageBlockModel: ["confirmed_nap", "phone", "route", "safe_document_showing"],
    faqTopics: ["phone", "route to office", "safe document showing"],
    schemaBoundary: "LocalBusiness schema from confirmed NAP only; no hours or legal identifiers.",
    holdRisks: ["working_hours", "office_number", "legal_identifiers"],
    sourceAlignmentNotes: ["passport: contacts-office-visit", "stage-17-group-A"],
    ...semanticFields("/kontakty/")
  },
  {
    path: "/o-proekte/",
    title: "О проекте",
    type: "core",
    sourceStatus: "APPROVED_IN_ROUTE_REGISTRY",
    includeInSitemap: true,
    indexing: "index",
    approvedInRouteRegistry: true,
    p0: false,
    routeClass: "core_project_context",
    routePhase: "17D/E",
    routeGroup: "Group A - core and lead path",
    mainIntent: "Project context without unsupported proof claims",
    relatedPaths: ["/", "/razbor-situacii/", "/kontakty/"],
    pageBlockModel: ["source_first_context", "office_first_logic", "hold_boundaries"],
    faqTopics: ["project role", "source-led boundaries", "office-first logic"],
    schemaBoundary: "Informational project page only; no public proof claims or legal details.",
    holdRisks: ["unapproved_proof", "comparative_claim", "legal_details"],
    sourceAlignmentNotes: ["active-canon-index", "stage-17-group-A"],
    ...semanticFields("/o-proekte/")
  },
  {
    path: "/policy",
    title: "Политика конфиденциальности",
    type: "legal",
    sourceStatus: "APPROVED_IN_ROUTE_REGISTRY",
    includeInSitemap: true,
    indexing: "index",
    approvedInRouteRegistry: true,
    p0: true,
    routeClass: "core_privacy_policy",
    routePhase: "17D/E",
    routeGroup: "Group A - core and lead path",
    mainIntent: "Privacy and legal transparency",
    relatedPaths: ["/kontakty/", "/razbor-situacii/"],
    pageBlockModel: ["privacy_notice", "contact_channel", "no_live_integrations"],
    faqTopics: ["privacy contact", "placeholder forms", "live integrations blocked"],
    schemaBoundary: "Legal/privacy route only; no commercial service schema.",
    holdRisks: ["legal_final_wording", "backend_not_connected", "owner_review"],
    sourceAlignmentNotes: ["hold-register", "stage-17-group-A"],
    ...semanticFields("/policy"),
    notes: "Legal/privacy transparency route; not a commercial landing page."
  }
];

const contentApprovedRoutes: RouteManifestEntry[] = [
  {
    path: "/blog/",
    title: "Блог и новости",
    type: "content",
    sourceStatus: "APPROVED_IN_ROUTE_REGISTRY",
    includeInSitemap: false,
    indexing: "noindex",
    approvedInRouteRegistry: true,
    p0: false,
    routeClass: "content_foundation_blog",
    routePhase: "17D/E",
    routeGroup: "Group H - blog news foundation",
    mainIntent: "Noindex content foundation",
    relatedPaths: ["/razbor-situacii/", "/kontakty/"],
    pageBlockModel: ["noindex_notice", "no_live_fetch", "safe_contact_path"],
    faqTopics: ["noindex foundation", "manual approval", "no autopublish"],
    schemaBoundary: "No article/news schema until indexing and editorial source approval.",
    holdRisks: ["autopublish", "indexing", "source_attribution"],
    sourceAlignmentNotes: ["route-registry: content foundation", "stage-17-group-H"],
    ...semanticFields("/blog/"),
    notes: "Planned blog/news section; held noindex and excluded from sitemap until blog/news QA and indexing approval."
  },
  {
    path: "/blog/obnovleniya-fns/",
    title: "Обновления ФНС",
    type: "content",
    sourceStatus: "APPROVED_IN_ROUTE_REGISTRY",
    includeInSitemap: false,
    indexing: "noindex",
    approvedInRouteRegistry: true,
    p0: false,
    routeClass: "content_foundation_fns_updates",
    routePhase: "17D/E",
    routeGroup: "Group H - blog news foundation",
    mainIntent: "Noindex FNS updates foundation",
    relatedPaths: ["/blog/", "/razbor-situacii/"],
    pageBlockModel: ["noindex_notice", "no_live_fetch", "no_scheduler", "no_autopublish"],
    faqTopics: ["no live fetch", "manual approval", "source required"],
    schemaBoundary: "No news/article schema until source, editorial and indexing approval.",
    holdRisks: ["live_fetch", "scheduler", "autopublish"],
    sourceAlignmentNotes: ["route-registry: content foundation", "stage-17-group-H"],
    ...semanticFields("/blog/obnovleniya-fns/"),
    notes: "Planned FNS/IFNS updates category; no live autopublishing in this PR."
  },
  {
    path: "/blog/razbory/",
    title: "Разборы ситуаций",
    type: "content",
    sourceStatus: "APPROVED_IN_ROUTE_REGISTRY",
    includeInSitemap: false,
    indexing: "noindex",
    approvedInRouteRegistry: true,
    p0: false,
    routeClass: "content_foundation_case_explainers",
    routePhase: "17D/E",
    routeGroup: "Group H - blog news foundation",
    mainIntent: "Noindex explanatory content foundation",
    relatedPaths: ["/blog/", "/razbor-situacii/"],
    pageBlockModel: ["noindex_notice", "manual_editorial_review", "safe_contact_path"],
    faqTopics: ["manual text approval", "manual approval", "route intent support"],
    schemaBoundary: "No article schema until editorial and indexing approval.",
    holdRisks: ["seo_text_misuse", "autopublish", "unapproved_examples"],
    sourceAlignmentNotes: ["route-registry: content foundation", "stage-17-group-H"],
    ...semanticFields("/blog/razbory/"),
    notes: "Planned evergreen explanatory category; indexing held until QA."
  }
];

const dynamicApprovedRoutes: RouteManifestEntry[] = routePages.map((page) => ({
  path: page.href,
  title: page.metadataTitle ?? page.title,
  type: page.pageType,
  sourceStatus: "APPROVED_IN_ROUTE_REGISTRY",
  includeInSitemap: page.includeInSitemap ?? true,
  indexing: page.indexing ?? "index",
  approvedInRouteRegistry: true,
  p0: p0Paths.has(page.href),
  routeClass: page.routeClass,
  routePhase: page.routePhase,
  routeGroup: page.routeGroup,
  parentPath: page.parentHref,
  mainIntent: page.mainIntent,
  relatedPaths: page.relatedHrefs,
  pageBlockModel: page.pageBlockModel,
  faqTopics: page.faqTopics,
  schemaBoundary: page.schemaBoundary,
  holdRisks: page.holdRisks,
  sourceAlignmentNotes: page.sourceAlignmentNotes,
  ...semanticFields(page.href)
}));

const nonApprovedAppRoutes: RouteManifestEntry[] = [
  {
    path: "/faq/",
    title: "FAQ",
    type: "internal",
    sourceStatus: "ROUTE_REGISTRY_REVIEW_REQUIRED",
    includeInSitemap: false,
    indexing: "noindex",
    approvedInRouteRegistry: false,
    p0: false,
    notes: "Existing app page kept noindex and excluded from sitemap until route review."
  },
  {
    path: "/internal/graphics-proof/",
    title: "Internal graphics proof",
    type: "internal",
    sourceStatus: "ROUTE_REGISTRY_REVIEW_REQUIRED",
    includeInSitemap: false,
    indexing: "noindex",
    approvedInRouteRegistry: false,
    p0: false,
    notes: "Existing internal proof route; noindex and excluded from public navigation and sitemap."
  }
];

export const routeManifest: RouteManifestEntry[] = [
  ...staticApprovedRoutes,
  ...contentApprovedRoutes,
  ...dynamicApprovedRoutes,
  ...nonApprovedAppRoutes
];

export const sitemapRoutes = routeManifest.filter(
  (route) => route.approvedInRouteRegistry && route.includeInSitemap && route.indexing === "index"
);

export function toAbsoluteUrl(path: string) {
  return `${site.domain}${path === "/" ? "/" : path}`;
}
