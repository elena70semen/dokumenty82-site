import { BrandBadge } from "@/components/brand/BrandBadge";
import { brandTokens } from "@/lib/brand/brand-tokens";
import type { RouteListSection } from "@/lib/routes/route-page-data";

type RouteDocumentsPanelProps = {
  section: RouteListSection;
};

export function RouteDocumentsPanel({ section }: RouteDocumentsPanelProps) {
  return (
    <section
      id={section.id}
      className="section-pad bg-[var(--surface-raised)]"
      aria-labelledby="route-documents-title"
      style={{ backgroundImage: brandTokens.gradients.paperLight }}
    >
      <div className="container-premium">
        <div className="section-heading-grid">
          <div>
            <p className="eyebrow-line">{section.eyebrow}</p>
            <h2 id="route-documents-title" className="mt-5 text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-6xl">
              {section.title}
            </h2>
          </div>
          <p className="section-copy">{section.text}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {section.items.map((item) => (
            <article key={item.title} className="premium-card flex min-w-0 flex-col p-5 md:min-h-[236px]">
              <BrandBadge kind={item.badgeKind} label="Материал" icon={item.icon} size={48} />
              <h3 className="mt-6 text-2xl font-black leading-tight text-[color:var(--text-primary)]">{item.title}</h3>
              <p className="mt-4 flex-1 text-base leading-7 text-[color:var(--text-secondary)]">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
