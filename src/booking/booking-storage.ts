import { isPaymentPlan, type PaymentPlan } from "@/booking/booking-config";
import {
  findStay,
  type BookingRetreat,
  type BookingRetreatId,
} from "@/booking/retreats";

/* The last choice sent to Stripe, kept for the tab's session so the
   confirmation page can show it: several stays share the same Payment Link,
   so the Stripe redirect alone can't say which one was booked. Each retreat
   keeps its own. */

const key = (id: BookingRetreatId) => `ftd-booking-${id}`;

export type BookingChoice = { stay: string; plan: PaymentPlan };

export function saveBookingChoice(id: BookingRetreatId, choice: BookingChoice) {
  try {
    sessionStorage.setItem(key(id), JSON.stringify(choice));
  } catch {
    // Storage blocked: the confirmation page falls back to its URL
  }
}

export function readBookingChoice(
  id: BookingRetreatId,
  retreat: BookingRetreat,
): BookingChoice | null {
  try {
    const value = JSON.parse(sessionStorage.getItem(key(id)) ?? "null");
    return findStay(retreat, value?.stay) && isPaymentPlan(value?.plan)
      ? value
      : null;
  } catch {
    return null;
  }
}
