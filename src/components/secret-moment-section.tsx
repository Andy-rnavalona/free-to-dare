const bondingMoments = [
  { text: "sunset cliff drinks after hike" },
  { text: "night under the stars", note: "no phones moment" },
  { text: "“jump together” moments", note: "literally or metaphorically" },
];

export function SecretMomentSection() {
  return (
    <section
      aria-labelledby="secret-moment-title"
      data-reveal-group
      className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-10 lg:px-14 lg:py-32 xl:px-0"
    >
      <div className="mx-auto grid max-w-[53rem] gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-7">
        <article
          data-reveal
          className="flex flex-col rounded-2xl bg-[linear-gradient(135deg,#2e4a38_0%,#22362a_100%)] px-8 py-10 text-white shadow-[0_24px_48px_-28px_rgb(22_35_26/0.6)] sm:px-11 sm:py-12"
        >
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-sun">
            Pillar three
          </p>
          <h2
            id="secret-moment-title"
            className="mt-3 font-display text-[clamp(1.9rem,3.6vw,2.4rem)] uppercase leading-[1.08]"
          >
            There’s a secret moment in every trip
          </h2>

          <div className="mt-8 space-y-3 text-[0.95rem] text-white/90">
            <p>Unexpected location.</p>
            <p>Surprise drivers.</p>
            <p className="font-serif text-lg italic text-white/75">
              Exactly what you don’t see coming.
            </p>
          </div>

          <p className="mt-8 text-sm text-white/60">Not revealed here.</p>

          <p className="mt-6 -rotate-2 self-start font-script text-xl text-sun">
            we stayed longer than expected →
          </p>
        </article>

        <article
          data-reveal
          className="flex flex-col rounded-2xl bg-white px-8 py-10 shadow-[0_16px_40px_-20px_rgb(22_35_26/0.35)] sm:px-8 sm:py-11 md:my-1.5"
        >
          <h3 className="font-display text-[1.45rem] uppercase leading-[1.1] text-forest">
            Bonding
            <br />
            through
            <br />
            experience
          </h3>

          <ul className="mt-6 space-y-3 text-sm text-ink">
            {bondingMoments.map(({ text, note }) => (
              <li key={text}>
                <span aria-hidden="true">→ </span>
                {text}
                {note && (
                  <span className="italic text-muted/80"> ({note})</span>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-6 -rotate-1 self-start font-script text-lg text-forest">
            real chemical bond here
          </p>
        </article>
      </div>
    </section>
  );
}
