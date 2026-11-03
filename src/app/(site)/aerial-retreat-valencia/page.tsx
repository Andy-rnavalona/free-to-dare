import type { Metadata } from "next";
import { FaqSection } from "@/components/faq-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ExperiencesSection } from "@/components/valencia/experiences-section";
import { VALENCIA_FAQ } from "@/components/valencia/faq";
import { HeroSection } from "@/components/valencia/hero-section";
import { IncludedSection } from "@/components/valencia/included-section";
import { PricingSection } from "@/components/valencia/pricing-section";
import { TrainingSpaceSection } from "@/components/valencia/training-space-section";
import { VALENCIA_SHARE } from "@/lib/share-images";

export const metadata: Metadata = {
  title: "Valencia Aerial Escape | Free to Dare",
  description:
    "An aerial retreat in Valencia (18–25 June 2027): 9 hours of aerial training in small groups, a sunset catamaran, paella, flamenco and a community of people who love aerial.",
  openGraph: {
    title: "Valencia Aerial Escape | Free to Dare",
    description:
      "Discover Valencia through aerial arts, Spanish culture and shared experiences, 18–25 June 2027.",
    images: VALENCIA_SHARE.images,
  },
  twitter: VALENCIA_SHARE.twitter,
};

/* The same sections as the Azores landing, in the same order, recoloured by
   .theme-valencia (globals.css). Intro, community, accommodation and
   itinerary will join them once their Valencia content exists. */
export default function Valencia() {
  return (
    <main className="theme-valencia section-stack flex w-full flex-1 flex-col gap-(--section-gap) bg-background pb-(--section-gap) text-ink">
      <HeroSection />
      <ExperiencesSection />
      <TrainingSpaceSection />
      <TestimonialsSection />
      <IncludedSection />
      <PricingSection />
      <FaqSection questions={VALENCIA_FAQ} />
    </main>
  );
}
