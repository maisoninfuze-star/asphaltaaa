import { RevealText } from "@/components/reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
  index,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  index?: string;
}) {
  return (
    <header className="relative overflow-hidden bg-asphalt tex-asphalt grain pt-32 pb-16 lg:pt-44 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 80% 0%, rgba(245,197,24,0.08), transparent 55%)",
        }}
      />
      <div className="container-x relative z-10">
        <div className="mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-hivis" />
          <span className="eyebrow">{eyebrow}</span>
          {index && (
            <span className="ml-auto font-mono text-xs text-concrete">
              {index}
            </span>
          )}
        </div>
        <h1 className="display text-warm text-[13vw] leading-[0.9] sm:text-6xl lg:text-[5.5rem]">
          <RevealText text={title} />
        </h1>
        {intro && (
          <p className="mt-8 max-w-2xl text-lg text-concrete-light lg:text-xl">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
