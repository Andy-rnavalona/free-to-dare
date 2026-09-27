import Image from "next/image";
import { PlayIcon } from "@/components/icons";
import { InstagramBadge } from "@/components/instagram-badge";

// The owner has disabled embedding for this reel, so it can't play on the
// page: the card links out to it on Instagram instead.
const REEL = {
  url: "https://www.instagram.com/reel/DHLgK2Ui_Vo/?stkn=dDg3MTlnYjN1eHEw",
  handle: "@lisboawithoutfilters",
  title: "See Lisbon from a different perspective",
  subtitle: "A city made for curious minds",
};

export function ReelCard() {
  return (
    <figure data-reveal className="flex flex-col">
      <a
        href={REEL.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch the reel “${REEL.title}” by ${REEL.handle} on Instagram (opens in a new tab)`}
        className="group group/ig relative block aspect-[4/5] overflow-hidden rounded-3xl bg-ink outline-offset-4 focus-visible:outline-2 focus-visible:outline-forest sm:aspect-[2/3]"
      >
        <Image
          src="/images/lisbon-sunset.jpg"
          alt=""
          fill
          preload
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="object-cover motion-safe:animate-slow-zoom"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/20" />

        <div className="absolute inset-x-0 top-0 flex items-center p-6 sm:p-8">
          <span className="whitespace-nowrap rounded-full bg-paper/85 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
            Instagram reel
          </span>
        </div>
        {/* Anchored right so the handle unfolds leftwards over the pill */}
        <span className="absolute right-6 top-6 sm:right-8 sm:top-8">
          <InstagramBadge handle={REEL.handle} />
        </span>

        {/* Play button and text share one column, so a longer title pushes
            the button up instead of sliding underneath it */}
        <div className="absolute inset-0 flex flex-col px-5 pb-5 pt-24 text-white sm:px-10 sm:pb-10 sm:pt-28 2xl:px-8 2xl:pb-8">
          <div className="grid min-h-24 flex-1 place-items-center">
            <span
              aria-hidden="true"
              className="grid size-20 place-items-center rounded-full bg-white/25 text-white ring-1 ring-white/50 backdrop-blur-md transition duration-500 ease-out group-hover:scale-110 group-hover:bg-white group-hover:text-ink"
            >
              <PlayIcon className="ml-1 size-7" />
            </span>
          </div>

          <div>
            <p className="max-w-[30rem] text-[clamp(2.25rem,3.1vw,4.5rem)] font-medium leading-[0.98] tracking-tight xl:text-[2.5rem]">
              {REEL.title}
            </p>
            <div className="mt-6 flex items-end justify-between gap-4">
              <p className="text-lg font-semibold">{REEL.subtitle}</p>
              <p className="shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-white/85 transition-colors group-hover:text-sun">
                Watch ↗
              </p>
            </div>
          </div>
        </div>
      </a>

      <figcaption className="mt-5 flex flex-wrap justify-between gap-x-4 gap-y-1 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
        <span className="whitespace-nowrap">Reel · {REEL.handle}</span>
      </figcaption>
    </figure>
  );
}
