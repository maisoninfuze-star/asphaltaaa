import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const archivoExpanded = Archivo_Black({
  variable: "--font-archivo-expanded",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const url = "https://asphalteaaa.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Service d'asphalte complet au Québec : excavation, fondation, pavage, resurfaçage, réparations, scellant et entretien. De l'excavation à la surface finie — la précision AAA. Soumission gratuite.",
  keywords: [
    "asphalte", "pavage", "excavation", "scellant d'asphalte",
    "resurfaçage", "entrée de cour", "stationnement", "Rive-Sud de Montréal",
    "Québec", "Chicoutimi", "Rimouski", "Thetford Mines",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description:
      "De l'excavation à la surface finie. Service d'asphalte complet au Québec. Soumission gratuite.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: "Service d'asphalte complet au Québec. Soumission gratuite.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: url },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  telephone: site.phone,
  email: site.email,
  url,
  areaServed: site.regions,
  priceRange: "$$",
  sameAs: [site.facebook],
  address: { "@type": "PostalAddress", addressRegion: "QC", addressCountry: "CA" },
  openingHours: ["Mo-Sa 07:00-21:30"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr-CA"
      className={`${archivo.variable} ${archivoExpanded.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-hivis focus:text-asphalt focus:px-4 focus:py-2 focus:font-mono focus:text-xs"
        >
          Aller au contenu
        </a>
        <SmoothScroll>
          <SiteHeader />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
