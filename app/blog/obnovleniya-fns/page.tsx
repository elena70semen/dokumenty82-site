import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Обновления ФНС",
  description:
    "Будущий раздел обновлений ФНС и ИФНС для бизнеса. Раздел noindex: автоматическая публикация и индексация не включены.",
  alternates: {
    canonical: `${site.domain}/blog/obnovleniya-fns/`
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function FnsUpdatesPage() {
  return (
    <main className="pt-36">
      <section className="section-pad">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">Блог и новости</p>
            <h1 className="display-serif mt-6 text-6xl font-semibold leading-[0.98] text-[#111821] md:text-8xl">Обновления ФНС</h1>
            <p className="mt-7 text-xl leading-9 text-[#667184]">
              Здесь готовится раздел для кратких source-attributed обновлений ФНС и ИФНС. В этой версии нет живой ленты, парсинга,
              переписывания или автоматической публикации.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/razbor-situacii/" className="rounded-full bg-[#162844] px-7 py-4 text-sm font-black text-white">
                Разобрать ситуацию
              </Link>
              <Link href="/kontakty/" className="rounded-full border border-[#16284422] bg-white/72 px-7 py-4 text-sm font-black text-[#162844]">
                Построить маршрут
              </Link>
            </div>
          </div>
          <aside className="reveal-block rounded-[8px] border border-[#16284414] bg-white p-8 shadow-[0_22px_58px_rgba(22,40,68,0.08)]" data-reveal="right">
            <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#245da7]">Статус раздела</p>
            <ul className="mt-6 grid gap-4 text-sm leading-7 text-[#667184]">
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
