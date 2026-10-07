import Image from "next/image";
import {
  Camera,
  Footprints,
  Luggage,
  Mountain,
  Plane,
  Ship,
  Sparkles,
  Sun,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CardVideo } from "@/components/card-video";
import { ArrowRightIcon } from "@/components/icons";
import { ItineraryDay } from "@/components/itinerary-day";
import { formatEuro } from "@/booking/booking-config";
import { withBasePath } from "@/lib/base-path";
import { AZORES, PRICING_ANCHOR } from "@/components/azores/retreat";
import {
  BADGE_SUN,
  BUTTON_DARK,
  CONTAINER,
  DISPLAY,
  MICRO,
} from "@/components/azores/ui";

const TRANSFERS_INCLUDED = "Transfers for scheduled activities are included.";
const RETURN_INCLUDED = "Return group transfer is included.";
const AIRPORT_INCLUDED = "Group airport transfers are included.";
const WHALE_WATCHING_INCLUDED = "Whale watching and scheduled group transfers are included.";

type Activity = {
  kind: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  /** Bold sentence closing the description, when a transfer is covered */
  note?: string;
};

type Day = {
  title: string;
  date: string;
  intro: string;
  /** Two photos (or short videos) above the intro */
  gallery: Media[];
  activities: Activity[];
};

type Media =
  | { src: string; alt: string }
  | {
      av1: string;
      mp4: string;
      poster: string;
      label: string;
      hasAudio?: boolean;
    };

const photo = (src: string, alt: string) => ({
  src: withBasePath(`/images/azores/${src}`),
  alt,
});

const SETE_CIDADES_LAKE = photo(
  "sete-cidades-lake.avif",
  "Blue hydrangeas overlooking the lake and volcanic crater of Sete Cidades",
);
const SETE_CIDADES_QUAD = photo(
  "sete-cidades-quad.avif",
  "A group riding quad bikes above the blue and green lakes of Sete Cidades",
);
const COMMUNITY = photo("community.jpg", "The group together at a viewpoint");
const NORTH_COAST_TEA = photo(
  "north-coast-tea.avif",
  "Lush tea plantations on São Miguel’s north coast",
);
const NORTH_COAST_WATERFALL = photo(
  "north-coast-waterfall.avif",
  "A waterfall surrounded by lush greenery on São Miguel",
);
const BREAKFAST = photo("restaurant.jpg", "Breakfast room of the stay");
const WHALE = photo("whale-breaching.webp", "A whale breaching in the Atlantic");
const POLE_CLASS_03 = photo(
  "pole-class-03.avif",
  "A pole dancer performing a pose in the studio",
);
const POLE_TRAINING = {
  av1: withBasePath("/videos/azores/pole-training.av1.mp4"),
  mp4: withBasePath("/videos/azores/pole-training.mp4"),
  poster: withBasePath("/videos/azores/pole-training-poster.webp"),
  label: "The group practising pole dance on the studio stages",
  hasAudio: false,
};
const LAGOA_DO_FOGO = photo(
  "lagoa-do-fogo-viewpoint.avif",
  "A visitor overlooking Lagoa do Fogo and its volcanic crater on São Miguel",
);
const SANTA_BARBARA_BEACH = photo(
  "santa-barbara-beach.avif",
  "Atlantic waves along Santa Bárbara Beach on São Miguel’s north coast",
);
const PHOTOSHOOT = photo("photoshoot.webp", "Pole photoshoot on the Azores coast");
const AIRPORT = photo("airport.webp", "Ponta Delgada airport by the ocean");
const WELCOME_DINNER = {
  av1: withBasePath("/videos/azores/welcome-dinner.av1.mp4"),
  mp4: withBasePath("/videos/azores/welcome-dinner.mp4"),
  poster: withBasePath("/videos/azores/welcome-dinner-poster.webp"),
  label: "The group around a long table at the welcome dinner",
};

