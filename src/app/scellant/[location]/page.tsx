import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  scellantLocations,
  getScellantLocation,
} from "@/lib/content/scellant-locations";
import { ScellantHome } from "@/components/scellant/scellant-home";
import { JsonLd } from "@/components/json-ld";
import { scellantJsonLd } from "@/lib/content/scellant-jsonld";

export function generateStaticParams() {
  return scellantLocations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) return {};
  const url = `https://asphalteaaa.com${loc.seo.canonicalPath}`;
  return {
    title: loc.seo.title,
    description: loc.seo.description,
    keywords: loc.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "fr_CA",
      url,
      title: loc.seo.title,
      description: loc.seo.description,
      images: [{ url: loc.heroMedia.poster }],
    },
  };
}

export default async function ScellantLocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) notFound();
  return (
    <>
      <JsonLd data={scellantJsonLd(loc)} />
      <ScellantHome location={loc} />
    </>
  );
}
