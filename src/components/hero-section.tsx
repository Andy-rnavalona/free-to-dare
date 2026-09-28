import type { ReactNode } from "react";
import { BackgroundVideo } from "@/components/background-video";
import { ArrowRightIcon } from "@/components/icons";

function PillIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4 shrink-0 text-sun"
    >
      {children}
    </svg>
  );
}

function ItalianFlag() {
  return (
    <svg viewBox="0 0 3 2" aria-hidden="true" className="size-full">
      <rect width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#ce2b37" />
    </svg>
  );
}

function UkFlag() {
  return (
    <svg viewBox="0 0 60 30" aria-hidden="true" className="size-full">
      <clipPath id="uk-flag-clip">
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0 0l60 30m0-30L0 30"
        clipPath="url(#uk-flag-clip)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

const pill =
  "flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]";
const pillText = "text-sm font-light leading-none tracking-wide text-white/85";

const facts = [
  {
    label: "5 – 11 June 2027",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
  },
  {
    label: "€500 deposit to reserve your spot",
    icon: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </>
    ),
  },
  {
    label: "Flexible payment plans available",
    icon: (
      <>
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
      </>
    ),
  },
  {
    label: "All levels welcome • beginner friendly",
    icon: (
      <>
        <path d="M9.94 14.06 4 20M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
        <path d="M20 3v4M22 5h-4" />
      </>
    ),
  },
];

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      data-reveal-group
      className="relative min-h-svh w-full overflow-hidden bg-ink text-white"
    >
      <BackgroundVideo
        poster="/videos/hero-section-poster.jpg"
        sources={[
          {
            src: "/videos/hero-section.av1.mp4",
            type: 'video/mp4; codecs="av01.0.08M.08"',
          },
          { src: "/videos/hero-section.mp4", type: "video/mp4" },
        ]}
        className="absolute inset-0 size-full object-cover brightness-50 grayscale-50"
      />

      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-80 md:flex">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em]">
          Scroll to explore
        </p>
        <span aria-hidden="true" className="h-6 w-px bg-white" />
      </div>

      <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col justify-center px-5 pb-16 pt-28 sm:px-10 md:pb-24 lg:px-14 min-[88rem]:px-0">
        <p
          data-reveal
          className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-white/70"
        >
          Metamorphosis Games presents
        </p>

        <h1
          id="hero-title"
          data-reveal
          className="mt-6 font-display text-5xl uppercase leading-[0.85] md:text-7xl lg:text-8xl"
        >
          <span className="block">Lisbon aerial</span>
          <span className="block text-sun">Urban escape</span>
        </h1>

        <div data-reveal className="mt-8 flex items-center gap-6">
          <span
            aria-hidden="true"
            className="hidden h-24 w-px shrink-0 bg-sun sm:block"
          />
          <p className="max-w-2xl font-serif text-xl italic leading-tight tracking-tight text-white/85 md:text-2xl lg:text-[1.75rem]">
       Learn to build and dance your own aerial hoop & silks choreography, combining daily training with a real holiday in Lisbon. Explore the city, live new experiences, and share it all with people who love aerial as much as you do.
          </p>
        </div>

        <ul
          data-reveal
          className="mt-8 flex max-w-4xl flex-wrap items-center gap-3"
        >
          {facts.map(({ label, icon }) => (
            <li key={label} className={pill}>
              <PillIcon>{icon}</PillIcon>
              <span className={pillText}>{label}</span>
            </li>
          ))}
          <li className={`group ${pill}`}>
            <span className="flex shrink-0 items-center">
              <span className="relative z-10 h-4 w-6 -rotate-6 overflow-hidden rounded-[3px] shadow-md ring-1 ring-white/40 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-rotate-12">
                <ItalianFlag />
              </span>
              <span className="-ml-3 h-4 w-6 rotate-6 overflow-hidden rounded-[3px] shadow-md ring-1 ring-white/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-12">
                <UkFlag />
              </span>
            </span>
            <span className={pillText}>
              Italian &amp; English speaking hosts
            </span>
          </li>
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
            <a
              href="#join"
              className="flex items-center gap-3 rounded bg-white px-5 py-3.5 text-sm font-extrabold uppercase tracking-tight text-forest transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-white/30 lg:ml-6 lg:gap-4 lg:px-6 lg:py-4 lg:text-base"
            >
              Reserve your spot
              <ArrowRightIcon className="size-4" />
            </a>
          </div>
          <a
            href="#stays"
            className="inline-flex items-center border-b border-white/40 pb-1 text-xs font-medium uppercase tracking-[0.25em] text-white/90 transition-colors hover:text-sun"
          >
            See what&apos;s included
          </a>
        </div>
      </div>
    </section>
  );
}
