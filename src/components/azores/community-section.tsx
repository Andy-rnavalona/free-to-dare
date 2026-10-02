import Image from "next/image";
import { SparkleIcon } from "@/components/icons";
import { withBasePath } from "@/lib/base-path";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";

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
          className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink"
        >
          <Image
            src={withBasePath("/images/azores/community.jpg")}
            alt="The group laughing together at a Sete Cidades viewpoint"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
