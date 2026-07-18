const B = "/assets/generated";

/** Cinematic hero video options (fal.ai). Change `activeHero` to switch. */
export const heroVariants = {
  driveway: { video: `${B}/hero.mp4`, poster: `${B}/hero-poster.jpg`,
    label: "Entrée sinueuse au coucher du soleil" },
  paver: { video: `${B}/hero-alt1.mp4`, poster: `${B}/hero-alt1.jpg`,
    label: "Pose d'asphalte à chaud" },
  reveal: { video: `${B}/hero-alt2.mp4`, poster: `${B}/hero-alt2.jpg`,
    label: "Révélation aérienne d'un domaine" },
} as const;

export const activeHero: keyof typeof heroVariants = "paver";

const P = "/assets/projects";

/** Real Asphalte AAA project photos (HD, phone UI removed). */
export const realImg = {
  drivewayBlue: `${P}/driveway-blue-house.jpg`,
  drivewayBrick: `${P}/driveway-brick-houses.jpg`,
  drivewayFaded: `${P}/driveway-faded-worker.jpg`,
  whiteHouse: `${P}/project-white-house.jpg`,
  baBefore: `${P}/before-after-before.jpg`,
  baAfter: `${P}/before-after-after.jpg`,
  blowers: `${P}/process-blowers.jpg`,
  sprayEstate: `${P}/process-spray-estate.jpg`,
  peeling: `${P}/warning-peeling.jpg`,
  heroVideo: `${P}/video/hero-driveway.mp4`,
  blowersVideo: `${P}/video/process-blowers.mp4`,
  sprayVideo: `${P}/video/process-spray.mp4`,
};

export const img = {
  heroAerial: realImg.drivewayBlue,
  // Real completed Asphalte AAA driveway (photo + fal.ai cinematic video).
  heroVideo: realImg.heroVideo,
  heroPoster: realImg.drivewayBlue,
  storyPaver: `${B}/story-paver.jpg`,
  baBefore: realImg.baBefore,
  baAfter: realImg.baAfter,
  equipRoller: `${B}/equip-roller.jpg`,
  equipExcavator: `${B}/equip-excavator.jpg`,
  pavage: `${B}/svc-pavage.jpg`,
  residential: realImg.drivewayBlue,
  commercial: realImg.drivewayBrick,
};

export const serviceImg: Record<string, string> = {
  excavation: `${B}/svc-excavation.jpg`,
  nivellement: `${B}/svc-fondation.jpg`,
  fondation: `${B}/svc-fondation.jpg`,
  pavage: `${B}/svc-pavage.jpg`,
  resurfacage: realImg.drivewayBrick,
  "reparation-fissures": `${B}/svc-reparations.jpg`,
  "reparation-trous": `${B}/svc-reparations.jpg`,
};

/** Fallback map (projects now carry their own `image`; kept for safety). */
export const projectImg: Record<string, string> = {
  "entree-residentielle-scellee": realImg.drivewayBlue,
  "entree-double-protegee": realImg.drivewayBrick,
  "entree-maison-blanche": realImg.whiteHouse,
  "grande-propriete-entretien": realImg.sprayEstate,
};

export const equipment = [
  {
    name: "Rouleau compresseur",
    role: "Compaction & planéité",
    spec: "Densité optimale, surface lisse",
    image: img.equipRoller,
  },
  {
    name: "Excavatrice",
    role: "Excavation & terrassement",
    spec: "Retrait du sol, préparation d'assise",
    image: img.equipExcavator,
  },
  {
    name: "Paveuse",
    role: "Pose d'enrobé à chaud",
    spec: "Épaisseur constante, fini régulier",
    image: img.pavage,
  },
];
