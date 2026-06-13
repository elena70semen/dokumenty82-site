import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShowDocumentsPlaceholder } from "@/components/forms/ShowDocumentsPlaceholder";
import { JsonLd } from "@/components/JsonLd";
import { RouteProductFoundation } from "@/components/routes/RouteProductFoundation";
import { brandTokens } from "@/lib/brand/brand-tokens";
import { cta, getParentPage, getRoutePage, routePages, site } from "@/lib/content";
import type { RoutePage } from "@/lib/content";
import { analyticsGoalNames } from "@/lib/integrations/analytics-events";
import { routePageSlugs } from "@/lib/routes/route-page-data";
import { buildBreadcrumbListJsonLd } from "@/lib/seo/structured-data";

const documentHeavySlugs = new Set([
  "otvet-na-trebovanie-ifns",
  "otvet-na-zapros-banka",
  "dokumenty-dlya-banka-115-fz",
  "deklaraciya-usn",
  "nulevaya-otchetnost-ooo",
  "nulevaya-otchetnost-ip",
  "yuridicheskiy-adres-simferopol",
  "smena-yuridicheskogo-adresa-ooo",
  "nedostovernost-yuridicheskogo-adresa"
]);

const p0ShowDocumentsPlaceholderSlugs = new Set([
  "otvet-na-trebovanie-ifns",
  "otvet-na-zapros-banka",
  "dokumenty-dlya-banka-115-fz",
  "deklaraciya-usn",
  "nulevaya-otchetnost-ooo",
  "nulevaya-otchetnost-ip",
  "yuridicheskiy-adres-simferopol",
  "nedostovernost-yuridicheskogo-adresa"
]);

function getPrimaryCollector(page: RoutePage) {
  if (page.primaryCtaLabel && page.primaryCtaHref) {
    return {
      href: page.primaryCtaHref,
      kind: page.primaryCtaLabel === cta.docs ? "show_documents" : "situation_review",
      label: page.primaryCtaLabel,
      note: page.safeCtaNote
    };
  }

  if (documentHeavySlugs.has(page.slug)) {
    return {
      href: "/razbor-situacii/",
      kind: "show_documents",
      label: cta.docs,
      note: "Без публичной загрузки файлов: сначала согласуем безопасный способ показать документы."
    };
  }

  return {
    href: "/razbor-situacii/",
    kind: "situation_review",
    label: cta.primary,
    note: null
  };
}

function getRelatedRoutePages(page: RoutePage) {
  const childRoutes = routePages.filter((candidate) => candidate.parentHref === page.href && candidate.href !== page.href);
  const sourceRelatedRoutes = (page.relatedHrefs ?? [])
    .map((href) => routePages.find((candidate) => candidate.href === href))
    .filter((candidate): candidate is RoutePage => candidate !== undefined && candidate.href !== page.href);

  const orderedRoutes = page.pageType === "hub" ? [...childRoutes, ...sourceRelatedRoutes] : [...sourceRelatedRoutes, ...childRoutes];
  const seen = new Set<string>();

  return orderedRoutes.filter((candidate) => {
    if (seen.has(candidate.href)) return false;
    seen.add(candidate.href);
    return true;
  });
}

function getHardeningBlocks(page: RoutePage) {
  return [
    { title: "Что проверяем", items: page.whatWeCheck ?? [] },
    { title: "Какие вводные нужны", items: page.documentsOrData ?? [] },
    { title: "Как начинается работа", items: page.howWorkStarts ?? [] },
    { title: "Что не обещаем", items: page.notPromised ?? [] }
  ].filter((block) => block.items.length > 0);
}

function getPageTypeLabel(page: RoutePage) {
  if (page.pageType === "hub") return "Хаб маршрутов";
  if (page.pageType === "diagnostic") return "Диагностический маршрут";
  return "Точная страница услуги";
}

function getRoutePassportItems(page: RoutePage) {
  return [
    { label: "Тип страницы", value: getPageTypeLabel(page) },
    { label: "Группа", value: page.routeGroup ?? page.kicker },
    { label: "Этап", value: page.routePhase ?? "Первичный разбор" },
    { label: "Интент", value: page.mainIntent ?? page.shortTitle }
  ].filter((item) => item.value);
}

export function generateStaticParams() {
  const staticRoutePageSlugs = new Set<string>(routePageSlugs);

  return routePages.filter((page) => !staticRoutePageSlugs.has(page.slug)).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getRoutePage(slug);

  if (!page) {
    return {};
  }

  const title = page.metadataTitle ?? page.title;
  const description = page.metadataDescription ?? `${page.description} ${site.name}, ${site.addressShort}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${site.domain}${page.href}`
    },
    openGraph: {
      title,
      description: page.metadataDescription ?? page.description,
      url: `${site.domain}${page.href}`,
      images: [page.image]
    }
  };
}

