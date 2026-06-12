import Link from "next/link";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { brandTokens } from "@/lib/brand/brand-tokens";
import { site } from "@/lib/content";
import type { RouteAction, RouteLocalContactConfig } from "@/lib/routes/route-page-data";

type RouteLocalContactProps = {
  contact: RouteLocalContactConfig;
};

function ContactActionLink({ action, index }: { action: RouteAction; index: number }) {
  const className =
    index === 0
      ? "inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-3 text-sm font-black text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
      : "inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 text-sm font-black text-[color:var(--surface-dark-strong)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]";

  if (action.kind === "phone" || action.href.startsWith("#")) {
    return (
      <a href={action.href} className={className}>
        {action.label}
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

export function RouteLocalContact({ contact }: RouteLocalContactProps) {
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
                      <a href={site.phoneHref} className="mt-2 inline-block text-lg font-black text-[color:var(--text-primary)]">
                        {site.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </address>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {contact.actions.map((action, index) => (
                  <ContactActionLink key={`${action.label}-${action.href}`} action={action} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
