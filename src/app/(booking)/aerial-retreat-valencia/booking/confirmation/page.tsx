import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ConfirmationPage,
  ConfirmationPageFromUrl,
} from "@/booking/confirmation.page";
import { VALENCIA } from "@/components/valencia/retreat";

export const metadata: Metadata = {
  title: `Booking confirmed — ${VALENCIA.name} | Free to Dare`,
  robots: { index: false },
};

// Static export: ?stay= / ?plan= / ?next= are read in the browser
export default function Page() {
  return (
    <Suspense fallback={<ConfirmationPage retreatId="valencia" choice={null} next={null} />}>
      <ConfirmationPageFromUrl retreatId="valencia" />
    </Suspense>
  );
}
