import { BrandIcon } from "@/components/brand/BrandIcon";
import { TrackedAction } from "@/components/tracking/TrackedAction";
import type { RouteRelatedLink } from "@/lib/routes/route-page-data";

type RouteRelatedLinksProps = {
  links: RouteRelatedLink[];
  pageSlug: string;
  pageType: string;
};

export function RouteRelatedLinks({ links, pageSlug, pageType }: RouteRelatedLinksProps) {
  return (
    <section
      className="section-pad dimmed-page-section"
      aria-labelledby="route-related-title"
    >
      <div className="container-premium">
        <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <div>
            <p className="eyebrow-line">Куда перейти дальше</p>
            <h2 id="route-related-title" className="mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-inverse)] md:text-6xl">
              Выберите подходящий раздел
            </h2>
          </div>
          <p className="text-lg leading-9 text-[color:var(--text-inverse-muted)]">
            Если тема уже понятна, можно сразу открыть ближайшее направление и посмотреть, какие документы понадобятся.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {links.map((link) => (
            <article
              key={link.href}
              className="dark-glass-card dark-glass-card-interactive group grid min-h-[318px] grid-rows-[auto_auto_1fr_auto] rounded-[8px] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="dark-glass-icon">
                    <BrandIcon name={link.icon} size={24} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--text-inverse-soft)]">Раздел</span>
                </div>
                <BrandIcon name="route" size={20} className="mt-3 text-[color:var(--text-inverse-soft)] transition group-hover:text-[color:var(--lime-signal)]" />
              </div>
              <h3 className="mt-7 min-h-[64px] text-2xl font-semibold leading-tight text-[color:var(--text-inverse)]">{link.title}</h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--text-inverse-muted)]">{link.copy}</p>
              <div className="mt-6 border-t border-[rgba(255,255,255,0.12)] pt-4">
                <TrackedAction
                  href={link.href}
                  className="dark-glass-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
                  pageSlug={pageSlug}
                  pageType={pageType}
                  ctaLabel="Перейти в раздел"
                  ctaLocation="related_routes"
                  leadTopic={link.href.replace(/^\//, "").replace(/\/$/, "") || "home"}
                  collectorType="related_route"
                  fromPageSlug={pageSlug}
                  toPageSlug={link.href}
                >
                  <BrandIcon name="route" size={20} />
                  Перейти в раздел
                </TrackedAction>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
