import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/** Pavage et asphalte division chrome. */
export default function AsphalteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader
        homeHref="/asphalte"
        ctaHref="/asphalte/soumission"
        switchLabel="Besoin seulement d'un scellant ?"
        switchHref="/scellant"
      />
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
