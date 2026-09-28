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
      className={`overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 ${
        open ? "" : "hover:-translate-y-0.5 hover:bg-sun-soft/30"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left sm:gap-5 sm:px-7 sm:py-5"
      >
        <span className="shrink-0 bg-sun px-2.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-forest">
          Day {day}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-xl uppercase leading-tight tracking-[-0.01em] text-forest sm:text-2xl">
            {title}
          </span>
          <span className="mt-1 block text-sm text-muted">{date}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-forest">
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
