"use client";

import { useEffect, useRef, useState } from "react";
import {
  PauseIcon,
  PlayIcon,
  VolumeOffIcon,
  VolumeOnIcon,
} from "@/components/icons";
import { withBasePath } from "@/lib/base-path";

const SUBTITLE = "A city made for curious minds";

/**
 * Vertical Lisbon video: muted loop that plays while on screen, with pause
 * and sound buttons (browsers only autoplay muted, so sound is opt-in).
 */
export function ReelCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!pausedByUser.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
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

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    // Turning the sound on is an explicit request to watch
    if (!video.muted && video.paused) {
      pausedByUser.current = false;
      video.play().catch(() => {});
    }
  };

  const control =
    "grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-md transition hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <figure
      data-reveal
      className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink sm:aspect-[2/3]"
    >
      <video
        ref={videoRef}
        poster={withBasePath("/videos/lisbon-city.jpg")}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Lisbon in motion: trams, viewpoints, the 25 de Abril bridge and the pink street"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        className="absolute inset-0 size-full object-cover"
      >
        <source
          src={withBasePath("/videos/lisbon-city.av1.mp4")}
          type='video/mp4; codecs="av01.0.08M.08"'
        />
        <source src={withBasePath("/videos/lisbon-city.mp4")} type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"
      />

      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white sm:p-8">
        <p className="text-sm font-semibold leading-snug">{SUBTITLE}</p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            className={control}
          >
            {muted ? (
              <VolumeOffIcon className="size-4" />
            ) : (
              <VolumeOnIcon className="size-4" />
            )}
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause video" : "Play video"}
            className={control}
          >
            {playing ? (
              <PauseIcon className="size-4" />
            ) : (
              <PlayIcon className="ml-0.5 size-4" />
            )}
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
