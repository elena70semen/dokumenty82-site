import { materialAssets } from "@/lib/visual-detail-kit/visual-detail-kit-data";

export function BannerElementsShowcase() {
  return (
    <section className="section-pad bg-[var(--surface-dark)] text-[color:var(--text-inverse)]" aria-labelledby="banner-elements-title">
      <div className="container-premium">
        <div className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line text-[color:var(--text-inverse-soft)]">Banner and material elements</p>
            <h2 id="banner-elements-title" className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              Export references stay internal.
            </h2>
          </div>
          <p className="reveal-block text-lg leading-9 text-[color:var(--text-inverse-muted)]" data-reveal="right">
            Existing SVG templates can be reviewed as visual references. This route does not approve public ads, campaigns or channel launch.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {materialAssets.map((item) => (
            <article key={item.label} className="reveal-block overflow-hidden rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)]" data-reveal="up">
              <div className="grid h-44 place-items-center bg-[var(--surface-raised)] p-3">
                <img src={item.source} alt={`${item.label} internal visual reference`} className="max-h-full w-full object-contain" loading="lazy" />
              </div>
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[color:var(--lime-signal)]">{item.size}</p>
                <h3 className="mt-3 text-lg font-black">{item.label}</h3>
                <p className="mt-4 rounded-[8px] border border-[var(--border-dark-soft)] px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[color:var(--text-inverse-soft)]">{item.status}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
