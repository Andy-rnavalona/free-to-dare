import {
  DEPOSIT,
  STAY_PRICES,
  formatEuro,
  type PaymentPlan,
  type StayId,
} from "@/booking/booking-config";
import { withBasePath } from "@/lib/base-path";

/* Stay options of the booking page, worded as in the payment mockup.
   Prices come from booking-config.ts. */

const IMG = withBasePath("/images/booking");
const HOSTEL_IMG = withBasePath("/images/hostel");

export type Photo = { src: string; alt: string };

export type StayPackage = {
  id: StayId;
  index: string;
  label: string;
  title: string;
  price: number;
  description: string;
  accommodationIncluded: boolean;
  availability: string;
  cta: string;
  includes: string[];
  room?: {
    type: string;
    guests: string;
    beds: string;
    bathroom: string;
    amenities: string[];
    gallery: Photo[];
  };
};

const withAccommodation = [
  "Full retreat programme",
  "Aerial training",
  "Accommodation",
  "Breakfast",
  "Retreat activities",
  "Local transportation included in the programme",
  "Social dinner",
];

export const STAYS: StayPackage[] = [
  {
    id: "shared",
    index: "01",
    label: "Shared stay",
    title: "Shared room — 2 people",
    price: STAY_PRICES.shared,
    description: "Share a twin room with one other retreat participant.",
    accommodationIncluded: true,
    availability: "3 spots available",
    cta: "Select shared room",
    includes: withAccommodation,
    room: {
      type: "Twin room, shared with one other participant",
      guests: "2 guests",
      beds: "2 single beds",
      bathroom: "Private bathroom shared between the two roommates",
      amenities: [
        "Air conditioning",
        "Balcony with street view",
        "Fresh linen & towels",
        "Wardrobe & work desk",
        "Daily breakfast included",
      ],
      gallery: [
        {
          src: `${IMG}/room-shared-2.jpg`,
          alt: "Twin room with navy bedding, framed artwork and bedside lamps",
        },
        {
          src: `${IMG}/room-shared-3.jpg`,
          alt: "Bright twin room with two single beds and orange throws",
        },
        { src: `${IMG}/room-shared.jpg`, alt: "Twin room with two single beds and tall windows" },
        { src: `${IMG}/room-bath.jpg`, alt: "Bright tiled bathroom with walk-in shower" },
        { src: `${IMG}/home-living.jpg`, alt: "Communal living room of the Lisbon guesthouse" },
      ],
    },
  },
  {
    id: "private",
    index: "02",
    label: "Private stay",
    title: "Private room",
    price: STAY_PRICES.private,
    description: "Your own room for more privacy and personal space.",
    accommodationIncluded: true,
    availability: "1 private room available",
    cta: "Select private room",
    includes: withAccommodation,
    room: {
      type: "Private double room",
      guests: "1 guest",
      beds: "1 double bed",
      bathroom: "Private en-suite bathroom",
      amenities: [
        "Air conditioning",
        "Arched window with city view",
        "Fresh linen & towels",
        "Reading chair & desk",
        "Daily breakfast included",
      ],
      gallery: [
        {
          src: `${IMG}/room-private-2.jpg`,
          alt: "Private single room with tree-print wallpaper and teal accents",
        },
        { src: `${IMG}/room-private.jpg`, alt: "Private room with double bed and a view over Lisbon" },
        { src: `${IMG}/room-bath.jpg`, alt: "En-suite bathroom with brass fixtures" },
        { src: `${IMG}/home-rooftop.jpg`, alt: "Rooftop terrace at golden hour" },
      ],
    },
  },
  {
    id: "none",
    index: "03",
    label: "Flexible stay",
    title: "Without accommodation",
    price: STAY_PRICES.none,
    description:
      "Join the full retreat experience while organising your own stay in Lisbon.",
    accommodationIncluded: false,
    availability: "Spots available",
    cta: "Select without accommodation",
    includes: [
      "Full retreat programme",
      "Aerial training",
      "Retreat activities",
      "Local transportation included in the programme",
      "Social dinner",
    ],
  },
];

export function findStay(id: StayId) {
  return STAYS.find((stay) => stay.id === id)!;
}

/** "Your Lisbon home" gallery: the first photo is the tall one.
 *  Same Living Lounge Hostel photos as the landing page (StaysSection). */
export const HOME_GALLERY: Photo[] = [
  {
    src: `${HOSTEL_IMG}/01.webp`,
    alt: "Living room with a travel wall and a red lounge",
  },
  { src: `${HOSTEL_IMG}/02.webp`, alt: "Calm single room with teal accents" },
  { src: `${HOSTEL_IMG}/03.webp`, alt: "Bunk room with warm light" },
  {
    src: `${HOSTEL_IMG}/04.webp`,
    alt: "Warm wooden hallway with a welcome chalkboard",
  },
  {
    src: `${HOSTEL_IMG}/05.webp`,
    alt: "Reading corner with plants and a vintage cabinet",
  },
  { src: `${HOSTEL_IMG}/06.webp`, alt: "Twin room with a red curtain" },
];

export const PLAN_LABELS: Record<PaymentPlan, string> = {
  deposit: `Reserve with ${formatEuro(DEPOSIT)} deposit`,
  full: "Pay in full",
  instalments: "Pay in instalments",
};
