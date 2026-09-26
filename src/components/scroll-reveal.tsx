"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const STAGGER_MS = 70;
const MAX_DELAY_MS = 800;

/**
 * Reveals every `[data-reveal]` element the first time it scrolls into view.
 * Elements that enter together are staggered in document order, counted per
 * `[data-reveal-group]` so each section starts its own sequence.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // Disables the CSS fallback that un-hides content if this never runs
    root.dataset.revealReady = "";
    // Not set by the inline script (reduced motion / no IntersectionObserver)
    if (!("reveal" in root.dataset)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
              ? -1
              : 1,
          );

        const countByGroup = new Map<Element | null, number>();
        for (const el of entering) {
          const group = el.closest("[data-reveal-group]");
          const index = countByGroup.get(group) ?? 0;
          countByGroup.set(group, index + 1);

          el.style.setProperty(
            "--reveal-delay",
            `${Math.min(index * STAGGER_MS, MAX_DELAY_MS)}ms`,
          );
          el.dataset.revealed = "";
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    document
      .querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
