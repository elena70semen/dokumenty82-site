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

export default function AboutProjectPage() {
  return (
    <main className="pt-36">
      <JsonLd data={aboutBreadcrumbJsonLd} />
      <section className="section-pad">
        <div className="container-premium grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="reveal-block" data-reveal="left">
            <nav className="mb-8 flex max-w-full flex-wrap gap-2 text-sm font-bold text-[#667184]" aria-label="Хлебные крошки">
              <Link href="/" className="text-[#245da7]">
                Главная
              </Link>
              <span>/</span>
              <span aria-current="page" className="min-w-0 break-words text-[#111821]">
                О проекте
              </span>
            </nav>
            <p className="eyebrow-line">О проекте</p>
            <h1 className="display-serif mt-6 text-[2.65rem] font-semibold leading-[0.98] text-[#111821] md:text-8xl">
              Локальный центр
              <br />
              <span className="script-accent">подготовки документов</span>
            </h1>
            <p className="mt-7 text-xl leading-9 text-[#667184]">
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

      <section className="section-pad bg-white/62">
        <div className="container-premium grid gap-6 md:grid-cols-3">
          {[
            "Сначала разбираем ситуацию",
            "Объясняем порядок действий простыми словами",
            "Готовим документы под конкретный вопрос"
          ].map((item) => (
            <article key={item} className="reveal-block rounded-[8px] border border-[#16284414] bg-white p-7 shadow-[0_22px_58px_rgba(22,40,68,0.08)]" data-reveal="up">
              <h2 className="text-2xl font-black leading-tight text-[#111821]">{item}</h2>
              <p className="mt-4 leading-8 text-[#667184]">
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
            <h2 className="display-serif mt-5 text-5xl font-semibold leading-tight text-[#111821] md:text-6xl">
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
            <Link href="/kontakty/" className="mt-6 inline-flex rounded-full bg-[#162844] px-7 py-4 text-sm font-black text-white">
              Построить маршрут
            </Link>
          </div>
        </div>
      </section>

      <RouteProductFoundation path="/o-proekte/" variant="full" />
    </main>
  );
}
