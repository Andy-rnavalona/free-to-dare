"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";
import { InstagramBadge, PAMELA_INSTAGRAM } from "@/components/instagram-badge";
import { withBasePath } from "@/lib/base-path";

// The grid gets one column per reel (up to 4), so adding a video is enough
const reels = [
  {
    src: withBasePath("/videos/aerial-silks-beach.mp4"),
    poster: withBasePath("/videos/aerial-silks-beach.jpg"),
    label: "Pamela climbing white aerial silks by the sea",
  },
  {
    src: withBasePath("/videos/aerial-hoop-stage.mp4"),
    poster: withBasePath("/videos/aerial-hoop-stage.jpg"),
    label: "Pamela spinning on an aerial hoop on an open-air stage",
  },
  {
    src: withBasePath("/videos/aerial-hoop-sunset.mp4"),
    poster: withBasePath("/videos/aerial-hoop-sunset.jpg"),
    label: "Pamela holding a split on an aerial hoop at sunset",
  },
];

// Alternating tilts, like prints scattered on a table
const tilts = ["sm:-rotate-2", "sm:rotate-2", "sm:-rotate-1", "sm:rotate-2"];

type Reel = (typeof reels)[number];

function ReelCard({ reel, tilt }: { reel: Reel; tilt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);

  // Autoplay (muted) only while on screen; never override a manual pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!pausedByUser.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      video.play().catch(() => {});
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  };

  return (
    <div
      className={`relative aspect-[5/8] w-full overflow-hidden rounded-xl bg-ink shadow-[0_24px_48px_-24px_rgb(22_35_26/0.5)] transition-[rotate,scale] duration-500 ease-out sm:scale-95 can-hover:hover:rotate-0 can-hover:hover:scale-100 ${tilt}`}
    >
      <video
        ref={videoRef}
        src={reel.src}
        poster={reel.poster}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="size-full object-cover"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent"
      />

      {/* The whole video toggles playback; the button sits bottom-left */}
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} video: ${reel.label}`}
        className="group absolute inset-0 flex cursor-pointer items-end p-4 text-left outline-offset-[-4px] focus-visible:outline-2 focus-visible:outline-white"
      >
        <span className="grid size-9 place-items-center rounded-full bg-ink/45 text-white backdrop-blur-md transition group-hover:bg-ink/65">
          {playing ? (
            <PauseIcon className="size-4" />
          ) : (
            <PlayIcon className="ml-0.5 size-4" />
          )}
        </span>
      </button>

      {/* Only the badge opens Instagram */}
      <a
        href={PAMELA_INSTAGRAM.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pamela Mariotto on Instagram (opens in a new tab)"
        className="group/ig absolute right-3 top-3 rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-white"
      >
        <InstagramBadge handle={PAMELA_INSTAGRAM.handle} size="sm" />
      </a>
    </div>
  );
}

export function InstructorReels() {
  return (
    <section
      aria-label="Pamela in motion"
      data-reveal-group
      className="bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-14 min-[88rem]:px-0">
        <ul
          style={
            { "--reels": Math.min(reels.length, 4) } as React.CSSProperties
          }
          // ~20rem per card, so 3 reels sit centred at the same size as 4
          className="mx-auto grid max-w-[calc(var(--reels)*20rem+(var(--reels)-1)*1.5rem)] gap-8 sm:grid-cols-[repeat(var(--reels),minmax(0,1fr))] sm:gap-6"
        >
          {reels.map((reel, i) => (
            <li
              key={reel.src}
              data-reveal
              className="mx-auto w-full max-w-80 sm:max-w-none"
            >
              <ReelCard reel={reel} tilt={tilts[i % tilts.length]} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
