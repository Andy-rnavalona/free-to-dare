"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { withBasePath } from "@/lib/base-path";
import { AZORES_RETREAT, LISBON_RETREAT } from "@/lib/routes";
import {
  COUNTRIES,
  DISCIPLINES,
  TRIP_TABS,
  TRIPS,
  tripInDestination,
  tripInDiscipline,
  type Trip,
  type TripTab,
} from "@/lib/trips";

/* Nothing answers at the domain root: every page belongs to one of the
   retreats, and the logo and the section links lead back to its landing. */
const LANDINGS = [AZORES_RETREAT, LISBON_RETREAT];

const navLinks = [
  { label: "Stays", href: "#stays" },
  { label: "Networking", href: "#networking" },
];

function Logo({ href }: { href: string }) {
  return (
    <Link
      href={href}
      aria-label="Free to Dare — home"
      className="relative inline-block pb-2 font-display text-[1.35rem] uppercase leading-[0.95] tracking-[-0.01em] sm:text-[1.6rem]"
    >
      <span className="block text-white">Free</span>
      <span className="block text-sun">To Dare</span>
      <svg
        viewBox="0 0 180 8"
        fill="none"
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 w-[150%]"
      >
        <path
          d="M2 5.5C45 3.2 112 2.4 178 3.6"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          className="text-sun"
        />
      </svg>
    </Link>
  );
}

function NavLink({
  label,
  href,
  active,
  inline,
  onClick,
}: {
  label: string;
  href: string;
  active?: boolean;
  inline?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`group relative font-mono font-bold uppercase tracking-[0.18em] text-white/90 transition-colors hover:text-sun ${
        inline ? "flex items-center gap-3 py-1 text-sm" : "py-2 text-[0.72rem]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`size-1 rounded-full bg-sun transition-opacity ${
          inline ? "size-1.5" : "absolute -top-1 left-1/2 -translate-x-1/2"
        } ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      />
      {label}
    </Link>
  );
}

