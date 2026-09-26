import Image from "next/image";

const experiences = [
  {
    tag: "Move",
    title: "Aerial Training & Professional Photoshoot",
    image: "/images/experience-aerial.jpg",
    alt: "Aerial hoop artist balancing inside a ring in a sunny park",
    position: "object-[50%_40%]",
    items: [
      "3 Aerial Hoop classes",
      "3 Aerial Silks classes",
      "All levels · professional instruction",
      "Aerial practice photoshoot",
    ],
  },
  {
    tag: "Ocean",
    title: "Golden Hour Sunset Boat Cruise & Wine",
    image: "/images/experience-sunset-cruise.jpg",
    alt: "Sun setting over the Tagus river seen from a sailing boat",
    position: "object-[70%_50%]",
    items: [
      "Sunset boat cruise",
      "Portuguese wine",
      "Ocean views · golden hour",
    ],
  },
  {
    tag: "Explore",
    title: "Live Lisbon",
    image: "/images/experience-street.jpg",
    alt: "Yellow tram 28 climbing a cobbled street in Lisbon",
    position: "object-center",
    items: [
      "Guided walks through Lisbon",
      "Local streets and viewpoints",
      "Street photography",
      "Beyond the typical tourist route",
    ],
  },
  {
    tag: "Community",
    title: "Good people, good nights",
    image: "/images/experience-rooftop.jpg",
    alt: "Rooftop terrace overlooking the rooftops of Lisbon",
    position: "object-[35%_50%]",
    items: [
      "Rooftop dinner with the group",
      "Social evenings",
      "Shared experiences",
      "Time to connect and make new friends",
    ],
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="bg-white"
    >
      <div className="mx-auto w-full max-w-[2400px] px-5 py-24 sm:px-10 lg:px-14 lg:py-32">
        <div className="flex flex-col gap-8 border-b border-line pb-10 lg:flex-row lg:items-end lg:justify-between lg:pb-12">
          <div>
            <p className="flex items-center gap-3 font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-forest">
              Lisboa
              <span aria-hidden="true" className="h-px w-8 bg-forest" />
              Spring / Early summer
            </p>
            <h2
              id="experience-title"
              className="mt-4 font-display text-[clamp(2.75rem,6vw,7.5rem)] leading-[0.95] tracking-[-0.01em] lg:whitespace-nowrap"
            >
              <span className="block">Catch the Lisbon</span>
              <span className="block text-forest">experience</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-muted lg:mb-4">
            Move, explore, create and connect — all in one unforgettable week.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 xl:grid-cols-4">
          {experiences.map((exp, i) => (
            <li key={exp.title}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line/70 bg-[#fdfcf9] can-hover:grid can-hover:aspect-[3/4] can-hover:h-auto can-hover:grid-rows-[minmax(0,1fr)_auto]">
                <div className="relative aspect-[4/3] overflow-hidden can-hover:aspect-auto">
                  <Image
                    src={exp.image}
                    alt={exp.alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${exp.position}`}
                  />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                    <span className="rounded-full border border-white/60 bg-white/90 px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.08em] text-ink backdrop-blur transition-colors duration-500 group-hover:border-lime group-hover:bg-lime">
                      {exp.tag}
                    </span>
                    <span className="font-mono text-[0.65rem] font-bold text-white drop-shadow">
                      {pad(i + 1)}
                    </span>
                  </div>
                </div>

                {/* Fixed card height: as the details unfold, the photo row shrinks and the title rises */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-display text-[1.35rem] leading-[1.1]">
                    {exp.title}
                  </h3>
                  <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] can-hover:grid-rows-[0fr] can-hover:group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <span
                        aria-hidden="true"
                        className="mt-4 block h-px origin-left bg-line transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] can-hover:scale-x-0 can-hover:group-hover:scale-x-100 can-hover:group-hover:delay-100"
                      />
                      <ul className="mt-4 text-sm leading-relaxed text-muted transition-[opacity,filter,translate] duration-700 ease-out can-hover:translate-y-3 can-hover:opacity-0 can-hover:blur-sm can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 can-hover:group-hover:blur-none can-hover:group-hover:delay-150">
                        {exp.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
