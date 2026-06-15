import { BrandIcon } from "@/components/brand/BrandIcon";
import { homeMaterials } from "@/lib/home/home-page-data";

export function HomeMaterialsPreview() {
  return (
    <section
      className="section-pad dimmed-page-section"
      aria-labelledby="home-materials-title"
    >
      <div className="container-premium grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="eyebrow-line">Документы</p>
          <h2 id="home-materials-title" className="mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-inverse)] md:text-6xl">
            Что может входить в документальный комплект
          </h2>
          <p className="mt-6 text-lg leading-9 text-[color:var(--text-inverse-muted)]">
            На главной показываем типы материалов в общем виде. Конкретный состав зависит от ситуации и вводных.
          </p>

          <div className="mt-8 overflow-hidden rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(10,16,26,0.62)] p-5 text-[color:var(--text-inverse)] shadow-[0_18px_54px_rgba(0,0,0,0.22)] backdrop-blur-[16px]">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-[8px] border border-[rgba(159,203,22,0.18)] bg-[rgba(255,255,255,0.07)] text-[color:var(--lime-signal)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <BrandIcon name="shield" size={24} />
              </span>
              <p className="text-sm font-semibold leading-6 text-[color:var(--text-inverse-muted)]">
                Без реальных сканов, персональных данных и имитации чужих форм.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {homeMaterials.map((material, index) => (
            <article
              key={material.title}
              className="relative grid min-h-[86px] grid-cols-[52px_minmax(0,1fr)] gap-4 overflow-hidden rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(10,16,26,0.62)] p-4 text-[color:var(--text-inverse)] shadow-[0_18px_54px_rgba(0,0,0,0.22)] backdrop-blur-[16px] transition hover:border-[rgba(159,203,22,0.24)] hover:bg-[rgba(14,23,34,0.72)] sm:grid-cols-[52px_minmax(0,1fr)_42px] sm:items-center"
            >
              <div className="pointer-events-none absolute inset-0 bg-[rgba(255,255,255,0.05)]" aria-hidden="true" />
              <span className="relative grid size-12 place-items-center rounded-[8px] border border-[rgba(159,203,22,0.2)] bg-[rgba(159,203,22,0.08)] text-[color:var(--lime-signal)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                <BrandIcon name={material.icon} size={24} />
              </span>
              <div className="relative min-w-0 self-center">
                <h3 className="text-lg font-semibold leading-tight text-[color:var(--text-inverse)]">{material.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text-inverse-muted)]">{material.copy}</p>
              </div>
              <span className="relative col-start-2 row-start-1 justify-self-end text-xs font-semibold text-[color:var(--text-inverse-soft)] sm:col-start-auto sm:row-start-auto sm:self-start">{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
