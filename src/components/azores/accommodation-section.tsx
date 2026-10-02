import Image from "next/image";
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
            <Image
              src={withBasePath("/images/azores/pool.jpg")}
              alt="Swimming pool at the accommodation"
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          {[
            {
              src: "exterior.jpg",
              alt: "Historic exterior of the stay",
            },
            {
              src: "restaurant.jpg",
              alt: "Breakfast room of the stay",
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
