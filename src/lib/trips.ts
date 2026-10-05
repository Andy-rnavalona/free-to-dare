/*
 * The trips the Trips menu offers, and the two ways it groups them.
 *
 * Only the retreats that have a landing page carry an `href`; the others are
 * announced but not linked, so the menu never leads to a page that does not
 * exist. Giving one a page is a matter of replacing its `soon` with the `href`
 * of that page.
 */

import { LISBON_RETREAT } from "@/lib/routes";

export type Trip = {
  /** Where the retreat takes place */
  destination: string;
  /** The country that destination is in, which Destinations groups by */
  country: string;
  /** What is practised there, which Disciplines groups by */
  discipline: string;
  /** The retreat without its destination: "Aerial Retreat" */
  name: string;
  image: string;
  /** Alt text of the image */
  alt: string;
} & ({ href: string; soon?: never } | { href?: never; soon: true });

/*
 * The order here is the order the menu shows: destinations and disciplines
 * both keep the order in which they first appear below, and each takes its
 * image from the first of its trips.
 */
export const TRIPS: Trip[] = [
  {
    destination: "Madeira",
    country: "Portugal",
    discipline: "Pole Dance",
    name: "Pole Dance Retreat",
    soon: true,
    image: "/images/trips/madeira-pole-dance.jpg",
    alt: "Pole dancer on a black sand beach below the cliffs",
  },
  {
    destination: "Lisbon",
    country: "Portugal",
    discipline: "Aerial",
    name: "Aerial Retreat",
    href: LISBON_RETREAT,
    image: "/images/trips/lisbon-aerial.jpg",
    alt: "Yellow tram climbing a Lisbon street",
  },
  {
    destination: "Valencia",
    country: "Spain",
    discipline: "Aerial",
    name: "Aerial Retreat",
    soon: true,
    image: "/images/trips/valencia-aerial.jpg",
    alt: "Rooftops of central Valencia",
  },
  {
    destination: "Madeira",
    country: "Portugal",
    discipline: "Fitness & Workout",
    name: "Workout Retreat",
    soon: true,
    image: "/images/trips/madeira-workout.jpg",
    alt: "Riders on quad bikes along a hydrangea-lined track",
  },
];

/** How Destinations names a trip: "Aerial Retreat Lisbon" */
export const tripInDestination = (trip: Trip) =>
  `${trip.name} ${trip.destination}`;

/** How Disciplines names a trip: "Lisbon — Aerial Retreat" */
export const tripInDiscipline = (trip: Trip) =>
  `${trip.destination} — ${trip.name}`;

/* Groups the trips by `key`, keeping the order of TRIPS and letting the first
   trip of each group stand for it — its image is the one the group shows. */
function groupBy(key: (trip: Trip) => string) {
  const groups = new Map<string, { label: string; trips: Trip[] }>();
  for (const trip of TRIPS) {
    const label = key(trip);
    const group = groups.get(label) ?? { label, trips: [] };
    group.trips.push(trip);
    groups.set(label, group);
  }
  return [...groups.values()];
}

/** The destinations, under the country they belong to */
export const COUNTRIES = groupBy((trip) => trip.country).map((country) => ({
  country: country.label,
  destinations: groupBy((trip) => trip.destination)
    .filter((destination) => destination.trips[0].country === country.label)
    .map((destination) => ({
      destination: destination.label,
      image: destination.trips[0].image,
      alt: destination.trips[0].alt,
      trips: destination.trips,
    })),
}));

/** The disciplines, each with the trips that practise it */
export const DISCIPLINES = groupBy((trip) => trip.discipline).map(
  (discipline) => ({
    discipline: discipline.label,
    image: discipline.trips[0].image,
    alt: discipline.trips[0].alt,
    trips: discipline.trips,
  }),
);

export const TRIP_TABS = [
  { id: "all", label: "All trips" },
  { id: "destinations", label: "Destinations" },
  { id: "disciplines", label: "Disciplines" },
] as const;

export type TripTab = (typeof TRIP_TABS)[number]["id"];
