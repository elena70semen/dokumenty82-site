import Link from "next/link";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { homeFooter } from "@/lib/home/home-page-data";

export function Footer() {
  return (
    <footer className="bg-[var(--surface-dark)] py-12 text-[color:var(--text-inverse)]">
      <div className="container-premium grid gap-9 lg:grid-cols-[1.1fr_0.88fr_1.02fr]">
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

        <nav className="text-sm text-[color:var(--text-inverse-muted)]" aria-label="Служебная навигация">
          <strong className="mb-4 block text-[color:var(--text-inverse)]">Маршруты</strong>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {homeFooter.routes.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[8px] py-1 transition hover:text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/policy"
              className="rounded-[8px] py-1 transition hover:text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </nav>

        <div className="text-sm leading-7 text-[color:var(--text-inverse-muted)]">
          <strong className="mb-3 block text-[color:var(--text-inverse)]">Контакты</strong>
          <address className="not-italic">
            <p>{homeFooter.address}</p>
            <p>{homeFooter.landmark}</p>
            <p>
              <a
                href={homeFooter.phoneHref}
                className="inline-flex items-center gap-2 text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
              >
                <BrandIcon name="phone" size={16} />
                {homeFooter.phone}
              </a>
            </p>
          </address>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <a
              href={homeFooter.phoneHref}
              className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--lime-signal)] px-4 py-2 text-sm font-black text-[color:var(--lime-text)]"
            >
              Позвонить
            </a>
            <Link
              href="/kontakty/"
              className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--border-dark-soft)] px-4 py-2 text-sm font-black text-[color:var(--text-inverse)]"
            >
              Построить маршрут
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
