import type {
  PriceDriver,
  PriceLayer,
  PricingModel,
  RouteStatus,
  ServicePricingItem,
} from "./pricing-types";
import type { PriceVisibilityScope } from "./pricing-status";
import { holdPrice } from "./pricing-types";

const internalPricingVisibility = [
  "internal_note",
  "quote_calculation",
  "commercial_proposal",
  "contract",
  "crm",
] as const satisfies PriceVisibilityScope[];

const publicBlockedVisibility = [
  "internal_note",
  "crm",
] as const satisfies PriceVisibilityScope[];

export const approvedPricingRoutes = [
  "/",
  "/razbor-situacii/",
  "/kontakty/",
  "/o-proekte/",
  "/srochnye-voprosy/",
  "/otchetnost/",
  "/nalogi-i-rezhimy/",
  "/bank-i-115-fz/",
  "/adres-egryul-direktor/",
  "/kadry/",
  "/soprovozhdenie/",
  "/registraciya-i-likvidaciya/",
  "/otvet-na-trebovanie-ifns/",
  "/deklaraciya-usn/",
  "/otvet-na-zapros-banka/",
  "/dokumenty-dlya-banka-115-fz/",
  "/yuridicheskiy-adres-simferopol/",
  "/nedostovernost-yuridicheskogo-adresa/",
  "/smena-yuridicheskogo-adresa-ooo/",
  "/smena-direktora-ooo/",
  "/srochnoe-oformlenie-sotrudnikov/",
  "/perehod-na-ausn/",
  "/nulevaya-otchetnost-ooo/",
  "/nulevaya-otchetnost-ip/",
  "/otchetnost-elektronno/",
  "/vosstanovlenie-buhucheta/",
  "/buhgalterskoe-soprovozhdenie-ooo/",
  "/buhgalterskoe-soprovozhdenie-ip/",
  "/kadrovoe-soprovozhdenie/",
  "/registraciya-ooo/",
  "/registraciya-ip/",
  "/likvidaciya-ooo/",
  "/ausn-krym/",
  "/raschet-nalogovoy-nagruzki/",
  "/nds-pri-usn-2026/",
  "/policy",
] as const;

export const documentReviewServiceIds = [
  "urgent-unclear-request",
  "otvet-na-trebovanie-ifns",
  "otvet-na-zapros-banka",
  "dokumenty-dlya-banka-115-fz",
  "deklaraciya-usn",
  "nulevaya-otchetnost-ooo",
  "nulevaya-otchetnost-ip",
  "otchetnost-elektronno",
  "yuridicheskiy-adres-simferopol",
  "nedostovernost-yuridicheskogo-adresa",
  "smena-yuridicheskogo-adresa-ooo",
  "smena-direktora-ooo",
  "registraciya-ooo",
  "registraciya-ip",
  "likvidaciya-ooo",
  "kadry",
  "kadrovoe-soprovozhdenie",
  "srochnoe-oformlenie-sotrudnikov",
  "soprovozhdenie",
  "buhgalterskoe-soprovozhdenie-ooo",
  "buhgalterskoe-soprovozhdenie-ip",
  "vosstanovlenie-buhucheta",
] as const;

type MatrixInput = {
  id: string;
  title: string;
  contourKey: string;
  route?: string;
  routeStatus?: RouteStatus;
  pricingModel?: PricingModel;
  publicBlocked?: boolean;
  drivers?: PriceDriver[];
  quoteInputs?: string[];
  safePublicWording?: string[];
  forbiddenPublicWording?: string[];
  sequenceCandidates?: string[];
  leadHookCandidates?: string[];
  ownerQuestions?: string[];
  notes?: string;
};

const defaultForbiddenPublicWording = [
  "Цена без разбора документов.",
  "Гарантированный результат внешнего органа.",
  "Срочный результат с точным сроком.",
  "Публичная скидка или акция без owner approval.",
];

const defaultQuoteInputs = [
  "client_type",
  "route_or_contour",
  "documents_available",
  "source_channel",
  "scope_candidate",
  "owner_review_required",
];

const defaultOwnerQuestions = [
  "Which internal value can be approved first?",
  "Who approves this pricing layer?",
  "Can this route ever receive public pricing?",
];

