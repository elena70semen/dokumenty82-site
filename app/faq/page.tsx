import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { faq, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Частые вопросы о подготовке документов для бизнеса в Симферополе.",
  alternates: {
    canonical: `${site.domain}/faq/`
  },
  robots: {
    index: false,
    follow: true
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

export default function FaqPage() {
  return (
    <main className="pt-36">
      <JsonLd data={faqJsonLd} />
      <section className="section-pad">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">FAQ</p>
            <h1 className="display-serif mt-6 text-6xl font-semibold leading-[0.98] text-[#111821] md:text-8xl">
              Частые вопросы
              <br />
              <span className="script-accent">по документам</span>
            </h1>
          </div>
          <div className="grid gap-3">
            {faq.map((item, index) => (
              <details key={item.question} open={index === 0} className="reveal-block rounded-[8px] border border-[#16284414] bg-white/82 shadow-[0_18px_50px_rgba(22,40,68,0.08)]" data-reveal="right">
                <summary className="flex min-h-12 cursor-pointer items-center rounded-[8px] px-6 py-4 text-lg font-black leading-tight text-[#111821] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#245da7]">
                  {item.question}
                </summary>
                <p className="px-6 pb-6 pt-1 leading-8 text-[#667184]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
