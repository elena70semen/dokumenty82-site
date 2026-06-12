import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SourceCapture } from "@/components/analytics/SourceCapture";
import { RevealController } from "@/components/RevealController";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Документы для бизнеса в Симферополе - подготовка документов",
    template: "%s | Документы для бизнеса"
  },
  description:
    "Центр подготовки документов в Симферополе. Разберём ситуацию и подготовим документы: регистрация, отчётность, ЕГРЮЛ, юридический адрес, банк и 115-ФЗ. Офис рядом с налоговой.",
  icons: {
    icon: "/assets/brand/favicon.svg"
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: site.name,
    title: "Документы для бизнеса в Симферополе",
    description: "Центр подготовки документов в Симферополе. Разберём ситуацию и подготовим документы: регистрация, отчётность, ЕГРЮЛ, юридический адрес, банк и 115-ФЗ. Офис рядом с налоговой.",
    url: site.domain,
    images: ["/assets/images/hero-premium-office.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large"
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
        <Footer />
        <SourceCapture />
        <RevealController />
      </body>
    </html>
  );
}
