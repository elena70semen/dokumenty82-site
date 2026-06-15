"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { TrackedAction } from "@/components/tracking/TrackedAction";
import { site } from "@/lib/content";
import {
  disabledFormSubmitMessage,
  formHiddenAttributionFieldIds,
  formPolicyNotice,
  formsLive
} from "@/lib/forms/form-contract";

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
  pageSlug: string;
  pageType: string;
  leadTopic: string;
};

const offlineNotice =
  "Сейчас лучше связаться напрямую: позвоните или перейдите в контакты, чтобы согласовать удобный способ передачи вопроса.";

export function FormPlaceholder({ eyebrow, title, text, fields, pageSlug, pageType, leadTopic }: FormPlaceholderProps) {
  const formId = useId();
  const [message, setMessage] = useState("");
  const noticeId = `${formId}-notice`;
  const policyId = `${formId}-policy`;
  const messageId = `${formId}-message`;

  function explainOffline() {
    setMessage(disabledFormSubmitMessage);
  }

  function hiddenValueFor(fieldId: string) {
    if (fieldId === "page_slug") return pageSlug;
    if (fieldId === "page_type") return pageType;
    if (fieldId === "cta_label") return "Связаться напрямую";
    if (fieldId === "cta_location") return "form_placeholder";
    if (fieldId === "lead_topic_hidden") return leadTopic;
    return "";
  }

  return (
    <section className="section-pad dimmed-page-section" aria-labelledby={`${formId}-title`}>
      <div className="container-premium">
        <form
          className="dark-glass-card grid gap-5 rounded-[8px] p-6 md:p-8"
          data-form-placeholder="true"
          data-forms-live={String(formsLive)}
          data-page-slug={pageSlug}
          data-page-type={pageType}
          data-lead-topic={leadTopic}
          onSubmit={(event) => {
            event.preventDefault();
            explainOffline();
          }}
        >
          <div className="max-w-3xl">
            <p className="eyebrow-line">{eyebrow}</p>
            <h2 id={`${formId}-title`} className="mt-5 text-3xl font-semibold leading-tight text-[color:var(--text-inverse)] md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-8 text-[color:var(--text-inverse-muted)]">{text}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {fields.map((field) => {
              const fieldId = `${formId}-${field.id}`;
              return (
                <label key={field.id} htmlFor={fieldId} className="grid gap-2 text-sm font-semibold text-[color:var(--text-inverse)]">
                  {field.label}
                  {field.multiline ? (
                    <textarea
                      id={fieldId}
                      name={field.id}
                      rows={4}
                      className="min-h-32 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-base font-normal leading-7 text-[color:var(--text-inverse)] outline-none transition placeholder:text-[rgba(255,255,255,0.42)] focus:border-[var(--lime-signal)] focus:ring-4 focus:ring-[rgba(159,203,22,0.16)]"
                      placeholder={field.placeholder}
                      aria-describedby={`${noticeId} ${policyId}`}
                    />
                  ) : (
                    <input
                      id={fieldId}
                      name={field.id}
                      type={field.type ?? "text"}
                      className="min-h-12 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-base font-normal text-[color:var(--text-inverse)] outline-none transition placeholder:text-[rgba(255,255,255,0.42)] focus:border-[var(--lime-signal)] focus:ring-4 focus:ring-[rgba(159,203,22,0.16)]"
                      placeholder={field.placeholder}
                      aria-describedby={`${noticeId} ${policyId}`}
                      autoComplete={field.type === "tel" ? "tel" : "off"}
                    />
                  )}
                </label>
              );
            })}
          </div>

          <div data-hidden-attribution-fields="true" aria-hidden="true">
            {formHiddenAttributionFieldIds.map((fieldId) => (
              <input key={fieldId} type="hidden" name={fieldId} value={hiddenValueFor(fieldId)} readOnly />
            ))}
          </div>

          <p id={noticeId} className="rounded-[8px] border border-[rgba(198,154,71,0.28)] bg-[rgba(198,154,71,0.1)] p-4 text-sm font-semibold leading-7 text-[color:var(--text-inverse-muted)]">
            {offlineNotice}
          </p>

          <p id={policyId} className="text-sm font-semibold leading-7 text-[color:var(--text-inverse-muted)]">
            {formPolicyNotice} <Link href="/policy" className="text-[color:var(--lime-signal)] underline underline-offset-4">Политика конфиденциальности</Link>.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <TrackedAction
              className="dark-glass-cta min-h-12 rounded-[8px] px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
              ariaDescribedBy={noticeId}
              pageSlug={pageSlug}
              pageType={pageType}
              ctaLabel="Связаться напрямую"
              ctaLocation="form_placeholder"
              leadTopic={leadTopic}
              collectorType="form_placeholder"
              onClick={explainOffline}
            >
              Связаться напрямую
            </TrackedAction>
            <TrackedAction
              href="/kontakty/"
              className="min-h-12 rounded-[8px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-5 py-3 text-sm font-semibold text-[color:var(--text-inverse)] transition hover:border-[rgba(159,203,22,0.28)] hover:bg-[rgba(255,255,255,0.12)]"
              pageSlug={pageSlug}
              pageType={pageType}
              ctaLabel="Перейти в контакты"
              ctaLocation="form_placeholder"
              leadTopic={leadTopic}
              collectorType="route"
              contactChannel="office"
            >
              Перейти в контакты
            </TrackedAction>
            <TrackedAction
              href={site.phoneHref}
              className="min-h-12 rounded-[8px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-5 py-3 text-sm font-semibold text-[color:var(--text-inverse)] transition hover:border-[rgba(159,203,22,0.28)] hover:bg-[rgba(255,255,255,0.12)]"
              pageSlug={pageSlug}
              pageType={pageType}
              ctaLabel="Позвонить"
              ctaLocation="form_placeholder"
              leadTopic={leadTopic}
              collectorType="phone"
              contactChannel="phone"
            >
              {site.phone}
            </TrackedAction>
          </div>

          <p id={messageId} className="min-h-6 text-sm font-semibold leading-6 text-[color:var(--lime-signal)]" role="status" aria-live="polite">
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
