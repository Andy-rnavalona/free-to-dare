/*
 * AZORES INTO THE WILD — the numbers and dates of the retreat shown on the
 * homepage, in one place. Prices are display-only for now: every call to action
 * scrolls to the pricing section, exactly like the reference design. Wiring a
 * Stripe flow would mean its own booking config, next to src/booking/.
 */

export const AZORES = {
  name: "Azores Into The Wild",
  tagline: "Pole Dance Escape",
  dates: "30 June – 6 July 2027",
  place: "São Miguel · Azores",
  island: "São Miguel, Azores",
  duration: "6 nights / 7 days",
  nights: 6,
  groupMax: 16,
  classes: "5 × 90 min Pole Classes",
  /** Paid today to hold a place */
  deposit: 500,
  /** Lowest price per person, for the "From €…" labels */
  priceFrom: 2850,
  /** One pole participant plus an accompanying guest */
  pricePartner: 4100,
} as const;

/** Where every call to action leads, as in the reference design */
export const PRICING_ANCHOR = "#pricing";
