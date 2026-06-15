import Link from "next/link";
import type { ReactNode } from "react";
import { brandTokens, type ServiceContourKey } from "@/lib/brand/brand-tokens";
import { cta, site } from "@/lib/content";

type PilotCard = {
  contourKey: ServiceContourKey;
  href: string;
  title: string;
  text: string;
  bullets: string[];
};

const routeSteps = [
  {
    number: "01",
    title: "Ситуация",
    text: "Что уже есть по вопросу"
  },
  {
    number: "02",
    title: "Разбор",
    text: "Смотрим документы и вводные"
  },
  {
    number: "03",
    title: "Документы",
    text: "Понимаем нужный комплект"
  },
  {
    number: "04",
    title: "Следующий шаг",
    text: "Выбираем безопасный маршрут"
  }
];

const pilotCards: PilotCard[] = [
  {
    contourKey: "urgent-unclear-request",
    href: "/srochnye-voprosy/",
    title: "Требование, запрос или неясный вопрос",
    text: "Подходит, когда сначала нужно понять источник вопроса и что смотреть в документах.",
    bullets: ["без паники", "смотрим исходный документ", "выбираем ближайший маршрут"]
  },
  {
    contourKey: "reporting",
    href: "/otchetnost/",
    title: "Отчётность и исходные данные",
    text: "Для вопросов, где важно собрать период, операции и документы перед подготовкой.",
    bullets: ["период и режим", "что уже есть", "что нужно уточнить"]
  },
  {
    contourKey: "bank-115fz",
    href: "/bank-i-115-fz/",
    title: "Запрос банка и 115-ФЗ",
    text: "Для ситуации, где документальный пакет зависит от конкретного запроса и операции.",
    bullets: ["текст запроса", "документы по операции", "без обещания исхода"]
  },
  {
    contourKey: "address-egrul-director",
    href: "/adres-egryul-direktor/",
    title: "Адрес, ЕГРЮЛ и изменения",
    text: "Для выбора между адресом, изменениями и связанными документами компании.",
    bullets: ["исходные сведения", "что меняется", "какой маршрут подходит"]
  }
];

const accentClassByColor: Record<string, string> = {
  blue: "border-[var(--accent-blue-border)] bg-[var(--accent-blue-bg)] text-[color:var(--blue)]",
  emerald: "border-[var(--accent-emerald-border)] bg-[var(--accent-emerald-bg)] text-[color:var(--emerald)]",
  gold: "border-[var(--accent-gold-border)] bg-[var(--accent-gold-bg)] text-[color:var(--accent-gold-text)]",
  wine: "border-[var(--accent-wine-border)] bg-[var(--accent-wine-bg)] text-[color:var(--wine)]",
  navy: "border-[var(--accent-navy-border)] bg-[var(--accent-navy-bg)] text-[color:var(--navy)]",
  muted: "border-[var(--accent-muted-border)] bg-[var(--accent-muted-bg)] text-[color:var(--text-secondary)]"
};

const accentMarkerByColor: Record<string, string> = {
  blue: "bg-[var(--blue)]",
  emerald: "bg-[var(--emerald)]",
  gold: "bg-[var(--gold)]",
  wine: "bg-[var(--wine)]",
  navy: "bg-[var(--navy)]",
  muted: "bg-[var(--muted)]"
};

function getAccentClass(contourKey: ServiceContourKey) {
  const accent = brandTokens.serviceContours[contourKey].accent;
  return accentClassByColor[accent] ?? accentClassByColor.blue;
}

function getAccentMarkerClass(contourKey: ServiceContourKey) {
  const accent = brandTokens.serviceContours[contourKey].accent;
  return accentMarkerByColor[accent] ?? accentMarkerByColor.blue;
}

function MatrixCtaLink({
  href,
  children,
  variant = "primary",
  ariaLabel
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "darkSecondary" | "lightPrimary";
  ariaLabel?: string;
}) {
  const classes =
    variant === "lightPrimary"
      ? "bg-[var(--lime-signal)] text-[color:var(--lime-text)] shadow-[var(--shadow-signal)] hover:-translate-y-0.5 hover:bg-[var(--lime-soft)] focus-visible:outline-[var(--focus-on-dark)]"
      : variant === "primary"
        ? "bg-[var(--surface-dark-strong)] text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)] hover:-translate-y-0.5 focus-visible:outline-[var(--focus-on-light)]"
      : variant === "darkSecondary"
        ? "border border-[var(--border-dark-subtle)] bg-[var(--surface-dark-subtle)] text-[color:var(--text-inverse)] hover:bg-[var(--surface-dark-subtle-hover)] focus-visible:outline-[var(--focus-on-dark)]"
        : "border border-[var(--line)] bg-[var(--surface-raised-soft)] text-[color:var(--surface-dark-strong)] hover:bg-[var(--surface-raised)] focus-visible:outline-[var(--focus-on-light)]";

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`inline-flex min-h-12 items-center justify-center rounded-[8px] px-5 py-3 text-sm font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${classes}`}
    >
      {children}
    </Link>
  );
}

