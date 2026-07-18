import type { Metadata } from "next";
import Link from "next/link";
import { faqs, site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { FaqAccordion } from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "Foire aux questions",
  description:
    "Réponses aux questions fréquentes sur nos services d'asphalte : prix, zones, garantie, meilleur moment pour paver ou sceller.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader
        eyebrow="FAQ"
        index="/ 06"
        title="Vos questions, nos réponses."
        intro="Tout ce qu'il faut savoir avant de démarrer votre projet. Une autre question ? Écrivez-nous."
      />

      <section className="border-t border-warm/10 bg-asphalt py-12 lg:py-20">
        <div className="container-x">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="border-t border-warm/10 bg-asphalt-2 py-16 lg:py-20">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-xl text-lg text-concrete-light">
            Vous ne trouvez pas votre réponse ? On répond rapidement.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/asphalte/contact"
              className="border border-warm/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-warm transition-colors hover:border-hivis hover:text-hivis"
            >
              Nous joindre
            </Link>
            <a
              href={site.phoneHref}
              className="bg-hivis px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-asphalt transition-colors hover:bg-warm"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
