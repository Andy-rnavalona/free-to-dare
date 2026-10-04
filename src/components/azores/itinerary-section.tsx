import Image from "next/image";
import {
  BedDouble,
  Camera,
  Footprints,
  Leaf,
  Mountain,
  Plane,
  Ship,
  Sparkles,
  Sun,
  Trees,
  Truck,
  Users,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

const STAY = "Your Azores home";
const TRANSFERS_INCLUDED = "Transfers for scheduled activities are included.";
const RETURN_INCLUDED = "Return group transfer is included.";
const AIRPORT_INCLUDED = "Group airport transfers are included.";

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
  /** Two photos above the intro */
  gallery: { src: string; alt: string }[];
  activities: Activity[];
};

const photo = (src: string, alt: string) => ({
  src: withBasePath(`/images/azores/${src}`),
  alt,
});

const SETE_CIDADES = photo("hero.jpg", "The twin crater lakes of Sete Cidades");
const COMMUNITY = photo("community.jpg", "The group together at a viewpoint");
const STUDIO = photo("studio.jpg", "The retreat's pole studio");
const BREAKFAST = photo("restaurant.jpg", "Breakfast room of the stay");
const FOGO = photo("fogo.jpg", "Lagoa do Fogo crater lake");
const WHALE = photo("whale.jpg", "A whale surfacing in the Atlantic");
const QUAD = photo("quad.jpg", "Quad bikes on an island dirt road");
const THERMAL = photo("thermal.jpg", "Natural thermal pool on São Miguel");
const TEA = photo("tea.jpg", "Tea plantations on the north coast");
const PHOTOSHOOT = photo("photoshoot.jpg", "Pole photoshoot on the Azores coast");

