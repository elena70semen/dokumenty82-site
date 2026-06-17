import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import "./globals.css";
import { CookieAnalyticsNotice } from "@/components/CookieAnalyticsNotice";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealController } from "@/components/RevealController";
import { ScrollNavigation } from "@/components/ScrollNavigation";
import { AttributionCapture } from "@/components/tracking/AttributionCapture";
import { site } from "@/lib/content";
import { siteFeatureFlags } from "@/lib/feature-flags";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Документы для бизнеса в Симферополе - подготовка документов",
    template: "%s | Документы для бизнеса"
  },
  description:
    "Центр подготовки документов в Симферополе. Разберем ситуацию, подготовим документы для отчетности, регистрации, изменений, банка, 115-ФЗ и других деловых вопросов.",
  keywords: [
    "документы для бизнеса Симферополь",
    "подготовка документов Симферополь",
    "отчетность для бизнеса",
    "ответ на требование ИФНС",
    "документы для банка 115-ФЗ",
    "регистрация ООО Симферополь",
    "регистрация ИП Симферополь"
  ],
  creator: site.name,
  publisher: site.name,
  icons: {
    icon: "/assets/brand/favicon.svg"
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: site.name,
    title: "Документы для бизнеса в Симферополе",
    description: "Разберем ситуацию и подготовим документы. Центр подготовки документов в Симферополе.",
    url: site.domain,
    images: ["/assets/images/hero-premium-office.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Документы для бизнеса в Симферополе",
    description: "Разберём ситуацию и подготовим документы для бизнеса: отчётность, банк, 115-ФЗ, регистрация и изменения.",
    images: ["/assets/images/hero-premium-office.png"]
  },
  robots: {
    index: siteFeatureFlags.publicLiveAllowed,
    follow: siteFeatureFlags.publicLiveAllowed,
    googleBot: {
      index: siteFeatureFlags.publicLiveAllowed,
      follow: siteFeatureFlags.publicLiveAllowed,
      "max-image-preview": siteFeatureFlags.publicLiveAllowed ? "large" : "none"
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        {siteFeatureFlags.metricaEnabled ? (
          <>
            <Script id="yandex-metrika" strategy="beforeInteractive">
              {`
                (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');

                ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
              `}
            </Script>
            <noscript>
              <div>
                <img src="https://mc.yandex.ru/watch/109869928" style={{ position: "absolute", left: "-9999px" }} alt="" />
              </div>
            </noscript>
          </>
        ) : null}
        <AttributionCapture />
        <CookieAnalyticsNotice />
        <Header />
        <ScrollNavigation />
        {children}
        <Footer />
        <RevealController />
      </body>
    </html>
  );
}
