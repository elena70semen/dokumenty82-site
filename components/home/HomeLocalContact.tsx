import { BrandLogo } from "@/components/BrandLogo";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { TrackedAction } from "@/components/tracking/TrackedAction";
import { homeContact } from "@/lib/home/home-page-data";

export function HomeLocalContact() {
  return (
    <section
      className="section-pad dimmed-page-section"
      aria-labelledby="home-contact-title"
    >
      <div className="container-premium">
        <div className="dark-glass-card overflow-hidden rounded-[8px]">
          <div className="grid gap-0 lg:grid-cols-[0.96fr_1.04fr]">
            <div className="bg-[rgba(8,13,22,0.26)] p-6 text-[color:var(--text-inverse)] md:p-9">
              <div className="inline-flex items-center gap-3">
                <BrandLogo className="size-16" />
                <span className="text-sm font-semibold leading-tight text-[color:var(--text-inverse)]">Локальный офис</span>
              </div>
              <h2 id="home-contact-title" className="mt-8 text-4xl font-semibold leading-tight md:text-5xl">
                {homeContact.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-[color:var(--text-inverse-muted)]">{homeContact.text}</p>
            </div>

            <div className="p-6 md:p-9">
              <address className="not-italic">
                <div className="grid gap-4">
                  <div className="grid grid-cols-[48px_1fr] gap-4 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.08)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <span className="dark-glass-icon">
                      <BrandIcon name="location" size={24} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--text-inverse-soft)]">Адрес</p>
                      <p className="mt-2 text-lg font-semibold leading-snug text-[color:var(--text-inverse)]">{homeContact.address}</p>
                      <p className="mt-2 text-base text-[color:var(--text-inverse-muted)]">{homeContact.landmark}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[48px_1fr] gap-4 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.08)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <span className="dark-glass-icon">
                      <BrandIcon name="phone" size={24} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--text-inverse-soft)]">Телефон</p>
                      <TrackedAction
                        href={homeContact.phoneHref}
                        className="mt-2 inline-block text-lg font-semibold text-[color:var(--text-inverse)]"
                        pageSlug="home"
                        pageType="home"
                        ctaLabel="Позвонить"
                        ctaLocation="home_contact_phone"
                        leadTopic="phone_contact"
                        collectorType="phone"
                        contactChannel="phone"
                      >
                        {homeContact.phone}
                      </TrackedAction>
                    </div>
                  </div>
                </div>
              </address>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {homeContact.actions.map((action, index) => {
                  const isPhone = action.href.startsWith("tel:");
                  const collectorType = isPhone ? "phone" : action.label === "Построить маршрут" ? "route" : "situation_review";
                  const className =
                    index === 0
                      ? "dark-glass-cta"
                      : "border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] text-[color:var(--text-inverse)] hover:border-[rgba(159,203,22,0.28)] hover:bg-[rgba(255,255,255,0.12)]";

                  return (
                    <TrackedAction
                      key={action.label}
                      href={action.href}
                      className={`inline-flex min-h-12 items-center justify-center rounded-[8px] px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)] ${className}`}
                      pageSlug="home"
                      pageType="home"
                      ctaLabel={action.label}
                      ctaLocation="home_contact_cta"
                      leadTopic={isPhone ? "phone_contact" : action.label === "Построить маршрут" ? "office_route" : "first_step"}
                      collectorType={collectorType}
                      contactChannel={isPhone ? "phone" : action.label === "Построить маршрут" ? "office" : undefined}
                    >
                      {action.label}
                    </TrackedAction>
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
