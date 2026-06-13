import Link from "next/link";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { TrackedAction } from "@/components/tracking/TrackedAction";
import { homeFooter } from "@/lib/home/home-page-data";

export function Footer() {
  return (
    <footer className="bg-[var(--surface-dark)] py-12 text-[color:var(--text-inverse)]">
      <div className="container-premium grid gap-9 lg:grid-cols-[1.1fr_0.88fr_1.02fr]">
        <div>
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

        <nav className="grid gap-2 text-sm text-[color:var(--text-inverse-muted)]" aria-label="Служебная навигация">
          <strong className="mb-2 text-[color:var(--text-inverse)]">Маршруты</strong>
          {homeFooter.routes.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/policy"
            className="transition hover:text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
          >
            Политика конфиденциальности
          </Link>
        </nav>

        <div className="text-sm leading-7 text-[color:var(--text-inverse-muted)]">
          <strong className="mb-3 block text-[color:var(--text-inverse)]">Контакты</strong>
          <address className="not-italic">
            <p>{homeFooter.address}</p>
            <p>{homeFooter.landmark}</p>
            <p>
              <TrackedAction
                href={homeFooter.phoneHref}
                className="inline-flex items-center gap-2 text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
                pageSlug="global"
                pageType="global"
                ctaLabel="Позвонить"
                ctaLocation="footer_address"
                leadTopic="phone_contact"
                collectorType="phone"
                contactChannel="phone"
              >
                <BrandIcon name="phone" size={16} />
                {homeFooter.phone}
              </TrackedAction>
            </p>
          </address>
          <div className="mt-4 flex flex-wrap gap-2">
            <TrackedAction
              href={homeFooter.phoneHref}
              className="rounded-[8px] bg-[var(--lime-signal)] px-4 py-2 text-sm font-black text-[color:var(--lime-text)]"
              pageSlug="global"
              pageType="global"
              ctaLabel="Позвонить"
              ctaLocation="footer_cta"
              leadTopic="phone_contact"
              collectorType="phone"
              contactChannel="phone"
            >
              Позвонить
            </TrackedAction>
            <TrackedAction
              href="/kontakty/"
              className="rounded-[8px] border border-[var(--border-dark-soft)] px-4 py-2 text-sm font-black text-[color:var(--text-inverse)]"
              pageSlug="global"
              pageType="global"
              ctaLabel="Построить маршрут"
              ctaLocation="footer_cta"
              leadTopic="office_route"
              collectorType="route"
              contactChannel="office"
            >
              Построить маршрут
            </TrackedAction>
          </div>
        </div>
      </div>
    </footer>
  );
}
