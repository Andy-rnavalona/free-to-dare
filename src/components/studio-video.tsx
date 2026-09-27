"use client";

import { useEffect, useRef, useState } from "react";
import {
  PauseIcon,
  PlayIcon,
  VolumeOffIcon,
  VolumeOnIcon,
} from "@/components/icons";

const VIDEO_TITLE = "“Spinning the world” | Lyra at Jaya";

/**
 * Muted, looping studio video with custom play/pause and sound buttons.
 * Nothing is downloaded until the card nears the screen; it plays while
 * visible and pauses when it scrolls away (unless paused by the visitor).
 */
export function StudioVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

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
      { threshold: 0.35 },
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
    setMuted(video.muted);
    // Turning the sound on is an explicit request to watch
    if (!video.muted && video.paused) {
      pausedByUser.current = false;
      video.play().catch(() => {});
    }
  };

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink shadow-[0_32px_64px_-32px_rgb(22_35_26/0.45)] lg:aspect-square">
      <video
        ref={videoRef}
        src="/videos/studio-lyra.mp4"
        poster="/videos/studio-lyra.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-label={VIDEO_TITLE}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        className="size-full object-cover"
      />

      <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-paper/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-ink sm:left-6 sm:top-6">
        The studio
      </span>

      <div className="absolute bottom-5 right-5 flex items-center gap-3 sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          className="grid size-12 cursor-pointer place-items-center rounded-full bg-ink/45 text-white backdrop-blur-md transition hover:bg-ink/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
        >
          {muted ? (
            <VolumeOffIcon className="size-5" />
          ) : (
            <VolumeOnIcon className="size-5" />
          )}
        </button>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={`${playing ? "Pause" : "Play"} video: ${VIDEO_TITLE}`}
          className="grid size-14 cursor-pointer place-items-center rounded-full bg-lime text-ink shadow-lg transition-transform duration-300 ease-out hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime sm:size-16"
        >
          {playing ? (
            <PauseIcon className="size-6" />
          ) : (
            <PlayIcon className="ml-1 size-6" />
          )}
        </button>
      </div>
    </div>
  );
}
