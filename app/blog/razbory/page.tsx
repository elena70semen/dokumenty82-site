import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Разборы ситуаций",
  description:
    "Будущий раздел evergreen-разборов для бизнеса. Раздел noindex: публичная индексация и автопубликация не включены.",
  alternates: {
    canonical: "/blog/razbory/"
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function BlogExplainersPage() {
  return (
    <main className="pt-36">
      <section className="section-pad">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">Блог и новости</p>
            <h1 className="display-serif mt-6 text-6xl font-semibold leading-[0.98] text-[#111821] md:text-8xl">Разборы ситуаций</h1>
            <p className="mt-7 text-xl leading-9 text-[#667184]">
              Здесь будут evergreen-материалы, которые объясняют деловую ситуацию, помогают выбрать маршрут и ведут к безопасному первому шагу.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/razbor-situacii/" className="rounded-full bg-[#162844] px-7 py-4 text-sm font-black text-white">
                Разобрать ситуацию
              </Link>
              <Link href="/kontakty/" className="rounded-full border border-[#16284422] bg-white/72 px-7 py-4 text-sm font-black text-[#162844]">
                Контакты
              </Link>
            </div>
          </div>
          <aside className="reveal-block rounded-[8px] border border-[#16284414] bg-white p-8 shadow-[0_22px_58px_rgba(22,40,68,0.08)]" data-reveal="right">
            <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#245da7]">Статус раздела</p>
            <p className="mt-5 leading-8 text-[#667184]">
              В этой версии нет живой ленты, публичных article pages, форм, загрузки документов или аналитических интеграций. Индексация удерживается до QA.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
