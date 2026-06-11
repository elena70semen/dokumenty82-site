import { BrandBadge } from "@/components/brand/BrandBadge";
import { badgeItems } from "@/lib/visual-detail-kit/visual-detail-kit-data";

const sizes = [40, 48, 64] as const;

export function AvatarBadgeShowcase() {
  return (
    <section className="section-pad" aria-labelledby="badge-system-title">
      <div className="container-premium">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">Avatar / badge system</p>
            <h2 id="badge-system-title" className="mt-5 text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-6xl">
              Badges by default, faces on HOLD.
            </h2>
          </div>
          <p className="reveal-block text-lg leading-9 text-[color:var(--text-secondary)]" data-reveal="right">
            Stage11A avoids real portraits, AI faces, stock people and testimonial-like imagery. Contact, office and route cues use badges and monograms.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {badgeItems.map((item) => (
            <article key={item.label} className="reveal-block rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card-md)]" data-reveal="up">
              <BrandBadge kind={item.kind} label={item.label} initials={item.initials} icon={item.icon} />
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">{item.rule}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                {sizes.map((size) => (
                  <BrandBadge key={size} kind={item.kind} label={`${size}px`} initials={item.initials} icon={item.icon} size={size} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
