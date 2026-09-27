"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PauseIcon,
  PlayIcon,
} from "@/components/icons";

/** Pause after a swipe or arrow click before drifting again */
const RESUME_AFTER_INTERACTION_MS = 4000;
const ARROW_TWEEN_MS = 650;
const DRAG_THRESHOLD_PX = 6;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Endless marquee of `<li>` cards. The items are rendered twice so the row
 * can drift forever: the offset wraps by exactly one set width, which is
 * invisible because both sets are identical. Movement is a GPU transform
 * driven by requestAnimationFrame, easing to a stop on hover/focus/pause.
 * Arrows glide by one card; the row can also be dragged or swiped.
 */
export function CardCarousel({
  label,
  speed = 40,
  children,
}: {
  label: string;
  /** Drift speed in px per second */
  speed?: number;
  children: ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);

  // Mutable animation state, read every frame without re-rendering
  const pausedRef = useRef(paused);
  const hovered = useRef(false);
  const visible = useRef(false);
  const interactedUntil = useRef(0);
  const offset = useRef(0);
  const velocity = useRef(0);
  const loopWidth = useRef(0);
  const step = useRef(0);
  const tween = useRef<{ from: number; to: number; start: number } | null>(
    null,
  );
  const drag = useRef<{
    id: number;
    startX: number;
    startOffset: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const row = rowRef.current;
    if (!viewport || !row) return;

    const measure = () => {
      const items = row.children;
      const count = items.length / 2;
      if (count < 1) return;
      const first = items[0] as HTMLElement;
      loopWidth.current =
        (items[count] as HTMLElement).offsetLeft - first.offsetLeft;
      step.current =
        count > 1
          ? (items[1] as HTMLElement).offsetLeft - first.offsetLeft
          : loopWidth.current;
    };
    measure();
    row
      .querySelectorAll<HTMLElement>(
        "[data-clone] a, [data-clone] button, [data-clone] video, [data-clone] [tabindex]",
      )
      .forEach((el) => el.setAttribute("tabindex", "-1"));
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => (visible.current = entry.isIntersecting),
    );
    intersectionObserver.observe(viewport);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (visible.current && loopWidth.current > 0) {
        const drifting =
          !pausedRef.current &&
          !hovered.current &&
          !drag.current &&
          !reducedMotion.matches &&
          Date.now() > interactedUntil.current;
        // Ease the speed instead of starting/stopping abruptly
        const target = drifting ? speed : 0;
        velocity.current += (target - velocity.current) * Math.min(1, dt * 3);

        if (tween.current) {
          const t = Math.min(1, (now - tween.current.start) / ARROW_TWEEN_MS);
          offset.current =
            tween.current.from +
            (tween.current.to - tween.current.from) * easeOutCubic(t);
          if (t === 1) tween.current = null;
        } else if (!drag.current) {
          offset.current += velocity.current * dt;
        }

        const L = loopWidth.current;
        const wrapped = ((offset.current % L) + L) % L;
        if (!tween.current && !drag.current) offset.current = wrapped;
        row.style.transform = `translate3d(${-wrapped}px, 0, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [speed]);

  const markInteraction = () => {
    interactedUntil.current = Date.now() + RESUME_AFTER_INTERACTION_MS;
  };

  const go = (direction: 1 | -1) => {
    markInteraction();
    const from = tween.current ? tween.current.to : offset.current;
    // Land on the next card edge in that direction, never mid-card
    const s = step.current || 1;
    const to =
      direction > 0
        ? (Math.floor(from / s + 0.01) + 1) * s
        : (Math.ceil(from / s - 0.01) - 1) * s;
    tween.current = { from: offset.current, to, start: performance.now() };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    drag.current = {
      id: e.pointerId,
      startX: e.clientX,
      startOffset: offset.current,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) < DRAG_THRESHOLD_PX) return;
    if (!d.moved) {
      d.moved = true;
      tween.current = null;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    offset.current = d.startOffset - dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (d.moved) {
      suppressClick.current = true;
      markInteraction();
    }
    drag.current = null;
  };

  // Second copy of the cards for the seamless loop. Not `inert`: that would
  // also disable hover and clicks once the copies drift into view. Instead
  // they're hidden from screen readers and their controls leave the tab order.
  const items = Children.toArray(children).filter(isValidElement);
  const clones = items.map((child) =>
    cloneElement(child as ReactElement<Record<string, unknown>>, {
      key: `clone-${child.key}`,
      "aria-hidden": true,
      "data-clone": "",
    }),
  );

  const arrow =
    "absolute top-[40%] z-20 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink shadow-md transition hover:border-forest hover:bg-forest hover:text-white";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="relative"
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
      onFocus={() => (hovered.current = true)}
      onBlur={() => (hovered.current = false)}
    >
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous cards"
        className={`${arrow} left-2 sm:-left-5`}
      >
        <ArrowLeftIcon className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next cards"
        className={`${arrow} right-2 sm:-right-5`}
      >
        <ArrowRightIcon className="size-4" />
      </button>

      <div
        ref={viewportRef}
        className="cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          // A drag shouldn't also click the card it ended on
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        <ul
          ref={rowRef}
          className="flex gap-4 pb-2 will-change-transform select-none"
        >
          {items}
          {clones}
        </ul>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-muted transition hover:bg-forest/5 hover:text-forest"
        >
          {paused ? (
            <PlayIcon className="size-3" />
          ) : (
            <PauseIcon className="size-3" />
          )}
          {paused ? "Play slideshow" : "Pause slideshow"}
        </button>
      </div>
    </div>
  );
}
