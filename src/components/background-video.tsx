"use client";

import { useEffect, useRef } from "react";

/**
 * Full-bleed muted background loop. React doesn't serialise the `muted`
 * attribute, so it is forced here before asking the browser to play.
 * With reduced motion the poster stays up instead.
 */
export function BackgroundVideo({
  sources,
  poster,
  className = "",
}: {
  sources: { src: string; type: string }[];
  poster: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden="true"
      className={className}
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
