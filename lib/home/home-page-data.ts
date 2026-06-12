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
  { label: "Адрес и ЕГРЮЛ", href: "/adres-egryul-direktor/" },
  { label: "Регистрация", href: "/registraciya-i-likvidaciya/" },
  { label: "Кадры", href: "/kadry/" },
  { label: "Сопровождение", href: "/soprovozhdenie/" },
  { label: "Контакты", href: "/kontakty/" }
];

export const homeHero = {
  kicker: "Симферополь · офис рядом с налоговой",
  title: "Разберём ситуацию и подготовим документы",
  text:
    "Центр подготовки документов в Симферополе. Разберём ситуацию и подготовим документы: регистрация, отчётность, ЕГРЮЛ, юридический адрес, банк и 115-ФЗ.",
  primaryCta: { label: "Разобрать ситуацию", href: "/razbor-situacii/" },
  secondaryCta: { label: "Показать документы", href: "#documents" },
  signals: ["Локальный офис", "Понятный маршрут", "Документы без шума"]
};

export const homeSituationSelector: HomeSituation[] = [
  {
    title: "Пришло требование или запрос",
    href: "/srochnye-voprosy/",
    icon: "question",
    copy: "Начните с маршрута для срочных и неясных вопросов, если нужно отделить главное от сопутствующего."
  },
  {
    title: "Нужна отчётность",
    href: "/otchetnost/",
    icon: "reporting",
    copy: "Выберите направление по УСН, нулевой отчётности, электронной сдаче или восстановлению данных."
  },
  {
    title: "Банк запросил документы",
    href: "/bank-i-115-fz/",
    icon: "bank",
    copy: "Отделите ответ на конкретный запрос от пакета документов по 115-ФЗ."
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
    title: "Кадры или сопровождение",
    href: "/kadry/",
    icon: "hr",
    copy: "Начните с кадрового маршрута, если вопрос связан с сотрудниками или регулярными документами."
  }
];

export const homeStartPath: HomeProcessStep[] = [
  { title: "Опишите ситуацию", copy: "Коротко: что произошло, кто прислал документ или какой вопрос нужно разобрать." },
  { title: "Покажите вводные безопасно", copy: "Для чувствительных материалов сначала согласуем способ показа; публичной загрузки файлов нет." },
  { title: "Выберите маршрут", copy: "Переходим к хабу, точной странице или первичному разбору без смешения интентов." },
  { title: "Согласуйте следующий шаг", copy: "Фиксируем, что подготовить, что уточнить и куда двигаться дальше." }
];

export const homeClientInformation: HomeMaterial[] = [
  { title: "Что произошло", icon: "question", copy: "Опишите источник вопроса: требование, запрос, отчётность, адрес, регистрация или кадры." },
  { title: "Что уже есть", icon: "folder", copy: "Достаточно перечня документов; файлы не загружаются через публичную страницу." },
  { title: "Как связаться", icon: "phone", copy: "Используйте телефон, контакты или страницу разбора ситуации как безопасный первый шаг." }
];

export const homeFaq: HomeFaqItem[] = [
  {
    question: "Если я не понимаю, какая страница подходит?",
    answer: "Начните с разбора ситуации: он нужен именно для смешанных и неясных вопросов."
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
  }
];

export const homeRouteCards: HomeRouteCard[] = [
  {
    title: "Документы для бизнеса",
    href: "/razbor-situacii/",
    icon: "document",
    badgeKind: "document",
    copy: "Покажите ситуацию — определим, какие документы и вводные нужны для следующего шага.",
    nextStep: "Начать с разбора"
  },
  {
    title: "Отчётность и налоговые вопросы",
    href: "/otchetnost/",
    icon: "reporting",
    badgeKind: "route",
    copy: "Разберём вводные по отчётности и налоговым вопросам, чтобы выбрать аккуратный документальный маршрут.",
    nextStep: "Перейти к направлению"
  },
  {
    title: "Банк и 115-ФЗ",
    href: "/bank-i-115-fz/",
    icon: "bank",
    badgeKind: "contact",
    copy: "Поможем спокойно разобрать запрос банка и понять, какие пояснения или документы нужны.",
    nextStep: "Посмотреть маршрут"
  },
  {
    title: "Регистрация и изменения",
    href: "/registraciya-i-likvidaciya/",
    icon: "registration",
    badgeKind: "document",
    copy: "Для регистрации, изменений и связанных задач сначала фиксируем цель и исходные данные.",
    nextStep: "Выбрать вход"
  },
  {
    title: "Адрес, ЕГРЮЛ и директор",
    href: "/adres-egryul-direktor/",
    icon: "location",
    badgeKind: "office",
    copy: "Маршрут для адреса, недостоверности, смены адреса, директора и связанных сведений компании.",
    nextStep: "Разделить задачу"
  },
  {
    title: "Кадровые документы",
    href: "/kadry/",
    icon: "hr",
    badgeKind: "office",
    copy: "Смотрим задачу по кадровым документам и собираем понятный перечень дальнейших действий.",
    nextStep: "Разобрать ситуацию"
  },
  {
    title: "Восстановление и сопровождение",
    href: "/soprovozhdenie/",
    icon: "recovery",
    badgeKind: "route",
    copy: "Когда вопрос смешанный, выстраиваем последовательность: что проверить, собрать и подготовить.",
    nextStep: "Собрать маршрут"
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
    copy: "Собираем понятную структуру: документы, пояснения, список вводных или порядок действий."
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
  text: "Принесите то, что уже есть по вопросу. Мы разложим ситуацию и подскажем, какой документальный шаг нужен дальше.",
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
    { label: "Адрес и ЕГРЮЛ", href: "/adres-egryul-direktor/" },
    { label: "Регистрация", href: "/registraciya-i-likvidaciya/" },
    { label: "Кадры", href: "/kadry/" },
    { label: "Сопровождение", href: "/soprovozhdenie/" },
    { label: "Контакты", href: "/kontakty/" }
  ]
};
