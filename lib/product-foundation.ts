import { cta, routePages, site, type RoutePage } from "@/lib/content";
import { routeManifest, type RouteManifestEntry, type RouteType } from "@/lib/routes";
import { routePageData, type RoutePageConfig } from "@/lib/routes/route-page-data";
import { semanticRouteDataByPath } from "@/lib/seo/semantic-route-data";

export type ProductFoundationAction = {
  label: string;
  href: string;
};

export type ProductFoundationRelatedRoute = {
  href: string;
  label: string;
};

export type ProductFoundationRoute = {
  path: string;
  title: string;
  routeType: RouteType;
  indexed: boolean;
  routeIntent: string;
  whenFits: string[];
  whatWeCheck: string[];
  documentsData: string[];
  howWorkStarts: string[];
  notPromised: string[];
  relatedRoutes: ProductFoundationRelatedRoute[];
  faqDirection: string[];
  clientInformation: string[];
  finalCta: {
    title: string;
    copy: string;
    actions: ProductFoundationAction[];
  };
};

export const requiredProductBlockFamilies = [
  "route_intent",
  "when_this_page_fits",
  "what_we_check",
  "documents_data_needed",
  "how_work_starts",
  "what_is_not_promised",
  "related_routes",
  "faq_direction",
  "safe_final_cta",
  "client_information"
] as const;

const staticRouteDataByPath = Object.values(routePageData).reduce<Record<string, RoutePageConfig>>((acc, page) => {
  acc[page.href] = page;
  return acc;
}, {});

const routePageByPath = routePages.reduce<Record<string, RoutePage>>((acc, page) => {
  acc[page.href] = page;
  return acc;
}, {});

const manualCoreRouteCopy: Record<
  string,
  Pick<ProductFoundationRoute, "whenFits" | "whatWeCheck" | "documentsData" | "howWorkStarts" | "notPromised" | "faqDirection" | "clientInformation">
> = {
  "/": {
    whenFits: ["нужно понять, с чего начать", "нужно выбрать направление документов", "важны телефон, офис и безопасный первый шаг"],
    whatWeCheck: ["какая ситуация главная", "какой маршрут не смешает разные интенты", "куда безопасно перейти дальше"],
    documentsData: ["короткое описание вопроса", "тип документа или запроса", "что уже есть на руках"],
    howWorkStarts: ["описываете ситуацию", "смотрим вводные", "выбираем маршрут", "согласуем безопасный следующий шаг"],
    notPromised: ["каталог всех услуг вместо маршрута", "результат без исходных данных", "живую отправку заявки через сайт"],
    faqDirection: ["если маршрут неясен", "как показать документы", "где находится офис"],
    clientInformation: ["начните с темы вопроса", "не загружайте файлы на публичной странице", "для чувствительных материалов согласуйте способ показа"]
  },
  "/o-proekte/": {
    whenFits: ["нужно понять формат проекта", "важна граница с государственными органами", "нужен спокойный источник контекста"],
    whatWeCheck: ["соответствие канону", "границы публичных утверждений", "локальный office-first формат"],
    documentsData: ["вопрос о формате работы", "маршрут, который интересует", "подтверждённые контакты"],
    howWorkStarts: ["сначала объясняем роль проекта", "отделяем ориентир от статуса", "ведём к разбору или контактам"],
    notPromised: ["официальный статус", "результат без документов", "неподтверждённые доказательства"],
    faqDirection: ["кто такой проект", "связан ли проект с ведомствами", "куда идти с документами"],
    clientInformation: ["можно начать с вопроса о формате", "для рабочей задачи лучше перейти на разбор", "контактные данные берутся из подтверждённого NAP"]
  },
  "/policy": {
    whenFits: ["нужно понять правила обработки данных", "есть вопрос о безопасной передаче документов", "нужен контакт без коммерческого оффера"],
    whatWeCheck: ["не требуется ли отдельная legal/privacy проверка", "не передаются ли документы через открытый канал", "какой безопасный контакт подходит"],
    documentsData: ["тема обращения по данным", "общий контекст без чувствительных сведений", "подтверждённый контакт для связи"],
    howWorkStarts: ["не публикуете чувствительные сведения", "выбираете телефон или контакты", "согласуете способ передачи отдельно"],
    notPromised: ["коммерческую услугу на странице политики", "финальную юридическую редакцию без проверки", "приём файлов через публичную страницу"],
    faqDirection: ["можно ли отправлять документы", "зачем нужна политика", "куда перейти для разбора ситуации"],
    clientInformation: ["не указывайте персональные данные в открытом сообщении", "не прикрепляйте файлы", "используйте подтверждённые контакты"]
  }
};

