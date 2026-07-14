import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/marquee";
import { Manifesto } from "@/components/home/manifesto";
import { ScrollStory } from "@/components/home/scroll-story";
import { ServicesPreview } from "@/components/home/services-preview";
import { Stats } from "@/components/home/stats";
import { Process } from "@/components/home/process";
import { Equipment } from "@/components/home/equipment";
import { BeforeAfterSection } from "@/components/home/before-after-section";
import { ServiceAreas } from "@/components/home/service-areas";
import { Testimonials } from "@/components/home/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <ScrollStory />
      <ServicesPreview />
      <Stats />
      <BeforeAfterSection />
      <Process />
      <Equipment />
      <ServiceAreas />
      <Testimonials />
    </>
  );
}
