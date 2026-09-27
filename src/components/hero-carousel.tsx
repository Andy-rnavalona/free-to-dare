"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

const slides = [
  {
    src: "/images/lisbon-alfama.jpg",
    alt: "Terracotta rooftops of Alfama sloping down to the Tagus river",
    title: "See Lisbon from a different perspective",
    subtitle: "A city made for curious minds",
    place: "Miradouro paths",
  },
  {
    src: "/images/lisbon-sunset.jpg",
    alt: "Lisbon at sunset with the 25 de Abril bridge on the horizon",
    title: "Golden hours over the seven hills",
    subtitle: "Rooftops glowing in the evening light",
    place: "Miradouro da Graça",
  },
  {
    src: "/images/lisbon-tram.jpg",
    alt: "A yellow tram crossing a cobbled street in downtown Lisbon",
    title: "Slow down on every street corner",
    subtitle: "Trams, tiles and hidden courtyards",
    place: "Baixa & Chiado",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  const go = (step: number) =>
    setIndex((i) => (i + step + slides.length) % slides.length);

  return (
    <figure data-reveal className="flex flex-col">
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink sm:aspect-[2/3]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Trip highlights"
      >
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            preload={i === 0}
            sizes="(min-width: 1024px) 34vw, 100vw"
            className={`object-cover transition-[opacity,scale] duration-700 ease-out ${
              i === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
            aria-hidden={i !== index}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 sm:p-8">
          <span className="rounded-full bg-paper/85 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-ink backdrop-blur">
            Trip highlights
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="grid size-14 place-items-center rounded-full bg-white/30 text-ink backdrop-blur transition hover:bg-white/60"
            >
              <ArrowLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="grid size-14 place-items-center rounded-full bg-white/30 text-ink backdrop-blur transition hover:bg-white/60"
            >
              <ArrowRightIcon className="size-5" />
            </button>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10 2xl:p-12"
          aria-live="polite"
        >
          <h2 className="max-w-[30rem] text-[clamp(2.25rem,3.1vw,4.5rem)] font-medium leading-[0.98] tracking-tight">
            {current.title}
          </h2>
          <div className="mt-6 flex items-end justify-between gap-4">
            <p className="text-lg font-semibold">{current.subtitle}</p>
            <p className="shrink-0 text-xs font-medium tracking-[0.18em] text-white/85">
              {pad(index + 1)} / {pad(slides.length)}
            </p>
          </div>
        </div>
      </div>

      <figcaption className="mt-5 flex justify-between px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
        <span>{current.place}</span>
        <span>Spring / Early summer</span>
      </figcaption>
    </figure>
  );
}
