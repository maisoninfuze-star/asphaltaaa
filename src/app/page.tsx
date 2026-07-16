import Link from "next/link";

// Phase 1 placeholder gateway — replaced by the cinematic ServiceGateway in Phase 2.
export default function GatewayPage() {
  return (
    <main id="contenu" className="flex min-h-[100svh] flex-col items-center justify-center gap-8 bg-asphalt px-6 text-center">
      <h1 className="display text-warm text-5xl">Quel service recherchez-vous ?</h1>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/asphalte" className="bg-hivis px-8 py-5 font-mono text-xs uppercase tracking-[0.18em] text-asphalt">
          Asphaltage complet
        </Link>
        <Link href="/scellant" className="border border-warm/30 px-8 py-5 font-mono text-xs uppercase tracking-[0.18em] text-warm">
          Scellant d&apos;asphalte
        </Link>
      </div>
    </main>
  );
}
