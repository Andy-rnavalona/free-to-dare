import Image from "next/image";
import { BackgroundVideo } from "@/components/background-video";
import { CardCarousel } from "@/components/card-carousel";
import { CardVideo } from "@/components/card-video";
import { StayGallery, type Photo } from "@/components/stay-gallery";
import { withBasePath } from "@/lib/base-path";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";

type Experience = {
  tag: string;
  title: string;
  /** Details shown as a paragraph or a short list, as on the Lisbon cards. */
  description?: string;
  items?: string[];
  /** Still shown on the card, and the poster when the card plays a loop */
  image: string;
  alt: string;
  /** Muted loop playing in place of the still */
  video?: {
    av1: string;
    mp4: string;
    /** Always-visible context about where the footage was recorded. */
    caption?: string;
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
    items: [
      "5 × 90-min Pole Dance classes",
      "Elegant pole style & choreography",
      "Max. 8 participants per group",
      "Training adapted to different levels",
    ],
    image: "/videos/azores/pole-training-poster.webp",
    alt: "Pole dance training during a previous retreat, not the Azores studio",
    video: {
      av1: "/videos/azores/pole-training.av1.mp4",
      mp4: "/videos/azores/pole-training.mp4",
      caption: "Previous retreat footage",
    },
  },
  {
    tag: "Volcanic",
    title: "Sete Cidades & Lagoa do Fogo",
    description:
      "Discover São Miguel’s crater lakes and panoramic viewpoints. Take in the blue and green waters of Sete Cidades and the volcanic slopes around Lagoa do Fogo.",
    image: "fogo.jpg",
    alt: "Crater lake surrounded by green volcanic slopes",
  },
  {
    tag: "Ocean",
    title: "Whale & Dolphin Watching",
    items: [
      "Whale & dolphin watching in the Atlantic",
      "Marine wildlife experience with local experts",
      "Dolphin swimming planned, subject to conditions",
      "Final experience confirmed closer to the retreat",
    ],
    image: "whale-breaching.webp",
    alt: "Humpback whale breaching off the coast of São Miguel",
    highlight: true,
  },
  {
    tag: "Adventure",
    title: "Quad Experience",
    description:
      "Discover Sete Cidades with two options: an adventurous quad ride through off-road trails or a relaxing scenic van tour.",
    image: "sete-cidades-quad.avif",
    alt: "A group riding quad bikes above the blue and green lakes of Sete Cidades",
  },
  {
    tag: "Reset",
    title: "NATURAL HOT SPRINGS — CALDEIRA VELHA",
    description:
      "Slow down among tree ferns and lush greenery at Caldeira Velha. Warm thermal waters and a forest setting offer a quiet moment to unwind.",
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
    description:
      "Walk among Gorreana’s tea fields and explore São Miguel’s green north coast, with stops for waterfalls, ocean views and shared moments along the way.",
    image: "tea-plantation.webp",
    alt: "Winding rows of tea terraces with a path running down the hillside",
  },
  {
    tag: "Capture",
    title: "POLERINA HYDRANGEA PHOTOSHOOT",
    description:
      "Your own moment in front of the camera, with a pole stage set among São Miguel’s hydrangeas. The location is chosen according to the bloom, weather and safe access.",
    image: "photoshoot.webp",
    alt: "Pole dancer photographed on volcanic rocks by the Atlantic",
    highlight: true,
  },
  {
    tag: "Community",
    title: "First night, first connections",
    items: [
      "Welcome dinner at a local restaurant",
      "Included in your retreat package",
      "Meet the group and get to know each other",
    ],
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

// Match Lisbon's reveal; keyboard focus opens it too, and touch shows all details.
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
                <article
                  tabIndex={0}
                  aria-label={exp.title}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line/70 bg-[#fdfcf9] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest can-hover:grid can-hover:aspect-3/4 can-hover:h-auto can-hover:grid-rows-[minmax(0,1fr)_auto]"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-ink can-hover:aspect-auto">
                    <div className="absolute inset-0">
                      {exp.gallery ? (
                        <StayGallery
                          photos={[
                            { image: exp.image, alt: exp.alt },
                            ...exp.gallery,
                          ].map((slide): Photo => ({
                            src: withBasePath(`/images/azores/${slide.image}`),
                            alt: slide.alt,
                          }))}
                          className="size-full"
                          sizes="(min-width: 1024px) 23rem, (min-width: 640px) 47vw, 82vw"
                          imageClassName={mediaZoom}
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
                          className="size-full"
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
                          className={`absolute inset-0 size-full object-cover ${mediaZoom}`}
                        />
                      ) : (
                        <Image
                          src={withBasePath(`/images/azores/${exp.image}`)}
                          alt={exp.alt}
                          fill
                          sizes="(min-width: 1024px) 23rem, (min-width: 640px) 47vw, 82vw"
                          className={`object-cover ${mediaZoom}`}
                        />
                      )}
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/20 to-transparent"
                    />
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5">
                      <span
                        className={`rounded-full px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors duration-500 can-hover:group-hover:bg-sun can-hover:group-focus-within:bg-sun motion-reduce:transition-none ${
                          exp.highlight ? "bg-sun" : "bg-white/90 backdrop-blur"
                        }`}
                      >
                        {exp.tag}
                      </span>
                      <span className="font-mono text-[0.65rem] font-bold text-white drop-shadow">
                        {pad(i + 1)}
                      </span>
                    </div>
                    {exp.video?.caption && (
                      <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 text-right">
                        <p className="inline-block rounded-full bg-black/70 px-3 py-1.5 text-xs leading-snug text-white backdrop-blur-sm">
                          {exp.video.caption}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* As in Lisbon, the details expand while the media row shrinks. */}
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
                        {exp.items ? (
                          <ul className={`${details} space-y-1`}>
                            {exp.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className={details}>{exp.description}</p>
                        )}
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
