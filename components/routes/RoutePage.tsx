import { CallbackFormPlaceholder } from "@/components/forms/CallbackFormPlaceholder";
import { SituationFormPlaceholder } from "@/components/forms/SituationFormPlaceholder";
import { JsonLd } from "@/components/JsonLd";
import { RouteDocumentsPanel } from "@/components/routes/RouteDocumentsPanel";
import { RouteHero } from "@/components/routes/RouteHero";
import { RouteLocalContact } from "@/components/routes/RouteLocalContact";
import { RouteProcess } from "@/components/routes/RouteProcess";
import { RouteProductFoundation } from "@/components/routes/RouteProductFoundation";
import { RouteRelatedLinks } from "@/components/routes/RouteRelatedLinks";
import { RouteSafetyNote } from "@/components/routes/RouteSafetyNote";
import { RouteServiceScope } from "@/components/routes/RouteServiceScope";
import { RouteSituationPanel } from "@/components/routes/RouteSituationPanel";
import type { RoutePageConfig } from "@/lib/routes/route-page-data";
import { buildBreadcrumbListJsonLd } from "@/lib/seo/structured-data";

type RoutePageProps = {
  page: RoutePageConfig;
};

function getPageType(page: RoutePageConfig) {
  if (page.kind === "core") return "core_situation_review";
  if (page.kind === "contact") return "contact_page";
  return "hub";
}

function getLeadTopic(page: RoutePageConfig) {
  if (page.slug === "kontakty") return "Контакт / визит";
  if (page.slug === "otchetnost") return "Отчётность / нулёвка / декларация";
  if (page.slug === "bank-i-115-fz") return "Банк / 115-ФЗ";
  return "Другое / первый шаг";
}

export function RoutePage({ page }: RoutePageProps) {
  const pageType = getPageType(page);
  const leadTopic = getLeadTopic(page);
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: "Главная", href: "/" },
    { name: page.hero.eyebrow, href: page.href }
  ]);

  return (
    <main id="main-content" data-route-page-template="static" data-stage18h-route-content="true">
      <JsonLd data={breadcrumbJsonLd} />
      <RouteHero hero={page.hero} pageKind={page.kind} pageSlug={page.slug} pageType={pageType} leadTopic={leadTopic} />
      <RouteSituationPanel section={page.situation} />
      <RouteServiceScope section={page.scope} />
      <RouteProcess section={page.process} />
      <RouteDocumentsPanel section={page.documents} />
      <RouteProductFoundation path={page.href} />
      {page.slug === "razbor-situacii" ? <SituationFormPlaceholder pageSlug={page.slug} pageType={pageType} leadTopic={leadTopic} /> : null}
      {page.slug === "kontakty" ? <CallbackFormPlaceholder pageSlug={page.slug} pageType={pageType} leadTopic={leadTopic} /> : null}
      <RouteRelatedLinks links={page.related} pageSlug={page.slug} pageType={pageType} leadTopic={leadTopic} />
      <RouteLocalContact contact={page.localContact} pageSlug={page.slug} pageType={pageType} leadTopic={leadTopic} />
      <RouteSafetyNote note={page.safetyNote} />
    </main>
  );
}
