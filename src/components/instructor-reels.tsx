"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";
import { InstagramBadge, PAMELA_INSTAGRAM } from "@/components/instagram-badge";

const reels = [
  {
    src: "/videos/aerial-silks-beach.mp4",
    poster: "/videos/aerial-silks-beach.jpg",
    label: "Pamela climbing white aerial silks by the sea",
    tilt: "sm:-rotate-3 lg:translate-y-4",
  },
  {
    src: "/videos/aerial-hoop-stage.mp4",
    poster: "/videos/aerial-hoop-stage.jpg",
    label: "Pamela spinning on an aerial hoop on an open-air stage",
    tilt: "sm:rotate-2 lg:-translate-y-2",
  },
  {
    src: "/videos/aerial-hoop-sunset.mp4",
    poster: "/videos/aerial-hoop-sunset.jpg",
    label: "Pamela holding a split on an aerial hoop at sunset",
    tilt: "sm:-rotate-2 lg:translate-y-3",
  },
];

type Reel = (typeof reels)[number];

function ReelCard({ reel }: { reel: Reel }) {
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
      className={`relative aspect-[9/16] w-[18rem] max-w-full overflow-hidden rounded-2xl bg-ink shadow-[0_24px_48px_-28px_rgb(22_35_26/0.55)] transition-[rotate,translate,scale] duration-500 ease-out sm:w-[16.5rem] can-hover:hover:rotate-0 can-hover:hover:translate-y-0 can-hover:hover:scale-[1.02] ${reel.tilt}`}
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

      {/* The whole video toggles playback */}
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} video: ${reel.label}`}
        className="group absolute inset-0 flex cursor-pointer items-end p-4 outline-offset-[-4px] focus-visible:outline-2 focus-visible:outline-white"
      >
        <span className="grid size-10 place-items-center rounded-full bg-ink/45 text-white backdrop-blur-md transition group-hover:bg-ink/65">
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
      className="bg-white pb-24 lg:pb-32"
    >
      <ul className="mx-auto flex w-full max-w-[2400px] flex-col items-center gap-10 px-5 py-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-14 sm:px-10 lg:gap-12 lg:px-14">
        {reels.map((reel) => (
          <li key={reel.src} data-reveal className="max-w-full">
            <ReelCard reel={reel} />
          </li>
        ))}
      </ul>
    </section>
  );
}
