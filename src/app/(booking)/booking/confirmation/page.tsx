import type { Metadata } from "next";
import { RETREAT, isPaymentPlan, isStayId } from "@/booking/booking-config";
import { ConfirmationPage } from "@/booking/confirmation.page";

export const metadata: Metadata = {
  title: `Booking confirmed — ${RETREAT.name} | Free to Dare`,
  robots: { index: false },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ stay?: string; plan?: string; next?: string }>;
}) {
  const { stay, plan, next } = await searchParams;

  return (
    <ConfirmationPage
      choice={isStayId(stay) && isPaymentPlan(plan) ? { stay, plan } : null}
      next={typeof next === "string" ? next : null}
    />
  );
}