const defaultBoundariesByType: Partial<Record<RouteType, string[]>> = {
  home: ["полный каталог вместо маршрута", "результат без изучения вводных", "живую отправку формы"],
  core: ["замену отдельной подготовки документов", "результат без исходных данных", "публичную загрузку файлов"],
  hub: ["точный вывод вместо выбора маршрута", "захват дочерних интентов", "решение внешней стороны"],
  money: ["решение внешней стороны", "обещание результата без вводных", "публичную передачу чувствительных материалов"],
  diagnostic: ["финальный налоговый вывод", "расчёт без вводных", "автоматическое решение"],
  legal: ["коммерческое обещание", "финальную legal/privacy редакцию без проверки", "приём файлов через публичную страницу"],
  content: ["индексацию без approval", "автопубликацию", "живой сбор внешних новостей"]
};

function unique(items: Array<string | undefined | null>) {
  return [...new Set(items.filter((item): item is string => Boolean(item && item.trim())).map((item) => item.trim()))];
}

function firstItems(items: string[], fallback: string[], limit = 4) {
  const result = unique([...items, ...fallback]).slice(0, limit);
  return result.length > 0 ? result : fallback.slice(0, limit);
}

function findManifest(path: string) {
  return routeManifest.find((route) => route.path === path);
}

function labelForRoute(path: string) {
  const route = findManifest(path);
  return route?.title ?? path;
}

function getRouteType(manifest: RouteManifestEntry | undefined): RouteType {
  return manifest?.type ?? "core";
}

function getActionSet(path: string, page?: RoutePage): ProductFoundationAction[] {
  if (path === "/kontakty/") {
    return [
      { label: cta.phone, href: site.phoneHref },
      { label: cta.route, href: "/kontakty/" },
      { label: cta.primary, href: "/razbor-situacii/" }
    ];
  }

  if (path === "/policy") {
    return [
      { label: cta.phone, href: site.phoneHref },
      { label: "Контакты", href: "/kontakty/" }
    ];
  }

  if (page?.primaryCtaLabel === cta.docs) {
    return [
      { label: cta.docs, href: "/razbor-situacii/" },
      { label: cta.phone, href: site.phoneHref },
      { label: cta.route, href: "/kontakty/" }
    ];
  }

  return [
    { label: cta.primary, href: "/razbor-situacii/" },
    { label: cta.phone, href: site.phoneHref },
    { label: cta.route, href: "/kontakty/" }
  ];
}

