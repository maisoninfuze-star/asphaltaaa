"use client";

const items = [
  "Excavation",
  "Nivellement",
  "Fondation 0-¾",
  "Pavage à chaud",
  "Resurfaçage",
  "Réparations",
  "Scellant",
  "Lavage à pression",
  "Lignage",
  "Drainage",
];

export function Marquee() {
  return (
    <div className="relative flex overflow-hidden border-y border-warm/10 bg-asphalt-2 py-5">
      <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-10 pr-10">
        {items.concat(items).map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-lg uppercase tracking-tight text-warm/80">
              {t}
            </span>
            <span className="text-hivis">✦</span>
          </span>
        ))}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-10 pr-10"
      >
        {items.concat(items).map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-lg uppercase tracking-tight text-warm/80">
              {t}
            </span>
            <span className="text-hivis">✦</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
