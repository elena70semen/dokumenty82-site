import Link from "next/link";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { site } from "@/lib/content";

const navItems = ["Разбор ситуации", "Документы", "Отчетность", "Банк и 115-ФЗ", "Контакты"];

export function HeaderFooterShowcase() {
  return (
    <section className="section-pad bg-[var(--surface-section-light)]" aria-labelledby="header-footer-title">
      <div className="container-premium">
        <div className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">Header / footer prototypes</p>
            <h2 id="header-footer-title" className="mt-5 text-4xl font-black leading-tight text-[color:var(--text-primary)] md:text-6xl">
              Semantic navigation without a mega-menu stage.
            </h2>
          </div>
          <p className="reveal-block text-lg leading-9 text-[color:var(--text-secondary)]" data-reveal="right">
            Future header uses a normal site navigation disclosure pattern, one primary CTA and phone as secondary contact. Footer stays NAP-only.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          <div className="reveal-block rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-4 shadow-[var(--shadow-panel)]" data-reveal="up">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-[color:var(--blue)]">Desktop header prototype</p>
            <header className="grid gap-4 rounded-[8px] border border-[var(--line)] bg-[var(--surface-light)] p-4 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <Link href="#header-footer-title" className="flex min-w-0 items-center gap-3" aria-label="Prototype brand mark">
                <span className="grid size-11 shrink-0 place-items-center rounded-[8px] bg-[var(--surface-dark-strong)] text-sm font-black text-[color:var(--text-inverse)]">ДБ</span>
                <span className="min-w-0"><strong className="block truncate text-sm font-black">{site.name}</strong><small className="block truncate text-xs text-[color:var(--text-secondary)]">{site.category}</small></span>
              </Link>
              <nav className="flex flex-wrap gap-2" aria-label="Prototype primary navigation">
                {navItems.map((item, index) => (
                  <a key={item} href="#header-footer-title" aria-current={index === 0 ? "page" : undefined} className="rounded-[8px] px-3 py-2 text-sm font-black text-[color:var(--surface-dark-strong)] hover:bg-[var(--surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]">
                    {item}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-2 sm:flex-row">
                <a href="#header-footer-title" className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-2 text-sm font-black text-[color:var(--text-inverse)]">Разобрать ситуацию</a>
                <a href={site.phoneHref} className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-2 text-sm font-black text-[color:var(--surface-dark-strong)]">{site.phone}</a>
              </div>
            </header>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.62fr_1.38fr]">
            <div className="reveal-block rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card-md)]" data-reveal="left">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[color:var(--blue)]">Mobile disclosure prototype</p>
              <details className="mt-4 rounded-[8px] border border-[var(--line)] bg-[var(--surface-light)] p-4">
                <summary className="flex min-h-11 cursor-pointer items-center justify-between rounded-[8px] bg-[var(--surface-raised)] px-4 py-2 font-black text-[color:var(--surface-dark-strong)]">
                  Menu
                  <BrandIcon name="route" size={20} />
                </summary>
                <nav className="mt-3 grid gap-2" aria-label="Prototype mobile navigation">
                  {navItems.map((item) => <a key={item} href="#header-footer-title" className="rounded-[8px] px-3 py-2 font-black text-[color:var(--text-secondary)]">{item}</a>)}
                </nav>
              </details>
            </div>

            <footer className="reveal-block rounded-[8px] bg-[var(--surface-dark)] p-6 text-[color:var(--text-inverse)] shadow-[var(--shadow-card-md)]" data-reveal="right">
              <div className="grid gap-6 md:grid-cols-[1fr_0.8fr_0.8fr]">
                <div>
                  <p className="text-lg font-black">{site.name}</p>
                  <p className="mt-2 text-sm text-[color:var(--text-inverse-muted)]">{site.category}</p>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-[color:var(--text-inverse-muted)]">Footer prototype uses confirmed NAP only and keeps public release HOLD.</p>
                </div>
                <nav className="grid gap-2 text-sm" aria-label="Prototype footer routes">
                  <strong>Маршруты</strong>
                  {navItems.slice(0, 4).map((item) => <a key={item} href="#header-footer-title" className="text-[color:var(--text-inverse-muted)]">{item}</a>)}
                </nav>
                <address className="not-italic text-sm leading-7 text-[color:var(--text-inverse-muted)]">
                  <strong className="block text-[color:var(--text-inverse)]">Контакты</strong>
                  {site.address}<br />
                  {site.landmark}<br />
                  <a href={site.phoneHref} className="text-[color:var(--text-inverse)]">{site.phone}</a>
                </address>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
