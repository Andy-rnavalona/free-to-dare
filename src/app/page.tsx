import Image from "next/image";
import { ExperienceSection } from "@/components/experience-section";
import { HeroCarousel } from "@/components/hero-carousel";
import { InstructorSection } from "@/components/instructor-section";
import { CheckIcon, SparkleIcon } from "@/components/icons";

const highlights = [
  "City exploration",
  "Jacaranda season",
  "Shared experiences",
];

const tripDetails = [
  { label: "Where", value: "Lisbon, Portugal" },
  { label: "When", value: "[Start date] – 11 June 2027" },
  { label: "For whom", value: "For curious travelers" },
  { label: "Group size", value: "Maximum 16 people" },
];

export default function Home() {
  return (
    <main className="w-full flex-1">
      <div
        data-reveal-group
        className="mx-auto w-full max-w-[2400px] px-5 pb-24 sm:px-10 lg:px-14"
      >
        <header
          data-reveal
          className="flex items-center justify-between gap-4 border-b border-line py-6 text-[11px] font-bold uppercase tracking-[0.16em] text-ink sm:py-8 sm:text-xs"
        >
          <span>Lisbon Aerial Escape</span>
          <span className="hidden md:inline">38.7223° N / 9.1393° W</span>
          <span>City Escape / 2027</span>
        </header>

        <div className="grid gap-12 pt-8 lg:grid-cols-2 lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-14">
          {/* Intro */}
          <section className="flex flex-col lg:pt-4">
            <div data-reveal>
              <p className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.16em]">
                <SparkleIcon className="size-4 text-sand" />
                Lisbon / Portugal
              </p>
              <p className="mt-2 pl-7 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Curated city escape
              </p>
            </div>

            <h1 className="mt-14 font-display text-[clamp(3.5rem,14vw,6rem)] uppercase leading-[0.86] tracking-[-0.01em] lg:mt-20 lg:text-[clamp(3.5rem,5.4vw,9rem)]">
              <span data-reveal className="block">
                Discover
              </span>
              <span data-reveal className="block text-sage">
                Lisbon
              </span>
              <span data-reveal className="block">
                From
              </span>
              <span data-reveal className="block">
                Above
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

            <div className="mt-10 max-w-xl space-y-7 text-lg leading-relaxed text-muted">
              <p data-reveal>
                Spend a few days discovering Lisbon at the most beautiful time
                of the year — when jacarandas bloom, rooftops glow in the
                evening light and every street invites you to slow down.
              </p>
              <p data-reveal>
                Explore the city from unexpected perspectives, share
                unforgettable moments and meet curious travelers who love
                discovering cities as much as you do.
              </p>
            </div>
          </section>

          {/* Visual */}
          <HeroCarousel />

          {/* Details */}
          <aside className="flex flex-col gap-12 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-10 xl:col-span-1 xl:flex xl:gap-12 xl:pt-4">
            <dl>
              {tripDetails.map(({ label, value }) => (
                <div
                  key={label}
                  data-reveal
                  className="flex items-baseline justify-between gap-6 border-b border-line py-7 first:pt-4 lg:py-9"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {label}
                  </dt>
                  <dd className="text-right text-lg font-semibold">{value}</dd>
                </div>
              ))}
            </dl>

            <article
              data-reveal
              className="relative mt-auto overflow-hidden rounded-[2.5rem] bg-card p-8 shadow-[0_1px_0_rgb(22_35_26/0.04)] sm:p-11"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 -top-28 size-64 rounded-full border border-line"
              />

              <div className="relative flex items-center justify-between">
                <div className="relative size-16 overflow-hidden rounded-full ring-4 ring-white">
                  <Image
                    src="/images/lisbon-tram.jpg"
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
                  16 travelers max
                </span>
              </div>

              <blockquote className="relative mt-16 space-y-10 text-[clamp(1.5rem,1.75vw,2.4rem)] font-medium leading-[1.2] tracking-tight">
                <p>It started with a love for discovering cities.</p>
                <p className="pr-8">
                  Now it’s about sharing those moments with people who see
                  travel the same way.
                </p>
                <SparkleIcon className="absolute right-0 top-1/2 size-4 text-muted/60" />
              </blockquote>

              <p className="mt-12 leading-relaxed text-muted">
                Walk the streets, discover hidden corners, watch the city change
                in the evening light and share the experience with a small group
                of curious travelers.
              </p>
            </article>
          </aside>
        </div>
      </div>

      <ExperienceSection />
      <InstructorSection />
    </main>
  );
}
