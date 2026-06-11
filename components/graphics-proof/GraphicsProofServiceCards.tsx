import { brandTokens } from "@/lib/brand/brand-tokens";
import { proofServiceCards } from "@/lib/graphics-proof/graphics-proof-data";

const accentMarkerByColor: Record<string, string> = {
  blue: "bg-[var(--blue)]",
  emerald: "bg-[var(--emerald)]",
  gold: "bg-[var(--gold)]",
  wine: "bg-[var(--wine)]",
  navy: "bg-[var(--navy)]",
  muted: "bg-[var(--muted)]"
};

const accentChipByColor: Record<string, string> = {
  blue: "border-[var(--accent-blue-border)] bg-[var(--accent-blue-bg)] text-[color:var(--blue)]",
  emerald: "border-[var(--accent-emerald-border)] bg-[var(--accent-emerald-bg)] text-[color:var(--emerald)]",
  gold: "border-[var(--accent-gold-border)] bg-[var(--accent-gold-bg)] text-[color:var(--accent-gold-text)]",
  wine: "border-[var(--accent-wine-border)] bg-[var(--accent-wine-bg)] text-[color:var(--wine)]",
  navy: "border-[var(--accent-navy-border)] bg-[var(--accent-navy-bg)] text-[color:var(--navy)]",
  muted: "border-[var(--accent-muted-border)] bg-[var(--accent-muted-bg)] text-[color:var(--text-secondary)]"
};

export function GraphicsProofServiceCards() {
  return (
    <section className="section-pad" aria-labelledby="service-proof-title">
      <div className="container-premium">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">Service cards</p>
            <h2 id="service-proof-title" className="display-serif mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
              Сервисный слой как внутренняя карта, не каталог.
            </h2>
          </div>
          <p className="reveal-block text-lg leading-9 text-[color:var(--text-secondary)]" data-reveal="right">
            Карточки показывают контуры, вводные и безопасный следующий шаг. Они не утверждают публичный copy, цены или обещания результата.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {proofServiceCards.map((card) => {
            const contour = brandTokens.serviceContours[card.contourKey];
            const markerClass = accentMarkerByColor[contour.accent] ?? accentMarkerByColor.blue;
            const chipClass = accentChipByColor[contour.accent] ?? accentChipByColor.blue;

            return (
              <article
                key={card.contourKey}
                data-proof-only="true"
                data-service-contour={card.contourKey}
                className="reveal-block flex min-h-full flex-col rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card-md)]"
                data-reveal="up"
              >
                <span className={`inline-flex w-fit rounded-[8px] border px-3 py-1 text-xs font-black ${chipClass}`}>
                  {contour.title}
                </span>
                <span className={`mt-5 block h-1.5 w-16 rounded-full ${markerClass}`} aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black leading-tight text-[color:var(--text-primary)]">{card.routeLabel}</h3>
                <dl className="mt-5 grid gap-4 text-sm leading-7">
                  <div>
                    <dt className="font-black text-[color:var(--text-primary)]">Input needed</dt>
                    <dd className="mt-1 text-[color:var(--text-secondary)]">{card.inputNeeded}</dd>
                  </div>
                  <div>
                    <dt className="font-black text-[color:var(--text-primary)]">Safe next step</dt>
                    <dd className="mt-1 text-[color:var(--text-secondary)]">{card.safeNextStep}</dd>
                  </div>
                </dl>
                <a
                  href="#proof-boundary"
                  data-proof-only="true"
                  className="mt-auto inline-flex min-h-11 w-fit items-center pt-6 text-sm font-black text-[color:var(--blue)] transition hover:text-[color:var(--surface-dark-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
                >
                  {card.proofCta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
