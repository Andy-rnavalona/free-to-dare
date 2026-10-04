import { X } from "lucide-react";
import { CheckIcon } from "@/components/icons";
import { AZORES } from "@/components/azores/retreat";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";

const included = [
  `${AZORES.nights} nights accommodation`,
  "Daily breakfast",
  "5 × 90 min pole classes",
  "Group airport transfers",
  "Transfers for scheduled activities",
  "Welcome dinner",
  "Whale watching",
  "Quad experience",
  "Photoshoot",
  "Scheduled São Miguel experiences & visits",
];

const notIncluded = [
  "Flights to/from the Azores",
  "Lunches and dinners unless specifically mentioned",
  "Personal expenses",
  "Travel insurance",
  "Optional activities outside the programme",
  "Anything not specifically listed as included",
];

export function IncludedSection() {
  return (
    <section
      id="included"
      aria-labelledby="included-title"
      data-reveal-group
      className="scroll-mt-28 bg-white"
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
              What&rsquo;s included
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
