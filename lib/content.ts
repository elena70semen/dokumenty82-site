export type RoutePage = {
  slug: string;
  href: string;
  title: string;
  metadataTitle?: string;
  metadataDescription?: string;
  shortTitle: string;
  kicker: string;
  description: string;
  image: string;
  imageAlt: string;
  bullets: string[];
  longText: string[];
  parentHref?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  leadTopic?: string;
  safeCtaNote?: string;
  routeClass?: string;
  routePhase?: string;
  routeGroup?: string;
  mainIntent?: string;
  commercialIntent?: string;
  informationalSupportIntent?: string;
  indexing?: "index" | "noindex";
  includeInSitemap?: boolean;
  relatedHrefs?: string[];
  pageBlockModel?: string[];
  faqTopics?: string[];
  whatWeCheck?: string[];
  documentsOrData?: string[];
  howWorkStarts?: string[];
  notPromised?: string[];
  schemaBoundary?: string;
  holdRisks?: string[];
  sourceAlignmentNotes?: string[];
  pageType: "hub" | "money" | "diagnostic";
};

export const site = {
  name: "Документы для бизнеса",
  category: "Центр подготовки документов",
  domain: "https://dokumenty82.ru",
  phone: "+7 (978) 998-72-22",
  phoneHref: "tel:+79789987222",
  address: "Республика Крым, Симферополь, ул. им. Мате Залки, 1",
  addressShort: "Симферополь, ул. Мате Залки, 1",
  landmark: "офис рядом с налоговой"
};

export const cta = {
  primary: "Разобрать ситуацию",
  phone: "Позвонить",
  route: "Построить маршрут",
  docs: "Показать документы"
};

const standardMoneyPageBlockModel = [
  "when_fits",
  "what_we_check",
  "documents_or_data",
  "how_work_starts",
  "what_is_not_promised",
  "related_routes",
  "safe_final_cta"
];

const hubPageBlockModel = [
  "intent_router",
  "child_routes",
  "what_we_check",
  "documents_or_data",
  "how_work_starts",
  "anti_cannibalization_note",
  "safe_final_cta"
];

const diagnosticPageBlockModel = [
  "diagnostic_scope",
  "what_we_check",
  "documents_or_data",
  "how_work_starts",
  "what_is_not_promised",
  "related_routes",
  "safe_final_cta"
];

const serviceSchemaBoundary =
  "Service schema from visible confirmed content only; no commercial terms, public proof claims, outcome promises or exact timing.";

const reportingCheck = ["форму бизнеса и режим", "период и наличие операций", "какие документы уже есть"];
const reportingInputs = ["данные по периоду", "письма или требования, если они есть", "текущий комплект отчетных материалов"];
const reportingStart = ["коротко фиксируем вопрос", "отделяем хаб от точной страницы", "выбираем документальный маршрут"];
const reportingBoundaries = ["готовый вывод без исходных данных", "автоматическую отправку через публичную страницу", "решение внешней стороны"];

const bankCheck = ["текст запроса или вопрос банка", "операцию, контрагента и подтверждающие материалы", "границы ответа и пакета документов"];
const bankInputs = ["формулировку банка", "договоры, акты или платежные материалы", "краткое описание деловой ситуации"];
const bankStart = ["смотрим формулировку", "определяем объем вопроса", "собираем безопасный перечень материалов"];
const bankBoundaries = ["решение банка", "универсальный пакет без запроса", "передачу чувствительных материалов через публичную страницу"];

const addressCheck = ["текущие сведения компании", "источник адресного вопроса", "какие подтверждающие материалы уже есть"];
const addressInputs = ["выписку или уведомление, если оно есть", "документы по адресу", "описание планируемого изменения"];
const addressStart = ["отделяем адрес от других изменений", "проверяем исходный комплект", "выбираем следующий документальный маршрут"];
const addressBoundaries = ["решение регистрирующей стороны", "снятие отметки без проверки основания", "использование неподтвержденных данных"];

const registrationCheck = ["форму будущего или текущего бизнеса", "участников задачи и исходные сведения", "какой комплект нужен для следующего шага"];
const registrationInputs = ["краткое описание задачи", "сведения, которые уже подготовлены", "документы компании, если бизнес уже действует"];
const registrationStart = ["уточняем жизненный цикл задачи", "отделяем регистрацию от изменений и ликвидации", "собираем стартовый комплект"];
const registrationBoundaries = ["решение внешней стороны", "финальный маршрут без исходных данных", "выводы вместо разбора"];

const taxCheck = ["текущий режим и исходные данные", "применимость выбранного маршрута", "связь с отчетностью и диагностикой"];
const taxInputs = ["данные бизнеса", "режим и период, если известны", "вопрос, который нужно проверить"];
const taxStart = ["собираем вводные", "отделяем переход от диагностики", "фиксируем безопасный следующий шаг"];
const taxBoundaries = ["налоговый вывод без вводных", "расчет вместо разбора документов", "решение внешней стороны"];

const hrCheck = ["кадровое событие или регулярную задачу", "какие документы сотрудников уже есть", "как безопасно показать материалы"];
const hrInputs = ["описание кадрового события", "перечень имеющихся документов", "данные без публичной загрузки"];
const hrStart = ["сначала согласуем способ показа материалов", "отделяем срочный вопрос от сопровождения", "готовим документальный маршрут"];
const hrBoundaries = ["кадровое решение без вводных", "публичную передачу персональных данных", "регулярный формат без согласования объема"];

