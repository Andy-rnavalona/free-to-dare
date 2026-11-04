import Image from "next/image";
import { CardCarousel } from "@/components/card-carousel";
import { withBasePath } from "@/lib/base-path";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";
import { VALENCIA } from "@/components/valencia/retreat";

/** Colour of a card's tag, as in the mockup: Spanish red, saffron, olive, blue */
type Tone = "red" | "saffron" | "olive" | "blue";

const TAG_TONES: Record<Tone, string> = {
  red: "bg-forest text-white",
  saffron: "bg-saffron text-ink",
  olive: "bg-olive text-white",
  blue: "bg-azulejo text-white",
};

type Experience = {
  tag: string;
  tone: Tone;
  title: string;
  items: string[];
  /** In public/images/valencia */
  image: string;
  alt: string;
  /** Stock photo standing in for the real experience: says so on the card */
  illustrative?: boolean;
};

const experiences: Experience[] = [
  {
    tag: "Fly",
    tone: "red",
    title: "Take your aerial skills higher",
    items: [
      `${VALENCIA.trainingHours} hours of aerial training per participant`,
      `Small groups, maximum ${VALENCIA.groupMax} participants`,
      "Lyra tricks, spinning, dynamics and creative flow",
      "Doubles lyra, partner acrobatics and contemporary movement",
      "Professional aerial photoshoot",
    ],
    image: "fly-studio.webp",
    alt: "Vaivé aerial studio with hoops, trapezes and silks",
  },
  {
    tag: "Sail",
    tone: "saffron",
    title: "Chase the Mediterranean sunset",
    items: ["Mediterranean sunset catamaran experience"],
    image: "sail.webp",
    alt: "A catamaran on the Mediterranean at sunset",
    illustrative: true,
  },
  {
    tag: "Taste",
    tone: "olive",
    title: "A taste of Spain",
    items: ["Traditional paella cooking class", "Spanish wine and cheese tasting"],
    image: "taste.webp",
    alt: "A Valencian paella",
    illustrative: true,
  },
  {
    tag: "Feel the rhythm",
    tone: "red",
    title: "Spanish nights",
    items: ["Authentic flamenco show", "Sangria evening"],
    image: "rhythm.webp",
    alt: "A flamenco dress and dancing shoes",
    illustrative: true,
  },
  {
    tag: "Discover",
    tone: "blue",
    title: "Fall in love with Valencia",
    items: ["Guided Valencia city tour", "Local discoveries and exploration"],
    image: "discover.webp",
    alt: "Valencia's City of Arts and Sciences",
    illustrative: true,
  },
  {
    tag: "Connect",
    tone: "olive",
    title: "Arrive solo. Leave with friends.",
    items: [
      "Social dinners in local restaurants",
      "International aerial community",
      "Shared experiences and new friendships",
    ],
    image: "connect.webp",
    alt: "A shared Spanish dinner table",
    illustrative: true,
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

// Same reveal as the Azores cards; keyboard focus opens it too, and touch shows all details.
const details =
  "mt-4 text-sm leading-relaxed text-muted transition-[opacity,filter,translate] duration-700 ease-out motion-reduce:transition-none can-hover:translate-y-3 can-hover:opacity-0 can-hover:blur-sm can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 can-hover:group-hover:blur-none can-hover:group-hover:delay-150 can-hover:group-focus-within:translate-y-0 can-hover:group-focus-within:opacity-100 can-hover:group-focus-within:blur-none";

const mediaZoom =
  "transition-transform duration-700 ease-out motion-safe:can-hover:group-hover:scale-105 motion-reduce:transition-none";

export function ExperiencesSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      data-reveal-group
      className="scroll-mt-28 bg-background"
    >
      <div className={CONTAINER}>
        <p
          data-reveal
          className={`${MICRO} flex items-center gap-3 text-[0.65rem] text-forest`}
        >
          Valencia
          <span aria-hidden="true" className="h-px w-8 bg-forest" />
          More than an aerial retreat
        </p>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="experience-title"
            data-reveal
            className={`${DISPLAY} text-[clamp(2.75rem,6vw,4.75rem)] text-forest`}
          >
            One week. So many stories.
          </h2>
          <p
            data-reveal
            className="max-w-sm text-sm leading-relaxed text-muted lg:mb-4"
          >
            Fly, sail, taste, dance and discover Valencia with people who share
            your passion.
          </p>
        </div>

        <div data-reveal className="mt-10 lg:mt-12">
          <CardCarousel label="Retreat experiences" speed={20}>
            {experiences.map((exp, i) => (
              <li
                key={exp.title}
                className="shrink-0 basis-[82%] sm:basis-[calc((100%-1rem)/2.15)] lg:basis-[calc((100%-2rem)/3.2)]"
              >
                <article
                  tabIndex={0}
                  aria-label={exp.title}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line/70 bg-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest can-hover:grid can-hover:aspect-3/4 can-hover:h-auto can-hover:grid-rows-[minmax(0,1fr)_auto]"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-ink can-hover:aspect-auto">
                    <Image
                      src={withBasePath(`/images/valencia/${exp.image}`)}
                      alt={exp.alt}
                      fill
                      sizes="(min-width: 1024px) 23rem, (min-width: 640px) 47vw, 82vw"
                      className={`object-cover ${mediaZoom}`}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/20 to-transparent"
                    />
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5">
                      <span
                        className={`rounded-full px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.08em] ${TAG_TONES[exp.tone]}`}
                      >
                        {exp.tag}
                      </span>
                      <span className="font-mono text-[0.65rem] font-bold text-white drop-shadow">
                        {pad(i + 1)}
                      </span>
                    </div>
                    {exp.illustrative && (
                      <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 text-right">
                        <p className="inline-block rounded-full bg-black/70 px-3 py-1.5 text-xs leading-snug text-white backdrop-blur-sm">
                          Illustrative photo
                        </p>
                      </div>
                    )}
                  </div>

                  {/* As on the Azores cards, the details expand while the media row shrinks. */}
                  <div className="p-5 sm:p-6">
                    <h3 className={`${DISPLAY} text-lg text-forest sm:text-xl`}>
                      {exp.title}
                    </h3>
                    <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] can-hover:grid-rows-[0fr] can-hover:group-hover:grid-rows-[1fr] can-hover:group-focus-within:grid-rows-[1fr] motion-reduce:transition-none">
                      <div className="overflow-hidden">
                        <span
                          aria-hidden="true"
                          className="mt-4 block h-px origin-left bg-line transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] can-hover:scale-x-0 can-hover:group-hover:scale-x-100 can-hover:group-hover:delay-100 can-hover:group-focus-within:scale-x-100 motion-reduce:transition-none"
                        />
                        <ul className={`${details} space-y-1`}>
                          {exp.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </CardCarousel>
        </div>
      </div>
    </section>
  );
}
