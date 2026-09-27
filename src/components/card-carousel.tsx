"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

/**
 * Horizontal scroll-snap track with previous/next buttons.
 * Children must be `<li>` items; each button press moves by one item.
 */
export function CardCarousel({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, [update]);

  const go = (direction: 1 | -1) => {
    const track = trackRef.current;
    const item = track?.firstElementChild as HTMLElement | null;
    if (!track || !item) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (item.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  const button =
    "grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink transition hover:border-forest hover:bg-forest hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-line disabled:hover:bg-white disabled:hover:text-ink";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={!canPrev}
          aria-label="Previous cards"
          className={button}
        >
          <ArrowLeftIcon className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={!canNext}
          aria-label="Next cards"
          className={button}
        >
          <ArrowRightIcon className="size-4" />
        </button>
      </div>

      <ul
        ref={trackRef}
        onScroll={update}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </div>
  );
}
