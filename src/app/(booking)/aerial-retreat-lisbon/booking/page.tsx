import type { Metadata } from "next";
import { Suspense } from "react";
import { DEPOSIT, RETREAT, formatEuro } from "@/booking/booking-config";
import { BookingPage, BookingPageFromUrl } from "@/booking/booking.page";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  title: `Book Your Escape — ${RETREAT.name} | Free to Dare`,
  description: `Reserve your place at the ${RETREAT.name}, ${RETREAT.dates}. Choose your stay, your payment plan, and pay securely online with a ${formatEuro(DEPOSIT)} deposit.`,
  openGraph: {
    title: `Book Your Escape — ${RETREAT.name}`,
    description: `Choose your room, choose how you pay, and secure your spot in Lisbon with a ${formatEuro(DEPOSIT)} deposit.`,
    // This openGraph replaces the root one, image included: point back to
    // app/opengraph-image.jpg (a copy in this route group is exported under
    // another name than the one in the page)
    images: {
      url: withBasePath("/opengraph-image.jpg"),
      width: 1200,
      height: 630,
      alt: "Aerial hoop pose against a black studio background — Free to Dare, Lisbon Aerial Urban Escape",
    },
  },
};

// Static export: ?stay= / ?plan= are read in the browser; the HTML holds step 01
export default function Page() {
  return (
    <Suspense fallback={<BookingPage initialStay={null} initialPlan={null} />}>
      <BookingPageFromUrl />
    </Suspense>
  );
}
