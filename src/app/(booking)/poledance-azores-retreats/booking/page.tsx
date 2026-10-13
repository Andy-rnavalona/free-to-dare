import type { Metadata } from "next";
import { Suspense } from "react";
import { formatEuro } from "@/booking/booking-config";
import { BookingPage, BookingPageFromUrl } from "@/booking/booking.page";
import { AZORES } from "@/components/azores/retreat";
import { AZORES_SHARE } from "@/lib/share-images";

export const metadata: Metadata = {
  title: `Book Your Escape — ${AZORES.name} | Free to Dare`,
  description: `Reserve your place at ${AZORES.name}, ${AZORES.dates}. Choose your stay, your payment plan, and pay securely online with a ${formatEuro(AZORES.deposit)} deposit.`,
  openGraph: {
    title: `Book Your Escape — ${AZORES.name}`,
    description: `Choose your room, choose how you pay, and secure your spot in São Miguel with a ${formatEuro(AZORES.deposit)} deposit.`,
    images: AZORES_SHARE.images,
  },
  twitter: AZORES_SHARE.twitter,
};

// Static export: ?stay= / ?plan= are read in the browser; the HTML holds step 01
export default function Page() {
  return (
    <Suspense
      fallback={<BookingPage retreatId="azores" initialStay={null} initialPlan={null} />}
    >
      <BookingPageFromUrl retreatId="azores" />
    </Suspense>
  );
}
