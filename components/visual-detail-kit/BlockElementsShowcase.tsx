import { BrandIcon } from "@/components/brand/BrandIcon";
import { blockElements } from "@/lib/visual-detail-kit/visual-detail-kit-data";
import { site } from "@/lib/content";

export function BlockElementsShowcase() {
  return (
    <section className="section-pad" aria-labelledby="block-elements-title">
      <div className="container-premium">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">Home block element kit</p>
            <h2 id="block-elements-title" className="mt-5 text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-6xl">
              Production building blocks, not a homepage build.
            </h2>
          </div>
          <p className="reveal-block text-lg leading-9 text-[color:var(--text-secondary)]" data-reveal="right">
            Elements are reviewed before Stage11 production homepage work. Each item records whether it can move to production, needs rewrite, or stays internal.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal-block rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-panel)]" data-reveal="left">
            <p className="inline-flex rounded-[8px] border border-[var(--accent-blue-border)] bg-[var(--accent-blue-bg)] px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[color:var(--blue)]">
              {site.landmark}
            </p>
            <h3 className="mt-5 max-w-2xl text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-5xl">Разберем ситуацию и подготовим документы</h3>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--text-secondary)]">Hero title cluster, local marker, CTA pair and process cue. Public copy still requires route review.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <span className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-5 py-3 text-sm font-black text-[color:var(--text-inverse)]">Разобрать ситуацию</span>
              <span className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised-soft)] px-5 py-3 text-sm font-black text-[color:var(--surface-dark-strong)]">Показать документы</span>
            </div>
          </div>

          <div className="grid gap-3">
            {blockElements.slice(0, 6).map((item) => (
              <article key={item.name} className="reveal-block rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-4 shadow-[var(--shadow-card-sm)]" data-reveal="right">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-[var(--accent-emerald-bg)] text-[color:var(--emerald)]"><BrandIcon name="document" size={20} /></span>
                  <div>
                    <h3 className="font-black text-[color:var(--text-primary)]">{item.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-[color:var(--text-secondary)]">Reusable for production: <strong>{item.reuse}</strong>. {item.note}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {blockElements.slice(6).map((item) => (
            <article key={item.name} className="reveal-block rounded-[8px] border border-[var(--line)] bg-[var(--surface-light)] p-4" data-reveal="up">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[color:var(--blue)]">{item.reuse}</p>
              <h3 className="mt-2 font-black text-[color:var(--text-primary)]">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
