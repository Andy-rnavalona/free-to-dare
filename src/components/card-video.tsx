"use client";

import { useEffect, useRef, useState } from "react";
import {
  PauseIcon,
  PlayIcon,
  VolumeOffIcon,
  VolumeOnIcon,
} from "@/components/icons";

/**
 * Card video: muted loop that plays while on screen, with play/pause and
 * sound buttons. Nothing downloads until the card nears the viewport.
 */
export function CardVideo({
  sources,
  poster,
  label,
  className = "",
}: {
  sources: { src: string; type: string }[];
  poster: string;
  label: string;
  className?: string;
}) {
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
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
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
    if (!video.muted && video.paused) {
      pausedByUser.current = false;
      video.play().catch(() => {});
    }
  };

  const control =
    "grid size-9 cursor-pointer place-items-center rounded-full bg-ink/45 text-white backdrop-blur-md transition hover:bg-ink/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <div className={`relative overflow-hidden bg-ink ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        className="absolute inset-0 size-full object-cover"
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>

      <div className="absolute bottom-3 left-3 z-10 flex gap-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={`${playing ? "Pause" : "Play"} video: ${label}`}
          className={control}
        >
          {playing ? (
            <PauseIcon className="size-3.5" />
          ) : (
            <PlayIcon className="ml-0.5 size-3.5" />
          )}
        </button>
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
      </div>
    </div>
  );
}
