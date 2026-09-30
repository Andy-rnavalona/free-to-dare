"use client";

import { useId, useState } from "react";
import { MinusIcon, PlusIcon } from "@/components/icons";

/** One collapsible question; questions open and close independently. */
export function FaqItem({
  question,
  answers,
}: {
  question: string;
  answers: string[];
}) {
  const [open, setOpen] = useState(false);
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
        className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
      >
        <span className="min-w-0 flex-1 font-display text-sm uppercase leading-snug tracking-[-0.01em] text-forest sm:text-base">
          {question}
        </span>
        <span
          aria-hidden="true"
          className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            open ? "border-forest bg-forest text-white" : "border-forest/30 text-forest"
          }`}
        >
          {open ? (
            <MinusIcon className="size-3.5" />
          ) : (
            <PlusIcon className="size-3.5" />
          )}
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
          <div className="flex flex-col gap-3 px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">
            {answers.map((answer) => (
              <p key={answer}>{answer}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
