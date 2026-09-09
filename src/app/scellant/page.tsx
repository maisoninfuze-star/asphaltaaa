import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RegionSelector } from "@/components/scellant/region-selector";
import { scellantNav, scellantServiceLinks } from "@/lib/content/navigation";

export const metadata: Metadata = {
  title: "Scellant d'asphalte — Rive-Sud, Québec, Rimouski, Estrie",
  description:
    "Choisissez votre région pour un service de scellant d'asphalte adapté : Rive-Sud de Montréal, région de Québec, Rimouski et Bas-Saint-Laurent, ou Estrie. Soumission gratuite.",
  alternates: { canonical: "https://asphalteaaa.com/scellant" },
};

export default function ScellantSelectorPage() {
  return (
    <>
      <SiteHeader
        homeHref="/scellant"
        navItems={[]}
        moreItems={[]}
        ctaHref="/scellant"
        ctaLabel="Choisir ma région"
        switchLabel="Besoin d'un pavage ?"
        switchHref="/asphalte"
        contextLabel="Scellant d'asphalte"
      />
      <main id="contenu" className="flex-1">
        <RegionSelector />
      </main>
      <SiteFooter
        homeHref="/scellant"
        navItems={scellantNav("rive-sud")}
        serviceLinks={scellantServiceLinks("rive-sud")}
        serviceLabel="Entretien"
        ctaHref="/scellant"
        ctaTitle={["Redonnez vie", "à votre asphalte."]}
        tagline="Scellant, réparation des fissures et entretien d'asphalte. Une division d'Asphalte AAA."
      />
    </>
  );
}
