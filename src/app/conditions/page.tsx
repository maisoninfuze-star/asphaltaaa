import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Légal" title="Conditions." />
      <section className="border-t border-warm/10 bg-asphalt py-12 lg:py-20">
        <div className="container-x max-w-3xl space-y-6 text-concrete-light">
          <p className="font-mono text-xs text-concrete">
            Modèle à faire valider — remplacez par vos conditions officielles.
          </p>
          <p>
            En utilisant ce site, vous acceptez les présentes conditions. Le
            contenu (textes, images, marques) appartient à {site.name} et ne peut
            être reproduit sans autorisation.
          </p>
          <p>
            Les soumissions fournies sont des estimations basées sur les
            renseignements transmis et peuvent être ajustées après une visite du
            site. Aucun contrat n&apos;est conclu tant qu&apos;une entente écrite
            n&apos;est pas signée.
          </p>
          <p>
            Les informations affichées (services, zones, disponibilités) sont
            susceptibles de changer sans préavis. Pour toute question, écrivez à{" "}
            <a href={site.emailHref} className="text-hivis hover:underline">
              {site.email}
            </a>
            .
          </p>
          <p className="font-mono text-xs text-concrete">NEQ {site.neq}</p>
        </div>
      </section>
    </>
  );
}
