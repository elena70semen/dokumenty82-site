import { CallbackFormPlaceholder } from "@/components/forms/CallbackFormPlaceholder";
import { SituationFormPlaceholder } from "@/components/forms/SituationFormPlaceholder";
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

type RoutePageProps = {
  page: RoutePageConfig;
};

export function RoutePage({ page }: RoutePageProps) {
  return (
    <main id="main-content" data-route-page-template="static" data-stage18h-route-content="true">
      <RouteHero hero={page.hero} pageKind={page.kind} />
      <RouteSituationPanel section={page.situation} />
      <RouteServiceScope section={page.scope} />
      <RouteProcess section={page.process} />
      <RouteDocumentsPanel section={page.documents} />
      <RouteProductFoundation path={page.href} />
      {page.slug === "razbor-situacii" ? <SituationFormPlaceholder /> : null}
      {page.slug === "kontakty" ? <CallbackFormPlaceholder /> : null}
      <RouteRelatedLinks links={page.related} />
      <RouteLocalContact contact={page.localContact} />
      <RouteSafetyNote note={page.safetyNote} />
    </main>
  );
}
