import Image from "next/image";
import { BackgroundVideo } from "@/components/background-video";
import { CardCarousel } from "@/components/card-carousel";
import { CardVideo } from "@/components/card-video";
import { StayGallery, type Photo } from "@/components/stay-gallery";
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
  /** Still shown on the card, and the poster when the card plays a loop */
  image: string;
  alt: string;
  /** Muted loop playing in place of the still */
  video?: {
    av1: string;
    mp4: string;
    /** Has a soundtrack: shows the pause and sound buttons over the loop */
    sound?: boolean;
  };
  /** Extra stills: the card becomes a slideshow starting on `image` */
  gallery?: { image: string; alt: string }[];
  /** Yellow tag instead of white, like the reference design */
  highlight?: boolean;
};

const experiences: Experience[] = [
  {
    tag: "Train",
    title: "Pole Dance Training",
    image: "/videos/azores/pole-training-poster.webp",
    alt: "Pole class training on the stages installed for the retreat",
    video: {
      av1: "/videos/azores/pole-training.av1.mp4",
      mp4: "/videos/azores/pole-training.mp4",
    },
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
    image: "whale-breaching.webp",
    alt: "Humpback whale breaching off the coast of São Miguel",
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
    title: "NATURAL HOT SPRINGS — CALDEIRA VELHA",
    image: "thermal-waterfall.webp",
    alt: "Warm waterfall falling into the bathing pool at Caldeira Velha",
    gallery: [
      {
        image: "thermal-ferns.webp",
        alt: "The thermal pool seen from above, ringed by tree ferns",
      },
    ],
  },
  {
    tag: "Explore",
    title: "Tea Plantations & North Coast",
    image: "tea-plantation.webp",
    alt: "Winding rows of tea terraces with a path running down the hillside",
  },
  {
    tag: "Capture",
    title: "POLERINA HYDRANGEA PHOTOSHOOT",
    image: "photoshoot.webp",
    alt: "Pole dancer photographed on volcanic rocks by the Atlantic",
    highlight: true,
  },
  {
    tag: "Community",
    title: "Shared moments & Welcome Dinner",
    // Shared with the Lisbon retreat page, which plays the same evening
    image: "/videos/experience-social.jpg",
    alt: "The group sharing dinner at long tables under a pergola",
    video: {
      av1: "/videos/experience-social.av1.mp4",
      mp4: "/videos/experience-social.mp4",
      sound: true,
    },
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
                  {exp.gallery ? (
                    <StayGallery
                      photos={[
                        { image: exp.image, alt: exp.alt },
                        ...exp.gallery,
                      ].map((slide): Photo => ({
                        src: withBasePath(`/images/azores/${slide.image}`),
                        alt: slide.alt,
                      }))}
                      className="absolute inset-0 size-full"
                      sizes="(min-width: 1024px) 23rem, (min-width: 640px) 47vw, 82vw"
                      imageClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : exp.video?.sound ? (
                    <CardVideo
                      sources={[
                        {
                          src: withBasePath(exp.video.av1),
                          type: 'video/mp4; codecs="av01.0.08M.08"',
                        },
                        { src: withBasePath(exp.video.mp4), type: "video/mp4" },
                      ]}
                      poster={withBasePath(exp.image)}
                      label={exp.alt}
                      className="absolute inset-0 size-full"
                    />
                  ) : exp.video ? (
                    <BackgroundVideo
                      sources={[
                        {
                          src: withBasePath(exp.video.av1),
                          type: 'video/mp4; codecs="av01.0.08M.08"',
                        },
                        { src: withBasePath(exp.video.mp4), type: "video/mp4" },
                      ]}
                      poster={withBasePath(exp.image)}
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={withBasePath(`/images/azores/${exp.image}`)}
                      alt={exp.alt}
                      fill
                      sizes="(min-width: 1024px) 23rem, (min-width: 640px) 47vw, 82vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
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
                    className={`${DISPLAY} absolute inset-x-0 bottom-0 p-6 text-xl text-white sm:text-2xl ${
                      /* Leave room for the play and sound buttons */
                      exp.video?.sound ? "pb-16" : ""
                    }`}
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
