import Link from "next/link";
import type { InputHTMLAttributes } from "react";
import { site } from "@/lib/site";

/**
 * Optional, UNCHECKED SMS-consent checkbox (A2P/CTIA compliant).
 * The wording must stay aligned with the SMS program terms in
 * /conditions and the SMS section of /confidentialite.
 */
export function SmsConsent(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-start gap-3 text-xs leading-relaxed text-concrete">
      <input
        type="checkbox"
        {...props}
        className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-hivis)]"
      />
      <span>
        J&apos;accepte de recevoir des messages texte (SMS) d&apos;
        {site.name} concernant les demandes de soumission, les rendez-vous et les mises à
        jour de service. La fréquence des messages varie. Des frais de
        messagerie et de données peuvent s&apos;appliquer. Répondez STOP pour
        vous désabonner ou AIDE pour obtenir de l&apos;assistance. Le
        consentement n&apos;est pas une condition d&apos;achat. Consultez notre{" "}
        <Link href="/confidentialite" className="text-hivis hover:underline">
          Politique de confidentialité
        </Link>{" "}
        et nos{" "}
        <Link href="/conditions" className="text-hivis hover:underline">
          Conditions d&apos;utilisation
        </Link>
        .
      </span>
    </label>
  );
}
