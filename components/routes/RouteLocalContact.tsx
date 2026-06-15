import { BrandLogo } from "@/components/BrandLogo";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { TrackedAction } from "@/components/tracking/TrackedAction";
import { site } from "@/lib/content";
import type { RouteAction, RouteLocalContactConfig } from "@/lib/routes/route-page-data";
import type { CollectorType } from "@/lib/tracking/event-context";

type RouteLocalContactProps = {
  contact: RouteLocalContactConfig;
  pageSlug: string;
  pageType: string;
};

function collectorTypeForAction(action: RouteAction): CollectorType {
  if (action.kind === "phone") return "phone";
  if (action.label === "Показать документы") return "show_documents";
  if (action.label === "Построить маршрут" || action.href.includes("route-contact")) return "route";
  return "situation_review";
}

function ContactActionLink({ action, index, pageSlug, pageType }: { action: RouteAction; index: number; pageSlug: string; pageType: string }) {
  const className =
    index === 0
      ? "dark-glass-cta inline-flex min-h-12 items-center justify-center rounded-[8px] px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
      : "inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-sm font-semibold text-[color:var(--text-inverse)] transition hover:-translate-y-0.5 hover:border-[rgba(159,203,22,0.28)] hover:bg-[rgba(255,255,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]";
  const collectorType = collectorTypeForAction(action);

  return (
    <TrackedAction
      href={action.href}
      className={className}
      pageSlug={pageSlug}
      pageType={pageType}
      ctaLabel={action.label}
      ctaLocation="local_contact"
      leadTopic={pageSlug}
      collectorType={collectorType}
      contactChannel={collectorType === "phone" ? "phone" : collectorType === "route" ? "office" : undefined}
    >
      {action.label}
    </TrackedAction>
  );
}

export function RouteLocalContact({ contact, pageSlug, pageType }: RouteLocalContactProps) {
  return (
    <section
      id="route-contact"
      className="section-pad dimmed-page-section"
      aria-labelledby="route-contact-title"
    >
      <div className="container-premium">
        <div className="dark-glass-card overflow-hidden rounded-[8px]">
          <div className="grid gap-0 lg:grid-cols-[0.96fr_1.04fr]">
            <div className="bg-[rgba(8,13,22,0.26)] p-6 text-[color:var(--text-inverse)] md:p-9">
              <div className="inline-flex items-center gap-3">
                <BrandLogo className="size-16" />
                <span className="text-sm font-semibold leading-tight text-[color:var(--text-inverse)]">Локальный офис</span>
              </div>
              <h2 id="route-contact-title" className="mt-8 text-4xl font-semibold leading-tight md:text-5xl">
                {contact.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-[color:var(--text-inverse-muted)]">{contact.text}</p>
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
                      <p className="mt-2 text-lg font-semibold leading-snug text-[color:var(--text-inverse)]">{site.address}</p>
                      <p className="mt-2 text-base text-[color:var(--text-inverse-muted)]">{site.landmark}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[48px_1fr] gap-4 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.08)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <span className="dark-glass-icon">
                      <BrandIcon name="phone" size={24} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--text-inverse-soft)]">Телефон</p>
                      <TrackedAction
                        href={site.phoneHref}
                        className="mt-2 inline-block text-lg font-semibold text-[color:var(--text-inverse)]"
                        pageSlug={pageSlug}
                        pageType={pageType}
                        ctaLabel="Позвонить"
                        ctaLocation="local_contact_phone"
                        leadTopic={pageSlug}
                        collectorType="phone"
                        contactChannel="phone"
                      >
                        {site.phone}
                      </TrackedAction>
                    </div>
                  </div>
                </div>
              </address>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {contact.actions.map((action, index) => (
                  <ContactActionLink key={`${action.label}-${action.href}`} action={action} index={index} pageSlug={pageSlug} pageType={pageType} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
