import { Calendar, CreditCard, MapPin, Sparkles, Wallet } from "lucide-react";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import { formatEuro } from "@/booking/booking-config";
import { withBasePath } from "@/lib/base-path";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";
import {
  PRICING_ANCHOR,
  VALENCIA,
  whatsappLink,
} from "@/components/valencia/retreat";
import { TeachersVideo } from "@/components/valencia/teachers-video";

const facts = [
  { label: VALENCIA.dates, Icon: Calendar },
  { label: VALENCIA.place, Icon: MapPin },
  {
    label: `${formatEuro(VALENCIA.deposit)} deposit to reserve your spot`,
    Icon: CreditCard,
  },
  { label: "Flexible payment plans available", Icon: Wallet },
  { label: "All levels welcome", Icon: Sparkles },
];

/**
 * Unlike the photo heroes of Azores and Lisbon, Valencia opens on cream, as
 * in its mockup: the title and the facts on the left, the teachers' vertical
 * video on the right. The header above it is the cream one (site-header.tsx).
 */
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      data-reveal-group
      className="bg-background pt-28 lg:pt-36"
    >
      <div
        className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16`}
      >
        <div className="min-w-0">
          <h1
            id="hero-title"
            data-reveal
            className={`${DISPLAY} text-[13vw] leading-[0.86] sm:text-7xl`}
          >
            <span className="block">Valencia</span>
            <span className="block text-forest">Aerial Escape</span>
          </h1>

          <p
            data-reveal
            className="mt-8 max-w-3xl border-l-2 border-forest pl-6 font-serif text-xl italic leading-tight tracking-tight text-ink/85 sm:pl-8 md:text-2xl lg:text-[1.5rem]"
          >
            Discover Valencia through aerial arts, Spanish culture and shared
            experiences with people who love aerial as much as you do.
          </p>

          <ul data-reveal className="mt-10 flex max-w-5xl flex-wrap items-center gap-3">
            {facts.map(({ label, Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-full border border-ink/10 bg-ink/[0.03] px-4 py-2.5 transition-colors duration-300 hover:border-ink/20 hover:bg-ink/[0.06]"
              >
                <Icon aria-hidden="true" className="size-4 shrink-0 text-forest" />
                <span className="text-sm font-light leading-none tracking-wide text-ink/85">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10 flex flex-wrap items-center gap-8">
            <a
              href={PRICING_ANCHOR}
              className="inline-flex items-center gap-3 rounded bg-forest px-5 py-3.5 text-sm font-extrabold uppercase tracking-tight text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-forest/30 lg:gap-4 lg:px-6 lg:py-4 lg:text-base"
            >
              Reserve your spot
              <ArrowRightIcon className="size-4" />
            </a>
            <a
              href={whatsappLink(
                `Hi! I have a question about the ${VALENCIA.name}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              // As tall as "Reserve your spot" beside it
              className="inline-flex h-12 max-w-full items-center gap-2.5 rounded border border-ink bg-background px-3 transition hover:bg-ink/[0.03] lg:h-14 lg:px-4"
            >
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-full border border-ink/15 lg:size-9"
              >
                <WhatsAppIcon className="size-4.5 text-[#25d366] lg:size-5" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className={`${MICRO} text-[0.65rem] leading-tight tracking-normal`}>
                  Chat with the organiser
                </span>
                <span className="mt-0.5 font-serif text-xs italic leading-tight text-ink/70 lg:text-sm">
                  Questions? Talk directly with your host.
                </span>
              </span>
            </a>
          </div>
        </div>

        <div
          data-reveal
          className="mx-auto w-full max-w-[18.75rem] pt-10 sm:max-w-[21.25rem] lg:max-w-[23rem]"
        >
          <div className="relative">
            {/* Handwritten note pointing down at the video */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 right-3 flex items-start gap-1 text-forest"
            >
              <svg viewBox="0 0 46 48" fill="none" className="mt-1 h-11 w-10 shrink-0">
                <path
                  d="M40 3 C15 1, 5 15, 13 39 M5 33 L13 40 L19 31"
                  stroke="currentColor"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="-rotate-3 font-script text-xl leading-none sm:text-2xl">
                say hi to your teachers!
              </p>
            </div>
            <TeachersVideo
              poster={withBasePath("/videos/valencia/teachers-poster.webp")}
              sources={[
                {
                  src: withBasePath("/videos/valencia/teachers.av1.mp4"),
                  type: 'video/mp4; codecs="av01.0.08M.08"',
                },
                {
                  src: withBasePath("/videos/valencia/teachers.mp4"),
                  type: "video/mp4",
                },
              ]}
              label="The Valencia teachers training and talking together"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
