import type { BrandBadgeKind } from "@/components/brand/BrandBadge";
import type { BrandIconName } from "@/components/brand/BrandIcon";
import { site } from "@/lib/content";
import type { CollectorType } from "@/lib/tracking/event-context";

export type HomeNavigationItem = {
  label: string;
  href: string;
};

export type HomeRouteCard = {
  title: string;
  href: string;
  icon: BrandIconName;
  badgeKind: BrandBadgeKind;
  trigger: string;
  copy: string;
  nextStep: string;
};

export type HomeHeroDecision = {
  title: string;
  href: string;
  icon: BrandIconName;
  lead: string;
  leadTopic: string;
  collectorType: CollectorType;
  accent: "lime" | "blue" | "emerald" | "wine";
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

export const homeNavigation: HomeNavigationItem[] = [
  { label: "Разбор ситуации", href: "/razbor-situacii/" },
  { label: "Документы", href: "/#documents" },
  { label: "Отчётность", href: "/otchetnost/" },
  { label: "Банк и 115-ФЗ", href: "/bank-i-115-fz/" },
  { label: "Блог", href: "/blog/" },
  { label: "Новости", href: "/blog/obnovleniya-fns/" },
  { label: "О нас", href: "/o-proekte/" },
  { label: "Контакты", href: "/kontakty/" }
];

export const homeHero = {
  kicker: "Симферополь · офис рядом с налоговой",
  title: "Документы для бизнеса в Симферополе",
  text:
    "Если пришло требование, банк запросил документы, нужна отчётность или неясно, с чего начать, разложим ситуацию, вводные и ближайший документальный шаг.",
  primaryCta: { label: "Разобрать ситуацию", href: "/razbor-situacii/" },
  secondaryCta: { label: "Показать документы", href: "#documents" },
  microcopy: "Начинаем с того, что уже есть: письмо, запрос, период, цель или вопрос.",
  signals: ["Офис в Симферополе", "Вводные перед документами", "Следующий шаг без суеты"],
  routeSteps: ["ситуация", "вводные", "комплект", "следующий шаг"],
  decisions: [
    {
      title: "Пришло требование или письмо",
      href: "/otvet-na-trebovanie-ifns/",
      icon: "document",
      lead: "Сначала смотрим документ, период и что именно нужно ответить.",
      leadTopic: "tax_request",
      collectorType: "related_route",
      accent: "wine"
    },
    {
      title: "Банк запросил документы",
      href: "/otvet-na-zapros-banka/",
      icon: "bank",
      lead: "Разбираем запрос и собираем понятный комплект подтверждений.",
      leadTopic: "bank_request",
      collectorType: "related_route",
      accent: "blue"
    },
    {
      title: "Нужна отчётность",
      href: "/otchetnost/",
      icon: "reporting",
      lead: "Фиксируем период, режим и исходные документы перед маршрутом.",
      leadTopic: "reporting",
      collectorType: "related_route",
      accent: "emerald"
    },
    {
      title: "Неясно, с чего начать",
      href: "/razbor-situacii/",
      icon: "question",
      lead: "Выберем направление без угадывания названия услуги.",
      leadTopic: "first_step",
      collectorType: "situation_review",
      accent: "lime"
    }
  ] satisfies HomeHeroDecision[]
};

export const homeRouteCards: HomeRouteCard[] = [
  {
    title: "Документы для бизнеса",
    href: "/razbor-situacii/",
    icon: "document",
    badgeKind: "document",
    trigger: "Неясная или смешанная задача",
    copy: "Покажите ситуацию — определим, какие документы и вводные нужны для следующего шага.",
    nextStep: "Начать с разбора"
  },
  {
    title: "Отчётность и налоговые вопросы",
    href: "/otchetnost/",
    icon: "reporting",
    badgeKind: "route",
    trigger: "Отчётность, период, режим",
    copy: "Разберём вводные по отчётности и налоговым вопросам, чтобы выбрать аккуратный документальный маршрут.",
    nextStep: "Перейти к направлению"
  },
  {
    title: "Банк и 115-ФЗ",
    href: "/bank-i-115-fz/",
    icon: "bank",
    badgeKind: "contact",
    trigger: "Запрос банка или подтверждения",
    copy: "Поможем спокойно разобрать запрос банка и понять, какие пояснения или документы нужны.",
    nextStep: "Посмотреть маршрут"
  },
  {
    title: "Регистрация и изменения",
    href: "/registraciya-i-likvidaciya/",
    icon: "registration",
    badgeKind: "document",
    trigger: "Открытие, изменения, ЕГРЮЛ",
    copy: "Для регистрации, изменений и связанных задач сначала фиксируем цель и исходные данные.",
    nextStep: "Выбрать вход"
  },
  {
    title: "Кадровые документы",
    href: "/kadry/",
    icon: "hr",
    badgeKind: "office",
    trigger: "Кадры и оформление",
    copy: "Смотрим задачу по кадровым документам и собираем понятный перечень дальнейших действий.",
    nextStep: "Разобрать ситуацию"
  },
  {
    title: "Восстановление и сопровождение",
    href: "/soprovozhdenie/",
    icon: "recovery",
    badgeKind: "route",
    trigger: "Пробелы, порядок, поддержка",
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
    copy: "Отделяем известные факты от того, что ещё нужно уточнить или подготовить."
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
  { title: "Заявления", icon: "document", copy: "Аккуратные формы под задачу и проверенные вводные." },
  { title: "Пояснения", icon: "question", copy: "Спокойная структура ответа без лишних обещаний." },
  { title: "Отчётность", icon: "reporting", copy: "Документальный блок для налоговых и учётных вопросов." },
  { title: "Ответы на запросы", icon: "bank", copy: "Документы и пояснения для ситуации с банком или входящим запросом." },
  { title: "Порядок действий", icon: "route", copy: "Последовательность шагов, когда вопрос ещё нужно разложить." },
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
    { label: "Документы", href: "/#documents" },
    { label: "Отчётность", href: "/otchetnost/" },
    { label: "Банк и 115-ФЗ", href: "/bank-i-115-fz/" },
    { label: "Контакты", href: "/kontakty/" }
  ]
};
