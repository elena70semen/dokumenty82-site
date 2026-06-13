"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
        className="absolute left-4 top-0 -translate-y-24 rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-3 text-sm font-black text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)] transition focus:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
      >
        Перейти к содержанию
      </a>

      <div className="container-premium">
        <div className="glass-panel grid min-h-[74px] grid-cols-[1fr_auto] items-center gap-4 rounded-[8px] px-4 py-3 backdrop-blur-2xl backdrop-saturate-150 lg:grid-cols-[auto_1fr_auto]">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
            aria-label={`${site.name} - на главную`}
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-[8px] bg-[var(--surface-dark-strong)] text-sm font-black text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)]">
              ДБ
            </span>
            <span className="min-w-0">
              <strong className="block whitespace-nowrap text-[0.8rem] font-black leading-tight text-[color:var(--text-primary)] sm:text-[0.98rem]">
                {site.name}
              </strong>
              <small className="mt-1 hidden truncate text-[0.74rem] font-bold text-[color:var(--text-muted)] sm:block">
                {site.category}
              </small>
            </span>
          </Link>

          <nav className="hidden justify-self-center lg:block" aria-label="Основная навигация">
            <ul className="flex items-center gap-1 rounded-[8px] border border-[var(--line)] bg-white/46 p-1">
              {homeNavigation.map((item) => {
                const current = isCurrentPath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={`flex min-h-10 items-center rounded-[6px] px-3 text-sm font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)] ${
                        current ? "bg-[var(--surface-raised)] text-[color:var(--surface-dark-strong)] shadow-sm" : "text-[color:var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[color:var(--surface-dark-strong)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <TrackedAction
              href="/razbor-situacii/"
              className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-2 text-sm font-black text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
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
              className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-2 text-sm font-black text-[color:var(--surface-dark-strong)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
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

          <details className="group justify-self-end xl:hidden">
            <summary className="grid size-12 cursor-pointer place-items-center rounded-[8px] bg-[var(--surface-raised)] text-[color:var(--surface-dark-strong)] shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]">
              <span className="sr-only">Открыть навигацию</span>
              <BrandIcon name="route" size={24} />
            </summary>
            <div className="glass-panel fixed left-4 right-4 top-[92px] grid gap-3 rounded-[8px] p-4 backdrop-blur-2xl backdrop-saturate-150">
              <nav aria-label="Мобильная навигация">
                <ul className="grid gap-2">
                  {homeNavigation.map((item) => {
                    const current = isCurrentPath(pathname, item.href);

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={current ? "page" : undefined}
                          className={`block rounded-[8px] px-4 py-3 font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)] ${
                            current ? "bg-[var(--surface-raised)] text-[color:var(--surface-dark-strong)]" : "text-[color:var(--text-secondary)]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="grid gap-2 border-t border-[var(--line)] pt-3 sm:grid-cols-2">
                <TrackedAction
                  href="/razbor-situacii/"
                  className="rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-3 text-center font-black text-[color:var(--text-inverse)]"
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
                  className="rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 text-center font-black text-[color:var(--surface-dark-strong)]"
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
