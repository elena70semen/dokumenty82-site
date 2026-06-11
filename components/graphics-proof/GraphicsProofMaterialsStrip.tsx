import { materialMappings } from "@/lib/graphics-proof/graphics-proof-data";

export function GraphicsProofMaterialsStrip() {
  return (
    <section id="materials-map" className="section-pad bg-[var(--surface-dark)] text-[color:var(--text-inverse)]" aria-labelledby="materials-map-title">
      <div className="container-premium">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line text-[color:var(--text-inverse-soft)]">Materials map</p>
            <h2 id="materials-map-title" className="display-serif mt-5 text-4xl font-semibold leading-tight md:text-6xl">
              От сайта до материалов без нового стиля.
            </h2>
          </div>
          <p className="reveal-block text-lg leading-9 text-[color:var(--text-inverse-muted)]" data-reveal="right">
            Stage 09 связывает утвержденную внутреннюю графику с реальными форматами: site block, ad mock, story, slide and local contact.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {materialMappings.map((item) => (
            <article key={item.title} className="reveal-block overflow-hidden rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)]" data-reveal="up">
              <div className="grid h-44 place-items-center bg-[var(--surface-raised)] p-3">
                <img src={item.source} alt={`${item.assetLabel} internal preview source`} className="max-h-full w-full object-contain" loading="lazy" />
              </div>
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--lime-signal)]">{item.title}</p>
                <h3 className="mt-3 text-lg font-black leading-tight">{item.assetLabel}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-inverse-muted)]">{item.use}</p>
                <p className="mt-4 rounded-[8px] border border-[var(--border-dark-soft)] px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[color:var(--text-inverse-soft)]">
                  {item.status}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
