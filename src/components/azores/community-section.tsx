import { SparkleIcon } from "@/components/icons";
import { StayGallery, type Photo } from "@/components/stay-gallery";
import { withBasePath } from "@/lib/base-path";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";

/* Moments from a past retreat: the group photo first, then the video montage. */
const moments: Photo[] = [
  {
    src: withBasePath("/images/azores/community-group.webp"),
    alt: "The group in flower garlands by the pool at sunset",
  },
  {
    src: withBasePath("/videos/azores/community-poster.webp"),
    alt: "The group dancing, swimming and training together on a past retreat",
    video: {
      av1: withBasePath("/videos/azores/community.av1.mp4"),
      mp4: withBasePath("/videos/azores/community.mp4"),
      sound: true,
    },
  },
];

export function CommunitySection() {
  return (
    <section
      id="networking"
      aria-labelledby="community-title"
      data-reveal-group
      className="scroll-mt-28 bg-white"
    >
      <div
        className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16`}
      >
        <div>
          <p data-reveal className={`${MICRO} flex items-center gap-2.5`}>
            <SparkleIcon className="size-3.5 text-sun" />
            Free To Dare
          </p>

          <h2
            id="community-title"
            data-reveal
            className={`${DISPLAY} mt-8 text-[clamp(2.25rem,4.4vw,3.75rem)] text-forest`}
          >
            <span className="block">Find your people.</span>
            <span className="block text-ink">Make friends for life.</span>
          </h2>

          <div className="mt-10 max-w-xl space-y-4 text-sm leading-relaxed text-muted">
            <p data-reveal className="text-base font-semibold text-ink">
              You don&rsquo;t need to arrive with someone.
            </p>
            <p data-reveal>
              The idea behind Free To Dare is simple: travel around something you
              already love and meet people who came for the same reason.
            </p>
            <p data-reveal>
              We train together, explore together, share meals and experiences —
              while still leaving space to enjoy the holiday in your own way.
            </p>
          </div>
        </div>

        {/* On desktop the gallery leaves the flow so the text column sets the
            row height: the frame keeps the column width and is as tall as the
            text, the photos filling it (object-cover). */}
        <div data-reveal className="lg:relative lg:h-full">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-ink lg:absolute lg:inset-0 lg:mx-0 lg:aspect-auto lg:max-w-none">
            <StayGallery
              photos={moments}
              className="size-full"
              sizes="(min-width: 1024px) 32rem, 28rem"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
