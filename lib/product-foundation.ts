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
  stage18kQualityStatus?: "READY_FOR_OWNER_REVIEW";
  ownerReviewStatus?: "PENDING_HUMAN_REVIEW";
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

type RouteQualityDepth = Partial<
  Pick<ProductFoundationRoute, "whenFits" | "whatWeCheck" | "documentsData" | "howWorkStarts" | "notPromised" | "faqDirection" | "clientInformation">
> & {
  relatedRoutePaths?: string[];
};

const priorityRouteQualityDepthByPath: Record<string, RouteQualityDepth> = {
  "/": {
    whenFits: ["пользователь не знает точную страницу", "нужно выбрать направление без каталога услуг", "важны телефон, офис и безопасный первый шаг"],
    whatWeCheck: ["какая тема главная", "есть ли конкретный документ или запрос", "какой хаб или точная страница не смешает интенты"],
    documentsData: ["короткое описание ситуации", "тип письма, запроса или документа", "что уже есть без публичной загрузки"],
    clientInformation: ["сформулируйте тему одним предложением", "назовите источник документа или запроса", "если сомневаетесь, переходите на разбор ситуации"],
    faqDirection: ["если маршрут неясен", "почему главная не каталог", "как безопасно показать документы"],
    relatedRoutePaths: ["/razbor-situacii/", "/kontakty/", "/otchetnost/", "/bank-i-115-fz/", "/nalogi-i-rezhimy/"]
  },
  "/razbor-situacii/": {
    whenFits: ["вопрос смешанный", "документ есть, но маршрут неясен", "нужно понять, что показать сначала"],
    whatWeCheck: ["источник вопроса", "какая тема главная", "какие материалы нужны только после согласования"],
    documentsData: ["текст письма или запроса", "краткие вводные по бизнесу", "перечень материалов без открытой загрузки"],
    clientInformation: ["опишите, что произошло", "назовите документ, если он уже есть", "не отправляйте чувствительные материалы через публичную страницу"],
    faqDirection: ["чем разбор отличается от услуги", "что показать на первом шаге", "куда перейти после разбора"],
    relatedRoutePaths: ["/kontakty/", "/srochnye-voprosy/", "/otchetnost/", "/bank-i-115-fz/"]
  },
  "/kontakty/": {
    whenFits: ["нужно позвонить", "нужно найти офис", "нужно согласовать показ документов"],
    whatWeCheck: ["подтвержденный телефон", "подтвержденный адрес", "безопасный способ контакта"],
    documentsData: ["тема вопроса", "название документа без чувствительных данных", "что уже есть на руках"],
    clientInformation: ["выберите звонок, маршрут или показ документов", "назовите тему без лишних персональных данных", "используйте только подтвержденный телефон и адрес"],
    faqDirection: ["как показать документы", "какие контакты подтверждены", "почему нет часов и офиса/этажа"],
    relatedRoutePaths: ["/razbor-situacii/", "/policy", "/"]
  },
  "/policy": {
    whenFits: ["нужно понять правила данных", "есть вопрос о безопасной передаче документов", "нужен контакт по privacy"],
    whatWeCheck: ["не добавлены ли коммерческие обещания", "нет ли live endpoint или upload", "нужна ли отдельная legal/privacy правка"],
    documentsData: ["тема обращения без персональных данных", "подтвержденный контакт", "способ передачи после согласования"],
    clientInformation: ["не публикуйте персональные данные в открытом сообщении", "не прикрепляйте файлы на публичной странице", "для рабочей задачи переходите к контактам или разбору"],
    faqDirection: ["можно ли отправлять документы", "куда обращаться по данным", "что требует owner/legal review"],
    relatedRoutePaths: ["/kontakty/", "/razbor-situacii/"]
  },
  "/otchetnost/": {
    whenFits: ["нужно выбрать отчетный маршрут", "неясно, УСН это, нулевая отчетность или восстановление", "есть требование ИФНС и нужен точный вход"],
    whatWeCheck: ["форма бизнеса", "период", "были ли операции или пробелы в данных"],
    documentsData: ["период вопроса", "режим, если известен", "какие отчетные материалы уже есть"],
    clientInformation: ["укажите ООО или ИП", "назовите период и режим, если он известен", "если пришло требование, откройте точный маршрут ИФНС"],
    faqDirection: ["как отличить декларацию от нулевой отчетности", "когда идти в восстановление учета", "что делать при требовании ИФНС"],
    relatedRoutePaths: ["/deklaraciya-usn/", "/nulevaya-otchetnost-ooo/", "/nulevaya-otchetnost-ip/", "/vosstanovlenie-buhucheta/"]
  },
  "/bank-i-115-fz/": {
    whenFits: ["банк прислал запрос", "нужно понять, это один ответ или пакет по 115-ФЗ", "банковский вопрос связан с документами по операции"],
    whatWeCheck: ["формулировку банка", "операцию и контрагента", "какие подтверждения уже есть"],
    documentsData: ["текст запроса", "договоры, акты или платежные материалы", "краткое описание деловой ситуации"],
    clientInformation: ["начните с формулировки банка", "отметьте, это один запрос или широкий пакет", "чувствительные материалы показываются только согласованным способом"],
    faqDirection: ["ответ или пакет документов", "что показать сначала", "чего банк решает самостоятельно"],
    relatedRoutePaths: ["/otvet-na-zapros-banka/", "/dokumenty-dlya-banka-115-fz/", "/srochnye-voprosy/"]
  },
  "/otvet-na-trebovanie-ifns/": {
    whenFits: ["на руках конкретное требование", "нужно разобрать период и тему требования", "нужно понять, какие приложения относятся к ответу"],
    whatWeCheck: ["формулировку требования", "период и налоговый вопрос", "какие документы подтверждают позицию"],
    documentsData: ["требование или письмо", "документы по указанному периоду", "что уже отправлялось или готовилось"],
    clientInformation: ["назовите дату и тему требования, если они есть", "подготовьте сведения по указанному периоду", "не начинайте с готового ответа без просмотра текста"],
    faqDirection: ["что указано в требовании", "какие документы относятся к вопросу", "что не обещается без просмотра материалов"],
    relatedRoutePaths: ["/srochnye-voprosy/", "/otchetnost/", "/deklaraciya-usn/"]
  },
  "/deklaraciya-usn/": {
    whenFits: ["вопрос именно по декларации УСН", "известен период", "нужно понять, какие исходные данные подготовить"],
    whatWeCheck: ["период декларации", "режим и форма бизнеса", "доходы, расходы и исходные материалы на уровне категорий"],
    documentsData: ["данные по периоду", "учетные материалы на руках", "письма или требования, если они связаны с декларацией"],
    clientInformation: ["укажите период декларации", "назовите форму бизнеса и режим", "отдельно отметьте письма или требования, если они связаны с периодом"],
    faqDirection: ["какой период нужен", "чем отличается от нулевой отчетности", "что остается на проверке"],
    relatedRoutePaths: ["/otchetnost/", "/nulevaya-otchetnost-ooo/", "/nulevaya-otchetnost-ip/", "/vosstanovlenie-buhucheta/"]
  },
  "/otvet-na-zapros-banka/": {
    whenFits: ["банк прислал конкретные пункты", "нужно подготовить пояснения по операции", "нужно отделить ответ от широкого пакета 115-ФЗ"],
    whatWeCheck: ["текст запроса", "операцию и контрагента", "какие документы прямо относятся к пунктам банка"],
    documentsData: ["запрос банка", "договоры, акты или платежные материалы", "краткое описание деловой ситуации"],
    clientInformation: ["начните с конкретных пунктов банка", "отметьте операцию, контрагента и период", "не собирайте универсальный пакет, пока не понятен запрос"],
    faqDirection: ["что просит банк", "какие материалы относятся к запросу", "чем отличается от пакета по 115-ФЗ"],
    relatedRoutePaths: ["/bank-i-115-fz/", "/dokumenty-dlya-banka-115-fz/", "/srochnye-voprosy/"]
  },
  "/dokumenty-dlya-banka-115-fz/": {
    whenFits: ["вопрос шире одного банковского письма", "нужен пакет подтверждений по деятельности", "нужно собрать материалы по операции или контрагенту"],
    whatWeCheck: ["какая деловая ситуация объясняется", "какие подтверждения уже есть", "какой объем не стоит называть универсальным"],
    documentsData: ["операции и контрагенты", "договоры, акты, счета или платежи как категории", "пояснения по деловой цели"],
    clientInformation: ["опишите деловую ситуацию", "назовите операции и контрагентов как категории", "отделите пакет по ситуации от ответа на один запрос"],
    faqDirection: ["что входит в пакет по ситуации", "чем пакет отличается от ответа", "чего нельзя обещать по решению банка"],
    relatedRoutePaths: ["/bank-i-115-fz/", "/otvet-na-zapros-banka/", "/srochnye-voprosy/"]
  },
  "/yuridicheskiy-adres-simferopol/": {
    whenFits: ["нужен маршрут по юридическому адресу", "адрес связан с регистрацией или изменениями", "нужно понять документы по адресу без неподтвержденных деталей"],
    whatWeCheck: ["текущие сведения компании", "какой адресный вопрос решается", "какие подтверждающие материалы есть"],
    documentsData: ["документы по адресу", "выписка или сведения компании, если они есть", "описание связи с регистрацией или изменением"],
    clientInformation: ["назовите, адрес нужен для регистрации, изменения или проверки", "подготовьте сведения компании, если они есть", "не добавляйте неподтвержденные офисные детали"],
    faqDirection: ["юридический адрес или смена адреса", "какие документы по адресу", "почему не обещается результат регистрации"],
    relatedRoutePaths: ["/adres-egryul-direktor/", "/nedostovernost-yuridicheskogo-adresa/", "/smena-yuridicheskogo-adresa-ooo/"]
  },
  "/nedostovernost-yuridicheskogo-adresa/": {
    whenFits: ["появилась отметка или риск по адресу", "нужно понять источник проблемы", "нужно отделить проверку от смены адреса"],
    whatWeCheck: ["где появилась отметка или риск", "текущие сведения ЕГРЮЛ", "какие документы относятся к адресу"],
    documentsData: ["выписка или уведомление", "документы по адресу", "краткое описание уже предпринятых действий"],
    clientInformation: ["покажите источник отметки согласованным способом", "назовите текущие сведения компании", "не ждите готового вывода без документов по адресу"],
    faqDirection: ["где появилась отметка", "когда нужна смена адреса", "чего нельзя обещать по снятию риска"],
    relatedRoutePaths: ["/adres-egryul-direktor/", "/yuridicheskiy-adres-simferopol/", "/smena-yuridicheskogo-adresa-ooo/"]
  },
  "/registraciya-ooo/": {
    whenFits: ["нужно открыть ООО", "есть вопрос по участникам, адресу или деятельности", "нужно собрать стартовый комплект без обещания регистрации"],
    whatWeCheck: ["участников и исходные сведения", "адресный вопрос", "виды деятельности и связанные налоговые вопросы как вводные"],
    documentsData: ["краткое описание будущего ООО", "сведения, которые уже подготовлены", "адресный или налоговый вопрос, если он есть"],
    clientInformation: ["назовите участников и общий вид деятельности", "отметьте адресный вопрос отдельно", "если сомневаетесь в режиме, переходите к налоговому хабу"],
    faqDirection: ["ООО или ИП", "что подготовить на первом шаге", "как связан юридический адрес"],
    relatedRoutePaths: ["/registraciya-i-likvidaciya/", "/registraciya-ip/", "/yuridicheskiy-adres-simferopol/"]
  },
  "/registraciya-ip/": {
    whenFits: ["нужно открыть ИП", "есть вопрос по деятельности или режиму", "нужно понять стартовые сведения без налогового вывода"],
    whatWeCheck: ["вид деятельности", "исходные сведения", "нужен ли отдельный налоговый или режимный маршрут"],
    documentsData: ["краткое описание деятельности", "стартовые сведения", "вопрос по режиму, если он уже есть"],
    clientInformation: ["назовите вид деятельности", "отметьте вопрос по режиму отдельно", "если задача похожа на ООО, сравните маршруты регистрации"],
    faqDirection: ["ИП или ООО", "какие сведения подготовить", "когда смотреть налоговый режим"],
    relatedRoutePaths: ["/registraciya-i-likvidaciya/", "/registraciya-ooo/", "/nalogi-i-rezhimy/"]
  },
  "/vosstanovlenie-buhucheta/": {
    whenFits: ["есть пробелы в учете", "нужно понять периоды и недостающие документы", "вопрос может перейти в отчетность или сопровождение"],
    whatWeCheck: ["периоды с пробелами", "какие документы уже собраны", "какие требования или письма связаны с восстановлением"],
    documentsData: ["имеющиеся учетные материалы", "список периодов с вопросами", "письма или требования, если они есть"],
    clientInformation: ["назовите периоды с пробелами", "перечислите, какие документы уже собраны", "отдельно отметьте письма или требования по этим периодам"],
    faqDirection: ["какие периоды проверить", "что делать при неполном комплекте", "чем восстановление отличается от сопровождения"],
    relatedRoutePaths: ["/otchetnost/", "/deklaraciya-usn/", "/soprovozhdenie/"]
  }
};

