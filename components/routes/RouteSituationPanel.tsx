import { BrandBadge } from "@/components/brand/BrandBadge";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { brandTokens } from "@/lib/brand/brand-tokens";
import type { RouteListSection } from "@/lib/routes/route-page-data";

type RouteSituationPanelProps = {
  section: RouteListSection;
};

export function RouteSituationPanel({ section }: RouteSituationPanelProps) {
  return (
    <section
      className="section-pad bg-[var(--paper-soft)]"
      aria-labelledby="route-situation-title"
      style={{ backgroundImage: `url(${brandTokens.assets.routeGridPattern})` }}
    >
      <div className="container-premium">
        <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <div>
            <p className="eyebrow-line">{section.eyebrow}</p>
            <h2 id="route-situation-title" className="mt-5 text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-6xl">
              {section.title}
            </h2>
          </div>
          <p className="text-lg leading-9 text-[color:var(--text-secondary)]">{section.text}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {section.items.map((item) => (
            <article
              key={item.title}
              className="group flex min-h-[250px] min-w-0 flex-col rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised-soft)] p-5 shadow-[var(--shadow-card-sm)] transition hover:-translate-y-1 hover:bg-[var(--surface-raised)] hover:shadow-[var(--shadow-card-md-hover)]"
            >
              <div className="flex items-start justify-between gap-4">
                <BrandBadge kind={item.badgeKind} label="Ситуация" icon={item.icon} size={48} />
                <BrandIcon name="route" size={20} className="mt-3 text-[color:var(--text-muted)] transition group-hover:text-[color:var(--blue)]" />
              </div>
              <h3 className="mt-7 text-2xl font-black leading-tight text-[color:var(--text-primary)]">{item.title}</h3>
              <p className="mt-4 flex-1 text-base leading-7 text-[color:var(--text-secondary)]">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
