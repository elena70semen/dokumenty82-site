import { brandTokens } from "@/lib/brand/brand-tokens";
import { proofChecks, proofRoute } from "@/lib/graphics-proof/graphics-proof-data";

export function GraphicsProofHero() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--surface-dark)] pt-36 text-[color:var(--text-inverse)]"
      style={{
        backgroundImage: `${brandTokens.gradients.businessDepth}, url(${brandTokens.assets.routeGridPattern})`,
        backgroundSize: "auto, 620px",
        backgroundPosition: "center, right top"
      }}
    >
      <div className="container-premium grid min-h-[760px] gap-10 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="reveal-block" data-reveal="left">
          <p className="inline-flex max-w-full rounded-[8px] border border-[var(--border-dark-subtle)] bg-[var(--surface-dark-subtle)] px-4 py-2 text-left text-xs font-black uppercase leading-5 tracking-[0.12em] text-[color:var(--lime-signal)] sm:leading-none sm:tracking-[0.18em]">
            {proofRoute.label}
          </p>
          <h1 className="display-serif mt-7 max-w-4xl text-[2.65rem] font-semibold leading-[0.98] md:text-7xl">
            Internal graphics applied to real site HTML
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--text-inverse-muted)] md:text-xl md:leading-9">
            Stage 09 проверяет, как утвержденная внутренняя графическая база работает в hero, surface system,
            service cards и production materials без публичного запуска.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#proof-boundary"
              data-proof-only="true"
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--lime-signal)] px-5 py-3 text-sm font-black text-[color:var(--lime-text)] shadow-[var(--shadow-signal)] transition hover:-translate-y-0.5 hover:bg-[var(--lime-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
            >
              Разобрать ситуацию
            </a>
            <a
              href="#materials-map"
              data-proof-only="true"
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--border-dark-subtle)] bg-[var(--surface-dark-subtle)] px-5 py-3 text-sm font-black text-[color:var(--text-inverse)] transition hover:bg-[var(--surface-dark-subtle-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
            >
              Показать документы
            </a>
          </div>
          <p className="mt-5 text-sm leading-7 text-[color:var(--text-inverse-soft)]">
            Proof-only labels. No backend calls, no public approval, no sitemap entry.
          </p>
        </div>

        <div className="reveal-block rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] p-4 shadow-[var(--shadow-glass)] backdrop-blur" data-reveal="right">
          <div className="rounded-[8px] bg-[var(--surface-raised)] p-5 text-[color:var(--text-primary)]">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[color:var(--blue)]">
              Stage 09 boundaries
            </p>
            <ul className="mt-5 grid gap-3">
              {proofChecks.map((check) => (
                <li key={check} className="flex gap-3 rounded-[8px] border border-[var(--line)] bg-[var(--surface-light)] p-3 text-sm leading-6 text-[color:var(--text-secondary)]">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-[var(--lime-signal)]" aria-hidden="true" />
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