const routeHardeningBySlug: Record<string, Partial<RoutePage>> = {
  "srochnye-voprosy": {
    metadataTitle: "Срочные и неясные вопросы по документам - безопасный первый шаг",
    metadataDescription:
      "Маршрут для срочных и смешанных вопросов: разбираем письмо, запрос или документы и выбираем точную страницу без обещаний результата.",
    routeClass: "hub_urgent_mixed_intent",
    routePhase: "17D/E",
    routeGroup: "Group B - reporting and urgency",
    mainIntent: "Срочный или неясный документальный вопрос",
    commercialIntent: "triage",
    informationalSupportIntent: "route selection and first-step safety",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/otvet-na-trebovanie-ifns/", "/otchetnost/", "/bank-i-115-fz/"],
    pageBlockModel: hubPageBlockModel,
    faqTopics: ["с чего начать", "что показать на первом шаге", "когда нужен точный маршрут"],
    whatWeCheck: ["кто прислал документ или запрос", "какая тема является главной", "какой маршрут не смешает разные интенты"],
    documentsOrData: ["письмо, запрос или уведомление", "краткое описание ситуации", "материалы, которые уже есть"],
    howWorkStarts: ["фиксируем источник вопроса", "отделяем срочность от обещаний", "направляем на точную страницу или разбор"],
    notPromised: ["готовый ответ без просмотра материалов", "универсальный маршрут для всех ситуаций", "решение внешней стороны"],
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["fake_urgency", "outcome_promise", "exact_timing"],
    sourceAlignmentNotes: ["stage-16-route-group-semantic-coverage", "stage-17-route-group-B"]
  },
  otchetnost: {
    metadataTitle: "Отчётность и документы для учета - маршруты по задачам",
    metadataDescription:
      "Хаб отчетности помогает выбрать точную страницу: УСН, нулевая отчетность, электронный маршрут, восстановление или ответ ИФНС.",
    routeClass: "hub_reporting_router",
    routePhase: "17D/E",
    routeGroup: "Group B - reporting and tax urgency",
    mainIntent: "Выбор отчетного маршрута",
    commercialIntent: "route selection",
    informationalSupportIntent: "reporting task separation",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: [
      "/deklaraciya-usn/",
      "/nulevaya-otchetnost-ooo/",
      "/nulevaya-otchetnost-ip/",
      "/otchetnost-elektronno/",
      "/vosstanovlenie-buhucheta/",
      "/otvet-na-trebovanie-ifns/"
    ],
    pageBlockModel: hubPageBlockModel,
    faqTopics: ["чем хаб отличается от услуги", "какой период нужен", "куда идти при требовании ИФНС"],
    whatWeCheck: reportingCheck,
    documentsOrData: reportingInputs,
    howWorkStarts: reportingStart,
    notPromised: reportingBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["intent_cannibalization", "scope_overreach", "tax_conclusion"],
    sourceAlignmentNotes: ["SC-002", "route-registry: hub", "stage-17-group-B"]
  },
  "nalogi-i-rezhimy": {
    metadataTitle: "Налоги и режимы для бизнеса - маршруты и диагностика",
    metadataDescription:
      "Хаб по налогам и режимам отделяет переход на АУСН, диагностику применимости, расчет нагрузки и вопрос НДС при УСН.",
    routeClass: "hub_tax_regime_router",
    routePhase: "17D/E",
    routeGroup: "Group F - tax regimes and diagnostics",
    mainIntent: "Выбор маршрута по режиму или диагностике",
    commercialIntent: "route selection",
    informationalSupportIntent: "regime diagnostics separation",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/perehod-na-ausn/", "/ausn-krym/", "/raschet-nalogovoy-nagruzki/", "/nds-pri-usn-2026/"],
    pageBlockModel: hubPageBlockModel,
    faqTopics: ["переход или диагностика", "какие вводные нужны", "что остается на проверке"],
    whatWeCheck: taxCheck,
    documentsOrData: taxInputs,
    howWorkStarts: taxStart,
    notPromised: taxBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["tax_advice_overreach", "calculation_promise", "source_gap"],
    sourceAlignmentNotes: ["SC-020", "route-registry: hub", "stage-17-group-F"]
  },
  "bank-i-115-fz": {
    metadataTitle: "Банк, запросы и документы по 115-ФЗ - выбор маршрута",
    metadataDescription:
      "Хаб для банковских запросов: отделяем точечный ответ от пакета документов по 115-ФЗ и сохраняем безопасный первый шаг.",
    routeClass: "hub_bank_115fz_router",
    routePhase: "17D/E",
    routeGroup: "Group C - bank and 115fz",
    mainIntent: "Выбор банковского маршрута",
    commercialIntent: "route selection",
    informationalSupportIntent: "bank request scope separation",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/otvet-na-zapros-banka/", "/dokumenty-dlya-banka-115-fz/", "/srochnye-voprosy/"],
    pageBlockModel: hubPageBlockModel,
    faqTopics: ["ответ или пакет", "что просит банк", "как показать материалы безопасно"],
    whatWeCheck: bankCheck,
    documentsOrData: bankInputs,
    howWorkStarts: bankStart,
    notPromised: bankBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["bank_outcome", "sensitive_materials", "universal_package"],
    sourceAlignmentNotes: ["SC-010", "route-registry: hub", "stage-17-group-C"]
  },
  "adres-egryul-direktor": {
    metadataTitle: "Адрес, ЕГРЮЛ и директор - маршруты изменений",
    metadataDescription:
      "Хаб помогает отделить юридический адрес, недостоверность адреса, смену адреса и смену директора без смешения интентов.",
    routeClass: "hub_address_egrul_director_router",
    routePhase: "17D/E",
    routeGroup: "Group D - address egrul director",
    mainIntent: "Выбор маршрута по адресу, ЕГРЮЛ или директору",
    commercialIntent: "route selection",
    informationalSupportIntent: "company-change intent separation",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: [
      "/yuridicheskiy-adres-simferopol/",
      "/nedostovernost-yuridicheskogo-adresa/",
      "/smena-yuridicheskogo-adresa-ooo/",
      "/smena-direktora-ooo/"
    ],
    pageBlockModel: hubPageBlockModel,
    faqTopics: ["адрес или изменение", "что проверить в сведениях", "когда нужен разбор ситуации"],
    whatWeCheck: addressCheck,
    documentsOrData: addressInputs,
    howWorkStarts: addressStart,
    notPromised: addressBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["registry_outcome", "legal_claim", "unconfirmed_company_data"],
    sourceAlignmentNotes: ["SC-013", "route-registry: hub", "stage-17-group-D"]
  },
  kadry: {
    metadataTitle: "Кадровые документы для бизнеса - маршруты HR-задач",
    metadataDescription:
      "Хаб по кадровым документам отделяет срочное оформление сотрудников от регулярного кадрового сопровождения.",
    routeClass: "hub_hr_router",
    routePhase: "17D/E",
    routeGroup: "Group G - HR and support",
    mainIntent: "Выбор кадрового маршрута",
    commercialIntent: "route selection",
    informationalSupportIntent: "HR task separation and safe data handling",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/srochnoe-oformlenie-sotrudnikov/", "/kadrovoe-soprovozhdenie/", "/soprovozhdenie/"],
    pageBlockModel: hubPageBlockModel,
    faqTopics: ["срочно или регулярно", "как показать кадровые материалы", "какие вводные нужны"],
    whatWeCheck: hrCheck,
    documentsOrData: hrInputs,
    howWorkStarts: hrStart,
    notPromised: hrBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["personal_data", "fake_urgency", "scope_overreach"],
    sourceAlignmentNotes: ["SC-024", "route-registry: hub", "stage-17-group-G"]
  },
  soprovozhdenie: {
    metadataTitle: "Сопровождение бизнеса по документам - рабочие маршруты",
    metadataDescription:
      "Хаб сопровождения отделяет бухгалтерское сопровождение ООО, ИП, кадровые задачи и разовые документальные вопросы.",
    routeClass: "hub_business_support_router",
    routePhase: "17D/E",
    routeGroup: "Group G - HR and support",
    mainIntent: "Выбор формата документального сопровождения",
    commercialIntent: "retention route selection",
    informationalSupportIntent: "support scope separation",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/buhgalterskoe-soprovozhdenie-ooo/", "/buhgalterskoe-soprovozhdenie-ip/", "/kadrovoe-soprovozhdenie/"],
    pageBlockModel: hubPageBlockModel,
    faqTopics: ["разовый вопрос или сопровождение", "какой объем обсуждать на старте", "куда перейти по точной задаче"],
    whatWeCheck: ["какие задачи повторяются", "какие документы уже ведутся", "где нужен разовый маршрут"],
    documentsOrData: ["краткий перечень текущих задач", "документы по отчетности или кадрам", "контекст бизнеса без чувствительных материалов в открытом интерфейсе"],
    howWorkStarts: ["отделяем регулярную работу от разовой задачи", "фиксируем границы первого разбора", "выбираем точную страницу"],
    notPromised: ["регулярный формат без согласования объема", "замену проверки документов", "решение внешней стороны"],
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["scope_overreach", "commercial_terms", "backend_not_connected"],
    sourceAlignmentNotes: ["SC-027", "route-registry: hub", "stage-17-group-G"]
  },
  "registraciya-i-likvidaciya": {
    metadataTitle: "Регистрация и ликвидация бизнеса - маршруты жизненного цикла",
    metadataDescription:
      "Хаб отделяет регистрацию ООО, регистрацию ИП и ликвидацию ООО, чтобы не смешивать разные документальные задачи.",
    routeClass: "hub_registration_liquidation_router",
    routePhase: "17D/E",
    routeGroup: "Group E - registration and liquidation",
    mainIntent: "Выбор маршрута жизненного цикла бизнеса",
    commercialIntent: "route selection",
    informationalSupportIntent: "registration and liquidation separation",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/registraciya-ooo/", "/registraciya-ip/", "/likvidaciya-ooo/", "/adres-egryul-direktor/"],
    pageBlockModel: hubPageBlockModel,
    faqTopics: ["ООО или ИП", "регистрация или ликвидация", "какие сведения подготовить"],
    whatWeCheck: registrationCheck,
    documentsOrData: registrationInputs,
    howWorkStarts: registrationStart,
    notPromised: registrationBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["registry_outcome", "legal_claim", "unconfirmed_data"],
    sourceAlignmentNotes: ["SC-017", "route-registry: hub", "stage-17-group-E"]
  },
  "otvet-na-trebovanie-ifns": {
    metadataTitle: "Ответ на требование ИФНС - документы и пояснения",
    metadataDescription:
      "Разбираем текст требования ИФНС, исходные документы и структуру ответа без обещаний внешнего решения.",
    routeClass: "money_ifns_requirement_response",
    routePhase: "17D/E",
    routeGroup: "Group B - reporting and tax urgency",
    mainIntent: "Ответ на требование ИФНС",
    commercialIntent: "high",
    informationalSupportIntent: "requirement text and document checklist",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/srochnye-voprosy/", "/otchetnost/", "/deklaraciya-usn/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["что указано в требовании", "какие документы относятся к вопросу", "как начать без публичной загрузки"],
    whatWeCheck: ["текст требования", "период и тему запроса", "какие документы подтверждают ситуацию"],
    documentsOrData: ["требование или письмо", "документы по указанному периоду", "краткое описание уже сделанных действий"],
    howWorkStarts: ["смотрим формулировку", "собираем относящиеся материалы", "готовим структуру ответа"],
    notPromised: reportingBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["ifns_outcome", "exact_timing", "missing_source_documents"],
    sourceAlignmentNotes: ["SVC-001", "passport: ifns-requirement-response", "stage-17-group-B"]
  },
  "deklaraciya-usn": {
    metadataTitle: "Декларация УСН - исходные данные и документы",
    metadataDescription:
      "Готовим маршрут по декларации УСН после проверки формы бизнеса, периода и исходных материалов.",
    routeClass: "money_usn_declaration",
    routePhase: "17D/E",
    routeGroup: "Group B - reporting and tax urgency",
    mainIntent: "Декларация УСН",
    commercialIntent: "high",
    informationalSupportIntent: "period and source-data checklist",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/otchetnost/", "/nulevaya-otchetnost-ooo/", "/nulevaya-otchetnost-ip/", "/vosstanovlenie-buhucheta/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["какой период нужен", "какие данные нужны", "когда нужна другая отчетная страница"],
    whatWeCheck: reportingCheck,
    documentsOrData: reportingInputs,
    howWorkStarts: reportingStart,
    notPromised: reportingBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["tax_conclusion", "source_gap", "scope_overreach"],
    sourceAlignmentNotes: ["SVC-006", "passport: usn-declaration", "stage-17-group-B"]
  },
  "nulevaya-otchetnost-ooo": {
    metadataTitle: "Нулевая отчетность ООО - проверка ситуации и документов",
    metadataDescription:
      "Разбираем вводные ООО, период и исходные материалы перед подготовкой маршрута по нулевой отчетности.",
    routeClass: "money_zero_reporting_ooo",
    routePhase: "17D/E",
    routeGroup: "Group B - reporting and tax urgency",
    mainIntent: "Нулевая отчетность ООО",
    commercialIntent: "high",
    informationalSupportIntent: "zero-reporting applicability checklist",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/otchetnost/", "/nulevaya-otchetnost-ip/", "/deklaraciya-usn/", "/buhgalterskoe-soprovozhdenie-ooo/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["что проверить у ООО", "какой период относится к вопросу", "когда нужен другой отчетный маршрут"],
    whatWeCheck: ["статус деятельности по периоду", "документы ООО", "связанные отчетные вопросы"],
    documentsOrData: reportingInputs,
    howWorkStarts: reportingStart,
    notPromised: reportingBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["tax_conclusion", "activity_status", "source_gap"],
    sourceAlignmentNotes: ["SVC-004", "passport: zero-reporting-ooo", "stage-17-group-B"]
  },
  "nulevaya-otchetnost-ip": {
    metadataTitle: "Нулевая отчетность ИП - вводные, период и документы",
    metadataDescription:
      "Проверяем вводные ИП, период и документы перед выбором маршрута по нулевой отчетности.",
    routeClass: "money_zero_reporting_ip",
    routePhase: "17D/E",
    routeGroup: "Group B - reporting and tax urgency",
    mainIntent: "Нулевая отчетность ИП",
    commercialIntent: "high",
    informationalSupportIntent: "IP zero-reporting checklist",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/otchetnost/", "/nulevaya-otchetnost-ooo/", "/deklaraciya-usn/", "/buhgalterskoe-soprovozhdenie-ip/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["что проверить у ИП", "какой период нужен", "когда нужен маршрут по декларации"],
    whatWeCheck: ["статус деятельности по периоду", "режим и документы ИП", "связанные отчетные вопросы"],
    documentsOrData: reportingInputs,
    howWorkStarts: reportingStart,
    notPromised: reportingBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["tax_conclusion", "activity_status", "source_gap"],
    sourceAlignmentNotes: ["SVC-005", "passport: zero-reporting-ip", "stage-17-group-B"]
  },
  "vosstanovlenie-buhucheta": {
    metadataTitle: "Восстановление бухучёта - разбор документов и пробелов",
    metadataDescription:
      "Начинаем восстановление порядка в учёте с проверки текущих документов, периодов и недостающих материалов.",
    routeClass: "money_accounting_recovery",
    routePhase: "17D/E",
    routeGroup: "Group B - reporting and tax urgency",
    mainIntent: "Восстановление бухучёта",
    commercialIntent: "high",
    informationalSupportIntent: "document gap and period review",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/otchetnost/", "/deklaraciya-usn/", "/buhgalterskoe-soprovozhdenie-ooo/", "/soprovozhdenie/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["какие периоды проверить", "что уже есть", "когда нужна отчетная страница"],
    whatWeCheck: ["какие периоды затронуты", "где есть пробелы", "какие документы уже собраны"],
    documentsOrData: ["имеющиеся учетные материалы", "периоды, по которым есть вопросы", "письма или требования, если они есть"],
    howWorkStarts: ["составляем карту документов", "фиксируем пробелы", "выбираем следующий отчетный или сопровождающий маршрут"],
    notPromised: ["полный вывод без просмотра материалов", "автоматическое восстановление из публичной страницы", "решение внешней стороны"],
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["scope_overreach", "source_gap", "outcome_promise"],
    sourceAlignmentNotes: ["SVC-007", "passport: accounting-recovery", "stage-17-group-B"]
  },
  "otchetnost-elektronno": {
    whatWeCheck: ["какая отчетность и канал нужны", "какие данные уже подготовлены", "как безопасно показать материалы"],
    documentsOrData: reportingInputs,
    howWorkStarts: ["разбираем отчетный маршрут", "не принимаем доступы через публичную страницу", "согласуем безопасный способ показа"],
    notPromised: reportingBoundaries
  },
  "otvet-na-zapros-banka": {
    metadataTitle: "Ответ на запрос банка - документы и пояснения",
    metadataDescription:
      "Разбираем формулировку запроса банка, подтверждающие документы и структуру ответа без обещаний решения банка.",
    routeClass: "money_bank_request_response",
    routePhase: "17D/E",
    routeGroup: "Group C - bank and 115fz",
    mainIntent: "Ответ на запрос банка",
    commercialIntent: "high",
    informationalSupportIntent: "bank request checklist and response structure",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/bank-i-115-fz/", "/dokumenty-dlya-banka-115-fz/", "/srochnye-voprosy/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["что просит банк", "какие материалы относятся к запросу", "чем отличается пакет по 115-ФЗ"],
    whatWeCheck: bankCheck,
    documentsOrData: bankInputs,
    howWorkStarts: bankStart,
    notPromised: bankBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["bank_outcome", "sensitive_materials", "source_gap"],
    sourceAlignmentNotes: ["SVC-009", "passport: bank-request-response", "stage-17-group-C"]
  },
  "dokumenty-dlya-banka-115-fz": {
    metadataTitle: "Документы для банка по 115-ФЗ - пакет по ситуации",
    metadataDescription:
      "Собираем документальный пакет по деловой ситуации, операции или контрагенту без обещаний решения банка.",
    routeClass: "money_bank_115fz_package",
    routePhase: "17D/E",
    routeGroup: "Group C - bank and 115fz",
    mainIntent: "Документы для банка по 115-ФЗ",
    commercialIntent: "high",
    informationalSupportIntent: "bank package checklist and scope",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/bank-i-115-fz/", "/otvet-na-zapros-banka/", "/srochnye-voprosy/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["какой пакет нужен", "что относится к операции", "чем пакет отличается от ответа"],
    whatWeCheck: bankCheck,
    documentsOrData: bankInputs,
    howWorkStarts: bankStart,
    notPromised: bankBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["bank_outcome", "universal_package", "sensitive_materials"],
    sourceAlignmentNotes: ["SVC-010", "passport: bank-115fz-package", "stage-17-group-C"]
  },
  "yuridicheskiy-adres-simferopol": {
    metadataTitle: "Юридический адрес в Симферополе - документы и проверка",
    metadataDescription:
      "Разбираем задачу по юридическому адресу в Симферополе, текущие сведения компании и подтверждающие материалы.",
    routeClass: "money_legal_address_simferopol",
    routePhase: "17D/E",
    routeGroup: "Group D - address egrul director",
    mainIntent: "Юридический адрес в Симферополе",
    commercialIntent: "high",
    informationalSupportIntent: "legal address document checklist",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/adres-egryul-direktor/", "/nedostovernost-yuridicheskogo-adresa/", "/smena-yuridicheskogo-adresa-ooo/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["какие документы по адресу", "как отделить от смены адреса", "что проверить в текущих сведениях"],
    whatWeCheck: addressCheck,
    documentsOrData: addressInputs,
    howWorkStarts: addressStart,
    notPromised: addressBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["registry_outcome", "legal_claim", "unconfirmed_data"],
    sourceAlignmentNotes: ["SVC-011", "passport: legal-address-simferopol", "stage-17-group-D"]
  },
  "nedostovernost-yuridicheskogo-adresa": {
    routeClass: "money_address_unreliability",
    routePhase: "17D/E",
    routeGroup: "Group D - address egrul director",
    mainIntent: "Недостоверность юридического адреса",
    commercialIntent: "high",
    informationalSupportIntent: "source of mark and address evidence review",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/adres-egryul-direktor/", "/yuridicheskiy-adres-simferopol/", "/smena-yuridicheskogo-adresa-ooo/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["где появилась отметка", "какие документы по адресу", "когда нужен маршрут смены адреса"],
    whatWeCheck: addressCheck,
    documentsOrData: addressInputs,
    howWorkStarts: addressStart,
    notPromised: addressBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["registry_outcome", "legal_claim", "source_gap"],
    sourceAlignmentNotes: ["SVC-012", "passport: address-unreliability", "stage-17-group-D"]
  },
  "smena-yuridicheskogo-adresa-ooo": {
    metadataTitle: "Смена юридического адреса ООО - документы и маршрут",
    metadataDescription:
      "Проверяем исходные документы ООО, новые сведения и маршрут подготовки документов для смены юридического адреса.",
    routeClass: "money_change_legal_address_ooo",
    routePhase: "17D/E",
    routeGroup: "Group D - address egrul director",
    mainIntent: "Смена юридического адреса ООО",
    commercialIntent: "high",
    informationalSupportIntent: "address change document checklist",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/adres-egryul-direktor/", "/yuridicheskiy-adres-simferopol/", "/nedostovernost-yuridicheskogo-adresa/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["что меняется", "какие сведения нужны", "чем отличается от адресной проверки"],
    whatWeCheck: addressCheck,
    documentsOrData: addressInputs,
    howWorkStarts: addressStart,
    notPromised: addressBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["registry_outcome", "legal_claim", "source_gap"],
    sourceAlignmentNotes: ["SVC-013", "passport: change-legal-address-ooo", "stage-17-group-D"]
  },
  "smena-direktora-ooo": {
    metadataTitle: "Смена директора ООО - документы для изменений",
    metadataDescription:
      "Разбираем исходные документы ООО и сведения для подготовки маршрута по смене директора.",
    routeClass: "money_change_director_ooo",
    routePhase: "17D/E",
    routeGroup: "Group D - address egrul director",
    mainIntent: "Смена директора ООО",
    commercialIntent: "high",
    informationalSupportIntent: "director change document checklist",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/adres-egryul-direktor/", "/smena-yuridicheskogo-adresa-ooo/", "/registraciya-i-likvidaciya/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["какие изменения готовятся", "что уже есть у ООО", "когда нужен общий хаб изменений"],
    whatWeCheck: ["исходные документы ООО", "какие сведения меняются", "связанные изменения компании"],
    documentsOrData: ["документы компании", "описание планируемого изменения", "материалы, которые уже подготовлены"],
    howWorkStarts: ["уточняем изменение", "смотрим исходный комплект", "выбираем документальный маршрут"],
    notPromised: addressBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["registry_outcome", "legal_claim", "source_gap"],
    sourceAlignmentNotes: ["SVC-014", "passport: change-director-ooo", "stage-17-group-D"]
  },
  "registraciya-ooo": {
    metadataTitle: "Регистрация ООО в Симферополе - стартовый комплект",
    metadataDescription:
      "Готовим маршрут по регистрации ООО после разбора участников задачи, исходных сведений и стартового комплекта.",
    routeClass: "money_registration_ooo",
    routePhase: "17D/E",
    routeGroup: "Group E - registration and liquidation",
    mainIntent: "Регистрация ООО",
    commercialIntent: "high",
    informationalSupportIntent: "OOO registration source-data checklist",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/registraciya-i-likvidaciya/", "/registraciya-ip/", "/yuridicheskiy-adres-simferopol/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["ООО или ИП", "какие сведения подготовить", "как связан юридический адрес"],
    whatWeCheck: registrationCheck,
    documentsOrData: registrationInputs,
    howWorkStarts: registrationStart,
    notPromised: registrationBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["registry_outcome", "legal_claim", "unconfirmed_data"],
    sourceAlignmentNotes: ["SVC-015", "passport: registration-ooo", "stage-17-group-E"]
  },
  "registraciya-ip": {
    metadataTitle: "Регистрация ИП в Симферополе - документы и вводные",
    metadataDescription:
      "Разбираем стартовую ситуацию, исходные сведения и документальный маршрут для регистрации ИП.",
    routeClass: "money_registration_ip",
    routePhase: "17D/E",
    routeGroup: "Group E - registration and liquidation",
    mainIntent: "Регистрация ИП",
    commercialIntent: "high",
    informationalSupportIntent: "IP registration source-data checklist",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/registraciya-i-likvidaciya/", "/registraciya-ooo/", "/nalogi-i-rezhimy/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["ИП или ООО", "какие сведения подготовить", "когда смотреть налоговый режим"],
    whatWeCheck: registrationCheck,
    documentsOrData: registrationInputs,
    howWorkStarts: registrationStart,
    notPromised: registrationBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["registry_outcome", "legal_claim", "unconfirmed_data"],
    sourceAlignmentNotes: ["SVC-016", "passport: registration-ip", "stage-17-group-E"]
  },
  "likvidaciya-ooo": {
    metadataTitle: "Ликвидация ООО - документы и безопасный маршрут",
    metadataDescription:
      "Начинаем маршрут ликвидации ООО с проверки исходных документов компании и текущей ситуации.",
    routeClass: "money_liquidation_ooo",
    routePhase: "17D/E",
    routeGroup: "Group E - registration and liquidation",
    mainIntent: "Ликвидация ООО",
    commercialIntent: "high",
    informationalSupportIntent: "liquidation document route checklist",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/registraciya-i-likvidaciya/", "/registraciya-ooo/", "/soprovozhdenie/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["какие документы компании нужны", "что уже сделано", "когда нужен общий разбор"],
    whatWeCheck: registrationCheck,
    documentsOrData: registrationInputs,
    howWorkStarts: registrationStart,
    notPromised: registrationBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["registry_outcome", "exact_timing", "legal_claim"],
    sourceAlignmentNotes: ["SVC-017", "passport: liquidation-ooo", "stage-17-group-E"]
  },
  "perehod-na-ausn": {
    whatWeCheck: taxCheck,
    documentsOrData: taxInputs,
    howWorkStarts: taxStart,
    notPromised: taxBoundaries
  },
  "ausn-krym": {
    metadataTitle: "Подходит ли АУСН в Крыму - диагностика вводных",
    metadataDescription:
      "Диагностический маршрут по АУСН в Крыму: собираем вводные и отделяем проверку применимости от перехода.",
    routeClass: "diagnostic_ausn_krym",
    routePhase: "17D/E",
    routeGroup: "Group F - tax regimes and diagnostics",
    mainIntent: "Диагностика применимости АУСН в Крыму",
    commercialIntent: "diagnostic",
    informationalSupportIntent: "AUSN applicability review boundary",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/nalogi-i-rezhimy/", "/perehod-na-ausn/", "/raschet-nalogovoy-nagruzki/"],
    pageBlockModel: diagnosticPageBlockModel,
    faqTopics: ["диагностика или переход", "какие вводные нужны", "что остается на проверке"],
    whatWeCheck: taxCheck,
    documentsOrData: taxInputs,
    howWorkStarts: taxStart,
    notPromised: taxBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["tax_conclusion", "source_gap", "outcome_promise"],
    sourceAlignmentNotes: ["SVC-021", "passport: ausn-krym-diagnostics", "stage-17-group-F"]
  },
  "raschet-nalogovoy-nagruzki": {
    metadataTitle: "Расчет налоговой нагрузки - вводные и структура",
    metadataDescription:
      "Диагностический маршрут по налоговой нагрузке: собираем исходные данные и структуру вопроса без публичного вывода.",
    routeClass: "diagnostic_tax_load_calculation",
    routePhase: "17D/E",
    routeGroup: "Group F - tax regimes and diagnostics",
    mainIntent: "Расчет налоговой нагрузки",
    commercialIntent: "diagnostic",
    informationalSupportIntent: "tax load input checklist",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/nalogi-i-rezhimy/", "/perehod-na-ausn/", "/nds-pri-usn-2026/"],
    pageBlockModel: diagnosticPageBlockModel,
    faqTopics: ["какие вводные нужны", "что является диагностикой", "когда нужен налоговый маршрут"],
    whatWeCheck: taxCheck,
    documentsOrData: taxInputs,
    howWorkStarts: taxStart,
    notPromised: taxBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["calculation_promise", "tax_conclusion", "source_gap"],
    sourceAlignmentNotes: ["SVC-022", "passport: tax-load-calculation", "stage-17-group-F"]
  },
  "nds-pri-usn-2026": {
    metadataTitle: "НДС при УСН в 2026 году - диагностика ситуации",
    metadataDescription:
      "Диагностический маршрут по НДС при УСН в 2026 году: проверяем режим, документы и контекст без публичного вывода.",
    routeClass: "diagnostic_vat_usn_2026",
    routePhase: "17D/E",
    routeGroup: "Group F - tax regimes and diagnostics",
    mainIntent: "НДС при УСН в 2026 году",
    commercialIntent: "diagnostic",
    informationalSupportIntent: "VAT under USN input checklist",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/nalogi-i-rezhimy/", "/deklaraciya-usn/", "/raschet-nalogovoy-nagruzki/"],
    pageBlockModel: diagnosticPageBlockModel,
    faqTopics: ["какой режим сейчас", "какие документы смотреть", "что остается на проверке"],
    whatWeCheck: taxCheck,
    documentsOrData: taxInputs,
    howWorkStarts: taxStart,
    notPromised: taxBoundaries,
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["tax_conclusion", "source_gap", "future_rule_review"],
    sourceAlignmentNotes: ["SVC-023", "passport: vat-usn-2026", "stage-17-group-F"]
  },
  "srochnoe-oformlenie-sotrudnikov": {
    whatWeCheck: hrCheck,
    documentsOrData: hrInputs,
    howWorkStarts: hrStart,
    notPromised: hrBoundaries
  },
  "kadrovoe-soprovozhdenie": {
    whatWeCheck: hrCheck,
    documentsOrData: hrInputs,
    howWorkStarts: hrStart,
    notPromised: hrBoundaries
  },
  "buhgalterskoe-soprovozhdenie-ooo": {
    whatWeCheck: ["документы ООО и отчетный статус", "регулярные и разовые задачи", "какие маршруты не нужно смешивать"],
    documentsOrData: ["текущие документы ООО", "перечень повторяющихся задач", "вопросы по отчетности или учету"],
    howWorkStarts: ["смотрим текущий комплект", "отделяем сопровождение от разовой задачи", "выбираем точный маршрут"],
    notPromised: ["регулярный формат без согласования объема", "решение внешней стороны", "замену проверки документов"]
  },
  "buhgalterskoe-soprovozhdenie-ip": {
    whatWeCheck: ["режим и документы ИП", "отчетные вопросы", "разовые и регулярные задачи"],
    documentsOrData: ["данные ИП", "документы по периоду", "перечень текущих задач"],
    howWorkStarts: ["смотрим режим и период", "отделяем сопровождение от разовой декларации", "выбираем безопасный следующий шаг"],
    notPromised: ["регулярный формат без согласования объема", "налоговый вывод без вводных", "замену проверки документов"]
  }
};

