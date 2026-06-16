import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/content";

const policyUrl = `${site.domain}/policy/`;

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности и обработки данных проекта «Документы для бизнеса»: правила обработки данных и безопасный контакт.",
  alternates: {
    canonical: policyUrl
  },
  openGraph: {
    title: "Политика конфиденциальности",
    description:
      "Правила обработки данных и безопасного контакта для проекта «Документы для бизнеса».",
    url: policyUrl
  }
};

const policyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Политика конфиденциальности и обработки данных",
  url: policyUrl,
  inLanguage: "ru-RU"
};

const safetyItems = [
  "не публикуйте персональные данные в открытом сообщении",
  "не отправляйте сканы документов без согласованного канала",
  "используйте подтвержденные контакты для вопросов по данным",
  "финальная юридическая редакция требует отдельной проверки"
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
    question: "Если нужен разбор ситуации?",
    answer: "Перейдите на страницу разбора ситуации или в контакты."
  }
];

export default function PolicyPage() {
  return (
    <main id="main-content">
      <JsonLd data={policyJsonLd} />

      <section className="section-pad dimmed-page-section">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="reveal-block" data-reveal="left">
            <nav className="mb-8 flex flex-wrap gap-2 text-sm font-bold text-[color:var(--text-inverse-soft)]" aria-label="Хлебные крошки">
              <Link href="/" className="text-[color:var(--lime-signal)]">
                Главная
              </Link>
              <span>/</span>
              <span>Политика конфиденциальности</span>
            </nav>
            <p className="eyebrow-line">Данные и документы</p>
            <h1 className="display-serif mt-6 text-[2.65rem] font-semibold leading-[0.98] text-[color:var(--text-inverse)] md:text-7xl">
              Политика конфиденциальности и обработки данных
            </h1>
            <p className="mt-7 text-xl leading-9 text-[color:var(--text-inverse-muted)]">
              Страница нужна для правил конфиденциальности, обработки данных и безопасного обращения с документами пользователей.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={site.phoneHref}
                className="rounded-full bg-[var(--lime-signal)] px-7 py-4 text-sm font-black text-[color:var(--lime-text)]"
                data-collector-kind="phone"
                data-cta-label="Позвонить"
                data-lead-topic="policy_legal"
                data-page-slug="policy"
                data-page-type="legal"
              >
                Позвонить
              </a>
              <Link
                href="/kontakty/"
                className="rounded-full border border-[#16284422] bg-white/72 px-7 py-4 text-sm font-black text-[#162844]"
                data-collector-kind="contacts"
                data-cta-label="Контакты"
                data-lead-topic="policy_legal"
                data-page-slug="policy"
                data-page-type="legal"
              >
                Контакты
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[color:var(--text-inverse-soft)]">
              Не отправляйте персональные данные и документы через открытые каналы без согласования.
            </p>
          </div>

          <div className="reveal-block rounded-[8px] border border-[#16284414] bg-white/78 p-8 shadow-[0_24px_74px_rgba(22,40,68,0.12)] backdrop-blur-[1px]" data-reveal="right">
            <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#245da7]">Безопасный контакт</p>
            <h2 className="display-serif mt-4 text-4xl font-semibold leading-tight text-[#111821]">
              Сначала выберите безопасный способ связи
            </h2>
            <p className="mt-5 leading-8 text-[#667184]">
              Если вопрос связан с данными или документами, кратко опишите тему без чувствительных сведений. Документы передаются только согласованным способом.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={site.phoneHref} className="rounded-full bg-[#162844] px-6 py-3 text-sm font-black text-white">
                {site.phone}
              </a>
              <Link href="/kontakty/" className="rounded-full border border-[#16284422] px-6 py-3 text-sm font-black text-[#162844]">
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad dimmed-page-section">
        <div className="container-premium grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal-block rounded-[8px] bg-[rgba(17,24,33,0.86)] p-8 text-white backdrop-blur-[2px]" data-reveal="left">
            <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#c69a47]">Что важно</p>
            <ul className="mt-6 grid gap-4">
              {safetyItems.map((item) => (
                <li key={item} className="flex gap-3 text-white/78">
                  <span className="text-[#c69a47]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <article className="rich-text reveal-block rounded-[8px] border border-[#16284414] bg-white/78 p-8 shadow-[0_22px_58px_rgba(22,40,68,0.08)] backdrop-blur-[1px]" data-reveal="right">
            <h2 className="display-serif mb-6 text-4xl font-semibold leading-tight text-[#111821]">
              Как пользоваться этой страницей
            </h2>
            <p>
              Политика конфиденциальности нужна для прозрачности: как проект относится к персональным данным, обращениям и документам пользователей.
            </p>
            <p>
              Главная практическая мысль проста: персональные данные, сканы документов и чувствительные материалы не нужно отправлять через открытые формы или непроверенные каналы.
            </p>
            <p>
              Если человеку нужен не вопрос по данным, а помощь с документальной ситуацией, лучше перейти к разбору ситуации или контактам.
            </p>
            <div className="mt-8 rounded-[8px] border border-[#16284414] bg-white/58 p-5">
              <p className="font-black text-[#111821]">Эта страница не является коммерческой страницей услуг.</p>
              <p className="mt-2 text-sm leading-7 text-[#667184]">
                Она не публикует неподтвержденные юридические сведения и не заменяет отдельную legal/privacy проверку.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-pad dimmed-page-section">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">FAQ</p>
            <h2 className="display-serif mt-5 text-5xl font-semibold leading-tight text-[color:var(--text-inverse)] md:text-6xl">
              Частые вопросы по данным
            </h2>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details key={item.question} open={index === 0} className="reveal-block rounded-[8px] border border-[#16284414] bg-white/78 p-6 shadow-[0_18px_50px_rgba(22,40,68,0.08)] backdrop-blur-[1px]" data-reveal="right">
                <summary className="cursor-pointer text-lg font-black text-[#111821]">{item.question}</summary>
                <p className="mt-4 leading-8 text-[#667184]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}