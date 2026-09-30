"use client";

import { useState } from "react";
import {
  ArrowRightIcon,
  InstagramIcon,
  MailIcon,
  TikTokIcon,
} from "@/components/icons";

/**
 * Same footer as the rest of the site — newsletter, links, copyright — drawn with this page's palette and typography.
 * The newsletter posts to the same HubSpot form as the main site footer.
 */

const HUBSPOT_ENDPOINT =
  "https://api.hsforms.com/submissions/v3/integration/submit/147725073/696528df-3c05-4cfa-9957-0fa14e908191";

const supportLinks = [
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "mailto:contact@freetodare.com" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Service", href: "#" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/madeiracreativevillage/",
    Icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@madeira_creative_village",
    Icon: TikTokIcon,
  },
];

type Status = "idle" | "success" | "duplicate" | "error";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch(HUBSPOT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [{ name: "email", value: email }],
          context: {
            pageUri: typeof window !== "undefined" ? window.location.href : "",
            pageName: "Free to Dare — Footer Subscribe",
          },
        }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await response.json().catch(() => null);
        setStatus(
          data?.errors?.[0]?.message?.includes("already exists")
            ? "duplicate"
            : "error",
        );
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const label = submitting
    ? "Subscribing…"
    : status === "success"
      ? "Thank you!"
      : status === "duplicate"
        ? "Already subscribed"
        : status === "error"
          ? "Try again"
          : "Get updates";

  return (
    <div className="flex w-full flex-col gap-3 lg:flex-1">
      <p className="flex items-center justify-center gap-2 text-sun lg:justify-start">
        <MailIcon className="size-5 shrink-0" />
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-white/80">
          Get updates about openings, experiences, retreats
        </span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-stretch gap-3 md:flex-row"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your@email.com"
          aria-label="Your email address"
          className="h-12 w-full rounded-full border border-white/20 bg-white/5 px-5 text-sm text-white transition placeholder:text-white/40 focus:border-sun focus:outline-none md:flex-1"
        />
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-sun px-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-night transition hover:brightness-105 disabled:opacity-70"
        >
          {label}
          <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </form>

      <p
        role={status === "idle" ? undefined : "status"}
        className="text-center font-mono text-[0.65rem] uppercase tracking-[0.15em] text-white/50 lg:text-left"
      >
        {status === "error"
          ? "Something went wrong — please try again."
          : "No spam · Only meaningful updates."}
      </p>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer
      id="contact"
      data-reveal-group
      className="scroll-mt-28 bg-night text-white"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-16 sm:px-10 lg:px-14 lg:py-24 min-[88rem]:px-0">
        {/* Newsletter */}
        <div
          data-reveal
          className="flex w-full flex-col items-center justify-between gap-6 py-10 lg:flex-row lg:items-start lg:gap-12 lg:py-16"
        >
          <h3 className="shrink-0 text-center font-serif text-2xl italic leading-tight lg:max-w-70 lg:text-left lg:text-3xl">
            Follow Free to Dare
          </h3>
          <Newsletter />
        </div>

        <div aria-hidden="true" className="h-px w-full bg-white/20" />

        {/* Links */}
        <div
          data-reveal
          className="flex w-full flex-col gap-8 py-8 md:grid md:grid-cols-3 md:gap-10 lg:py-12"
        >
          <div>
            <p className="font-display text-lg uppercase tracking-[-0.01em]">
              Free to Dare
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Train, explore and rediscover your confidence through sport,
              nature and art.
            </p>
          </div>

          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/50">
              Support
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/70">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/50">
              Follow us
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/70">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition hover:text-white"
                  >
                    <Icon className="size-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-hidden="true" className="h-px w-full bg-white/20" />

        <p className="py-6 text-center text-sm text-white/50">
          © 2026 Free to Dare
        </p>
      </div>
    </footer>
  );
}
