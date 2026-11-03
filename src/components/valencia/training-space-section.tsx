import Image from "next/image";
import { StayGallery, type Photo } from "@/components/stay-gallery";
import { withBasePath } from "@/lib/base-path";
import { CONTAINER } from "@/components/azores/ui";
import { VALENCIA } from "@/components/valencia/retreat";

const included = [
  "Aerial hall with hoops, trapezes & silks",
  `${VALENCIA.trainingHours} hours of aerial training`,
  `Small groups, maximum ${VALENCIA.groupMax} participants`,
  "Reception & café area",
];

/* Vaivé, from the aerial hall to the corners where the group gathers. */
const studio: Photo[] = [
  {
    src: withBasePath("/images/valencia/studio-hall.webp"),
    alt: "Vaivé's aerial hall, rigged with hoops, trapezes and silks",
  },
  {
    src: withBasePath("/images/valencia/studio-reception.webp"),
    alt: "The reception and café area at the entrance of Vaivé",
  },
  {
    src: withBasePath("/images/valencia/studio-chill.webp"),
    alt: "The chill zone, with lounge seating on artificial grass",
  },
];

/** Same layout as the Lisbon training space, with the studio as a slideshow */
export function TrainingSpaceSection() {
  return (
    <section
      id="training-space"
      aria-labelledby="training-space-title"
      data-reveal-group
      className="scroll-mt-28 bg-background"
    >
      <div className={CONTAINER}>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2
            id="training-space-title"
            data-reveal
            className="font-display text-[clamp(2.25rem,4.2vw,5.5rem)] uppercase xl:text-[3.5rem] leading-[0.92] tracking-[-0.01em] text-forest lg:whitespace-nowrap"
          >
            <span className="block">Here is your</span>
            <span className="block">Training space</span>
          </h2>
          <p
            data-reveal
            className="max-w-md text-sm leading-relaxed text-muted lg:pb-2"
          >
            A dedicated aerial studio to fly, train and enjoy the retreat
            together.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="relative lg:sticky lg:top-32 lg:self-start">
            <StayGallery
              photos={studio}
              className="aspect-4/3 rounded-3xl shadow-[0_32px_64px_-32px_rgb(22_35_26/0.45)] lg:aspect-square"
              sizes="(min-width: 1024px) 40rem, 100vw"
            />
            <span className="pointer-events-none absolute left-5 top-5 z-10 rounded-full bg-paper/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-ink sm:left-6 sm:top-6">
              The studio
            </span>
          </div>

          <div>
            <h3
              data-reveal
              className="text-[clamp(1.6rem,2.3vw,2.4rem)] xl:text-[1.85rem] font-extrabold uppercase leading-tight tracking-tight text-forest"
            >
              Everything you need to train
            </h3>
            <p
              data-reveal
              className="mt-4 max-w-xl text-sm leading-relaxed text-muted"
            >
              You’ll train at Vaivé, an aerial studio in Valencia with a high
              hall rigged for lyra, trapeze and silks — and the week ends with a
              professional aerial photoshoot.
            </p>
            <ul>
              {included.map((item) => (
                <li
                  key={item}
                  data-reveal
                  className="border-b border-line py-3 text-md font-semibold text-forest"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="grid items-center gap-8 pt-10 sm:grid-cols-[minmax(0,1fr)_auto]">
              <div data-reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  Between sessions
                </p>
                <h3 className="mt-2 text-[clamp(1.4rem,1.8vw,1.9rem)] xl:text-[1.45rem] font-extrabold uppercase leading-tight tracking-tight text-forest">
                  Chill zone &amp; café
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted text-sm">
                  Vaivé also has a chill zone with lounge seating and a café
                  area at the entrance — perfect for relaxing, chatting and
                  spending time together between sessions.
                </p>
              </div>
              <div
                data-reveal
                className="relative aspect-square w-full overflow-hidden rounded-2xl sm:w-60 xl:w-64"
              >
                <Image
                  src={withBasePath("/images/valencia/studio-chill-square.webp")}
                  alt="Lounge seating in Vaivé's chill zone"
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