const days: Day[] = [
  {
    title: "Welcome to São Miguel",
    date: "Tuesday, 30 June",
    gallery: [SETE_CIDADES, COMMUNITY],
    intro:
      "Welcome to São Miguel! Arrive, settle into your stay and meet the group. Today is intentionally relaxed, giving everyone time to arrive and get comfortable before our first evening together.",
    activities: [
      {
        kind: "Travel",
        title: "Arrival & group transfers",
        description:
          "Land in Ponta Delgada, where the group transfer brings you to your accommodation.",
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
    title: "First flight & Ponta Delgada",
    date: "Wednesday, 1 July",
    gallery: [STUDIO, BREAKFAST],
    intro:
      "Our first full day starts in the studio before discovering the island’s capital together.",
    activities: [
      {
        kind: "Pole training",
        title: "Pole Class 01",
        description:
          "Our first 90-minute pole session takes place in our partner studio, with four pole stages installed for the retreat.",
        note: TRANSFERS_INCLUDED,
        Icon: Sparkles,
      },
      {
        kind: "City",
        title: "Ponta Delgada old town",
        description:
          "After training, we explore the old town of Ponta Delgada together — colourful facades, the marina and the relaxed atmosphere of the island’s capital.",
        note: RETURN_INCLUDED,
        Icon: Footprints,
      },
      {
        kind: "Community",
        title: "Community moments",
        description:
          "The evening is left open to spend time together as a group — dinner, conversation and the first shared memories of the week.",
        Icon: Users,
      },
    ],
  },
  {
    title: "Sete Cidades",
    date: "Thursday, 2 July",
    gallery: [SETE_CIDADES, FOGO],
    intro:
      "Today we head west for the island’s most iconic volcanic landscapes before returning to the studio for training.",
    activities: [
      {
        kind: "Volcanic",
        title: "Vista do Rei viewpoint",
        description:
          "We begin at the famous Vista do Rei viewpoint, overlooking the twin lakes of Sete Cidades from above.",
        note: RETURN_INCLUDED,
        Icon: Mountain,
      },
      {
        kind: "Volcanic",
        title: "Lagoa do Canário & Boca do Inferno",
        description:
          "A stop at the Lagoa do Canário and the mythical Boca do Inferno belvedere — one of the most breathtaking views of the island.",
        note: RETURN_INCLUDED,
        Icon: Trees,
      },
      {
        kind: "Pole training",
        title: "Pole Class 02",
        description:
          "Back to the studio for the second 90-minute pole session.",
        note: TRANSFERS_INCLUDED,
        Icon: Sparkles,
      },
    ],
  },
  {
    title: "Into the Atlantic",
    date: "Friday, 3 July",
    gallery: [WHALE, QUAD],
    intro: "A day on the water, between Atlantic air, whales and training.",
    activities: [
      {
        kind: "On the water",
        title: "Whale watching",
        description:
          "We head out to sea with a local crew to observe whales and dolphins in their natural environment.",
        note: TRANSFERS_INCLUDED,
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
    gallery: [THERMAL, TEA],
    intro:
      "The wildest day of the week: volcanic fire, tea fields and warm thermal waters.",
    activities: [
      {
        kind: "Volcanic",
        title: "Lagoa do Fogo",
        description:
          "We cross the island to Lagoa do Fogo, one of the most beautiful crater lakes in the Azores.",
        note: RETURN_INCLUDED,
        Icon: Mountain,
      },
      {
        kind: "Reset",
        title: "Thermal waters",
        description:
          "We slow down in the island’s natural thermal waters — a real reset in the middle of the week.",
        note: TRANSFERS_INCLUDED,
        Icon: Waves,
      },
      {
        kind: "Local",
        title: "Tea plantations & north coast",
        description:
          "We visit the tea plantations and follow São Miguel’s wild north coast back home.",
        note: RETURN_INCLUDED,
        Icon: Leaf,
      },
    ],
  },
  {
    title: "Wild ride & create",
    date: "Sunday, 5 July",
    gallery: [QUAD, PHOTOSHOOT],
    intro:
      "An adventure day on four wheels, closed by a creative moment in front of the camera.",
    activities: [
      {
        kind: "Adventure",
        title: "Quad experience",
        description:
          "We explore the island’s dirt roads and wild landscapes on a guided quad experience.",
        note: TRANSFERS_INCLUDED,
        Icon: Truck,
      },
      {
        kind: "Pole training",
        title: "Pole Class 04",
        description: "Fourth 90-minute pole session in the studio.",
        note: TRANSFERS_INCLUDED,
        Icon: Sparkles,
      },
      {
        kind: "Create",
        title: "Azores photoshoot",
        description:
          "One professional photoshoot is included in the retreat. The exact location will be selected closer to the retreat depending on weather and local conditions.",
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
        kind: "Pole training",
        title: "Pole Class 05",
        description: "A final 90-minute session to close the week in the studio.",
        note: TRANSFERS_INCLUDED,
        Icon: Sparkles,
      },
      {
        kind: "Community",
        title: "Community moments",
        description:
          "We finish the week the way we started it: together, with the people who made it special.",
        Icon: Users,
      },
      {
        kind: "Travel",
        title: "Group airport transfers",
        description:
          "Group airport transfers take everyone back to Ponta Delgada airport in time for their flight.",
        note: RETURN_INCLUDED,
        Icon: Plane,
      },
    ],
  },
];

function DayPanel({ day, index }: { day: Day; index: number }) {
  return (
    <>
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        {day.gallery.map((item) => (
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            width={1024}
            height={768}
            sizes="(min-width: 1280px) 22rem, (min-width: 640px) 30vw, 90vw"
            className="h-40 w-full rounded-2xl object-cover sm:h-[17rem]"
          />
        ))}
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

      {index < AZORES.nights && (
        <div className="mt-4 rounded-2xl bg-card p-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <BedDouble
                aria-hidden="true"
                className="size-5 shrink-0 text-forest"
              />
              <h3
                className={`${DISPLAY} text-lg leading-tight tracking-[-0.01em] text-forest`}
              >
                {STAY}
              </h3>
            </div>
            <span className={`${BADGE_SUN} shrink-0 text-[0.65rem]`}>
              Night {index + 1}/{AZORES.nights}
            </span>
          </div>
          <p className="mt-2 pl-8 text-sm text-muted">
            Overnight in São Miguel.
          </p>
        </div>
      )}
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
                  <DayPanel day={day} index={i} />
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
