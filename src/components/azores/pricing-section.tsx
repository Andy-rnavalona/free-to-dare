import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { formatEuro } from "@/booking/booking-config";
import { AZORES, PRICING_ANCHOR } from "@/components/azores/retreat";
import {
  BUTTON_DARK,
  CONTAINER,
  DISPLAY,
  MICRO,
} from "@/components/azores/ui";

const soloIncludes = [
  `${AZORES.nights} nights accommodation`,
  "Daily breakfast",
  "5 pole classes",
  "Scheduled activities",
  "Group transfers",
  "Welcome dinner",
  "Photoshoot",
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      data-reveal-group
      className="scroll-mt-28 bg-card py-16 lg:py-24"
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

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-2">
          {/* Solo */}
          <article
            data-reveal
            className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white"
          >
            <div className="flex-1 p-7 sm:p-10">
              <div className="flex items-center justify-between">
                <span className={`${MICRO} text-[0.65rem] text-forest`}>
                  Pole Retreat
                </span>
                <span className="font-mono text-sm text-muted">01</span>
              </div>

              <p className="mt-8 font-display text-4xl text-ink sm:text-5xl">
                From {formatEuro(AZORES.priceFrom)}
                <span className="ml-2 inline-block font-sans text-base font-medium text-muted">
                  / person
                </span>
              </p>
              <p className="mt-3 text-sm font-semibold">
                For one pole participant.
              </p>

              <ul className="mt-8">
                {soloIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-t border-line py-3 text-sm"
                  >
                    <CheckIcon className="size-4 shrink-0 text-forest" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p
              className={`${MICRO} bg-sun px-7 py-4 text-[0.65rem] text-ink sm:px-10`}
            >
              {formatEuro(AZORES.deposit)} deposit to reserve
            </p>
            <div className="p-7 sm:px-10">
              <a href={PRICING_ANCHOR} className={BUTTON_DARK}>
                Reserve your spot
                <ArrowRightIcon className="size-3.5" />
              </a>
            </div>
          </article>

          {/* Solo + partner */}
          <article
            data-reveal
            className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white"
          >
            <div className="flex-1 p-7 sm:p-10">
              <div className="flex items-center justify-between">
                <span className={`${MICRO} text-[0.65rem] text-forest`}>
                  Pole + Partner
                </span>
                <span className="font-mono text-sm text-muted">02</span>
              </div>

              <p className="mt-8 font-display text-4xl text-ink sm:text-5xl">
                {formatEuro(AZORES.pricePartner)}
                <span className="ml-2 inline-block font-sans text-base font-medium text-muted">
                  / couple
                </span>
              </p>
              <p className="mt-3 text-sm font-semibold">
                1 pole participant + 1 accompanying guest
              </p>

              <p className="mt-8 text-sm leading-relaxed text-muted">
                Share the Azores experience together. Your partner joins the
                accommodation, breakfasts, transfers, excursions, activities and
                welcome dinner, while the pole classes are reserved for the pole
                participant.
              </p>
            </div>

            <p
              className={`${MICRO} bg-sun px-7 py-4 text-[0.65rem] text-ink sm:px-10`}
            >
              {formatEuro(AZORES.deposit)} deposit to reserve
            </p>
            <div className="p-7 sm:px-10">
              <a href={PRICING_ANCHOR} className={BUTTON_DARK}>
                Reserve for two
                <ArrowRightIcon className="size-3.5" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
