import { BrandIcon } from "@/components/brand/BrandIcon";
import { TrackedAction } from "@/components/tracking/TrackedAction";
import { homeHero } from "@/lib/home/home-page-data";

const decisionAccentClasses: Record<(typeof homeHero.decisions)[number]["accent"], string> = {
  lime: "border-[rgba(159,203,22,0.36)] bg-[rgba(159,203,22,0.08)]",
  blue: "border-[rgba(76,145,255,0.34)] bg-[rgba(36,93,167,0.18)]",
  emerald: "border-[rgba(36,170,126,0.32)] bg-[rgba(13,74,59,0.2)]",
  wine: "border-[rgba(206,86,118,0.34)] bg-[rgba(108,37,55,0.18)]"
};

export function HomeHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-transparent pt-[7rem] text-[color:var(--text-inverse)] md:pt-[7.75rem]"
      aria-labelledby="home-hero-title"
      style={{
        backgroundColor: "var(--page-dim)"
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[rgba(255,255,255,0.12)]" aria-hidden="true" />

      <div className="container-premium grid gap-10 pb-14 lg:grid-cols-[0.9fr_1fr] lg:items-start">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-3 rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] px-4 py-3 text-sm font-black text-[color:var(--lime-signal)]">
            <BrandIcon name="location" size={20} />
            {homeHero.kicker}
          </p>

          <h1 id="home-hero-title" className="mt-6 text-[2.45rem] font-black leading-[1.04] tracking-normal md:text-[3.7rem] lg:text-[4.1rem]">
            {homeHero.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[color:var(--text-inverse-muted)] md:text-lg md:leading-8">
            {homeHero.text}
          </p>

          <p className="mt-4 max-w-xl border-l-2 border-[var(--lime-signal)] pl-4 text-sm font-bold leading-6 text-[color:var(--text-inverse-soft)]">
            {homeHero.microcopy}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <TrackedAction
              href={homeHero.primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[var(--lime-signal)] px-6 py-3 text-sm font-black text-[color:var(--lime-text)] shadow-[var(--shadow-signal)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
              pageSlug="home"
              pageType="home"
              ctaLabel={homeHero.primaryCta.label}
              ctaLocation="home_hero"
              leadTopic="first_step"
              collectorType="situation_review"
            >
              <BrandIcon name="route" size={20} />
              {homeHero.primaryCta.label}
            </TrackedAction>
            <TrackedAction
              href={homeHero.secondaryCta.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-[var(--border-dark-subtle)] bg-[var(--surface-dark-subtle)] px-6 py-3 text-sm font-black text-[color:var(--text-inverse)] transition hover:bg-[var(--surface-dark-subtle-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
              pageSlug="home"
              pageType="home"
              ctaLabel={homeHero.secondaryCta.label}
              ctaLocation="home_hero"
              leadTopic="show_documents"
              collectorType="show_documents"
            >
              <BrandIcon name="document" size={20} />
              {homeHero.secondaryCta.label}
            </TrackedAction>
          </div>

          <ul className="mt-6 grid gap-3 text-sm text-[color:var(--text-inverse-soft)] sm:grid-cols-3">
            {homeHero.signals.map((signal) => (
              <li key={signal} className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[var(--lime-signal)]" aria-hidden="true" />
                {signal}
              </li>
            ))}
          </ul>
        </div>

        <aside className="relative overflow-hidden rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(10,16,26,0.66)] p-4 shadow-[var(--shadow-panel)] backdrop-blur-xl sm:p-5 lg:p-6">
          <div className="absolute inset-x-0 top-0 h-1 bg-[rgba(159,203,22,0.46)]" aria-hidden="true" />
          <div className="absolute bottom-4 right-4 h-24 w-36 border-b border-r border-[rgba(159,203,22,0.14)]" aria-hidden="true" />

          <div className="relative flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-[8px] bg-[var(--lime-signal)] text-[color:var(--lime-text)] shadow-[var(--shadow-signal)]">
              <BrandIcon name="route" size={24} />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[color:var(--lime-signal)]">Первый шаг</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-[color:var(--text-inverse)] md:text-3xl">С чего начать?</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[color:var(--text-inverse-muted)]">
                Выберите ближайшую ситуацию. Если вопрос смешанный, начните с общего разбора.
              </p>
            </div>
          </div>

          <div className="relative mt-5 grid gap-2">
            {homeHero.decisions.map((decision) => (
              <TrackedAction
                key={decision.title}
                href={decision.href}
                className={`${decisionAccentClasses[decision.accent]} group grid min-h-[82px] grid-cols-[44px_1fr_24px] items-center gap-3 rounded-[8px] border p-3 text-left transition hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]`}
                pageSlug="home"
                pageType="home"
                ctaLabel={decision.title}
                ctaLocation="home_hero_decision"
                leadTopic={decision.leadTopic}
                collectorType={decision.collectorType}
                fromPageSlug="home"
                toPageSlug={decision.href}
                eventName="scenario_card_click"
              >
                <span className="grid size-11 place-items-center rounded-[8px] bg-[rgba(255,255,255,0.12)] text-[color:var(--lime-signal)]">
                  <BrandIcon name={decision.icon} size={24} />
                </span>
                <span className="min-w-0">
                  <span className="block text-base font-black leading-6 text-[color:var(--text-inverse)]">{decision.title}</span>
                  <span className="mt-1 block text-sm leading-5 text-[color:var(--text-inverse-muted)]">{decision.lead}</span>
                </span>
                <span className="text-xl font-black text-[color:var(--lime-signal)] transition group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </TrackedAction>
            ))}
          </div>

          <div className="relative mt-5 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(17,24,33,0.62)] p-4">
            <div className="grid gap-2 sm:grid-cols-4">
              {homeHero.routeSteps.map((step, index) => (
                <div key={step} className="grid gap-2">
                  <span className="h-1 rounded-full bg-[rgba(159,203,22,0.48)]" />
                  <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-[color:var(--text-inverse-soft)]">
                    <span className="grid size-6 place-items-center rounded-[8px] bg-[rgba(159,203,22,0.1)] text-[color:var(--lime-signal)]">{index + 1}</span>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-4 flex items-start gap-3 rounded-[8px] border border-[rgba(159,203,22,0.14)] bg-[rgba(159,203,22,0.05)] p-4">
            <span className="mt-0.5 text-[color:var(--lime-signal)]">
              <BrandIcon name="location" size={20} />
            </span>
            <p className="text-sm font-bold leading-6 text-[color:var(--text-inverse-muted)]">
              В офис можно принести то, что уже есть по вопросу: письмо, запрос, распечатку, перечень вводных или просто описание ситуации.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
