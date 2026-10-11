import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ConfirmationPage,
  ConfirmationPageFromUrl,
} from "@/booking/confirmation.page";
import { AZORES } from "@/components/azores/retreat";

export const metadata: Metadata = {
  title: `Booking confirmed — ${AZORES.name} | Free to Dare`,
  robots: { index: false },
};

// Static export: ?stay= / ?plan= / ?next= are read in the browser
export default function Page() {
  return (
    <Suspense fallback={<ConfirmationPage retreatId="azores" choice={null} next={null} />}>
      <ConfirmationPageFromUrl retreatId="azores" />
    </Suspense>
  );
}
