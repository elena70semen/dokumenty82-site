import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Обновления ФНС",
  description:
    "Будущий раздел обновлений ФНС и ИФНС для бизнеса. Раздел noindex: автоматическая публикация и индексация не включены.",
  alternates: {
    canonical: "/blog/obnovleniya-fns/"
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function FnsUpdatesPage() {
  return (
    <main id="main-content">
      <section className="section-pad dimmed-page-section">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">Блог и новости</p>
            <h1 className="display-serif mt-6 text-6xl font-semibold leading-[0.98] text-[color:var(--text-inverse)] md:text-8xl">Обновления ФНС</h1>
            <p className="mt-7 text-xl leading-9 text-[color:var(--text-inverse-muted)]">
              Здесь готовится раздел для кратких source-attributed обновлений ФНС и ИФНС. В этой версии нет живой ленты, парсинга,
              переписывания или автоматической публикации.
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
          <aside className="dark-glass-card reveal-block rounded-[8px] p-8" data-reveal="right">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--lime-signal)]">Статус раздела</p>
            <ul className="mt-6 grid gap-4 text-sm leading-7 text-[color:var(--text-inverse-muted)]">
              <li>Источник допускается только из утверждённого allowlist.</li>
              <li>Каждый материал требует ссылки на источник, даты, проверки дубликатов и безопасной формулировки.</li>
              <li>Автоматическая публикация не включена.</li>
              <li>Раздел закрыт от индексации и не входит в sitemap.</li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
