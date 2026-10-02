import Image from "next/image";
import { ArrowRightIcon } from "@/components/icons";
import { formatEuro } from "@/booking/booking-config";
import { withBasePath } from "@/lib/base-path";
import { AZORES, PRICING_ANCHOR } from "@/components/azores/retreat";
import {
  BUTTON_LIGHT,
  CONTAINER,
  DISPLAY,
  MICRO,
  PHOTO_OVERLAY,
} from "@/components/azores/ui";

export function FinalCtaSection() {
  return (
    <section
      id="join"
      aria-labelledby="final-cta-title"
      data-reveal-group
      className="relative scroll-mt-28 overflow-hidden bg-ink text-white"
    >
      <Image
        src={withBasePath("/images/azores/final.jpg")}
        alt="The wild north coast of São Miguel at dusk"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className={`absolute inset-0 ${PHOTO_OVERLAY}`} />

      <div
        className={`${CONTAINER} relative flex min-h-svh flex-col items-start justify-center py-16 lg:py-24`}
      >
        <h2
          id="final-cta-title"
          data-reveal
          className={`${DISPLAY} text-[13vw] leading-[0.86] sm:text-6xl lg:text-7xl xl:text-[8rem]`}
        >
          <span className="block">Ready to go</span>
          <span className="block text-sun">into the wild?</span>
        </h2>

        <p
          data-reveal
          className={`${MICRO} mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[0.65rem]`}
        >
          <span>{AZORES.dates}</span>
          <span>{AZORES.place}</span>
          <span className="text-sun">
            {formatEuro(AZORES.deposit)} deposit to reserve
          </span>
        </p>

        <div data-reveal className="mt-10">
          <a href={PRICING_ANCHOR} className={BUTTON_LIGHT}>
            Reserve your spot
            <ArrowRightIcon className="size-4" />
          </a>
        </div>

        <p data-reveal className="mt-6 text-sm text-white/80">
          Flexible payment plans available.
        </p>
      </div>
    </section>
  );
}
