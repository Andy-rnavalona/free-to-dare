// import Image from "next/image";
import { StayGallery, type Photo } from "@/components/stay-gallery";
import { withBasePath } from "@/lib/base-path";
import { AZORES } from "@/components/azores/retreat";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";

const stats = [
  { value: "5 × 90", label: "min pole classes" },
  { value: "4", label: "pole stages" },
  { value: String(AZORES.groupMax), label: "participants max" },
  { value: "2", label: "people per pole" },
];

/* The studio, from the poles installed for the retreat to the room itself. */
const studio: Photo[] = [
  {
    src: withBasePath("/images/azores/studio-group.jpg"),
    alt: "A group sitting together in the studio between sessions",
  },
  {
    src: withBasePath("/videos/azores/training-space.jpg"),
    alt: "A look around the empty studio, from the timber roof to the floor",
    video: {
      av1: withBasePath("/videos/azores/training-space.av1.mp4"),
      mp4: withBasePath("/videos/azores/training-space.mp4"),
    },
  },
  {
    src: withBasePath("/images/azores/studio-empty.jpg"),
    alt: "The empty studio under its timber roof, lit by side windows",
  },
];

const included = [
  "Training / studio space",
  "Sound system & speakers",
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
            <StayGallery
              photos={studio}
              className="aspect-[4/5]"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <span
              className={`${MICRO} pointer-events-none absolute left-5 top-5 z-20 rounded-full bg-paper/90 px-4 py-2 text-[0.65rem] text-ink sm:left-6 sm:top-6`}
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

            <dl className="mt-8 grid grid-cols-2 gap-x-8">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  data-reveal
                  className="flex flex-col-reverse border-b border-forest/20 py-3"
                >
                  <dt className={`${MICRO} mt-2 text-[0.65rem] text-muted`}>
                    {label}
                  </dt>
                  <dd className="font-display text-xl text-forest sm:text-xl">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6">
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
                  Indoor studio  Small groups, more training time
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            The retreat includes 5 × 90-minute pole classes in a private indoor studio. With 4 pole stages and a maximum of 8 participants per class, there are only 2 people per pole, giving you plenty of time to train and practise.

The studio also has a kitchen and toilets, so everything you need is available on site.
                </p>
              </div>
              {/* <div
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
