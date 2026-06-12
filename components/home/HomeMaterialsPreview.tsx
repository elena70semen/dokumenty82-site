import { BrandIcon } from "@/components/brand/BrandIcon";
import { homeMaterials } from "@/lib/home/home-page-data";
import { brandTokens } from "@/lib/brand/brand-tokens";

export function HomeMaterialsPreview() {
  return (
    <section
      className="section-pad bg-[var(--paper)]"
      aria-labelledby="home-materials-title"
      style={{ backgroundImage: brandTokens.gradients.paperLight }}
    >
      <div className="container-premium grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="eyebrow-line">Документы</p>
          <h2 id="home-materials-title" className="mt-5 text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-6xl">
            Что может входить в документальный комплект
          </h2>
          <p className="mt-6 text-lg leading-9 text-[color:var(--text-secondary)]">
            На главной показываем типы материалов в общем виде. Конкретный состав зависит от ситуации и вводных.
          </p>

          <div className="mt-8 rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised-soft)] p-5 shadow-[var(--shadow-card-sm)]">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-[8px] bg-[var(--accent-blue-bg)] text-[color:var(--blue)]">
                <BrandIcon name="shield" size={24} />
              </span>
              <p className="text-sm font-bold leading-6 text-[color:var(--text-secondary)]">
                Без реальных сканов, персональных данных и имитации чужих форм.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {homeMaterials.map((material, index) => (
            <article
              key={material.title}
              className="grid min-w-0 grid-cols-[48px_1fr] items-start gap-4 rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised-soft)] p-4 shadow-[var(--shadow-card-sm)] sm:grid-cols-[56px_1fr]"
            >
              <span className="grid size-12 place-items-center rounded-[8px] border border-[var(--accent-emerald-border)] bg-[var(--accent-emerald-bg)] text-[color:var(--emerald)]">
                <BrandIcon name={material.icon} size={24} />
              </span>
              <div className="min-w-0">
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <h3 className="text-lg font-black leading-tight text-[color:var(--text-primary)]">{material.title}</h3>
                  <span className="text-xs font-black text-[color:var(--text-muted)]">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">{material.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
