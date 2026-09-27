"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  PauseIcon,
  PlayIcon,
  VolumeOffIcon,
  VolumeOnIcon,
} from "@/components/icons";

const VIDEO_ID = "Jr1KOf0caZw";
const VIDEO_TITLE = "“Spinning the world” | Lyra at Jaya";
const EMBED_URL = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?${new URLSearchParams(
  {
    autoplay: "1",
    mute: "1", // browsers only allow autoplay without sound
    loop: "1",
    playlist: VIDEO_ID, // required for loop to work on a single video
    controls: "0",
    disablekb: "1",
    playsinline: "1",
    rel: "0",
    iv_load_policy: "3",
    enablejsapi: "1",
  },
)}`;

type PlayerCommand = "playVideo" | "pauseVideo" | "mute" | "unMute";

/**
 * Muted, looping YouTube background video with custom play/pause and sound
 * buttons. The player is only loaded once the card scrolls into view, and it
 * pauses again when it leaves. Talks to the player through the IFrame API's
 * postMessage protocol, so no extra script is loaded.
 */
export function StudioVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pausedByUser = useRef(false);
  const wantMuted = useRef(true);
  const [mounted, setMounted] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const send = (func: PlayerCommand) =>
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );

  // Load on first view, then pause/resume as the card leaves/enters the screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const autoplay = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!autoplay || pausedByUser.current) return;
          setMounted(true);
          send("playVideo");
          setPlaying(true);
        } else {
          send("pauseVideo");
          setPlaying(false);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Player events: sync state once ready, reveal the video when it really plays
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      let data: { event?: string; info?: { playerState?: number } };
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }
      if (data.event === "onReady") {
        send(wantMuted.current ? "mute" : "unMute");
        send(pausedByUser.current ? "pauseVideo" : "playVideo");
      }
      const state = data.info?.playerState;
      if (state === 1) {
        // Keep the poster up while YouTube shows its start-up overlays
        window.setTimeout(() => setShowPoster(false), 4000);
        setPlaying(true);
      } else if (state === 2) {
        setPlaying(false);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const handleIframeLoad = () => {
    // Ask the player to start posting its events to this window
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "listening", id: VIDEO_ID, channel: "widget" }),
      "*",
    );
    // Fallback in case player events never arrive
    window.setTimeout(() => setShowPoster(false), 8000);
  };

  const togglePlay = () => {
    if (!mounted) {
      pausedByUser.current = false;
      setMounted(true);
      setPlaying(true);
      return;
    }
    if (playing) {
      pausedByUser.current = true;
      send("pauseVideo");
      setPlaying(false);
    } else {
      pausedByUser.current = false;
      send("playVideo");
      setPlaying(true);
    }
  };

  const toggleSound = () => {
    wantMuted.current = !muted;
    setMuted(!muted);
    if (!mounted) {
      pausedByUser.current = false;
      setMounted(true);
      setPlaying(true);
      return;
    }
    send(muted ? "unMute" : "mute");
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink shadow-[0_32px_64px_-32px_rgb(22_35_26/0.45)] lg:aspect-square"
    >
      {mounted && (
        <iframe
          ref={iframeRef}
          src={EMBED_URL}
          title={VIDEO_TITLE}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
          onLoad={handleIframeLoad}
          // 16:9 player scaled to cover the frame, like object-fit: cover
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-video h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2"
        />
      )}

      <Image
        src="/images/studio-video-poster.jpg"
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={`object-cover transition-opacity duration-700 ${
          showPoster ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
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