function holdLayers(id: string): PriceLayer {
  const note = `${id}: value remains HOLD until owner approval`;

  return {
    entryPrice: holdPrice(`${note}; entry price is not public`),
    diagnosticPrice: holdPrice(`${note}; diagnostic price is not approved`),
    quotePrice: holdPrice(`${note}; quote price needs owner review`),
    contractPrice: holdPrice(`${note}; contract price needs scope review`),
    packagePrice: holdPrice(`${note}; package price is not approved`),
    subscriptionPrice: holdPrice(`${note}; subscription price is not approved`),
  };
}

function driver(key: string, title: string): PriceDriver {
  return {
    key,
    title,
    description: `${title} is a qualification signal only while pricing is HOLD.`,
    status: "HOLD",
    affects: "qualification",
  };
}

function matrixItem(input: MatrixInput): ServicePricingItem {
  return {
    id: input.id,
    title: input.title,
    contourKey: input.contourKey,
    route: input.route,
    routeStatus:
      input.routeStatus ?? (input.route ? "approved_route" : "no_public_route"),
    pricingModel: input.pricingModel ?? "custom_after_review",
    publicStatus: input.publicBlocked ? "BLOCKED" : "HOLD",
    quoteStatus: "HOLD",
    contractStatus: "HOLD",
    allowedVisibility: input.publicBlocked
      ? [...publicBlockedVisibility]
      : [...internalPricingVisibility],
    priceLayers: holdLayers(input.id),
    priceDrivers: input.drivers ?? [
      driver("documents_available", "Documents available"),
      driver("scope_clarity", "Scope clarity"),
      driver("route_sensitivity", "Route sensitivity"),
    ],
    quoteInputs: input.quoteInputs ?? defaultQuoteInputs,
    safePublicWording: input.safePublicWording ?? [
      "Сначала уточним вводные и состав документов.",
      "После разбора можно подготовить коммерческое предложение по согласованному объёму.",
    ],
    forbiddenPublicWording:
      input.forbiddenPublicWording ?? defaultForbiddenPublicWording,
    sequenceCandidates: input.sequenceCandidates ?? [],
    leadHookCandidates: input.leadHookCandidates ?? [
      "Разобрать ситуацию",
      "Показать документы",
    ],
    ownerQuestions: input.ownerQuestions ?? defaultOwnerQuestions,
    notes: input.notes,
  };
}

