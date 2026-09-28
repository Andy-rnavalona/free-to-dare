import Image from "next/image";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

const HOSTEL_INSTAGRAM = "https://www.instagram.com/livingloungehostel/";
const RESERVE_URL = "#join";

const options = [
  {
    kicker: "Shared stay",
    title: "Shared room — 2 people",
    price: "€2,050",
    description: "Share a twin room with one other participant.",
  },
  {
    kicker: "Private stay",
    title: "Private room",
    price: "€2,150",
    description: "Your own room for more privacy and personal space.",
  },
  {
    kicker: "Flexible stay",
    title: "Without accommodation",
    price: "€1,750",
    description:
      "Join the full retreat experience while organising your own stay.",
  },
];

const photos = {
  main: {
    src: "/images/hostel/01.webp",
    alt: "Living room with a travel wall and a red lounge",
  },
  side: [
    {
      src: "/images/hostel/02.webp",
      alt: "Calm single room with teal accents",
    },
    { src: "/images/hostel/03.webp", alt: "Bunk room with warm light" },
  ],
  strip: [
    {
      src: "/images/hostel/04.webp",
      alt: "Warm wooden hallway with a welcome chalkboard",
    },
    {
      src: "/images/hostel/05.webp",
      alt: "Reading corner with plants and a vintage cabinet",
    },
    { src: "/images/hostel/06.webp", alt: "Twin room with a red curtain" },
  ],
};

const reassurances = [
  "€500 secures your place",
  "Only the deposit is paid today",
  "Pay the balance in instalments",
];

const pad = (n: number) => String(n).padStart(2, "0");

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
  return (
    <section
      id="stays"
      aria-labelledby="stays-title"
      data-reveal-group
      className="bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-14 min-[88rem]:px-0">
        {/* Heading */}
        <div className="relative">
          <p
            data-reveal
            className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-forest"
          >
            <span aria-hidden="true" className="h-px w-10 bg-sand" />
            Your home in Lisbon
          </p>
          {/* inline-block so the note can sit right after "Choose your way" */}
          <div data-reveal className="relative mt-5 inline-block">
            <h2
              id="stays-title"
              className="max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4.25rem)] uppercase leading-[0.95] tracking-[-0.02em] text-forest"
            >
              Choose your way <br className="hidden sm:inline" />
              to stay
            </h2>
            <p
              aria-hidden="true"
              className="absolute left-full top-1 ml-6 hidden -rotate-6 whitespace-nowrap font-script text-xl text-forest sm:block"
            >
              your Lisbon home →
            </p>
          </div>
          <p
            data-reveal
            className="mt-6 max-w-xl text-sm leading-relaxed text-muted"
          >
            Stay with the group or organise your own accommodation — the retreat
            experience stays the same.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-12">
          {/* Stay options */}
          <ul className="flex flex-col gap-4">
            {options.map((option, i) => (
              <li
                key={option.title}
                data-reveal
                className="rounded-2xl shadow-sm bg-white p-6"
              >
                <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">
                  <span>{option.kicker}</span>
                  <span>{pad(i + 1)}</span>
                </div>
                {/* Title and price share a line when there's room */}
                <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="font-display text-2xl uppercase leading-tight tracking-[-0.01em] text-forest">
                    {option.title}
                  </h3>
                  <p className="text-forest">
                    <span className="font-display text-2xl">
                      {option.price}
                    </span>
                    <span className="text-sm text-muted"> / person</span>
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted">
                  {option.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                  <span className="bg-sun px-2.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-forest">
                    €500 deposit to reserve
                  </span>
                  <a
                    href={RESERVE_URL}
                    className="inline-flex items-center gap-3 rounded-full bg-forest px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white transition hover:bg-ink"
                  >
                    Reserve your spot
                    <ArrowRightIcon className="size-3.5" />
                  </a>
                </div>
              </li>
            ))}
          </ul>

          {/* Hostel photos */}
          <div data-reveal className="flex flex-col">
            <div className="grid aspect-[6/5] grid-cols-[2.2fr_1fr] grid-rows-2 gap-2">
              <Photo
                {...photos.main}
                sizes="(min-width: 1024px) 26rem, 65vw"
                className="row-span-2"
              />
              {photos.side.map((photo) => (
                <Photo
                  key={photo.src}
                  {...photo}
                  sizes="(min-width: 1024px) 12rem, 30vw"
                />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {photos.strip.map((photo) => (
                <Photo
                  key={photo.src}
                  {...photo}
                  sizes="(min-width: 1024px) 12rem, 33vw"
                  className="aspect-[4/3]"
                />
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p
                aria-hidden="true"
                className="-rotate-3 font-script text-xl text-forest"
              >
                your Lisbon home →
              </p>
              <a
                href={HOSTEL_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-forest transition hover:text-forest"
              >
                Their Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Payment reassurance */}
        <ul
          data-reveal
          className="mt-12 flex flex-col gap-4 rounded-2xl shadown-sm bg-[#f1ebdc] px-6 py-6 sm:flex-row sm:flex-wrap sm:justify-around lg:mt-10"
        >
          {reassurances.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-forest"
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
