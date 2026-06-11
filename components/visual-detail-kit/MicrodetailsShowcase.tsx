import { BrandIcon } from "@/components/brand/BrandIcon";
import { microdetails } from "@/lib/visual-detail-kit/visual-detail-kit-data";

export function MicrodetailsShowcase() {
  return (
    <section className="section-pad bg-[var(--surface-dark)] text-[color:var(--text-inverse)]" aria-labelledby="microdetails-title">
      <div className="container-premium">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line text-[color:var(--text-inverse-soft)]">Microdetails</p>
            <h2 id="microdetails-title" className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              Reusable details that make the system feel deliberate.
            </h2>
          </div>
          <p className="reveal-block text-lg leading-9 text-[color:var(--text-inverse-muted)]" data-reveal="right">
            Radius, spacing, focus and elevation are constrained. Bright accents guide action; they do not decorate everything.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="reveal-block rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] p-5" data-reveal="left">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[color:var(--lime-signal)]">Controls</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-[var(--lime-signal)] px-5 py-3 text-sm font-black text-[color:var(--lime-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]">
                <BrandIcon name="question" size={20} />
                Разобрать ситуацию
              </button>
              <button className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--border-dark-subtle)] bg-[var(--surface-dark-subtle)] px-5 py-3 text-sm font-black text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]">
                Показать документы
              </button>
              <span className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--border-dark-soft)] px-5 py-3 text-sm font-black text-[color:var(--text-inverse-soft)]">
                Disabled-looking only if static
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {microdetails.slice(0, 8).map((item) => (
                <span key={item} className="rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] px-3 py-2 text-xs font-black uppercase tracking-[0.1em] text-[color:var(--text-inverse-muted)]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="reveal-block grid gap-3" data-reveal="right">
            <div className="rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[color:var(--lime-signal)]">Process step</p>
              <div className="mt-4 grid grid-cols-[52px_1fr] gap-4">
                <span className="grid size-12 place-items-center rounded-[8px] bg-[var(--gold)] font-black text-[color:var(--text-primary)]">01</span>
                <div>
                  <h3 className="font-black">Ситуация</h3>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--text-inverse-muted)]">Смотрим вводные и не обещаем внешний результат до разбора.</p>
                </div>
              </div>
            </div>
            <div className="rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[color:var(--lime-signal)]">Document row</p>
              <div className="mt-4 flex items-center gap-4 rounded-[8px] border border-[var(--border-dark-soft)] p-4">
                <BrandIcon name="folder" size={24} />
                <div>
                  <h3 className="font-black">Комплект документов</h3>
                  <p className="text-sm text-[color:var(--text-inverse-muted)]">Abstract preview only, no client files.</p>
                </div>
              </div>
            </div>
            <a href="#decision-panel" className="rounded-[8px] border border-[var(--border-dark-subtle)] bg-[var(--surface-dark-subtle)] p-5 text-sm font-black text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]">
              Focus-visible example: 2px ring with offset
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
