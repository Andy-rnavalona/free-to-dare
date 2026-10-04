import type { Metadata } from "next";
import Image from "next/image";
import { ExperienceSection } from "@/components/experience-section";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { InstructorReels } from "@/components/instructor-reels";
import { InstructorSection } from "@/components/instructor-section";
import { ItinerarySection } from "@/components/itinerary-section";
import { ReelCard } from "@/components/reel-card";
import { withBasePath } from "@/lib/base-path";
// Kept for later, together with its commented-out usage at the bottom of the page
// import { SecretMomentSection } from "@/components/secret-moment-section";
import { StaysSection } from "@/components/stays-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TrainingSpaceSection } from "@/components/training-space-section";
import { CheckIcon, SparkleIcon } from "@/components/icons";

const highlights = [
  "City exploration",
  "Jacaranda season",
  "Shared experiences",
];

const tripDetails = [
  { label: "Where", value: "Lisbon, Portugal" },
  { label: "When", value: "5 – 11 June 2027" },
  { label: "Group size", value: "Maximum 16 people" },
];

export const metadata: Metadata = {
  title: "Lisbon Aerial Urban Escape | Free to Dare",
  description:
    "A curated aerial retreat in Lisbon: daily aerial hoop and silks training with Pamela Mariotto, a sunset boat cruise, surf, photoshoots and time with the community. 5 – 11 June 2027.",
  openGraph: {
    title: "Free to Dare — Lisbon Aerial Urban Escape",
    description:
      "Train every day, explore Lisbon during jacaranda season and share the week with people who love aerial as much as you do. 5 – 11 June 2027.",
  },
};

export default function Home() {
  return (
    <main className="section-stack flex w-full flex-1 flex-col gap-(--section-gap) bg-white pb-(--section-gap)">
      <HeroSection />
      <div>
        <div
          data-reveal-group
          className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-14 min-[88rem]:px-0"
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-14">
            {/* Intro */}
            <section className="@container flex flex-col lg:pt-4">
              <div data-reveal>
                <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.16em]">
                  <SparkleIcon className="size-4 text-sand" />
                  Lisbon / Portugal
                </p>
              </div>

              {/* Sized from the column width so the longest word ("COMMUNITY", ~6.4em wide) always fits */}
              <h1 className="mt-8 font-display text-[min(6rem,15cqi)] uppercase leading-[0.86] tracking-[-0.01em] lg:mt-8">
                <span data-reveal className="block">
                  HOOP
                </span>
                <span data-reveal className="block text-forest">
                  SILKS
                </span>
                <span data-reveal className="block">
                  LISBON
                </span>
                <span data-reveal className="block">
                  COMMUNITY
                </span>
              </h1>

              <ul
                data-reveal
                className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-[0.06em]"
              >
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckIcon className="size-4" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 max-w-xl space-y-7 text-sm leading-relaxed text-muted">
                <p data-reveal>
                  Join us for an aerial retreat in Lisbon: train every day,
                  enjoy the city at the magical time when the jacaranda trees
                  are blooming, surf, dance, do an artistic photoshoot and spend
                  time with the community. Our trainings are aimed at helping
                  you learn choreographies and dance, while the retreat itself
                  is a combination of holidays, training and time with a
                  like-minded community. The whole experience is packaged and
                  coordinated for you — you don’t need to think about the
                  organisation, just come and enjoy the experience.
                </p>
              </div>
            </section>

            {/* Visual */}
            <ReelCard
              poster={withBasePath("/videos/lisbon-city.jpg")}
              sources={[
                {
                  src: withBasePath("/videos/lisbon-city.av1.mp4"),
                  type: 'video/mp4; codecs="av01.0.08M.08"',
                },
                {
                  src: withBasePath("/videos/lisbon-city.mp4"),
                  type: "video/mp4",
                },
              ]}
              label="Lisbon in motion: trams, viewpoints, the 25 de Abril bridge and the pink street"
              caption="A city made for curious minds"
            />

            {/* Details */}
            <aside className="flex flex-col gap-5 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-5 xl:col-span-1 xl:flex xl:gap-5">
              <dl>
                {tripDetails.map(({ label, value }) => (
                  <div
                    key={label}
                    data-reveal
                    className="flex items-baseline justify-between gap-5 border-b border-line py-2 first:pt-4 lg:py-3"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      {label}
                    </dt>
                    <dd className="text-right text-sm font-medium">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <article
                data-reveal
                className="relative overflow-hidden rounded-3xl bg-card p-8 shadow-[0_1px_0_rgb(22_35_26/0.04)]sm:p-11"
              >
                <div className="relative flex items-center justify-between">
                  <div className="relative size-16 overflow-hidden rounded-full ring-4 ring-white">
                    <Image
                      src={withBasePath("/images/owner-avatar.webp")}
                      alt="Portrait of the retreat host"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
                    Note from the organiser
                  </span>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  Hey, I’m Verolina, the organiser of this retreat. I first
                  discovered Lisbon during jacaranda season and completely fell
                  in love with its flowers, light and special atmosphere. I
                  created this retreat so you can combine your passion for
                  aerial with a holiday in a beautiful city, without having to
                  plan it all yourself. From your first rooftop dinner
                  overlooking Lisbon, you’ll meet the group, train together,
                  explore the city and share the experience with people who have
                  the same passion.
                </p>
              </article>
            </aside>
          </div>
        </div>
      </div>

      <ExperienceSection />
      <InstructorSection />
      <InstructorReels />
      <TrainingSpaceSection />
      <ItinerarySection />
      <StaysSection />
      <TestimonialsSection />
      <FaqSection />
      {/* <SecretMomentSection /> */}
    </main>
  );
}
