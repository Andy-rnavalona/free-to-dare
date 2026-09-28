import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import {
  ArrowRightIcon,
  BedDoubleIcon,
  CameraIcon,
  FootprintsIcon,
  MoonIcon,
  PlaneIcon,
  SailboatIcon,
  SparklesIcon,
  SunIcon,
  UtensilsIcon,
  WavesIcon,
} from "@/components/icons";
import { CardVideo } from "@/components/card-video";
import { ItineraryDay } from "@/components/itinerary-day";

const RESERVE_URL = "#join";
const PRICE_FROM = "€1,750";
const NIGHTS = 6;
const HOSTEL = "Living Lounge Hostel";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

type Activity = {
  kind: string;
  title: string;
  description: string;
  icon: Icon;
  /** Adds the “return group transfer included” line */
  transfer?: boolean;
};

type Photo = {
  src: string;
  alt: string;
  /** object-position class keeping the subject in the landscape crop */
  position?: string;
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
  intro: string;
  /** Photos and videos shown above the intro; a day may have none */
  media?: (Photo | Video)[];
  activities: Activity[];
  /** Nights 1–6 are spent at the hostel; the last day has none */
  overnight?: boolean;
};

const days: Day[] = [
  {
    title: "Welcome to Lisbon",
    date: "Saturday, 5 June",
    intro:
      "Welcome to Lisbon! Arrive, settle into the Living Lounge Hostel and meet the group. Today is intentionally relaxed, giving everyone time to arrive and get comfortable before our first evening together.",
    media: [
      {
        src: "/images/jour1/01.webp",
        alt: "Friends watching the sunset over Lisbon and the 25 de Abril Bridge",
        position: "object-[50%_30%]",
      },
      {
        av1: "/images/jour1/rooftop-dinner.av1.mp4",
        mp4: "/images/jour1/rooftop-dinner.mp4",
        poster: "/images/jour1/rooftop-dinner.jpg",
        label: "Rooftop dinner with live music in Lisbon",
        hasAudio: true,
      },
    ],
    activities: [
      {
        kind: "Social",
        title: "Welcome Community Dinner",
        description:
          "Our first evening is all about meeting each other. We’ll gather for a relaxed community dinner in Lisbon and officially begin our Urban Escape together.",
        icon: UtensilsIcon,
        transfer: true,
      },
      {
        kind: "City",
        title: "First Lisbon Walk",
        description:
          "After dinner, those who wish can join a relaxed walk through central Lisbon and enjoy the atmosphere of the city at night.",
        icon: FootprintsIcon,
        transfer: true,
      },
    ],
    overnight: true,
  },
  {
    title: "Fly & Sail",
    date: "Sunday, 6 June",
    intro:
      "Our first full day combines aerial movement with one of Lisbon’s most beautiful experiences on the water.",
    media: [
      {
        av1: "/images/jour2/lisbon-tagus.av1.mp4",
        mp4: "/images/jour2/lisbon-tagus.mp4",
        poster: "/images/jour2/lisbon-tagus.jpg",
        label: "Sailing boats on the Tagus and the streets of Lisbon",
        hasAudio: false,
      },
      {
        src: "/images/jour2/01.avif",
        alt: "Sunset over the Tagus and the 25 de Abril Bridge",
      },
    ],
    activities: [
      {
        kind: "Aerial training",
        title: "Aerial Hoop Class #1",
        description:
          "Our first 90-minute aerial hoop training takes place at JAYA Aerial Lab – Studio 1.",
        icon: SparklesIcon,
        transfer: true,
      },
      {
        kind: "Free time",
        title: "Free Time in Lisbon",
        description:
          "After training, enjoy some free time for lunch, cafés, exploring or simply relaxing.",
        icon: SunIcon,
      },
      {
        kind: "On the water",
        title: "Sunset Sailing",
        description:
          "In the evening, we head to the Tagus River for a sunset sailing experience. See Lisbon from the water as the city turns golden and sail past some of its iconic riverside landmarks.",
        icon: SailboatIcon,
        transfer: true,
      },
    ],
    overnight: true,
  },
  {
    title: "Discover Lisbon",
    date: "Monday, 7 June",
    intro:
      "Today we discover Lisbon beyond the obvious tourist spots before returning to the studio for our second training.",
    media: [
      {
        src: "/images/jour3/01.webp",
        alt: "Yellow tram crossing a Lisbon street",
        position: "object-[50%_45%]",
      },
      {
        src: "/images/jour3/02.webp",
        alt: "Woman in a hat looking over the Tagus and the 25 de Abril Bridge",
      },
    ],
    activities: [
      {
        kind: "City",
        title: "Guided Lisbon Walk",
        description:
          "Explore Lisbon with a local guide through historic neighbourhoods, colourful streets, viewpoints and hidden corners — focused on the atmosphere and stories of the city rather than a traditional sightseeing tour.",
        icon: FootprintsIcon,
        transfer: true,
      },
      {
        kind: "Social",
        title: "Free Time & Lunch",
        description: "Take a break for lunch and recharge before training.",
        icon: UtensilsIcon,
      },
      {
        kind: "Aerial training",
        title: "Aerial Hoop Class #2",
        description:
          "Return to JAYA Aerial Lab for another 90-minute training session.",
        icon: SparklesIcon,
        transfer: true,
      },
    ],
    overnight: true,
  },
  {
    title: "Lisbon Through the Lens",
    date: "Tuesday, 8 June",
    intro:
      "Today is about capturing the urban character of Lisbon and creating memories that look as good as they feel.",
    media: [
      {
        src: "/images/jour4/01.webp",
        alt: "Photographer shooting a portrait under the arcades of Praça do Comércio",
        position: "object-[50%_55%]",
      },
      {
        src: "/images/jour4/02.webp",
        alt: "Aerial hoop pose outdoors above a Lisbon amphitheatre",
        position: "object-[50%_45%]",
      },
    ],
    activities: [
      {
        kind: "Photoshoot",
        title: "Urban Photoshoot",
        description:
          "Explore some of Lisbon’s most photogenic locations during our urban photoshoot. Think colourful façades, azulejos, yellow trams, narrow streets, viewpoints and cinematic city moments.",
        icon: CameraIcon,
        transfer: true,
      },
      {
        kind: "Free time",
        title: "Free Time",
        description: "Enjoy lunch and some downtime after the photoshoot.",
        icon: SunIcon,
      },
      {
        kind: "Aerial training",
        title: "Aerial Hoop Class #3",
        description:
          "Continue our aerial journey with the third 90-minute hoop class at JAYA.",
        icon: SparklesIcon,
        transfer: true,
      },
    ],
    overnight: true,
  },
  {
    title: "Aerial Training, Lyra Photoshoot & Relax",
    date: "Wednesday, 9 June",
    intro:
      "A slower morning followed by a creative afternoon dedicated to aerial photography and training.",
    media: [
      {
        src: "/images/jour5/01.webp",
        alt: "Aerial hoop pose against a black studio background",
        position: "object-[50%_45%]",
      },
      {
        src: "/images/jour5/02.webp",
        alt: "Two friends hugging on a sunny Lisbon promenade",
        position: "object-[50%_30%]",
      },
    ],
    activities: [
      {
        kind: "Free time",
        title: "Free Morning",
        description:
          "Sleep in, explore Lisbon independently, shop, visit a café or simply recharge.",
        icon: SunIcon,
      },
      {
        kind: "Photoshoot",
        title: "Aerial Hoop Photoshoot",
        description:
          "Today we transform the studio into our creative playground for a dedicated aerial hoop photoshoot. Participants will have the opportunity to capture beautiful images on the hoop.",
        icon: CameraIcon,
        transfer: true,
      },
      {
        kind: "Aerial training",
        title: "Aerial Hoop Class #4",
        description:
          "Continue directly with our fourth 90-minute aerial hoop training.",
        icon: SparklesIcon,
        transfer: true,
      },
      {
        kind: "Free time",
        title: "Free Evening",
        description:
          "The evening is yours to explore Lisbon, have dinner with the group or simply rest.",
        icon: SunIcon,
      },
    ],
    overnight: true,
  },
  {
    title: "Surf, Beach & Atlantic Vibes",
    date: "Thursday, 10 June",
    intro:
      "Our final full day takes us from the aerial studio to the Atlantic Ocean.",
    media: [
      {
        src: "/images/jour6/01.webp",
        alt: "Surf group in wetsuits posing with their boards",
        position: "object-[50%_70%]",
      },
      {
        src: "/images/jour6/02.webp",
        alt: "Surfers walking on the beach at sunset",
        position: "object-[50%_75%]",
      },
    ],
    activities: [
      {
        kind: "Aerial training",
        title: "Aerial Hoop Class #5",
        description:
          "Begin the day with our fifth and final 90-minute aerial hoop session at JAYA Aerial Lab.",
        icon: SparklesIcon,
        transfer: true,
      },
      {
        kind: "Evening",
        title: "Head to the Coast",
        description:
          "After training, we leave Lisbon and travel towards Carcavelos Beach.",
        icon: MoonIcon,
        transfer: true,
      },
      {
        kind: "Ocean",
        title: "Surf Experience",
        description:
          "Swap the hoop for a surfboard and experience Portugal from the water. The surf session is designed to be accessible and fun, including instruction and equipment.",
        icon: WavesIcon,
        transfer: true,
      },
      {
        kind: "Evening",
        title: "Beach & Coastal Time",
        description:
          "After surfing, enjoy time by the ocean to relax, have a drink and soak up the Portuguese coastline before returning to Lisbon.",
        icon: MoonIcon,
        transfer: true,
      },
      {
        kind: "Social",
        title: "Farewell Evening",
        description: "Celebrate our final evening together in Lisbon.",
        icon: UtensilsIcon,
        transfer: true,
      },
    ],
    overnight: true,
  },
  {
    title: "Até Logo, Lisbon",
    date: "Friday, 11 June",
    intro:
      "Our Lisbon Urban Escape comes to an end. Enjoy your final breakfast, say goodbye to your new friends and head home with new skills, photographs and memories from an unforgettable week together.",
    activities: [
      {
        kind: "Travel",
        title: "GROUP TRANSFER TO THE AIRPORT",
        description:
          "We organise group transfers based on participants’ flight departure times.",
        icon: PlaneIcon,
      },
    ],
  },
];

