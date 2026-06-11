import { BrandIcon } from "@/components/brand/BrandIcon";
import { iconItems, iconSurfaces } from "@/lib/visual-detail-kit/visual-detail-kit-data";

const sizes = [16, 20, 24, 32] as const;

export function IconSystemShowcase() {
  return (
    <section id="icon-system" className="section-pad bg-[var(--surface-section-light)]" aria-labelledby="icon-system-title">
      <div className="container-premium">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">Icon system</p>
            <h2 id="icon-system-title" className="mt-5 text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-6xl">
              Monoline icons without a new asset family.
            </h2>
          </div>
          <p className="reveal-block text-lg leading-9 text-[color:var(--text-secondary)]" data-reveal="right">
            Stage11A uses reusable React icons with currentColor, a 24px master grid and 16/20/24/32px checks. SVG masters stay HOLD for a later asset task.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {iconItems.map((item) => (
            <article key={item.name} className="reveal-block rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card-md)]" data-reveal="up">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-[color:var(--text-primary)]">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">{item.meaning}</p>
                </div>
                <span className="grid size-12 place-items-center rounded-[8px] bg-[var(--accent-blue-bg)] text-[color:var(--blue)]" aria-hidden="true">
                  <BrandIcon name={item.name} size={24} />
                </span>
              </div>
              <div className="mt-5 flex flex-wrap items-end gap-4">
                {sizes.map((size) => (
                  <span key={size} className="grid gap-2 text-center text-xs font-bold text-[color:var(--text-muted)]">
                    <BrandIcon name={item.name} size={size} className="mx-auto text-[color:var(--text-primary)]" />
                    {size}px
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {iconSurfaces.map((surface) => (
            <div key={surface.label} className={`reveal-block rounded-[8px] border border-[var(--line)] p-4 ${surface.className}`} data-reveal="up">
              <p className="text-xs font-black uppercase tracking-[0.12em] opacity-70">{surface.label}</p>
              <div className="mt-4 flex gap-3">
                <BrandIcon name="document" />
                <BrandIcon name="route" />
                <BrandIcon name="phone" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
