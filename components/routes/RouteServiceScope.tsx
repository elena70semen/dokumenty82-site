import { BrandIcon } from "@/components/brand/BrandIcon";
import { brandTokens } from "@/lib/brand/brand-tokens";
import type { RouteScopeSection } from "@/lib/routes/route-page-data";

type RouteServiceScopeProps = {
  section: RouteScopeSection;
};

export function RouteServiceScope({ section }: RouteServiceScopeProps) {
  return (
    <section
      className="section-pad bg-[var(--surface-raised)]"
      aria-labelledby="route-scope-title"
      style={{ backgroundImage: brandTokens.gradients.paperGlow }}
    >
      <div className="container-premium">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="eyebrow-line">{section.eyebrow}</p>
            <h2 id="route-scope-title" className="mt-5 text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-6xl">
              {section.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[color:var(--text-secondary)]">{section.text}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="premium-card-strong h-full p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-[8px] bg-[var(--accent-emerald-bg)] text-[color:var(--emerald)]">
                  <BrandIcon name="folder" size={24} />
                </span>
                <h3 className="text-2xl font-black leading-tight text-[color:var(--text-primary)]">{section.includedTitle}</h3>
              </div>
              <ul className="mt-6 grid gap-3">
                {section.included.map((item) => (
                  <li key={item} className="flex min-w-0 gap-3 text-base leading-7 text-[color:var(--text-secondary)]">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[var(--emerald)]" aria-hidden="true" />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="premium-card-strong h-full p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-[8px] bg-[var(--accent-navy-bg)] text-[color:var(--navy)]">
                  <BrandIcon name="shield" size={24} />
                </span>
                <h3 className="text-2xl font-black leading-tight text-[color:var(--text-primary)]">{section.boundaryTitle}</h3>
              </div>
              <ul className="mt-6 grid gap-3">
                {section.boundaries.map((item) => (
                  <li key={item} className="flex min-w-0 gap-3 text-base leading-7 text-[color:var(--text-secondary)]">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[var(--navy)]" aria-hidden="true" />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
