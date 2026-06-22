import Link from "next/link";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { brandTokens } from "@/lib/brand/brand-tokens";
import type { RouteAction, RouteHeroConfig, RoutePageKind } from "@/lib/routes/route-page-data";
import { analyticsGoalNames } from "@/lib/integrations/analytics-events";

type RouteHeroProps = {
  hero: RouteHeroConfig;
  pageKind: RoutePageKind;
  pageSlug: string;
  pageType: string;
  leadTopic: string;
};

function getActionGoal(action: RouteAction) {
  if (action.kind === "phone") return analyticsGoalNames.callClick;
  if (action.label === "Построить маршрут") return analyticsGoalNames.routeClick;
  if (action.label === "Показать документы") return analyticsGoalNames.docsShowClick;
  if (action.label === "Разобрать ситуацию") return analyticsGoalNames.situationReviewClick;
  return analyticsGoalNames.formStart;
}

function RouteActionLink({
  action,
  primary = false,
  pageSlug,
  pageType,
  leadTopic
}: {
  action: RouteAction;
  primary?: boolean;
  pageSlug: string;
  pageType: string;
  leadTopic: string;
}) {
  const className = primary
    ? "inline-flex min-h-12 w-full min-w-[184px] items-center justify-center rounded-[8px] bg-[var(--lime-signal)] px-6 py-3 text-sm font-black text-[color:var(--lime-text)] shadow-[var(--shadow-signal)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)] sm:w-auto"
    : "inline-flex min-h-12 w-full min-w-[184px] items-center justify-center rounded-[8px] border border-[var(--border-dark-subtle)] bg-[var(--surface-dark-subtle)] px-5 py-3 text-sm font-black text-[color:var(--text-inverse)] transition hover:bg-[var(--surface-dark-subtle-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)] sm:w-auto";
  const ctaLocation = primary ? "route_hero_primary" : "route_hero_secondary";
  const analyticsGoal = getActionGoal(action);

  if (action.kind === "phone" || action.href.startsWith("#")) {
    return (
      <a
        href={action.href}
        className={className}
        data-analytics-goal={analyticsGoal}
        data-cta-label={action.label}
        data-cta-location={ctaLocation}
        data-collector-type={action.kind}
        data-lead-topic={leadTopic}
        data-page-slug={pageSlug}
        data-page-type={pageType}
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link
      href={action.href}
      className={className}
      data-analytics-goal={analyticsGoal}
      data-cta-label={action.label}
      data-cta-location={ctaLocation}
      data-collector-type={action.kind}
      data-lead-topic={leadTopic}
      data-page-slug={pageSlug}
      data-page-type={pageType}
    >
      {action.label}
    </Link>
  );
}

export function RouteHero({ hero, pageKind, pageSlug, pageType, leadTopic }: RouteHeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[var(--surface-dark)] pt-32 text-[color:var(--text-inverse)] md:pt-36"
      aria-labelledby="route-hero-title"
      style={{
        backgroundImage: `${brandTokens.gradients.businessDepth}, url(${brandTokens.assets.routeGridPattern})`
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,255,0,0.52),transparent)]" aria-hidden="true" />

      <div className="container-premium grid gap-9 pb-12 lg:min-h-[calc(78vh-88px)] lg:grid-cols-[1.02fr_0.88fr] lg:items-center lg:gap-10 lg:pb-14">
        <div className="max-w-3xl">
          <nav className="mb-7 flex max-w-full flex-wrap items-center gap-2 text-sm font-black text-[color:var(--text-inverse-muted)]" aria-label="Контекст маршрута">
            <Link href="/" className="inline-flex min-h-10 items-center rounded-[8px] text-[color:var(--lime-signal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]">
              Главная
            </Link>
            <span>/</span>
            <span aria-current="page" className="inline-flex min-h-10 min-w-0 items-center break-words">
              {hero.eyebrow}
            </span>
          </nav>

          <div className="inline-flex items-center gap-3 rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] px-4 py-3">
            <BrandIcon name={hero.icon} size={20} className="text-[color:var(--lime-signal)]" />
            <p className="text-sm font-black text-[color:var(--lime-signal)]">{hero.eyebrow}</p>
          </div>

          <h1 id="route-hero-title" className="route-title-fluid mt-7 font-black">
            {hero.title}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--text-inverse-muted)] md:text-xl md:leading-9">
            {hero.text}
          </p>

          <div className="cta-cluster mt-9">
            <RouteActionLink action={hero.primaryAction} pageSlug={pageSlug} pageType={pageType} leadTopic={leadTopic} primary />
            {hero.secondaryActions.map((action) => (
              <RouteActionLink key={`${action.label}-${action.href}`} action={action} pageSlug={pageSlug} pageType={pageType} leadTopic={leadTopic} />
            ))}
          </div>

          <ul className="mt-8 grid gap-3 text-sm text-[color:var(--text-inverse-soft)] sm:grid-cols-3">
            {hero.signals.map((signal) => (
              <li key={signal} className="flex min-w-0 items-center gap-2 rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] px-3 py-2">
                <span className="size-2 rounded-full bg-[var(--lime-signal)]" aria-hidden="true" />
                <span className="min-w-0">{signal}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden min-h-[390px] lg:block" aria-hidden="true">
          <div className="absolute inset-0 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.04)] shadow-[var(--shadow-panel)]" />
          <div className="absolute left-7 right-7 top-7 grid gap-5">
            <div className="flex items-center justify-between rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(247,243,234,0.9)] p-4 shadow-[var(--shadow-card-sm)]">
              <BrandBadge kind={hero.badgeKind} label={pageKind === "hub" ? "Маршрут" : "Первый шаг"} icon={hero.icon} size={48} />
              <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(198,255,0,0.64),transparent)]" />
            </div>

            <div className="grid gap-3">
              {hero.visualSteps.map((item, index) => (
                <div key={item} className="grid grid-cols-[44px_1fr] items-center gap-3 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.06)] p-3">
                  <span className="grid size-10 place-items-center rounded-[8px] bg-[rgba(198,255,0,0.14)] text-xs font-black text-[color:var(--lime-signal)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-black text-[color:var(--text-inverse)]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-7 left-10 right-10 grid gap-2 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.06)] p-5">
            <span className="h-2 w-3/5 rounded-full bg-[rgba(255,255,255,0.32)]" />
            <span className="h-2 w-4/5 rounded-full bg-[rgba(198,255,0,0.42)]" />
            <span className="h-2 w-2/5 rounded-full bg-[rgba(255,255,255,0.22)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
