/*
 * VALENCIA AERIAL ESCAPE — the numbers and dates of the retreat shown on its
 * landing and its booking pages, in one place, as given by its mockup. The
 * hero's button scrolls to the stays, whose cards open the booking page
 * (src/booking/retreats.ts).
 */

export const VALENCIA = {
  name: "Valencia Aerial Escape",
  dates: "18–25 June 2027",
  place: "Valencia, Spain",
  nights: 7,
  /** Aerial training per participant over the week */
  trainingHours: 9,
  /** Participants per training group */
  groupMax: 8,
  /** Paid today to hold a place */
  deposit: 500,
  /** Full package with a shared hotel room, per person */
  priceShared: 2650,
  /** Retreat without accommodation, per person */
  priceRetreatOnly: 1950,
  /** Where the group stays */
  hotel: "SH Inglés Boutique Hotel",
} as const;

const EXPERIENCES =
  "Sunset catamaran, paella class, wine & cheese tasting, flamenco show, sangria evening and city tour";

/** What each way to stay includes, on the booking page.
    The keys are its `?stay=` values. */
export const VALENCIA_INCLUDES = {
  shared: [
    `${VALENCIA.nights} nights in a 4-star hotel (shared room)`,
    "Daily breakfast",
    `${VALENCIA.trainingHours} hours of aerial training`,
    "Professional aerial photoshoot",
    EXPERIENCES,
    "Airport transfers & transportation for scheduled activities",
    "On-site organisation and support",
  ],
  none: [
    `${VALENCIA.trainingHours} hours of aerial training`,
    "Professional aerial photoshoot",
    EXPERIENCES,
    "Transportation for scheduled activities",
    "On-site organisation and support",
  ],
};

export type ValenciaStayId = keyof typeof VALENCIA_INCLUDES;

/** Where the hero's button leads: the ways to stay and their prices */
export const STAYS_ANCHOR = "#stays";

/** The organiser's WhatsApp, as given in the FAQ of the other retreats */
const WHATSAPP_NUMBER = "351934921930";

/** A chat with the organiser, opened on `message` */
export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
