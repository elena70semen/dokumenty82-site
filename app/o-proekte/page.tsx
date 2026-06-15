import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "О проекте Документы для бизнеса и формате работы",
  description:
    "О проекте Документы для бизнеса в Симферополе: локальный центр подготовки документов, спокойный разбор ситуации и понятный маршрут.",
  alternates: {
    canonical: "/o-proekte/"
  }
};

export default function AboutProjectPage() {
  return (
    <main id="main-content">
      <section className="section-pad dimmed-page-section">
        <div className="container-premium grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">О проекте</p>
            <h1 className="display-serif mt-6 text-[2.65rem] font-semibold leading-[0.98] text-[color:var(--text-inverse)] md:text-8xl">
              Локальный центр
              <br />
              <span className="script-accent">подготовки документов</span>
            </h1>
            <p className="mt-7 text-xl leading-9 text-[color:var(--text-inverse-muted)]">
              Документы для бизнеса - спокойный деловой формат для регистрации, отчетности, изменений, адреса,
              запросов банка и других рабочих вопросов, где нужен понятный комплект документов.
            </p>
          </div>
          <img
            src="/assets/images/team-specialists.png"
            alt="Команда специалистов центра подготовки документов"
            className="reveal-block rounded-[8px] shadow-[0_24px_74px_rgba(22,40,68,0.16)]"
            data-reveal="right"
          />
        </div>
      </section>

      <section className="section-pad dimmed-page-section">
        <div className="container-premium grid gap-6 md:grid-cols-3">
          {[
            "Сначала разбираем ситуацию",
            "Объясняем порядок действий простыми словами",
            "Готовим документы под конкретный вопрос"
          ].map((item) => (
            <article key={item} className="dark-glass-card dark-glass-card-interactive reveal-block rounded-[8px] p-7" data-reveal="up">
              <h2 className="text-2xl font-semibold leading-tight text-[color:var(--text-inverse)]">{item}</h2>
              <p className="mt-4 leading-8 text-[color:var(--text-inverse-muted)]">
                Подход без давления, без имитации ведомственного статуса и без обещаний результата до изучения документов.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad dimmed-page-section">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <img
            src="/assets/images/office-reception.png"
            alt="Офис центра подготовки документов в Симферополе"
            className="reveal-block rounded-[8px] shadow-[0_24px_74px_rgba(22,40,68,0.16)]"
            data-reveal="left"
            loading="lazy"
          />
          <div className="rich-text rich-text-on-dark reveal-block" data-reveal="right">
            <p className="eyebrow-line">Формат работы</p>
            <h2 className="display-serif mt-5 text-5xl font-semibold leading-tight text-[color:var(--text-inverse)] md:text-6xl">
              Офис рядом с налоговой - только ориентир.
            </h2>
            <p>
              Проект не создает впечатление связи с государственными органами. Локальный маркер используется только как
              нейтральное описание расположения офиса.
            </p>
            <p>
              Адрес: {site.address}. Перед визитом можно позвонить и уточнить, какие документы лучше взять на первый
              разбор.
            </p>
            <Link href="/kontakty/" className="mt-6 inline-flex rounded-[8px] bg-[var(--lime-signal)] px-7 py-4 text-sm font-semibold text-[color:var(--lime-text)] shadow-[var(--shadow-signal)] transition hover:-translate-y-0.5">
              Контакты
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
