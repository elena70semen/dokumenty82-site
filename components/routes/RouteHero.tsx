import { BrandIcon } from "@/components/brand/BrandIcon";
import { TrackedAction } from "@/components/tracking/TrackedAction";
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
    ? "inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[rgba(159,203,22,0.34)] bg-[var(--surface-dark-strong)] px-6 py-3 text-sm font-black text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)] transition hover:-translate-y-0.5 hover:border-[rgba(159,203,22,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
    : "inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--border-dark-subtle)] bg-[rgba(255,255,255,0.07)] px-5 py-3 text-sm font-black text-[color:var(--text-inverse)] transition hover:bg-[var(--surface-dark-subtle-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]";
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
      className="relative isolate overflow-hidden bg-transparent pt-[8.25rem] text-[color:var(--text-inverse)] md:pt-[8.75rem]"
      aria-labelledby="route-hero-title"
      style={{
        backgroundColor: "var(--page-dim)"
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[rgba(255,255,255,0.12)]" aria-hidden="true" />

      <div className="container-premium grid min-h-[calc(76vh-88px)] gap-10 pb-14 lg:grid-cols-[0.96fr_0.78fr] lg:items-center">
        <div className="max-w-[46rem]">
          <div className="inline-flex items-center gap-3 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.07)] px-4 py-3">
            <BrandIcon name={hero.icon} size={20} className="text-[color:var(--lime-signal)]" />
            <p className="text-sm font-bold text-[color:var(--text-inverse)]">{hero.eyebrow}</p>
          </div>

          <h1 id="route-hero-title" className="mt-6 text-[2.1rem] font-black leading-[1.1] tracking-normal md:text-[2.85rem] lg:text-[3.25rem]">
            {hero.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--text-inverse-muted)] md:text-lg md:leading-8">
            {hero.text}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RouteActionLink action={hero.primaryAction} pageKind={pageKind} pageSlug={pageSlug} primary />
            {hero.secondaryActions.map((action) => (
              <RouteActionLink key={`${action.label}-${action.href}`} action={action} pageKind={pageKind} pageSlug={pageSlug} />
            ))}
          </div>

          <ul className="mt-7 grid gap-3 text-sm text-[color:var(--text-inverse-soft)] sm:grid-cols-3">
            {hero.signals.map((signal) => (
              <li key={signal} className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[var(--lime-signal)]" aria-hidden="true" />
                {signal}
              </li>
            ))}
          </ul>
        </div>

        <aside
          className="rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(10,16,26,0.62)] p-4 shadow-[var(--shadow-panel)] backdrop-blur-[10px]"
          aria-label="Первый шаг"
        >
          <div className="flex items-center gap-4 border-b border-[var(--border-dark-soft)] pb-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-[8px] border border-[rgba(159,203,22,0.18)] bg-[rgba(159,203,22,0.08)] text-[color:var(--lime-signal)]">
              <BrandIcon name={hero.icon} size={20} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--text-inverse-soft)]">Что уточняем</p>
              <h2 className="mt-2 text-xl font-black leading-tight text-[color:var(--text-inverse)]">Без лишнего шума</h2>
            </div>
          </div>

          <ol className="mt-4 grid gap-2">
            {hero.visualSteps.map((item, index) => (
              <li key={item} className="grid grid-cols-[36px_1fr] items-center gap-3 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.06)] p-2.5">
                <span className="grid size-9 place-items-center rounded-[8px] bg-[rgba(159,203,22,0.12)] text-xs font-black text-[color:var(--lime-signal)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-bold leading-6 text-[color:var(--text-inverse)]">{item}</span>
              </li>
            ))}
          </ol>

          <div className="mt-4 rounded-[8px] border border-[rgba(159,203,22,0.16)] bg-[rgba(159,203,22,0.06)] p-4">
            <p className="text-sm font-bold leading-6 text-[color:var(--text-inverse-muted)]">
              Начинаем с того, что уже есть: письмо, запрос, период, цель или короткое описание ситуации.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
