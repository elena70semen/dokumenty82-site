import { decisionItems, visualDetailRoute } from "@/lib/visual-detail-kit/visual-detail-kit-data";

export function VisualDetailDecisionPanel() {
  return (
    <section id="decision-panel" className="section-pad bg-[var(--surface-section-light)]" aria-labelledby="decision-panel-title">
      <div className="container-premium">
        <div className="reveal-block rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-panel)]" data-reveal="up">
          <p className="inline-flex max-w-full rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-2 text-left text-xs font-black uppercase leading-5 tracking-[0.12em] text-[color:var(--text-inverse)]">
            {visualDetailRoute.label}
          </p>
          <h2 id="decision-panel-title" className="mt-6 text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-6xl">
            Transfer rules for Stage11 production pages.
          </h2>
          <div className="mt-8 grid gap-3">
            {decisionItems.map((item) => (
              <article key={item.item} className="grid gap-3 rounded-[8px] border border-[var(--line)] bg-[var(--surface-light)] p-4 md:grid-cols-[0.35fr_0.25fr_0.4fr] md:items-center">
                <h3 className="font-black text-[color:var(--text-primary)]">{item.item}</h3>
                <p className="text-sm font-black uppercase tracking-[0.1em] text-[color:var(--blue)]">{item.decision}</p>
                <p className="text-sm leading-6 text-[color:var(--text-secondary)]">{item.condition}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 rounded-[8px] border border-[var(--accent-wine-border)] bg-[var(--accent-wine-bg)] p-4 text-sm font-black leading-7 text-[color:var(--wine)]">
            Production page build is intentionally not started in Stage11A. Public release remains HOLD.
          </p>
        </div>
      </div>
    </section>
  );
}
