import { BrandIcon } from "@/components/brand/BrandIcon";
import type { RouteListSection } from "@/lib/routes/route-page-data";

type RouteSituationPanelProps = {
  section: RouteListSection;
};

export function RouteSituationPanel({ section }: RouteSituationPanelProps) {
  return (
    <section
      className="section-pad dimmed-page-section"
      aria-labelledby="route-situation-title"
    >
      <div className="container-premium">
        <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <div>
            <p className="eyebrow-line">{section.eyebrow}</p>
            <h2 id="route-situation-title" className="mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-inverse)] md:text-6xl">
              {section.title}
            </h2>
          </div>
          <p className="text-lg leading-9 text-[color:var(--text-inverse-muted)]">{section.text}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {section.items.map((item) => (
            <article
              key={item.title}
              className="dark-glass-card dark-glass-card-interactive group grid min-h-[260px] grid-rows-[auto_auto_1fr] rounded-[8px] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="dark-glass-icon">
                    <BrandIcon name={item.icon} size={24} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--text-inverse-soft)]">Когда подходит</span>
                </div>
                <BrandIcon name="route" size={20} className="mt-3 text-[color:var(--text-inverse-soft)] transition group-hover:text-[color:var(--lime-signal)]" />
              </div>
              <h3 className="mt-7 min-h-[64px] text-2xl font-semibold leading-tight text-[color:var(--text-inverse)]">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--text-inverse-muted)]">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