function Chevron({
  flipped,
  className = "",
}: {
  flipped: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-300 ${
        flipped ? "rotate-180" : ""
      } ${className}`}
    >
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* The tabs are a light surface under the dark header, so everything inside
   them is drawn on paper rather than on night. */
const TAB_LINK =
  "text-ink transition-colors hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

/* A trip, named the way the tab it appears in names it. One without a page of
   its own is shown but not linked, and says so. */
function TripLink({
  trip,
  label,
  onPick,
}: {
  trip: Trip;
  label: string;
  onPick: () => void;
}) {
  if (!trip.href) {
    return (
      <span className="flex items-center gap-2 py-0.5 text-sm text-muted">
        <span className="truncate">{label}</span>
        <span className="shrink-0 rounded-full bg-ink/8 px-1.5 py-0.5 font-mono text-[0.5rem] font-bold uppercase tracking-[0.14em] text-muted">
          Soon
        </span>
      </span>
    );
  }
  return (
    <Link
      href={trip.href}
      onClick={onPick}
      className={`block py-0.5 text-sm ${TAB_LINK}`}
    >
      {label}
    </Link>
  );
}

/** Destinations: the places, under the country they are in. */
function DestinationsTab({ onPick }: { onPick: () => void }) {
  return (
    <div className="space-y-6">
      {COUNTRIES.map((country) => (
        <div
          key={country.country}
          className="gap-6 sm:grid sm:grid-cols-[6rem_1fr]"
        >
          <h3 className="pt-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-muted">
            {country.country}
          </h3>
          <ul className="mt-3 grid gap-x-10 gap-y-5 sm:mt-0 sm:grid-cols-[repeat(2,minmax(0,21rem))]">
            {country.destinations.map((destination) => (
              <li key={destination.destination} className="flex gap-4">
                <span className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-ink/5">
                  <Image
                    src={withBasePath(destination.image)}
                    alt={destination.alt}
                    fill
                    sizes="3.5rem"
                    className="object-cover"
                  />
                </span>
                <div className="min-w-0">
                  <h4 className="font-display text-sm uppercase leading-tight text-forest">
                    {destination.destination}
                  </h4>
                  <ul className="mt-1">
                    {destination.trips.map((trip) => (
                      <li key={tripInDestination(trip)}>
                        <TripLink
                          trip={trip}
                          label={tripInDestination(trip)}
                          onPick={onPick}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Disciplines: one card per practice, over a washed-out photo of it. */
function DisciplinesTab({ onPick }: { onPick: () => void }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {DISCIPLINES.map((discipline) => (
        <li
          key={discipline.discipline}
          className="relative overflow-hidden rounded-2xl bg-card p-5"
        >
          <Image
            src={withBasePath(discipline.image)}
            alt=""
            fill
            sizes="(min-width: 640px) 20rem, 90vw"
            aria-hidden="true"
            className="object-cover opacity-20"
          />
          {/* Keeps the text legible over whatever the photo happens to show */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-card via-card/85 to-card/40"
          />
          <div className="relative">
            <h3 className="font-display text-sm uppercase leading-tight text-forest">
              {discipline.discipline}
            </h3>
            <ul className="mt-2">
              {discipline.trips.map((trip) => (
                <li key={tripInDiscipline(trip)}>
                  <TripLink
                    trip={trip}
                    label={tripInDiscipline(trip)}
                    onPick={onPick}
                  />
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** All trips: every retreat, each with its photo. */
function AllTripsTab({ onPick }: { onPick: () => void }) {
  return (
    <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {TRIPS.map((trip) => (
        <li key={tripInDestination(trip)}>
          <TripCard trip={trip} onPick={onPick} />
        </li>
      ))}
    </ul>
  );
}

function TripCard({ trip, onPick }: { trip: Trip; onPick: () => void }) {
  const body = (
    <>
      <span className="relative block aspect-[3/2] overflow-hidden rounded-xl bg-ink/5">
        <Image
          src={withBasePath(trip.image)}
          alt={trip.alt}
          fill
          sizes="(min-width: 640px) 14rem, 45vw"
          className="object-cover transition-transform duration-500 group-hover/card:scale-[1.04]"
        />
        {trip.soon && (
          <span className="absolute right-2 top-2 rounded-full bg-paper/90 px-2 py-1 font-mono text-[0.5rem] font-bold uppercase tracking-[0.18em] text-ink">
            Soon
          </span>
        )}
      </span>
      <span className="mt-3 block font-display text-[0.95rem] uppercase leading-tight text-forest">
        {trip.destination}
      </span>
      <span className="mt-1 block text-sm text-muted">{trip.name}</span>
    </>
  );

  if (!trip.href) {
    return (
      <span className="group/card block cursor-default opacity-70">{body}</span>
    );
  }
  return (
    <Link
      href={trip.href}
      onClick={onPick}
      className={`group/card block rounded-xl ${TAB_LINK}`}
    >
      {body}
    </Link>
  );
}

/**
 * The tab strip, and the panel it switches. Arrow keys move between the tabs
 * as the tabs pattern expects, since only the selected one is tabbable.
 */
function TripTabs({ onPick }: { onPick: () => void }) {
  const [tab, setTab] = useState<TripTab>("all");
  const base = useId();
  const tabId = (id: TripTab) => `${base}-tab-${id}`;
  const panelId = (id: TripTab) => `${base}-panel-${id}`;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      Home: -TRIP_TABS.length,
      End: TRIP_TABS.length,
    };
    const step = keys[e.key];
    if (step === undefined) return;
    e.preventDefault();
    const at = TRIP_TABS.findIndex((t) => t.id === tab);
    const next = Math.min(Math.max(at + step, 0), TRIP_TABS.length - 1);
    setTab(TRIP_TABS[next].id);
    document.getElementById(tabId(TRIP_TABS[next].id))?.focus();
  };

  return (
    <>
      <div
        role="tablist"
        aria-label="Trips"
        onKeyDown={onKeyDown}
        className="flex gap-4 overflow-x-auto border-b border-line sm:gap-8"
      >
        {TRIP_TABS.map((t) => (
          <button
            key={t.id}
            id={tabId(t.id)}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            aria-controls={panelId(t.id)}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            className={`-mb-px whitespace-nowrap border-b-2 pb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] transition-colors ${
              tab === t.id
                ? "border-sun text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {TRIP_TABS.map((t) => (
        <div
          key={t.id}
          id={panelId(t.id)}
          role="tabpanel"
          aria-labelledby={tabId(t.id)}
          hidden={tab !== t.id}
          className="pt-6"
        >
          {t.id === "all" && <AllTripsTab onPick={onPick} />}
          {t.id === "destinations" && <DestinationsTab onPick={onPick} />}
          {t.id === "disciplines" && <DisciplinesTab onPick={onPick} />}
        </div>
      ))}
    </>
  );
}

