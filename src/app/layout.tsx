import type { Metadata } from "next";
import {
  Caveat,
  Cormorant_Garamond,
  Inter,
  Space_Mono,
  Work_Sans,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Headings use Work Sans Black only, so `font-display` renders at 900
// whatever the element's font-weight (like the reference site)
const workSansBlack = Work_Sans({
  variable: "--font-work-sans-black",
  weight: "900",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500"],
  style: ["italic"],
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

// Brand-level defaults; each page (the Azores homepage, the Lisbon retreat,
// the booking pages) overrides the title and description with its own.
export const metadata: Metadata = {
  // Domain of the share image URLs (they already carry the basePath)
  metadataBase: new URL("https://freetodare.com"),
  title: "Free to Dare — Retreats for people who move",
  description:
    "Free to Dare organises pole and aerial retreats: train every day, discover a new place and share the week with a small group of people who love movement as much as you do.",
  openGraph: {
    title: "Free to Dare — Retreats for people who move",
    description:
      "Pole and aerial retreats where training, travel and community come packaged together — you just show up and enjoy the week.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Smooth scroll is for in-page "#…" links only (globals.css)
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${workSansBlack.variable} ${spaceMono.variable} ${caveat.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Arms the scroll-reveal styles before first paint, only when motion is allowed */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if("IntersectionObserver"in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.reveal=""`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
