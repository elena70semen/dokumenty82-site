import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RouteProductFoundation } from "@/components/routes/RouteProductFoundation";
import { site } from "@/lib/content";
import { buildBreadcrumbListJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "О проекте Документы для бизнеса и формате работы",
  description:
    "О проекте Документы для бизнеса в Симферополе: локальный центр подготовки документов, спокойный разбор ситуации и понятный маршрут.",
  alternates: {
    canonical: `${site.domain}/o-proekte/`
  }
};

const aboutBreadcrumbJsonLd = buildBreadcrumbListJsonLd([
  { name: "Главная", href: "/" },
  { name: "О проекте", href: "/o-proekte/" }
]);

const trustItems = [
  {
    title: "Публичные факты из одного источника",
    copy: "Телефон, адрес, категория и локальный ориентир берутся из подтверждённого канона и повторяются без альтернативных версий."
  },
  {
    title: "Процесс вместо громких заявлений",
    copy: "Сначала фиксируем ситуацию, затем выбираем маршрут и только после этого обсуждаем подготовку документов."
  },
  {
    title: "Документы без публичной загрузки",
    copy: "Материалы можно показать при обращении, но сайт не просит прикреплять файлы в открытом интерфейсе."
  },
  {
    title: "Границы остаются на проверке",
    copy: "Юридические сведения, финальная политика, формы, интеграции и дополнительные публичные детали требуют отдельного решения."
  }
];

export default function AboutProjectPage() {
  return (
    <main id="main-content" className="pt-36">
      <JsonLd data={aboutBreadcrumbJsonLd} />
      <section className="section-pad">
        <div className="container-premium grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="reveal-block" data-reveal="left">
            <nav className="breadcrumb-trail mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="inline-flex min-h-10 items-center rounded-[8px] text-[color:var(--blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]">
                Главная
              </Link>
              <span>/</span>
              <span aria-current="page" className="inline-flex min-h-10 min-w-0 items-center break-words text-[color:var(--text-primary)]">
                О проекте
              </span>
            </nav>
            <p className="eyebrow-line">О проекте</p>
            <h1 className="display-serif mt-6 text-[2.65rem] font-semibold leading-[0.98] text-[color:var(--text-primary)] md:text-8xl">
              Локальный центр
              <br />
              <span className="script-accent">подготовки документов</span>
            </h1>
            <p className="mt-7 text-xl leading-9 text-[color:var(--text-secondary)]">
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

      <section className="section-pad bg-[var(--paper-soft)]">
        <div className="container-premium grid gap-6 md:grid-cols-3">
          {[
            "Сначала разбираем ситуацию",
            "Объясняем порядок действий простыми словами",
            "Готовим документы под конкретный вопрос"
          ].map((item) => (
            <article key={item} className="reveal-block premium-card p-7" data-reveal="up">
              <h2 className="text-2xl font-black leading-tight text-[color:var(--text-primary)]">{item}</h2>
              <p className="mt-4 leading-8 text-[color:var(--text-secondary)]">
                Подход без давления, без имитации ведомственного статуса и без обещаний результата до изучения документов.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <img
            src="/assets/images/office-reception.png"
            alt="Офис центра подготовки документов в Симферополе"
            className="reveal-block rounded-[8px] shadow-[0_24px_74px_rgba(22,40,68,0.16)]"
            data-reveal="left"
            loading="lazy"
          />
          <div className="rich-text reveal-block" data-reveal="right">
            <p className="eyebrow-line">Формат работы</p>
            <h2 className="display-serif mt-5 text-5xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
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
            <Link href="/kontakty/" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-7 py-4 text-sm font-black text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)]">
              Построить маршрут
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--paper-soft)]">
        <div className="container-premium">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div className="reveal-block" data-reveal="left">
              <p className="eyebrow-line">Доверие через прозрачность</p>
              <h2 className="display-serif mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
                Что можно проверить до обращения
              </h2>
            </div>
            <p className="reveal-block section-copy" data-reveal="right">
              Публичная часть сайта не подменяет консультацию и не добавляет неподтверждённые доказательства. Она
              показывает, как начать безопасно и какие границы остаются до человеческого подтверждения.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {trustItems.map((item) => (
              <article
                key={item.title}
                className="reveal-block premium-card p-6"
                data-reveal="up"
              >
                <h3 className="text-xl font-black leading-tight text-[color:var(--text-primary)]">{item.title}</h3>
                <p className="mt-4 leading-8 text-[color:var(--text-secondary)]">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RouteProductFoundation path="/o-proekte/" variant="full" />
    </main>
  );
}
