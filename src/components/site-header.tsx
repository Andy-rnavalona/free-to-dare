"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Trips", href: "#trips", active: true },
  { label: "Stays", href: "#stays" },
  { label: "Networking", href: "#networking" },
  { label: "Games", href: "#games" },
];

function Logo() {
  return (
    <Link
      href="/"
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
        } ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-night shadow-[0_24px_40px_-12px_rgb(17_26_41/0.35)]">
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(90deg,#111a29_0%,#1b1c1d_35%,#1e1b1f_70%,#111a29_100%)]"
      >
        <div className="absolute -top-16 left-[18%] h-48 w-72 rounded-full bg-[#3d4128]/50 blur-3xl" />
        <div className="absolute -top-16 left-[62%] h-48 w-80 rounded-full bg-[#2d2328]/60 blur-3xl" />
      </div>

      <div className="relative mx-auto flex h-18 max-w-[2400px] items-center gap-6 px-5 sm:px-10 lg:h-[6.25rem] lg:px-[6%]">
        <Logo />

        {/* Desktop navigation */}
        <nav
          aria-label="Main"
          className="ml-auto hidden items-center gap-12 lg:flex"
        >
          <Link
            href="#join"
            className="rounded-full bg-sun px-4 py-3 font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-night transition hover:brightness-105 hover:-translate-y-px"
          >
            Join the club
          </Link>
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink {...link} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-[clamp(3rem,11vw,11rem)] hidden lg:block">
          <NavLink label="Contact" href="#contact" />
        </div>

        {/* Mobile controls */}
        <div className="ml-auto flex items-center gap-3 lg:hidden">
          <Link
            href="#join"
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
          {[...navLinks, { label: "Contact", href: "#contact" }].map((link) => (
            <li key={link.href} className="py-3">
              <NavLink {...link} inline onClick={close} />
            </li>
          ))}
        </ul>
        <Link
          href="#join"
          onClick={close}
          className="mt-6 block rounded-full bg-sun py-4 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-night"
        >
          Join the club
        </Link>
      </nav>
    </header>
  );
}
