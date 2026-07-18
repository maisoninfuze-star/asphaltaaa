import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/motion/cursor";
import { ScrollProgress } from "@/components/motion/scroll-progress";

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
    "Pavage, réparation et entretien d'asphalte au Québec : excavation, fondation, pose d'asphalte, resurfaçage, réparation des fissures et des trous, et scellant. La précision AAA. Soumission gratuite.",
  keywords: [
    "pavage d'asphalte", "réparation d'asphalte", "scellant d'asphalte",
    "réparation de fissures d'asphalte", "réparation de trous d'asphalte",
    "entretien d'entrée en asphalte", "pavage résidentiel", "pavage commercial",
    "Rive-Sud de Montréal", "Québec", "Rimouski",
  ],
  authors: [{ name: site.name }],
  icons: {
    icon: "/assets/brand/icon-32.png",
    apple: "/assets/brand/icon-180.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description:
      "Pavage, réparation et entretien d'asphalte au Québec. La précision AAA. Soumission gratuite.",
    images: [{ url: "/assets/brand/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: "Pavage, réparation et entretien d'asphalte au Québec. Soumission gratuite.",
    images: ["/assets/brand/og.jpg"],
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
        <Cursor />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
