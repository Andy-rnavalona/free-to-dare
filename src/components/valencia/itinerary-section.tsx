import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { formatEuro } from "@/booking/booking-config";
import {
  ArrowRightIcon,
  BedDoubleIcon,
  FootprintsIcon,
  SailboatIcon,
  SparklesIcon,
  SunIcon,
  UtensilsIcon,
  WavesIcon,
} from "@/components/icons";
import { CardVideo } from "@/components/card-video";
import { ItineraryDay } from "@/components/itinerary-day";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";
import { VALENCIA } from "@/components/valencia/retreat";
import { withBasePath } from "@/lib/base-path";
import { VALENCIA_BOOKING } from "@/lib/routes";

/* "The week", built like the Lisbon itinerary: the days on the left, a
   booking card following the scroll on the right, a booking bar on mobile.
   The photos are the ones the page already has, until the week's own. */

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

type Activity = {
  kind: string;
  /** "10:00–12:00", for the classes */
  time?: string;
  title: string;
  description?: string;
  icon: Icon;
};

type Photo = {
  src: string;
  alt: string;
  /** Stock photo standing in for the real experience: says so on the photo */
  illustrative?: boolean;
};

type Video = {
  av1: string;
  mp4: string;
  poster: string;
  label: string;
  /** Shows the sound button; false for videos without an audio track */
  hasAudio: boolean;
};

type Day = {
  title: string;
  date: string;
  intro?: string;
  media: (Photo | Video)[];
  activities: Activity[];
};

const IMG = "/images/valencia";

const days: Day[] = [
  {
    title: "Welcome to Valencia",
    date: "Friday, 18 June",
    intro:
      "Welcome to Valencia! Arrive, settle into your accommodation, and meet the group. Today is intentionally relaxed, giving everyone time to arrive, unwind, and get comfortable before our first evening together.",
    media: [
      {
        src: withBasePath(`${IMG}/itinerary/day1-tapas-bar.webp`),
        alt: "A Spanish tapas bar with tiled counter, wine bottles and chalkboard menus",
        illustrative: true,
      },
      {
        av1: withBasePath("/videos/valencia/old-town.av1.mp4"),
        mp4: withBasePath("/videos/valencia/old-town.mp4"),
        poster: withBasePath("/videos/valencia/old-town-poster.webp"),
        label: "Valencia's old town seen from above, its streets and café terraces",
        hasAudio: false,
      },
    ],
    activities: [
      {
        kind: "Social",
        title: "Welcome Dinner",
        description:
          "Let’s kick off our adventure with a relaxed evening at a local Spanish restaurant! It’s the perfect opportunity to meet everyone, enjoy the atmosphere of Valencia, and get to know each other before our exciting week together. We’ll head out for dinner and enjoy some delicious local cuisine.",
        icon: UtensilsIcon,
      },
    ],
  },
  {
    title: "Aerial Training & Paella Experience",
    date: "Saturday, 19 June",
    media: [
      {
        src: withBasePath(`${IMG}/studio-hall.webp`),
        alt: "Vaivé's aerial hall, rigged with hoops, trapezes and silks",
      },
      {
        src: withBasePath(`${IMG}/taste-of-spain.webp`),
        alt: "Women cooking a paella together in a cooking class",
        illustrative: true,
      },
    ],
    activities: [
      {
        kind: "Aerial training",
        time: "10:00–12:00",
        title: "Lyra Tricks & Transitions",
        description:
          "Explore new tricks, creative combinations, and smooth transitions on the aerial hoop.",
        icon: SparklesIcon,
      },
      {
        kind: "Dance",
        time: "13:30–15:30",
        title: "Contemporary Movement",
        description:
          "Discover fluidity, expression, and creative movement through contemporary dance. Transfers to and from the training studio are included in the retreat price, so you don’t need to worry about transportation.",
        icon: SparklesIcon,
      },
      {
        kind: "Free time",
        title: "Free Afternoon – Relax & Explore",
        icon: SunIcon,
      },
      {
        kind: "Food",
        title: "Paella Cooking Class & Dinner",
        description:
          "In the evening, we’ll discover one of Valencia’s most famous culinary traditions with a hands-on paella cooking class! Learn how to prepare authentic Valencian paella, enjoy the cooking experience together, and finish the evening with a delicious paella dinner.",
        icon: UtensilsIcon,
      },
    ],
  },
  {
    title: "Aerial Dynamics & Sunset Boat Trip",
    date: "Sunday, 20 June",
    media: [
      {
        src: withBasePath(`${IMG}/fly-studio.webp`),
        alt: "Vaivé aerial studio with hoops, trapezes and silks",
      },
      {
        src: withBasePath(`${IMG}/bateau.webp`),
        alt: "A group of women smiling on a sailboat out at sea",
        illustrative: true,
      },
    ],
    activities: [
      {
        kind: "Aerial training",
        time: "10:00–12:00",
        title: "Lyra Dynamics",
        description:
          "Explore dynamic movements on the aerial hoop, working on momentum, controlled transitions, and exciting combinations.",
        icon: SparklesIcon,
      },
      {
        kind: "Acrobatics",
        time: "13:30–15:30",
        title: "Soft Acrobatics",
        description:
          "Develop strength, flexibility, coordination, and body awareness through floor-based acrobatic movements.",
        icon: SparklesIcon,
      },
      {
        kind: "Free time",
        title: "Free Afternoon – Relax & Recharge",
        description:
          "After training, enjoy some well-deserved free time to relax and recharge before our evening adventure.",
        icon: SunIcon,
      },
      {
        kind: "On the water",
        title: "Sunset Boat Trip",
        description:
          "In the evening, we’ll head out to sea for a beautiful sunset boat trip along Valencia’s coastline! Enjoy the Mediterranean breeze, stunning coastal views, and the magical colours of the sunset as we relax together on the water.",
        icon: SailboatIcon,
      },
    ],
  },
  {
    title: "Discover Valencia & Stretching",
    date: "Monday, 21 June",
    intro:
      "Today is all about discovering Valencia, enjoying some free time, and giving our bodies a chance to recover after two days of intensive training.",
    media: [
      {
        src: withBasePath(`${IMG}/guided-valencia.webp`),
        alt: "A guided group tour on Plaza de la Virgen in Valencia",
        illustrative: true,
      },
      {
        src: withBasePath(`${IMG}/hotel/04.webp`),
        alt: "A street of Valencia's old town lined with café terraces",
      },
    ],
    activities: [
      {
        kind: "City",
        title: "Guided Valencia City Tour",
        description:
          "In the morning, we’ll explore Valencia together on a guided walking tour through its charming streets, historic squares, and beautiful architecture.",
        icon: FootprintsIcon,
      },
      {
        kind: "Free time",
        title: "Free Afternoon – Lunch & Relax",
        description:
          "After our guided tour, the afternoon is yours to enjoy at your own pace! Choose a local restaurant or café for lunch, discover some delicious Spanish cuisine, head to the beach, explore the city, or simply relax. Lunch is at your own expense, giving you the freedom to choose where and what you’d like to eat.",
        icon: SunIcon,
      },
      {
        kind: "Recovery",
        time: "17:30–18:30",
        title: "Stretch & Flex",
        description:
          "We’ll finish the day with a gentle stretching and flexibility session, focusing on mobility, muscle recovery, and improving our range of motion. The session will most probably be outside rather than in the studio; this will be confirmed close to or during the retreat.",
        icon: WavesIcon,
      },
    ],
  },
];