function MatrixPhoneLink({ variant = "secondary" }: { variant?: "secondary" | "darkSecondary" }) {
  const classes =
    variant === "darkSecondary"
      ? "border border-[var(--border-dark-subtle)] bg-[var(--surface-dark-subtle)] text-[color:var(--text-inverse)] hover:bg-[var(--surface-dark-subtle-hover)] focus-visible:outline-[var(--focus-on-dark)]"
      : "border border-[var(--line)] bg-[var(--surface-raised-soft)] text-[color:var(--surface-dark-strong)] hover:bg-[var(--surface-raised)] focus-visible:outline-[var(--focus-on-light)]";

  return (
    <a
      href={site.phoneHref}
      aria-label="Позвонить в Документы для бизнеса"
      className={`inline-flex min-h-12 items-center justify-center rounded-[8px] px-5 py-3 text-sm font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${classes}`}
    >
      {cta.phone}
    </a>
  );
}

export function MatrixRouteVisual({ compact = false }: { compact?: boolean }) {
  return (
    <ol
      className={`relative grid gap-3 ${compact ? "md:grid-cols-2" : "md:grid-cols-4"}`}
      aria-label="Порядок: ситуация, разбор, документы, следующий шаг"
    >
      <span className="pointer-events-none absolute left-6 right-6 top-7 hidden h-px bg-[var(--route-gradient)] md:block" />
      {routeSteps.map((step) => (
        <li
          key={step.number}
          className="relative rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised-soft)] p-4 shadow-[var(--shadow-card-sm)]"
        >
          <span className="inline-grid size-10 place-items-center rounded-[8px] bg-[var(--surface-dark-strong)] text-sm font-black text-[color:var(--text-inverse)]">
            {step.number}
          </span>
          <h3 className="mt-4 text-lg font-black text-[color:var(--text-primary)]">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function MatrixHero() {
  return (
    <section
      className="relative overflow-hidden pt-36"
      style={{
        backgroundImage: `${brandTokens.gradients.paperGlow}, url(${brandTokens.assets.routeGridPattern})`,
        backgroundSize: "auto, 520px",
        backgroundPosition: "center, center top"
      }}
    >
      <div className="container-premium grid min-h-[720px] gap-10 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="reveal-block" data-reveal="left">
          <p className="eyebrow-line">Центр подготовки документов · Симферополь</p>
          <h1 className="display-serif mt-7 max-w-4xl text-[2.55rem] font-semibold leading-[0.98] text-[color:var(--text-primary)] md:text-7xl">
            Разберём ситуацию и подготовим документы для бизнеса
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--text-secondary)] md:text-xl md:leading-9">
            Спокойный маршрут через документы: сначала смотрим ситуацию, затем отделяем ближайший шаг и понимаем, какой комплект готовить.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <MatrixCtaLink href="/razbor-situacii/" ariaLabel="Разобрать ситуацию по документам">
              {cta.primary}
            </MatrixCtaLink>
            <MatrixPhoneLink />
          </div>
          <p className="mt-5 text-sm leading-7 text-[color:var(--text-secondary)]">
            Лучше начать с ситуации, а не угадывать название услуги. {site.landmark}.
          </p>
        </div>

        <div className="reveal-block rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised-soft)] p-4 shadow-[var(--shadow-panel)] backdrop-blur" data-reveal="right">
          <div className="rounded-[8px] bg-[var(--paper)] p-4">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[color:var(--blue)]">С чего начать</p>
            <MatrixRouteVisual compact />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CompactLocalContactStrip() {
  return (
    <section className="bg-[var(--surface-dark-strong)] py-5 text-[color:var(--text-inverse)]" aria-label="Локальный контактный блок">
      <div className="container-premium grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="grid gap-1 text-sm leading-6 text-[color:var(--text-inverse-muted)] md:grid-cols-3 md:items-center">
          <strong className="text-base text-[color:var(--text-inverse)]">Симферополь</strong>
          <span>{site.landmark}</span>
          <span>{site.address}</span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={site.phoneHref}
            className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--surface-raised)] px-4 py-2 text-sm font-black text-[color:var(--surface-dark-strong)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
            aria-label="Позвонить в Документы для бизнеса"
          >
            {cta.phone}
            <span className="ml-2 text-[color:var(--navy-muted)]">{site.phone}</span>
          </a>
          <MatrixCtaLink href="/kontakty/" variant="darkSecondary" ariaLabel="Построить маршрут в офис">
            {cta.route}
          </MatrixCtaLink>
        </div>
      </div>
    </section>
  );
}

export function ServiceContourCards() {
  return (
    <section className="section-pad bg-[var(--surface-section-light)]">
      <div className="container-premium">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">Разделы</p>
            <h2 className="display-serif mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
              Выберите ближайшую ситуацию.
            </h2>
          </div>
          <p className="reveal-block text-lg leading-9 text-[color:var(--text-secondary)]" data-reveal="right">
            Если вопрос смешанный или неясный, начните с разбора. Если ситуация уже понятна, переходите к ближайшему маршруту.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pilotCards.map((card) => {
            const contour = brandTokens.serviceContours[card.contourKey];
            return (
              <article
                key={card.contourKey}
                data-service-contour={card.contourKey}
                data-contour-marker={contour.marker}
                className="reveal-block group flex min-h-full flex-col rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card-md)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card-md-hover)] focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-card-md-hover)]"
                data-reveal="up"
              >
                <span className={`inline-flex w-fit rounded-[8px] border px-3 py-1 text-xs font-black ${getAccentClass(card.contourKey)}`}>
                  {contour.title}
                </span>
                <span className={`mt-5 block h-1.5 w-16 rounded-full ${getAccentMarkerClass(card.contourKey)}`} aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black leading-tight text-[color:var(--text-primary)]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{card.text}</p>
                <ul className="mt-5 grid gap-2 text-sm leading-6 text-[color:var(--text-secondary)]">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className={`mt-2 size-1.5 shrink-0 rounded-full ${getAccentMarkerClass(card.contourKey)}`} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={card.href}
                  className="mt-auto inline-flex min-h-11 w-fit items-center pt-6 text-sm font-black text-[color:var(--blue)] transition group-hover:text-[color:var(--surface-dark-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
                  aria-label={`${contour.cta}: ${card.title}`}
                >
                  {contour.cta}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function RouteVisualSection() {
  return (
    <section className="section-pad">
      <div className="container-premium grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="reveal-block" data-reveal="left">
          <p className="eyebrow-line">Порядок</p>
          <h2 className="display-serif mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
            Понятный порядок вместо угадывания.
          </h2>
          <p className="mt-6 text-lg leading-9 text-[color:var(--text-secondary)]">
            На первом шаге достаточно понять, что уже есть по вопросу, какие документы нужно посмотреть и куда двигаться дальше.
          </p>
        </div>
        <div className="reveal-block rounded-[8px] border border-[var(--line)] bg-[var(--surface-light)] p-4 shadow-[var(--shadow-card-lg)]" data-reveal="right">
          <MatrixRouteVisual />
        </div>
      </div>
    </section>
  );
}

export function CalmCtaBlock() {
  return (
    <section className="section-pad bg-[var(--surface-dark)] text-[color:var(--text-inverse)]">
      <div className="container-premium grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="reveal-block" data-reveal="left">
          <p className="eyebrow-line text-[color:var(--text-inverse-soft)]">Первый шаг</p>
          <h2 className="display-serif mt-5 text-4xl font-semibold leading-tight md:text-6xl">
            Не уверены в маршруте? Начните с разбора.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-[color:var(--text-inverse-muted)]">
            Онлайн-отправка пока настраивается. Чтобы не потерять вопрос, позвоните или приезжайте в офис с тем, что уже есть. Если нужно показать документы, согласуем безопасный способ.
          </p>
        </div>
        <div className="reveal-block grid gap-3 sm:grid-cols-2 lg:min-w-[440px]" data-reveal="right">
          <MatrixCtaLink href="/razbor-situacii/" variant="lightPrimary" ariaLabel="Разобрать ситуацию">
            {cta.primary}
          </MatrixCtaLink>
          <MatrixPhoneLink variant="darkSecondary" />
          <MatrixCtaLink href="/kontakty/" variant="darkSecondary" ariaLabel="Построить маршрут">
            {cta.route}
          </MatrixCtaLink>
          <MatrixCtaLink href="/kontakty/" variant="darkSecondary" ariaLabel="Показать документы безопасным способом">
            {cta.docs}
          </MatrixCtaLink>
        </div>
      </div>
    </section>
  );
}
