import type { Metadata } from "next";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Demander une soumission gratuite",
  description:
    "Obtenez une soumission gratuite et détaillée pour votre projet d'asphalte. Excavation, pavage, resurfaçage, réparations, scellant et plus.",
};

const reassure = [
  "Soumission gratuite et sans engagement",
  "Réponse rapide",
  "Prix détaillé, sans surprise",
];

export default function SoumissionPage() {
  return (
    <section className="relative overflow-hidden bg-asphalt tex-asphalt pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 50% at 85% 0%, rgba(245,197,24,0.08), transparent 55%)",
        }}
      />
      <div className="container-x relative z-10 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <div className="mb-8 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-hivis" />
            <span className="eyebrow">Soumission gratuite</span>
          </div>
          <h1 className="display text-warm text-[12vw] leading-[0.9] sm:text-6xl lg:text-[4.5rem]">
            Votre projet,
            <br />
            chiffré.
          </h1>
          <p className="mt-6 max-w-md text-lg text-concrete-light">
            Quatre étapes rapides. On revient vers vous avec une soumission
            claire et détaillée — du terrain brut à la surface finie.
          </p>

          <ul className="mt-10 flex flex-col gap-4">
            {reassure.map((r, i) => (
              <li key={r} className="flex items-center gap-4">
                <span className="font-mono text-xs text-hivis">
                  0{i + 1}
                </span>
                <span className="text-warm-2">{r}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-warm/10 pt-6">
            <p className="label-mono mb-2">Vous préférez appeler ?</p>
            <a href={site.phoneHref} className="display text-2xl text-warm hover:text-hivis">
              {site.phone}
            </a>
          </div>
        </div>

        <QuoteForm />
      </div>
    </section>
  );
}
