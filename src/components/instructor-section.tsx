import { CardVideo } from "@/components/card-video";
import { SparkleIcon } from "@/components/icons";
import { InstagramBadge, PAMELA_INSTAGRAM } from "@/components/instagram-badge";
import { withBasePath } from "@/lib/base-path";

const bio = [
  "Coming from Italy, Pamela Mariotto is an aerial dancer, performer and certified aerial instructor whose background combines dance, aerial technique and artistic expression.",
  "Pamela started dancing at the age of six and discovered aerial arts at sixteen. Since then, aerial dance has become the centre of her artistic journey, taking her from teaching and performing to appearing on Italian national television, Rai 1.",
  "During our Lisbon Retreat, Pamela will guide our Aerial Hoop & Silks classes, with a special focus on learning how to truly dance in the air.",
  "Rather than simply learning individual tricks, we will explore transitions, fluid movement and combinations on both hoop and silks, learning how to connect different elements naturally and transform them into beautiful sequences.",
];

const classes = [
  "5 Aerial Classes : Aerial Silks & Aerial Hoop",
  "1 Aerial Studio Photoshoot",
];

function ItalianFlag() {
  return (
    <svg
      viewBox="0 0 3 2"
      role="img"
      aria-label="Italy"
      className="ml-2 inline-block h-[0.3em] w-auto rounded-[0.08em] align-super"
    >
      <rect width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#f1f2f1" />
      <rect x="2" width="1" height="2" fill="#ce2b37" />
      <rect
        x="0.02"
        y="0.02"
        width="2.96"
        height="1.96"
        fill="none"
        stroke="#16231a"
        strokeOpacity="0.2"
        strokeWidth="0.04"
      />
    </svg>
  );
}

export function InstructorSection() {
  return (
    <section
      id="instructors"
      data-reveal-group
      aria-labelledby="instructors-title"
      className="bg-white"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20 lg:px-14 min-[88rem]:px-0">
        {/* Her vertical video, shown whole: on desktop as tall as the text
            column, and as wide as that height allows */}
        <div data-reveal className="lg:h-full">
          <div className="relative mx-auto aspect-[9/16] max-w-sm lg:h-full lg:max-w-none">
            <CardVideo
              sources={[
                {
                  src: withBasePath("/videos/lisbon/pamela-aerial.av1.mp4"),
                  type: 'video/mp4; codecs="av01.0.05M.08"',
                },
                {
                  src: withBasePath("/videos/lisbon/pamela-aerial.mp4"),
                  type: "video/mp4",
                },
              ]}
              poster={withBasePath("/videos/lisbon/pamela-aerial-poster.webp")}
              label="Pamela Mariotto introducing the Lisbon aerial retreat, on the hoop and silks"
              className="size-full rounded-3xl"
            />
          </div>
        </div>

        <div className="lg:pt-2">
          <p
            data-reveal
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em]"
          >
            <SparkleIcon className="size-3.5 text-[#a3bf37]" />
            Instructors
          </p>

          <div className="mt-8 flex items-start justify-between gap-4">
            <h2
              id="instructors-title"
              data-reveal
              className="font-display text-[clamp(2.5rem,4.4vw,4.75rem)] leading-[0.95] tracking-[-0.01em] xl:text-[3.5rem]"
            >
              <span className="block text-forest">
                Meet Pamela
                <ItalianFlag />
              </span>
              <span className="block text-forest">Mariotto</span>
            </h2>
            <a
              data-reveal
              href={PAMELA_INSTAGRAM.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pamela Mariotto on Instagram (opens in a new tab)"
              className="group/ig shrink-0 rounded-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-forest"
            >
              <InstagramBadge handle={PAMELA_INSTAGRAM.handle} size="sm" />
            </a>
          </div>

          <div className="mt-10 max-w-2xl space-y-3 text-sm leading-relaxed text-muted flex flex-col">
            {bio.map((paragraph) => (
              <span key={paragraph.slice(0, 32)} data-reveal>
                {paragraph}
              </span>
            ))}
          </div>

          <ul className="mt-14 grid max-w-2xl gap-6 sm:grid-cols-2">
            {classes.map((item) => (
              <li
                key={item}
                data-reveal
                className="border-t border-line pt-5 text-lg font-bold tracking-tight"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
