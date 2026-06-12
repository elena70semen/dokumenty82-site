"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { site } from "@/lib/content";

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
};

const offlineNotice =
  "Онлайн-отправка пока не подключена. Чтобы передать вопрос, позвоните или согласуйте способ показа документов.";
const localMessage = "Отправка формы пока не подключена. Позвоните или перейдите на страницу контактов.";

export function FormPlaceholder({ eyebrow, title, text, fields }: FormPlaceholderProps) {
  const formId = useId();
  const [message, setMessage] = useState("");
  const noticeId = `${formId}-notice`;
  const messageId = `${formId}-message`;

  function explainOffline() {
    setMessage(localMessage);
  }

  return (
    <section className="section-pad bg-white/74" aria-labelledby={`${formId}-title`}>
      <div className="container-premium">
        <form
          className="grid gap-6 rounded-[8px] border border-[var(--line)] bg-white/90 p-6 shadow-[var(--shadow-card-lg)] md:p-8"
          data-form-placeholder="true"
          onSubmit={(event) => {
            event.preventDefault();
            explainOffline();
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
                    />
                  ) : (
                    <input
                      id={fieldId}
                      type={field.type ?? "text"}
                      className="min-h-12 rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 text-base font-normal text-[color:var(--text-primary)] outline-none transition focus:border-[var(--blue)] focus:ring-4 focus:ring-[rgba(36,93,167,0.14)]"
                      placeholder={field.placeholder}
                      aria-describedby={noticeId}
                      autoComplete={field.type === "tel" ? "tel" : "off"}
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
              onClick={explainOffline}
            >
              Отправка пока не подключена
            </button>
            <Link
              href="/kontakty/"
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--line)] bg-white px-5 py-3 text-center text-sm font-black text-[color:var(--surface-dark-strong)]"
            >
              Перейти в контакты
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--line)] bg-white px-5 py-3 text-center text-sm font-black text-[color:var(--surface-dark-strong)]"
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
