import { notFound } from "next/navigation";
import { getScellantLocation } from "@/lib/content/scellant-locations";
import { ScellantHeader } from "@/components/scellant/scellant-header";
import { ScellantFooter } from "@/components/scellant/scellant-footer";

export default async function ScellantLocationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const loc = getScellantLocation(location);
  if (!loc) notFound();

  return (
    <>
      <ScellantHeader slug={loc.slug} name={loc.name} />
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <ScellantFooter slug={loc.slug} />
    </>
  );
}
