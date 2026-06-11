import { type BrandIconName } from "@/components/brand/BrandIcon";
import { brandTokens } from "@/lib/brand/brand-tokens";

export const visualDetailRoute = {
  path: "/internal/visual-detail-kit",
  label: "INTERNAL VISUAL DETAIL KIT / NOT PUBLIC",
  status: "Stage11A / internal visual detail proof",
  publicStatus: "Public release remains HOLD"
};

export const iconItems: { name: BrandIconName; label: string; meaning: string }[] = [
  { name: "document", label: "Document", meaning: "документы, заявления, комплекты" },
  { name: "reporting", label: "Reporting", meaning: "отчетность, декларации" },
  { name: "bank", label: "Bank", meaning: "банк, 115-ФЗ, запросы" },
  { name: "registration", label: "Registration", meaning: "регистрация, изменения" },
  { name: "hr", label: "HR", meaning: "кадровые документы" },
  { name: "recovery", label: "Recovery", meaning: "восстановление учета" },
  { name: "route", label: "Route", meaning: "маршрут действий" },
  { name: "location", label: "Location", meaning: "офис и местоположение" },
  { name: "phone", label: "Phone", meaning: "звонок" },
  { name: "folder", label: "Folder", meaning: "комплект или папка" },
  { name: "shield", label: "Shield", meaning: "аккуратность и проверка" },
  { name: "question", label: "Question", meaning: "разбор ситуации" }
];

export const iconSurfaces = [
  { label: "Light", className: "bg-[var(--surface-raised)] text-[color:var(--blue)]" },
  { label: "Dark", className: "bg-[var(--surface-dark)] text-[color:var(--lime-signal)]" },
  { label: "Raised", className: "bg-[var(--paper)] text-[color:var(--navy)]" },
  { label: "Accent", className: "bg-[var(--lime-signal)] text-[color:var(--lime-text)]" }
];

export const badgeItems = [
  { kind: "office" as const, label: "Office badge", icon: "location" as const, rule: "rounded square for office/local context" },
  { kind: "route" as const, label: "Route badge", icon: "route" as const, rule: "route marker without state-like symbols" },
  { kind: "document" as const, label: "Document badge", icon: "document" as const, rule: "document contour, no client data" },
  { kind: "contact" as const, label: "Contact badge", icon: "phone" as const, rule: "contact marker without working-hours promise" },
  { kind: "initials" as const, label: "Initials fallback", initials: "ДБ", rule: "no real face by default" },
  { kind: "organization" as const, label: "Organization mark", initials: "ДБ", rule: "square organization mark, not a person avatar" }
];

export const surfaceFamilies = [
  {
    key: "dark-business",
    title: "Dark business",
    purpose: "hero, covers, high-attention internal proof",
    rule: "one lime action accent, strong text contrast, no body text on noisy areas",
    className: "bg-[var(--surface-dark)] text-[color:var(--text-inverse)]",
    style: { backgroundImage: brandTokens.gradients.businessDepth }
  },
  {
    key: "matrix-paper",
    title: "Matrix paper",
    purpose: "expert reading surface and document sections",
    rule: "calm document surface, low accent density",
    className: "bg-[var(--paper-soft)] text-[color:var(--text-primary)]",
    style: { backgroundImage: `${brandTokens.gradients.paperGlow}, url(${brandTokens.assets.routeGridPattern})` }
  },
  {
    key: "route-grid",
    title: "Route grid",
    purpose: "movement from situation to documents",
    rule: "grid is structural, not decorative noise",
    className: "bg-[var(--surface-raised)] text-[color:var(--text-primary)]",
    style: { backgroundImage: `url(${brandTokens.assets.routeGridPattern})` }
  },
  {
    key: "raised-card",
    title: "Raised card",
    purpose: "cards, chips, document rows",
    rule: "one border, one shadow level, no nested cards inside cards",
    className: "bg-[var(--surface-raised)] text-[color:var(--text-primary)]",
    style: {}
  },
  {
    key: "local-contact",
    title: "Local contact",
    purpose: "NAP, phone, route and office-first trust anchor",
    rule: "confirmed NAP only, no hours/floor/legal IDs",
    className: "bg-[var(--paper)] text-[color:var(--text-primary)]",
    style: { backgroundImage: brandTokens.gradients.goldBridge }
  },
  {
    key: "document-plane",
    title: "Document plane",
    purpose: "document previews and material rows",
    rule: "abstract document geometry only, no private files",
    className: "bg-[var(--surface-raised)] text-[color:var(--text-primary)]",
    style: { backgroundImage: brandTokens.gradients.paperLight }
  },
  {
    key: "quiet-accent",
    title: "Quiet accent",
    purpose: "small info strips and non-primary highlights",
    rule: "supporting cue, not second CTA system",
    className: "bg-[var(--surface-raised)] text-[color:var(--text-primary)]",
    style: { backgroundImage: brandTokens.gradients.quietAccent }
  },
  {
    key: "banner-safe",
    title: "Banner safe",
    purpose: "internal banner/export reference",
    rule: "safe zones and no public ad approval",
    className: "bg-[var(--surface-dark-strong)] text-[color:var(--text-inverse)]",
    style: { backgroundImage: brandTokens.gradients.routeAccent }
  }
];

