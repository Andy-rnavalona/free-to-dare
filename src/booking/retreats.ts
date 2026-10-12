/*
 * The retreats that can be booked online, each with what its booking pages
 * need: its stays, its payment plans and their Stripe Payment Links, and where
 * its pages live. The booking and confirmation pages are the same for all of
 * them; a retreat's pages only pass its id.
 */

import {
  formatEuro,
  LISBON_PRICING,
  RETREAT,
  STRIPE_LINKS,
  type PaymentPlan,
  type Pricing,
} from "@/booking/booking-config";
import { STAYS, type StayPackage } from "@/booking/stays";
import { AZORES } from "@/components/azores/retreat";
import {
  AZORES_BOOKING,
  AZORES_CONFIRMATION,
  AZORES_RETREAT,
  LISBON_BOOKING,
  LISBON_CANCELLATION,
  LISBON_CONFIRMATION,
  LISBON_RETREAT,
  LISBON_TERMS,
} from "@/lib/routes";

export type BookingRetreat = Pricing & {
  name: string;
  dates: string;
  datesShort: string;
  /** Where the confirmation says you are going: "You're coming to …" */
  destination: string;
  stays: StayPackage[];
  /** One Payment Link per stay and plan; a plan with no link is not offered */
  links: Record<string, Partial<Record<PaymentPlan, string>>>;
  /** Plans asked for by email instead of paid online, whatever the stay */
  requestByEmail?: PaymentPlan[];
  /** For a stay without accommodation */
  ownStayNote: string;
  /** Shown in place of a stay's photo when it has none; without it, the card has no side */
  noPhotoTagline?: [string, string];
  /** Shows "Your Lisbon home" under the stays */
  homeSection: boolean;
  routes: {
    landing: string;
    booking: string;
    confirmation: string;
    terms: string;
    cancellation: string;
  };
};

const lisbon: BookingRetreat = {
  ...LISBON_PRICING,
  ...RETREAT,
  destination: "Lisbon",
  stays: STAYS,
  links: STRIPE_LINKS,
  ownStayNote:
    "You book and pay for your own place to stay in Lisbon. Breakfast at the retreat house is not included either — everything else in the programme is exactly the same.",
  noPhotoTagline: ["Your Lisbon,", "your way."],
  homeSection: true,
  routes: {
    landing: LISBON_RETREAT,
    booking: LISBON_BOOKING,
    confirmation: LISBON_CONFIRMATION,
    terms: LISBON_TERMS,
    cancellation: LISBON_CANCELLATION,
  },
};

/* ─── Azores Into The Wild ─── */

/* You pay in full or in instalments, not a deposit alone. The instalment plan
   goes through the deposit Payment Link, whatever the stay. Paying in full is
   asked for by email: Stripe's fees on the whole amount are too high. */
const AZORES_DEPOSIT_LINK = "https://buy.stripe.com/14A14o9Eo4e8djL7Iig362B";
const azoresLinks = { instalments: AZORES_DEPOSIT_LINK };

const azoresProgramme = [
  "5 pole classes (90 min)",
  "Scheduled activities & excursions",
  "All grouped transfers",
  "Welcome dinner",
  "Pole photoshoot",
];

const withAzoresStay = [
  `${AZORES.nights} nights accommodation`,
  "Daily breakfast",
  ...azoresProgramme,
];

