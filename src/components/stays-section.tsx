import Image from "next/image";
import type { ReactNode, SVGProps } from "react";
import { StayGallery } from "@/components/stay-gallery";

// Placeholder offer: prices, durations and stays to be confirmed
const TICKET_PRICE = "€1,350";

function LineIcon({
  children,
  ...props
}: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

const icons = {
  hoop: (
    <>
      <path d="M12 2v4" />
      <circle cx="12" cy="13" r="7" />
      <path d="M9 12.5c1 1.5 2 2 3 2s2-.5 3-2" />
    </>
  ),
  camera: (
    <>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  boat: (
    <>
      <path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" />
      <path d="M21 14 10 2 3 14h18Z" />
      <path d="M10 2v16" />
    </>
  ),
  wine: (
    <>
      <path d="M8 22h8M7 10h10M12 15v7" />
      <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
    </>
  ),
  walk: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  dinner: (
    <>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
  house: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5M10 21v-6h4v6" />
    </>
  ),
  group: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  bed: (
    <>
      <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
};

const included = [
  { icon: icons.hoop, label: "Aerial hoop & silks classes" },
  { icon: icons.camera, label: "Aerial photoshoot" },
  { icon: icons.boat, label: "Sunset boat cruise" },
  { icon: icons.wine, label: "Portuguese wine" },
  { icon: icons.walk, label: "Guided city walks" },
  { icon: icons.dinner, label: "Rooftop dinner" },
  { icon: icons.music, label: "Social evenings" },
];

const stays = [
  {
    tagline: "Wake up where you train",
    title: "The Villa",
    description: [
      "Garden studio close to the training space.",
      "Home base for every aerial session.",
    ],
    icon: icons.house,
    soldOut: true,
    photos: [
      {
        src: "/images/stay-villa.jpg",
        alt: "Traditional house with a red tiled roof in a green garden",
        position: "object-[70%_50%]",
      },
      {
        src: "/images/garden-patio.jpg",
        alt: "Leafy garden patio with tables",
      },
    ],
  },
  {
    tagline: "Wake up above the rooftops",
    title: "The City House",
    description: [
      "A charming house with a terrace over the city.",
      "For up to 4 friends or family.",
    ],
    price: "€1,950",
    unit: "house",
    icon: icons.group,
    photos: [
      {
        src: "/images/stay-house-terrace.jpg",
        alt: "Balcony with blue tiles opening onto Lisbon at sunset",
        position: "object-[50%_60%]",
      },
      {
        src: "/images/stay-house-view.jpg",
        alt: "View over the rooftops of Alfama and the Tagus river",
      },
    ],
  },
  {
    tagline: "Wake up by the pool",
    title: "The Hotel",
    description: [
      "4-star hotel with a pool, 15 min from the studio.",
      "Free pick-up and drop-off for every class.",
    ],
    price: "€1,150",
    unit: "room",
    icon: icons.bed,
    photos: [
      {
        src: "/images/stay-hotel-pool.jpg",
        alt: "Hotel swimming pool surrounded by palm trees and sun loungers",
      },
      {
        src: "/images/stay-hotel-rooftop.jpg",
        alt: "Rooftop pool overlooking the city at sunrise",
      },
    ],
  },
];

export function StaysSection() {
  return (
    <section
      id="stays"
      aria-labelledby="stays-title"
      data-reveal-group
      className="bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-10 lg:px-14 min-[88rem]:px-0 lg:py-32">
        <p
          data-reveal
          className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.06em] text-forest"
        >
          <span aria-hidden="true" className="h-0.5 w-9 bg-sun" />
          Your home base
        </p>
        <h2
          id="stays-title"
          data-reveal
          className="mt-4 font-display text-[clamp(2.75rem,6vw,6.5rem)] xl:text-[4.75rem] uppercase leading-[0.95] tracking-[-0.01em] text-forest"
        >
          Three ways to stay
        </h2>
        <p data-reveal className="mt-5 text-sm text-forest/80">
          All within a 15-minute drive — pick whichever calls to you most.
        </p>

        {/* Retreat ticket */}
        <article
          data-reveal
          className="mt-12 flex flex-col gap-6 rounded-xl border border-forest/10 bg-white p-5 shadow-lg lg:mt-16 lg:flex-row lg:items-center lg:gap-8"
        >
          <div className="relative mx-auto aspect-[9/13] w-full max-w-60 shrink-0 overflow-hidden rounded-lg lg:mx-0 lg:h-72 lg:w-auto">
            <Image
              src="/images/experiences/golden-hour/03.webp"
              alt="The group smiling together on the deck of a sailboat"
              fill
              sizes="15rem"
              className="object-cover object-[50%_60%]"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <p className="font-script text-2xl text-forest">
              The experience that brings us all together
            </p>
            <h3 className="mt-1 font-display text-[clamp(1.75rem,2.6vw,2.6rem)] xl:text-[2.1rem] uppercase leading-tight text-forest">
              The retreat ticket
            </h3>
            <p className="mt-2 flex items-baseline gap-2 text-forest">
              <span className="text-5xl font-medium tracking-tight">
                {TICKET_PRICE}
              </span>
              <span className="text-muted">/ person</span>
            </p>
            <p className="mt-3 text-forest/80">
              7 days of aerial, adventure &amp; Lisbon.
            </p>

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.08em] text-muted">
              Your retreat ticket includes
            </p>
            <ul className="mt-4 grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-7">
              {included.map(({ icon, label }) => (
                <li
                  key={label}
                  className="flex flex-col items-center gap-1.5 text-center text-xs leading-tight text-forest"
                >
                  <LineIcon className="size-6">{icon}</LineIcon>
                  {label}
                </li>
              ))}
            </ul>

            <p className="mt-8 inline-flex items-center gap-2.5 self-start rounded-2xl bg-forest/5 px-4 py-3 text-sm font-semibold text-forest sm:rounded-full">
              <LineIcon className="size-5 shrink-0">{icons.info}</LineIcon>
              Accommodation is booked separately — choose your stay below.
            </p>
          </div>
        </article>

        {/* Stays */}
        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stays.map((stay) => (
            <li
              key={stay.title}
              data-reveal
              className="md:last:odd:col-span-2 md:last:odd:mx-auto md:last:odd:w-[calc(50%-0.75rem)] lg:last:odd:col-span-1 lg:last:odd:mx-0 lg:last:odd:w-auto"
            >
              <article
                className={`flex h-full flex-col overflow-hidden rounded-xl border border-forest/10 bg-white shadow-lg transition-all duration-300 ${
                  stay.soldOut ? "" : "hover:-translate-y-1 hover:shadow-xl"
                }`}
              >
                <StayGallery photos={stay.photos} soldOut={stay.soldOut} />

                <div className="flex flex-1 flex-col p-5">
                  <p className="font-script text-2xl text-forest">
                    {stay.tagline}
                  </p>
                  <h3 className="mt-1 font-display text-2xl uppercase text-forest">
                    {stay.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-forest/80">
                    {stay.description.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>

                  <div className="mt-5 flex items-center gap-4 rounded-xl bg-forest/5 p-4 lg:mt-auto">
                    <LineIcon className="size-8 shrink-0 text-forest/70">
                      {stay.icon}
                    </LineIcon>
                    <div className="text-forest">
                      {stay.soldOut ? (
                        <p className="font-bold">Accommodation: sold out</p>
                      ) : (
                        <p>
                          <span className="font-bold">{stay.price}</span>{" "}
                          <span className="text-muted">/ {stay.unit}</span>
                        </p>
                      )}
                      <p className="text-sm font-semibold">
                        + Retreat ticket {TICKET_PRICE} / person
                      </p>
                      <p className="text-xs text-muted">(booked separately)</p>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