/** The deposit badge of the stays cards: light saffron, black text */
const DEPOSIT_BADGE =
  "inline-block bg-sun/50 px-2.5 py-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink";

const BUTTON =
  "items-center justify-center gap-3 rounded-full bg-forest font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white transition hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

function DayPanel({ day }: { day: Day }) {
  const frame = "relative h-40 w-full overflow-hidden rounded-2xl sm:h-[280px]";

  return (
    <>
      <div className="mb-4 grid grid-cols-2 gap-3">
        {day.media.map((item) =>
          "mp4" in item ? (
            <CardVideo
              key={item.mp4}
              sources={[
                { src: item.av1, type: 'video/mp4; codecs="av01.0.08M.08"' },
                { src: item.mp4, type: "video/mp4" },
              ]}
              poster={item.poster}
              label={item.label}
              hasAudio={item.hasAudio}
              className={frame}
            />
          ) : (
            <div key={item.src} className={`${frame} bg-line`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1280px) 25rem, (min-width: 1024px) 30vw, 45vw"
                className="object-cover"
              />
              {item.illustrative && (
                <p className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2.5 py-1 text-[0.65rem] leading-snug text-white backdrop-blur-sm sm:bottom-3 sm:right-3 sm:px-3 sm:py-1.5 sm:text-xs">
                  Illustrative photo
                </p>
              )}
            </div>
          ),
        )}
      </div>

      {day.intro && (
        <p className="mb-4 text-sm leading-relaxed text-muted">{day.intro}</p>
      )}

      <ul className="divide-y divide-line/60">
        {day.activities.map(({ kind, time, title, description, icon: Icon }) => (
          <li key={title} className="py-3.5 first:pt-0 last:pb-0">
            <div className="flex min-w-0 items-start gap-3">
              <Icon className="mt-0.5 size-5 shrink-0 text-forest" />
              <div className="min-w-0">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                  {kind}
                  {time && <span className="text-ink"> · {time}</span>}
                </p>
                <h3 className="mt-1.5 font-display text-lg uppercase leading-tight tracking-[-0.01em] text-ink">
                  {title}
                </h3>
              </div>
            </div>
            {description && (
              <p className="mt-2 pl-8 text-sm leading-relaxed text-muted">
                {description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export function ItinerarySection() {
  return (
    <section
      id="itinerary"
      aria-labelledby="itinerary-title"
      data-reveal-group
      className="scroll-mt-28 bg-background"
    >
      <div className={CONTAINER}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-14">
          <div className="min-w-0">
            <header className="mb-12 lg:mb-14">
              <p
                data-reveal
                className={`${MICRO} flex items-center gap-3 text-[0.65rem] text-ink`}
              >
                Valencia
                <span aria-hidden="true" className="h-px w-8 bg-ink" />
                The week
              </p>
              <h2
                id="itinerary-title"
                data-reveal
                className={`${DISPLAY} mt-5 max-w-3xl text-[clamp(2.5rem,5.5vw,4.25rem)] text-forest`}
              >
                Your Valencia adventure
              </h2>
              <p
                data-reveal
                className="mt-6 max-w-xl text-sm leading-relaxed text-muted"
              >
                A day-by-day look at the week. Open any day to see the
                experiences planned, from studio sessions to sunsets on the
                water.
              </p>
              <div data-reveal className="mt-8 max-w-xl">
                <h3 className="font-display text-lg uppercase leading-tight tracking-[-0.01em] text-ink">
                  Transportation
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Airport transfers are included with the hotel package, and
                  transport to the training studio and to every scheduled
                  activity is included for everyone — you don’t need to worry
                  about getting around.
                </p>
              </div>
            </header>

            {/* The reveal sits on a wrapper so its transition doesn't override the card's hover one */}
            <div className="space-y-3">
              {days.map((day, i) => (
                <div key={day.title} data-reveal>
                  <ItineraryDay
                    day={i + 1}
                    title={day.title}
                    date={day.date}
                    defaultOpen={i === 0}
                  >
                    <DayPanel day={day} />
                  </ItineraryDay>
                </div>
              ))}
            </div>

            <p
              data-reveal
              className="mt-8 rounded-xl bg-white p-5 text-sm leading-relaxed text-muted shadow-sm"
            >
              The activity order is indicative. The final schedule may be
              adjusted according to local conditions, weather and operational
              requirements, and partners for each experience are confirmed
              closer to the retreat.
            </p>
          </div>

          {/* Booking card, follows the scroll on desktop */}
          <aside className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
            <div className="rounded-xl bg-white p-7 shadow-sm">
              <p className="font-display text-xl uppercase leading-tight tracking-[-0.01em] text-ink">
                {VALENCIA.name}
              </p>
              <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                {VALENCIA.dates}
              </p>
              <div className="mt-6 border-t border-line pt-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                  From
                </p>
                <p className="mt-1 font-display text-4xl leading-none text-ink">
                  {formatEuro(VALENCIA.priceShared)}
                  <span className="ml-2 inline-block font-sans text-base font-medium text-muted">
                    / person
                  </span>
                </p>
                <p className="mt-2 text-sm text-muted">
                  Retreat + {VALENCIA.nights} nights in a 4-star hotel
                </p>
                <div className="mt-4 flex items-center gap-3 rounded-xl bg-forest/[0.06] px-4 py-3">
                  <BedDoubleIcon aria-hidden="true" className="size-5 shrink-0 text-forest" />
                  <p className="text-sm leading-snug text-muted">
                    Retreat only (without accommodation):
                    <span className="block">
                      <span className="font-display text-base text-ink">
                        {formatEuro(VALENCIA.priceRetreatOnly)}
                      </span>{" "}
                      / person
                    </span>
                  </p>
                </div>
                <p className="mt-4">
                  <span className={DEPOSIT_BADGE}>
                    {formatEuro(VALENCIA.deposit)} deposit to reserve
                  </span>
                </p>
              </div>
              <Link href={VALENCIA_BOOKING} className={`mt-6 flex w-full px-5 py-3.5 ${BUTTON}`}>
                Book your spot
                <ArrowRightIcon className="size-3.5" />
              </Link>
              <p className="mt-3 text-center text-xs text-muted">
                Flexible payment options available
              </p>
              <p className="mt-5 border-t border-line pt-4 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                {VALENCIA.trainingHours} hours of aerial training
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile booking bar: sticky rather than fixed, so it only shows while the itinerary is on screen */}
      <div className="sticky bottom-0 z-40 border-t border-line/60 bg-background px-4 py-3 lg:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
              From
            </p>
            <p className="font-display text-2xl leading-none text-ink">
              {formatEuro(VALENCIA.priceShared)}
              <span className="ml-1.5 font-sans text-sm font-medium text-muted">/ person</span>
            </p>
          </div>
          <Link href={VALENCIA_BOOKING} className={`inline-flex shrink-0 px-5 py-2.5 ${BUTTON}`}>
            Book your spot
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
