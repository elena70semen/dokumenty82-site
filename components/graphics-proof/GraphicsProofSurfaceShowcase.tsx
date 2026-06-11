import { brandTokens } from "@/lib/brand/brand-tokens";
import { surfaceModes } from "@/lib/graphics-proof/graphics-proof-data";

export function GraphicsProofSurfaceShowcase() {
  return (
    <section className="section-pad bg-[var(--surface-section-light)]" aria-labelledby="surface-system-title">
      <div className="container-premium">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">Surface system</p>
            <h2 id="surface-system-title" className="display-serif mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
              Четыре режима без смены стиля.
            </h2>
          </div>
          <p className="reveal-block text-lg leading-9 text-[color:var(--text-secondary)]" data-reveal="right">
            Доказательство показывает светлый документальный режим, темную деловую поверхность, маршрутный акцент и локальный контактный блок в одной системе.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {surfaceModes.map((surface) => (
            <article
              key={surface.key}
              className={`reveal-block min-h-[300px] overflow-hidden rounded-[8px] border border-[var(--line)] p-5 shadow-[var(--shadow-card-md)] ${surface.className}`}
              data-reveal="up"
            >
              <div
                className="mb-6 h-24 rounded-[8px] border border-[var(--line)]"
                style={{
                  backgroundImage:
                    surface.key === "dark-business"
                      ? brandTokens.gradients.businessDepth
                      : surface.key === "route-ribbon"
                        ? brandTokens.gradients.routeAccent
                        : surface.key === "local-contact"
                          ? brandTokens.gradients.goldBridge
                          : `${brandTokens.gradients.paperGlow}, url(${brandTokens.assets.routeGridPattern})`,
                  backgroundSize: surface.key === "matrix-paper" ? "auto, 360px" : "cover"
                }}
                aria-hidden="true"
              />
              <h3 className="text-2xl font-black leading-tight">{surface.title}</h3>
              <p className="mt-4 text-sm leading-7 opacity-80">{surface.role}</p>
              <p className="mt-4 rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised-soft)] p-3 text-sm leading-6 text-[color:var(--text-secondary)]">
                {surface.note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
