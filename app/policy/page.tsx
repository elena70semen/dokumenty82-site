import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RouteProductFoundation } from "@/components/routes/RouteProductFoundation";
import { site } from "@/lib/content";
import { buildBreadcrumbListJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности и обработки данных проекта «Документы для бизнеса»: правила обработки данных и безопасный контакт.",
  alternates: {
    canonical: `${site.domain}/policy`
  },
  openGraph: {
    title: "Политика конфиденциальности",
    description:
      "Правила обработки данных и безопасного контакта для проекта «Документы для бизнеса».",
    url: `${site.domain}/policy`
  }
};

const policyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Политика конфиденциальности и обработки данных",
  url: `${site.domain}/policy`,
  inLanguage: "ru-RU"
};

const policyBreadcrumbJsonLd = buildBreadcrumbListJsonLd([
  { name: "Главная", href: "/" },
  { name: "Политика конфиденциальности", href: "/policy" }
]);

const safetyItems = [
  "не публикуйте персональные данные в открытом сообщении",
  "не отправляйте сканы документов без согласованного канала",
  "используйте подтвержденные контакты для вопросов по данным",
  "сайт сейчас не принимает файлы и не отправляет заявки в CRM",
  "счетчики аналитики не загружаются без отдельного решения",
  "финальная юридическая редакция требует отдельной проверки"
];

const currentStateItems = [
  "живые формы и backend-отправка не подключены",
  "публичная загрузка документов не включена",
  "CRM и счетчики аналитики остаются выключенными",
  "финальный текст политики требует отдельной проверки владельца и юриста"
];

const faqItems = [
  {
    question: "Это страница услуг?",
    answer: "Нет. Она нужна для правил конфиденциальности, обработки данных и безопасной передачи документов."
  },
  {
    question: "Можно ли отправлять документы через открытые формы?",
    answer: "Нет. Сначала согласуйте безопасный способ передачи."
  },
  {
    question: "Что делать с вопросом по персональным данным?",
    answer: "Используйте подтвержденные контакты и не публикуйте чувствительные сведения в открытом сообщении."
  },
  {
    question: "Почему здесь нет юридических данных организации?",
    answer: "Такие сведения добавляются только после отдельной проверки и утверждения."
  },
  {
    question: "Подключены ли формы, CRM или счетчики?",
    answer: "Нет. Текущий статический кандидат не отправляет заявки в backend, не принимает файлы и не загружает счетчики аналитики."
  },
  {
    question: "Если нужен разбор ситуации?",
    answer: "Перейдите на страницу разбора ситуации или в контакты."
  }
];

const policyFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

