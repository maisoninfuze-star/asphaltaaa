import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  robots: { index: false, follow: true },
};

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="display pt-4 text-xl text-warm">{children}</h2>;
}

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Légal" title="Conditions d'utilisation." />
      <section className="border-t border-warm/10 bg-asphalt py-12 lg:py-20">
        <div className="container-x max-w-3xl space-y-6 text-concrete-light">
          <p>
            {site.name} est exploité par {site.legalName} ({site.location}). En
            utilisant ce site, vous acceptez les présentes conditions. Le
            contenu (textes, images, marques) appartient à {site.name} et ne
            peut être reproduit sans autorisation.
          </p>

          <H>Soumissions</H>
          <p>
            Les soumissions fournies sont des estimations basées sur les
            renseignements transmis et peuvent être ajustées après une visite du
            site. Aucun contrat n&apos;est conclu tant qu&apos;une entente
            écrite n&apos;est pas signée.
          </p>

          <H>Programme de messagerie texte (SMS)</H>
          <p>
            En cochant la case de consentement facultative de nos formulaires,
            vous acceptez de recevoir des messages texte (SMS) d&apos;
            {site.name} concernant les demandes de soumission, les rendez-vous et les mises
            à jour de service. Les conditions suivantes s&apos;appliquent :
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>La fréquence des messages varie selon votre dossier.</li>
            <li>
              Des frais de messagerie et de données peuvent s&apos;appliquer
              selon votre forfait mobile.
            </li>
            <li>
              Répondez <strong>STOP</strong> à tout message pour vous désabonner
              en tout temps.
            </li>
            <li>
              Répondez <strong>AIDE</strong> (HELP) pour obtenir de
              l&apos;assistance, ou contactez-nous au{" "}
              <a href={site.phoneHref} className="text-hivis hover:underline">
                {site.phone}
              </a>{" "}
              ou à{" "}
              <a href={site.emailHref} className="text-hivis hover:underline">
                {site.email}
              </a>
              .
            </li>
            <li>Le consentement n&apos;est pas une condition d&apos;achat.</li>
            <li>
              Les opérateurs de téléphonie mobile ne sont pas responsables des
              messages retardés ou non livrés.
            </li>
            <li>
              Le traitement des données mobiles est décrit dans notre{" "}
              <Link
                href="/confidentialite"
                className="text-hivis hover:underline"
              >
                Politique de confidentialité
              </Link>
              .
            </li>
          </ul>

          <H>Généralités</H>
          <p>
            Les informations affichées (services, zones, disponibilités) sont
            susceptibles de changer sans préavis. Pour toute question, écrivez à{" "}
            <a href={site.emailHref} className="text-hivis hover:underline">
              {site.email}
            </a>
            .
          </p>

          <p className="font-mono text-xs text-concrete">
            {site.operatorLine} · {site.location} · NEQ {site.neq}
          </p>
        </div>
      </section>
    </>
  );
}
