import { BrandIcon } from "@/components/brand/BrandIcon";
import type { RouteProcessSection } from "@/lib/routes/route-page-data";

type RouteProcessProps = {
  section: RouteProcessSection;
};

export function RouteProcess({ section }: RouteProcessProps) {
  return (
    <section className="section-pad bg-[var(--surface-dark)] text-[color:var(--text-inverse)]" aria-labelledby="route-process-title">
      <div className="container-premium">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="eyebrow-line text-[color:var(--text-inverse-soft)]">{section.eyebrow}</p>
            <h2 id="route-process-title" className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              {section.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[color:var(--text-inverse-muted)]">{section.text}</p>
          </div>

          <ol className="relative grid gap-4">
            <span className="absolute bottom-8 left-6 top-8 hidden w-px bg-[linear-gradient(180deg,var(--lime-signal),rgba(255,255,255,0.12))] md:block" aria-hidden="true" />
            {section.steps.map((step, index) => (
              <li
                key={step.title}
                className="relative grid gap-4 rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] p-5 shadow-[var(--shadow-cta-light)] md:grid-cols-[56px_1fr]"
              >
                <span className="grid size-12 place-items-center rounded-[8px] bg-[var(--lime-signal)] text-sm font-black text-[color:var(--lime-text)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <BrandIcon name={index === section.steps.length - 1 ? "route" : "document"} size={20} className="text-[color:var(--lime-signal)]" />
                    <h3 className="text-xl font-black leading-tight">{step.title}</h3>
                  </div>
                  <p className="mt-3 text-base leading-7 text-[color:var(--text-inverse-muted)]">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
