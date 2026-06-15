import { BrandIcon } from "@/components/brand/BrandIcon";
import { TrackedAction } from "@/components/tracking/TrackedAction";
import { homeRouteCards } from "@/lib/home/home-page-data";

export function HomeRouteCards() {
  return (
    <section
      id="documents"
      className="section-pad dimmed-page-section"
      aria-labelledby="home-route-title"
    >
      <div className="container-premium">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="eyebrow-line">Разделы</p>
            <h2 id="home-route-title" className="mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-inverse)] md:text-6xl">
              Выберите ближайший вход в задачу
            </h2>
          </div>
          <p className="text-lg leading-9 text-[color:var(--text-inverse-muted)]">
            Если вопрос смешанный или непонятный, начните с разбора ситуации. Так проще отделить документы,
            вводные и следующий шаг.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {homeRouteCards.map((card) => (
            <article
              key={card.title}
              className="group relative grid min-h-[356px] grid-rows-[auto_auto_auto_1fr_auto] overflow-hidden rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(10,16,26,0.64)] p-5 text-[color:var(--text-inverse)] shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-[18px] transition hover:-translate-y-0.5 hover:border-[rgba(159,203,22,0.28)] hover:bg-[rgba(14,23,34,0.74)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-[rgba(159,203,22,0.42)] opacity-80 transition group-hover:opacity-100" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 bg-[rgba(255,255,255,0.05)] opacity-70" aria-hidden="true" />
              <div className="flex items-start justify-between gap-4">
                <div className="relative flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-[8px] border border-[rgba(159,203,22,0.2)] bg-[rgba(159,203,22,0.08)] text-[color:var(--lime-signal)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                    <BrandIcon name={card.icon} size={24} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--text-inverse-soft)]">Раздел</span>
                </div>
                <BrandIcon name="route" size={20} className="relative mt-3 text-[color:var(--text-inverse-soft)] transition group-hover:text-[color:var(--lime-signal)]" />
              </div>
              <h3 className="relative mt-7 min-h-[64px] text-[1.35rem] font-semibold leading-tight text-[color:var(--text-inverse)]">{card.title}</h3>
              <p className="relative mt-4 flex min-h-[44px] items-center rounded-[8px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.07)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--text-inverse-muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                Когда: {card.trigger}
              </p>
              <p className="relative mt-4 text-base leading-7 text-[color:var(--text-inverse-muted)]">{card.copy}</p>
              <div className="relative mt-6 grid min-h-[72px] gap-3 border-t border-[rgba(255,255,255,0.12)] pt-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <span className="text-sm font-semibold leading-5 text-[color:var(--text-inverse-soft)]">{card.nextStep}</span>
                <TrackedAction
                  href={card.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border border-[rgba(255,255,255,0.14)] bg-[rgba(12,30,56,0.82)] px-4 py-2 text-sm font-semibold text-[color:var(--text-inverse)] shadow-[0_14px_34px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.1)] transition hover:-translate-y-0.5 hover:border-[rgba(159,203,22,0.38)] hover:bg-[rgba(16,39,72,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
                  pageSlug="home"
                  pageType="home"
                  ctaLabel="Разобрать ситуацию"
                  ctaLocation="home_route_card"
                  leadTopic={card.href.replace(/^\//, "").replace(/\/$/, "") || "home"}
                  collectorType="related_route"
                  fromPageSlug="home"
                  toPageSlug={card.href}
                >
                  <BrandIcon name="route" size={20} />
                  Разобрать ситуацию
                </TrackedAction>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
