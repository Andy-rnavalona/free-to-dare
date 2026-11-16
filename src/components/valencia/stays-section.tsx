import fs from "node:fs";
import path from "node:path";
import { BedDouble, Landmark, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatEuro } from "@/booking/booking-config";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import {
  BUTTON_DARK,
  CONTAINER,
  DISPLAY,
  MICRO,
} from "@/components/azores/ui";
import { VALENCIA, type ValenciaStayId } from "@/components/valencia/retreat";
import { withBasePath } from "@/lib/base-path";
import { VALENCIA_BOOKING } from "@/lib/routes";

/* Same structure as the Lisbon stays section: the ways to stay on the left,
   the hotel on the right. Only two options here; each opens the booking page
   with its stay already chosen. */

const options: {
  stay: ValenciaStayId;
  kicker: string;
  title: string;
  from: boolean;
  price: number;
  description: string;
  ticket: string;
  includes: string[];
}[] = [
  {
    stay: "shared",
    kicker: "Retreat package",
    title: "Full retreat + shared accommodation",
    from: true,
    price: VALENCIA.priceShared,
    description: "Complete retreat experience with accommodation included.",
    ticket: `Retreat ticket + ${VALENCIA.nights} nights shared room`,
    includes: [
      `${VALENCIA.trainingHours} hours of aerial training`,
      "Activities",
      "Daily breakfast",
      "Welcome dinner",
    ],
  },
  {
    stay: "none",
    kicker: "Retreat ticket only",
    title: "Retreat without accommodation",
    from: false,
    price: VALENCIA.priceRetreatOnly,
    description:
      "Join the full retreat programme while organising your own stay.",
    ticket: "Full retreat ticket — accommodation not included",
    includes: [
      `${VALENCIA.trainingHours} hours of aerial training`,
      "Activities",
      "Welcome dinner",
    ],
  },
];

const HOTEL = {
  name: VALENCIA.hotel,
  stars: 4,
  description:
    "Stay in a beautifully restored 18th-century palace in the heart of Valencia’s historic old town.",
  address: ["Carrer del Marquès de Dos Aigües, 6,", "46002 València, Spain"],
  nearby:
    "Located beside the magnificent Palacio del Marqués de Dos Aguas, just a short stroll from Valencia Cathedral, the Central Market and Plaza de la Reina.",
  /** "Explore rooms & prices": shown once the hotel's page is known */
  url: null as string | null,
};

/* The hotel photos, in public/images/valencia/hotel: one large, two beside it,
   three in the strip below, as on the Lisbon section. */
const HOTEL_DIR = "/images/valencia/hotel";
const hotelPhotos = [
  {
    file: "01.webp",
    alt: "Breakfast by a window facing the carved façade of the National Ceramic Museum",
  },
  {
    file: "02.webp",
    alt: "View from a hotel balcony onto the Palace of the Marqués de Dos Aguas",
  },
  { file: "03.webp", alt: "The hotel's façade and its café terrace at dusk" },
  {
    file: "04.webp",
    alt: "Carrer del Marquès de Dos Aigües, the hotel's street, lined with café terraces",
  },
  { file: "05.webp", alt: "The breakfast buffet with Spanish cured meats and cheeses" },
  { file: "06.webp", alt: "The City of Arts and Sciences, Valencia" },
].map(({ file, alt }) => ({ src: withBasePath(`${HOTEL_DIR}/${file}`), alt, file }));

// Checked at build time: the gallery only shows once all six photos are in
const hasHotelPhotos = hotelPhotos.every(({ file }) =>
  fs.existsSync(path.join(process.cwd(), "public", HOTEL_DIR, file)),
);

const reassurances = [
  `${formatEuro(VALENCIA.deposit)} secures your place`,
  "Only the deposit is paid today",
  "Pay the balance in instalments",
];

const pad = (n: number) => String(n).padStart(2, "0");

/** The deposit badge, in a lighter saffron than the Azores one, with black text */
const DEPOSIT_BADGE =
  "bg-sun/50 px-2.5 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink";

