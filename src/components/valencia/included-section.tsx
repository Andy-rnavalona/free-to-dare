import { X } from "lucide-react";
import { CheckIcon } from "@/components/icons";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";
import { VALENCIA } from "@/components/valencia/retreat";

const included = [
  `${VALENCIA.nights} nights in a 4-star hotel`,
  "Daily breakfast",
  "Airport transfers",
  "Transportation for scheduled activities",
  `${VALENCIA.trainingHours} hours of aerial training`,
  "Professional aerial photoshoot",
  "Mediterranean sunset catamaran",
  "Paella cooking class",
  "Spanish wine and cheese tasting",
  "Flamenco show & sangria evening",
  "Guided Valencia city tour",
  "On-site organisation and support",
];

const notIncluded = [
  "Flights to/from Valencia",
  "Lunches and dinners unless specifically mentioned",
  "Personal expenses",
  "Travel insurance",
  "Optional activities outside the programme",
];

export function IncludedSection() {
  return (
    <section
      id="included"
      aria-labelledby="included-title"
      data-reveal-group
      className="scroll-mt-28 bg-background"
    >
      <div className={CONTAINER}>
        <div className="grid gap-10 rounded-3xl bg-card p-7 sm:p-10 md:grid-cols-2 md:gap-12 lg:p-14">
          <div>
            <p data-reveal className={`${MICRO} text-[0.65rem] text-forest`}>
              Included
            </p>
            <h2
              id="included-title"
              data-reveal
              className={`${DISPLAY} mt-3 text-[clamp(1.75rem,3vw,2.25rem)]`}
            >
              Everything taken care of
            </h2>
            <ul className="mt-8">
              {included.map((item) => (
                <li
                  key={item}
                  data-reveal
                  className="flex items-center gap-3 border-t border-line py-3 text-sm"
                >
                  <CheckIcon className="size-4 shrink-0 text-forest" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p data-reveal className={`${MICRO} text-[0.65rem] text-muted`}>
              Not included
            </p>
            <h2
              data-reveal
              className={`${DISPLAY} mt-3 text-[clamp(1.75rem,3vw,2.25rem)]`}
            >
              What&rsquo;s not included
            </h2>
            <ul className="mt-8">
              {notIncluded.map((item) => (
                <li
                  key={item}
                  data-reveal
                  className="flex items-center gap-3 border-t border-line py-3 text-sm text-muted"
                >
                  <X aria-hidden="true" className="size-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
