import Image from "next/image";
import { CardCarousel } from "@/components/card-carousel";
import { CardVideo } from "@/components/card-video";

/**
 * “Hear it from the women who came” — the same section as the Open Air page,
 * redrawn with this page's palette and typography: a pull quote, then the
 * tilted prints drifting past in the same carousel as the experiences.
 */

type Story = {
  media:
    | { kind: "photo"; src: string }
    | { kind: "video"; src: string; poster: string };
  label: string;
  /** Alternating tilts, like prints scattered on a table */
  rotation: string;
};

// The same stories as the Open Air page, drawn with this page's palette
const stories: Story[] = [
  {
    media: {
      kind: "video",
      src: "/images/stories/the-crew.mp4",
      poster: "/images/stories/the-crew-poster.jpg",
    },
    label: "The crew, on the coast",
    rotation: "-rotate-4",
  },
  {
    media: {
      kind: "video",
      src: "/images/stories/hanging-pole.mp4",
      poster: "/images/stories/hanging-pole-poster.jpg",
    },
    label: "Pole above the Atlantic",
    rotation: "rotate-3",
  },
  {
    media: { kind: "photo", src: "/images/stories/green-cliffs.avif" },
    label: "Green cliffs, all together",
    rotation: "-rotate-2",
  },
  {
    media: {
      kind: "photo",
      src: "/images/stories/pole-camp-madeira.avif",
    },
    label: "Pole Camp Madeira",
    rotation: "rotate-4",
  },
  {
    media: { kind: "photo", src: "/images/stories/boat-day.avif" },
    label: "Boat day",
    rotation: "-rotate-3",
  },
  {
    media: { kind: "photo", src: "/images/stories/fanal-forest.avif" },
    label: "Fanal forest",
    rotation: "-rotate-2",
  },
];

function StoryCard({ media, label, rotation }: Story) {
  return (
    // The padding gives the tilt and the offset plate room: the carousel
    // viewport clips whatever leaves the row
    <li className="shrink-0 px-3 py-6 md:px-5">
      <figure className={`relative w-56 md:w-60 ${rotation}`}>
        {/* Offset plate peeking out behind the print */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl bg-white shadow-md"
          style={{ transform: "translate(10px, 12px) rotate(2deg)" }}
        />

        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-line shadow-md">
          {media.kind === "photo" ? (
            <Image
              src={media.src}
              alt={label}
              fill
              sizes="15rem"
              className="object-cover"
            />
          ) : (
            <CardVideo
              sources={[{ src: media.src, type: "video/mp4" }]}
              poster={media.poster}
              label={label}
              className="size-full"
            />
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink/80 via-ink/20 to-transparent"
          />
          {/* On a video the play/sound buttons sit bottom-left, so the caption
              moves out of their way */}
          <figcaption
            className={`absolute inset-x-0 bottom-4 px-4 font-display text-base uppercase leading-tight tracking-[-0.01em] text-white md:text-lg ${
              media.kind === "video" ? "pl-24 text-right" : ""
            }`}
          >
            {label}
          </figcaption>
        </div>
      </figure>
    </li>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      data-reveal-group
      className="bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-14 min-[88rem]:px-0">
        <p
          data-reveal
          className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-forest"
        >
          <span aria-hidden="true" className="h-px w-10 bg-sand" />
          Their week, in their words
        </p>

        <h2
          id="testimonials-title"
          data-reveal
          className="mt-5 font-display text-[clamp(2.5rem,5.5vw,4.25rem)] uppercase leading-[0.95] tracking-[-0.02em] text-forest"
        >
          Hear it from
          <br />
          the women
          <br />
          who came.
        </h2>

        <blockquote
          data-reveal
          className="mt-10 max-w-3xl font-serif text-xl italic leading-relaxed text-ink md:text-2xl xl:text-2xl"
        >
          The most transformative week of my life. I arrived a stranger and left
          with a family — the city, the hoop, the women.{" "}
          <span className="inline-block  bg-sun px-3 py-1 font-display text-base uppercase not-italic tracking-[-0.01em] text-forest shadow-sm md:text-lg">
            I came home a different dancer — and a different person.
          </span>{" "}
          Every moment still lives in me.
        </blockquote>

        <p
          data-reveal
          className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted"
        >
          Marta, Porto — Lisbon retreat
        </p>

        <p
          data-reveal
          className="mt-16 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted"
        >
          More from past retreats
        </p>

        <div data-reveal className="mt-4">
          <CardCarousel label="Stories from past retreats" speed={20}>
            {stories.map((story) => (
              <StoryCard key={story.label} {...story} />
            ))}
          </CardCarousel>
        </div>
      </div>
    </section>
  );
}
