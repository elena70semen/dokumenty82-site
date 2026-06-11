import { typographyRoles } from "@/lib/visual-detail-kit/visual-detail-kit-data";

export function TypographyShowcase() {
  return (
    <section className="section-pad" aria-labelledby="typography-kit-title">
      <div className="container-premium">
        <div className="grid gap-6 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">Typography roles</p>
            <h2 id="typography-kit-title" className="mt-5 text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-6xl">
              System stack now, custom fonts later.
            </h2>
          </div>
          <p className="reveal-block text-lg leading-9 text-[color:var(--text-secondary)]" data-reveal="right">
            Stage11A does not add font files. Russian text stays live, readable and responsive without viewport-only sizing or rasterized headings.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {typographyRoles.map((item) => (
            <article key={item.role} className="reveal-block rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card-sm)]" data-reveal="up">
              <div className="grid gap-4 lg:grid-cols-[0.34fr_0.66fr] lg:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[color:var(--blue)]">{item.role}</p>
                  <dl className="mt-3 grid grid-cols-2 gap-2 text-xs leading-5 text-[color:var(--text-secondary)] sm:grid-cols-4">
                    <div><dt className="font-black text-[color:var(--text-primary)]">Mobile</dt><dd>{item.mobile}</dd></div>
                    <div><dt className="font-black text-[color:var(--text-primary)]">Desktop</dt><dd>{item.desktop}</dd></div>
                    <div><dt className="font-black text-[color:var(--text-primary)]">Weight</dt><dd>{item.weight}</dd></div>
                    <div><dt className="font-black text-[color:var(--text-primary)]">Line</dt><dd>{item.line}</dd></div>
                  </dl>
                </div>
                <p className="text-2xl font-black leading-tight text-[color:var(--text-primary)] md:text-4xl">{item.sample}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
