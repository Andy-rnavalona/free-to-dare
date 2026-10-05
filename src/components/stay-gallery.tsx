"use client";

import Image from "next/image";
import { useState } from "react";
import { BackgroundVideo } from "@/components/background-video";

export type Photo = {
  /** The image, or the poster when this slide is a video */
  src: string;
  alt: string;
  position?: string;
  /** Turns the slide into a muted loop over `src` as its poster */
  video?: { av1: string; mp4: string };
};

export function StayGallery({
  photos,
  soldOut = false,
  className = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  imageClassName = "",
}: {
  photos: Photo[];
  soldOut?: boolean;
  /** Sizing of the frame; defaults to a 4:3 box */
  className?: string;
  sizes?: string;
  imageClassName?: string;
}) {
  const [index, setIndex] = useState(0);
  const go = (step: number) =>
    setIndex((i) => (i + step + photos.length) % photos.length);

  return (
    <div className={`relative overflow-hidden bg-ink ${className}`}>
      {photos.map((photo, i) => {
        const shared = `absolute inset-0 size-full object-cover transition-[opacity,scale] duration-500 ease-out ${
          photo.position ?? ""
        } ${imageClassName} ${i === index ? "opacity-100" : "opacity-0"}`;

        /* A video slide only holds its loop while it is the one on show, so
           the others are not left decoding behind it. */
        return photo.video ? (
          i === index ? (
            <BackgroundVideo
              key={photo.src}
              poster={photo.src}
              sources={[
                {
                  src: photo.video.av1,
                  type: 'video/mp4; codecs="av01.0.08M.08"',
                },
                { src: photo.video.mp4, type: "video/mp4" },
              ]}
              className={shared}
            />
          ) : (
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={sizes}
              aria-hidden
              className={shared}
            />
          )
        ) : (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            aria-hidden={i !== index}
            className={shared}
          />
        );
      })}

      {soldOut && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-forest/45">
          <span className="-rotate-6 rounded-full border-2 border-white bg-forest/80 px-5 py-1.5 font-display text-base uppercase tracking-widest text-white shadow-lg md:text-lg">
            Sold out
          </span>
        </div>
      )}

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 z-10 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur transition hover:bg-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-3.5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 z-10 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur transition hover:bg-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-3.5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5"
          >
            {photos.map((photo, i) => (
              <span
                key={photo.src}
                className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
                  i === index ? "w-5" : "w-1.5 opacity-60"
                }`}
              />
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Photo {index + 1} of {photos.length}
          </p>
        </>
      )}
    </div>
  );
}