export default function PolicyPage() {
  return (
    <main id="main-content" className="pt-36">
      <link rel="canonical" href={`${site.domain}/policy`} />
      <JsonLd data={policyBreadcrumbJsonLd} />
      <JsonLd data={policyJsonLd} />
      <JsonLd data={policyFaqJsonLd} />

      <section className="section-pad">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="reveal-block" data-reveal="left">
            <nav className="breadcrumb-trail mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="inline-flex min-h-10 items-center rounded-[8px] text-[color:var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]">
                Главная
              </Link>
              <span>/</span>
              <span className="inline-flex min-h-10 items-center">Политика конфиденциальности</span>
            </nav>
            <p className="eyebrow-line">Данные и документы</p>
            <h1 className="display-serif mt-6 max-w-full text-[1.82rem] font-semibold leading-[1.12] text-[color:var(--text-primary)] [overflow-wrap:anywhere] sm:text-[2.35rem] sm:leading-[1.02] xl:text-7xl xl:leading-[0.98]">
              Политика конфиденциальности и обработки данных
            </h1>
            <p className="mt-7 text-xl leading-9 text-[color:var(--text-secondary)]">
              Страница нужна для правил конфиденциальности, обработки данных и безопасного обращения с документами пользователей.
            </p>
            <div className="mt-9 grid gap-3 sm:grid-cols-[auto_auto] sm:justify-start">
              <a
                href={site.phoneHref}
                className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-7 py-4 text-center text-sm font-black text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)]"
                data-collector-kind="phone"
                data-cta-label="Позвонить"
                data-page-slug="policy"
                data-page-type="legal"
              >
                Позвонить
              </a>
              <Link
                href="/kontakty/"
                className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--line)] bg-white/72 px-7 py-4 text-center text-sm font-black text-[color:var(--surface-dark-strong)]"
                data-collector-kind="contacts"
                data-cta-label="Построить маршрут"
                data-page-slug="policy"
                data-page-type="legal"
              >
                Построить маршрут
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[color:var(--text-secondary)]">
              Не отправляйте персональные данные и документы через открытые каналы без согласования.
            </p>
          </div>

          <div className="reveal-block premium-card-strong p-8" data-reveal="right">
            <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[color:var(--blue)]">Безопасный контакт</p>
            <h2 className="display-serif mt-4 text-4xl font-semibold leading-tight text-[color:var(--text-primary)]">
              Сначала выберите безопасный способ связи
            </h2>
            <p className="mt-5 leading-8 text-[color:var(--text-secondary)]">
              Если вопрос связан с данными или документами, кратко опишите тему без чувствительных сведений. Документы передаются только согласованным способом.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a
                href={site.phoneHref}
                className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-6 py-3 text-center text-sm font-black text-[color:var(--text-inverse)]"
                data-cta-label="Позвонить"
                data-page-slug="policy"
                data-page-type="legal"
              >
                {site.phone}
              </a>
              <Link
                href="/kontakty/"
                className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line)] px-6 py-3 text-center text-sm font-black text-[color:var(--surface-dark-strong)]"
                data-cta-label="Построить маршрут"
                data-page-slug="policy"
                data-page-type="legal"
              >
                Построить маршрут
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--paper-soft)]">
        <div className="container-premium grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal-block premium-card-dark h-full p-8" data-reveal="left">
            <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[color:var(--lime-signal)]">Что важно</p>
            <ul className="mt-6 grid gap-4">
              {safetyItems.map((item) => (
                <li key={item} className="flex min-w-0 gap-3 text-[color:var(--text-inverse-muted)]">
                  <span className="text-[color:var(--lime-signal)]">✓</span>
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <article className="rich-text reveal-block premium-card-strong h-full p-8" data-reveal="right">
            <h2 className="display-serif mb-6 text-4xl font-semibold leading-tight text-[color:var(--text-primary)]">
              Как пользоваться этой страницей
            </h2>
            <p>
              Политика конфиденциальности нужна для прозрачности: как проект относится к персональным данным, обращениям и документам пользователей.
            </p>
            <p>
              Главная практическая мысль проста: персональные данные, сканы документов и чувствительные материалы не нужно отправлять через открытые формы или непроверенные каналы.
            </p>
            <p>
              В текущем статическом кандидате живой прием форм, CRM-отправка, публичная загрузка и счетчики аналитики не включены.
            </p>
            <p>
              Если человеку нужен не вопрос по данным, а помощь с документальной ситуацией, лучше перейти к разбору ситуации или контактам.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {currentStateItems.map((item) => (
                <p key={item} className="rounded-[8px] border border-[var(--line)] bg-white p-4 text-sm font-black leading-7 text-[color:var(--text-primary)]">
                  {item}
                </p>
              ))}
            </div>
            <div className="mt-8 rounded-[8px] border border-[var(--line)] bg-[var(--paper)] p-5">
              <p className="font-black text-[color:var(--text-primary)]">Эта страница не является коммерческой страницей услуг.</p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">
                Она не публикует неподтвержденные юридические сведения и не заменяет отдельную legal/privacy проверку.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">FAQ</p>
            <h2 className="display-serif mt-5 text-5xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
              Частые вопросы по данным
            </h2>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.question} open={index === 0} className="reveal-block premium-card" data-reveal="right">
                <summary className="flex min-h-12 cursor-pointer items-center rounded-[8px] px-6 py-4 text-lg font-black leading-tight text-[color:var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]">
                  {item.question}
                </summary>
                <p className="px-6 pb-6 pt-1 leading-8 text-[color:var(--text-secondary)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RouteProductFoundation path="/policy" variant="full" />
    </main>
  );
}