export const hubs: RoutePage[] = [
  {
    slug: "srochnye-voprosy",
    href: "/srochnye-voprosy/",
    title: "Срочные и неясные вопросы по документам",
    shortTitle: "Срочные вопросы",
    kicker: "Хаб · первый шаг",
    description:
      "Когда непонятно, с чего начать, сначала разбираем ситуацию и определяем безопасный маршрут по документам.",
    image: "/assets/images/consultation-documents.png",
    imageAlt: "Разбор срочного вопроса по документам",
    bullets: ["первичный разбор", "список документов", "понятный следующий шаг", "без обещаний результата до изучения"],
    longText: [
      "Эта страница помогает начать с аккуратного разбора, если вопрос срочный или формулировка запроса пока неясна.",
      "Принесите то, что уже есть: письма, требования, выписки, договоры, черновики и переписку. После разбора станет понятнее, какой комплект нужен."
    ],
    pageType: "hub"
  },
  {
    slug: "otchetnost",
    href: "/otchetnost/",
    title: "Отчетность и документы для учета",
    shortTitle: "Отчетность",
    kicker: "Хаб · отчетность",
    description:
      "Маршрут для вопросов по отчетности, нулевым отчетам, электронным документам и восстановлению порядка в учете.",
    image: "/assets/images/reporting-workflow.png",
    imageAlt: "Рабочий стол с документами для отчетности",
    bullets: ["декларации и отчеты", "нулевая отчетность", "электронные документы", "систематизация исходных данных"],
    longText: [
      "Здесь собраны направления, где важны аккуратность исходных данных и понятная структура документов.",
      "Хаб не заменяет узкую посадочную страницу. Он помогает выбрать маршрут и перейти к конкретному вопросу."
    ],
    pageType: "hub"
  },
  {
    slug: "nalogi-i-rezhimy",
    href: "/nalogi-i-rezhimy/",
    title: "Налоги и режимы для бизнеса",
    shortTitle: "Налоги и режимы",
    kicker: "Хаб · налоговые вопросы",
    description:
      "Помогаем разобраться с документами по налоговому режиму, нагрузке и смежным вопросам без сложного канцелярита.",
    image: "/assets/images/tax-accounting-books.png",
    imageAlt: "Книги по налоговому учету и бухгалтерии",
    bullets: ["налоговые документы", "режимы и переходы", "исходные данные", "проверка применимости"],
    longText: [
      "В налоговых вопросах важно не угадывать, а спокойно собрать входные данные и понять контекст.",
      "На старте фиксируем ситуацию, документы и ограничения, а затем выбираем следующий шаг."
    ],
    pageType: "hub"
  },
  {
    slug: "bank-i-115-fz",
    href: "/bank-i-115-fz/",
    title: "Банк, запросы и документы по 115-ФЗ",
    shortTitle: "Банк и 115-ФЗ",
    kicker: "Хаб · банк",
    description:
      "Маршрут для запросов банка, документов по операциям, контрагентам и деловой ситуации.",
    image: "/assets/images/bank-115fz-documents.png",
    imageAlt: "Подготовка документов по запросу банка",
    bullets: ["запрос банка", "документы по операции", "пояснения", "перечень недостающих материалов"],
    longText: [
      "Если пришел запрос, важно не торопиться с лишними обещаниями, а понять смысл вопроса и собрать подтверждающие материалы.",
      "Мы помогаем структурировать документы и подготовить понятный пакет под реальную деловую ситуацию."
    ],
    pageType: "hub"
  },
  {
    slug: "adres-egryul-direktor",
    href: "/adres-egryul-direktor/",
    title: "Адрес, ЕГРЮЛ и изменения в компании",
    shortTitle: "Адрес и ЕГРЮЛ",
    kicker: "Хаб · изменения",
    description:
      "Маршрут для юридического адреса, изменений сведений, директора и связанных документов компании.",
    image: "/assets/images/legal-address-documents.png",
    imageAlt: "Документы по юридическому адресу и ЕГРЮЛ",
    bullets: ["юридический адрес", "изменения сведений", "директор", "документы компании"],
    longText: [
      "Ситуации с адресом и сведениями компании часто связаны с несколькими документами и решениями.",
      "Сначала разбираем, что уже есть, затем определяем, какой комплект нужен для следующего шага."
    ],
    pageType: "hub"
  },
  {
    slug: "kadry",
    href: "/kadry/",
    title: "Кадровые документы для бизнеса",
    shortTitle: "Кадры",
    kicker: "Хаб · кадровые вопросы",
    description:
      "Подготовка и структурирование кадровых документов, когда нужно аккуратно собрать рабочий комплект.",
    image: "/assets/images/team-specialists.png",
    imageAlt: "Специалисты обсуждают кадровые документы",
    bullets: ["кадровый комплект", "документы сотрудников", "порядок действий", "спокойный разбор"],
    longText: [
      "Кадровый вопрос лучше начинать с проверки исходных данных и понимания, какие документы уже есть.",
      "После этого можно определить маршрут и подготовить комплект без лишней суеты."
    ],
    pageType: "hub"
  },
  {
    slug: "soprovozhdenie",
    href: "/soprovozhdenie/",
    title: "Сопровождение бизнеса по документам",
    shortTitle: "Сопровождение",
    kicker: "Хаб · сопровождение",
    description:
      "Документальное сопровождение рабочих вопросов бизнеса: отчетность, учет, кадры, банк и изменения.",
    image: "/assets/images/office-reception.png",
    imageAlt: "Локальный офис центра подготовки документов",
    bullets: ["рабочие документы", "порядок в комплекте", "следующий шаг", "локальный офис"],
    longText: [
      "Сопровождение начинается с понятного разбора: что происходит, какие документы уже есть и где нужен следующий шаг.",
      "Мы сохраняем спокойную деловую логику и не обещаем результат до изучения ситуации."
    ],
    pageType: "hub"
  },
  {
    slug: "registraciya-i-likvidaciya",
    href: "/registraciya-i-likvidaciya/",
    title: "Регистрация и ликвидация бизнеса",
    shortTitle: "Регистрация",
    kicker: "Хаб · жизненный цикл",
    description:
      "Маршрут для регистрации ООО, регистрации ИП, изменений и ликвидации с понятным комплектом документов.",
    image: "/assets/images/registration-changes.png",
    imageAlt: "Подписание документов для регистрации бизнеса",
    bullets: ["регистрация ООО", "регистрация ИП", "изменения", "ликвидация"],
    longText: [
      "На старте важно выбрать не самый громкий, а самый подходящий маршрут под конкретную задачу.",
      "Хаб помогает перейти к нужной посадочной странице и начать с безопасного разбора."
    ],
    pageType: "hub"
  }
];

