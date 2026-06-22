"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { site } from "@/lib/content";
import {
  analyticsGoalNames,
  trackFormStart,
  trackFormSubmitAttempt,
  trackFormSubmitFail
} from "@/lib/integrations/analytics-events";

type PlaceholderField = {
  id: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
  type?: "text" | "tel";
};

type FormPlaceholderProps = {
  eyebrow: string;
  title: string;
  text: string;
  fields: PlaceholderField[];
  pageSlug?: string;
  pageType?: string;
  leadTopic?: string;
  ctaLocation?: string;
};

const offlineNotice =
  "Онлайн-отправка пока не подключена. Чтобы передать вопрос, позвоните или согласуйте способ показа документов.";
const localMessage = "Отправка формы пока не подключена. Позвоните или перейдите на страницу контактов.";

export function FormPlaceholder({
  eyebrow,
  title,
  text,
  fields,
  pageSlug = "unknown",
  pageType = "route",
  leadTopic = "Другое / первый шаг",
  ctaLocation = "form_placeholder"
}: FormPlaceholderProps) {
  const formId = useId();
  const [message, setMessage] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const noticeId = `${formId}-notice`;
  const messageId = `${formId}-message`;
  const analyticsContext = {
    page_slug: pageSlug,
    page_type: pageType,
    lead_topic: leadTopic,
    cta_location: ctaLocation
  };

  function explainOffline() {
    setMessage(localMessage);
  }

  function startFormDraft() {
    if (hasStarted) return;

    setHasStarted(true);
    trackFormStart({
      ...analyticsContext,
      cta_label: title
    });
  }

  function submitAttemptFallback() {
    trackFormSubmitAttempt({
      ...analyticsContext,
      cta_label: title
    });
    trackFormSubmitFail({
      ...analyticsContext,
      cta_label: title,
      failure_reason: "backend_unavailable"
    });
    explainOffline();
  }

  return (
    <section className="section-pad bg-white/74" aria-labelledby={`${formId}-title`}>
      <div className="container-premium">
        <form
          className="grid gap-6 rounded-[8px] border border-[var(--line)] bg-white/90 p-6 shadow-[var(--shadow-card-lg)] md:p-8"
          data-form-placeholder="true"
          data-page-slug={pageSlug}
          data-page-type={pageType}
          data-lead-topic={leadTopic}
          onSubmit={(event) => {
            event.preventDefault();
            submitAttemptFallback();
          }}
        >
          <div className="max-w-3xl">
            <p className="eyebrow-line">{eyebrow}</p>
            <h2 id={`${formId}-title`} className="mt-5 text-3xl font-black leading-tight text-[color:var(--text-primary)] md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-8 text-[color:var(--text-secondary)]">{text}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {fields.map((field) => {
              const fieldId = `${formId}-${field.id}`;
              return (
                <label key={field.id} htmlFor={fieldId} className="grid min-w-0 gap-2 text-sm font-black text-[color:var(--text-primary)]">
                  {field.label}
                  {field.multiline ? (
                    <textarea
                      id={fieldId}
                      rows={4}
                      className="min-h-32 rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 text-base font-normal leading-7 text-[color:var(--text-primary)] outline-none transition focus:border-[var(--blue)] focus:ring-4 focus:ring-[rgba(36,93,167,0.14)]"
                      placeholder={field.placeholder}
                      aria-describedby={noticeId}
                      onFocus={startFormDraft}
                    />
                  ) : (
                    <input
                      id={fieldId}
                      type={field.type ?? "text"}
                      className="min-h-12 rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 text-base font-normal text-[color:var(--text-primary)] outline-none transition focus:border-[var(--blue)] focus:ring-4 focus:ring-[rgba(36,93,167,0.14)]"
                      placeholder={field.placeholder}
                      aria-describedby={noticeId}
                      autoComplete={field.type === "tel" ? "tel" : "off"}
                      onFocus={startFormDraft}
                    />
                  )}
                </label>
              );
            })}
          </div>

          <p id={noticeId} className="rounded-[8px] border border-[var(--accent-gold-border)] bg-[var(--accent-gold-bg)] p-4 text-sm font-bold leading-7 text-[color:var(--text-primary)]">
            {offlineNotice}
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-5 py-3 text-center text-sm font-black text-white shadow-[var(--shadow-cta-dark)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
              aria-describedby={noticeId}
              onClick={submitAttemptFallback}
            >
              Отправка пока не подключена
            </button>
            <Link
              href="/kontakty/"
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--line)] bg-white px-5 py-3 text-center text-sm font-black text-[color:var(--surface-dark-strong)]"
              data-analytics-goal={analyticsGoalNames.fallbackContactClick}
              data-cta-label="Перейти в контакты"
              data-cta-location={ctaLocation}
              data-collector-type="fallback_contact"
              data-lead-topic={leadTopic}
              data-page-slug={pageSlug}
              data-page-type={pageType}
            >
              Перейти в контакты
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--line)] bg-white px-5 py-3 text-center text-sm font-black text-[color:var(--surface-dark-strong)]"
              data-analytics-goal={analyticsGoalNames.fallbackContactClick}
              data-cta-label="Позвонить"
              data-cta-location={ctaLocation}
              data-collector-type="fallback_phone"
              data-lead-topic={leadTopic}
              data-page-slug={pageSlug}
              data-page-type={pageType}
            >
              {site.phone}
            </a>
          </div>

          <p id={messageId} className="min-h-6 text-sm font-black leading-6 text-[color:var(--emerald)]" role="status" aria-live="polite">
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
