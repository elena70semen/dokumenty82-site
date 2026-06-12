import Link from "next/link";
import { BrandBadge } from "@/components/brand/BrandBadge";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { homeRouteCards } from "@/lib/home/home-page-data";
import { brandTokens } from "@/lib/brand/brand-tokens";
import { analyticsGoalNames } from "@/lib/integrations/analytics-events";

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

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {homeRouteCards.map((card, index) => (
            <article
              key={card.title}
              className={`group flex min-h-[292px] min-w-0 flex-col rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised-soft)] p-5 shadow-[var(--shadow-card-sm)] transition hover:-translate-y-1 hover:bg-[var(--surface-raised)] hover:shadow-[var(--shadow-card-md-hover)] ${
                index === 0 ? "xl:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <BrandBadge kind={card.badgeKind} label="Маршрут" icon={card.icon} size={48} />
                <BrandIcon name="route" size={20} className="mt-3 text-[color:var(--text-muted)] transition group-hover:text-[color:var(--blue)]" />
              </div>
              <div className="mt-7 flex flex-1 flex-col">
                <h3 className="text-2xl font-black leading-tight text-[color:var(--text-primary)]">{card.title}</h3>
                <p className="mt-4 flex-1 text-base leading-7 text-[color:var(--text-secondary)]">{card.copy}</p>
                <div className="mt-6 grid gap-3 border-t border-[var(--line)] pt-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <span className="min-w-0 text-sm font-bold leading-6 text-[color:var(--text-muted)]">{card.nextStep}</span>
                  <Link
                    href={card.href}
                    aria-label={`${card.nextStep}: ${card.title}`}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-2 text-sm font-black text-[color:var(--text-inverse)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)] sm:w-auto"
                    data-analytics-goal={analyticsGoalNames.relatedRouteClick}
                    data-cta-label="Разобрать ситуацию"
                    data-cta-location="home_route_card"
                    data-lead-topic="Другое / первый шаг"
                    data-page-slug="home"
                    data-page-type="homepage"
                    data-related-href={card.href}
                  >
                    Разобрать ситуацию
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
