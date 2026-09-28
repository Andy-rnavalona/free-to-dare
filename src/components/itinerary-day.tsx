"use client";

import { useId, useState, type ReactNode } from "react";
import { MinusIcon, PlusIcon } from "@/components/icons";

type ItineraryDayProps = {
  day: number;
  title: string;
  date: string;
  defaultOpen?: boolean;
  /** Panel content, rendered on the server */
  children: ReactNode;
};

/** One collapsible day of the itinerary; days open and close independently. */
export function ItineraryDay({
  day,
  title,
  date,
  defaultOpen = false,
  children,
}: ItineraryDayProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <article
      className={`overflow-hidden rounded-xl shadow-sm bg-white transition-all duration-300 ${
        open
          ? "border-forest/30"
          : "border-line/60 hover:-translate-y-0.5 hover:border-forest/40 hover:bg-sun-soft/30"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left sm:gap-5 sm:px-7 sm:py-5"
      >
        <span className="inline-flex shrink-0 items-center justify-center bg-sun px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-forest/80">
          Day {day}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-condensed text-2xl font-bold uppercase leading-[0.95] tracking-tight text-forest sm:text-[1.75rem]">
            {title}
          </span>
          <span className="mt-1 block text-sm text-muted">{date}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-forest">
          <span className="hidden sm:inline">
            {open ? "Hide day" : "View day"}
          </span>
          <span
            aria-hidden="true"
            className={`flex size-9 items-center justify-center rounded-full border transition-colors duration-300 ${
              open ? "border-forest bg-forest text-white" : "border-forest/30"
            }`}
          >
            {open ? (
              <MinusIcon className="size-4" />
            ) : (
              <PlusIcon className="size-4" />
            )}
          </span>
        </span>
      </button>

      {/* Animates the height through grid rows; `inert` keeps a closed panel out of the tab order */}
      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 sm:px-7 sm:pb-7">{children}</div>
        </div>
      </div>
    </article>
  );
}
