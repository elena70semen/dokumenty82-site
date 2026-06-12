import type { BrandBadgeKind } from "@/components/brand/BrandBadge";
import type { BrandIconName } from "@/components/brand/BrandIcon";
import { site } from "@/lib/content";

export type HomeNavigationItem = {
  label: string;
  href: string;
};

export type HomeRouteCard = {
  title: string;
  href: string;
  icon: BrandIconName;
  badgeKind: BrandBadgeKind;
  copy: string;
  nextStep: string;
};

export type HomeProcessStep = {
  title: string;
  copy: string;
};

export type HomeMaterial = {
  title: string;
  icon: BrandIconName;
  copy: string;
};

export type HomeSituation = {
  title: string;
  href: string;
  icon: BrandIconName;
  copy: string;
};

export type HomeFaqItem = {
  question: string;
  answer: string;
};

export const homeNavigation: HomeNavigationItem[] = [
  { label: "Разбор ситуации", href: "/razbor-situacii/" },
  { label: "Отчётность", href: "/otchetnost/" },
  { label: "Банк и 115-ФЗ", href: "/bank-i-115-fz/" },
  { label: "Адрес / ЕГРЮЛ / директор", href: "/adres-egryul-direktor/" },
  { label: "Регистрация и ликвидация", href: "/registraciya-i-likvidaciya/" },
  { label: "Налоги и режимы", href: "/nalogi-i-rezhimy/" },
  { label: "Кадры", href: "/kadry/" },
  { label: "Сопровождение", href: "/soprovozhdenie/" },
  { label: "Контакты", href: "/kontakty/" }
];

export const homeHero = {
  kicker: "Документы для бизнеса · Симферополь",
  title: "Разберём ситуацию и подготовим документы",
  text:
    "Центр подготовки документов в Симферополе. Если вопрос ещё не разложен, начните с разбора: посмотрим, что уже есть, что подготовить и какой маршрут подходит.",
  primaryCta: { label: "Разобрать ситуацию", href: "/razbor-situacii/" },
  secondaryCta: { label: "Показать документы", href: "/kontakty/#show-documents" },
  phoneCta: { label: "Позвонить", href: site.phoneHref },
  signals: ["Офис рядом с налоговой", "Сначала разбор", "Без публичной загрузки"]
};

export const homeSituationSelector: HomeSituation[] = [
  {
    title: "ИФНС, требование или срочный запрос",
    href: "/srochnye-voprosy/",
    icon: "question",
    copy: "Если письмо или требование уже на руках, отделяем источник, тему и ближайший безопасный маршрут."
  },
  {
    title: "Нужна отчётность",
    href: "/otchetnost/",
    icon: "reporting",
    copy: "Выберите направление по УСН, нулевой отчётности, электронной сдаче или восстановлению данных."
  },
  {
    title: "Банк прислал запрос документов",
    href: "/otvet-na-zapros-banka/",
    icon: "bank",
    copy: "Если есть конкретные пункты банка, сначала отделяем ответ на запрос от широкого пакета документов."
  },
  {
    title: "Нужен пакет по 115-ФЗ",
    href: "/dokumenty-dlya-banka-115-fz/",
    icon: "bank",
    copy: "Если вопрос шире одного письма, смотрим деловую ситуацию, операции и подтверждающие материалы."
  },
  {
    title: "Адрес, ЕГРЮЛ или директор",
    href: "/adres-egryul-direktor/",
    icon: "location",
    copy: "Перейдите к маршруту по адресу, недостоверности, смене адреса или директору."
  },
  {
    title: "Регистрация или ликвидация",
    href: "/registraciya-i-likvidaciya/",
    icon: "registration",
    copy: "Разделите регистрацию ООО, регистрацию ИП и ликвидацию ООО без смешения задач."
  },
  {
    title: "Налоги или режим надо проверить",
    href: "/nalogi-i-rezhimy/",
    icon: "question",
    copy: "Отделите переход на АУСН, диагностику режима, налоговую нагрузку и вопросы НДС при УСН."
  },
  {
    title: "Кадры или сопровождение",
    href: "/kadry/",
    icon: "hr",
    copy: "Если вопрос связан с сотрудниками, регулярными документами или сопровождением, начните с кадрового входа."
  },
  {
    title: "Не знаю, с чего начать",
    href: "/razbor-situacii/",
    icon: "route",
    copy: "Начните с разбора ситуации: посмотрим вводные и подскажем, какой маршрут не смешает разные задачи."
  }
];

