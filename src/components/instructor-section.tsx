import Image from "next/image";
import { InstagramIcon, SparkleIcon } from "@/components/icons";

const bio = [
  "Coming from Italy, Pamela Mariotto is an aerial dancer, performer and certified aerial instructor whose background combines dance, aerial technique and artistic expression.",
  "Pamela started dancing at the age of six and discovered aerial arts at sixteen. Since then, aerial dance has become the centre of her artistic journey, taking her from teaching and performing to appearing on Italian national television, Rai 1.",
  "During our Lisbon Retreat, Pamela will guide our Aerial Hoop & Silks classes, with a special focus on learning how to truly dance in the air.",
  "Rather than simply learning individual tricks, we will explore transitions, fluid movement and combinations on both hoop and silks, learning how to connect different elements naturally and transform them into beautiful sequences.",
  "Step by step, we’ll bring these movements together into longer combos and choreography, working with music, flow and personal expression.",
  "The goal is to leave the retreat not only with new aerial skills, but with the ability to connect them, move between them and create an actual dance in the air.",
];

const classes = ["3 Aerial Silks Classes", "3 Aerial Hoop Classes"];

function ItalianFlag() {
  return (
    <svg
      viewBox="0 0 3 2"
      role="img"
      aria-label="Italy"
      className="ml-3 inline-block h-[0.62em] w-auto -translate-y-[0.08em] rounded-[0.08em] align-baseline"
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
      aria-labelledby="instructors-title"
      className="bg-white"
    >
      <div className="mx-auto grid w-full max-w-[2400px] gap-12 px-5 pb-24 pt-4 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20 lg:px-14 lg:pb-32 lg:pt-8">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <a
            href="https://www.instagram.com/pamela_aerialist/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pamela Mariotto on Instagram (opens in a new tab)"
            className="group relative block aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-ink outline-offset-4 focus-visible:outline-2 focus-visible:outline-forest"
          >
            <Image
              src="/images/pamela-aerial-silks.jpg"
              alt="Pamela Mariotto performing a split on white aerial silks against a clear blue sky"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[50%_45%] transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Instagram badge: the handle slides out to the left of the icon on hover */}
            <span className="absolute right-6 top-6 flex items-center rounded-full p-1 transition-colors duration-500 ease-out group-hover:bg-ink/40 group-hover:backdrop-blur-md group-focus-visible:bg-ink/40 group-focus-visible:backdrop-blur-md sm:right-8 sm:top-8">
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold text-white opacity-0 transition-all duration-500 ease-out group-hover:mx-3 group-hover:max-w-40 group-hover:opacity-100 group-focus-visible:mx-3 group-focus-visible:max-w-40 group-focus-visible:opacity-100">
                @pamela_aerialist
              </span>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-forest shadow-sm">
                <InstagramIcon className="size-5" />
              </span>
            </span>
          </a>
        </div>

        <div className="lg:pt-2">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em]">
            <SparkleIcon className="size-3.5 text-[#a3bf37]" />
            Instructors
          </p>

          <h2
            id="instructors-title"
            className="mt-8 text-[clamp(2.5rem,4.4vw,4.75rem)] font-medium leading-[1.05] tracking-tight"
          >
            <span className="block">Meet Pamela</span>
            <span className="block text-ink/45">
              Mariotto
              <ItalianFlag />
            </span>
          </h2>

          <div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-muted">
            {bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-14 grid max-w-2xl gap-6 sm:grid-cols-2">
            {classes.map((item) => (
              <li
                key={item}
                className="border-t border-line pt-5 text-xl font-bold tracking-tight"
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
