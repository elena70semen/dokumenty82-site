import { BrandBadge } from "@/components/brand/BrandBadge";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { TrackedAction } from "@/components/tracking/TrackedAction";
import { homeRouteCards } from "@/lib/home/home-page-data";
import { brandTokens } from "@/lib/brand/brand-tokens";

export function HomeRouteCards() {
  return (
    <section
      id="documents"
      className="section-pad bg-[var(--paper-soft)]"
      aria-labelledby="home-route-title"
      style={{ backgroundImage: `url(${brandTokens.assets.routeGridPattern})` }}
    >
      <div className="container-premium">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="eyebrow-line">Маршруты</p>
            <h2 id="home-route-title" className="mt-5 text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-6xl">
              Выберите ближайший вход в задачу
            </h2>
          </div>
          <p className="text-lg leading-9 text-[color:var(--text-secondary)]">
            Если вопрос смешанный или непонятный, начните с разбора ситуации. Так проще отделить документы,
            вводные и следующий шаг.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {homeRouteCards.map((card) => (
            <article
              key={card.title}
              className="group flex min-h-[292px] flex-col rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised-soft)] p-5 shadow-[var(--shadow-card-sm)] transition hover:-translate-y-1 hover:bg-[var(--surface-raised)] hover:shadow-[var(--shadow-card-md-hover)]"
            >
              <div className="flex items-start justify-between gap-4">
                <BrandBadge kind={card.badgeKind} label="Маршрут" icon={card.icon} size={48} />
                <BrandIcon name="route" size={20} className="mt-3 text-[color:var(--text-muted)] transition group-hover:text-[color:var(--blue)]" />
              </div>
              <div className="mt-7 flex flex-1 flex-col">
                <h3 className="text-2xl font-black leading-tight text-[color:var(--text-primary)]">{card.title}</h3>
                <p className="mt-4 flex-1 text-base leading-7 text-[color:var(--text-secondary)]">{card.copy}</p>
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
                  <span className="text-sm font-bold text-[color:var(--text-muted)]">{card.nextStep}</span>
                  <TrackedAction
                    href={card.href}
                    className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-2 text-sm font-black text-[color:var(--text-inverse)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
                    pageSlug="home"
                    pageType="home"
                    ctaLabel="Разобрать ситуацию"
                    ctaLocation="home_route_card"
                    leadTopic={card.href.replace(/^\//, "").replace(/\/$/, "") || "home"}
                    collectorType="related_route"
                    fromPageSlug="home"
                    toPageSlug={card.href}
                  >
                    Разобрать ситуацию
                  </TrackedAction>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
