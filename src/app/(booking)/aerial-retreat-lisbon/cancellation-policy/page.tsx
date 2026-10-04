import type { Metadata } from "next";
import { LegalPlaceholder } from "@/booking/legal-placeholder";

export const metadata: Metadata = {
  title: "Cancellation Policy | Free to Dare",
  robots: { index: false },
};

export default function Page() {
  return <LegalPlaceholder title="Cancellation Policy" what="cancellation policy" />;
}
