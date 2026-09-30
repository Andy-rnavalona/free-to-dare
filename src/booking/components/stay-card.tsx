"use client";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { DEPOSIT, formatEuro } from "@/booking/booking-config";
import { Dialog } from "@/booking/components/dialog";
import type { Photo, StayPackage } from "@/booking/stays";

function RoomGallery({ photos }: { photos: Photo[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const next = Math.max(0, Math.min(photos.length - 1, i));
    setIndex(next);
    track.current?.children[next]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const arrow =
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-card/90 p-2 shadow-md backdrop-blur transition-opacity";

  return (
    <div className="relative">
      <div
        ref={track}
        onScroll={(e) => {
          const el = e.currentTarget;
          const i = Math.round(el.scrollLeft / Math.max(el.clientWidth, 1));
          if (i !== index && i >= 0 && i < photos.length) setIndex(i);
        }}
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={1024}
            height={768}
            sizes="(min-width: 640px) 720px, 100vw"
            className="aspect-4/3 min-w-full snap-center rounded-2xl bg-secondary object-contain"
          />
        ))}
      </div>
      <button
        type="button"
        aria-label="Previous photo"
        onClick={() => goTo(index - 1)}
        disabled={index === 0}
        className={`${arrow} left-3 ${
          index === 0 ? "pointer-events-none opacity-0" : "opacity-100 hover:bg-secondary"
        }`}
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={() => goTo(index + 1)}
        disabled={index === photos.length - 1}
        className={`${arrow} right-3 ${
          index === photos.length - 1
            ? "pointer-events-none opacity-0"
            : "opacity-100 hover:bg-secondary"
        }`}
      >
        <ChevronRight className="size-4" />
      </button>
      <div className="mt-3 flex items-center justify-center gap-2">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Go to photo ${i + 1}`}
            onClick={() => goTo(i)}
            className={`size-1.5 rounded-full transition-colors ${
              i === index ? "bg-primary" : "bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function RoomDetails({ pkg }: { pkg: StayPackage }) {
  const room = pkg.room;
  if (!room) return null;

  return (
    <Dialog
      trigger={(open) => (
        <button
          type="button"
          onClick={open}
          className="label-mono underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-primary"
        >
          View room details
        </button>
      )}
      className="max-h-[90vh] max-w-lg gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-3xl sm:rounded-lg"
      title={(titleId) => (
        <div className="flex flex-col space-y-1 px-6 pt-6 text-left">
          <span className="label-mono text-muted-foreground">{pkg.label}</span>
          <h2
            id={titleId}
            className="display-xl text-3xl font-semibold leading-none tracking-tight"
          >
            {pkg.title}
          </h2>
        </div>
      )}
    >
      <div className="mt-5 px-6">
        <RoomGallery photos={room.gallery} />
      </div>
      <dl className="mx-6 mt-6 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
        {[
          ["Room type", room.type],
          ["Guests", room.guests],
          ["Beds", room.beds],
          ["Bathroom", room.bathroom],
        ].map(([label, value]) => (
          <div key={label} className="bg-card p-4">
            <dt className="label-mono text-muted-foreground">{label}</dt>
            <dd className="mt-1 text-sm">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="px-6 py-6">
        <p className="label-mono text-muted-foreground">Amenities</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {room.amenities.map((amenity) => (
            <li
              key={amenity}
              className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs"
            >
              {amenity}
            </li>
          ))}
        </ul>
      </div>
    </Dialog>
  );
}

export function StayCard({
  pkg,
  selected,
  onSelect,
}: {
  pkg: StayPackage;
  selected: boolean;
  onSelect: () => void;
}) {
  const cover = pkg.room?.gallery[0];

  return (
    <article
      className={`card-editorial overflow-hidden rounded-sm ${
        selected ? "card-selected border" : "hover:border-primary/40"
      }`}
    >
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        <div className="order-2 p-6 md:order-1 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <span className="label-mono text-muted-foreground">
              {pkg.index} / {pkg.label}
            </span>
            {selected && (
              <span className="label-mono bg-primary px-3 py-1 text-primary-foreground">
                Selected
              </span>
            )}
          </div>
          <h3 className="display-xl mt-3 text-3xl md:text-4xl">{pkg.title}</h3>
          <p className="display-xl mt-2 text-2xl text-primary">
            {formatEuro(pkg.price)}{" "}
            <span className="label-mono text-muted-foreground">/ person</span>
          </p>
          <p className="mt-3 max-w-prose text-sm text-muted-foreground">
            {pkg.description}
          </p>
          {!pkg.accommodationIncluded && (
            <p className="mt-4 rounded-2xl border border-border bg-secondary p-4 text-sm">
              <span className="label-mono block text-muted-foreground">
                Accommodation not included
              </span>
              You book and pay for your own place to stay in Lisbon. Breakfast at
              the retreat house is not included either — everything else in the
              programme is exactly the same.
            </p>
          )}
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {pkg.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="label-mono bg-accent px-3 py-1.5 text-accent-foreground">
              {formatEuro(DEPOSIT)} deposit to reserve
            </span>
            <span className="label-mono text-muted-foreground">
              {pkg.availability}
            </span>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={onSelect}
              className={`font-display px-7 py-3.5 text-base uppercase tracking-wide transition-colors ${
                selected
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {selected ? "Selected" : pkg.cta}
            </button>
            {pkg.room && <RoomDetails pkg={pkg} />}
          </div>
        </div>
        {cover ? (
          // The photo fills its whole side of the card, whatever its ratio:
          // 4:3 above the text on mobile, the text's height beside it from md up
          <div className="relative order-1 aspect-4/3 bg-secondary md:order-2 md:aspect-auto">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1280px) 580px, (min-width: 768px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="order-1 flex items-end bg-primary p-8 text-primary-foreground md:order-2">
            <p className="display-xl text-3xl leading-tight">
              Your Lisbon,
              <br />
              your way.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
