import Image from "next/image";
import { SparkleIcon } from "@/components/icons";
import { withBasePath } from "@/lib/base-path";
import {
  CONTAINER,
  DISPLAY,
  MICRO,
  PHOTO_OVERLAY,
} from "@/components/azores/ui";

export function PhotoshootSection() {
  return (
    <section
      id="photoshoot"
      aria-labelledby="photoshoot-title"
      data-reveal-group
      className="relative scroll-mt-28 overflow-hidden bg-ink text-white"
    >
      <Image
        src={withBasePath("/images/azores/photoshoot.jpg")}
        alt="Pole photoshoot on the volcanic coast of São Miguel"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className={`absolute inset-0 ${PHOTO_OVERLAY}`} />

      <div
        className={`${CONTAINER} relative flex min-h-[80vh] flex-col justify-end py-16 lg:py-24`}
      >
        <p data-reveal className={`${MICRO} flex items-center gap-2.5`}>
          <SparkleIcon className="size-3.5 text-sun" />
          Photoshoot included
        </p>

        <h2
          id="photoshoot-title"
          data-reveal
          className={`${DISPLAY} mt-6 text-[clamp(2.5rem,7vw,5.5rem)]`}
        >
          <span className="block">Create something</span>
          <span className="block text-sun">to remember</span>
        </h2>

        <div className="mt-8 max-w-xl space-y-4 text-sm leading-relaxed text-white/85 sm:text-base">
          <p data-reveal>
            One professional photoshoot is included in the retreat.
          </p>
          <p data-reveal>
            The exact location will be selected closer to the retreat depending
            on weather and local conditions — allowing us to choose the setting
            that works best for the experience.
          </p>
        </div>
      </div>
    </section>
  );
}