function buildFoundation(path: string): ProductFoundationRoute | null {
  const manifest = findManifest(path);
  const semantic = semanticRouteDataByPath[path];

  if (!manifest || !manifest.approvedInRouteRegistry) return null;

  const routeType = getRouteType(manifest);
  const dynamicPage = routePageByPath[path];
  const staticPage = staticRouteDataByPath[path];
  const manual = manualCoreRouteCopy[path];
  const title = dynamicPage?.shortTitle ?? staticPage?.title ?? manifest.title;

  const routeIntent =
    dynamicPage?.mainIntent ??
    manifest.mainIntent ??
    semantic?.primaryIntent ??
    staticPage?.hero?.title ??
    title;

  const whenFits = firstItems(
    [
      ...(manual?.whenFits ?? []),
      ...(dynamicPage?.bullets ?? []),
      ...(staticPage?.situation.items.map((item) => item.title) ?? []),
      ...(semantic?.problemHooks ?? []),
      ...(semantic?.safeUserWording ?? [])
    ],
    ["когда задача совпадает с ролью страницы", "когда нужно понять следующий документальный шаг", "когда важна безопасная передача вводных"]
  );

  const whatWeCheck = firstItems(
    [
      ...(manual?.whatWeCheck ?? []),
      ...(dynamicPage?.whatWeCheck ?? []),
      ...(staticPage?.scope.included ?? []),
      ...(semantic?.pageBlockPurpose ?? [])
    ],
    ["исходную ситуацию", "документы и данные на старте", "границы следующего шага"]
  );

  const documentsData = firstItems(
    [
      ...(manual?.documentsData ?? []),
      ...(dynamicPage?.documentsOrData ?? []),
      ...(staticPage?.documents.items.map((item) => item.title) ?? []),
      ...(semantic?.safeUserWording ?? [])
    ],
    ["краткое описание ситуации", "документ или запрос, если он есть", "перечень материалов без публичной загрузки"]
  );

  const howWorkStarts = firstItems(
    [
      ...(manual?.howWorkStarts ?? []),
      ...(dynamicPage?.howWorkStarts ?? []),
      ...(staticPage?.process.steps.map((step) => step.title) ?? [])
    ],
    ["фиксируем вопрос", "смотрим вводные", "выбираем безопасный маршрут", "согласуем следующий шаг"]
  );

  const notPromised = firstItems(
    [
      ...(manual?.notPromised ?? []),
      ...(dynamicPage?.notPromised ?? []),
      ...(staticPage?.scope.boundaries ?? []),
      ...(defaultBoundariesByType[routeType] ?? [])
    ],
    ["результат без исходных данных", "обещание результата без вводных", "решение внешней стороны"]
  );

  const relatedPaths = unique([
    ...(dynamicPage?.relatedHrefs ?? []),
    ...(manifest.relatedPaths ?? []),
    ...(semantic?.relatedRoutes ?? []),
    "/razbor-situacii/"
  ]).filter((relatedPath) => relatedPath !== path && findManifest(relatedPath)?.indexing !== "noindex");

  const faqDirection = firstItems(
    [
      ...(manual?.faqDirection ?? []),
      ...(dynamicPage?.faqTopics ?? []),
      ...(manifest.faqTopics ?? []),
      semantic?.faqAngle
    ],
    ["когда подходит эта страница", "что подготовить на старте", "куда перейти дальше"]
  );

  const clientInformation = firstItems(
    [
      ...(manual?.clientInformation ?? []),
      `Можно начать с краткого описания: ${routeIntent.toLocaleLowerCase("ru-RU")}.`,
      "Чувствительные материалы не передаются через публичную загрузку.",
      site.phone
    ],
    ["кратко опишите ситуацию", "подготовьте безопасный перечень документов", "выберите звонок, контакты или разбор ситуации"]
  );

  return {
    path,
    title,
    routeType,
    indexed: manifest.indexing === "index",
    routeIntent,
    whenFits,
    whatWeCheck,
    documentsData,
    howWorkStarts,
    notPromised,
    relatedRoutes: relatedPaths.slice(0, 5).map((href) => ({ href, label: labelForRoute(href) })),
    faqDirection,
    clientInformation,
    finalCta: {
      title: "Начать с безопасного первого шага",
      copy: "Опишите вопрос, покажите источник документа безопасным способом или позвоните. Публичная страница не принимает файлы и не отправляет заявку в CRM.",
      actions: getActionSet(path, dynamicPage)
    }
  };
}

export const approvedProductFoundationRoutes = routeManifest
  .filter((route) => route.approvedInRouteRegistry)
  .map((route) => buildFoundation(route.path))
  .filter((route): route is ProductFoundationRoute => Boolean(route));

export const indexedProductFoundationRoutes = approvedProductFoundationRoutes.filter((route) => route.indexed);

export const noindexProductFoundationRoutes = approvedProductFoundationRoutes.filter((route) => !route.indexed);

export const productFoundationByPath = approvedProductFoundationRoutes.reduce<Record<string, ProductFoundationRoute>>((acc, route) => {
  acc[route.path] = route;
  return acc;
}, {});

export function getProductFoundation(path: string) {
  return productFoundationByPath[path] ?? null;
}
