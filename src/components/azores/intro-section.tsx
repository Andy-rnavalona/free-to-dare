import Image from "next/image";

import { SparkleIcon } from "@/components/icons";
import { ReelCard } from "@/components/reel-card";
import { withBasePath } from "@/lib/base-path";
import { AZORES } from "@/components/azores/retreat";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";

const tripDetails = [
  { label: "Where", value: AZORES.island },
  { label: "When", value: AZORES.dates },
  { label: "Duration", value: AZORES.duration },
  { label: "Group size", value: `Maximum ${AZORES.groupMax} participants` },
];

export function IntroSection() {
  return (
    <section aria-labelledby="intro-title" data-reveal-group className="bg-white">
      <div className={CONTAINER}>
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-14">
          {/* Headline */}
          <div className="@container flex flex-col">
            <p data-reveal className={`${MICRO} flex items-center gap-2.5`}>
              <SparkleIcon className="size-4 text-sun" />
              São Miguel / Azores
            </p>

            {/* Sized from the column width so the longest word ("VOLCANOES")
                always fits, like the Lisbon landing */}
            <h2
              id="intro-title"
              className={`${DISPLAY} mt-8 text-[min(5rem,16cqi)] leading-[0.86]`}
            >
              <span data-reveal className="block">
                Pole
              </span>
              <span data-reveal className="block text-forest">
                Ocean
              </span>
              <span data-reveal className="block">
                Volcanoes
              </span>
              <span data-reveal className="block">
                Community
              </span>
            </h2>

            <p data-reveal className="mt-10 text-base font-semibold">
              A pole retreat in the middle of the Atlantic.
            </p>
            <p data-reveal className="mt-4 text-sm leading-relaxed text-muted">
              Train throughout the week, discover São Miguel&rsquo;s volcanic
              landscapes, swim in thermal waters, watch whales in the Atlantic
              and experience the island with a small group of people who share
              the same passion.
            </p>
          </div>

          {/* Visual — same vertical video card as the Lisbon landing */}
          <ReelCard
            poster={withBasePath("/videos/azores/sao-miguel.jpg")}
            sources={[
              {
                src: withBasePath("/videos/azores/sao-miguel.av1.mp4"),
                type: 'video/mp4; codecs="av01.0.08M.08"',
              },
              {
                src: withBasePath("/videos/azores/sao-miguel.mp4"),
                type: "video/mp4",
              },
            ]}
            label="São Miguel in motion: the crater lakes of Sete Cidades, kayaks on the water, cliff viewpoints and the black sand coast"
            caption="An island shaped by fire and ocean"
          />

          {/* Details */}
          <aside className="flex flex-col">
            <dl>
              {tripDetails.map(({ label, value }) => (
                <div
                  key={label}
                  data-reveal
                  className="flex items-baseline justify-between gap-5 border-b border-line py-3 first:pt-0"
                >
                  <dt
                    className={`${MICRO} text-[0.65rem] font-semibold text-muted`}
                  >
                    {label}
                  </dt>
                  <dd className="text-right text-sm font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            <article
              data-reveal
              className="relative mt-8 overflow-hidden rounded-3xl bg-card p-8 shadow-[0_1px_0_rgb(22_35_26/0.04)] sm:p-10"
            >
              <div className="relative flex items-center justify-between">
                <div className="relative size-16 overflow-hidden rounded-full ring-4 ring-white">
                  <Image
                    src={withBasePath("/images/owner-avatar.webp")}
                    alt="Portrait of the retreat host"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
                  Note from the organiser
                </span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                I wanted this retreat to be much more than a week of pole
                classes. São Miguel is one of those places where the landscape
                becomes part of the experience. We&rsquo;ll train together, but
                also spend the week discovering volcanic lakes, thermal waters,
                the Atlantic and some of the island&rsquo;s most beautiful places
                — without having to organise everything yourself.
              </p>
            </article>
          </aside>
        </div>
      </div>
    </section>
  );
}
