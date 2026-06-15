import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShowDocumentsPlaceholder } from "@/components/forms/ShowDocumentsPlaceholder";
import { JsonLd } from "@/components/JsonLd";
import { TrackedAction } from "@/components/tracking/TrackedAction";
import { cta, getParentPage, getRoutePage, routePages, site } from "@/lib/content";
import type { RoutePage } from "@/lib/content";
import { routePageSlugs } from "@/lib/routes/route-page-data";

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
    } as const;
  }

  if (documentHeavySlugs.has(page.slug)) {
    return {
      href: "/razbor-situacii/",
      kind: "show_documents",
      label: cta.docs,
      note: "Без публичной загрузки файлов: сначала согласуем безопасный способ показать документы."
    } as const;
  }

  return {
    href: "/razbor-situacii/",
    kind: "situation_review",
    label: cta.primary,
    note: null
  } as const;
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
      canonical: page.href
    },
    openGraph: {
      title,
      description: page.metadataDescription ?? page.description,
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
  const serviceJsonLd =
    page.pageType === "money"
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: page.title,
          provider: {
            "@id": `${site.domain}/#business`
          },
          areaServed: "Симферополь",
          serviceType: "Подготовка документов для бизнеса"
        }
      : null;

  return (
    <main id="main-content">
      {serviceJsonLd ? <JsonLd data={serviceJsonLd} /> : null}

      <section className="section-pad dimmed-page-section">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="reveal-block" data-reveal="left">
            <nav className="mb-8 flex flex-wrap gap-2 text-sm font-bold text-[color:var(--text-inverse-soft)]" aria-label="Хлебные крошки">
              <Link href="/" className="text-[color:var(--lime-signal)]">
                Главная
              </Link>
              {parent ? (
                <>
                  <span>/</span>
                  <Link href={parent.href} className="text-[color:var(--lime-signal)]">
                    {parent.shortTitle}
                  </Link>
                </>
              ) : null}
            </nav>
            <p className="eyebrow-line">{page.kicker}</p>
            <h1 className="display-serif mt-6 text-[2.65rem] font-semibold leading-[0.98] text-[color:var(--text-inverse)] md:text-7xl">
              {page.title}
            </h1>
            <p className="mt-7 text-xl leading-9 text-[color:var(--text-inverse-muted)]">{page.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <TrackedAction
                href={primaryCollector.href}
                className="rounded-full bg-[#162844] px-7 py-4 text-sm font-black text-white"
                pageSlug={page.slug}
                pageType={page.pageType}
                ctaLabel={primaryCollector.label}
                ctaLocation="dynamic_route_hero"
                leadTopic={page.leadTopic ?? page.slug}
                collectorType={primaryCollector.kind}
              >
                {primaryCollector.label}
              </TrackedAction>
              <TrackedAction
                href={site.phoneHref}
                className="rounded-full border border-[#16284422] bg-white/72 px-7 py-4 text-sm font-black text-[#162844]"
                pageSlug={page.slug}
                pageType={page.pageType}
                ctaLabel="Позвонить"
                ctaLocation="dynamic_route_hero"
                leadTopic={page.leadTopic ?? page.slug}
                collectorType="phone"
                contactChannel="phone"
              >
                Позвонить
              </TrackedAction>
            </div>
            {primaryCollector.note ? (
              <p className="mt-4 max-w-xl text-sm leading-7 text-[color:var(--text-inverse-soft)]">{primaryCollector.note}</p>
            ) : null}
          </div>

          <img
            src={page.image}
            alt={page.imageAlt}
            className="reveal-block rounded-[8px] shadow-[0_24px_74px_rgba(22,40,68,0.16)]"
            data-reveal="right"
          />
        </div>
      </section>

      <section className="section-pad dimmed-page-section">
        <div className="container-premium grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal-block rounded-[8px] bg-[rgba(17,24,33,0.86)] p-8 text-white backdrop-blur-[2px]" data-reveal="left">
            <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[#c69a47]">Что важно на старте</p>
            <ul className="mt-6 grid gap-4">
              {page.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-white/78">
                  <span className="text-[#c69a47]">✓</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <article className="rich-text reveal-block rounded-[8px] border border-[#16284414] bg-white/78 p-8 shadow-[0_22px_58px_rgba(22,40,68,0.08)] backdrop-blur-[1px]" data-reveal="right">
            <h2 className="display-serif mb-6 text-4xl font-semibold leading-tight text-[#111821]">
              Как мы подходим к задаче
            </h2>
            {page.longText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {page.pageType === "hub" ? (
              <div className="mt-8 rounded-[8px] border border-[#16284414] bg-white/58 p-5">
                <p className="font-black text-[#111821]">Раздел помогает выбрать направление, но не заменяет разбор ситуации.</p>
                <p className="mt-2 text-sm leading-7 text-[#667184]">
                  Если вопрос смешанный, начните с первичного разбора и принесите документы, которые уже есть.
                </p>
              </div>
            ) : null}
          </article>
        </div>
      </section>
      {p0ShowDocumentsPlaceholderSlugs.has(page.slug) ? (
        <ShowDocumentsPlaceholder pageSlug={page.slug} pageType={page.pageType} leadTopic={page.leadTopic ?? page.slug} />
      ) : null}
    </main>
  );
}
