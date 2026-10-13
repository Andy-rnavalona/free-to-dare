import type { Metadata } from "next";
import { withBasePath } from "@/lib/base-path";

/*
 * Image shown when a retreat link is shared (WhatsApp, Facebook, X…).
 * A page that sets its own `openGraph` replaces the root one, image included,
 * so each retreat page passes its image explicitly — to Open Graph and to
 * Twitter, otherwise app/twitter-image.jpg (Lisbon) would show for every link.
 */

type ShareImage = { url: string; width: number; height: number; alt: string };

/** app/opengraph-image.jpg, exported at the root of the site */
const LISBON: ShareImage = {
  url: withBasePath("/opengraph-image.jpg"),
  width: 1200,
  height: 630,
  alt: "Aerial hoop pose against a black studio background — Free to Dare, Lisbon Aerial Urban Escape",
};

/** Crop of the hero's crater lakes (public/images/azores/hero.jpg) */
const AZORES: ShareImage = {
  url: withBasePath("/images/azores/share.jpg"),
  width: 1200,
  height: 630,
  alt: "Twin crater lakes under the clouds in São Miguel — Free to Dare, Azores Into The Wild",
};

function shareImage(image: ShareImage) {
  return {
    images: image,
    twitter: { card: "summary_large_image", images: image },
  } satisfies { images: ShareImage; twitter: Metadata["twitter"] };
}

export const LISBON_SHARE = shareImage(LISBON);
export const AZORES_SHARE = shareImage(AZORES);
