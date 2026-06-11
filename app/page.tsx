import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: "Документы для бизнеса — подготовка документов в Симферополе"
  },
  description:
    "Разберём ситуацию и подготовим документы для бизнеса: отчётность, налоговые вопросы, запросы банка, регистрация, изменения и другие деловые задачи.",
  alternates: {
    canonical: `${site.domain}/`
  },
  openGraph: {
    title: "Документы для бизнеса — подготовка документов в Симферополе",
    description:
      "Разберём ситуацию и подготовим документы для бизнеса: отчётность, налоговые вопросы, запросы банка, регистрация, изменения и другие деловые задачи.",
    url: `${site.domain}/`,
    type: "website",
    locale: "ru_RU",
    siteName: site.name
  }
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.domain}/#business`,
  name: site.name,
  alternateName: site.category,
  url: site.domain,
  description:
    "Центр подготовки документов в Симферополе. Разбор ситуации и подготовка документов для отчётности, регистрации, изменений, запросов банка и деловых задач.",
  telephone: "+79789987222",
  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressRegion: "Республика Крым",
    addressLocality: "Симферополь",
    streetAddress: "ул. им. Мате Залки, 1"
  },
  areaServed: {
    "@type": "City",
    name: "Симферополь"
  }
};

export default function Home() {
  return (
    <>
      <JsonLd data={businessJsonLd} />
      <HomePage />
    </>
  );
}
