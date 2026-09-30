import type { Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Oswald } from "next/font/google";
import { SiteHeader } from "@/components/site-header";

import "./booking.css";

// Light only: also opts out of the dark mode some mobile browsers force on pages
export const viewport: Viewport = {
  colorScheme: "only light",
};

// Fonts of the payment mockup, used through the classes in booking.css
const oswald = Oswald({
  variable: "--font-bk-display",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-bk-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-bk-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`ftd-booking-root ${oswald.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
    >
      {/* Same header as the landing page; it is fixed, so this keeps its room */}
      <SiteHeader />
      <div aria-hidden="true" className="h-18 lg:h-20" />
      {children}
    </div>
  );
}