export const servicePricingMatrix: ServicePricingItem[] = [
  matrixItem({
    id: "situation-review",
    title: "Разбор ситуации",
    contourKey: "situation-review",
    route: "/razbor-situacii/",
    pricingModel: "diagnostic_first",
    sequenceCandidates: ["exact-route-quote", "office-visit", "support-review"],
    notes: "Root and about routes map here as router/support contexts; primary service route is /razbor-situacii/.",
  }),
  matrixItem({
    id: "urgent-unclear-request",
    title: "Срочный или неясный запрос",
    contourKey: "urgent-unclear-request",
    route: "/srochnye-voprosy/",
    pricingModel: "diagnostic_first",
    forbiddenPublicWording: [
      ...defaultForbiddenPublicWording,
      "Сделаем сегодня.",
      "Внешний орган примет ответ.",
    ],
  }),
  matrixItem({
    id: "otvet-na-trebovanie-ifns",
    title: "Ответ на требование ИФНС",
    contourKey: "urgent-unclear-request",
    route: "/otvet-na-trebovanie-ifns/",
    sequenceCandidates: ["deklaraciya-usn", "vosstanovlenie-buhucheta"],
  }),
  matrixItem({
    id: "otvet-na-zapros-banka",
    title: "Ответ на запрос банка",
    contourKey: "bank-115fz",
    route: "/otvet-na-zapros-banka/",
    sequenceCandidates: ["dokumenty-dlya-banka-115-fz", "vosstanovlenie-buhucheta"],
  }),
  matrixItem({
    id: "dokumenty-dlya-banka-115-fz",
    title: "Документы для банка по 115-ФЗ",
    contourKey: "bank-115fz",
    route: "/dokumenty-dlya-banka-115-fz/",
    sequenceCandidates: ["otvet-na-zapros-banka", "soprovozhdenie"],
    forbiddenPublicWording: [
      ...defaultForbiddenPublicWording,
      "Банк примет комплект.",
      "Счёт будет разблокирован.",
    ],
  }),
  matrixItem({
    id: "deklaraciya-usn",
    title: "Декларация УСН",
    contourKey: "reporting",
    route: "/deklaraciya-usn/",
    sequenceCandidates: ["nulevaya-otchetnost-ip", "nulevaya-otchetnost-ooo", "soprovozhdenie"],
  }),
  matrixItem({
    id: "nulevaya-otchetnost-ooo",
    title: "Нулевая отчётность ООО",
    contourKey: "reporting",
    route: "/nulevaya-otchetnost-ooo/",
    sequenceCandidates: ["buhgalterskoe-soprovozhdenie-ooo"],
  }),
  matrixItem({
    id: "nulevaya-otchetnost-ip",
    title: "Нулевая отчётность ИП",
    contourKey: "reporting",
    route: "/nulevaya-otchetnost-ip/",
    sequenceCandidates: ["buhgalterskoe-soprovozhdenie-ip"],
  }),
  matrixItem({
    id: "otchetnost-elektronno",
    title: "Электронная отчётность",
    contourKey: "reporting",
    route: "/otchetnost-elektronno/",
    sequenceCandidates: ["deklaraciya-usn", "soprovozhdenie"],
  }),
  matrixItem({
    id: "nalogi-i-rezhimy",
    title: "Налоги и режимы",
    contourKey: "tax-regime-diagnostics",
    route: "/nalogi-i-rezhimy/",
    pricingModel: "diagnostic_first",
  }),
  matrixItem({
    id: "ausn-krym",
    title: "АУСН в Крыму",
    contourKey: "tax-regime-diagnostics",
    route: "/ausn-krym/",
    pricingModel: "diagnostic_first",
  }),
  matrixItem({
    id: "raschet-nalogovoy-nagruzki",
    title: "Расчёт налоговой нагрузки",
    contourKey: "tax-regime-diagnostics",
    route: "/raschet-nalogovoy-nagruzki/",
    pricingModel: "diagnostic_first",
    forbiddenPublicWording: [
      ...defaultForbiddenPublicWording,
      "Снизим налоги.",
      "Финальный расчёт без вводных.",
    ],
  }),
  matrixItem({
    id: "nds-pri-usn-2026",
    title: "НДС при УСН",
    contourKey: "tax-regime-diagnostics",
    route: "/nds-pri-usn-2026/",
    pricingModel: "diagnostic_first",
  }),
  matrixItem({
    id: "perehod-na-ausn",
    title: "Переход на АУСН",
    contourKey: "tax-regime-diagnostics",
    route: "/perehod-na-ausn/",
    pricingModel: "diagnostic_first",
  }),
  matrixItem({
    id: "yuridicheskiy-adres-simferopol",
    title: "Юридический адрес в Симферополе",
    contourKey: "address-egrul-director",
    route: "/yuridicheskiy-adres-simferopol/",
    sequenceCandidates: ["registraciya-ooo", "smena-yuridicheskogo-adresa-ooo"],
  }),
  matrixItem({
    id: "nedostovernost-yuridicheskogo-adresa",
    title: "Недостоверность юридического адреса",
    contourKey: "address-egrul-director",
    route: "/nedostovernost-yuridicheskogo-adresa/",
    sequenceCandidates: ["smena-yuridicheskogo-adresa-ooo"],
  }),
  matrixItem({
    id: "smena-yuridicheskogo-adresa-ooo",
    title: "Смена юридического адреса ООО",
    contourKey: "address-egrul-director",
    route: "/smena-yuridicheskogo-adresa-ooo/",
  }),
  matrixItem({
    id: "smena-direktora-ooo",
    title: "Смена директора ООО",
    contourKey: "address-egrul-director",
    route: "/smena-direktora-ooo/",
  }),
  matrixItem({
    id: "registraciya-ooo",
    title: "Регистрация ООО",
    contourKey: "registration-liquidation",
    route: "/registraciya-ooo/",
    sequenceCandidates: ["yuridicheskiy-adres-simferopol", "buhgalterskoe-soprovozhdenie-ooo"],
    forbiddenPublicWording: [
      ...defaultForbiddenPublicWording,
      "Регистрация без отказа.",
      "Регистрирующий орган внесёт запись.",
    ],
  }),
  matrixItem({
    id: "registraciya-ip",
    title: "Регистрация ИП",
    contourKey: "registration-liquidation",
    route: "/registraciya-ip/",
    sequenceCandidates: ["buhgalterskoe-soprovozhdenie-ip"],
  }),
  matrixItem({
    id: "likvidaciya-ooo",
    title: "Ликвидация ООО",
    contourKey: "registration-liquidation",
    route: "/likvidaciya-ooo/",
  }),
  matrixItem({
    id: "kadry",
    title: "Кадровые документы",
    contourKey: "hr-documents",
    route: "/kadry/",
  }),
  matrixItem({
    id: "kadrovoe-soprovozhdenie",
    title: "Кадровое сопровождение",
    contourKey: "hr-documents",
    route: "/kadrovoe-soprovozhdenie/",
    pricingModel: "subscription",
  }),
  matrixItem({
    id: "srochnoe-oformlenie-sotrudnikov",
    title: "Срочное оформление сотрудников",
    contourKey: "hr-documents",
    route: "/srochnoe-oformlenie-sotrudnikov/",
    forbiddenPublicWording: [
      ...defaultForbiddenPublicWording,
      "Сделаем в точный срок.",
      "Можно передать персональные документы в открытый канал.",
    ],
  }),
  matrixItem({
    id: "soprovozhdenie",
    title: "Сопровождение бизнеса",
    contourKey: "business-support-recovery",
    route: "/soprovozhdenie/",
    pricingModel: "subscription",
  }),
  matrixItem({
    id: "buhgalterskoe-soprovozhdenie-ooo",
    title: "Бухгалтерское сопровождение ООО",
    contourKey: "business-support-recovery",
    route: "/buhgalterskoe-soprovozhdenie-ooo/",
    pricingModel: "subscription",
  }),
  matrixItem({
    id: "buhgalterskoe-soprovozhdenie-ip",
    title: "Бухгалтерское сопровождение ИП",
    contourKey: "business-support-recovery",
    route: "/buhgalterskoe-soprovozhdenie-ip/",
    pricingModel: "subscription",
  }),
  matrixItem({
    id: "vosstanovlenie-buhucheta",
    title: "Восстановление бухучёта",
    contourKey: "business-support-recovery",
    route: "/vosstanovlenie-buhucheta/",
    sequenceCandidates: ["deklaraciya-usn", "otvet-na-zapros-banka", "soprovozhdenie"],
  }),
  matrixItem({
    id: "reporting",
    title: "Отчётность и учётные документы",
    contourKey: "reporting",
    route: "/otchetnost/",
    routeStatus: "approved_route",
    pricingModel: "custom_after_review",
    notes: "Contour-level item for reporting hub and child routes.",
  }),
  matrixItem({
    id: "tax-regime-diagnostics",
    title: "Налоги и режимы",
    contourKey: "tax-regime-diagnostics",
    route: "/nalogi-i-rezhimy/",
    routeStatus: "approved_route",
    pricingModel: "diagnostic_first",
    notes: "Contour-level item for diagnostics; no final tax conclusion is approved.",
  }),
  matrixItem({
    id: "bank-115fz",
    title: "Банк и 115-ФЗ",
    contourKey: "bank-115fz",
    route: "/bank-i-115-fz/",
    routeStatus: "approved_route",
    notes: "Contour-level item for bank request and document-package routes.",
  }),
  matrixItem({
    id: "address-egrul-director",
    title: "Адрес, ЕГРЮЛ, изменения",
    contourKey: "address-egrul-director",
    route: "/adres-egryul-direktor/",
    routeStatus: "approved_route",
  }),
  matrixItem({
    id: "registration-liquidation",
    title: "Регистрация и ликвидация",
    contourKey: "registration-liquidation",
    route: "/registraciya-i-likvidaciya/",
    routeStatus: "approved_route",
  }),
  matrixItem({
    id: "hr-documents",
    title: "Кадровые документы",
    contourKey: "hr-documents",
    route: "/kadry/",
    routeStatus: "approved_route",
  }),
  matrixItem({
    id: "business-support-recovery",
    title: "Сопровождение бизнеса и восстановление",
    contourKey: "business-support-recovery",
    route: "/soprovozhdenie/",
    routeStatus: "approved_route",
    pricingModel: "subscription",
  }),
  matrixItem({
    id: "office-contacts",
    title: "Офис и контакты",
    contourKey: "office-contacts",
    route: "/kontakty/",
    routeStatus: "approved_route",
    pricingModel: "not_public",
    publicBlocked: true,
    notes: "NAP/contact route only; not a commercial pricing offer.",
  }),
  matrixItem({
    id: "policy-consent",
    title: "Политика и согласие",
    contourKey: "policy-consent",
    route: "/policy",
    routeStatus: "approved_route",
    pricingModel: "not_public",
    publicBlocked: true,
    notes: "Legal transparency route; no commercial pricing offer.",
  }),
];

export function findServicePricingItem(
  serviceId: string,
): ServicePricingItem | undefined {
  return servicePricingMatrix.find((item) => item.id === serviceId);
}
