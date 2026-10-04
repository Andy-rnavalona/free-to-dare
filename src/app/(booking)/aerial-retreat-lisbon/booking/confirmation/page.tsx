import type { Metadata } from "next";
import { Suspense } from "react";
import { RETREAT } from "@/booking/booking-config";
import {
  ConfirmationPage,
  ConfirmationPageFromUrl,
} from "@/booking/confirmation.page";

export const metadata: Metadata = {
  title: `Booking confirmed — ${RETREAT.name} | Free to Dare`,
  robots: { index: false },
};

// Static export: ?stay= / ?plan= / ?next= are read in the browser
export default function Page() {
  return (
    <Suspense fallback={<ConfirmationPage choice={null} next={null} />}>
      <ConfirmationPageFromUrl />
    </Suspense>
  );
}
