import { SparkleIcon } from "@/components/icons";
import { StayGallery, type Photo } from "@/components/stay-gallery";
import { withBasePath } from "@/lib/base-path";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";

/* Moments from a past retreat, led by the video montage. */
const moments: Photo[] = [
  {
    src: withBasePath("/videos/azores/community-poster.webp"),
    alt: "The group dancing, swimming and training together on a past retreat",
    video: {
      av1: withBasePath("/videos/azores/community.av1.mp4"),
      mp4: withBasePath("/videos/azores/community.mp4"),
      sound: true,
    },
  },
  {
    src: withBasePath("/images/azores/community-group.webp"),
    alt: "The group in flower garlands by the pool at sunset",
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
        className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}
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

        <div
          data-reveal
          className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-ink lg:max-w-lg"
        >
          <StayGallery
            photos={moments}
            className="aspect-[4/5]"
            sizes="(min-width: 1024px) 32rem, 28rem"
          />
        </div>
      </div>
    </section>
  );
}
