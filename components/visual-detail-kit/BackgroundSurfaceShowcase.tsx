import { surfaceFamilies } from "@/lib/visual-detail-kit/visual-detail-kit-data";

export function BackgroundSurfaceShowcase() {
  return (
    <section className="section-pad bg-[var(--surface-section-light)]" aria-labelledby="surface-kit-title">
      <div className="container-premium">
        <div className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">Backgrounds / surfaces</p>
            <h2 id="surface-kit-title" className="mt-5 text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-6xl">
              Eight surfaces, one restrained grammar.
            </h2>
          </div>
          <p className="reveal-block text-lg leading-9 text-[color:var(--text-secondary)]" data-reveal="right">
            Surfaces are role-based: hero, section, card, contact, document and banner-safe contexts. Fine texture never carries essential meaning.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {surfaceFamilies.map((surface) => (
            <article key={surface.key} className={`reveal-block min-h-[300px] rounded-[8px] border border-[var(--line)] p-5 shadow-[var(--shadow-card-md)] ${surface.className}`} style={surface.style} data-reveal="up">
              <p className="text-xs font-black uppercase tracking-[0.16em] opacity-70">{surface.key}</p>
              <h3 className="mt-5 text-2xl font-black leading-tight">{surface.title}</h3>
              <p className="mt-4 text-sm leading-7 opacity-85">{surface.purpose}</p>
              <p className="mt-5 rounded-[8px] border border-current/20 bg-white/10 p-3 text-sm leading-6 opacity-85">{surface.rule}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
