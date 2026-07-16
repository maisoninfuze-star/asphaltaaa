import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/** Brand-level chrome for legal pages (outside the two divisions). */
export default function LegalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
