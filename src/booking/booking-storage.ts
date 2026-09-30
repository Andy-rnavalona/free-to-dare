import {
  isPaymentPlan,
  isStayId,
  type PaymentPlan,
  type StayId,
} from "@/booking/booking-config";

/* The last choice sent to Stripe, kept for the tab's session so the
   confirmation page can show it: several stays share the same Payment Link,
   so the Stripe redirect alone can't say which one was booked. */

const KEY = "ftd-booking";

export type BookingChoice = { stay: StayId; plan: PaymentPlan };

export function saveBookingChoice(choice: BookingChoice) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(choice));
  } catch {
    // Storage blocked: the confirmation page falls back to its URL
  }
}

export function readBookingChoice(): BookingChoice | null {
  try {
    const value = JSON.parse(sessionStorage.getItem(KEY) ?? "null");
    return isStayId(value?.stay) && isPaymentPlan(value?.plan) ? value : null;
  } catch {
    return null;
  }
}