export const homeStartPath: HomeProcessStep[] = [
  { title: "Опишите ситуацию", copy: "Коротко: что произошло, кто прислал документ или какой вопрос нужно разобрать." },
  { title: "Назовите документ или период", copy: "Для ИФНС, банка, отчётности, адреса или регистрации важны разные вводные." },
  { title: "Покажите материалы безопасно", copy: "Файлы не загружаются на публичной странице; способ показа согласуем отдельно." },
  { title: "Получите следующий маршрут", copy: "Понимаете, что подготовить, что уточнить и на какую страницу перейти дальше." }
];

export const homeClientInformation: HomeMaterial[] = [
  { title: "Источник вопроса", icon: "question", copy: "Требование, банковский запрос, отчётный период, адресный вопрос, регистрация или кадровая тема." },
  { title: "Что уже есть", icon: "folder", copy: "Назовите тип документа, период или источник запроса; файлы не загружаются через публичную страницу." },
  { title: "Где есть сомнение", icon: "route", copy: "Если тема пересекается с банком, ИФНС, отчётностью или режимом, начните с разбора ситуации." },
  { title: "Как продолжить", icon: "phone", copy: "Позвоните, откройте контакты или перейдите на страницу разбора ситуации как безопасный первый шаг." }
];

export const homeFaq: HomeFaqItem[] = [
  {
    question: "Если я не понимаю, какая страница подходит?",
    answer: "Начните с разбора ситуации: коротко опишите вопрос, а дальше станет понятно, нужен хаб, точная страница или контактный маршрут."
  },
  {
    question: "Можно ли показать документы через сайт?",
    answer: "Публичная страница не принимает файлы. Сначала согласуем безопасный способ показа документов."
  },
  {
    question: "Офис рядом с налоговой означает связь с ведомством?",
    answer: "Нет. Это только нейтральный ориентир расположения офиса, без статуса представителя или партнёра."
  },
  {
    question: "Почему нет цен и финальных условий?",
    answer: "Публичные коммерческие условия и обещания результата остаются HOLD до отдельного подтверждения и разбора вводных."
  },
  {
    question: "Если вопрос связан сразу с налогами, отчетностью и банком?",
    answer: "Не выбирайте страницу по одному слову. Начните с разбора ситуации, чтобы отделить главный маршрут от сопутствующих тем."
  }
];

export const homeRouteCards: HomeRouteCard[] = [
  {
    title: "Документы для бизнеса",
    href: "/razbor-situacii/",
    icon: "document",
    badgeKind: "document",
    copy: "Начните здесь, если задача смешанная или непонятно, какая страница подходит.",
    nextStep: "Начать с разбора"
  },
  {
    title: "Отчётность и налоговые вопросы",
    href: "/otchetnost/",
    icon: "reporting",
    badgeKind: "route",
    copy: "Выберите между УСН, нулевой отчётностью, восстановлением учёта, электронной сдачей и требованием ИФНС.",
    nextStep: "Выбрать отчётный вход"
  },
  {
    title: "Банк и 115-ФЗ",
    href: "/bank-i-115-fz/",
    icon: "bank",
    badgeKind: "contact",
    copy: "Отделите ответ на конкретный запрос от пакета документов по деловой ситуации.",
    nextStep: "Разделить банковский вопрос"
  },
  {
    title: "Регистрация и ликвидация",
    href: "/registraciya-i-likvidaciya/",
    icon: "registration",
    badgeKind: "document",
    copy: "Разделите регистрацию ООО, регистрацию ИП, ликвидацию и смежные адресные вопросы перед подготовкой документов.",
    nextStep: "Выбрать жизненный цикл"
  },
  {
    title: "Налоги и режимы",
    href: "/nalogi-i-rezhimy/",
    icon: "question",
    badgeKind: "route",
    copy: "Проверьте, это переход на режим, диагностика применимости или отдельный отчётный вопрос.",
    nextStep: "Отделить режим от отчёта"
  },
  {
    title: "Адрес, ЕГРЮЛ и директор",
    href: "/adres-egryul-direktor/",
    icon: "location",
    badgeKind: "office",
    copy: "Отделите юридический адрес, недостоверность, смену адреса и директора.",
    nextStep: "Разделить адресный вопрос"
  },
  {
    title: "Кадровые документы",
    href: "/kadry/",
    icon: "hr",
    badgeKind: "office",
    copy: "Отделите срочное оформление сотрудников от кадрового сопровождения и безопасного показа персональных данных.",
    nextStep: "Отделить кадровый вопрос"
  },
  {
    title: "Восстановление и сопровождение",
    href: "/soprovozhdenie/",
    icon: "recovery",
    badgeKind: "route",
    copy: "Поймите, это разовый пробел в учёте, регулярная работа или связанный отчётный маршрут.",
    nextStep: "Отделить формат работы"
  }
];