export const services: RoutePage[] = [
  {
    slug: "otvet-na-trebovanie-ifns",
    href: "/otvet-na-trebovanie-ifns/",
    title: "Ответ на требование ИФНС",
    shortTitle: "Ответ на требование",
    kicker: "Money-page · срочный вопрос",
    description:
      "Разберем текст требования, исходные документы и подготовим понятный комплект для следующего действия.",
    image: "/assets/images/consultation-documents.png",
    imageAlt: "Подготовка ответа на требование по документам",
    bullets: ["разбор текста требования", "перечень исходных документов", "структура пояснений", "проверка недостающих материалов"],
    longText: [
      "Не стоит отвечать вслепую. Сначала нужно понять, какой вопрос задан, какие документы уже есть и что относится к ситуации.",
      "Мы помогаем собрать пакет и объясняем порядок действий простыми словами."
    ],
    parentHref: "/srochnye-voprosy/",
    pageType: "money"
  },
  {
    slug: "deklaraciya-usn",
    href: "/deklaraciya-usn/",
    title: "Декларация УСН в Симферополе",
    shortTitle: "Декларация УСН",
    kicker: "Money-page · отчетность",
    description:
      "Поможем собрать исходные данные и подготовить документы для вопроса по декларации УСН.",
    image: "/assets/images/reporting-workflow.png",
    imageAlt: "Документы для декларации УСН",
    bullets: ["исходные данные", "документы по периоду", "проверка комплекта", "понятный следующий шаг"],
    longText: [
      "Для декларации важна не только форма, но и исходные документы, на которых строится отчетный вопрос.",
      "На первом шаге разбираем материалы, фиксируем недостающие данные и готовим комплект под ситуацию."
    ],
    parentHref: "/otchetnost/",
    pageType: "money"
  },
  {
    slug: "nulevaya-otchetnost-ooo",
    href: "/nulevaya-otchetnost-ooo/",
    title: "Нулевая отчетность ООО",
    shortTitle: "Нулевая отчетность ООО",
    kicker: "Money-page · отчетность",
    description:
      "Разберем ситуацию ООО и подготовим документы по вопросу нулевой отчетности без лишних обещаний.",
    image: "/assets/images/blog-document-route.png",
    imageAlt: "Чек-лист документов для нулевой отчетности ООО",
    bullets: ["проверка исходных данных", "документы ООО", "отчетный вопрос", "список недостающего"],
    longText: [
      "Нулевая отчетность требует проверки исходной ситуации, а не автоматического ответа по шаблону.",
      "Сначала уточняем контекст, затем готовим понятный комплект документов."
    ],
    parentHref: "/otchetnost/",
    pageType: "money"
  },
  {
    slug: "nulevaya-otchetnost-ip",
    href: "/nulevaya-otchetnost-ip/",
    title: "Нулевая отчетность ИП",
    shortTitle: "Нулевая отчетность ИП",
    kicker: "Money-page · отчетность",
    description:
      "Поможем понять исходные данные ИП и подготовить документы по вопросу нулевой отчетности.",
    image: "/assets/images/faq-consultation.png",
    imageAlt: "Разбор документов для нулевой отчетности ИП",
    bullets: ["ситуация ИП", "исходные документы", "отчетный период", "понятный маршрут"],
    longText: [
      "Даже простой вопрос лучше начинать с проверки фактов и документов, которые уже есть.",
      "После разбора становится понятнее, какой следующий шаг нужен."
    ],
    parentHref: "/otchetnost/",
    pageType: "money"
  },
  {
    slug: "vosstanovlenie-buhucheta",
    href: "/vosstanovlenie-buhucheta/",
    title: "Восстановление бухучёта",
    shortTitle: "Восстановление бухучёта",
    kicker: "Money-page · отчетность",
    description:
      "Разберем текущее состояние документов и поможем определить, какой комплект нужен для восстановления порядка в учёте.",
    image: "/assets/images/reporting-workflow.png",
    imageAlt: "Документы и рабочий процесс для восстановления бухучёта",
    bullets: ["текущие документы", "периоды и пробелы", "исходные данные", "план следующего шага"],
    longText: [
      "Восстановление учёта начинается с понимания, какие документы уже есть, где есть пробелы и какие периоды требуют внимания.",
      "Мы не обещаем итог без проверки исходных данных. Первый шаг - разобрать комплект и зафиксировать безопасный маршрут подготовки документов."
    ],
    parentHref: "/otchetnost/",
    pageType: "money"
  },
  {
    slug: "otchetnost-elektronno",
    href: "/otchetnost-elektronno/",
    title: "Электронная отчётность для бизнеса",
    metadataTitle: "Электронная отчётность для бизнеса - документы и маршрут",
    metadataDescription:
      "Электронная отчётность: какие вводные и документы подготовить для электронного маршрута без передачи доступов через публичную страницу.",
    shortTitle: "Электронная отчётность",
    kicker: "Money-page · отчётность",
    description:
      "Разберём, какие данные и документы нужны для электронного маршрута отчётности, без передачи доступов через публичную страницу.",
    image: "/assets/images/reporting-workflow.png",
    imageAlt: "Документы и электронный маршрут отчётности",
    bullets: ["канал сдачи", "данные организации или ИП", "документы по периоду", "безопасный способ показать материалы"],
    longText: [
      "Электронная отчётность - это не только отправка формы. Сначала важно понять, какая отчётность нужна, какие данные уже есть и какой канал подходит.",
      "Мы не просим доступы через публичную страницу. Первый шаг - разобрать ситуацию и согласовать безопасный способ показать материалы."
    ],
    parentHref: "/otchetnost/",
    primaryCtaLabel: cta.primary,
    primaryCtaHref: "/razbor-situacii/",
    leadTopic: "reporting_electronic",
    routeClass: "money_page_e_reporting",
    routePhase: "E",
    routeGroup: "Отчётность",
    mainIntent: "Электронная отчётность",
    commercialIntent: "consideration",
    informationalSupportIntent: "data checklist and security note",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/deklaraciya-usn/", "/nulevaya-otchetnost-ooo/", "/nulevaya-otchetnost-ip/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["какие данные нужны", "чем отличается от декларации", "как не передавать доступы публично"],
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["credentials", "platform_promise", "exact_timing"],
    sourceAlignmentNotes: ["SC-008", "SVC-007", "passport: electronic-reporting"],
    pageType: "money"
  },
  {
    slug: "perehod-na-ausn",
    href: "/perehod-na-ausn/",
    title: "Переход на АУСН: документы и маршрут",
    metadataTitle: "Переход на АУСН - документы и безопасный маршрут",
    metadataDescription:
      "Переход на АУСН: разбор вводных, текущего режима и документального маршрута без публичного налогового вывода.",
    shortTitle: "Переход на АУСН",
    kicker: "Money-page · налоги и режимы",
    description:
      "Разберём вводные для перехода на АУСН и подготовим документальный маршрут без публичного налогового вывода.",
    image: "/assets/images/tax-accounting-books.png",
    imageAlt: "Документы по налоговому режиму и переходу на АУСН",
    bullets: ["текущий режим", "данные бизнеса", "проверка применимости", "следующий документальный шаг"],
    longText: [
      "Переход на АУСН зависит от вводных бизнеса, текущего режима и условий применимости. Публичная страница не заменяет проверку.",
      "На первом шаге собираем исходные данные, отделяем переход от диагностики и определяем, какой документальный маршрут проверять дальше."
    ],
    parentHref: "/nalogi-i-rezhimy/",
    primaryCtaLabel: cta.primary,
    primaryCtaHref: "/razbor-situacii/",
    leadTopic: "tax_ausn_transition",
    routeClass: "money_page_ausn_transition",
    routePhase: "D",
    routeGroup: "Налоги и режимы",
    mainIntent: "Переход на АУСН",
    commercialIntent: "consideration",
    informationalSupportIntent: "transition checklist and review boundary",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/ausn-krym/", "/raschet-nalogovoy-nagruzki/", "/nds-pri-usn-2026/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["чем отличается от диагностики", "что подготовить", "что остаётся на проверке"],
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["tax_review", "savings_promise", "conclusion_without_inputs"],
    sourceAlignmentNotes: ["SC-021", "SVC-020", "passport: ausn-transition"],
    pageType: "money"
  },
  {
    slug: "otvet-na-zapros-banka",
    href: "/otvet-na-zapros-banka/",
    title: "Ответ на запрос банка",
    shortTitle: "Ответ банку",
    kicker: "Money-page · банк",
    description:
      "Подготовим структуру ответа по запросу банка: документы, пояснения и список недостающих материалов.",
    image: "/assets/images/bank-115fz-documents.png",
    imageAlt: "Документы для ответа на запрос банка",
    bullets: ["текст запроса", "документы по операции", "пояснения", "материалы по контрагенту"],
    longText: [
      "В запросе банка важно понять, какие факты требуется подтвердить и какие документы уже есть у бизнеса.",
      "Мы помогаем собрать пакет и сделать его понятным для дальнейшей работы."
    ],
    parentHref: "/bank-i-115-fz/",
    pageType: "money"
  },
  {
    slug: "dokumenty-dlya-banka-115-fz",
    href: "/dokumenty-dlya-banka-115-fz/",
    title: "Документы для банка по 115-ФЗ",
    shortTitle: "Документы 115-ФЗ",
    kicker: "Money-page · 115-ФЗ",
    description:
      "Соберем документы по деловой ситуации, операции или контрагенту для ответа на банковский запрос.",
    image: "/assets/images/ai-document-assistant.png",
    imageAlt: "ИИ-помощник и документы для банка по 115-ФЗ",
    bullets: ["договоры и акты", "платежные документы", "пояснения", "структура пакета"],
    longText: [
      "Документы по 115-ФЗ лучше готовить по конкретной ситуации, а не по универсальному списку.",
      "Цифровые инструменты помогают со структурой, а финальный комплект проверяет специалист."
    ],
    parentHref: "/bank-i-115-fz/",
    pageType: "money"
  },
  {
    slug: "yuridicheskiy-adres-simferopol",
    href: "/yuridicheskiy-adres-simferopol/",
    title: "Юридический адрес в Симферополе",
    shortTitle: "Юридический адрес",
    kicker: "Money-page · адрес",
    description:
      "Разберем документы по юридическому адресу и связанным сведениям компании в Симферополе.",
    image: "/assets/images/legal-address-documents.png",
    imageAlt: "Документы по юридическому адресу в Симферополе",
    bullets: ["документы по адресу", "сведения компании", "проверка комплекта", "следующий шаг"],
    longText: [
      "В вопросах адреса важны подтверждающие документы, корректность сведений и понятная последовательность действий.",
      "Мы помогаем собрать материалы и определить, что нужно подготовить на старте."
    ],
    parentHref: "/adres-egryul-direktor/",
    pageType: "money"
  },
  {
    slug: "smena-yuridicheskogo-adresa-ooo",
    href: "/smena-yuridicheskogo-adresa-ooo/",
    title: "Смена юридического адреса ООО",
    shortTitle: "Смена адреса ООО",
    kicker: "Money-page · изменения ООО",
    description:
      "Подготовим документы для вопроса смены юридического адреса ООО после разбора исходной ситуации.",
    image: "/assets/images/registration-changes.png",
    imageAlt: "Документы для смены юридического адреса ООО",
    bullets: ["исходные документы ООО", "новые сведения", "решения и заявления", "проверка маршрута"],
    longText: [
      "Смена адреса связана с документами компании и подтверждением новых сведений.",
      "Сначала смотрим исходный комплект и только после этого определяем порядок подготовки."
    ],
    parentHref: "/adres-egryul-direktor/",
    pageType: "money"
  },
  {
    slug: "nedostovernost-yuridicheskogo-adresa",
    href: "/nedostovernost-yuridicheskogo-adresa/",
    title: "Недостоверность юридического адреса: что проверить",
    metadataTitle: "Недостоверность юридического адреса - документы и маршрут",
    metadataDescription:
      "Недостоверность юридического адреса: проверить источник отметки, текущие данные компании и возможный адресный маршрут.",
    shortTitle: "Недостоверность адреса",
    kicker: "Money-page · адрес",
    description:
      "Если появилась отметка, риск или вопрос по достоверности адреса, сначала нужно понять источник, текущие данные компании и документы по адресу.",
    image: "/assets/images/legal-address-documents.png",
    imageAlt: "Документы по юридическому адресу и текущим сведениям компании",
    bullets: [
      "источник отметки или риска",
      "текущие данные компании",
      "документы по адресу",
      "адресный маршрут без обещаний внешнего решения"
    ],
    longText: [
      "В вопросах недостоверности адреса нельзя начинать с готового ответа. Сначала нужно увидеть, где появился риск, какие сведения указаны сейчас и какие документы относятся к адресу.",
      "Иногда вопрос ведет к смене адреса, иногда - к проверке подтверждающих материалов, иногда - к более широкому разбору данных ЕГРЮЛ.",
      "Мы не обещаем снятие отметки или принятие пояснений. Первый шаг - показать источник проблемы и понять безопасный следующий маршрут."
    ],
    parentHref: "/adres-egryul-direktor/",
    primaryCtaLabel: cta.docs,
    primaryCtaHref: "/razbor-situacii/",
    leadTopic: "unreliable_legal_address",
    safeCtaNote: "Без публичной загрузки файлов: покажите выписку, уведомление или документ в согласованном канале.",
    pageType: "money"
  },
  {
    slug: "smena-direktora-ooo",
    href: "/smena-direktora-ooo/",
    title: "Смена директора ООО",
    shortTitle: "Смена директора",
    kicker: "Money-page · изменения ООО",
    description:
      "Поможем подготовить документы для вопроса смены директора ООО и связанных изменений.",
    image: "/assets/images/team-specialists.png",
    imageAlt: "Обсуждение документов для смены директора ООО",
    bullets: ["документы ООО", "решение по изменениям", "заявления", "проверка следующего шага"],
    longText: [
      "В изменениях по директору важны корректные исходные данные и понятная последовательность действий.",
      "Мы разбираем ситуацию и готовим комплект без обещаний результата до изучения документов."
    ],
    parentHref: "/adres-egryul-direktor/",
    pageType: "money"
  },
  {
    slug: "srochnoe-oformlenie-sotrudnikov",
    href: "/srochnoe-oformlenie-sotrudnikov/",
    title: "Срочное оформление сотрудников: какие документы подготовить",
    metadataTitle: "Срочное оформление сотрудников - кадровые документы",
    metadataDescription:
      "Срочное оформление сотрудников: разбор кадрового события, вводных и документов без публичной передачи персональных данных.",
    shortTitle: "Срочное оформление сотрудников",
    kicker: "Money-page · кадровые документы",
    description:
      "Когда сотрудник выходит скоро, сначала разбираем событие и вводные, чтобы понять кадровый документальный маршрут.",
    image: "/assets/images/team-specialists.png",
    imageAlt: "Кадровые документы и рабочий разбор по сотруднику",
    bullets: ["событие по сотруднику", "данные без публичной загрузки", "кадровый комплект", "без обещания даты"],
    longText: [
      "Срочность не отменяет проверку вводных. Важно понять, что уже есть, какой сотрудник выходит и какие кадровые документы относятся к событию.",
      "Персональные данные не собираются через публичную страницу. Сначала согласуем безопасный способ показать материалы и только потом выбираем следующий шаг."
    ],
    parentHref: "/kadry/",
    primaryCtaLabel: cta.docs,
    primaryCtaHref: "/razbor-situacii/",
    leadTopic: "hr_urgent_employee_onboarding",
    safeCtaNote: "Без публичной загрузки файлов: сначала согласуем безопасный способ показать кадровые материалы.",
    routeClass: "money_page_hr_urgent",
    routePhase: "D",
    routeGroup: "Кадры",
    mainIntent: "Срочное оформление сотрудников",
    commercialIntent: "high intent",
    informationalSupportIntent: "urgency triage and safe next step",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/kadrovoe-soprovozhdenie/", "/kadry/", "/kontakty/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["что считать срочным", "что можно показать", "как не передавать персональные данные публично"],
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["exact_timing", "personal_data_upload", "employment_without_documents"],
    sourceAlignmentNotes: ["SC-025", "SVC-024", "passport: urgent-employee-onboarding"],
    pageType: "money"
  },
  {
    slug: "kadrovoe-soprovozhdenie",
    href: "/kadrovoe-soprovozhdenie/",
    title: "Кадровое сопровождение бизнеса",
    metadataTitle: "Кадровое сопровождение бизнеса - документы и маршрут",
    metadataDescription:
      "Кадровое сопровождение бизнеса: регулярные кадровые вопросы, документы сотрудников и безопасный первый разбор.",
    shortTitle: "Кадровое сопровождение",
    kicker: "Money-page · кадровые документы",
    description:
      "Разберём, какие кадровые документы и регулярные действия нужны бизнесу, без сбора персональных данных на публичной странице.",
    image: "/assets/images/team-specialists.png",
    imageAlt: "Специалисты обсуждают кадровое сопровождение бизнеса",
    bullets: ["регулярные кадровые вопросы", "документы сотрудников", "разовые и повторяющиеся задачи", "безопасный показ материалов"],
    longText: [
      "Кадровое сопровождение подходит, когда вопрос повторяется или нужен порядок в кадровых документах, а не только разовый срочный шаг.",
      "На старте фиксируем задачу, отделяем регулярный формат от срочного оформления и не собираем персональные данные через публичный интерфейс."
    ],
    parentHref: "/kadry/",
    primaryCtaLabel: cta.primary,
    primaryCtaHref: "/razbor-situacii/",
    leadTopic: "hr_support",
    routeClass: "money_page_support_hr",
    routePhase: "E",
    routeGroup: "Кадры",
    mainIntent: "Кадровое сопровождение",
    commercialIntent: "consideration",
    informationalSupportIntent: "scope clarification and safe source capture",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/srochnoe-oformlenie-sotrudnikov/", "/soprovozhdenie/", "/razbor-situacii/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["когда нужен регулярный формат", "чем отличается от срочного", "какие вводные подготовить"],
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["personal_data", "scope_promise", "exact_timing"],
    sourceAlignmentNotes: ["SC-026", "SVC-025", "passport: hr-support"],
    pageType: "money"
  },
  {
    slug: "registraciya-ooo",
    href: "/registraciya-ooo/",
    title: "Регистрация ООО в Симферополе",
    shortTitle: "Регистрация ООО",
    kicker: "Money-page · регистрация",
    description:
      "Подготовим стартовый комплект документов для регистрации ООО после спокойного разбора задачи.",
    image: "/assets/images/registration-changes.png",
    imageAlt: "Подписание документов для регистрации ООО",
    bullets: ["стартовый комплект", "учредительные документы", "сведения для регистрации", "маршрут следующих действий"],
    longText: [
      "Регистрацию лучше начинать с понятной структуры: кто участвует, какие сведения нужны и какие документы уже готовы.",
      "После разбора формируем комплект под конкретную задачу."
    ],
    parentHref: "/registraciya-i-likvidaciya/",
    pageType: "money"
  },
  {
    slug: "registraciya-ip",
    href: "/registraciya-ip/",
    title: "Регистрация ИП в Симферополе",
    shortTitle: "Регистрация ИП",
    kicker: "Money-page · регистрация",
    description:
      "Разберем стартовую ситуацию и подготовим документы для вопроса регистрации ИП.",
    image: "/assets/images/consultation-documents.png",
    imageAlt: "Подготовка документов для регистрации ИП",
    bullets: ["исходные данные", "заявление", "маршрут регистрации", "проверка комплекта"],
    longText: [
      "Для регистрации ИП важно заранее понять исходные данные и порядок действий.",
      "Мы помогаем собрать документы и объяснить следующий шаг простыми словами."
    ],
    parentHref: "/registraciya-i-likvidaciya/",
    pageType: "money"
  },
  {
    slug: "likvidaciya-ooo",
    href: "/likvidaciya-ooo/",
    title: "Ликвидация ООО",
    shortTitle: "Ликвидация ООО",
    kicker: "Money-page · жизненный цикл",
    description:
      "Поможем разобрать исходные документы и подготовить маршрут по вопросу ликвидации ООО.",
    image: "/assets/images/blog-document-route.png",
    imageAlt: "Документы для маршрута по ликвидации ООО",
    bullets: ["исходный комплект", "порядок действий", "документы компании", "аккуратный маршрут"],
    longText: [
      "Ликвидация требует внимательного отношения к исходным данным и документам компании.",
      "На первом шаге фиксируем ситуацию и определяем, что нужно подготовить дальше."
    ],
    parentHref: "/registraciya-i-likvidaciya/",
    pageType: "money"
  },
  {
    slug: "buhgalterskoe-soprovozhdenie-ooo",
    href: "/buhgalterskoe-soprovozhdenie-ooo/",
    title: "Бухгалтерское сопровождение ООО",
    metadataTitle: "Бухгалтерское сопровождение ООО - документы и маршрут",
    metadataDescription:
      "Бухгалтерское сопровождение ООО: разбор документов, отчётного статуса и регулярных задач без публичных обещаний объёма.",
    shortTitle: "Сопровождение ООО",
    kicker: "Money-page · сопровождение",
    description:
      "Разберём текущие документы ООО, отчётные вопросы и регулярный формат работы без публичных обещаний объёма.",
    image: "/assets/images/reporting-workflow.png",
    imageAlt: "Документы ООО для бухгалтерского сопровождения",
    bullets: ["документы ООО", "отчётный статус", "регулярные задачи", "границы сопровождения"],
    longText: [
      "Бухгалтерское сопровождение ООО начинается с понимания текущих документов, отчётного статуса и того, какие задачи повторяются.",
      "Если нужен только разовый отчётный вопрос, маршрут может вести на декларацию, нулевую отчётность или восстановление данных. Первый шаг - аккуратно отделить эти ситуации."
    ],
    parentHref: "/soprovozhdenie/",
    primaryCtaLabel: cta.primary,
    primaryCtaHref: "/razbor-situacii/",
    leadTopic: "accounting_support_ooo",
    routeClass: "money_page_support_ooo",
    routePhase: "E",
    routeGroup: "Сопровождение бизнеса",
    mainIntent: "Бухгалтерское сопровождение ООО",
    commercialIntent: "retention",
    informationalSupportIntent: "scope clarification and reporting status",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/buhgalterskoe-soprovozhdenie-ip/", "/deklaraciya-usn/", "/vosstanovlenie-buhucheta/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["что входит в первый разбор", "если нужна только декларация", "какие документы показать"],
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["scope_promise", "commercial_terms", "sla_promise"],
    sourceAlignmentNotes: ["SC-028", "SVC-027", "passport: accounting-support-ooo"],
    pageType: "money"
  },
  {
    slug: "buhgalterskoe-soprovozhdenie-ip",
    href: "/buhgalterskoe-soprovozhdenie-ip/",
    title: "Бухгалтерское сопровождение ИП",
    metadataTitle: "Бухгалтерское сопровождение ИП - документы и маршрут",
    metadataDescription:
      "Бухгалтерское сопровождение ИП: разбор режима, документов и отчётных вопросов для безопасного формата сопровождения.",
    shortTitle: "Сопровождение ИП",
    kicker: "Money-page · сопровождение",
    description:
      "Разберём документы ИП, режим и отчётные вопросы, чтобы определить безопасный формат сопровождения.",
    image: "/assets/images/tax-accounting-books.png",
    imageAlt: "Документы ИП и налоговый режим для сопровождения",
    bullets: ["документы ИП", "налоговый режим", "отчётные вопросы", "следующий шаг"],
    longText: [
      "Для ИП важно понять режим, период и текущие документы. Регулярное сопровождение не должно смешиваться с разовой декларацией или нулевым вопросом.",
      "На первом шаге разбираем вводные и выбираем маршрут: сопровождение, декларация, нулевая отчётность или общий разбор ситуации."
    ],
    parentHref: "/soprovozhdenie/",
    primaryCtaLabel: cta.primary,
    primaryCtaHref: "/razbor-situacii/",
    leadTopic: "accounting_support_ip",
    routeClass: "money_page_support_ip",
    routePhase: "E",
    routeGroup: "Сопровождение бизнеса",
    mainIntent: "Бухгалтерское сопровождение ИП",
    commercialIntent: "retention",
    informationalSupportIntent: "regime and reporting status clarification",
    indexing: "index",
    includeInSitemap: true,
    relatedHrefs: ["/buhgalterskoe-soprovozhdenie-ooo/", "/deklaraciya-usn/", "/nulevaya-otchetnost-ip/"],
    pageBlockModel: standardMoneyPageBlockModel,
    faqTopics: ["чем отличается от ООО", "если нужна только нулёвка", "какие вводные подготовить"],
    schemaBoundary: serviceSchemaBoundary,
    holdRisks: ["scope_promise", "commercial_terms", "tax_review"],
    sourceAlignmentNotes: ["SC-029", "SVC-028", "passport: accounting-support-ip"],
    pageType: "money"
  }
];

