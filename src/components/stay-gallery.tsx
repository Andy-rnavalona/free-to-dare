"use client";

import Image from "next/image";
import { useState } from "react";

type Photo = { src: string; alt: string; position?: string };

export function StayGallery({
  photos,
  soldOut = false,
}: {
  photos: Photo[];
  soldOut?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const go = (step: number) =>
    setIndex((i) => (i + step + photos.length) % photos.length);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-ink">
      {photos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          aria-hidden={i !== index}
          className={`object-cover transition-opacity duration-500 ease-out ${
            photo.position ?? ""
          } ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}

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