/**
 * Pointer handlers for the Trips menu, spread over both the button and the
 * panel. Leaving either one closes the menu, but only after a beat, so that
 * crossing the gap between the two does not — and entering the other one in
 * the meantime calls the closing off.
 *
 * The two share this one hook call, and so this one timer: were each to hold
 * its own, the button's would still be running after the pointer reached the
 * panel, and would close the menu under it.
 */
function useTripsHover(setOpen: (open: boolean) => void) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => cancel, []);
  return {
    onPointerEnter: () => {
      cancel();
      setOpen(true);
    },
    onPointerLeave: () => {
      cancel();
      timer.current = setTimeout(() => setOpen(false), 120);
    },
  };
}

type HoverProps = ReturnType<typeof useTripsHover>;

/**
 * The Trips button in the desktop navigation. It opens the panel on hover for
 * the mouse and on click or Enter for the keyboard. The panel itself is a
 * child of the header — see TripsPanel — so that it can span its full width.
 */
function TripsTrigger({
  open,
  setOpen,
  panelId,
  buttonRef,
  hover,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  panelId: string;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  hover: HoverProps;
}) {
  return (
    <li {...hover}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group relative flex items-center gap-1.5 py-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white/90 transition-colors hover:text-sun"
      >
        <span
          aria-hidden="true"
          className={`absolute -top-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-sun transition-opacity ${
            open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />
        Trips
        <Chevron flipped={open} className="w-2.5" />
      </button>
    </li>
  );
}

/**
 * The panel the Trips button opens. It is a child of the header rather than of
 * the header's inner container, so its background spans the window while its
 * content keeps the container's own width and padding — the tabs then line up
 * with the logo at every width, as the mobile menu does.
 */
function TripsPanel({
  open,
  setOpen,
  panelId,
  hover,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  panelId: string;
  hover: HoverProps;
}) {
  return (
    <div
      id={panelId}
      {...hover}
      className={`absolute inset-x-0 top-full hidden rounded-b-3xl bg-paper text-ink shadow-[0_32px_48px_-16px_rgb(17_26_41/0.45)] transition duration-300 lg:block ${
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-2 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 py-7 sm:px-10 lg:px-14 min-[88rem]:px-0">
        <TripTabs onPick={() => setOpen(false)} />
      </div>
    </div>
  );
}

/** The same tabs inside the mobile menu, as a disclosure under its own row. */
function MobileTrips({ onPick }: { onPick: () => void }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-3 py-1 font-mono text-sm font-bold uppercase tracking-[0.18em] text-white/90 transition-colors hover:text-sun"
      >
        <span
          aria-hidden="true"
          className={`size-1.5 rounded-full bg-sun transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        Trips
        <Chevron flipped={open} className="ml-auto w-3" />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="mt-4 rounded-2xl bg-paper px-4 py-5 text-ink"
      >
        <TripTabs onPick={onPick} />
      </div>
    </>
  );
}

const SOLID_AFTER_PX = 80;

/**
 * Header of every Free to Dare page. Over a hero — the landing pages, which
 * pass `overHero` — it starts transparent and its section links stay on the
 * page. Elsewhere (the booking pages) there is nothing behind it, so it is
 * solid from the start and its section links lead back to the landing of the
 * retreat the page belongs to.
 */
export function SiteHeader({ overHero = false }: { overHero?: boolean }) {
  const pathname = usePathname();
  const landing =
    LANDINGS.find((path) => pathname.startsWith(path)) ?? LISBON_RETREAT;
  const onLanding = overHero;
  const to = (href: string) =>
    href.startsWith("#") && !onLanding ? `${landing}${href}` : href;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tripsOpen, setTripsOpen] = useState(false);
  const tripsPanelId = useId();
  const tripsButton = useRef<HTMLButtonElement>(null);
  // One hook call for the whole menu: the button and the panel share its timer
  const tripsHover = useTripsHover(setTripsOpen);

  // Escape closes the Trips menu and hands focus back to its button
  useEffect(() => {
    if (!tripsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setTripsOpen(false);
      tripsButton.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tripsOpen]);


  // Transparent over the hero video, solid once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SOLID_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const solid = scrolled || open || tripsOpen || !onLanding;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`ftd-header fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "shadow-[0_24px_40px_-12px_rgb(17_26_41/0.35)] backdrop-blur-sm"
          : ""
      }`}
    >
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(90deg,#111a29_0%,#1b1c1d_35%,#1e1b1f_70%,#111a29_100%)] transition-opacity duration-500 ${
          solid ? "opacity-95" : "opacity-0"
        }`}
      >
        <div className="absolute -top-16 left-[18%] h-48 w-72 rounded-full bg-[#3d4128]/50 blur-3xl" />
        <div className="absolute -top-16 left-[62%] h-48 w-80 rounded-full bg-[#2d2328]/60 blur-3xl" />
      </div>

      <div
        className={`relative mx-auto flex h-18 max-w-7xl items-center gap-6 px-5 sm:px-10 transition-[height] duration-500 lg:px-14 min-[88rem]:px-0 ${
          solid ? "lg:h-20" : "lg:h-[6.25rem]"
        }`}
      >
        <Logo href={landing} />

        {/* Desktop navigation */}
        <nav
          aria-label="Main"
          className="ml-auto hidden items-center gap-12 lg:flex"
        >
          <Link
            href={to("#join")}
            className="rounded-full bg-sun px-4 py-3 font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-night transition hover:brightness-105 hover:-translate-y-px"
          >
            Join the club
          </Link>
          <ul className="flex items-center gap-8">
            <TripsTrigger
              open={tripsOpen}
              setOpen={setTripsOpen}
              panelId={tripsPanelId}
              buttonRef={tripsButton}
              hover={tripsHover}
            />
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink {...link} href={to(link.href)} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-[clamp(3rem,11vw,11rem)] hidden lg:block">
          <NavLink label="Contact" href={to("#contact")} />
        </div>

        {/* Mobile controls */}
        <div className="ml-auto flex items-center gap-3 lg:hidden">
          <Link
            href={to("#join")}
            className="hidden rounded-full bg-sun px-4 py-2.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-night min-[420px]:inline-block"
          >
            Join the club
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-sun hover:text-sun"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                  open ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                  open ? "top-[5px] -rotate-45" : "top-2.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <TripsPanel
        open={tripsOpen}
        setOpen={setTripsOpen}
        panelId={tripsPanelId}
        hover={tripsHover}
      />

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={`absolute inset-x-0 top-full border-t border-white/10 bg-night px-5 pb-8 pt-4 shadow-2xl transition duration-300 sm:px-10 lg:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="divide-y divide-white/10">
          <li className="py-3">
            <MobileTrips onPick={close} />
          </li>
          {[...navLinks, { label: "Contact", href: "#contact" }].map((link) => (
            <li key={link.href} className="py-3">
              <NavLink {...link} href={to(link.href)} inline onClick={close} />
            </li>
          ))}
        </ul>
        <Link
          href={to("#join")}
          onClick={close}
          className="mt-6 block rounded-full bg-sun py-4 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-night"
        >
          Join the club
        </Link>
      </nav>
    </header>
  );
}
