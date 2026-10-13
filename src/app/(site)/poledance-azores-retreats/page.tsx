import type { Metadata } from "next";
import { AccommodationSection } from "@/components/azores/accommodation-section";
import { CommunitySection } from "@/components/azores/community-section";
import { AZORES_FAQ } from "@/components/azores/faq";
import { ExperiencesSection } from "@/components/azores/experiences-section";
import { HeroSection } from "@/components/azores/hero-section";
import { IncludedSection } from "@/components/azores/included-section";
import { IntroSection } from "@/components/azores/intro-section";
import { ItinerarySection } from "@/components/azores/itinerary-section";
import { PricingSection } from "@/components/azores/pricing-section";
import { TrainingSpaceSection } from "@/components/azores/training-space-section";
import { FaqSection } from "@/components/faq-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { AZORES_SHARE } from "@/lib/share-images";

export const metadata: Metadata = {
  title: "Azores Into The Wild — Pole Dance Escape | Free to Dare",
  description:
    "A 7-day pole dance retreat in São Miguel, Azores (30 June – 6 July 2027): 5 pole classes, volcanic lakes, thermal waters, whale watching and a small community of 16.",
  openGraph: {
    title: "Azores Into The Wild — Pole Dance Escape | Free to Dare",
    description:
      "A 7-day pole dance retreat in São Miguel, Azores (30 June – 6 July 2027): 5 pole classes, volcanic lakes, thermal waters, whale watching and a small community of 16.",
    images: AZORES_SHARE.images,
  },
  twitter: AZORES_SHARE.twitter,
};

export default function Home() {
  return (
    <main className="section-stack flex w-full flex-1 flex-col gap-(--section-gap) bg-white pb-(--section-gap)">
      <HeroSection />
      <IntroSection />
      <ExperiencesSection />
      <CommunitySection />
      <TrainingSpaceSection />
      <AccommodationSection />
      <ItinerarySection />
      <TestimonialsSection />
      <IncludedSection />
      <PricingSection />
      <FaqSection questions={AZORES_FAQ} />
      {/* <FinalCtaSection /> */}
    </main>
  );
}
