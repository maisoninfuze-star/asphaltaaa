import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Joignez Asphalte AAA. Téléphone, courriel, heures d'ouverture et formulaire. Soumission gratuite partout au Québec.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nous joindre"
        index="/ 07"
        title="Parlons de votre projet."
        intro="Un appel, un courriel ou le formulaire — on vous répond rapidement."
      />

      <section className="border-t border-warm/10 bg-asphalt py-12 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Info */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="label-mono mb-2">Téléphone</p>
              <a href={site.phoneHref} className="display text-3xl text-warm hover:text-hivis">
                {site.phone}
              </a>
            </div>
            <div>
              <p className="label-mono mb-2">Courriel</p>
              <a href={site.emailHref} className="text-lg text-warm hover:text-hivis break-all">
                {site.email}
              </a>
            </div>
            <div>
              <p className="label-mono mb-3">Heures d&apos;ouverture</p>
              <div className="flex flex-col gap-2">
                {site.hours.map((h) => (
                  <div
                    key={h.d}
                    className="flex items-center justify-between gap-6 border-b border-warm/10 pb-2 text-sm"
                  >
                    <span className="text-warm-2">{h.d}</span>
                    <span className="font-mono text-concrete">{h.h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="label-mono mb-2">Zones desservies</p>
              <p className="text-concrete-light">
                {site.regions.join(" · ")} {site.regionsNote}
              </p>
            </div>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-mono text-xs uppercase tracking-[0.18em] text-hivis"
            >
              Facebook ↗
            </a>
          </div>

          {/* Form */}
          <div className="border border-warm/15 bg-asphalt-2 p-6 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
