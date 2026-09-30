import type { Metadata } from "next";
import { LegalPlaceholder } from "@/booking/legal-placeholder";

export const metadata: Metadata = {
  title: "Terms & Conditions | Free to Dare",
  robots: { index: false },
};

export default function Page() {
  return <LegalPlaceholder title="Terms & Conditions" what="terms and conditions" />;
}
