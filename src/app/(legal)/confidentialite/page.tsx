import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Légal" title="Confidentialité." />
      <section className="border-t border-warm/10 bg-asphalt py-12 lg:py-20">
        <div className="container-x max-w-3xl space-y-6 text-concrete-light">
          <p className="font-mono text-xs text-concrete">
            Modèle à faire valider — remplacez par votre politique officielle.
          </p>
          <p>
            {site.name} recueille uniquement les renseignements que vous nous
            fournissez volontairement (nom, téléphone, courriel, détails du
            projet) afin de répondre à vos demandes de soumission et de service.
          </p>
          <p>
            Ces renseignements ne sont ni vendus ni communiqués à des tiers, sauf
            lorsque nécessaire pour réaliser le service demandé ou si la loi
            l&apos;exige.
          </p>
          <p>
            Vous pouvez en tout temps demander l&apos;accès, la correction ou la
            suppression de vos renseignements en nous écrivant à{" "}
            <a href={site.emailHref} className="text-hivis hover:underline">
              {site.email}
            </a>
            .
          </p>
          <p>
            Ce site peut utiliser des témoins (cookies) essentiels à son bon
            fonctionnement. TODO : préciser les outils de mesure d&apos;audience
            utilisés, le cas échéant.
          </p>
        </div>
      </section>
    </>
  );
}