export const typographyRoles = [
  { role: "Hero H1", mobile: "40-44", desktop: "56-64", weight: "650-700", line: "1.05-1.1", sample: "Разберем ситуацию и подготовим документы" },
  { role: "Section H2", mobile: "28-32", desktop: "36-44", weight: "650", line: "1.1-1.15", sample: "Сначала маршрут, потом комплект" },
  { role: "Card H3", mobile: "20-22", desktop: "24-28", weight: "600", line: "1.15-1.2", sample: "Запрос банка" },
  { role: "Body primary", mobile: "16", desktop: "18", weight: "400-450", line: "1.5-1.6", sample: "Покажите документ и вводные. Мы спокойно разберем, какой следующий шаг нужен." },
  { role: "Body compact", mobile: "15-16", desktop: "16", weight: "400", line: "1.45-1.55", sample: "Короткий текст карточки без перегруза." },
  { role: "Label / meta", mobile: "13-14", desktop: "14-15", weight: "600", line: "1.35", sample: "INTERNAL REVIEW" },
  { role: "CTA", mobile: "14-16", desktop: "14-16", weight: "700", line: "1.2", sample: "Разобрать ситуацию" }
];

export const microdetails = [
  "buttons",
  "secondary buttons",
  "text links",
  "chips",
  "badges",
  "cards",
  "dividers",
  "process numbers",
  "status labels",
  "contact rows",
  "document preview rows",
  "focus rings"
];

export const blockElements = [
  { name: "Hero title cluster", reuse: "yes", note: "rewrite internal labels for route copy" },
  { name: "Local marker chip", reuse: "yes", note: "confirmed local marker only" },
  { name: "CTA pair", reuse: "yes", note: "primary action first, no backend success" },
  { name: "Situation card", reuse: "with rewrite", note: "router card, not service catalog" },
  { name: "Service contour card", reuse: "with rewrite", note: "one contour per card" },
  { name: "Process step", reuse: "yes", note: "process, not promise" },
  { name: "Document preview row", reuse: "with rewrite", note: "abstract documents only" },
  { name: "Local contact card", reuse: "yes", note: "NAP only" },
  { name: "Safe info strip", reuse: "yes", note: "no urgency pressure" },
  { name: "Section heading", reuse: "yes", note: "live text, no raster heading" },
  { name: "Route card grid", reuse: "with rewrite", note: "anti-cannibalization check" },
  { name: "Mini banner strip", reuse: "with conditions", note: "internal/on-site only until reviewed" }
];

export const materialAssets = [
  { label: "Square", size: "1080x1080", source: brandTokens.assets.adSquareTemplate, status: "Channel HOLD" },
  { label: "Story", size: "1080x1920", source: brandTokens.assets.adStoryTemplate, status: "Channel HOLD" },
  { label: "Horizontal", size: "1200x628", source: brandTokens.assets.adHorizontalTemplate, status: "Channel HOLD" },
  { label: "Outdoor", size: "by print brief only", source: brandTokens.assets.adOutdoorSafeTemplate, status: "Print HOLD" },
  { label: "Local compact", size: "1080x1080 / 1200x1200", source: brandTokens.assets.adLocalCompactTemplate, status: "Local HOLD" },
  { label: "Slide cover", size: "1920x1080", source: brandTokens.assets.slideCoverTemplate, status: "Review export" },
  { label: "Route process", size: "1920x1080", source: brandTokens.assets.slideRouteProcessTemplate, status: "Review export" },
  { label: "Local contact", size: "1920x1080", source: brandTokens.assets.slideLocalContactTemplate, status: "NAP-only review" }
];

export const decisionItems = [
  { item: "Icon system", decision: "Reusable", condition: "React icons now; SVG masters HOLD until separate asset task" },
  { item: "Badges / avatars", decision: "Reusable", condition: "badges and monograms only; real faces HOLD" },
  { item: "Surfaces", decision: "Reusable", condition: "select per route; no noisy body backgrounds" },
  { item: "Typography", decision: "Reusable", condition: "system stack now; custom fonts HOLD" },
  { item: "Header/footer prototypes", decision: "Reusable", condition: "rewrite into production shell after review" },
  { item: "Banner elements", decision: "Internal only", condition: "no public ads or channel launch" },
  { item: "Internal labels", decision: "Not reusable", condition: "must stay on internal route only" }
];
