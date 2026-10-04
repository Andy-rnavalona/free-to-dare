/*
 * Class strings the Azores sections share, built only from tokens the rest of
 * the site already uses (globals.css): the same max width and gutters as the
 * Lisbon landing, the same mono "micro" label, the same display heading.
 * Nothing new is introduced here — these are the existing patterns, named once
 * instead of repeated in twelve files.
 */

/** Page width and gutters of every section, like the Lisbon landing */
export const CONTAINER =
  "mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-14 min-[88rem]:px-0";

/** Small mono label above a heading ("The week", "Accommodation", …) */
export const MICRO =
  "font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em]";

/** Work Sans Black heading, tight like the reference design */
export const DISPLAY = "font-display uppercase leading-[0.95] tracking-[-0.02em]";

/** Dark overlay over a full-bleed photo, so white text stays readable */
export const PHOTO_OVERLAY =
  "bg-[linear-gradient(180deg,rgb(17_26_41/0.55)_0%,rgb(17_26_41/0.25)_40%,rgb(17_26_41/0.8)_100%)]";

/** Bottom-up overlay of a photo card, so its caption stays readable */
export const CARD_OVERLAY =
  "bg-gradient-to-t from-ink/80 via-ink/10 to-transparent";

/** Primary button: white on photos, like the Lisbon hero */
export const BUTTON_LIGHT =
  "inline-flex items-center gap-3 rounded bg-white px-5 py-3.5 text-sm font-extrabold uppercase tracking-tight text-forest transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-white/30 lg:gap-4 lg:px-6 lg:py-4 lg:text-base";

/** Primary button on paper, like the stay cards of the Lisbon landing */
export const BUTTON_DARK =
  "inline-flex items-center gap-3 rounded-full bg-forest px-5 py-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white transition hover:bg-ink";

/** Glass fact pill over a photo, same values as the Lisbon hero */
export const PILL =
  "flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]";
export const PILL_TEXT =
  "text-sm font-light leading-none tracking-wide text-white/85";

/** Outlined pill on paper, for the stay amenities */
export const PILL_OUTLINE =
  "rounded-full border border-forest/30 px-4 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-forest";

/** Yellow deposit badge, as on the Lisbon stay cards and itinerary */
export const BADGE_SUN =
  "bg-sun px-2.5 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-forest";