export const diagnostics: RoutePage[] = [
  {
    slug: "ausn-krym",
    href: "/ausn-krym/",
    title: "Подходит ли АУСН в Крыму",
    shortTitle: "АУСН в Крыму",
    kicker: "Diagnostics · налоги",
    description:
      "Диагностический разбор применимости АУСН начинается с исходных данных и документов бизнеса.",
    image: "/assets/images/tax-accounting-books.png",
    imageAlt: "Налоговые книги и документы для диагностики АУСН",
    bullets: ["исходные данные", "проверка применимости", "налоговый режим", "следующий шаг"],
    longText: [
      "Диагностика не обещает результат заранее. Она помогает понять, какие данные нужно проверить.",
      "После разбора становится видно, какой маршрут стоит выбрать."
    ],
    parentHref: "/nalogi-i-rezhimy/",
    pageType: "diagnostic"
  },
  {
    slug: "raschet-nalogovoy-nagruzki",
    href: "/raschet-nalogovoy-nagruzki/",
    title: "Расчет налоговой нагрузки",
    shortTitle: "Налоговая нагрузка",
    kicker: "Diagnostics · расчет",
    description:
      "Соберем исходные данные для понятного разбора налоговой нагрузки без неподтвержденных обещаний.",
    image: "/assets/images/reporting-workflow.png",
    imageAlt: "Рабочие документы для расчета налоговой нагрузки",
    bullets: ["исходные данные", "документы учета", "структура расчета", "ограничения"],
    longText: [
      "Для расчета нужны исходные данные и понимание контекста бизнеса.",
      "Мы помогаем структурировать информацию и определить безопасный следующий шаг."
    ],
    parentHref: "/nalogi-i-rezhimy/",
    pageType: "diagnostic"
  },
  {
    slug: "nds-pri-usn-2026",
    href: "/nds-pri-usn-2026/",
    title: "НДС при УСН в 2026 году",
    shortTitle: "НДС при УСН",
    kicker: "Diagnostics · 2026",
    description:
      "Разбор вопроса НДС при УСН в 2026 году начинается с режима, документов и исходной ситуации.",
    image: "/assets/images/faq-consultation.png",
    imageAlt: "Консультация по документам и налоговому режиму",
    bullets: ["режим УСН", "исходные документы", "вопрос 2026 года", "следующий шаг"],
    longText: [
      "Правила и применимость нужно рассматривать по конкретной ситуации, а не по общей фразе.",
      "На первом шаге собираем исходные данные и определяем, что требует проверки."
    ],
    parentHref: "/nalogi-i-rezhimy/",
    pageType: "diagnostic"
  }
];

