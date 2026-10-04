import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";

const included = [
  "Training / studio space",
  "Sound system & speakers",
  "Changing rooms",
  "Toilets & showers",
];

export function TrainingSpaceSection() {
  return (
    <section
      id="training-space"
      aria-labelledby="training-space-title"
      data-reveal-group
      className="scroll-mt-28 bg-white"
    >
      <div className={CONTAINER}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="training-space-title"
            data-reveal
            className={`${DISPLAY} text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[0.92] text-forest`}
          >
            <span className="block">Here is your</span>
            <span className="block">Training space</span>
          </h2>
          <p
            data-reveal
            className="max-w-md text-sm leading-relaxed text-muted lg:mb-2"
          >
            A dedicated indoor studio in São Miguel will become our pole home for
            the week.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div
            data-reveal
            className="relative overflow-hidden rounded-3xl bg-ink lg:sticky lg:top-32 lg:self-start"
          >
            <Image
              src={withBasePath("/images/azores/studio.jpg")}
              alt="Indoor studio with four pole stages installed for the retreat"
              width={1024}
              height={1280}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/5] w-full object-cover"
            />
            <span
              className={`${MICRO} pointer-events-none absolute left-5 top-5 rounded-full bg-paper/90 px-4 py-2 text-[0.65rem] text-ink sm:left-6 sm:top-6`}
            >
              The studio
            </span>
          </div>

          <div className="lg:pt-6">
            <h3
              data-reveal
              className="text-[clamp(1.6rem,2.3vw,2rem)] font-extrabold uppercase leading-tight tracking-tight text-forest"
            >
              Everything you need to train
            </h3>
            <p
              data-reveal
              className="mt-4 max-w-xl text-sm leading-relaxed text-muted"
            >
              We install four pole stages specifically for the retreat, giving us
              a reliable training environment regardless of the weather outside.
            </p>
            <ul className="mt-8">
              {included.map((item) => (
                <li
                  key={item}
                  data-reveal
                  className="border-b border-line py-3 font-semibold text-forest"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="grid items-center gap-8 pt-12 sm:grid-cols-[minmax(0,1fr)_auto]">
              <div data-reveal>
                <p className={`${MICRO} text-[0.65rem] text-muted`}>
                  Outside the studio
                </p>
                <h3 className="mt-2 text-[clamp(1.4rem,1.8vw,1.75rem)] font-extrabold uppercase leading-tight tracking-tight text-forest">
                  Garden, patio &amp; bar
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                  Between sessions, the garden and patio give everyone space to
                  slow down, stretch and spend time together — with a small bar
                  area to keep the atmosphere relaxed from training days to the
                  last evening.
                </p>
              </div>
              <div
                data-reveal
                className="relative aspect-square w-full overflow-hidden rounded-2xl bg-ink sm:w-60 xl:w-64"
              >
                <Image
                  src={withBasePath("/images/azores/pool.jpg")}
                  alt="Garden and patio beside the studio"
                  fill
                  sizes="(min-width: 640px) 16rem, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
