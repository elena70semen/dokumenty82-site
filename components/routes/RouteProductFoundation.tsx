import Link from "next/link";
import { getProductFoundation } from "@/lib/product-foundation";
import { analyticsGoalNames } from "@/lib/integrations/analytics-events";

type RouteProductFoundationProps = {
  path: string;
  variant?: "summary" | "full";
};

function ProductList({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="premium-card flex h-full min-w-0 flex-col p-5">
      <h3 className="text-xl font-black leading-tight text-[color:var(--text-primary)]">{title}</h3>
      <ul className="mt-5 grid flex-1 gap-3 text-sm leading-7 text-[color:var(--text-secondary)]">
        {items.map((item) => (
          <li key={item} className="flex min-w-0 gap-3">
            <span className="font-black text-[color:var(--gold)]">✓</span>
            <span className="min-w-0 break-words">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function getSlugFromPath(path: string) {
  if (path === "/" || path === "") return "home";
  return path.replace(/^\/|\/$/g, "") || "home";
}

function getGoalForLabel(label: string) {
  if (label === "Позвонить") return analyticsGoalNames.callClick;
  if (label === "Построить маршрут") return analyticsGoalNames.routeClick;
  if (label === "Показать документы") return analyticsGoalNames.docsShowClick;
  return analyticsGoalNames.formStart;
}

export function RouteProductFoundation({ path, variant = "summary" }: RouteProductFoundationProps) {
  const foundation = getProductFoundation(path);

  if (!foundation) return null;

  const pageSlug = getSlugFromPath(path);
  const pageType = pageSlug === "policy" ? "legal" : "route";
  const shouldExposeAnalyticsData = pageType !== "legal";

  const operationalBlocks =
    variant === "full"
      ? [
          { title: "Что проверяем", items: foundation.whatWeCheck },
          { title: "Какие вводные помогут", items: foundation.documentsData },
          { title: "Как начинается работа", items: foundation.howWorkStarts },
          { title: "Чего не обещаем", items: foundation.notPromised }
        ]
      : [];

  return (
    <section
      className="section-pad bg-[var(--paper)]"
      aria-labelledby={`product-foundation-${foundation.path.replace(/[^a-z0-9]+/gi, "-")}`}
      data-product-foundation="true"
      data-stage18h-route-content="true"
      data-route-path={foundation.path}
      data-owner-legal-status="pending-human-review"
      data-public-live-allowed="false"
      data-stage18k-route-quality={foundation.stage18kQualityStatus ?? "READY_FOR_OWNER_REVIEW"}
      data-stage18k-owner-review={foundation.ownerReviewStatus ?? "PENDING_HUMAN_REVIEW"}
      data-required-blocks="route_intent when_this_page_fits what_we_check documents_data_needed how_work_starts what_is_not_promised related_routes faq_direction safe_final_cta client_information"
    >
      <div className="container-premium">
        <div className="section-heading-grid">
          <div>
            <p className="eyebrow-line">Маршрут и первый шаг</p>
            <h2 id={`product-foundation-${foundation.path.replace(/[^a-z0-9]+/gi, "-")}`} className="display-serif mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
              {foundation.routeIntent}
            </h2>
          </div>
          <p className="section-copy">
            Страница помогает понять, подходит ли этот маршрут, какие вводные подготовить и куда перейти без публичной загрузки файлов.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ProductList title="Когда подходит" items={foundation.whenFits} />
          <ProductList title="Клиентская информация" items={foundation.clientInformation} />
          <ProductList title="FAQ-направление" items={foundation.faqDirection} />
          {operationalBlocks.map((block) => (
            <ProductList key={block.title} title={block.title} items={block.items} />
          ))}
        </div>

        {variant === "full" && foundation.relatedRoutes.length > 0 ? (
          <div className="premium-card-strong mt-8 p-6">
            <h3 className="text-xl font-black text-[color:var(--text-primary)]">Связанные маршруты</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {foundation.relatedRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-[8px] border border-[var(--line)] bg-white px-4 py-2 text-center text-sm font-black leading-tight text-[color:var(--surface-dark-strong)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-light)]"
                  data-analytics-goal={shouldExposeAnalyticsData ? analyticsGoalNames.relatedRouteClick : undefined}
                  data-cta-label={shouldExposeAnalyticsData ? route.label : undefined}
                  data-cta-location={shouldExposeAnalyticsData ? "route_product_foundation_related" : undefined}
                  data-lead-topic={shouldExposeAnalyticsData ? pageSlug : undefined}
                  data-page-slug={shouldExposeAnalyticsData ? pageSlug : undefined}
                  data-page-type={shouldExposeAnalyticsData ? pageType : undefined}
                  data-related-href={shouldExposeAnalyticsData ? route.href : undefined}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="premium-card-dark mt-8 p-6">
          <h3 className="text-2xl font-black leading-tight">{foundation.finalCta.title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--text-inverse-muted)]">{foundation.finalCta.copy}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:max-w-4xl">
            {foundation.finalCta.actions.map((action, index) => {
              const className =
                index === 0
                  ? "inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--lime-signal)] px-5 py-3 text-center text-sm font-black text-[color:var(--lime-text)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
                  : "inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--border-dark-soft)] px-5 py-3 text-center text-sm font-black text-[color:var(--text-inverse)] transition hover:-translate-y-0.5 hover:bg-[var(--surface-dark-subtle-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]";

              return action.href.startsWith("tel:") ? (
                <a
                  key={`${action.label}-${action.href}`}
                  href={action.href}
                  className={className}
                  data-analytics-goal={shouldExposeAnalyticsData ? getGoalForLabel(action.label) : undefined}
                  data-cta-label={shouldExposeAnalyticsData ? action.label : undefined}
                  data-cta-location={shouldExposeAnalyticsData ? "route_product_foundation_final" : undefined}
                  data-lead-topic={shouldExposeAnalyticsData ? pageSlug : undefined}
                  data-page-slug={shouldExposeAnalyticsData ? pageSlug : undefined}
                  data-page-type={shouldExposeAnalyticsData ? pageType : undefined}
                >
                  {action.label}
                </a>
              ) : (
                <Link
                  key={`${action.label}-${action.href}`}
                  href={action.href}
                  className={className}
                  data-analytics-goal={shouldExposeAnalyticsData ? getGoalForLabel(action.label) : undefined}
                  data-cta-label={shouldExposeAnalyticsData ? action.label : undefined}
                  data-cta-location={shouldExposeAnalyticsData ? "route_product_foundation_final" : undefined}
                  data-lead-topic={shouldExposeAnalyticsData ? pageSlug : undefined}
                  data-page-slug={shouldExposeAnalyticsData ? pageSlug : undefined}
                  data-page-type={shouldExposeAnalyticsData ? pageType : undefined}
                >
                  {action.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
