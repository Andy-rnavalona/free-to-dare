import type { Metadata } from "next";
import { Suspense } from "react";
import { DEPOSIT, RETREAT, formatEuro } from "@/booking/booking-config";
import { BookingPage, BookingPageFromUrl } from "@/booking/booking.page";
import { LISBON_SHARE } from "@/lib/share-images";

export const metadata: Metadata = {
  title: `Book Your Escape — ${RETREAT.name} | Free to Dare`,
  description: `Reserve your place at the ${RETREAT.name}, ${RETREAT.dates}. Choose your stay, your payment plan, and pay securely online with a ${formatEuro(DEPOSIT)} deposit.`,
  openGraph: {
    title: `Book Your Escape — ${RETREAT.name}`,
    description: `Choose your room, choose how you pay, and secure your spot in Lisbon with a ${formatEuro(DEPOSIT)} deposit.`,
    images: LISBON_SHARE.images,
  },
  twitter: LISBON_SHARE.twitter,
};

// Static export: ?stay= / ?plan= are read in the browser; the HTML holds step 01
export default function Page() {
  return (
    <Suspense
      fallback={<BookingPage retreatId="lisbon" initialStay={null} initialPlan={null} />}
    >
      <BookingPageFromUrl retreatId="lisbon" />
    </Suspense>
  );
}
