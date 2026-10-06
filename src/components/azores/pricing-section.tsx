import type { ReactNode } from "react";
import { Gift, House } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { formatEuro } from "@/booking/booking-config";
import { AZORES, PRICING_ANCHOR } from "@/components/azores/retreat";
import {
  BUTTON_DARK,
  CONTAINER,
  DISPLAY,
  MICRO,
} from "@/components/azores/ui";

type Include = { item: string; detail?: string };

type Plan = {
  label: string;
  price: ReactNode;
  per: string;
  title: string;
  subtitle?: string;
  /** Paragraph between the title and the list */
  intro?: string;
  includes: Include[];
  /** Highlighted box under the list */
  callout?: { Icon: LucideIcon; title: string; text: ReactNode };
  cta: string;
};

const transfers = (detail: string): Include => ({
  item: "All grouped transfers included",
  detail,
});

const POLE_TRANSFERS = transfers(
  "Airport transfers + transfers to pole classes, activities and excursions",
);

const plans: Plan[] = [
  {
    label: "Pole Retreat",
    price: <>From {formatEuro(AZORES.priceFrom)}</>,
    per: "person",
    title: "Shared Room",
    subtitle: "Per person, 2 people per room",
    includes: [
      { item: `${AZORES.nights} nights accommodation (shared room)` },
      { item: "Daily breakfast & dinner" },
      { item: "5 pole classes (90 min)" },
      { item: "Scheduled activities & excursions" },
      POLE_TRANSFERS,
      { item: "Welcome dinner" },
      { item: "Pole photoshoot" },
    ],
    callout: {
      Icon: Gift,
      title: "Returning participant?",
      text: (
        <>
          Get {formatEuro(AZORES.loyaltyDiscount)} off – special loyalty price:{" "}
          <span className="font-semibold text-ink">
            {formatEuro(AZORES.priceShared - AZORES.loyaltyDiscount)}
          </span>{" "}
          per person.
        </>
      ),
    },
    cta: "Reserve your spot",
  },
  {
    label: "Private Room",
    price: formatEuro(AZORES.pricePrivate),
    per: "person",
    title: "Private Room",
    subtitle: "Single occupancy, limited availability",
    includes: [
      { item: `${AZORES.nights} nights accommodation (private room)` },
      { item: "Daily breakfast & dinner" },
      { item: "5 pole classes (90 min)" },
      { item: "Scheduled activities & excursions" },
      POLE_TRANSFERS,
      { item: "Welcome dinner" },
      { item: "Pole photoshoot" },
    ],
    cta: "Reserve your room",
  },
  {
    label: "Pole + Partner",
    price: formatEuro(AZORES.pricePartner),
    per: "couple",
    title: "1 pole participant + 1 accompanying guest",
    intro:
      "Share the Azores experience together. Your partner joins the accommodation, breakfast & dinner, all transfers, excursions, activities and welcome dinner, while the pole classes are reserved for the pole participant.",
    includes: [
      { item: `${AZORES.nights} nights accommodation (shared room for two)` },
      { item: "Daily breakfast & dinner" },
      { item: "5 pole classes for 1 person (90 min)" },
      { item: "All scheduled activities & excursions (for both guests)" },
      transfers("Airport transfers + transfers to activities and excursions"),
      { item: "Welcome dinner (for both)" },
      { item: "Pole photoshoot (for pole participant)" },
    ],
    cta: "Reserve for two",
  },
  {
    label: "Retreat Only",
    price: formatEuro(AZORES.priceRetreatOnly),
    per: "person",
    title: "Retreat Only Ticket",
    subtitle: "Accommodation not included",
    includes: [
      { item: "5 pole classes (90 min)" },
      { item: "Scheduled activities & excursions" },
      POLE_TRANSFERS,
      { item: "Welcome dinner" },
      { item: "Pole photoshoot" },
    ],
    callout: {
      Icon: House,
      title: "Accommodation not included",
      text: "You can book your own accommodation directly with the hotel or any nearby hotel and join the retreat with this ticket.",
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
      className="scroll-mt-28 bg-white"
    >
      <div className={CONTAINER}>
        <h2
          id="pricing-title"
          data-reveal
          className={`${DISPLAY} text-[clamp(2.5rem,5.5vw,4.25rem)] text-forest`}
        >
          <span className="block">Choose your</span>
          <span className="block">Azores experience</span>
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-14 xl:grid-cols-4">
          {plans.map((plan, i) => (
            <PlanCard key={plan.label} plan={plan} number={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan, number }: { plan: Plan; number: number }) {
  const { label, price, per, title, subtitle, intro, includes, callout, cta } =
    plan;

  return (
    <article
      data-reveal
      className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white"
    >
      <div className="flex-1 p-7 xl:p-6">
        <div className="flex items-center justify-between">
          <span className={`${MICRO} text-[0.65rem] text-forest`}>{label}</span>
          <span className="font-mono text-sm text-muted">
            {String(number).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-8 font-display text-4xl leading-none tracking-[-0.02em] text-ink sm:text-5xl xl:text-[2.6rem]">
          {price}
          <span className="ml-2 inline-block font-sans text-base font-medium tracking-normal text-muted">
            / {per}
          </span>
        </p>
        <p className="mt-4 font-bold leading-snug text-ink">{title}</p>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        {intro && (
          <p className="mt-6 text-sm leading-relaxed text-muted">{intro}</p>
        )}

        <ul className="mt-6">
          {includes.map(({ item, detail }) => (
            <li
              key={item}
              className="flex items-start gap-3 border-t border-line py-3 text-sm"
            >
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-forest" />
              {detail ? (
                <span>
                  <span className="block text-[0.8rem] font-semibold uppercase tracking-wide text-forest">
                    {item}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">
                    {detail}
                  </span>
                </span>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>

        {callout && (
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
        )}
      </div>

      <p
        className={`${MICRO} border-t border-line px-7 pt-6 text-[0.65rem] text-muted xl:px-6`}
      >
        {formatEuro(AZORES.deposit)} deposit to reserve
      </p>
      <div className="p-7 xl:p-6">
        <a href={PRICING_ANCHOR} className={BUTTON_DARK}>
          {cta}
          <ArrowRightIcon className="size-3.5" />
        </a>
      </div>
    </article>
  );
}