function Photo({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-line ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export function StaysSection() {
  const [main, ...rest] = hotelPhotos;
  const side = rest.slice(0, 2);
  const strip = rest.slice(2);

  return (
    <section
      id="stays"
      aria-labelledby="stays-title"
      data-reveal-group
      className="scroll-mt-28 bg-background"
    >
      <div className={CONTAINER}>
        {/* Desktop: the section heading and the hotel's side by side, then the
            ways to stay and the hotel photos starting and ending together, the
            address under the photos. Mobile, in reading order: heading, ways
            to stay, then the hotel. */}
        <div className="grid lg:grid-cols-2 lg:gap-x-12">
          {/* Heading */}
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <p
              data-reveal
              className={`${MICRO} flex items-center gap-3 text-[0.65rem] text-ink`}
            >
              Valencia
              <span aria-hidden="true" className="h-px w-8 bg-ink" />
              Where you stay
            </p>
            <h2
              id="stays-title"
              data-reveal
              className={`${DISPLAY} mt-5 max-w-3xl text-[clamp(2.5rem,5.5vw,4.25rem)] text-forest`}
            >
              Choose your way <br className="hidden sm:inline lg:hidden" />
              to stay
            </h2>
            <p data-reveal className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
              Stay with the group in the old town or organise your own
              accommodation — the retreat experience stays the same.
            </p>
          </div>

          {/* Ways to stay */}
          <ul className="mt-12 flex flex-col gap-4 lg:col-start-1 lg:row-start-2 lg:mt-14">
            {options.map((option, i) => (
              <li
                key={option.title}
                data-reveal
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">
                  <span>{option.kicker}</span>
                  <span>{pad(i + 1)}</span>
                </div>

                {/* Title, and the price behind a rule as in the mockup */}
                <div className="mt-4 flex items-start justify-between gap-5">
                  <h3 className="font-display text-xl uppercase leading-tight tracking-[-0.01em] text-ink sm:text-2xl">
                    {option.title}
                  </h3>
                  <p className="shrink-0 border-l border-line pl-5 text-ink">
                    {option.from && (
                      <span className="block text-sm text-muted">From</span>
                    )}
                    <span className="block font-display text-2xl leading-none sm:text-3xl">
                      {formatEuro(option.price)}
                    </span>
                    <span className="mt-1 block text-sm text-muted">/ person</span>
                  </p>
                </div>
                <p className="mt-3 text-sm text-muted">{option.description}</p>

                {/* What the price buys */}
                <p className="mt-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                  <span aria-hidden="true" className="h-px w-5 shrink-0 bg-sun" />
                  {option.ticket}
                </p>
                <p className="mt-1.5 text-sm text-muted">
                  {option.includes.join(" · ")}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                  <span className={DEPOSIT_BADGE}>
                    {formatEuro(VALENCIA.deposit)} deposit to reserve
                  </span>
                  {/* Opens the booking page with this stay already chosen */}
                  <Link
                    href={`${VALENCIA_BOOKING}?stay=${option.stay}`}
                    className={BUTTON_DARK}
                  >
                    Reserve your spot
                    <ArrowRightIcon className="size-3.5" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {/* The hotel, next to the section heading on desktop */}
          <div
            data-reveal
            className="mt-10 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:self-end"
          >
            <p className={`${MICRO} flex items-center gap-3 text-[0.65rem] text-ink`}>
              <BedDouble aria-hidden="true" className="size-5" />
              Your home in Valencia
            </p>
            <h3 className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {HOTEL.name}
              <span
                role="img"
                aria-label={`${HOTEL.stars}-star hotel`}
                className="flex gap-0.5 text-sun"
              >
                {Array.from({ length: HOTEL.stars }, (_, i) => (
                  <Star key={i} aria-hidden="true" className="size-4 fill-current" />
                ))}
              </span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {HOTEL.description}
            </p>
          </div>

          {hasHotelPhotos && (
            // Desktop: stretched to the height of the ways to stay; the strip
            // keeps its ratio and the photos above take the rest
            <div
              data-reveal
              className="mt-6 flex flex-col lg:col-start-2 lg:row-start-2 lg:mt-14"
            >
              <div className="grid aspect-6/5 grid-cols-[2.2fr_1fr] grid-rows-2 gap-2 lg:aspect-auto lg:min-h-80 lg:flex-1">
                <Photo
                  {...main}
                  sizes="(min-width: 1024px) 26rem, 65vw"
                  className="row-span-2"
                />
                {side.map((photo) => (
                  <Photo
                    key={photo.src}
                    {...photo}
                    sizes="(min-width: 1024px) 12rem, 30vw"
                  />
                ))}
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {strip.map((photo) => (
                  <Photo
                    key={photo.src}
                    {...photo}
                    sizes="(min-width: 1024px) 12rem, 33vw"
                    className="aspect-4/3"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Address, under the photos */}
          <div data-reveal className="mt-6 lg:col-start-2 lg:row-start-3">
            <div className="grid gap-5 text-sm leading-relaxed text-muted sm:grid-cols-2 sm:gap-0">
              <p className="flex gap-3 sm:pr-5">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-forest" />
                <span>
                  {HOTEL.address[0]}
                  <br />
                  {HOTEL.address[1]}
                </span>
              </p>
              <p className="flex gap-3 sm:border-l sm:border-line sm:pl-5">
                <Landmark aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-forest" />
                {HOTEL.nearby}
              </p>
            </div>

            {HOTEL.url && (
              <a
                href={HOTEL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-3 rounded-full border border-forest px-6 py-3.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.25em] text-forest transition hover:bg-forest hover:text-white"
              >
                Explore rooms &amp; prices
                <ArrowRightIcon className="size-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Payment reassurance */}
        <ul
          data-reveal
          className="mt-12 flex flex-col gap-4 rounded-2xl bg-card px-6 py-6 sm:flex-row sm:flex-wrap sm:justify-around lg:mt-10"
        >
          {reassurances.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink"
            >
              <CheckIcon className="size-4 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
