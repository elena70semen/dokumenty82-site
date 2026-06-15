import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Частые вопросы о подготовке документов для бизнеса в Симферополе.",
  alternates: {
    canonical: "/faq/"
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
    <main id="main-content">
      <JsonLd data={faqJsonLd} />
      <section className="section-pad dimmed-page-section">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal-block" data-reveal="left">
            <p className="eyebrow-line">FAQ</p>
            <h1 className="display-serif mt-6 text-6xl font-semibold leading-[0.98] text-[color:var(--text-inverse)] md:text-8xl">
              Частые вопросы
              <br />
              <span className="script-accent">по документам</span>
            </h1>
          </div>
          <div className="grid gap-3">
            {faq.map((item, index) => (
              <details key={item.question} open={index === 0} className="reveal-block rounded-[8px] border border-[#16284414] bg-white/78 p-6 shadow-[0_18px_50px_rgba(22,40,68,0.08)] backdrop-blur-[1px]" data-reveal="right">
                <summary className="cursor-pointer text-lg font-black text-[#111821]">{item.question}</summary>
                <p className="mt-4 leading-8 text-[#667184]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
