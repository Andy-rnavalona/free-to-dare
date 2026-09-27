import { CardCarousel } from "@/components/card-carousel";
import { CardVideo } from "@/components/card-video";
import { StayGallery, type Photo } from "@/components/stay-gallery";

// A card shows its video if it has one, otherwise its photos
// (several photos become a small carousel).
type Experience = {
  tag: string;
  title: string;
  items: string[];
  photos: Photo[];
  video?: { av1: string; mp4: string; poster: string; label: string };
};

const experiences: Experience[] = [
  {
    tag: "Move",
    title: "Aerial Training & Professional Photoshoot",
    photos: [],
    video: {
      av1: "/videos/experience-aerial.av1.mp4",
      mp4: "/videos/experience-aerial.mp4",
      poster: "/videos/experience-aerial.jpg",
      label: "Aerial hoop and silks training in the studio",
    },
    items: [
      "3 Aerial Hoop classes",
      "3 Aerial Silks classes",
      "All levels · professional instruction",
      "Aerial practice photoshoot",
    ],
  },
  {
    tag: "Ocean",
    title: "Golden Hour Sunset Boat Cruise & Wine",
    photos: [
      {
        src: "/images/experiences/golden-hour/01.avif",
        alt: "Sun setting behind the 25 de Abril bridge over the Tagus",
      },
      {
        src: "/images/experiences/golden-hour/02.avif",
        alt: "Sailboat on the Tagus with the 25 de Abril bridge behind",
      },
    ],
    items: [
      "Sunset boat cruise",
      "Portuguese wine",
      "Ocean views · golden hour",
    ],
  },
  {
    tag: "Explore",
    title: "Live Lisbon",
    photos: [
      {
        src: "/images/experiences/live-lisbon/01.webp",
        alt: "Two friends on a viewpoint terrace above the rooftops of Alfama",
      },
      {
        src: "/images/experiences/live-lisbon/02.webp",
        alt: "Traveler on a viewpoint overlooking Lisbon's rooftops and the river",
        position: "object-[50%_60%]",
      },
      {
        src: "/images/experiences/live-lisbon/03.webp",
        alt: "Walking under colourful umbrellas on Lisbon's pink street",
      },
    ],
    items: [
      "Guided walks through Lisbon",
      "Local streets and viewpoints",
      "Street photography",
      "Beyond the typical tourist route",
    ],
  },
  {
    tag: "Community",
    title: "Good people, good nights",
    photos: [
      {
        src: "/images/experience-rooftop.jpg",
        alt: "Rooftop terrace overlooking the rooftops of Lisbon",
        position: "object-[35%_50%]",
      },
    ],
    items: [
      "Rooftop dinner with the group",
      "Social evenings",
      "Shared experiences",
      "Time to connect and make new friends",
    ],
  },
];

// TEMP: cards duplicated to preview the carousel with more than 4 items.
// Remove this and map over `experiences` once the real cards exist.
const previewExperiences = [
  ...experiences,
  ...experiences.map((exp) => ({ ...exp, title: `${exp.title} (copy)` })),
];

const pad = (n: number) => String(n).padStart(2, "0");

export function ExperienceSection() {
  return (
    <section
      id="experience"
      data-reveal-group
      aria-labelledby="experience-title"
      className="bg-white"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-10 lg:px-14 xl:px-0 lg:py-32">
        <div className="flex flex-col gap-8 border-b border-line pb-10 lg:flex-row lg:items-end lg:justify-between lg:pb-12">
          <div>
            <p
              data-reveal
              className="flex items-center gap-3 font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-forest"
            >
              Lisboa
              <span aria-hidden="true" className="h-px w-8 bg-forest" />
              Spring / Early summer
            </p>
            <h2
              id="experience-title"
              data-reveal
              className="mt-4 font-display text-[clamp(2.75rem,6vw,7.5rem)] xl:text-[4.75rem] leading-[0.95] tracking-[-0.01em] lg:whitespace-nowrap"
            >
              <span className="block">Catch the Lisbon</span>
              <span className="block text-forest">experience</span>
            </h2>
          </div>
          <p
            data-reveal
            className="max-w-sm text-lg leading-relaxed text-muted lg:mb-4"
          >
            Move, explore, create and connect — all in one unforgettable week.
          </p>
        </div>

        <div data-reveal className="mt-10 lg:mt-12">
          <CardCarousel label="Retreat experiences">
            {previewExperiences.map((exp, i) => (
              <li
                key={exp.title}
                // Shows 1, 2 or 3 cards with the next one peeking in
                className="shrink-0 basis-[90%] snap-start sm:basis-[calc((100%-1rem)/2.15)] lg:basis-[calc((100%-2rem)/3.2)]"
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line/70 bg-[#fdfcf9] can-hover:grid can-hover:aspect-[3/4] can-hover:h-auto can-hover:grid-rows-[minmax(0,1fr)_auto]">
                  <div className="relative aspect-[4/3] overflow-hidden can-hover:aspect-auto">
                    <div className="absolute inset-0">
                      {exp.video ? (
                        <CardVideo
                          sources={[
                            {
                              src: exp.video.av1,
                              type: 'video/mp4; codecs="av01.0.05M.08"',
                            },
                            { src: exp.video.mp4, type: "video/mp4" },
                          ]}
                          poster={exp.video.poster}
                          label={exp.video.label}
                          className="size-full"
                        />
                      ) : (
                        <StayGallery
                          photos={exp.photos}
                          className="size-full"
                          sizes="(min-width: 1024px) 23rem, (min-width: 640px) 47vw, 90vw"
                          imageClassName="group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
                      <span className="rounded-full border border-white/60 bg-white/90 px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.08em] text-ink backdrop-blur transition-colors duration-500 group-hover:border-lime group-hover:bg-lime">
                        {exp.tag}
                      </span>
                      <span className="font-mono text-[0.65rem] font-bold text-white drop-shadow">
                        {pad(i + 1)}
                      </span>
                    </div>
                  </div>

                  {/* Fixed card height: as the details unfold, the photo row shrinks and the title rises */}
                  <div className="p-5 sm:p-6">
                    <h3 className="font-display text-[1.35rem] leading-[1.1]">
                      {exp.title}
                    </h3>
                    <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] can-hover:grid-rows-[0fr] can-hover:group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <span
                          aria-hidden="true"
                          className="mt-4 block h-px origin-left bg-line transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] can-hover:scale-x-0 can-hover:group-hover:scale-x-100 can-hover:group-hover:delay-100"
                        />
                        <ul className="mt-4 text-sm leading-relaxed text-muted transition-[opacity,filter,translate] duration-700 ease-out can-hover:translate-y-3 can-hover:opacity-0 can-hover:blur-sm can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 can-hover:group-hover:blur-none can-hover:group-hover:delay-150">
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