const azoresStays: StayPackage[] = [
  {
    id: "shared",
    index: "01",
    label: "Shared stay",
    title: "Shared room — 2 people",
    price: AZORES.priceShared,
    description: "Share a room with one other retreat participant.",
    accommodationIncluded: true,
    availability: "Spots available",
    cta: "Select shared room",
    includes: withAzoresStay,
  },
  {
    id: "private",
    index: "02",
    label: "Private stay",
    title: "Private room",
    price: AZORES.pricePrivate,
    description: "Single occupancy, for more privacy and personal space.",
    accommodationIncluded: true,
    availability: "Limited availability",
    cta: "Select private room",
    includes: withAzoresStay,
  },
  {
    id: "partner",
    index: "03",
    label: "Pole + Partner",
    title: "1 pole participant + 1 accompanying guest",
    price: AZORES.pricePartner,
    per: "couple",
    guests: "2 guests",
    description:
      "Share the Azores experience together: your partner joins the accommodation, breakfast, transfers, excursions, activities and welcome dinner, while the pole classes are for the pole participant.",
    accommodationIncluded: true,
    availability: "Spots available",
    cta: "Select pole + partner",
    includes: [
      `${AZORES.nights} nights accommodation (shared room for two)`,
      "Daily breakfast",
      "5 pole classes for 1 person (90 min)",
      "Activities & excursions for both guests",
      "All grouped transfers",
      "Welcome dinner for both",
      "Pole photoshoot for the pole participant",
    ],
  },
  {
    id: "none",
    index: "04",
    label: "Retreat only",
    title: "Without accommodation",
    price: AZORES.priceRetreatOnly,
    description:
      "Join the full retreat experience while organising your own stay in São Miguel.",
    accommodationIncluded: false,
    availability: "Spots available",
    cta: "Select retreat only",
    includes: azoresProgramme,
  },
];

const azores: BookingRetreat = {
  deposit: AZORES.deposit,
  // TODO: confirm with the client
  fullPaymentDiscount: 50,
  instalments: {
    count: 3,
    dates: ["Date to be confirmed", "Date to be confirmed", "Date to be confirmed"],
  },
  name: AZORES.name,
  dates: AZORES.dates,
  datesShort: AZORES.dates,
  destination: "the Azores",
  stays: azoresStays,
  links: Object.fromEntries(azoresStays.map((stay) => [stay.id, azoresLinks])),
  requestByEmail: ["full"],
  ownStayNote: `You book and pay for your own place to stay in São Miguel, at the hotel or any hotel nearby. Breakfast is not included either — everything else in the programme is exactly the same.`,
  homeSection: false,
  routes: {
    landing: AZORES_RETREAT,
    booking: AZORES_BOOKING,
    confirmation: AZORES_CONFIRMATION,
    // The legal pages are the same for every retreat
    terms: LISBON_TERMS,
    cancellation: LISBON_CANCELLATION,
  },
};

export const BOOKING_RETREATS = { lisbon, azores };

export type BookingRetreatId = keyof typeof BOOKING_RETREATS;

/* ─── Helpers ─── */

export const CONTACT_EMAIL = "contact@freetodare.com";

export function findStay(retreat: BookingRetreat, id: string | null | undefined) {
  return retreat.stays.find((stay) => stay.id === id) ?? null;
}

/** The Payment Link for a stay and plan, or null while there is none */
export function stripeLink(retreat: BookingRetreat, stay: string, plan: PaymentPlan) {
  const link = retreat.links[stay]?.[plan];
  return link?.startsWith("https://") ? link : null;
}

/** Whether a plan is asked for by email rather than paid online */
export function requestedByEmail(retreat: BookingRetreat, plan: PaymentPlan) {
  return !!retreat.requestByEmail?.includes(plan);
}

/** Whether a stay can be booked with a plan: online, or by email */
export function planOffered(retreat: BookingRetreat, stay: string, plan: PaymentPlan) {
  return requestedByEmail(retreat, plan) || !!stripeLink(retreat, stay, plan);
}

/** The prefilled email asking to pay a stay in full */
export function emailRequestLink(retreat: BookingRetreat, stay: StayPackage, amount: number) {
  const subject = `Full payment request — ${retreat.name}`;
  const body = [
    "Hello,",
    "",
    `I would like to book the ${retreat.name} (${retreat.dates}) and pay in full.`,
    "",
    `Stay: ${stay.title}`,
    `Amount: ${formatEuro(amount)}`,
    "",
    "Name:",
    "Phone:",
    "",
    "Thank you!",
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
