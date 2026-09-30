"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/**
 * Modal dialog built on the native <dialog> (focus trap, Escape, top layer),
 * styled like the mockup's. `trigger` receives the function that opens it.
 */
export function Dialog({
  trigger,
  title,
  className,
  children,
}: {
  trigger: (open: () => void) => ReactNode;
  title: (titleId: string) => ReactNode;
  className: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    ref.current?.showModal();
    // The page behind stays put while the dialog is open
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      {trigger(() => setOpen(true))}
      {open && (
        <dialog
          ref={ref}
          aria-labelledby={titleId}
          onClose={() => setOpen(false)}
          // Clicks and keys inside must not reach the card the trigger sits in
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            // A click on the backdrop lands on the dialog itself, outside its box
            const box = e.currentTarget.getBoundingClientRect();
            const outside =
              e.clientX < box.left ||
              e.clientX > box.right ||
              e.clientY < box.top ||
              e.clientY > box.bottom;
            if (outside) e.currentTarget.close();
          }}
          className={`bk-dialog fixed inset-auto left-[50%] top-[50%] z-50 m-0 grid w-full translate-x-[-50%] translate-y-[-50%] border bg-background text-foreground shadow-lg ${className}`}
        >
          {title(titleId)}
          {children}
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="absolute right-4 top-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </dialog>
      )}
    </>
  );
}