const days: Day[] = [
  {
    title: "Welcome to São Miguel",
    date: "Tuesday, 30 June",
    gallery: [AIRPORT, WELCOME_DINNER],
    intro:
      "Welcome to São Miguel! Arrive, settle into your stay and meet the group. We intentionally keep the first day relaxed, with no complex activities planned, giving everyone time to arrive, unpack and get comfortable. In the evening, we’ll take an easy walk through Ponta Delgada city centre before coming together for our first dinner at a local restaurant.",
    activities: [
      {
        kind: "Travel",
        title: "Arrival & group transfers",
        description:
          "Grouped airport transfers to Vila Galé Collection S. Miguel are included. The hotel is only around 10 minutes from the airport. Transfers are organised according to participants’ flight arrival times, including late arrivals and flight delays.",
        note: AIRPORT_INCLUDED,
        Icon: Plane,
      },
      {
        kind: "Community",
        title: "Welcome dinner",
        description:
          "Our first evening is all about meeting each other. We gather for a relaxed welcome dinner and officially begin the Azores Into The Wild retreat.",
        note: RETURN_INCLUDED,
        Icon: UtensilsCrossed,
      },
    ],
  },
  {
    title: "Pole & the north coast",
    date: "Wednesday, 1 July",
    gallery: [NORTH_COAST_TEA, NORTH_COAST_WATERFALL],
    intro:
      "Our first full day starts in the studio before discovering the island’s capital together.",
    activities: [
      {
        kind: "Pole training",
        title: "Pole Class 01",
        description:
          "Our first 90-minute pole session takes place at our partner studio, with four pole stages installed specifically for the retreat. All scheduled transfers are included, and the studio is only a 5–10 minute drive from our accommodation.",
        note: TRANSFERS_INCLUDED,
        Icon: Sparkles,
      },
      {
        kind: "Explore",
        title: "THE NORTH COAST EXPLORATION",
        description:
          "After our morning pole training, we’ll have lunch together in Ponta Delgada (not included in the retreat price) before heading to São Miguel’s lush North Coast — Gorreana Tea Plantation, Cascata do Limbo and Miradouro de Santa Iria. We’ll return to the hotel in the evening.",
        note: RETURN_INCLUDED,
        Icon: Footprints,
      },
    ],
  },
  {
    title: "Sete Cidades",
    date: "Thursday, 2 July",
    gallery: [SETE_CIDADES_LAKE, SETE_CIDADES_QUAD],
    intro:
      "Today we head west for the island’s most iconic volcanic landscapes before returning to the studio for training.",
    activities: [
      {
        kind: "Pole training",
        title: "Pole Class 02",
        description:
          "Back to the studio for the second 90-minute pole session.",
        note: TRANSFERS_INCLUDED,
        Icon: Sparkles,
      },
      {
        kind: "Volcanic",
        title: "Sete Cidades Adventure — Choose Your Experience",
        description:
          "In the afternoon, we head west to discover the spectacular volcanic landscapes of Sete Cidades. Choose between a half-day quad adventure, combining off-road trails, crater views and the famous blue and green lakes, or a guided scenic van tour, taking you through the volcanic crater and some of its most spectacular viewpoints.As part of the experience, we’ll stop at Vista do Rei and the iconic abandoned Monte Palace Hotel, overlooking the Sete Cidades lakes, where we’ll take time to capture photos and video content against this extraordinary cinematic backdrop.",
        note: "A valid driving licence is required for the quad experience. Your selected experience and group transfers are included.",
        Icon: Mountain,
      },
    ],
  },
  {
    title: "Into the Atlantic",
    date: "Friday, 3 July",
    gallery: [WHALE, POLE_CLASS_03],
    intro: "A day on the water, between Atlantic air, whales and training.",
    activities: [
      {
        kind: "On the water",
        title: "Whale watching",
        description:
          "We start the morning on the Atlantic, heading out with a local crew in search of whales and dolphins in their natural environment. A unique opportunity to experience São Miguel from the ocean and discover the incredible marine life of the Azores.",
        note: WHALE_WATCHING_INCLUDED,
        Icon: Ship,
      },
      {
        kind: "Pole training",
        title: "Pole Class 03",
        description: "Back in the studio for the third 90-minute pole session.",
        note: TRANSFERS_INCLUDED,
        Icon: Sparkles,
      },
      {
        kind: "Free time",
        title: "Free time",
        description:
          "The evening is free — rest, explore, or simply enjoy the slow rhythm of the island.",
        Icon: Sun,
      },
    ],
  },
  {
    title: "Fire, tea & thermal waters",
    date: "Saturday, 4 July",
    gallery: [LAGOA_DO_FOGO, SANTA_BARBARA_BEACH],
    intro:
      "The wildest day of the week: volcanic fire, tea fields and warm thermal waters.",
    activities: [
      {
        kind: "Pole Class 04",
        title: "Photoshoot preparation",
        description:
          "We start the day with our fourth 90-minute pole session, with a special focus on preparing poses, shapes and combinations for our upcoming outdoor photoshoot. Classes take place in small groups, allowing plenty of space and individual attention.",
        note: "Scheduled group transfers are included.",
        Icon: Sparkles,
      },
      {
        kind: "Lunch & rest",
        title: "Slow afternoon",
        description:
          "After training, we return to the hotel for a long break. Enjoy lunch, shower, rest or take a nap before heading out again later in the afternoon.",
        Icon: UtensilsCrossed,
        note: "Lunch is not included."
      },
      {
        kind: "Volcanic landscapes",
        title: "Lagoa do Fogo",
        description:
          "Later in the afternoon, we leave Ponta Delgada for one of São Miguel’s most spectacular volcanic landscapes. Around 30 minutes from the hotel, we stop at panoramic viewpoints overlooking Lagoa do Fogo, with time to enjoy the crater views and take photos.",
        Icon: Mountain,
      },
      {
        kind: "Atlantic sunset",
        title: "Santa Bárbara Beach",
        description:
          "From Lagoa do Fogo, we continue for around 20 minutes towards the North Coast and the beautiful volcanic sands of Santa Bárbara Beach. Enjoy a coffee or drink at the beach bar, walk along the black-sand beach, take photos or simply relax by the Atlantic as the sun goes down. After sunset, we return to Ponta Delgada.",
        note: "Scheduled group transfers are included.",
        Icon: Sun,
      },
    ],
  },
  {
    title: "Wild ride & create",
    date: "Sunday, 5 July",
    gallery: [POLE_TRAINING, PHOTOSHOOT],
    intro:
      "A final pole session, time to rest and an outdoor photoshoot among São Miguel’s hydrangeas.",
    activities: [
      {
        kind: "Pole training",
        title: "Pole Class 05",
        description:
          "We start the day with our fifth and final 90-minute pole session.",
        note: "Returned group transfers are included.",
        Icon: Sparkles,
      },
      {
        kind: "Rest",
        title: "Lunch & rest",
        description:
          "After training, we return to the hotel for lunch and a proper break, with time to shower, rest and get ready for the photoshoot.",
        note: "Lunch is not included.",
        Icon: UtensilsCrossed,
      },
      {
        kind: "Pole photoshoot",
        title: "In a sea of hydrangeas",
        description:
          "One of the signature moments of our Azores retreat. Later in the afternoon, we take one pole stage outdoors for a professional photoshoot surrounded by São Miguel’s iconic hydrangeas. Each participant will have her own dedicated time in front of the camera. The exact location will be carefully selected closer to the retreat according to the hydrangea bloom, weather conditions, accessibility and safe installation of the pole stage.",
        note: "Group transfers are included.",
        Icon: Camera,
      },
    ],
  },
  {
    title: "Last flight & goodbye",
    date: "Monday, 6 July",
    gallery: [COMMUNITY, BREAKFAST],
    intro: "Our last morning together before flying home.",
    activities: [
      {
        kind: "Last morning",
        title: "Breakfast together",
        description:
          "Our last morning together in the Azores. We enjoy breakfast at the hotel, share a final moment with the group and get ready for the journey home.",
        Icon: UtensilsCrossed,
      },
      {
        kind: "Check-out",
        title: "Time to say goodbye",
        description:
          "After breakfast, it’s time to pack, check out and say goodbye to São Miguel — taking home new memories, new connections and plenty of photos from the week.",
        Icon: Luggage,
      },
      {
        kind: "Travel",
        title: "Group airport transfers",
        description:
          "Grouped transfers take you from the hotel to Ponta Delgada Airport according to the scheduled departure times.",
        note: "Return group airport transfer is included.",
        Icon: Plane,
      },
    ],
  },
];

