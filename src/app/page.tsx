import Image from "next/image";
import { ExperienceSection } from "@/components/experience-section";
import { HeroSection } from "@/components/hero-section";
import { InstructorReels } from "@/components/instructor-reels";
import { InstructorSection } from "@/components/instructor-section";
import { ReelCard } from "@/components/reel-card";
import { SecretMomentSection } from "@/components/secret-moment-section";
import { StaysSection } from "@/components/stays-section";
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

export default function Home() {
  return (
    <main className="w-full flex-1">
      <HeroSection />
      <div className="bg-white">
        <div
          data-reveal-group
          className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-14 min-[88rem]:px-0"
        >
          <div className="grid gap-12 pt-8 lg:grid-cols-2 lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-14">
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
            <ReelCard />

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
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-28 -top-28 size-64 rounded-full border border-line"
                />

                <div className="relative flex items-center justify-between">
                  <div className="relative size-16 overflow-hidden rounded-full ring-4 ring-white">
                    <Image
                      src="/images/owner-avatar.webp"
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
                <SparkleIcon className="absolute right-0 top-1/2 size-4 text-muted/60 -translate-x-5" />
                <p className="mt-12 text-sm leading-relaxed text-muted">
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
      <StaysSection />
      {/* <SecretMomentSection /> */}
    </main>
  );
}
