import { GraphicsProofHero } from "@/components/graphics-proof/GraphicsProofHero";
import { GraphicsProofMaterialsStrip } from "@/components/graphics-proof/GraphicsProofMaterialsStrip";
import { GraphicsProofServiceCards } from "@/components/graphics-proof/GraphicsProofServiceCards";
import { GraphicsProofSurfaceShowcase } from "@/components/graphics-proof/GraphicsProofSurfaceShowcase";
import { proofRoute } from "@/lib/graphics-proof/graphics-proof-data";

export function GraphicsProofPage() {
  return (
    <main className="overflow-hidden">
      <GraphicsProofHero />
      <GraphicsProofSurfaceShowcase />
      <GraphicsProofServiceCards />
      <GraphicsProofMaterialsStrip />

      <section id="proof-boundary" className="section-pad bg-[var(--surface-light)]" aria-labelledby="proof-boundary-title">
        <div className="container-premium">
          <div className="reveal-block rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-8 shadow-[var(--shadow-panel)]" data-reveal="up">
            <p className="inline-flex max-w-full rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-2 text-left text-xs font-black uppercase leading-5 tracking-[0.12em] text-[color:var(--text-inverse)] sm:leading-none sm:tracking-[0.18em]">
              {proofRoute.label}
            </p>
            <h2 id="proof-boundary-title" className="display-serif mt-6 max-w-4xl text-4xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
              This is internal proof only. Public release remains HOLD.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                "No public navigation or sitemap entry.",
                "No backend, CRM automation or form submission.",
                "Commercial HOLD fields stay outside this proof."
              ].map((item) => (
                <p key={item} className="rounded-[8px] border border-[var(--line)] bg-[var(--surface-light)] p-4 text-sm leading-7 text-[color:var(--text-secondary)]">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