export const stage18kPriorityRoutes = Object.keys(priorityRouteQualityDepthByPath);

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
  const qualityDepth = priorityRouteQualityDepthByPath[path];

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
      ...(qualityDepth?.whenFits ?? []),
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
      ...(qualityDepth?.whatWeCheck ?? []),
      ...(manual?.whatWeCheck ?? []),
      ...(dynamicPage?.whatWeCheck ?? []),
      ...(staticPage?.scope.included ?? []),
      ...(semantic?.pageBlockPurpose ?? [])
    ],
    ["исходную ситуацию", "документы и данные на старте", "границы следующего шага"]
  );

  const documentsData = firstItems(
    [
      ...(qualityDepth?.documentsData ?? []),
      ...(manual?.documentsData ?? []),
      ...(dynamicPage?.documentsOrData ?? []),
      ...(staticPage?.documents.items.map((item) => item.title) ?? []),
      ...(semantic?.safeUserWording ?? [])
    ],
    ["краткое описание ситуации", "документ или запрос, если он есть", "перечень материалов без публичной загрузки"]
  );

  const howWorkStarts = firstItems(
    [
      ...(qualityDepth?.howWorkStarts ?? []),
      ...(manual?.howWorkStarts ?? []),
      ...(dynamicPage?.howWorkStarts ?? []),
      ...(staticPage?.process.steps.map((step) => step.title) ?? [])
    ],
    ["фиксируем вопрос", "смотрим вводные", "выбираем безопасный маршрут", "согласуем следующий шаг"]
  );

  const notPromised = firstItems(
    [
      ...(qualityDepth?.notPromised ?? []),
      ...(manual?.notPromised ?? []),
      ...(dynamicPage?.notPromised ?? []),
      ...(staticPage?.scope.boundaries ?? []),
      ...(defaultBoundariesByType[routeType] ?? [])
    ],
    ["результат без исходных данных", "обещание результата без вводных", "решение внешней стороны"]
  );

  const relatedPaths = unique([
    ...(qualityDepth?.relatedRoutePaths ?? []),
    ...(dynamicPage?.relatedHrefs ?? []),
    ...(manifest.relatedPaths ?? []),
    ...(semantic?.relatedRoutes ?? []),
    "/razbor-situacii/"
  ]).filter((relatedPath) => relatedPath !== path && findManifest(relatedPath)?.indexing !== "noindex");

  const faqDirection = firstItems(
    [
      ...(qualityDepth?.faqDirection ?? []),
      ...(manual?.faqDirection ?? []),
      ...(dynamicPage?.faqTopics ?? []),
      ...(manifest.faqTopics ?? []),
      semantic?.faqAngle
    ],
    ["когда подходит эта страница", "что подготовить на старте", "куда перейти дальше"]
  );

  const clientInformation = firstItems(
    [
      ...(qualityDepth?.clientInformation ?? []),
      ...(manual?.clientInformation ?? []),
      `Можно начать с краткого описания: ${routeIntent.toLocaleLowerCase("ru-RU")}.`,
      "Чувствительные материалы не передаются через публичную загрузку.",
      site.phone
    ],
    ["кратко опишите ситуацию", "подготовьте безопасный перечень документов", "выберите звонок, контакты или разбор ситуации"],
    3
  );

  return {
    path,
    title,
    routeType,
    indexed: manifest.indexing === "index",
    stage18kQualityStatus: qualityDepth ? "READY_FOR_OWNER_REVIEW" : undefined,
    ownerReviewStatus: qualityDepth ? "PENDING_HUMAN_REVIEW" : undefined,
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
