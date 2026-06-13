import Link from "next/link";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { brandTokens } from "@/lib/brand/brand-tokens";
import type { RouteRelatedLink } from "@/lib/routes/route-page-data";
import { analyticsGoalNames } from "@/lib/integrations/analytics-events";

type RouteRelatedLinksProps = {
  links: RouteRelatedLink[];
  pageSlug: string;
  pageType: string;
  leadTopic: string;
};

export function RouteRelatedLinks({ links, pageSlug, pageType, leadTopic }: RouteRelatedLinksProps) {
  return (
    <section
      className="section-pad bg-[var(--paper-soft)]"
      aria-labelledby="route-related-title"
      style={{ backgroundImage: `url(${brandTokens.assets.routeGridPattern})` }}
    >
      <div className="container-premium">
        <div className="section-heading-grid">
          <div>
            <p className="eyebrow-line">Связанные маршруты</p>
            <h2 id="route-related-title" className="mt-5 text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-6xl">
              Перейти к точной странице
            </h2>
          </div>
          <p className="section-copy">
            Ссылки ведут только на утверждённые страницы и помогают сохранить один основной интент на URL.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {links.map((link) => (
            <article
              key={link.href}
              className="premium-card premium-link-card group flex min-w-0 flex-col p-5 md:min-h-[270px]"
            >
              <div className="flex items-start justify-between gap-4">
                <BrandBadge kind={link.badgeKind} label="Маршрут" icon={link.icon} size={48} />
                <BrandIcon name="route" size={20} className="mt-3 text-[color:var(--text-muted)] transition group-hover:text-[color:var(--blue)]" />
              </div>
              <div className="mt-7 flex flex-1 flex-col">
                <h3 className="text-2xl font-black leading-tight text-[color:var(--text-primary)]">{link.title}</h3>
                <p className="mt-4 flex-1 text-base leading-7 text-[color:var(--text-secondary)]">{link.copy}</p>
                <Link
                  href={link.href}
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-2 text-sm font-black text-[color:var(--text-inverse)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
                  data-analytics-goal={analyticsGoalNames.relatedRouteClick}
                  data-cta-label={link.title}
                  data-cta-location="route_related_links"
                  data-lead-topic={leadTopic}
                  data-page-slug={pageSlug}
                  data-page-type={pageType}
                  data-related-href={link.href}
                >
                  {link.title}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
