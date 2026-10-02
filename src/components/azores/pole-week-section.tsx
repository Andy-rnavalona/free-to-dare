import Image from "next/image";
import { Sparkles } from "lucide-react";
import { SparkleIcon } from "@/components/icons";
import { withBasePath } from "@/lib/base-path";
import { AZORES } from "@/components/azores/retreat";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";

const stats = [
  { value: "5 × 90", label: "min pole classes" },
  { value: "4", label: "pole stages" },
  { value: String(AZORES.groupMax), label: "participants max" },
  { value: "2", label: "people per pole" },
];

export function PoleWeekSection() {
  return (
    <section
      id="training"
      aria-labelledby="pole-week-title"
      data-reveal-group
      className="scroll-mt-28 bg-white"
    >
      <div
        className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}
      >
        <div data-reveal className="relative overflow-hidden rounded-3xl bg-ink">
          <Image
            src={withBasePath("/images/azores/studio.jpg")}
            alt="Pole stages installed in the retreat's partner studio"
            width={1024}
            height={1024}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-square w-full object-cover object-top"
          />
        </div>

        <div>
          <p data-reveal className={`${MICRO} flex items-center gap-2.5`}>
            <SparkleIcon className="size-3.5 text-sun" />
            Pole training
          </p>

          <h2
            id="pole-week-title"
            data-reveal
            className={`${DISPLAY} mt-8 text-[clamp(2.5rem,4.4vw,4rem)] text-forest`}
          >
            Your pole week
          </h2>

          <div className="mt-10 max-w-xl space-y-4 text-sm leading-relaxed text-muted">
            <p data-reveal>
              Five 90-minute pole dance sessions will be part of the week,
              combining training with enough time to explore São Miguel and enjoy
              the retreat as a real holiday.
            </p>
            <p data-reveal>
              Training will take place indoors in our partner studio, allowing us
              to train comfortably without depending on the unpredictable
              Azorean weather.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-8">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                data-reveal
                className="border-t-2 border-forest/20 py-5"
              >
                <dd className="font-display text-3xl text-forest sm:text-4xl">
                  {value}
                </dd>
                <dt className={`${MICRO} mt-2 text-[0.65rem] text-muted`}>
                  {label}
                </dt>
              </div>
            ))}
          </dl>

          <p
            data-reveal
            className="mt-6 inline-flex items-center gap-4 rounded-full bg-card py-2.5 pl-2.5 pr-6"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sun">
              <Sparkles aria-hidden="true" className="size-4 text-ink" />
            </span>
            <span className={`${MICRO} text-[0.65rem]`}>
              Instructor announcement coming soon
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
