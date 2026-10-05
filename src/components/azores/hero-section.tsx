import {
  Calendar,
  Clock,
  CreditCard,
  MapPin,
  Users,
} from "lucide-react";
import { BackgroundVideo } from "@/components/background-video";
import { ArrowRightIcon } from "@/components/icons";
import { withBasePath } from "@/lib/base-path";
import { formatEuro } from "@/booking/booking-config";
import { AZORES, PRICING_ANCHOR } from "@/components/azores/retreat";
import {
  BUTTON_LIGHT,
  CONTAINER,
  DISPLAY,
  MICRO,
  PHOTO_OVERLAY,
  PILL,
  PILL_TEXT,
} from "@/components/azores/ui";

const facts = [
  { label: AZORES.dates, Icon: Calendar },
  { label: AZORES.place, Icon: MapPin },
  { label: AZORES.classes, Icon: Clock },
  { label: `${AZORES.groupMax} SPOTS`, Icon: Users },
  { label: `${formatEuro(AZORES.deposit)} deposit to reserve`, Icon: CreditCard },
];

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      data-reveal-group
      className="relative min-h-svh w-full overflow-hidden bg-ink text-white"
    >
      {/* Aerial loop over the crater lakes; the poster stays up with reduced
          motion. Darkened like the Lisbon hero so the title keeps its contrast
          over the bright green, then the design's gradient on top. */}
      <BackgroundVideo
        poster={withBasePath("/videos/azores/hero-poster.jpg")}
        sources={[
          {
            src: withBasePath("/videos/azores/hero.av1.mp4"),
            type: 'video/mp4; codecs="av01.0.08M.08"',
          },
          { src: withBasePath("/videos/azores/hero.mp4"), type: "video/mp4" },
        ]}
        className="absolute inset-0 size-full object-cover brightness-50"
      />
      <div aria-hidden="true" className={`absolute inset-0 ${PHOTO_OVERLAY}`} />

      <div
        className={`${CONTAINER} relative z-10 flex min-h-svh flex-col justify-end pb-16 pt-32 md:pb-24`}
      >
        <h1
          id="hero-title"
          data-reveal
          className={`${DISPLAY} text-[13vw] leading-[0.86] sm:text-7xl lg:text-7xl xl:text-7xl`}
        >
          <span className="block">Azores</span>
          <span className="block">
            Into the <span className="text-sun">wild</span>
          </span>
        </h1>

        <p data-reveal className={`${MICRO} mt-6 text-sm tracking-[0.35em]`}>
          {AZORES.tagline}
        </p>

        <p
          data-reveal
          className="mt-8 max-w-3xl border-l-2 border-sun pl-6 font-serif text-xl italic leading-tight tracking-tight text-white/85 sm:pl-8 md:text-2xl lg:text-[1.5rem]"
        >
          Train pole. Explore one of the wildest islands in the Atlantic. Spend a
          week between volcanic landscapes, thermal waters, ocean adventures and
          a community brought together by the same passion.
        </p>

        <ul
          data-reveal
          className="mt-10 flex max-w-5xl flex-wrap items-center gap-3"
        >
          {facts.map(({ label, Icon }) => (
            <li key={label} className={PILL}>
              <Icon aria-hidden="true" className="size-4 shrink-0 text-sun" />
              <span className={PILL_TEXT}>{label}</span>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-10 flex flex-wrap items-center gap-8">
          <div className="relative">
            <p
              aria-hidden="true"
              className="absolute top-1/2 hidden -translate-x-full -translate-y-1/2 font-script text-2xl text-sun lg:block"
            >
              {/* Inner span floats so the animation doesn't reset the positioning */}
              <span className="flex animate-floating items-center">
                Step out <span className="ml-2 -translate-y-1">→</span>
              </span>
            </p>
            <a href={PRICING_ANCHOR} className={`${BUTTON_LIGHT} lg:ml-6`}>
              Reserve your spot
              <ArrowRightIcon className="size-4" />
            </a>
          </div>
          <a
            href="#included"
            className="inline-flex items-center border-b border-white/40 pb-1 text-xs font-medium uppercase tracking-[0.25em] text-white/90 transition-colors hover:text-sun"
          >
            See what&apos;s included
          </a>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-80 md:flex">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em]">
          Scroll to explore
        </p>
        <span aria-hidden="true" className="h-6 w-px bg-white" />
      </div>
    </section>
  );
}
