import Image from "next/image";
import { StudioVideo } from "@/components/studio-video";

const included = [
  "Training / studio space",
  "Sound system & speakers",
  "Changing rooms",
  "Toilets & showers",
];

export function TrainingSpaceSection() {
  return (
    <section
      id="training-space"
      aria-labelledby="training-space-title"
      data-reveal-group
      className="bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-14 min-[88rem]:px-0">
        <div className="grid gap-8   lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2
            id="training-space-title"
            data-reveal
            className="font-display text-[clamp(2.25rem,4.2vw,5.5rem)] uppercase xl:text-[3.5rem] leading-[0.92] tracking-[-0.01em] text-forest lg:whitespace-nowrap"
          >
            <span className="block">Here is your</span>
            <span className="block">Training space</span>
          </h2>
          <p
            data-reveal
            className="max-w-md text-sm leading-relaxed text-muted lg:pb-2"
          >
            A dedicated space to move, train and enjoy the retreat together.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
            <StudioVideo />
          </div>

          <div>
            <h3
              data-reveal
              className="text-[clamp(1.6rem,2.3vw,2.4rem)] xl:text-[1.85rem] font-extrabold uppercase leading-tight tracking-tight text-forest"
            >
              Everything you need to train
            </h3>
            <p
              data-reveal
              className="mt-4 max-w-xl text-sm leading-relaxed text-muted"
            >
              You’ll have your own dedicated training space at Jaya, with
              everything you need for the retreat sessions and plenty of room to
              relax between classes.
            </p>
            <ul>
              {included.map((item) => (
                <li
                  key={item}
                  data-reveal
                  className="border-b border-line py-3 text-md font-semibold text-forest"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="grid items-center gap-8 pt-10 sm:grid-cols-[minmax(0,1fr)_auto]">
              <div data-reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  Outside the studio
                </p>
                <h3 className="mt-2 text-[clamp(1.4rem,1.8vw,1.9rem)] xl:text-[1.45rem] font-extrabold uppercase leading-tight tracking-tight text-forest">
                  Garden, patio &amp; bar
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted text-sm">
                  Jaya also has a lovely outdoor garden and patio area, plus a
                  bar area with tables — perfect for relaxing, chatting and
                  spending time together between sessions.
                </p>
              </div>
              <div
                data-reveal
                className="relative aspect-square w-full overflow-hidden rounded-2xl sm:w-60 xl:w-64"
              >
                <Image
                  src="/images/garden-patio.webp"
                  alt="Guests chatting at wooden tables in the bamboo-lined courtyard patio"
                  fill
                  sizes="(min-width: 640px) 16rem, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
