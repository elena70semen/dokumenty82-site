import { BrandIcon } from "@/components/brand/BrandIcon";
import type { RouteScopeSection } from "@/lib/routes/route-page-data";

type RouteServiceScopeProps = {
  section: RouteScopeSection;
};

export function RouteServiceScope({ section }: RouteServiceScopeProps) {
  return (
    <section
      className="section-pad dimmed-page-section"
      aria-labelledby="route-scope-title"
    >
      <div className="container-premium">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="eyebrow-line">{section.eyebrow}</p>
            <h2 id="route-scope-title" className="mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-inverse)] md:text-6xl">
              {section.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[color:var(--text-inverse-muted)]">{section.text}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="dark-glass-card rounded-[8px] p-6">
              <div className="flex items-center gap-3">
                <span className="dark-glass-icon">
                  <BrandIcon name="folder" size={24} />
                </span>
                <h3 className="text-2xl font-semibold leading-tight text-[color:var(--text-inverse)]">{section.includedTitle}</h3>
              </div>
              <ul className="mt-6 grid gap-3">
                {section.included.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-[color:var(--text-inverse-muted)]">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[var(--lime-signal)]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="dark-glass-card rounded-[8px] p-6">
              <div className="flex items-center gap-3">
                <span className="dark-glass-icon">
                  <BrandIcon name="shield" size={24} />
                </span>
                <h3 className="text-2xl font-semibold leading-tight text-[color:var(--text-inverse)]">{section.boundaryTitle}</h3>
              </div>
              <ul className="mt-6 grid gap-3">
                {section.boundaries.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-[color:var(--text-inverse-muted)]">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[var(--lime-signal)]" aria-hidden="true" />
                    <span>{item}</span>
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
