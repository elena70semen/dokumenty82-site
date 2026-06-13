import { BrandIcon } from "@/components/brand/BrandIcon";
import { TrackedAction } from "@/components/tracking/TrackedAction";
import { homeHero } from "@/lib/home/home-page-data";
import { brandTokens } from "@/lib/brand/brand-tokens";

export function HomeHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[var(--surface-dark)] pt-36 text-[color:var(--text-inverse)] md:pt-40"
      aria-labelledby="home-hero-title"
      style={{
        backgroundImage: `${brandTokens.gradients.businessDepth}, url(${brandTokens.assets.routeGridPattern})`
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,255,0,0.52),transparent)]" aria-hidden="true" />
      <div className="absolute -right-28 top-28 hidden size-[420px] rounded-full border border-[var(--border-dark-soft)] bg-[radial-gradient(circle,rgba(198,255,0,0.16),transparent_64%)] lg:block" aria-hidden="true" />

      <div className="container-premium grid min-h-[calc(100vh-88px)] gap-12 pb-16 lg:grid-cols-[1fr_0.86fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-3 rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] px-4 py-3 text-sm font-black text-[color:var(--lime-signal)]">
            <BrandIcon name="location" size={20} />
            {homeHero.kicker}
          </p>

          <h1 id="home-hero-title" className="mt-7 text-[2.68rem] font-black leading-[1.04] tracking-normal md:text-[4.9rem] lg:text-[5.4rem]">
            {homeHero.title}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--text-inverse-muted)] md:text-xl md:leading-9">
            {homeHero.text}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <TrackedAction
              href={homeHero.primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--lime-signal)] px-6 py-3 text-sm font-black text-[color:var(--lime-text)] shadow-[var(--shadow-signal)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
              pageSlug="home"
              pageType="home"
              ctaLabel={homeHero.primaryCta.label}
              ctaLocation="home_hero"
              leadTopic="first_step"
              collectorType="situation_review"
            >
              {homeHero.primaryCta.label}
            </TrackedAction>
            <TrackedAction
              href={homeHero.secondaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--border-dark-subtle)] bg-[var(--surface-dark-subtle)] px-6 py-3 text-sm font-black text-[color:var(--text-inverse)] transition hover:bg-[var(--surface-dark-subtle-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
              pageSlug="home"
              pageType="home"
              ctaLabel={homeHero.secondaryCta.label}
              ctaLocation="home_hero"
              leadTopic="show_documents"
              collectorType="show_documents"
            >
              {homeHero.secondaryCta.label}
            </TrackedAction>
          </div>

          <ul className="mt-8 grid gap-3 text-sm text-[color:var(--text-inverse-soft)] sm:grid-cols-3">
            {homeHero.signals.map((signal) => (
              <li key={signal} className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[var(--lime-signal)]" aria-hidden="true" />
                {signal}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[420px]" aria-hidden="true">
          <div className="absolute inset-0 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.04)] shadow-[var(--shadow-panel)]" />
          <div className="absolute left-8 right-8 top-8 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(17,24,33,0.72)] p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-[8px] bg-[var(--lime-signal)] text-[color:var(--lime-text)]">
                <BrandIcon name="route" size={24} />
              </span>
              <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(198,255,0,0.68),transparent)]" />
            </div>
            <div className="grid gap-3">
              {["ситуация", "разбор", "комплект документов", "следующий шаг"].map((item, index) => (
                <div key={item} className="grid grid-cols-[36px_1fr] items-center gap-3 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.06)] p-3">
                  <span className="grid size-9 place-items-center rounded-[8px] bg-[rgba(198,255,0,0.14)] text-xs font-black text-[color:var(--lime-signal)]">
                    {index + 1}
                  </span>
                  <span className="text-sm font-black text-[color:var(--text-inverse)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-8 left-12 right-12 grid gap-2 rounded-[8px] border border-[var(--border-dark-soft)] bg-[rgba(255,255,255,0.06)] p-5">
            <span className="h-2 w-3/5 rounded-full bg-[rgba(255,255,255,0.32)]" />
            <span className="h-2 w-4/5 rounded-full bg-[rgba(198,255,0,0.42)]" />
            <span className="h-2 w-2/5 rounded-full bg-[rgba(255,255,255,0.22)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
