import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import {
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
      },
      {
        kind: "City",
        title: "First Lisbon Walk",
        description:
          "After dinner, those who wish can join a relaxed walk through central Lisbon and enjoy the atmosphere of the city at night.",
        icon: FootprintsIcon,
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
          "Return to JAYA Aerial Lab for another 90-minute aerial hoop session.",
        icon: SparklesIcon,
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
      },
      {
        kind: "Aerial training",
        title: "Aerial Hoop Class #4",
        description:
          "Continue directly with our fourth 90-minute aerial hoop training.",
        icon: SparklesIcon,
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
      },
      {
        kind: "Evening",
        title: "Head to the Coast",
        description:
          "After training, we leave Lisbon and travel towards Carcavelos Beach.",
        icon: MoonIcon,
      },
      {
        kind: "Ocean",
        title: "Surf Experience",
        description:
          "Swap the hoop for a surfboard and experience Portugal from the water. The surf session is designed to be accessible and fun, including instruction and equipment.",
        icon: WavesIcon,
      },
      {
        kind: "Evening",
        title: "Beach & Coastal Time",
        description:
          "After surfing, enjoy time by the ocean to relax, have a drink and soak up the Portuguese coastline before returning to Lisbon.",
        icon: MoonIcon,
      },
      {
        kind: "Social",
        title: "Farewell Evening",
        description: "Celebrate our final evening together in Lisbon.",
        icon: UtensilsIcon,
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
        title: "Departure",
        description: "Individual departures from Lisbon.",
        icon: PlaneIcon,
      },
    ],
  },
];

const summary = [
  "5–11 June 2027",
  `${NIGHTS} nights`,
  "5 × 90 min aerial classes",
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
        {day.activities.map(({ kind, title, description, icon: Icon }) => (
          <li key={title} className="py-3.5 first:pt-0 last:pb-0">
            <div className="flex min-w-0 items-start gap-3">
              <Icon className="mt-0.5 size-5 shrink-0 text-forest" />
              <div className="min-w-0">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-muted">
                  {kind}
                </p>
                <h3 className="mt-2 font-condensed text-lg font-bold uppercase leading-tight text-forest">
                  {title}
                </h3>
              </div>
            </div>
            <p className="mt-2 pl-8 text-sm leading-relaxed text-muted">
              {description}
            </p>
          </li>
        ))}
      </ul>

      {day.overnight && (
        <div className="mt-4 rounded-2xl  bg-card p-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <BedDoubleIcon className="size-5 shrink-0 text-forest" />
              <h3 className="truncate font-condensed text-xl font-bold uppercase text-forest">
                {HOSTEL}
              </h3>
            </div>
            <span className="shrink-0 bg-sun px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-forest">
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
            <header className="mb-6">
              <p
                data-reveal
                className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-muted"
              >
                <span className="mr-2 inline-block size-2 rounded-full bg-sun align-middle" />
                The week
              </p>
              <h2
                id="itinerary-title"
                data-reveal
                className="mt-3 font-condensed text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-forest sm:text-6xl"
              >
                Your Lisbon adventure
              </h2>
              <p
                data-reveal
                className="mt-3 max-w-2xl text-sm leading-relaxed text-muted"
              >
                A day-by-day look at the week. Open any day to see the
                experiences planned, from studio sessions to sunsets on the
                water.
              </p>
              <p
                data-reveal
                className="mt-3 text-[0.7rem] font-bold uppercase leading-loose tracking-[0.22em] text-forest/80 sm:text-xs"
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
              className="mt-8 rounded-2xl border border-line/60 bg-white p-5 text-sm leading-relaxed text-muted"
            >
              The activity order is indicative. The final schedule may be
              adjusted according to local conditions, weather and operational
              requirements, and partners for each experience are confirmed
              closer to the retreat.
            </p>
          </div>

          {/* Booking card, follows the scroll on desktop */}
          <aside className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
            <div className="rounded-[1.75rem] border border-line/60 bg-white p-7">
              <p className="font-condensed text-2xl font-extrabold uppercase leading-none text-forest">
                Lisbon Aerial Urban Escape
              </p>
              <p className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-muted">
                5–11 June 2027
              </p>
              <div className="mt-6 border-t border-line/60 pt-5">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-muted">
                  From
                </p>
                <p className="mt-1 font-condensed text-5xl font-extrabold leading-none text-forest">
                  {PRICE_FROM}
                </p>
                <p className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-forest">
                  <span className="rounded-full bg-sun-soft px-2 py-0.5">
                    €500 deposit
                  </span>{" "}
                  to reserve
                </p>
              </div>
              <a
                href={RESERVE_URL}
                className="mt-6 flex w-full items-center justify-center rounded-full bg-sun px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-forest transition-transform hover:-translate-y-0.5"
              >
                Book your spot
              </a>
              <p className="mt-3 text-center text-xs text-muted">
                Flexible payment options available
              </p>
              <p className="mt-5 border-t border-line/60 pt-4 text-center text-[0.68rem] font-bold uppercase tracking-[0.2em] text-muted">
                5 × 90 min aerial hoop classes
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile booking bar: sticky rather than fixed, so it only shows while the itinerary is on screen */}
      <div className="sticky bottom-0 z-40 border-t border-line/60 bg-white px-4 py-3 lg:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-muted">
              From
            </p>
            <p className="font-condensed text-2xl font-extrabold leading-none text-forest">
              {PRICE_FROM}
            </p>
          </div>
          <a
            href={RESERVE_URL}
            className="shrink-0 rounded-full bg-sun px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-forest"
          >
            Book your spot
          </a>
        </div>
      </div>
    </section>
  );
}
