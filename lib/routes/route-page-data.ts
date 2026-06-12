import type { BrandBadgeKind } from "@/components/brand/BrandBadge";
import type { BrandIconName } from "@/components/brand/BrandIcon";
import { site } from "@/lib/content";

export type RoutePageKind = "core" | "contact" | "hub";

export type RouteAction = {
  label: string;
  href: string;
  kind: "primary" | "secondary" | "phone";
};

export type RouteHeroConfig = {
  eyebrow: string;
  title: string;
  text: string;
  icon: BrandIconName;
  badgeKind: BrandBadgeKind;
  primaryAction: RouteAction;
  secondaryActions: RouteAction[];
  signals: string[];
  visualSteps: string[];
};

export type RouteListItem = {
  title: string;
  copy: string;
  icon: BrandIconName;
  badgeKind: BrandBadgeKind;
};

export type RouteListSection = {
  id?: string;
  eyebrow: string;
  title: string;
  text: string;
  items: RouteListItem[];
};

export type RouteScopeSection = {
  eyebrow: string;
  title: string;
  text: string;
  includedTitle: string;
  included: string[];
  boundaryTitle: string;
  boundaries: string[];
};

export type RouteProcessStep = {
  title: string;
  copy: string;
};

export type RouteProcessSection = {
  eyebrow: string;
  title: string;
  text: string;
  steps: RouteProcessStep[];
};

export type RouteRelatedLink = {
  title: string;
  href: string;
  copy: string;
  icon: BrandIconName;
  badgeKind: BrandBadgeKind;
};

export type RouteLocalContactConfig = {
  title: string;
  text: string;
  actions: RouteAction[];
};

export type RoutePageConfig = {
  slug: string;
  href: string;
  kind: RoutePageKind;
  title: string;
  metadataTitle: string;
  metadataDescription: string;
  hero: RouteHeroConfig;
  situation: RouteListSection;
  scope: RouteScopeSection;
  process: RouteProcessSection;
  documents: RouteListSection;
  related: RouteRelatedLink[];
  localContact: RouteLocalContactConfig;
  safetyNote: string;
};

export const routePageSlugs = ["razbor-situacii", "kontakty", "otchetnost", "bank-i-115-fz"] as const;

const contactActions = [
  { label: "Позвонить", href: site.phoneHref, kind: "phone" as const },
  { label: "Построить маршрут", href: "#route-contact", kind: "secondary" as const },
  { label: "Разобрать ситуацию", href: "/razbor-situacii/", kind: "secondary" as const }
];

