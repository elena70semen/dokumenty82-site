import type { Metadata } from "next";
import Link from "next/link";
import { blogNewsCategories } from "@/lib/blog-news";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Блог и новости",
  description:
    "Материалы, новости и обновления для бизнеса. Раздел готовится к запуску и пока закрыт от индексации.",
  alternates: {
    canonical: `${site.domain}/blog/`
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
    description: "Маршруты по декларациям, нулевой отчётности, восстановлению и электронной сдаче."
  },
  {
    label: "Банк и 115-ФЗ",
    href: "/bank-i-115-fz/",
    description: "Материалы о банковских запросах, документах и безопасной подготовке ответа."
  },
  {
    label: "Адрес и ЕГРЮЛ",
    href: "/adres-egryul-direktor/",
    description: "Пояснения по адресу, ЕГРЮЛ, директору и смежным маршрутам компании."
  },
  {
    label: "Регистрация",
    href: "/registraciya-i-likvidaciya/",
    description: "Материалы для выбора маршрута при запуске, изменении или завершении бизнеса."
  }
] as const;

export default function BlogPage() {
  return (
    <main className="pt-36">
      <section className="section-pad">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-4xl reveal-block" data-reveal="left">
            <p className="eyebrow-line">Материалы, новости и обновления для бизнеса</p>
            <h1 className="display-serif mt-6 text-6xl font-semibold leading-[0.98] text-[#111821] md:text-8xl">Блог и новости</h1>
            <p className="mt-7 text-xl leading-9 text-[#667184]">
              Материалы, новости и обновления для бизнеса. Обновления ФНС будут публиковаться только после прохождения защитных правил.
            </p>
            <p className="mt-5 rounded-[8px] border border-[#16284414] bg-white/78 p-5 text-sm font-bold leading-7 text-[#667184]">
              Раздел готовится к запуску и пока закрыт от индексации.
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
          <div className="grid gap-4">
            {sectionCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="reveal-block rounded-[8px] border border-[#16284414] bg-white p-6 shadow-[0_22px_58px_rgba(22,40,68,0.08)] transition hover:-translate-y-0.5"
                data-reveal="right"
              >
                <span className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#245da7]">{card.label}</span>
                <p className="mt-3 text-sm leading-7 text-[#667184]">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white/62">
        <div className="container-premium grid gap-8 lg:grid-cols-2">
          <article className="reveal-block rounded-[8px] border border-[#16284414] bg-white p-8 shadow-[0_22px_58px_rgba(22,40,68,0.08)]" data-reveal="left">
            <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#245da7]">Будущая автоматизация</p>
            <p className="mt-5 leading-8 text-[#667184]">
              Будущая автоматизация будет брать только утверждённые источники ФНС/ИФНС, перерабатывать материал в оригинальное краткое объяснение,
              проверять источник, ссылку, даты, безопасность формулировок и только затем допускать публикацию.
            </p>
          </article>
          <article className="reveal-block rounded-[8px] border border-[#16284414] bg-[#111821] p-8 text-white shadow-[0_22px_58px_rgba(22,40,68,0.12)]" data-reveal="right">
            <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#c69a47]">Ограничение</p>
            <p className="mt-5 leading-8 text-white/76">
              Материалы не заменяют первоисточник ведомства, закон, приказ, письмо или индивидуальную консультацию.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
