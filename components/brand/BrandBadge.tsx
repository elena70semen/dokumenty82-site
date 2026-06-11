import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";

export type BrandBadgeKind = "office" | "route" | "document" | "contact" | "initials" | "organization";

export type BrandBadgeProps = {
  kind: BrandBadgeKind;
  label: string;
  initials?: string;
  icon?: BrandIconName;
  size?: 40 | 48 | 64;
  className?: string;
};

const sizeClass: Record<NonNullable<BrandBadgeProps["size"]>, string> = {
  40: "size-10 text-sm",
  48: "size-12 text-base",
  64: "size-16 text-xl"
};

const kindClass: Record<BrandBadgeKind, string> = {
  office: "border-[var(--accent-gold-border)] bg-[var(--accent-gold-bg)] text-[color:var(--accent-gold-text)]",
  route: "border-[var(--accent-blue-border)] bg-[var(--accent-blue-bg)] text-[color:var(--blue)]",
  document: "border-[var(--accent-emerald-border)] bg-[var(--accent-emerald-bg)] text-[color:var(--emerald)]",
  contact: "border-[var(--accent-navy-border)] bg-[var(--accent-navy-bg)] text-[color:var(--navy)]",
  initials: "border-[var(--line)] bg-[var(--surface-raised)] text-[color:var(--text-primary)]",
  organization: "border-[var(--border-dark-soft)] bg-[var(--surface-dark-strong)] text-[color:var(--text-inverse)]"
};

export function BrandBadge({ kind, label, initials, icon, size = 48, className = "" }: BrandBadgeProps) {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`grid shrink-0 place-items-center rounded-[12px] border font-black shadow-[var(--shadow-card-sm)] ${sizeClass[size]} ${kindClass[kind]} ${className}`}
      >
        {icon ? <BrandIcon name={icon} size={size === 64 ? 32 : 24} /> : initials ?? label.slice(0, 2).toUpperCase()}
      </span>
      <span className="text-sm font-black leading-tight text-[color:var(--text-primary)]">{label}</span>
    </span>
  );
}