export const routePageData: Record<(typeof routePageSlugs)[number], RoutePageConfig> = {
  "razbor-situacii": {
    slug: "razbor-situacii",
    href: "/razbor-situacii/",
    kind: "core",
    title: "Разберём ситуацию и подскажем документальный маршрут",
    metadataTitle: "Разбор ситуации по документам бизнеса в Симферополе",
    metadataDescription:
      "Первичный разбор документов бизнеса: что уже есть, какой маршрут подходит и какие данные подготовить для следующего шага.",
    hero: {
      eyebrow: "Первый шаг по документам бизнеса",
      title: "Разберём ситуацию и подскажем документальный маршрут",
      text:
        "Если непонятно, какая услуга нужна, начните с разбора: опишите ситуацию, покажите письмо или запрос, а мы подскажем безопасный следующий шаг.",
      icon: "question",
      badgeKind: "route",
      primaryAction: { label: "Разобрать ситуацию", href: "#route-contact", kind: "primary" },
      secondaryActions: [
        { label: "Позвонить", href: site.phoneHref, kind: "phone" },
        { label: "Показать документы", href: "/kontakty/#show-documents", kind: "secondary" }
      ],
      signals: ["Неясный вопрос", "Смешанная тема", "Без лишней передачи данных"],
      visualSteps: ["что произошло", "какие документы есть", "какой маршрут выбрать", "что показать дальше"]
    },
    situation: {
      eyebrow: "Когда начинать здесь",
      title: "Подходит, когда задача ещё не разложена",
      text: "Разбор нужен для смешанных, чувствительных или просто непонятных вопросов, где важно не выбрать неверную страницу.",
      items: [
        {
          title: "Пришло письмо или запрос",
          copy: "Можно показать формулировку или описать содержание без передачи лишних деталей.",
          icon: "document",
          badgeKind: "document"
        },
        {
          title: "Тем несколько сразу",
          copy: "ИФНС, банк, отчётность, адрес, регистрация или кадровые документы могут пересекаться в одном вопросе.",
          icon: "route",
          badgeKind: "route"
        },
        {
          title: "Документы есть, но роль неясна",
          copy: "Сначала отделяем важные вводные от того, что пока можно не показывать.",
          icon: "folder",
          badgeKind: "office"
        }
      ]
    },
    scope: {
      eyebrow: "Граница первого шага",
      title: "Разбор помогает выбрать маршрут, а не заменить услугу",
      text: "Первый шаг фиксирует вводные и следующий документальный ход. Подготовка документов начинается после уточнения ситуации.",
      includedTitle: "Что можно принести или описать",
      included: [
        "короткое описание ситуации",
        "текст письма, требования или запроса",
        "период, компания или ИП",
        "что уже сделано и где есть сомнение"
      ],
      boundaryTitle: "Чего разбор не обещает",
      boundaries: [
        "финального вывода без исходных данных",
        "решения внешней стороны",
        "сбора конфиденциальных файлов через открытые каналы",
        "подмены отдельной подготовки документов"
      ]
    },
    process: {
      eyebrow: "Как проходит",
      title: "От вопроса к спокойному следующему шагу",
      text: "Мы не ускоряем выводы. Сначала смотрим источник вопроса, затем выбираем точный маршрут.",
      steps: [
        { title: "Описываете ситуацию", copy: "Коротко фиксируем, что произошло и какой документ упомянут." },
        { title: "Смотрим вводные", copy: "Отделяем главный вопрос от сопутствующих тем." },
        { title: "Выбираем направление", copy: "Отчётность, банк, ИФНС, регистрация, адрес, кадры или контакты." },
        { title: "Фиксируем следующий шаг", copy: "Понимаете, что показать, куда перейти и что уточнить безопасно." }
      ]
    },
    documents: {
      id: "show-documents",
      eyebrow: "Что показать",
      title: "Для старта не нужен полный комплект",
      text: "Достаточно того, что помогает понять источник вопроса. Чувствительные материалы лучше показывать после согласования способа.",
      items: [
        { title: "Письмо или запрос", copy: "Формулировка, кто обратился и что просит.", icon: "document", badgeKind: "document" },
        { title: "Краткие вводные", copy: "К кому относится вопрос и что уже сделано.", icon: "question", badgeKind: "route" },
        { title: "Материалы на руках", copy: "Перечень документов без публичной загрузки файлов.", icon: "folder", badgeKind: "office" }
      ]
    },
    related: [
      {
        title: "Ответ на требование ИФНС",
        href: "/otvet-na-trebovanie-ifns/",
        copy: "Если на руках уже есть требование и вопрос именно в ответе.",
        icon: "document",
        badgeKind: "document"
      },
      {
        title: "Ответ на запрос банка",
        href: "/otvet-na-zapros-banka/",
        copy: "Если банк прислал конкретные пункты по операции или документам.",
        icon: "bank",
        badgeKind: "contact"
      },
      {
        title: "Контакты",
        href: "/kontakty/",
        copy: "Если нужен телефон, адрес или безопасный офисный маршрут.",
        icon: "location",
        badgeKind: "office"
      }
    ],
    localContact: {
      title: "Можно начать с звонка или визита",
      text: "Принесите то, что уже есть по вопросу. Мы подскажем, как безопасно продолжить.",
      actions: contactActions
    },
    safetyNote: "Разбор помогает выбрать документальный маршрут. Итог зависит от вводных и документов."
  },
  kontakty: {
    slug: "kontakty",
    href: "/kontakty/",
    kind: "contact",
    title: "Контакты и передача документов",
    metadataTitle: "Контакты — Документы для бизнеса в Симферополе",
    metadataDescription: "Телефон, адрес и офисный маршрут центра подготовки документов в Симферополе.",
    hero: {
      eyebrow: "Контакты в Симферополе",
      title: "Контакты и передача документов",
      text: "Позвоните, постройте маршрут в офис или согласуйте безопасный способ показать документы. На странице указаны только подтверждённые данные.",
      icon: "location",
      badgeKind: "office",
      primaryAction: { label: "Позвонить", href: site.phoneHref, kind: "phone" },
      secondaryActions: [
        { label: "Построить маршрут", href: "#route-contact", kind: "secondary" },
        { label: "Показать документы", href: "#show-documents", kind: "secondary" }
      ],
      signals: ["Телефон", "Адрес", "Офисный маршрут"],
      visualSteps: ["позвонить", "согласовать показ", "приехать в офис", "разобрать вопрос"]
    },
    situation: {
      eyebrow: "Когда нужна эта страница",
      title: "Контакты владеют NAP, звонком и офисным действием",
      text: "Страница не превращается в каталог услуг. Она помогает связаться и выбрать безопасный способ продолжить.",
      items: [
        {
          title: "Нужно позвонить",
          copy: "Используйте подтверждённый номер проекта без обещаний доступности по времени.",
          icon: "phone",
          badgeKind: "contact"
        },
        {
          title: "Нужно приехать",
          copy: "Адрес виден на странице без зависимости от внешней карты.",
          icon: "location",
          badgeKind: "office"
        },
        {
          title: "Нужно показать документы",
          copy: "Сначала согласуем безопасный способ, без публичной загрузки файлов.",
          icon: "folder",
          badgeKind: "document"
        }
      ]
    },
    scope: {
      eyebrow: "Подтверждённые данные",
      title: "На странице только NAP и безопасные действия",
      text: "Дополнительные локальные и юридические сведения остаются вне публичного интерфейса до отдельного подтверждения.",
      includedTitle: "Что можно использовать",
      included: [site.name, site.category, site.phone, site.address, site.landmark],
      boundaryTitle: "Что не добавляем",
      boundaries: [
        "неподтверждённые данные о приёме",
        "неподтверждённые локальные детали",
        "юридические данные",
        "дополнительные контактные каналы"
      ]
    },
    process: {
      eyebrow: "Первый контакт",
      title: "Спокойная связь без лишних обещаний",
      text: "Контактная страница помогает перейти к звонку, визиту или безопасному показу материалов.",
      steps: [
        { title: "Выбираете действие", copy: "Позвонить, построить маршрут, показать документы или перейти к разбору." },
        { title: "Кратко описываете вопрос", copy: "Достаточно темы и источника документа, если он есть." },
        { title: "Согласуете способ показа", copy: "Чувствительные материалы не передаются через открытый публичный поток." },
        { title: "Переходите к маршруту", copy: "Если тема уже понятна, можно открыть нужное направление." }
      ]
    },
    documents: {
      id: "show-documents",
      eyebrow: "Показать документы",
      title: "Сначала согласуем безопасный способ",
      text: "Публичная страница не принимает файлы и не просит отправлять конфиденциальные материалы без согласования.",
      items: [
        { title: "Короткое описание", copy: "Что произошло и кто запросил документы.", icon: "question", badgeKind: "route" },
        { title: "Название документа", copy: "Можно назвать вид письма, запроса или уведомления.", icon: "document", badgeKind: "document" },
        { title: "Офисный показ", copy: "Для чувствительных материалов подходит согласованный канал или визит.", icon: "shield", badgeKind: "office" }
      ]
    },
    related: [
      {
        title: "Разбор ситуации",
        href: "/razbor-situacii/",
        copy: "Если ещё непонятно, какой маршрут выбрать.",
        icon: "question",
        badgeKind: "route"
      },
      {
        title: "Отчётность",
        href: "/otchetnost/",
        copy: "Если вопрос связан с отчётностью и налоговыми документами.",
        icon: "reporting",
        badgeKind: "document"
      },
      {
        title: "Банк и 115-ФЗ",
        href: "/bank-i-115-fz/",
        copy: "Если есть банковский запрос или вопрос по 115-ФЗ.",
        icon: "bank",
        badgeKind: "contact"
      }
    ],
    localContact: {
      title: "Офис рядом с налоговой",
      text: "Используем только подтверждённый адрес и телефон. Дополнительные сведения появляются только после отдельного подтверждения.",
      actions: [
        { label: "Позвонить", href: site.phoneHref, kind: "phone" },
        { label: "Разобрать ситуацию", href: "/razbor-situacii/", kind: "secondary" },
        { label: "Показать документы", href: "#show-documents", kind: "secondary" }
      ]
    },
    safetyNote: "Контактная страница использует только подтверждённые NAP-данные: телефон, адрес и локальный ориентир."
  },
  otchetnost: {
    slug: "otchetnost",
    href: "/otchetnost/",
    kind: "hub",
    title: "Отчётность и налоговые документы",
    metadataTitle: "Отчётность и налоговые документы в Симферополе",
    metadataDescription:
      "Маршрут по отчётности для бизнеса: УСН, нулевая отчётность, восстановление данных и ответ на требование ИФНС.",
    hero: {
      eyebrow: "Отчётность и вводные",
      title: "Отчётность и налоговые документы",
      text:
        "Раздел помогает понять, что именно нужно подготовить: декларацию УСН, нулевую отчётность ООО или ИП, восстановление данных или ответ на требование ИФНС.",
      icon: "reporting",
      badgeKind: "document",
      primaryAction: { label: "Разобрать ситуацию", href: "/razbor-situacii/", kind: "primary" },
      secondaryActions: [
        { label: "Показать документы", href: "/kontakty/#show-documents", kind: "secondary" },
        { label: "Позвонить", href: site.phoneHref, kind: "phone" }
      ],
      signals: ["Период", "Форма бизнеса", "Исходные данные"],
      visualSteps: ["форма бизнеса", "период", "данные", "точная страница"]
    },
    situation: {
      eyebrow: "Роль хаба",
      title: "Сначала выбираем отчётный маршрут",
      text: "Хаб не забирает точные интенты дочерних страниц. Он помогает понять, куда идти дальше.",
      items: [
        {
          title: "УСН или нулевая отчётность",
          copy: "Разводим декларацию, ООО и ИП без смешения задач.",
          icon: "reporting",
          badgeKind: "document"
        },
        {
          title: "Не хватает данных",
          copy: "Если документы или учётные сведения неполные, маршрут меняется.",
          icon: "folder",
          badgeKind: "office"
        },
        {
          title: "Есть требование ИФНС",
          copy: "Если пришёл точный документ, лучше перейти на страницу ответа на требование.",
          icon: "document",
          badgeKind: "route"
        }
      ]
    },
    scope: {
      eyebrow: "Вводные для старта",
      title: "Отчётность зависит от формы бизнеса и периода",
      text: "Публичный хаб не делает налоговый вывод. Он помогает собрать вводные и выбрать точную страницу.",
      includedTitle: "Что подготовить",
      included: ["ООО или ИП", "период", "налоговый режим, если известен", "были ли операции, сотрудники или расходы"],
      boundaryTitle: "Что остаётся на проверке",
      boundaries: [
        "налоговый вывод",
        "достаточность исходных данных",
        "состав документов для точной страницы",
        "чувствительные материалы и доступы"
      ]
    },
    process: {
      eyebrow: "Как выбрать",
      title: "Форма бизнеса → период → данные → маршрут",
      text: "Так хаб сохраняет антиканнибализацию и не становится каталогом услуг.",
      steps: [
        { title: "Уточняем форму бизнеса", copy: "ООО и ИП ведут к разным страницам и разным вводным." },
        { title: "Фиксируем период", copy: "Понимаем, за какой период нужен документальный шаг." },
        { title: "Смотрим исходные данные", copy: "Есть ли операции, сотрудники, поступления, расходы или пробелы." },
        { title: "Переходим к точной странице", copy: "Выбираем УСН, нулевую отчётность, восстановление или ответ ИФНС." }
      ]
    },
    documents: {
      id: "show-documents",
      eyebrow: "Что показать",
      title: "Минимум вводных для отчётного маршрута",
      text: "Начните с общей картины. Документы с чувствительными данными показываются только согласованным способом.",
      items: [
        { title: "Форма бизнеса", copy: "ООО, ИП и применяемый режим, если он известен.", icon: "registration", badgeKind: "route" },
        { title: "Период и операции", copy: "За какой период вопрос и была ли деятельность.", icon: "reporting", badgeKind: "document" },
        { title: "Данные на руках", copy: "Что уже есть и где есть пробелы.", icon: "folder", badgeKind: "office" }
      ]
    },
    related: [
      {
        title: "Декларация УСН",
        href: "/deklaraciya-usn/",
        copy: "Если вопрос именно в декларации по исходным данным.",
        icon: "reporting",
        badgeKind: "document"
      },
      {
        title: "Нулевая отчётность ООО",
        href: "/nulevaya-otchetnost-ooo/",
        copy: "Если вопрос про ООО без понятной деятельности.",
        icon: "document",
        badgeKind: "route"
      },
      {
        title: "Нулевая отчётность ИП",
        href: "/nulevaya-otchetnost-ip/",
        copy: "Если вопрос про ИП и режим требует уточнения.",
        icon: "registration",
        badgeKind: "office"
      },
      {
        title: "Восстановление бухучёта",
        href: "/vosstanovlenie-buhucheta/",
        copy: "Если не хватает документов или данных за прошлые периоды.",
        icon: "recovery",
        badgeKind: "contact"
      },
      {
        title: "Электронная отчётность",
        href: "/otchetnost-elektronno/",
        copy: "Если вопрос в электронном маршруте сдачи и безопасном показе материалов.",
        icon: "question",
        badgeKind: "route"
      },
      {
        title: "Ответ на требование ИФНС",
        href: "/otvet-na-trebovanie-ifns/",
        copy: "Если уже пришёл конкретный документ от ИФНС.",
        icon: "shield",
        badgeKind: "document"
      }
    ],
    localContact: {
      title: "Отчётный вопрос можно начать с разбора",
      text: "Опишите форму бизнеса, период и данные на руках. Мы подскажем, какая страница подходит.",
      actions: contactActions
    },
    safetyNote: "Отчётный маршрут зависит от формы бизнеса, периода и исходных данных."
  },
  "bank-i-115-fz": {
    slug: "bank-i-115-fz",
    href: "/bank-i-115-fz/",
    kind: "hub",
    title: "Документы для банка и запросов по 115-ФЗ",
    metadataTitle: "Документы для банка и запросов по 115-ФЗ в Симферополе",
    metadataDescription:
      "Банковские запросы и 115-ФЗ: понять, нужен ли ответ на конкретный запрос или комплект документов по ситуации.",
    hero: {
      eyebrow: "Банк, запросы и 115-ФЗ",
      title: "Документы для банка и запросов по 115-ФЗ",
      text:
        "Раздел помогает понять, нужен ли ответ на конкретный запрос банка или более широкий комплект документов и пояснений по 115-ФЗ.",
      icon: "bank",
      badgeKind: "contact",
      primaryAction: { label: "Разобрать ситуацию", href: "/razbor-situacii/", kind: "primary" },
      secondaryActions: [
        { label: "Показать документы", href: "/kontakty/#show-documents", kind: "secondary" },
        { label: "Позвонить", href: site.phoneHref, kind: "phone" }
      ],
      signals: ["Запрос банка", "Операции", "Документы по ситуации"],
      visualSteps: ["что просит банк", "один запрос или шире", "какие материалы есть", "какой маршрут выбрать"]
    },
    situation: {
      eyebrow: "Роль хаба",
      title: "Банковский вопрос сначала нужно отделить по объёму",
      text: "Один запрос и широкий 115-ФЗ контур требуют разных страниц. Хаб помогает не смешивать эти ситуации.",
      items: [
        {
          title: "Есть конкретный запрос",
          copy: "Если банк задал пункты по операции или документам, ведём к ответу на запрос.",
          icon: "document",
          badgeKind: "document"
        },
        {
          title: "Вопрос шире одного письма",
          copy: "Если нужно собрать картину деятельности, подходит маршрут по 115-ФЗ.",
          icon: "bank",
          badgeKind: "contact"
        },
        {
          title: "Связанные темы",
          copy: "Если вопрос затрагивает отчётность или ИФНС, лучше начать с общего разбора.",
          icon: "route",
          badgeKind: "route"
        }
      ]
    },
    scope: {
      eyebrow: "Без обещаний внешнего решения",
      title: "Банк оценивает документы самостоятельно",
      text: "Мы помогаем разобрать запрос, собрать вводные и подготовить пояснения по ситуации. Решение внешней стороны не обещается.",
      includedTitle: "Что подготовить",
      included: ["текст запроса банка", "операции или контрагенты, которые упомянуты", "какие документы уже есть", "один вопрос или несколько связанных тем"],
      boundaryTitle: "Что нельзя обещать",
      boundaries: [
        "принятие материалов банком",
        "изменение решения банка",
        "универсальный обязательный список для всех банков",
        "передачу чувствительных материалов через открытые каналы"
      ]
    },
    process: {
      eyebrow: "Как выбрать",
      title: "Запрос → объём вопроса → материалы → точный маршрут",
      text: "Банковский маршрут требует особенно спокойной формулировки и проверки вводных.",
      steps: [
        { title: "Смотрим формулировку", copy: "Что именно просит банк и какие пункты указаны." },
        { title: "Определяем объём", copy: "Это точечный ответ или более широкий вопрос по деятельности." },
        { title: "Собираем вводные", copy: "Операции, контрагенты, документы и пояснения по ситуации." },
        { title: "Переходим к маршруту", copy: "Ответ на запрос, документы по 115-ФЗ или общий разбор." }
      ]
    },
    documents: {
      id: "show-documents",
      eyebrow: "Что показать",
      title: "Начните с формулировки банка",
      text: "Не нужно собирать всё сразу. Сначала важно понять, что относится к вопросу банка.",
      items: [
        { title: "Текст запроса", copy: "Пункты, которые банк просит пояснить или подтвердить.", icon: "document", badgeKind: "document" },
        { title: "Операции и контрагенты", copy: "Что упомянуто в запросе и какие материалы уже есть.", icon: "bank", badgeKind: "contact" },
        { title: "Связанные документы", copy: "Договоры, акты или платежи показываются безопасным способом.", icon: "folder", badgeKind: "office" }
      ]
    },
    related: [
      {
        title: "Ответ на запрос банка",
        href: "/otvet-na-zapros-banka/",
        copy: "Если банк прислал конкретные пункты по операции или документам.",
        icon: "bank",
        badgeKind: "contact"
      },
      {
        title: "Документы для банка 115-ФЗ",
        href: "/dokumenty-dlya-banka-115-fz/",
        copy: "Если вопрос шире одного запроса и касается деятельности.",
        icon: "shield",
        badgeKind: "document"
      },
      {
        title: "Разбор ситуации",
        href: "/razbor-situacii/",
        copy: "Если банковский вопрос смешан с отчётностью, ИФНС или другой темой.",
        icon: "question",
        badgeKind: "route"
      }
    ],
    localContact: {
      title: "Банковский вопрос лучше разложить спокойно",
      text: "Покажите запрос или опишите его пункты. Мы подскажем, какой маршрут подходит.",
      actions: contactActions
    },
    safetyNote: "Банк принимает решения самостоятельно. Мы помогаем подготовить документы и пояснения по вводным."
  }
};

export function getRoutePageData(slug: string) {
  return routePageData[slug as (typeof routePageSlugs)[number]];
}
