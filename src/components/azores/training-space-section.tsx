import type { LucideIcon } from "lucide-react";
import {
  Clock,
  House,
  ShowerHead,
  User,
  Users,
  Utensils,
  Volume2,
} from "lucide-react";
import type { SVGProps } from "react";
import { StayGallery, type Photo } from "@/components/stay-gallery";
import { withBasePath } from "@/lib/base-path";
import { CONTAINER, DISPLAY, MICRO } from "@/components/azores/ui";

/** Three poles on their stages, for the "pole stages" figure */
function PolesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 3v16M12 3v16M18 3v16" />
      <path d="M4 21h4M10 21h4M16 21h4" />
    </svg>
  );
}

const PER_CLASS_MAX = 8;

const stats: { value: string; label: string; Icon: LucideIcon | typeof PolesIcon }[] = [
  { value: "5 × 90", label: "min pole classes", Icon: Clock },
  { value: "4", label: "pole stages", Icon: PolesIcon },
  { value: String(PER_CLASS_MAX), label: "participants max", Icon: Users },
  { value: "2", label: "people per pole", Icon: User },
];

const amenities: { label: string; Icon: LucideIcon }[] = [
  { label: "Indoor studio", Icon: House },
  { label: "Sound system & speakers", Icon: Volume2 },
  { label: "Kitchen on site", Icon: Utensils },
  { label: "Toilets & showers", Icon: ShowerHead },
];

/* The studio, from the poles installed for the retreat to the room itself. */
const studio: Photo[] = [
  {
    src: withBasePath("/images/azores/studio-group.jpg"),
    alt: "A group sitting together in the studio between sessions",
  },
  {
    src: withBasePath("/images/azores/studio-empty.jpg"),
    alt: "The empty studio under its timber roof, lit by side windows",
  },
];

export function TrainingSpaceSection() {
  return (
    <section
      id="training-space"
      aria-labelledby="training-space-title"
      data-reveal-group
      className="scroll-mt-28 bg-white"
    >
      <div className={CONTAINER}>
        <div
          data-reveal
          className="grid gap-8 bg-white lg:grid-cols-[1.05fr_1fr] lg:gap-12"
        >
          <StayGallery
            photos={studio}
            // On desktop, as tall as the details beside it
            className="aspect-[4/3] rounded-2xl lg:aspect-auto lg:h-full lg:min-h-[24rem]"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />

          <div className="flex flex-col justify-center lg:py-2">
            <p className={`${MICRO} text-[0.65rem] text-ink`}>The studio</p>
            <h2
              id="training-space-title"
              className={`${DISPLAY} mt-3 text-[clamp(2rem,3.4vw,3rem)] text-forest`}
            >
              Everything you need to train
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
              The retreat includes 5 × 90-minute pole classes in a private
              indoor studio. With 4 pole stages and a maximum of{" "}
              {PER_CLASS_MAX} participants per class, there are only 2 people
              per pole, giving you plenty of time to train and practise. The
              studio also has a kitchen and toilets, so everything you need is
              available on site.
            </p>

            <dl className="mt-7 grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:divide-x sm:divide-line">
              {stats.map(({ value, label, Icon }) => (
                <div key={label} className="flex items-center gap-2.5 sm:px-3 sm:first:pl-0">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest/[0.07] text-forest">
                    <Icon className="size-5" />
                  </span>
                  <div className="flex min-w-0 flex-col-reverse">
                    <dt className="mt-0.5 text-[0.6rem] font-semibold uppercase leading-tight text-muted">
                      {label}
                    </dt>
                    <dd className="font-display text-xl leading-none text-forest">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-5 xl:flex xl:gap-0 xl:divide-x xl:divide-line">
              {amenities.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-xs text-ink xl:whitespace-nowrap xl:px-3 xl:first:pl-0"
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0 text-forest" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
