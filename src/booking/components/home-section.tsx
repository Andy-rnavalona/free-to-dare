import Image from "next/image";
import { HOME_GALLERY } from "@/booking/stays";

// TODO: placeholder from the payment mockup — replace with the accommodation's Instagram
const HOME_INSTAGRAM = "https://instagram.com";

export function HomeSection() {
  // Same shape as the landing page: one tall photo, two beside it, three below
  const [main, ...others] = HOME_GALLERY;
  const side = others.slice(0, 2);
  const strip = others.slice(2);

  return (
    <section className="mt-20">
      <span className="label-mono text-muted-foreground">Where you sleep</span>
      <h2 className="display-xl mt-2 text-4xl md:text-5xl">Your Lisbon home</h2>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        A restored townhouse above the rooftops: a rooftop terrace for sunset, a
        big shared living room, breakfast on the patio, and an aerial studio with
        river light.
      </p>
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {/* From md up the tall photo takes the height of the two rows beside it,
            instead of setting it from its own ratio and stretching them */}
        <div className="relative h-72 md:h-auto">
          <Image
            src={main.src}
            alt={main.alt}
            fill
            sizes="(min-width: 1280px) 610px, (min-width: 768px) 50vw, 100vw"
            className="rounded-sm object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {side.map((photo) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={1024}
              height={768}
              sizes="(min-width: 1280px) 300px, (min-width: 768px) 25vw, 50vw"
              className="h-40 w-full rounded-sm object-cover md:h-full"
            />
          ))}
        </div>
      </div>
      {strip.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {strip.map((photo) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={1024}
              height={768}
              sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 33vw"
              className="h-28 w-full rounded-sm object-cover md:h-44"
            />
          ))}
        </div>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="#stay"
          className="font-display rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View accommodation
        </a>
        <a
          href={HOME_INSTAGRAM}
          target="_blank"
          rel="noreferrer"
          className="font-display rounded-full border border-primary px-6 py-3 text-sm uppercase tracking-wide transition-colors hover:bg-secondary"
        >
          View their Instagram
        </a>
      </div>
    </section>
  );
}
