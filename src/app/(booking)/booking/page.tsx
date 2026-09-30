import type { Metadata } from "next";
import {
  DEPOSIT,
  RETREAT,
  formatEuro,
  isPaymentPlan,
  isStayId,
} from "@/booking/booking-config";
import { BookingPage } from "@/booking/booking.page";

export const metadata: Metadata = {
  title: `Book Your Escape — ${RETREAT.name} | Free to Dare`,
  description: `Reserve your place at the ${RETREAT.name}, ${RETREAT.dates}. Choose your stay, your payment plan, and pay securely online with a ${formatEuro(DEPOSIT)} deposit.`,
  openGraph: {
    title: `Book Your Escape — ${RETREAT.name}`,
    description: `Choose your room, choose how you pay, and secure your spot in Lisbon with a ${formatEuro(DEPOSIT)} deposit.`,
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ stay?: string | string[]; plan?: string | string[] }>;
}) {
  const { stay, plan } = await searchParams;
  const initialStay = isStayId(stay) ? stay : null;

  return (
    <BookingPage
      // Remounts on a new ?stay= (e.g. Back to the landing page, then another card)
      key={initialStay ?? "none-selected"}
      initialStay={initialStay}
      initialPlan={initialStay && isPaymentPlan(plan) ? plan : null}
    />
  );
}
