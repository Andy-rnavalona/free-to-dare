"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";

/**
 * The teachers' vertical loop of the Valencia hero, framed like its mockup,
 * with a pause button. React doesn't serialise the `muted` attribute, so it is
 * forced here before asking the browser to play; with reduced motion the video
 * stays paused until asked.
 */
export function TeachersVideo({
  sources,
  poster,
  label,
}: {
  sources: { src: string; type: string }[];
  poster: string;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {});
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="aspect-9/16 max-h-[70vh] w-full rounded-[1.75rem] border-[1.25px] border-ink bg-ink/5 object-cover lg:max-h-[40rem]"
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute bottom-3 right-3 grid size-10 cursor-pointer place-items-center rounded-full bg-background/70 text-ink backdrop-blur-md transition hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
      >
        {playing ? (
          <PauseIcon className="size-4" />
        ) : (
          <PlayIcon className="ml-0.5 size-4" />
        )}
      </button>
    </div>
  );
}
