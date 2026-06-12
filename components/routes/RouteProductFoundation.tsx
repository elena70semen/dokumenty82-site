import Link from "next/link";
import { getProductFoundation } from "@/lib/product-foundation";

type RouteProductFoundationProps = {
  path: string;
  variant?: "summary" | "full";
};

function ProductList({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-[8px] border border-[var(--line)] bg-white/86 p-5 shadow-[var(--shadow-card-sm)]">
      <h3 className="text-xl font-black leading-tight text-[color:var(--text-primary)]">{title}</h3>
      <ul className="mt-5 grid gap-3 text-sm leading-7 text-[color:var(--text-secondary)]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="font-black text-[color:var(--gold)]">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function RouteProductFoundation({ path, variant = "summary" }: RouteProductFoundationProps) {
  const foundation = getProductFoundation(path);

  if (!foundation) return null;

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
      data-required-blocks="route_intent when_this_page_fits what_we_check documents_data_needed how_work_starts what_is_not_promised related_routes faq_direction safe_final_cta client_information"
    >
      <div className="container-premium">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="eyebrow-line">Маршрут и первый шаг</p>
            <h2 id={`product-foundation-${foundation.path.replace(/[^a-z0-9]+/gi, "-")}`} className="display-serif mt-5 text-4xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
              {foundation.routeIntent}
            </h2>
          </div>
          <p className="text-lg leading-9 text-[color:var(--text-secondary)]">
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
          <div className="mt-8 rounded-[8px] border border-[var(--line)] bg-white/86 p-6">
            <h3 className="text-xl font-black text-[color:var(--text-primary)]">Связанные маршруты</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {foundation.relatedRoutes.map((route) => (
                <Link key={route.href} href={route.href} className="rounded-[8px] border border-[var(--line)] bg-white px-4 py-2 text-sm font-black text-[color:var(--surface-dark-strong)]">
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-8 rounded-[8px] bg-[var(--surface-dark-strong)] p-6 text-[color:var(--text-inverse)] shadow-[var(--shadow-cta-dark)]">
          <h3 className="text-2xl font-black leading-tight">{foundation.finalCta.title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--text-inverse-muted)]">{foundation.finalCta.copy}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {foundation.finalCta.actions.map((action, index) => {
              const className =
                index === 0
                  ? "rounded-[8px] bg-[var(--lime-signal)] px-5 py-3 text-sm font-black text-[color:var(--lime-text)]"
                  : "rounded-[8px] border border-[var(--border-dark-soft)] px-5 py-3 text-sm font-black text-[color:var(--text-inverse)]";

              return action.href.startsWith("tel:") ? (
                <a key={`${action.label}-${action.href}`} href={action.href} className={className}>
                  {action.label}
                </a>
              ) : (
                <Link key={`${action.label}-${action.href}`} href={action.href} className={className}>
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
