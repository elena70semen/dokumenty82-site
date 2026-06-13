import Link from "next/link";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { brandTokens } from "@/lib/brand/brand-tokens";
import { site } from "@/lib/content";
import type { RouteAction, RouteLocalContactConfig } from "@/lib/routes/route-page-data";
import { analyticsGoalNames } from "@/lib/integrations/analytics-events";

type RouteLocalContactProps = {
  contact: RouteLocalContactConfig;
  pageSlug: string;
  pageType: string;
  leadTopic: string;
};

function getActionGoal(action: RouteAction) {
  if (action.kind === "phone") return analyticsGoalNames.callClick;
  if (action.label === "Показать документы") return analyticsGoalNames.docsShowClick;
  if (action.label === "Построить маршрут") return analyticsGoalNames.routeClick;
  return analyticsGoalNames.formStart;
}

function ContactActionLink({
  action,
  index,
  pageSlug,
  pageType,
  leadTopic
}: {
  action: RouteAction;
  index: number;
  pageSlug: string;
  pageType: string;
  leadTopic: string;
}) {
  const className =
    index === 0
      ? "inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-3 text-sm font-black text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
      : "inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 text-sm font-black text-[color:var(--surface-dark-strong)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]";
  const analyticsGoal = getActionGoal(action);

  if (action.kind === "phone" || action.href.startsWith("#")) {
    return (
      <a
        href={action.href}
        className={className}
        data-analytics-goal={analyticsGoal}
        data-cta-label={action.label}
        data-cta-location="route_local_contact"
        data-lead-topic={leadTopic}
        data-page-slug={pageSlug}
        data-page-type={pageType}
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link
      href={action.href}
      className={className}
      data-analytics-goal={analyticsGoal}
      data-cta-label={action.label}
      data-cta-location="route_local_contact"
      data-lead-topic={leadTopic}
      data-page-slug={pageSlug}
      data-page-type={pageType}
    >
      {action.label}
    </Link>
  );
}

export function RouteLocalContact({ contact, pageSlug, pageType, leadTopic }: RouteLocalContactProps) {
  return (
    <section
      id="route-contact"
      className="section-pad bg-[var(--surface-raised)]"
      aria-labelledby="route-contact-title"
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
              <h2 id="route-contact-title" className="mt-8 text-4xl font-black leading-tight md:text-5xl">
                {contact.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-[color:var(--text-inverse-muted)]">{contact.text}</p>
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
                      <p className="mt-2 text-lg font-black leading-snug text-[color:var(--text-primary)]">{site.address}</p>
                      <p className="mt-2 text-base text-[color:var(--text-secondary)]">{site.landmark}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[48px_1fr] gap-4 rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-4">
                    <span className="grid size-12 place-items-center rounded-[8px] bg-[var(--accent-navy-bg)] text-[color:var(--navy)]">
                      <BrandIcon name="phone" size={24} />
                    </span>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.12em] text-[color:var(--text-muted)]">Телефон</p>
                      <a
                        href={site.phoneHref}
                        className="mt-2 inline-flex min-h-12 items-center rounded-[8px] text-lg font-black text-[color:var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
                        data-analytics-goal={analyticsGoalNames.callClick}
                        data-cta-label="Позвонить"
                        data-cta-location="route_local_contact_phone"
                        data-lead-topic={leadTopic}
                        data-page-slug={pageSlug}
                        data-page-type={pageType}
                      >
                        {site.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </address>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {contact.actions.map((action, index) => (
                  <ContactActionLink key={`${action.label}-${action.href}`} action={action} index={index} pageSlug={pageSlug} pageType={pageType} leadTopic={leadTopic} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