function withRouteHardening(pages: RoutePage[]): RoutePage[] {
  return pages.map((page) => ({
    ...page,
    ...routeHardeningBySlug[page.slug]
  }));
}

export const routePages: RoutePage[] = withRouteHardening([...hubs, ...services, ...diagnostics]);

export const faq = [
  {
    question: "С чем можно обратиться?",
    answer:
      "С регистрацией, отчетностью, изменениями, ЕГРЮЛ, юридическим адресом, запросами банка, 115-ФЗ и другими рабочими вопросами бизнеса, где нужен правильный комплект документов."
  },
  {
    question: "Что взять с собой?",
    answer:
      "Принесите то, что уже есть: письма, требования, выписки, старые документы, черновики, переписку с банком или контрагентом."
  },
  {
    question: "Можно ли сначала просто разобраться?",
    answer:
      "Да. Первый шаг - понять ситуацию и определить, какие документы действительно нужны. После этого можно готовить комплект."
  },
  {
    question: "Вы связаны с государственными органами?",
    answer:
      "Нет. Это локальный центр подготовки документов для бизнеса. Формулировка \"офис рядом с налоговой\" используется только как нейтральный ориентир."
  },
  {
    question: "Где находится офис?",
    answer: "Республика Крым, Симферополь, ул. им. Мате Залки, 1. Ориентир: офис рядом с налоговой."
  }
];

