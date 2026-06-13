"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="fixed left-0 right-0 top-3 z-50 px-4">
      <a
        href="#main-content"
        className="absolute left-4 top-0 -translate-y-24 rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-3 text-sm font-black text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)] transition focus:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
      >
        Перейти к содержанию
      </a>

      <div className="container-premium">
        <div className="glass-panel grid min-h-[74px] grid-cols-[1fr_auto] items-center gap-4 rounded-[8px] px-4 py-3 backdrop-blur-2xl backdrop-saturate-150 xl:grid-cols-[auto_1fr_auto] 2xl:grid-cols-[auto_1fr_auto]">
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

          <nav className="hidden justify-self-center 2xl:block" aria-label="Основная навигация">
            <ul className="flex items-center gap-1 rounded-[8px] border border-[var(--line)] bg-white/46 p-1">
              {homeNavigation.map((item) => {
                const current = isCurrentPath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={`flex min-h-10 items-center whitespace-nowrap rounded-[6px] px-2.5 text-xs font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)] ${
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

          <div className="hidden items-center justify-self-end gap-2 xl:flex">
            <Link
              href="/razbor-situacii/"
              className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-2 text-sm font-black text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
            >
              Разобрать ситуацию
            </Link>
            <a
              href={site.phoneHref}
              className="hidden min-h-11 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-2 text-sm font-black text-[color:var(--surface-dark-strong)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)] 2xl:inline-flex"
            >
              {site.phone}
            </a>
          </div>

          <details
            className="group justify-self-end 2xl:hidden"
            open={mobileMenuOpen}
            onToggle={(event) => setMobileMenuOpen(event.currentTarget.open)}
            data-mobile-menu="true"
          >
            <summary
              className="grid size-12 cursor-pointer place-items-center rounded-[8px] bg-[var(--surface-raised)] text-[color:var(--surface-dark-strong)] shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
              aria-controls="mobile-navigation-panel"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">{mobileMenuOpen ? "Закрыть навигацию" : "Открыть навигацию"}</span>
              <BrandIcon name="route" size={24} />
            </summary>
            <div
              id="mobile-navigation-panel"
              className="fixed left-4 right-4 top-[92px] grid max-h-[calc(100svh-112px)] gap-3 overflow-y-auto overscroll-contain rounded-[8px] border border-[var(--line)] bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-panel)]"
              data-mobile-menu-panel="true"
            >
              <p className="rounded-[8px] bg-[var(--paper-soft)] px-4 py-3 text-sm font-bold leading-6 text-[color:var(--text-secondary)]">
                Если не уверены, с чего начать, откройте разбор ситуации или позвоните.
              </p>
              <nav aria-label="Мобильная навигация">
                <ul className="grid gap-2">
                  {homeNavigation.map((item) => {
                    const current = isCurrentPath(pathname, item.href);

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={current ? "page" : undefined}
                          className={`flex min-h-12 items-center rounded-[8px] px-4 py-3 font-black leading-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)] ${
                            current ? "bg-[var(--surface-raised)] text-[color:var(--surface-dark-strong)]" : "text-[color:var(--text-secondary)]"
                          }`}
                          onClick={closeMobileMenu}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="grid gap-2 border-t border-[var(--line)] pt-3 sm:grid-cols-3">
                <Link
                  href="/razbor-situacii/"
                  className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-3 text-center font-black text-[color:var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
                  onClick={closeMobileMenu}
                >
                  Разобрать ситуацию
                </Link>
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 text-center font-black text-[color:var(--surface-dark-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
                  onClick={closeMobileMenu}
                >
                  {site.phone}
                </a>
                <Link
                  href="/kontakty/"
                  className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 text-center font-black text-[color:var(--surface-dark-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
                  onClick={closeMobileMenu}
                >
                  Построить маршрут
                </Link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
