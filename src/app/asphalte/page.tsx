import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { ScrollStory } from "@/components/home/scroll-story";
import { ServicesPreview } from "@/components/home/services-preview";
import { BeforeAfterSection } from "@/components/home/before-after-section";
import { ServiceAreas } from "@/components/home/service-areas";
import { Testimonials } from "@/components/home/testimonials";

// Focused home: hero → brand statement → the residential build story →
// services → before/after → service areas → reviews. (Marquee, Stats, Process
// and Equipment live on their own pages to keep this page uncluttered.)
export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <ScrollStory />
      <ServicesPreview />
      <BeforeAfterSection />
      <ServiceAreas />
      <Testimonials />
    </>
  );
}
