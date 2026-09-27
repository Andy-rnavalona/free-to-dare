import type { Metadata } from "next";
import {
  Archivo_Black,
  Caveat,
  Cormorant_Garamond,
  Hanken_Grotesk,
  Space_Mono,
} from "next/font/google";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
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
      className={`${hankenGrotesk.variable} ${archivoBlack.variable} ${spaceMono.variable} ${caveat.variable} ${cormorant.variable} h-full antialiased`}
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
