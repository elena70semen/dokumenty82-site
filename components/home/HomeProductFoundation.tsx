import Link from "next/link";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { homeClientInformation, homeFaq, homeSituationSelector, homeStartPath } from "@/lib/home/home-page-data";
import { cta, site } from "@/lib/content";
import { analyticsGoalNames } from "@/lib/integrations/analytics-events";

export function HomeProductFoundation() {
  return (
    <section
      className="section-pad bg-[var(--paper)]"
      aria-labelledby="home-product-foundation"
      data-home-product-foundation="true"
      data-required-home-blocks="situation_selector start_path priority_tasks route_groups client_information local_trust faq final_cta"
    >
      <div className="container-premium">
        <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
          <div>
            <p className="eyebrow-line">С чего начать</p>
            <h2 id="home-product-foundation" className="display-serif mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
              Выберите ситуацию или начните с первого шага
            </h2>
          </div>
          <p className="text-lg leading-9 text-[color:var(--text-secondary)]">
            Если не уверены, с чего начать, начните с разбора ситуации. Посмотрим, что уже есть, что нужно подготовить и какой маршрут подходит.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {homeSituationSelector.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-[218px] min-w-0 flex-col rounded-[8px] border bg-white/88 p-5 shadow-[var(--shadow-card-sm)] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)] ${
                index === 0 || item.href === "/razbor-situacii/" ? "border-[var(--accent-blue-border)] xl:col-span-2" : "border-[var(--line)]"
              }`}
              data-analytics-goal={analyticsGoalNames.relatedRouteClick}
              data-cta-label={item.title}
              data-cta-location="home_situation_selector"
              data-lead-topic="Другое / первый шаг"
              data-page-slug="home"
              data-page-type="homepage"
              data-related-href={item.href}
            >
              <span className="grid size-11 place-items-center rounded-[8px] bg-[var(--accent-blue-bg)] text-[color:var(--blue)]">
                <BrandIcon name={item.icon} size={24} decorative />
              </span>
              <h3 className="mt-5 text-xl font-black leading-tight text-[color:var(--text-primary)]">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-[color:var(--text-secondary)]">{item.copy}</p>
              <span className="mt-5 text-sm font-black text-[color:var(--blue)]">{item.href === "/razbor-situacii/" ? "Безопасный первый шаг" : "Один основной интент"}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[8px] border border-[var(--line)] bg-white/88 p-6 shadow-[var(--shadow-card-md)]">
            <h3 className="text-2xl font-black text-[color:var(--text-primary)]">Как начинается работа</h3>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {homeStartPath.map((step, index) => (
                <li key={step.title} className="grid min-w-0 gap-2 rounded-[8px] bg-[var(--paper-soft)] p-4">
                  <span className="text-sm font-black text-[color:var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
                  <strong className="text-lg leading-tight text-[color:var(--text-primary)]">{step.title}</strong>
                  <span className="text-sm leading-7 text-[color:var(--text-secondary)]">{step.copy}</span>
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-[8px] border border-[var(--line)] bg-white/88 p-6 shadow-[var(--shadow-card-md)]">
            <h3 className="text-2xl font-black text-[color:var(--text-primary)]">Какая информация помогает</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {homeClientInformation.map((item) => (
                <div key={item.title} className="flex min-w-0 gap-4 rounded-[8px] bg-[var(--paper-soft)] p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-[var(--accent-gold-bg)] text-[color:var(--gold)]">
                    <BrandIcon name={item.icon} size={20} decorative />
                  </span>
                  <span className="min-w-0">
                    <strong className="block text-lg leading-tight text-[color:var(--text-primary)]">{item.title}</strong>
                    <span className="mt-2 block text-sm leading-7 text-[color:var(--text-secondary)]">{item.copy}</span>
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.14fr_0.86fr] lg:items-stretch">
          <article className="rounded-[8px] border border-[var(--line)] bg-white/88 p-6 shadow-[var(--shadow-card-md)]">
            <h3 className="text-2xl font-black text-[color:var(--text-primary)]">FAQ первого шага</h3>
            <div className="mt-6 grid gap-3">
              {homeFaq.map((item, index) => (
                <details key={item.question} open={index === 0} className="rounded-[8px] border border-[var(--line)] bg-white p-4">
                  <summary className="cursor-pointer text-base font-black text-[color:var(--text-primary)]">{item.question}</summary>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </article>

          <article className="flex h-full flex-col justify-between rounded-[8px] bg-[var(--surface-dark-strong)] p-6 text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.12em] text-[color:var(--lime-signal)]">Безопасный следующий шаг</p>
              <h3 className="mt-4 text-3xl font-black leading-tight">Начните с разбора ситуации</h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-inverse-muted)]">
                Можно показать документы при обращении — без загрузки файлов на сайте. Если ситуация неясна, начните с разбора.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <Link
                href="/razbor-situacii/"
                className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--lime-signal)] px-5 py-3 text-sm font-black text-[color:var(--lime-text)]"
                data-analytics-goal={analyticsGoalNames.formStart}
                data-cta-label={cta.primary}
                data-cta-location="home_final_cta"
                data-lead-topic="Другое / первый шаг"
                data-page-slug="home"
                data-page-type="homepage"
              >
                {cta.primary}
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--border-dark-soft)] px-5 py-3 text-sm font-black text-[color:var(--text-inverse)]"
                data-analytics-goal={analyticsGoalNames.callClick}
                data-cta-label={cta.phone}
                data-cta-location="home_final_cta"
                data-lead-topic="Другое / первый шаг"
                data-page-slug="home"
                data-page-type="homepage"
              >
                {cta.phone}
              </a>
              <Link
                href="/kontakty/"
                className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--border-dark-soft)] px-5 py-3 text-sm font-black text-[color:var(--text-inverse)]"
                data-analytics-goal={analyticsGoalNames.routeClick}
                data-cta-label={cta.route}
                data-cta-location="home_final_cta"
                data-lead-topic="Другое / первый шаг"
                data-page-slug="home"
                data-page-type="homepage"
              >
                {cta.route}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
