import { BrandIcon } from "@/components/brand/BrandIcon";
import { visualDetailRoute } from "@/lib/visual-detail-kit/visual-detail-kit-data";

const boundaries = [
  "noindex / nofollow metadata",
  "not linked from public navigation",
  "not added to sitemap or route registry",
  "no production homepage build in Stage11A",
  "no public release, ads, prices or CRM automation",
  "tokens, package dependencies and fonts stay unchanged"
];

export function VisualDetailHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface-dark)] pt-36 text-[color:var(--text-inverse)]">
      <div className="absolute inset-0 opacity-50" aria-hidden="true" style={{ backgroundImage: "var(--route-gradient)" }} />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(17,24,33,0.96),rgba(17,24,33,0.84)_48%,rgba(22,40,68,0.92))]" aria-hidden="true" />
      <div className="container-premium relative grid min-h-[760px] gap-10 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="reveal-block" data-reveal="left">
          <p className="inline-flex max-w-full rounded-[8px] border border-[var(--border-dark-subtle)] bg-[var(--surface-dark-subtle)] px-4 py-2 text-left text-xs font-black uppercase leading-5 tracking-[0.12em] text-[color:var(--lime-signal)] sm:leading-none sm:tracking-[0.18em]">
            {visualDetailRoute.label}
          </p>
          <h1 className="mt-7 max-w-4xl text-[2.65rem] font-black leading-[0.98] tracking-normal text-[color:var(--text-inverse)] md:text-7xl">
            Stage11A visual detail kit for production pages
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--text-inverse-muted)] md:text-xl md:leading-9">
            Internal proof route for icons, badges, backgrounds, typography, microdetails, header, footer, block elements and banner references before any production homepage build.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#decision-panel" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[var(--lime-signal)] px-5 py-3 text-sm font-black text-[color:var(--lime-text)] shadow-[var(--shadow-signal)] transition hover:-translate-y-0.5 hover:bg-[var(--lime-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]">
              <BrandIcon name="route" size={20} />
              Review reuse rules
            </a>
            <a href="#icon-system" className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--border-dark-subtle)] bg-[var(--surface-dark-subtle)] px-5 py-3 text-sm font-black text-[color:var(--text-inverse)] transition hover:bg-[var(--surface-dark-subtle-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]">
              See detail system
            </a>
          </div>
          <p className="mt-5 text-sm leading-7 text-[color:var(--text-inverse-soft)]">
            Internal route only. Public release remains HOLD. Production homepage build is not started here.
          </p>
        </div>

        <div className="reveal-block rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] p-4 shadow-[var(--shadow-glass)] backdrop-blur" data-reveal="right">
          <div className="rounded-[8px] bg-[var(--surface-raised)] p-5 text-[color:var(--text-primary)]">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[color:var(--blue)]">Stage11A boundaries</p>
            <ul className="mt-5 grid gap-3">
              {boundaries.map((item) => (
                <li key={item} className="flex gap-3 rounded-[8px] border border-[var(--line)] bg-[var(--surface-light)] p-3 text-sm leading-6 text-[color:var(--text-secondary)]">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-[6px] bg-[var(--lime-signal)] text-[color:var(--lime-text)]" aria-hidden="true">
                    <BrandIcon name="shield" size={16} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
