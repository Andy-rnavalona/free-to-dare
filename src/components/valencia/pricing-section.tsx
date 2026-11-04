import { House, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { formatEuro } from "@/booking/booking-config";
import {
  BUTTON_DARK,
  CONTAINER,
  DISPLAY,
  MICRO,
} from "@/components/azores/ui";
import { VALENCIA, whatsappLink } from "@/components/valencia/retreat";

type Plan = {
  label: string;
  price: number;
  title: string;
  subtitle: string;
  includes: string[];
  /** Highlighted box under the list */
  callout: { Icon: LucideIcon; title: string; text: string };
  cta: string;
};

const EXPERIENCES =
  "Sunset catamaran, paella class, wine & cheese tasting, flamenco show, sangria evening and city tour";

const plans: Plan[] = [
  {
    label: "Full Package",
    price: VALENCIA.priceShared,
    title: "Shared hotel room",
    subtitle: "Per person, in a 4-star hotel",
    includes: [
      `${VALENCIA.nights} nights in a 4-star hotel (shared room)`,
      "Daily breakfast",
      `${VALENCIA.trainingHours} hours of aerial training`,
      "Professional aerial photoshoot",
      EXPERIENCES,
      "Airport transfers & transportation for scheduled activities",
      "On-site organisation and support",
    ],
    callout: {
      Icon: Wallet,
      title: "Flexible payment plans",
      text: `Reserve with a ${formatEuro(VALENCIA.deposit)} deposit and spread the rest over several instalments.`,
    },
    cta: "Reserve your spot",
  },
  {
    label: "Retreat Only",
    price: VALENCIA.priceRetreatOnly,
    title: "Retreat without accommodation",
    subtitle: "Accommodation not included",
    includes: [
      `${VALENCIA.trainingHours} hours of aerial training`,
      "Professional aerial photoshoot",
      EXPERIENCES,
      "Transportation for scheduled activities",
      "On-site organisation and support",
    ],
    callout: {
      Icon: House,
      title: "Accommodation not included",
      text: "Book your own stay in Valencia and join the retreat with this ticket.",
    },
    cta: "Reserve your ticket",
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      data-reveal-group
      className="scroll-mt-28 bg-background"
    >
      <div className={CONTAINER}>
        <h2
          id="pricing-title"
          data-reveal
          className={`${DISPLAY} text-[clamp(2.5rem,5.5vw,4.25rem)] text-forest`}
        >
          <span className="block">Choose your</span>
          <span className="block">Valencia week</span>
        </h2>

        <div className="mt-12 grid max-w-5xl gap-4 md:grid-cols-2 lg:mt-14">
          {plans.map((plan, i) => (
            <PlanCard key={plan.label} plan={plan} number={i + 1} />
          ))}
        </div>

        <p data-reveal className="mt-6 text-sm text-muted">
          Online booking opens soon — until then, the organiser reserves your
          spot over WhatsApp.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan, number }: { plan: Plan; number: number }) {
  const { label, price, title, subtitle, includes, callout, cta } = plan;

  return (
    <article
      data-reveal
      className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white"
    >
      <div className="flex-1 p-7">
        <div className="flex items-center justify-between">
          <span className={`${MICRO} text-[0.65rem] text-forest`}>{label}</span>
          <span className="font-mono text-sm text-muted">
            {String(number).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-8 font-display text-4xl leading-none tracking-[-0.02em] text-ink sm:text-5xl">
          {formatEuro(price)}
          <span className="ml-2 inline-block font-sans text-base font-medium tracking-normal text-muted">
            / person
          </span>
        </p>
        <p className="mt-4 font-bold leading-snug text-ink">{title}</p>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>

        <ul className="mt-6">
          {includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border-t border-line py-3 text-sm"
            >
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-forest" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex gap-4 rounded-2xl bg-forest/[0.06] p-5">
          <callout.Icon
            aria-hidden="true"
            className="mt-0.5 size-6 shrink-0 text-forest"
          />
          <div>
            <p className="font-bold text-forest">{callout.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {callout.text}
            </p>
          </div>
        </div>
      </div>

      <p
        className={`${MICRO} border-t border-line px-7 pt-6 text-[0.65rem] text-muted`}
      >
        {formatEuro(VALENCIA.deposit)} deposit to reserve
      </p>
      <div className="p-7">
        <a
          href={whatsappLink(
            `Hi! I'd like to reserve a spot on the ${VALENCIA.name} (${label}, ${formatEuro(price)}).`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className={BUTTON_DARK}
        >
          {cta}
          <ArrowRightIcon className="size-3.5" />
        </a>
      </div>
    </article>
  );
}
