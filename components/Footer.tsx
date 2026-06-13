import Link from "next/link";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { homeFooter } from "@/lib/home/home-page-data";

export function Footer() {
  return (
    <footer className="bg-[var(--surface-dark)] py-12 text-[color:var(--text-inverse)]">
      <div className="container-premium grid gap-6 lg:grid-cols-[1.1fr_0.88fr_1.02fr]">
        <div className="min-w-0">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
          >
            <span className="grid size-12 place-items-center rounded-[8px] bg-[var(--lime-signal)] font-black text-[color:var(--lime-text)]">
              ДБ
            </span>
            <span>
              <strong className="block leading-tight">{homeFooter.brand}</strong>
              <small className="text-[color:var(--text-inverse-soft)]">{homeFooter.category}</small>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[color:var(--text-inverse-muted)]">
            Разберём ситуацию и подготовим документы. Спокойный первый шаг для предпринимателей и компаний в Симферополе.
          </p>
        </div>

        <nav className="rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] p-5 text-sm text-[color:var(--text-inverse-muted)]" aria-label="Служебная навигация">
          <strong className="mb-4 block text-[color:var(--text-inverse)]">Маршруты</strong>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {homeFooter.routes.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-10 min-w-0 items-center rounded-[8px] px-3 py-2 leading-tight transition hover:bg-[var(--surface-dark-subtle-hover)] hover:text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/policy"
              className="inline-flex min-h-10 min-w-0 items-center rounded-[8px] px-3 py-2 leading-tight transition hover:bg-[var(--surface-dark-subtle-hover)] hover:text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </nav>

        <div className="rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] p-5 text-sm leading-7 text-[color:var(--text-inverse-muted)]">
          <strong className="mb-3 block text-[color:var(--text-inverse)]">Контакты</strong>
          <address className="not-italic">
            <p>{homeFooter.address}</p>
            <p>{homeFooter.landmark}</p>
            <p>
              <a
                href={homeFooter.phoneHref}
                className="inline-flex min-h-10 items-center gap-2 rounded-[8px] text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
              >
                <BrandIcon name="phone" size={16} />
                {homeFooter.phone}
              </a>
            </p>
          </address>
          <p className="mt-3 text-xs font-bold leading-6 text-[color:var(--text-inverse-soft)]">
            Если вопрос не разложен, начните с разбора ситуации. Документы показываются только согласованным способом.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <a
              href={homeFooter.phoneHref}
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--lime-signal)] px-4 py-2 text-sm font-black text-[color:var(--lime-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
            >
              Позвонить
            </a>
            <Link
              href="/kontakty/"
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--border-dark-soft)] px-4 py-2 text-sm font-black text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
            >
              Построить маршрут
            </Link>
            <Link
              href="/razbor-situacii/"
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--border-dark-soft)] px-4 py-2 text-sm font-black text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
            >
              Разобрать ситуацию
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
