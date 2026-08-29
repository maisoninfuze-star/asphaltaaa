import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false, follow: true },
};

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="display pt-4 text-xl text-warm">{children}</h2>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Légal" title="Politique de confidentialité." />
      <section className="border-t border-warm/10 bg-asphalt py-12 lg:py-20">
        <div className="container-x max-w-3xl space-y-6 text-concrete-light">
          <p>
            {site.name} est exploité par {site.legalName} ({site.location}).
            La présente politique explique quels renseignements nous
            recueillons, comment nous les utilisons et les choix qui
            s&apos;offrent à vous.
          </p>

          <H>Renseignements recueillis</H>
          <p>
            Nous recueillons uniquement les renseignements que vous nous
            fournissez volontairement par nos formulaires, par téléphone ou par
            courriel : nom, numéro de téléphone, courriel, adresse ou secteur
            des travaux et détails de votre projet, ainsi que des données
            techniques de base liées à la navigation sur le site.
          </p>

          <H>Utilisation</H>
          <p>
            Ces renseignements servent à répondre à vos demandes de soumission
            et de service, à planifier les rendez-vous, à assurer le suivi de
            votre dossier et à améliorer nos services. Ils ne sont ni vendus ni
            communiqués à des tiers, sauf lorsque nécessaire pour réaliser le
            service demandé ou si la loi l&apos;exige.
          </p>

          <H>Messagerie texte (SMS)</H>
          <p>
            Si vous y consentez expressément (case à cocher facultative dans nos
            formulaires), nous pouvons vous envoyer des messages texte
            concernant vos demandes de soumission, vos rendez-vous et les mises
            à jour de service. La fréquence des messages varie. Des frais de
            messagerie et de données peuvent s&apos;appliquer selon votre
            forfait. Vous pouvez retirer votre consentement en tout temps en
            répondant <strong>STOP</strong> à un message, ou obtenir de
            l&apos;assistance en répondant <strong>AIDE</strong> (HELP). Le
            consentement aux SMS n&apos;est pas une condition d&apos;achat.
          </p>
          <p>
            Les informations mobiles, les données d&apos;adhésion (opt-in) aux
            SMS et le consentement ne seront jamais vendus, loués ni partagés
            avec des tiers ou des sociétés affiliées à des fins de marketing ou
            de promotion.
          </p>

          <H>Vos droits</H>
          <p>
            Vous pouvez en tout temps demander l&apos;accès, la correction ou la
            suppression de vos renseignements en nous écrivant à{" "}
            <a href={site.emailHref} className="text-hivis hover:underline">
              {site.email}
            </a>{" "}
            ou en nous appelant au{" "}
            <a href={site.phoneHref} className="text-hivis hover:underline">
              {site.phone}
            </a>
            .
          </p>

          <H>Témoins (cookies)</H>
          <p>
            Ce site utilise des témoins essentiels à son bon fonctionnement et
            peut utiliser des outils de mesure d&apos;audience et des paramètres
            de campagne (ex. UTM) afin de comprendre la provenance des demandes.
          </p>

          <p className="font-mono text-xs text-concrete">
            {site.operatorLine} · {site.location} · NEQ {site.neq}
          </p>
        </div>
      </section>
    </>
  );
}
