import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShowDocumentsPlaceholder } from "@/components/forms/ShowDocumentsPlaceholder";
import { JsonLd } from "@/components/JsonLd";
import { RouteProductFoundation } from "@/components/routes/RouteProductFoundation";
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
  const relatedRoutes = getRelatedRoutePages(page);
  const hardeningBlocks = getHardeningBlocks(page);
  const showDocumentsPlaceholder = p0ShowDocumentsPlaceholderSlugs.has(page.slug) || page.primaryCtaLabel === cta.docs;
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
    <main id="main-content" className="pt-36" data-route-page-template="dynamic" data-stage18h-route-content="true">
      {serviceJsonLd ? <JsonLd data={serviceJsonLd} /> : null}

      <section className="section-pad">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="reveal-block" data-reveal="left">
            <nav className="mb-8 flex flex-wrap gap-2 text-sm font-bold text-[#667184]" aria-label="Хлебные крошки">
              <Link href="/" className="text-[#245da7]">
                Главная
              </Link>
              {parent ? (
                <>
                  <span>/</span>
                  <Link href={parent.href} className="text-[#245da7]">
                    {parent.shortTitle}
                  </Link>
                </>
              ) : null}
            </nav>
            <p className="eyebrow-line">{page.kicker}</p>
            <h1 className="display-serif mt-6 text-[2.65rem] font-semibold leading-[0.98] text-[#111821] md:text-7xl">
              {page.title}
            </h1>
            <p className="mt-7 text-xl leading-9 text-[#667184]">{page.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={primaryCollector.href}
                className="rounded-full bg-[#162844] px-7 py-4 text-sm font-black text-white"
                data-collector-kind={primaryCollector.kind}
                data-cta-label={primaryCollector.label}
                data-lead-topic={page.leadTopic ?? page.slug}
                data-page-slug={page.slug}
                data-page-type={page.pageType}
              >
                {primaryCollector.label}
              </Link>
              <a href={site.phoneHref} className="rounded-full border border-[#16284422] bg-white/72 px-7 py-4 text-sm font-black text-[#162844]">
                Позвонить
              </a>
            </div>
            {primaryCollector.note ? (
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#667184]">{primaryCollector.note}</p>
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

      <section className="section-pad bg-white/62">
        <div className="container-premium grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal-block rounded-[8px] bg-[#111821] p-8 text-white" data-reveal="left">
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
          <article className="rich-text reveal-block rounded-[8px] border border-[#16284414] bg-white/82 p-8 shadow-[0_22px_58px_rgba(22,40,68,0.08)]" data-reveal="right">
            <h2 className="display-serif mb-6 text-4xl font-semibold leading-tight text-[#111821]">
              Как мы подходим к задаче
            </h2>
            {page.longText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {page.pageType === "hub" ? (
              <div className="mt-8 rounded-[8px] border border-[#16284414] bg-[#f7f3ea] p-5">
                <p className="font-black text-[#111821]">Хаб помогает выбрать маршрут, но не заменяет разбор ситуации.</p>
                <p className="mt-2 text-sm leading-7 text-[#667184]">
                  Если вопрос смешанный, начните с первичного разбора и принесите документы, которые уже есть.
                </p>
              </div>
            ) : null}
          </article>
        </div>
      </section>

      {hardeningBlocks.length > 0 ? (
        <section
          className="section-pad bg-white"
          aria-labelledby={`route-hardening-${page.slug}`}
          data-route-hardening-blocks="what_we_check documents_data_needed how_work_starts what_is_not_promised"
        >
          <div className="container-premium">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="eyebrow-line">Маршрут задачи</p>
                <h2 id={`route-hardening-${page.slug}`} className="display-serif mt-5 text-4xl font-semibold leading-tight text-[#111821] md:text-6xl">
                  Сначала разбираем вводные
                </h2>
              </div>
              <p className="text-lg leading-9 text-[#667184]">
                Сверяем вводные именно для этой страницы: источник вопроса, документы на руках, безопасный способ показа и границу соседних маршрутов.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {hardeningBlocks.map((block) => (
                <article key={block.title} className="rounded-[8px] border border-[#16284414] bg-[#f7f3ea] p-5">
                  <h3 className="text-xl font-black leading-tight text-[#111821]">{block.title}</h3>
                  <ul className="mt-5 grid gap-3 text-sm leading-7 text-[#667184]">
                    {block.items.map((item) => (
                      <li key={item} className="flex min-w-0 gap-3">
                        <span className="font-black text-[#c69a47]">✓</span>
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
        <section className="section-pad bg-[#f7f3ea]" aria-labelledby={`related-${page.slug}`}>
          <div className="container-premium">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="eyebrow-line">Связанные маршруты</p>
                <h2 id={`related-${page.slug}`} className="display-serif mt-5 text-4xl font-semibold leading-tight text-[#111821] md:text-6xl">
                  Не смешиваем разные задачи
                </h2>
              </div>
              <p className="text-lg leading-9 text-[#667184]">
                Ссылки ведут на утверждённые страницы и помогают сохранить один основной интент на URL.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedRoutes.map((relatedRoute) => (
                <article
                  key={relatedRoute.href}
                  className="flex min-h-[220px] flex-col rounded-[8px] border border-[#16284414] bg-white/84 p-5 shadow-[0_18px_46px_rgba(22,40,68,0.08)]"
                >
                  <p className="text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#c69a47]">
                    {relatedRoute.kicker}
                  </p>
                  <h3 className="mt-4 text-2xl font-black leading-tight text-[#111821]">{relatedRoute.shortTitle}</h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-[#667184]">{relatedRoute.description}</p>
                  <Link
                    href={relatedRoute.href}
                    className="mt-6 inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[#162844] px-4 py-2 text-sm font-black text-white"
                  >
                    Открыть маршрут
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {showDocumentsPlaceholder ? <ShowDocumentsPlaceholder /> : null}
    </main>
  );
}