export const blogPosts = [
  {
    slug: "chto-vzyat-na-pervyy-razbor",
    title: "Что взять на первый разбор ситуации",
    category: "Документы",
    image: "/assets/images/blog-document-route.png",
    excerpt: "Чек-лист для клиента перед визитом в центр подготовки документов."
  },
  {
    slug: "zapros-banka-bez-paniki",
    title: "Как спокойно подготовиться к запросу банка",
    category: "Банк и 115-ФЗ",
    image: "/assets/images/faq-consultation.png",
    excerpt: "Без паники: собрать документы, понять вопрос и не обещать лишнего."
  },
  {
    slug: "pravilnyy-pervyy-shag",
    title: "Почему важен правильный первый шаг",
    category: "Отчетность",
    image: "/assets/images/testimonial-handover.png",
    excerpt: "Когда один понятный маршрут экономит время и снижает хаос в документах."
  }
];

export const adCards = [
  {
    title: "Яндекс Директ",
    text: "Документы для бизнеса в Симферополе: разбор ситуации, отчетность, регистрация, банк, 115-ФЗ."
  },
  {
    title: "VK",
    text: "Документы для бизнеса | Симферополь. Центр подготовки документов на Мате Залки, 1."
  },
  {
    title: "Карты",
    text: "Центр подготовки документов: регистрация, отчетность, ЕГРЮЛ, юридический адрес, запросы банка."
  },
  {
    title: "Авито",
    text: "Подготовка документов для бизнеса: сначала разбираем ситуацию, затем собираем комплект."
  }
];

export function getRoutePage(slug: string) {
  return routePages.find((page) => page.slug === slug);
}

export function getParentPage(href?: string) {
  return href ? routePages.find((page) => page.href === href) : undefined;
}
