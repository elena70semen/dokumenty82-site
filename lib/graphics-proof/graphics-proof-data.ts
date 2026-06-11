import { brandTokens, type ServiceContourKey } from "@/lib/brand/brand-tokens";

export const proofRoute = {
  path: "/internal/graphics-proof",
  label: "INTERNAL GRAPHICS PROOF / NOT PUBLIC",
  status: "Stage 09 / internal proof",
  publicStatus: "Public release remains HOLD"
};

export const surfaceModes = [
  {
    key: "matrix-paper",
    title: "Matrix paper",
    role: "Спокойная экспертная поверхность для текста, карточек и PDF.",
    note: "Светлая структура, мягкая сетка, один деловой акцент.",
    className: "bg-[var(--surface-light)] text-[color:var(--text-primary)]"
  },
  {
    key: "dark-business",
    title: "Dark business",
    role: "Сильный первый экран, обложки и акцентные блоки.",
    note: "Темная глубина с одним lime-сигналом, без мрачности.",
    className: "bg-[var(--surface-dark)] text-[color:var(--text-inverse)]"
  },
  {
    key: "route-ribbon",
    title: "Route ribbon",
    role: "Движение от ситуации к документам и следующему шагу.",
    note: "Маршрутная линия работает как signature-элемент.",
    className: "bg-[var(--surface-raised)] text-[color:var(--text-primary)]"
  },
  {
    key: "local-contact",
    title: "Local contact",
    role: "Офисный контакт, маршрут и безопасный показ документов.",
    note: "Только подтвержденный NAP и локальный ориентир.",
    className: "bg-[var(--paper-soft)] text-[color:var(--text-primary)]"
  }
];

export type ProofServiceCard = {
  contourKey: ServiceContourKey;
  routeLabel: string;
  inputNeeded: string;
  safeNextStep: string;
  proofCta: "Разобрать ситуацию" | "Показать документы" | "Позвонить" | "Построить маршрут";
};

export const proofServiceCards: ProofServiceCard[] = [
  {
    contourKey: "situation-review",
    routeLabel: "Первичный маршрут",
    inputNeeded: "Что уже есть по вопросу и какой документ вызвал задачу.",
    safeNextStep: "Отделить ближайший документальный маршрут без обещания результата.",
    proofCta: "Разобрать ситуацию"
  },
  {
    contourKey: "urgent-unclear-request",
    routeLabel: "Неясный запрос",
    inputNeeded: "Текст требования, запроса или вводные по срочному вопросу.",
    safeNextStep: "Посмотреть документ и выбрать спокойный порядок действий.",
    proofCta: "Показать документы"
  },
  {
    contourKey: "reporting",
    routeLabel: "Отчетность",
    inputNeeded: "Период, режим, исходные документы и уже подготовленные данные.",
    safeNextStep: "Понять, какой отчетный комплект нужно готовить дальше.",
    proofCta: "Показать документы"
  },
  {
    contourKey: "bank-115fz",
    routeLabel: "Банк и 115-ФЗ",
    inputNeeded: "Запрос банка, операция и документы, которые уже есть.",
    safeNextStep: "Собрать понятный комплект ответа без обещания решения банка.",
    proofCta: "Показать документы"
  },
  {
    contourKey: "address-egrul-director",
    routeLabel: "Адрес / ЕГРЮЛ",
    inputNeeded: "Что меняется, какие сведения актуальны и какие документы на руках.",
    safeNextStep: "Развести адрес, изменения и связанные документы по маршрутам.",
    proofCta: "Разобрать ситуацию"
  },
  {
    contourKey: "registration-liquidation",
    routeLabel: "Регистрация",
    inputNeeded: "Формат будущего бизнеса и базовые вводные по участникам.",
    safeNextStep: "Определить документальный старт без вывода по налогам до разбора.",
    proofCta: "Разобрать ситуацию"
  },
  {
    contourKey: "business-support-recovery",
    routeLabel: "Сопровождение",
    inputNeeded: "Текущее состояние документов и регулярные рабочие задачи.",
    safeNextStep: "Понять первый рабочий шаг и не обещать неограниченный scope.",
    proofCta: "Разобрать ситуацию"
  },
  {
    contourKey: "office-contacts",
    routeLabel: "Офис",
    inputNeeded: "Нужно позвонить, приехать или согласовать безопасный показ документов.",
    safeNextStep: "Использовать подтвержденный телефон, адрес и маршрут.",
    proofCta: "Построить маршрут"
  }
];

export const materialMappings = [
  {
    title: "Site block",
    assetLabel: "Matrix specimen",
    source: brandTokens.assets.matrixSpecimenBoardV03,
    use: "Hero, service cards, proof sections",
    status: "Internal proof"
  },
  {
    title: "Ad square",
    assetLabel: "Square template",
    source: brandTokens.assets.adSquareTemplate,
    use: "Review mock only",
    status: "Channel HOLD"
  },
  {
    title: "Story",
    assetLabel: "Story template",
    source: brandTokens.assets.adStoryTemplate,
    use: "Overlay/safe-zone review",
    status: "Channel HOLD"
  },
  {
    title: "Slide cover",
    assetLabel: "Cover template",
    source: brandTokens.assets.slideCoverTemplate,
    use: "Internal deck opening",
    status: "Review export"
  },
  {
    title: "Local contact",
    assetLabel: "Local compact",
    source: brandTokens.assets.adLocalCompactTemplate,
    use: "NAP-only contact surface",
    status: "Public HOLD"
  }
];

export const proofChecks = [
  "noindex / nofollow metadata",
  "not linked from public navigation",
  "not added to sitemap",
  "no backend submission",
  "no public launch wording",
  "commercial HOLD fields stay outside proof",
  "tokens and existing SVG assets only"
];
