import type { Metadata } from "next";
import Link from "next/link";
import { blogNewsCategories } from "@/lib/blog-news";

export const metadata: Metadata = {
  title: "Блог и новости",
  description:
    "Блог, новости и обновления для бизнеса. Раздел готовится к запуску и пока закрыт от индексации.",
  alternates: {
    canonical: "/blog/"
  },
  robots: {
    index: false,
    follow: true
  }
};

const sectionCards = [
  ...blogNewsCategories,
  {
    label: "Документы",
    href: "/razbor-situacii/",
    description: "Безопасный первый шаг, если вопрос связан с документами или неясным уведомлением."
  },
  {
    label: "Отчётность",
    href: "/otchetnost/",
    description: "Разборы по декларациям, нулевой отчётности, восстановлению и электронной сдаче."
  },
  {
    label: "Банк и 115-ФЗ",
    href: "/bank-i-115-fz/",
    description: "Разборы банковских запросов, документов и безопасной подготовки ответа."
  },
  {
    label: "Адрес и ЕГРЮЛ",
    href: "/adres-egryul-direktor/",
    description: "Пояснения по адресу, ЕГРЮЛ, директору и смежным маршрутам компании."
  },
  {
    label: "Регистрация",
    href: "/registraciya-i-likvidaciya/",
    description: "Разборы для запуска, изменений или завершения бизнеса."
  }
] as const;

export default function BlogPage() {
  return (
    <main id="main-content">
      <section className="section-pad dimmed-page-section">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-4xl reveal-block" data-reveal="left">
            <p className="eyebrow-line">Блог, новости и обновления для бизнеса</p>
            <h1 className="display-serif mt-6 text-6xl font-semibold leading-[0.98] text-[color:var(--text-inverse)] md:text-8xl">Блог и новости</h1>
            <p className="mt-7 text-xl leading-9 text-[color:var(--text-inverse-muted)]">
              Блог, новости и обновления для бизнеса. Обновления ФНС будут публиковаться только после проверки и подготовки.
            </p>
            <p className="mt-5 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.08)] p-5 text-sm font-semibold leading-7 text-[color:var(--text-inverse-muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              Раздел готовится к запуску и пока закрыт от индексации.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/razbor-situacii/" className="rounded-[8px] bg-[var(--lime-signal)] px-7 py-4 text-sm font-semibold text-[color:var(--lime-text)] shadow-[var(--shadow-signal)] transition hover:-translate-y-0.5">
                Разобрать ситуацию
              </Link>
              <Link href="/kontakty/" className="rounded-[8px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-7 py-4 text-sm font-semibold text-[color:var(--text-inverse)] transition hover:-translate-y-0.5 hover:border-[rgba(159,203,22,0.28)] hover:bg-[rgba(255,255,255,0.12)]">
                Контакты
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            {sectionCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="dark-glass-card dark-glass-card-interactive reveal-block rounded-[8px] p-6"
                data-reveal="right"
              >
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--lime-signal)]">{card.label}</span>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-inverse-muted)]">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad dimmed-page-section">
        <div className="container-premium grid gap-8 lg:grid-cols-2">
          <article className="dark-glass-card reveal-block rounded-[8px] p-8" data-reveal="left">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--lime-signal)]">Будущая автоматизация</p>
            <p className="mt-5 leading-8 text-[color:var(--text-inverse-muted)]">
              Будущая автоматизация будет брать только утверждённые источники ФНС/ИФНС, перерабатывать материал в оригинальное краткое объяснение,
              проверять источник, ссылку, даты, безопасность формулировок и только затем допускать публикацию.
            </p>
          </article>
          <article className="dark-glass-card reveal-block rounded-[8px] p-8" data-reveal="right">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--lime-signal)]">Ограничение</p>
            <p className="mt-5 leading-8 text-[color:var(--text-inverse-muted)]">
              Публикации не заменяют первоисточник ведомства, закон, приказ, письмо или индивидуальную консультацию.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
