/*
 * VALENCIA AERIAL ESCAPE — the numbers and dates of the retreat shown on its
 * landing, in one place, as given by its mockup. There is no booking flow yet:
 * the hero's button scrolls to the pricing, and the plans open a WhatsApp chat
 * with the organiser.
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
} as const;

/** Where the hero's button leads */
export const PRICING_ANCHOR = "#pricing";

/** The organiser's WhatsApp, as given in the FAQ of the other retreats */
const WHATSAPP_NUMBER = "351934921930";

/** A chat with the organiser, opened on `message` */
export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
