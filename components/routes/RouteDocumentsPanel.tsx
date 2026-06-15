import { BrandIcon } from "@/components/brand/BrandIcon";
import type { RouteListSection } from "@/lib/routes/route-page-data";

type RouteDocumentsPanelProps = {
  section: RouteListSection;
};

export function RouteDocumentsPanel({ section }: RouteDocumentsPanelProps) {
  return (
    <section
      id={section.id}
      className="section-pad dimmed-page-section"
      aria-labelledby="route-documents-title"
    >
      <div className="container-premium">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="eyebrow-line">{section.eyebrow}</p>
            <h2 id="route-documents-title" className="mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-inverse)] md:text-6xl">
              {section.title}
            </h2>
          </div>
          <p className="text-lg leading-9 text-[color:var(--text-inverse-muted)]">{section.text}</p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {section.items.map((item) => (
            <article key={item.title} className="dark-glass-card dark-glass-card-interactive grid min-h-[238px] grid-rows-[auto_auto_1fr] rounded-[8px] p-5">
              <div className="flex items-center gap-3">
                  <span className="dark-glass-icon">
                    <BrandIcon name={item.icon} size={24} />
                  </span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--text-inverse-soft)]">Что подготовить</span>
              </div>
              <h3 className="mt-6 min-h-[64px] text-2xl font-semibold leading-tight text-[color:var(--text-inverse)]">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--text-inverse-muted)]">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
