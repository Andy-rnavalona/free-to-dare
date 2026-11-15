import type { Metadata } from "next";
import { Suspense } from "react";
import { formatEuro } from "@/booking/booking-config";
import { BookingPage, BookingPageFromUrl } from "@/booking/booking.page";
import { VALENCIA } from "@/components/valencia/retreat";
import { VALENCIA_SHARE } from "@/lib/share-images";

export const metadata: Metadata = {
  title: `Book Your Escape — ${VALENCIA.name} | Free to Dare`,
  description: `Reserve your place at the ${VALENCIA.name}, ${VALENCIA.dates}. Choose your stay, your payment plan, and pay securely online with a ${formatEuro(VALENCIA.deposit)} deposit.`,
  openGraph: {
    title: `Book Your Escape — ${VALENCIA.name}`,
    description: `Choose your stay, choose how you pay, and secure your spot in Valencia with a ${formatEuro(VALENCIA.deposit)} deposit.`,
    images: VALENCIA_SHARE.images,
  },
  twitter: VALENCIA_SHARE.twitter,
};

// Static export: ?stay= / ?plan= are read in the browser; the HTML holds step 01
export default function Page() {
  return (
    <Suspense
      fallback={<BookingPage retreatId="valencia" initialStay={null} initialPlan={null} />}
    >
      <BookingPageFromUrl retreatId="valencia" />
    </Suspense>
  );
}
