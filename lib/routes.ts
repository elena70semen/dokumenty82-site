import { routePages, site } from "./content";

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
  notes?: string;
};

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
    p0: true
  },
  {
    path: "/razbor-situacii/",
    title: "Разбор ситуации по документам бизнеса",
    type: "core",
    sourceStatus: "APPROVED_IN_ROUTE_REGISTRY",
    includeInSitemap: true,
    indexing: "index",
    approvedInRouteRegistry: true,
    p0: true
  },
  {
    path: "/kontakty/",
    title: "Контакты",
    type: "core",
    sourceStatus: "APPROVED_IN_ROUTE_REGISTRY",
    includeInSitemap: true,
    indexing: "index",
    approvedInRouteRegistry: true,
    p0: true
  },
  {
    path: "/o-proekte/",
    title: "О проекте",
    type: "core",
    sourceStatus: "APPROVED_IN_ROUTE_REGISTRY",
    includeInSitemap: true,
    indexing: "index",
    approvedInRouteRegistry: true,
    p0: false
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
    notes: "Planned evergreen explanatory category; indexing held until QA."
  }
];

const dynamicApprovedRoutes: RouteManifestEntry[] = routePages.map((page) => ({
  path: page.href,
  title: page.metadataTitle ?? page.title,
  type: page.pageType,
  sourceStatus: "APPROVED_IN_ROUTE_REGISTRY",
  includeInSitemap: true,
  indexing: "index",
  approvedInRouteRegistry: true,
  p0: p0Paths.has(page.href)
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
