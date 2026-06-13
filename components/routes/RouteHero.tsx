import { BrandBadge } from "@/components/brand/BrandBadge";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { TrackedAction } from "@/components/tracking/TrackedAction";
import { brandTokens } from "@/lib/brand/brand-tokens";
import type { RouteAction, RouteHeroConfig, RoutePageKind } from "@/lib/routes/route-page-data";
import type { CollectorType } from "@/lib/tracking/event-context";

type RouteHeroProps = {
  hero: RouteHeroConfig;
  pageKind: RoutePageKind;
  pageSlug: string;
};

function collectorTypeForAction(action: RouteAction): CollectorType {
  if (action.kind === "phone") return "phone";
  if (action.label === "Показать документы") return "show_documents";
  if (action.label === "Построить маршрут" || action.href.includes("route-contact")) return "route";
  return "situation_review";
}

function RouteActionLink({
  action,
  pageKind,
  pageSlug,
  primary = false
}: {
  action: RouteAction;
  pageKind: RoutePageKind;
  pageSlug: string;
  primary?: boolean;
}) {
  const className = primary
    ? "inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--lime-signal)] px-6 py-3 text-sm font-black text-[color:var(--lime-text)] shadow-[var(--shadow-signal)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
    : "inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--border-dark-subtle)] bg-[var(--surface-dark-subtle)] px-5 py-3 text-sm font-black text-[color:var(--text-inverse)] transition hover:bg-[var(--surface-dark-subtle-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]";
  const collectorType = collectorTypeForAction(action);

  return (
    <TrackedAction
      href={action.href}
      className={className}
      pageSlug={pageSlug}
      pageType={pageKind}
      ctaLabel={action.label}
      ctaLocation="route_hero"
      leadTopic={pageSlug}
      collectorType={collectorType}
      contactChannel={collectorType === "phone" ? "phone" : collectorType === "route" ? "office" : undefined}
    >
      {action.label}
    </TrackedAction>
  );
}

export function RouteHero({ hero, pageKind, pageSlug }: RouteHeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[var(--surface-dark)] pt-36 text-[color:var(--text-inverse)] md:pt-40"
      aria-labelledby="route-hero-title"
      style={{
        backgroundImage: `${brandTokens.gradients.businessDepth}, url(${brandTokens.assets.routeGridPattern})`
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,255,0,0.52),transparent)]" aria-hidden="true" />

      <div className="container-premium grid min-h-[calc(86vh-88px)] gap-12 pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] px-4 py-3">
            <BrandIcon name={hero.icon} size={20} className="text-[color:var(--lime-signal)]" />
            <p className="text-sm font-black text-[color:var(--lime-signal)]">{hero.eyebrow}</p>
          </div>

          <h1 id="route-hero-title" className="mt-7 text-[2.46rem] font-black leading-[1.04] tracking-normal md:text-[4.45rem] lg:text-[5rem]">
            {hero.title}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--text-inverse-muted)] md:text-xl md:leading-9">
            {hero.text}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RouteActionLink action={hero.primaryAction} pageKind={pageKind} pageSlug={pageSlug} primary />
            {hero.secondaryActions.map((action) => (
              <RouteActionLink key={`${action.label}-${action.href}`} action={action} pageKind={pageKind} pageSlug={pageSlug} />
            ))}
          </div>

          <ul className="mt-8 grid gap-3 text-sm text-[color:var(--text-inverse-soft)] sm:grid-cols-3">
            {hero.signals.map((signal) => (
              <li key={signal} className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[var(--lime-signal)]" aria-hidden="true" />
                {signal}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[430px]" aria-hidden="true">
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
