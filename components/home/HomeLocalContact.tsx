import Link from "next/link";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { homeContact } from "@/lib/home/home-page-data";
import { brandTokens } from "@/lib/brand/brand-tokens";
import { analyticsGoalNames } from "@/lib/integrations/analytics-events";

export function HomeLocalContact() {
  return (
    <section
      className="section-pad bg-[var(--surface-raised)]"
      aria-labelledby="home-contact-title"
      style={{ backgroundImage: brandTokens.gradients.goldBridge }}
    >
      <div className="container-premium">
        <div className="overflow-hidden rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised-soft)] shadow-[var(--shadow-panel)]">
          <div className="grid gap-0 lg:grid-cols-[0.96fr_1.04fr]">
            <div className="bg-[var(--surface-dark-strong)] p-6 text-[color:var(--text-inverse)] md:p-9">
              <div className="inline-flex items-center gap-3">
                <span className="grid size-16 place-items-center rounded-[12px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark)] text-xl font-black text-[color:var(--text-inverse)]">
                  ДБ
                </span>
                <span className="text-sm font-black leading-tight text-[color:var(--text-inverse)]">Локальный офис</span>
              </div>
              <h2 id="home-contact-title" className="mt-8 text-4xl font-black leading-tight md:text-5xl">
                {homeContact.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-[color:var(--text-inverse-muted)]">{homeContact.text}</p>
            </div>

            <div className="p-6 md:p-9">
              <address className="not-italic">
                <div className="grid gap-4">
                  <div className="grid grid-cols-[48px_1fr] gap-4 rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-4">
                    <span className="grid size-12 place-items-center rounded-[8px] bg-[var(--accent-gold-bg)] text-[color:var(--accent-gold-text)]">
                      <BrandIcon name="location" size={24} />
                    </span>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.12em] text-[color:var(--text-muted)]">Адрес</p>
                      <p className="mt-2 text-lg font-black leading-snug text-[color:var(--text-primary)]">{homeContact.address}</p>
                      <p className="mt-2 text-base text-[color:var(--text-secondary)]">{homeContact.landmark}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[48px_1fr] gap-4 rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-4">
                    <span className="grid size-12 place-items-center rounded-[8px] bg-[var(--accent-navy-bg)] text-[color:var(--navy)]">
                      <BrandIcon name="phone" size={24} />
                    </span>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.12em] text-[color:var(--text-muted)]">Телефон</p>
                      <a
                        href={homeContact.phoneHref}
                        className="mt-2 inline-flex min-h-12 items-center rounded-[8px] text-lg font-black text-[color:var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
                        data-analytics-goal={analyticsGoalNames.callClick}
                        data-cta-label="Позвонить"
                        data-cta-location="home_local_contact_phone"
                        data-collector-type="phone"
                        data-lead-topic="Контакт / визит"
                        data-page-slug="home"
                        data-page-type="homepage"
                      >
                        {homeContact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </address>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {homeContact.actions.map((action, index) => {
                  const isPhone = action.href.startsWith("tel:");
                  const className =
                    index === 0
                      ? "bg-[var(--surface-dark-strong)] text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)]"
                      : "border border-[var(--line)] bg-[var(--surface-raised)] text-[color:var(--surface-dark-strong)]";

                  return isPhone ? (
                    <a
                      key={action.label}
                      href={action.href}
                      className={`inline-flex min-h-12 items-center justify-center rounded-[8px] px-4 py-3 text-sm font-black transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)] ${className}`}
                      data-analytics-goal={isPhone ? analyticsGoalNames.callClick : analyticsGoalNames.routeClick}
                      data-cta-label={action.label}
                      data-cta-location="home_local_contact_actions"
                      data-collector-type={isPhone ? "phone" : "route"}
                      data-lead-topic="Контакт / визит"
                      data-page-slug="home"
                      data-page-type="homepage"
                    >
                      {action.label}
                    </a>
                  ) : (
                    <Link
                      key={action.label}
                      href={action.href}
                      className={`inline-flex min-h-12 items-center justify-center rounded-[8px] px-4 py-3 text-sm font-black transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)] ${className}`}
                      data-analytics-goal={analyticsGoalNames.routeClick}
                      data-cta-label={action.label}
                      data-cta-location="home_local_contact_actions"
                      data-collector-type="route"
                      data-lead-topic="Контакт / визит"
                      data-page-slug="home"
                      data-page-type="homepage"
                    >
                      {action.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