function DayPanel({ day }: { day: Day }) {
  return (
    <>
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        {day.gallery.map((item) =>
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
              className="h-40 w-full rounded-2xl sm:h-[17rem]"
            />
          ) : (
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              width={1024}
              height={768}
              sizes="(min-width: 1280px) 22rem, (min-width: 640px) 30vw, 90vw"
              className="h-40 w-full rounded-2xl object-cover sm:h-[17rem]"
            />
          ),
        )}
      </div>

      <p className="text-sm leading-relaxed text-muted">{day.intro}</p>

      <ul className="mt-4 divide-y divide-line/60">
        {day.activities.map(({ kind, title, description, note, Icon }) => (
          <li key={title} className="py-3.5 first:pt-0 last:pb-0">
            <div className="flex min-w-0 items-start gap-3">
              <Icon
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-forest"
              />
              <div className="min-w-0">
                <p className={`${MICRO} text-[0.65rem] text-muted`}>{kind}</p>
                <h3
                  className={`${DISPLAY} mt-1.5 text-lg leading-tight text-forest`}
                >
                  {title}
                </h3>
              </div>
            </div>
            <p className="mt-2 pl-8 text-sm leading-relaxed text-muted">
              {description}
              {note && (
                <>
                  {" "}
                  <strong className="font-bold text-forest">{note}</strong>
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function BookingCard() {
  return (
    <div className="rounded-xl bg-white p-7 shadow-sm">
      <p className={`${DISPLAY} text-xl leading-tight text-forest`}>
        <span className="block">Azores Into</span>
        <span className="block">The Wild</span>
      </p>
      <p className={`${MICRO} mt-3 text-[0.65rem] text-muted`}>{AZORES.dates}</p>

      <div className="mt-6 border-t border-line pt-5">
        <p className={`${MICRO} text-[0.65rem] text-muted`}>From</p>
        <p className="mt-1 font-display text-4xl leading-none text-forest">
          {formatEuro(AZORES.priceFrom)}
        </p>
        <p className="mt-3">
          <span className={`${BADGE_SUN} inline-block text-[0.65rem]`}>
            {formatEuro(AZORES.deposit)} deposit to reserve
          </span>
        </p>
      </div>

      <a
        href={PRICING_ANCHOR}
        className={`${BUTTON_DARK} mt-6 flex w-full justify-center py-3.5`}
      >
        Book now
        <ArrowRightIcon className="size-3.5" />
      </a>
      <p className="mt-3 text-center text-xs text-muted">
        Flexible payment plans available.
      </p>
      <p
        className={`${MICRO} mt-5 border-t border-line pt-4 text-center text-[0.65rem] text-muted`}
      >
        {AZORES.classes} · Max. {AZORES.groupMax} participants
      </p>
    </div>
  );
}

export function ItinerarySection() {
  return (
    <section
      id="itinerary"
      aria-labelledby="itinerary-title"
      data-reveal-group
      className="scroll-mt-28 bg-white"
    >
      <div className={CONTAINER}>
        <p data-reveal className={`${MICRO} text-[0.65rem] text-forest`}>
          The week
        </p>
        <h2
          id="itinerary-title"
          data-reveal
          className={`${DISPLAY} mt-5 max-w-3xl text-[clamp(2.5rem,5.5vw,4.25rem)] text-forest`}
        >
          <span className="block">Your Azores</span>
          <span className="block">adventure</span>
        </h2>
        <p
          data-reveal
          className="mt-6 max-w-xl text-sm leading-relaxed text-muted"
        >
          A day-by-day journey between pole training and the wild landscapes of
          São Miguel.
        </p>
        <p data-reveal className={`${MICRO} mt-4 text-[0.65rem] text-muted`}>
          {AZORES.dates} · {AZORES.island} · Maximum {AZORES.groupMax}{" "}
          participants
        </p>

        <div className="mt-12 flex flex-col gap-10 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
          {/* Days. The reveal sits on a wrapper so its transition doesn't
              override the card's hover one */}
          <div className="order-last min-w-0 space-y-3 lg:order-none">
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

          {/* Booking card: first on mobile, follows the scroll on desktop */}
          <aside data-reveal className="order-first lg:order-none">
            <div className="lg:sticky lg:top-32">
              <BookingCard />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
