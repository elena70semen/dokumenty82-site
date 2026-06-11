import type { Metadata } from "next";
import { RoutePage } from "@/components/routes/RoutePage";
import { site } from "@/lib/content";
import { routePageData } from "@/lib/routes/route-page-data";

const page = routePageData["razbor-situacii"];

export const metadata: Metadata = {
  title: page.metadataTitle,
  description: page.metadataDescription,
  alternates: {
    canonical: `${site.domain}${page.href}`
  },
  openGraph: {
    title: page.metadataTitle,
    description: page.metadataDescription,
    url: `${site.domain}${page.href}`,
    type: "website",
    locale: "ru_RU",
    siteName: site.name
  }
};

export default function SituationReviewPage() {
  return <RoutePage page={page} />;
}