const summary = [
  "5–11 June 2027",
  `${NIGHTS} nights`,
  "6 × 90 min aerial classes",
  "Lisbon",
];

function DayPanel({ day, index }: { day: Day; index: number }) {
  const media = day.media ?? [];
  const single = media.length === 1;
  const sizes = single
    ? "(min-width: 1280px) 50rem, (min-width: 1024px) 60vw, 90vw"
    : "(min-width: 1280px) 25rem, (min-width: 1024px) 30vw, 45vw";
  const frame = "h-40 w-full rounded-2xl sm:h-[280px]";

  return (
    <>
      {media.length > 0 && (
        <div className={`mb-4 grid gap-3 ${single ? "" : "grid-cols-2"}`}>
          {media.map((item) =>
            "mp4" in item ? (
              <CardVideo
                key={item.mp4}
                sources={[
                  { src: item.av1, type: 'video/mp4; codecs="av01.0.05M.08"' },
                  { src: item.mp4, type: "video/mp4" },
                ]}
                poster={item.poster}
                label={item.label}
                hasAudio={item.hasAudio}
                className={frame}
              />
            ) : (
              <Image
                key={item.src}
                src={item.src}
                alt={item.alt}
                width={1080}
                height={1620}
                sizes={sizes}
                className={`${frame} object-cover ${item.position ?? ""}`}
              />
            ),
          )}
        </div>
      )}

      <p className="text-sm leading-relaxed text-muted">{day.intro}</p>

      <ul className="mt-4 divide-y divide-line/60">
        {day.activities.map(
          ({ kind, title, description, icon: Icon, transfer }) => (
            <li key={title} className="py-3.5 first:pt-0 last:pb-0">
              <div className="flex min-w-0 items-start gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-forest" />
                <div className="min-w-0">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                    {kind}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg uppercase leading-tight tracking-[-0.01em] text-forest">
                    {title}
                  </h3>
                </div>
              </div>
              <p className="mt-2 pl-8 text-sm leading-relaxed text-muted">
                {description}
                {transfer && (
                  <>
                    {" "}
                    <strong className="font-bold text-forest">
                      Return group transfer is included.
                    </strong>
                  </>
                )}
              </p>
            </li>
          ),
        )}
      </ul>

      {day.overnight && (
        <div className="mt-4 rounded-2xl  bg-card p-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <BedDoubleIcon className="size-5 shrink-0 text-forest" />
              <h3 className="font-display text-lg uppercase leading-tight tracking-[-0.01em] text-forest">
                {HOSTEL}
              </h3>
            </div>
            <span className="shrink-0 bg-sun px-2.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-forest">
              Night {index + 1}/{NIGHTS}
            </span>
          </div>
          <p className="mt-2 pl-8 text-sm text-muted">Overnight in Lisbon.</p>
        </div>
      )}
    </>
  );
}