export default async function CanonRoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getRoutePage(slug);

  if (!page) {
    notFound();
  }

  const parent = getParentPage(page.parentHref);
  const primaryCollector = getPrimaryCollector(page);
  const relatedRoutes = getRelatedRoutePages(page);
  const hardeningBlocks = getHardeningBlocks(page);
  const routePassportItems = getRoutePassportItems(page);
  const showDocumentsPlaceholder = p0ShowDocumentsPlaceholderSlugs.has(page.slug) || page.primaryCtaLabel === cta.docs;
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: "Главная", href: "/" },
    ...(parent ? [{ name: parent.shortTitle, href: parent.href }] : []),
    { name: page.shortTitle, href: page.href }
  ]);
  const serviceJsonLd =
    page.pageType === "money"
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: page.title,
          url: `${site.domain}${page.href}`,
          description: page.description,
          provider: {
            "@id": `${site.domain}/#business`
          },
          areaServed: "Симферополь",
          serviceType: "Подготовка документов для бизнеса"
        }
      : null;

  return (
    <main id="main-content" data-route-page-template="dynamic" data-stage18h-route-content="true">
      <JsonLd data={breadcrumbJsonLd} />
      {serviceJsonLd ? <JsonLd data={serviceJsonLd} /> : null}

      <section
        className="relative isolate overflow-hidden bg-[var(--surface-dark)] pt-32 text-[color:var(--text-inverse)] md:pt-36"
        aria-labelledby={`route-title-${page.slug}`}
        style={{
          backgroundImage: `${brandTokens.gradients.businessDepth}, url(${brandTokens.assets.routeGridPattern})`
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,255,0,0.52),transparent)]" aria-hidden="true" />
        <div className="container-premium grid gap-9 pb-12 lg:min-h-[calc(78vh-88px)] lg:grid-cols-[1.02fr_0.88fr] lg:items-center lg:gap-10 lg:pb-14">
          <div className="reveal-block" data-reveal="left">
            <nav className="breadcrumb-trail mb-7 text-[color:var(--text-inverse-muted)]" aria-label="Хлебные крошки">
              <Link href="/" className="inline-flex min-h-10 items-center rounded-[8px] text-[color:var(--lime-signal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]">
                Главная
              </Link>
              {parent ? (
                <>
                  <span>/</span>
                  <Link href={parent.href} className="inline-flex min-h-10 items-center rounded-[8px] text-[color:var(--lime-signal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]">
                    {parent.shortTitle}
                  </Link>
                </>
              ) : null}
              <span>/</span>
              <span aria-current="page" className="inline-flex min-h-10 min-w-0 items-center break-words text-[color:var(--text-inverse)]">
                {page.shortTitle}
              </span>
            </nav>
            <p className="inline-flex items-center gap-3 rounded-[8px] border border-[var(--border-dark-soft)] bg-[var(--surface-dark-subtle)] px-4 py-3 text-sm font-black text-[color:var(--lime-signal)]">
              {page.kicker}
            </p>
            <h1 id={`route-title-${page.slug}`} className="mt-7 max-w-full break-words text-[1.95rem] font-black leading-[1.08] tracking-normal [overflow-wrap:anywhere] sm:text-[2.55rem] sm:leading-[1.04] xl:text-[4.9rem] xl:leading-[1.01]">
              {page.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--text-inverse-muted)] md:text-xl md:leading-9">{page.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={primaryCollector.href}
                className="inline-flex min-h-12 w-full min-w-[184px] items-center justify-center rounded-[8px] bg-[var(--lime-signal)] px-6 py-3 text-center text-sm font-black text-[color:var(--lime-text)] shadow-[var(--shadow-signal)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)] sm:w-auto"
                data-analytics-goal={primaryCollector.label === cta.docs ? analyticsGoalNames.docsShowClick : analyticsGoalNames.formStart}
                data-collector-kind={primaryCollector.kind}
                data-cta-label={primaryCollector.label}
                data-cta-location="dynamic_route_hero_primary"
                data-lead-topic={page.leadTopic ?? page.slug}
                data-page-slug={page.slug}
                data-page-type={page.pageType}
              >
                {primaryCollector.label}
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-12 w-full min-w-[184px] items-center justify-center rounded-[8px] border border-[var(--border-dark-subtle)] bg-[var(--surface-dark-subtle)] px-6 py-3 text-center text-sm font-black text-[color:var(--text-inverse)] transition hover:bg-[var(--surface-dark-subtle-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)] sm:w-auto"
                data-analytics-goal={analyticsGoalNames.callClick}
                data-cta-label="Позвонить"
                data-cta-location="dynamic_route_hero_secondary"
                data-lead-topic={page.leadTopic ?? page.slug}
                data-page-slug={page.slug}
                data-page-type={page.pageType}
              >
                Позвонить
              </a>
            </div>
            {primaryCollector.note ? (
              <p className="mt-4 max-w-xl text-sm leading-7 text-[color:var(--text-inverse-soft)]">{primaryCollector.note}</p>
            ) : null}
          </div>

          <aside className="reveal-block premium-card-dark p-4 lg:p-5" data-reveal="right" aria-label="Контекст страницы">
            <img
              src={page.image}
              alt={page.imageAlt}
              className="aspect-[4/3] w-full rounded-[8px] object-cover shadow-[var(--shadow-panel)]"
            />
            <div className="route-passport mt-4 sm:grid-cols-2">
              {routePassportItems.map((item) => (
                <div key={item.label} className="route-passport-item">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-[var(--paper-soft)]">
        <div className="container-premium grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal-block premium-card-dark h-full p-8" data-reveal="left">
            <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[color:var(--lime-signal)]">Что важно на старте</p>
            <ul className="mt-6 grid gap-4">
              {page.bullets.map((bullet) => (
                <li key={bullet} className="flex min-w-0 gap-3 text-[color:var(--text-inverse-muted)]">
                  <span className="font-black text-[color:var(--lime-signal)]">✓</span>
                  <span className="min-w-0 break-words">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <article className="rich-text reveal-block premium-card-strong h-full p-8" data-reveal="right">
            <h2 className="display-serif mb-6 text-4xl font-semibold leading-tight text-[color:var(--text-primary)]">
              Как мы подходим к задаче
            </h2>
            {page.longText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {page.pageType === "hub" ? (
              <div className="mt-8 rounded-[8px] border border-[var(--line)] bg-[var(--paper)] p-5">
                <p className="font-black text-[color:var(--text-primary)]">Хаб помогает выбрать маршрут, но не заменяет разбор ситуации.</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">
                  Если вопрос смешанный, начните с первичного разбора и принесите документы, которые уже есть.
                </p>
              </div>
            ) : null}
          </article>
        </div>
      </section>

      {hardeningBlocks.length > 0 ? (
        <section
          className="section-pad bg-[var(--surface-raised)]"
          aria-labelledby={`route-hardening-${page.slug}`}
          data-route-hardening-blocks="what_we_check documents_data_needed how_work_starts what_is_not_promised"
        >
          <div className="container-premium">
            <div className="section-heading-grid">
              <div>
                <p className="eyebrow-line">Маршрут задачи</p>
                <h2 id={`route-hardening-${page.slug}`} className="display-serif mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
                  Сначала разбираем вводные
                </h2>
              </div>
              <p className="section-copy">
                Сверяем вводные именно для этой страницы: источник вопроса, документы на руках, безопасный способ показа и границу соседних маршрутов.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {hardeningBlocks.map((block) => (
                <article key={block.title} className="premium-card flex h-full min-w-0 flex-col p-5 md:min-h-[220px]">
                  <h3 className="text-xl font-black leading-tight text-[color:var(--text-primary)]">{block.title}</h3>
                  <ul className="mt-5 grid flex-1 gap-3 text-sm leading-7 text-[color:var(--text-secondary)]">
                    {block.items.map((item) => (
                      <li key={item} className="flex min-w-0 gap-3">
                        <span className="font-black text-[color:var(--gold)]">✓</span>
                        <span className="min-w-0 break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <RouteProductFoundation path={page.href} />

      {relatedRoutes.length > 0 ? (
        <section className="section-pad bg-[var(--paper)]" aria-labelledby={`related-${page.slug}`}>
          <div className="container-premium">
            <div className="section-heading-grid">
              <div>
                <p className="eyebrow-line">Связанные маршруты</p>
                <h2 id={`related-${page.slug}`} className="display-serif mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
                  Не смешиваем разные задачи
                </h2>
              </div>
              <p className="section-copy">
                Ссылки ведут на утверждённые страницы и помогают сохранить один основной интент на URL.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedRoutes.map((relatedRoute) => (
                <article
                  key={relatedRoute.href}
                  className="premium-card premium-link-card flex min-w-0 flex-col p-5 md:min-h-[240px]"
                >
                  <p className="text-[0.72rem] font-black uppercase tracking-[0.18em] text-[color:var(--gold)]">
                    {relatedRoute.kicker}
                  </p>
                  <h3 className="mt-4 text-2xl font-black leading-tight text-[color:var(--text-primary)]">{relatedRoute.shortTitle}</h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-[color:var(--text-secondary)]">{relatedRoute.description}</p>
                  <Link
                    href={relatedRoute.href}
                    className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-[8px] bg-[var(--surface-dark-strong)] px-4 py-2 text-center text-sm font-black text-[color:var(--text-inverse)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
                    data-analytics-goal={analyticsGoalNames.relatedRouteClick}
                    data-cta-label={relatedRoute.shortTitle}
                    data-cta-location="dynamic_route_related"
                    data-lead-topic={page.leadTopic ?? page.slug}
                    data-page-slug={page.slug}
                    data-page-type={page.pageType}
                    data-related-href={relatedRoute.href}
                  >
                    {relatedRoute.shortTitle}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {showDocumentsPlaceholder ? <ShowDocumentsPlaceholder pageSlug={page.slug} pageType={page.pageType} leadTopic={page.leadTopic ?? page.slug} /> : null}
    </main>
  );
}
