import type { Metadata } from "next";
import {
  Caveat,
  Cormorant_Garamond,
  Inter,
  Space_Mono,
  Work_Sans,
} from "next/font/google";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteHeader } from "@/components/site-header";
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

export const metadata: Metadata = {
  title: "Lisbon Aerial Escape",
  description:
    "A curated city escape to discover Lisbon from above during jacaranda season.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
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
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
