import { site } from "@/lib/content";

export type BreadcrumbJsonLdItem = {
  name: string;
  href: string;
};

export function toCanonicalUrl(href: string) {
  if (href.startsWith("https://")) return href;
  if (href === "/") return `${site.domain}/`;
  return `${site.domain}${href}`;
}

export function buildBreadcrumbListJsonLd(items: BreadcrumbJsonLdItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toCanonicalUrl(item.href)
    }))
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.domain}/#website`,
    url: `${site.domain}/`,
    name: site.name,
    inLanguage: "ru-RU",
    publisher: {
      "@id": `${site.domain}/#business`
    }
  };
}
