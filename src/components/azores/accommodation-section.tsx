import Image from "next/image";
import { BackgroundVideo } from "@/components/background-video";
import { SparkleIcon } from "@/components/icons";
import { withBasePath } from "@/lib/base-path";
import { AZORES } from "@/components/azores/retreat";
import {
  CONTAINER,
  DISPLAY,
  MICRO,
  PILL_OUTLINE,
} from "@/components/azores/ui";

const amenities = [
  `${AZORES.nights} nights`,
  "Daily breakfast",
  "Swimming pool",
  "Group stay",
  "Premium setting",
];

export function AccommodationSection() {
  return (
    <section
      id="stays"
      aria-labelledby="accommodation-title"
      data-reveal-group
      className="scroll-mt-28 bg-white"
    >
      <div className={CONTAINER}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p data-reveal className={`${MICRO} flex items-center gap-2.5`}>
              <SparkleIcon className="size-3.5 text-sun" />
              Accommodation
            </p>
            <h2
              id="accommodation-title"
              data-reveal
              className={`${DISPLAY} mt-5 text-[clamp(2.5rem,5.5vw,4.25rem)] text-forest`}
            >
              <span className="block">Your Azores</span>
              <span className="block">home</span>
            </h2>
          </div>
          <p
            data-reveal
            className="max-w-md text-sm leading-relaxed text-muted lg:mb-3"
          >
            Six nights in an elegant stay designed for slowing down after days
            spent training and exploring the island.
          </p>
        </div>

        <div
          data-reveal
          className="mt-12 grid gap-3 md:grid-cols-3 md:grid-rows-2 lg:mt-14"
        >
          <div className="relative min-h-[20rem] overflow-hidden rounded-3xl bg-ink md:col-span-2 md:row-span-2">
            <BackgroundVideo
              sources={[
                {
                  src: withBasePath("/videos/azores/accommodation.webm"),
                  type: "video/webm",
                },
                {
                  src: withBasePath("/videos/azores/accommodation.mp4"),
                  type: "video/mp4",
                },
              ]}
              poster={withBasePath("/videos/azores/accommodation-poster.webp")}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          {[
            {
              src: "hotel-entrance.webp",
              alt: "Columned entrance of the historic hotel",
            },
            {
              src: "hotel-room.webp",
              alt: "Twin bedroom with a painted wall mural",
            },
            {
              src: "hotel-hall.webp",
              alt: "Grand staircase in the hotel's entrance hall",
            },
            {
              src: "hotel-room-2.webp",
              alt: "Double bedroom with a window onto the town",
            },
            {
              src: "hotel-facade.webp",
              alt: "Pink facade of the hotel at sunset",
            },
          ].map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink"
            >
              <Image
                src={withBasePath(`/images/azores/${photo.src}`)}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <p
          data-reveal
          className="mt-5 max-w-4xl text-xs leading-relaxed text-muted/80 sm:text-sm"
        >
          Accommodation reserved for retreat participants · Independently owned
          and operated by Vila Galé Collection São Miguel · Hotel imagery
          courtesy of Vila Galé.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ul data-reveal className="flex flex-wrap gap-3">
            {amenities.map((item) => (
              <li key={item} className={PILL_OUTLINE}>
                {item}
              </li>
            ))}
          </ul>
          <p data-reveal className="text-sm leading-relaxed text-muted">
            Wake up in São Miguel, share breakfast with the group and come back
            after each adventure to a comfortable place where you can rest,
            recharge and enjoy the slower rhythm of island life.
          </p>
        </div>
      </div>
    </section>
  );
}
