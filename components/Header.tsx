"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { TrackedAction } from "@/components/tracking/TrackedAction";
import { homeNavigation } from "@/lib/home/home-page-data";
import { site } from "@/lib/content";

function isCurrentPath(pathname: string, href: string) {
  if (href === "/#documents") {
    return false;
  }

  return pathname === href || pathname === href.replace(/\/$/, "");
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-3 z-50 px-4">
      <a
        href="#main-content"
        className="absolute left-4 top-0 -translate-y-24 rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-3 text-sm font-semibold text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)] transition focus:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
      >
        Перейти к содержанию
      </a>

      <div className="mx-auto w-[min(100%-24px,1480px)]">
        <div className="dark-glass-card grid min-h-[76px] grid-cols-[1fr_auto] items-center gap-4 rounded-[8px] px-4 py-3 lg:grid-cols-[minmax(220px,auto)_1fr_auto]">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
            aria-label={`${site.name} - на главную`}
          >
            <BrandLogo className="size-12" />
            <span className="min-w-0">
              <strong className="block whitespace-nowrap text-[0.8rem] font-semibold leading-tight text-[color:var(--text-inverse)] sm:text-[0.98rem]">
                {site.name}
              </strong>
              <small className="mt-1 hidden truncate text-[0.74rem] font-semibold text-[color:var(--text-inverse-soft)] sm:block">
                {site.category}
              </small>
            </span>
          </Link>

          <nav className="hidden justify-self-center lg:block" aria-label="Основная навигация">
            <ul className="flex items-center gap-1 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.06)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              {homeNavigation.map((item) => {
                const current = isCurrentPath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={`flex min-h-10 items-center rounded-[6px] px-2.5 text-[0.84rem] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)] xl:px-3 ${
                        current ? "bg-[rgba(159,203,22,0.16)] text-[color:var(--text-inverse)] shadow-[inset_0_0_0_1px_rgba(159,203,22,0.24)]" : "text-[color:var(--text-inverse-muted)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[color:var(--text-inverse)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 2xl:flex">
            <TrackedAction
              href="/razbor-situacii/"
              className="dark-glass-cta inline-flex min-h-11 items-center justify-center rounded-[8px] px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
              pageSlug="global"
              pageType="global"
              ctaLabel="Разобрать ситуацию"
              ctaLocation="header"
              leadTopic="first_step"
              collectorType="situation_review"
            >
              Разобрать ситуацию
            </TrackedAction>
            <TrackedAction
              href={site.phoneHref}
              className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-semibold text-[color:var(--text-inverse)] transition hover:-translate-y-0.5 hover:border-[rgba(159,203,22,0.28)] hover:bg-[rgba(255,255,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
              pageSlug="global"
              pageType="global"
              ctaLabel="Позвонить"
              ctaLocation="header"
              leadTopic="phone_contact"
              collectorType="phone"
              contactChannel="phone"
            >
              {site.phone}
            </TrackedAction>
          </div>

          <details className="group justify-self-end lg:hidden">
            <summary className="grid size-12 cursor-pointer place-items-center rounded-[8px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] text-[color:var(--text-inverse)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-[rgba(159,203,22,0.28)] hover:bg-[rgba(255,255,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]">
              <span className="sr-only">Открыть навигацию</span>
              <BrandIcon name="route" size={24} />
            </summary>
            <div className="dark-glass-card fixed left-4 right-4 top-[92px] grid gap-3 rounded-[8px] p-4">
              <nav aria-label="Мобильная навигация">
                <ul className="grid gap-2">
                  {homeNavigation.map((item) => {
                    const current = isCurrentPath(pathname, item.href);

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={current ? "page" : undefined}
                          className={`block rounded-[8px] px-4 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)] ${
                            current ? "bg-[rgba(159,203,22,0.16)] text-[color:var(--text-inverse)]" : "text-[color:var(--text-inverse-muted)] hover:bg-[rgba(255,255,255,0.08)] hover:text-[color:var(--text-inverse)]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="grid gap-2 border-t border-[var(--border-dark-soft)] pt-3 sm:grid-cols-2">
                <TrackedAction
                  href="/razbor-situacii/"
                  className="dark-glass-cta rounded-[8px] px-4 py-3 text-center font-semibold"
                  pageSlug="global"
                  pageType="global"
                  ctaLabel="Разобрать ситуацию"
                  ctaLocation="mobile_header"
                  leadTopic="first_step"
                  collectorType="situation_review"
                >
                  Разобрать ситуацию
                </TrackedAction>
                <TrackedAction
                  href={site.phoneHref}
                  className="rounded-[8px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-center font-semibold text-[color:var(--text-inverse)]"
                  pageSlug="global"
                  pageType="global"
                  ctaLabel="Позвонить"
                  ctaLocation="mobile_header"
                  leadTopic="phone_contact"
                  collectorType="phone"
                  contactChannel="phone"
                >
                  {site.phone}
                </TrackedAction>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