export function ItinerarySection() {
  return (
    <section
      id="itinerary"
      aria-labelledby="itinerary-title"
      data-reveal-group
      className="bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-14 min-[88rem]:px-0">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-14">
          <div className="min-w-0">
            <header className="mb-12 lg:mb-14">
              <p
                data-reveal
                className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-forest"
              >
                <span aria-hidden="true" className="h-px w-10 bg-sand" />
                The week
              </p>
              <h2
                id="itinerary-title"
                data-reveal
                className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4.25rem)] uppercase leading-[0.95] tracking-[-0.02em] text-forest"
              >
                Your Lisbon adventure
              </h2>
              <p
                data-reveal
                className="mt-6 max-w-xl text-sm leading-relaxed text-muted"
              >
                A day-by-day look at the week. Open any day to see the
                experiences planned, from studio sessions to sunsets on the
                water.{" "}
                <strong className="font-bold text-forest">
                  TRANSPORT INCLUDED · Group airport transfers · Lisbon
                  transport pass · Transport to scheduled classes &amp;
                  activities
                </strong>
              </p>
              <p
                data-reveal
                className="mt-4 font-mono text-[0.7rem] uppercase leading-loose tracking-[0.2em] text-forest"
              >
                {summary.map((item, i) => (
                  <span key={item}>
                    {i > 0 && (
                      <span aria-hidden="true" className="mx-3 text-muted">
                        ·
                      </span>
                    )}
                    {item}
                  </span>
                ))}
              </p>
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
                    <DayPanel day={day} index={i} />
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
              <p className="font-display text-xl uppercase leading-tight tracking-[-0.01em] text-forest">
                Lisbon Aerial Urban Escape
              </p>
              <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                5–11 June 2027
              </p>
              <div className="mt-6 border-t border-line pt-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                  From
                </p>
                <p className="mt-1 font-display text-4xl leading-none text-forest">
                  {PRICE_FROM}
                </p>
                <p className="mt-3">
                  <span className="inline-block bg-sun px-2.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-forest">
                    €500 deposit to reserve
                  </span>
                </p>
              </div>
              <a
                href={RESERVE_URL}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-forest px-5 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white transition hover:bg-ink"
              >
                Book your spot
                <ArrowRightIcon className="size-3.5" />
              </a>
              <p className="mt-3 text-center text-xs text-muted">
                Flexible payment options available
              </p>
              <p className="mt-5 border-t border-line pt-4 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                6 × 90 min aerial hoop classes
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile booking bar: sticky rather than fixed, so it only shows while the itinerary is on screen */}
      <div className="sticky bottom-0 z-40 border-t border-line/60 bg-white px-4 py-3 lg:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
              From
            </p>
            <p className="font-display text-2xl leading-none text-forest">
              {PRICE_FROM}
            </p>
          </div>
          <a
            href={RESERVE_URL}
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-forest px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white transition hover:bg-ink"
          >
            Book your spot
            <ArrowRightIcon className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