export const homeProcessSteps: HomeProcessStep[] = [
  {
    title: "Описываете ситуацию",
    copy: "Коротко фиксируем, что произошло, какой документ или вопрос нужно разобрать."
  },
  {
    title: "Смотрим документы и вводные",
    copy: "Отделяем подтверждённые факты от того, что ещё нужно уточнить или подготовить."
  },
  {
    title: "Готовим комплект или маршрут действий",
    copy: "Собираем понятную структуру: документы, пояснения, недостающие вводные или порядок действий."
  },
  {
    title: "Согласуем следующий шаг",
    copy: "Показываем, что готово, что остаётся уточнить и куда двигаться дальше."
  }
];

export const homeMaterials: HomeMaterial[] = [
  { title: "Заявления", icon: "document", copy: "Аккуратные формы под задачу и подтверждённые вводные." },
  { title: "Пояснения", icon: "question", copy: "Спокойная структура ответа без лишних обещаний." },
  { title: "Отчётность", icon: "reporting", copy: "Документальный блок для налоговых и учётных вопросов." },
  { title: "Ответы на запросы", icon: "bank", copy: "Материалы для ситуации с банком или входящим запросом." },
  { title: "Маршрут действий", icon: "route", copy: "Последовательность шагов, когда вопрос ещё нужно разложить." },
  { title: "Перечень недостающих вводных", icon: "folder", copy: "Список того, что нужно принести или уточнить перед подготовкой." }
];

export const homeContact = {
  title: "Можно начать с короткого разбора в офисе",
  text: "Принесите то, что уже есть по вопросу, или сначала позвоните. Документы можно показать при обращении — без загрузки файлов на сайте.",
  address: site.address,
  phone: site.phone,
  phoneHref: site.phoneHref,
  landmark: site.landmark,
  actions: [
    { label: "Позвонить", href: site.phoneHref },
    { label: "Построить маршрут", href: "/kontakty/" },
    { label: "Разобрать ситуацию", href: "/razbor-situacii/" }
  ]
};

export const homeFooter = {
  brand: site.name,
  category: site.category,
  address: site.address,
  phone: site.phone,
  phoneHref: site.phoneHref,
  landmark: site.landmark,
  routes: [
    { label: "Разбор ситуации", href: "/razbor-situacii/" },
    { label: "Отчётность", href: "/otchetnost/" },
    { label: "Банк и 115-ФЗ", href: "/bank-i-115-fz/" },
    { label: "Адрес / ЕГРЮЛ / директор", href: "/adres-egryul-direktor/" },
    { label: "Регистрация и ликвидация", href: "/registraciya-i-likvidaciya/" },
    { label: "Налоги и режимы", href: "/nalogi-i-rezhimy/" },
    { label: "Кадры", href: "/kadry/" },
    { label: "Сопровождение", href: "/soprovozhdenie/" },
    { label: "Контакты", href: "/kontakty/" }
  ]
};
