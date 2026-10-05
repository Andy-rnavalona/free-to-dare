import Image from "next/image";
import { CardCarousel } from "@/components/card-carousel";
import { withBasePath } from "@/lib/base-path";
import {
  CARD_OVERLAY,
  CONTAINER,
  DISPLAY,
  MICRO,
} from "@/components/azores/ui";

type Experience = {
  tag: string;
  title: string;
  image: string;
  alt: string;
  /** Yellow tag instead of white, like the reference design */
  highlight?: boolean;
};

const experiences: Experience[] = [
  {
    tag: "Train",
    title: "Pole Dance Training",
    image: "studio.jpg",
    alt: "Indoor studio with pole stages installed for the retreat",
  },
  {
    tag: "Volcanic",
    title: "Sete Cidades & Lagoa do Fogo",
    image: "fogo.jpg",
    alt: "Crater lake surrounded by green volcanic slopes",
  },
  {
    tag: "Ocean",
    title: "Whale Watching",
    image: "whale.jpg",
    alt: "Whale surfacing in the Atlantic off São Miguel",
    highlight: true,
  },
  {
    tag: "Adventure",
    title: "Quad Experience",
    image: "quad.jpg",
    alt: "Quad bikes on a dirt road across the island",
  },
  {
    tag: "Reset",
    title: "Thermal Waters",
    image: "thermal.jpg",
    alt: "Natural thermal pool surrounded by subtropical plants",
  },
  {
    tag: "Local",
    title: "Tea Plantations & North Coast",
    image: "tea.jpg",
    alt: "Rows of tea plants on the north coast of São Miguel",
  },
  {
    tag: "Create",
    title: "Azores Photoshoot",
    image: "photoshoot.jpg",
    alt: "Pole dancer photographed on volcanic rocks by the Atlantic",
    highlight: true,
  },
  {
    tag: "Community",
    title: "Shared moments & Welcome Dinner",
    image: "community.jpg",
    alt: "The group laughing together at an island viewpoint",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function ExperiencesSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      data-reveal-group
      className="scroll-mt-28 bg-white"
    >
      <div className={CONTAINER}>
        <p
          data-reveal
          className={`${MICRO} flex items-center gap-3 text-[0.65rem] text-forest`}
        >
          Açores
          <span aria-hidden="true" className="h-px w-8 bg-forest" />
          Early summer
        </p>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="experience-title"
            data-reveal
            className={`${DISPLAY} text-[clamp(2.75rem,6vw,4.75rem)] text-forest`}
          >
            <span className="block">LIVE THE AZORES EXPERIENCE</span>
          </h2>
          <p
            data-reveal
            className="max-w-sm text-sm leading-relaxed text-muted lg:mb-4"
          >
            Pole training, volcanic landscapes and Atlantic adventures — all in
            one week.
          </p>
        </div>

        <div data-reveal className="mt-10 lg:mt-12">
          <CardCarousel label="Retreat experiences" speed={20}>
            {experiences.map((exp, i) => (
              <li
                key={exp.title}
                className="shrink-0 basis-[82%] sm:basis-[calc((100%-1rem)/2.15)] lg:basis-[calc((100%-2rem)/3.2)]"
              >
                <article className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-ink">
                  <Image
                    src={withBasePath(`/images/azores/${exp.image}`)}
                    alt={exp.alt}
                    fill
                    sizes="(min-width: 1024px) 23rem, (min-width: 640px) 47vw, 82vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 ${CARD_OVERLAY}`}
                  />

                  <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5">
                    <span
                      className={`rounded-full px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.08em] text-ink ${
                        exp.highlight ? "bg-sun" : "bg-white/90 backdrop-blur"
                      }`}
                    >
                      {exp.tag}
                    </span>
                    <span className="font-mono text-[0.65rem] font-bold text-white drop-shadow">
                      {pad(i + 1)}
                    </span>
                  </div>

                  <h3
                    className={`${DISPLAY} absolute inset-x-0 bottom-0 p-6 text-xl text-white sm:text-2xl`}
                  >
                    {exp.title}
                  </h3>
                </article>
              </li>
            ))}
          </CardCarousel>
        </div>
      </div>
    </section>
  );
}
