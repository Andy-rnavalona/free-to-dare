/*
 * FREE TO DARE — booking configuration.
 * The single source for every price, the deposit and the Stripe Payment Links
 * of the Lisbon retreat, used by its landing page and its booking pages, and
 * the payment plan arithmetic every retreat's booking page shares (the Azores
 * one is set in retreats.ts). Change a value here and it changes everywhere.
 *
 * No Stripe secret key belongs in this site: Payment Links are public URLs.
 */

export const RETREAT = {
  name: "Lisbon Aerial Urban Escape",
  dates: "5–11 June 2027",
  datesShort: "5–11 Jun 2027",
};

/* ─── Prices (EUR) ─── */

/** Booking deposit, paid today with the deposit and instalment plans */
export const DEPOSIT = 500;

/** Taken off the retreat price when it is paid in full today */
export const FULL_PAYMENT_DISCOUNT = 50;

/** Price per person for each stay. The keys are also the `?stay=` values of the booking page. */
export const STAY_PRICES = {
  shared: 1870,
  private: 1970,
  none: 1490,
} as const;

export type StayId = keyof typeof STAY_PRICES;

/** The remaining balance of the instalment plan is split over these payments */
export const INSTALMENTS = {
  count: 3,
  dates: ["Date to be confirmed", "Date to be confirmed", "Date to be confirmed"],
};

/* ─── Stripe Payment Links ───
   One link per stay and payment plan. A missing link must stay a "TODO" string:
   the booking page then refuses to redirect and asks to contact us instead.
   Links from the payment mockup: the instalment plan goes through the €500
   deposit link, whatever the stay. The deposit-only plan is not offered: you
   pay in full or in instalments. */

export type PaymentPlan = "deposit" | "full" | "instalments";

const DEPOSIT_LINK = "https://buy.stripe.com/8x24gAcQA9ysa7zbYyg362C";

export const STRIPE_LINKS: Record<StayId, Partial<Record<PaymentPlan, string>>> = {
  shared: {
    instalments: DEPOSIT_LINK,
    full: "https://buy.stripe.com/7sY00kcQAaCw7Zre6Gg362F",
  },
  private: {
    instalments: DEPOSIT_LINK,
    full: "https://buy.stripe.com/3cI7sM9EodOIfrT3s2g362E",
  },
  none: {
    instalments: DEPOSIT_LINK,
    full: "https://buy.stripe.com/8x2bJ2g2Mh0U3Jb6Eeg362D",
  },
};

/* ─── Helpers ─── */

export const STAY_IDS = Object.keys(STAY_PRICES) as StayId[];
export const PAYMENT_PLANS: PaymentPlan[] = ["deposit", "full", "instalments"];

/** Lowest stay price, for the "From €…" labels */
export const PRICE_FROM = Math.min(...Object.values(STAY_PRICES));

export function isStayId(value: unknown): value is StayId {
  return typeof value === "string" && value in STAY_PRICES;
}

export function isPaymentPlan(value: unknown): value is PaymentPlan {
  return PAYMENT_PLANS.includes(value as PaymentPlan);
}

export function formatEuro(amount: number) {
  return `€${amount.toLocaleString("en-GB")}`;
}

/** What the payment plans of one retreat are worked out from */
export type Pricing = {
  deposit: number;
  fullPaymentDiscount: number;
  instalments: { count: number; dates: string[] };
};

/** The Lisbon retreat's pricing, as the constants above set it */
export const LISBON_PRICING: Pricing = {
  deposit: DEPOSIT,
  fullPaymentDiscount: FULL_PAYMENT_DISCOUNT,
  instalments: INSTALMENTS,
};

/** Retreat price after the plan's discount */
export function planTotal(pricing: Pricing, plan: PaymentPlan, price: number) {
  return plan === "full" ? price - pricing.fullPaymentDiscount : price;
}

export function dueToday(pricing: Pricing, plan: PaymentPlan, price: number) {
  return plan === "full" ? planTotal(pricing, "full", price) : pricing.deposit;
}

export function remainingBalance(pricing: Pricing, plan: PaymentPlan, price: number) {
  return planTotal(pricing, plan, price) - dueToday(pricing, plan, price);
}

export type ScheduledPayment = { when: string; amount: number; note: string };

export function paymentSchedule(
  pricing: Pricing,
  plan: PaymentPlan,
  price: number,
): ScheduledPayment[] {
  if (plan === "full") {
    return [
      {
        when: "Today",
        amount: planTotal(pricing, "full", price),
        note: `Full retreat payment (saves ${formatEuro(pricing.fullPaymentDiscount)})`,
      },
    ];
  }
  const balance = price - pricing.deposit;
  const deposit = { when: "Today", amount: pricing.deposit, note: "Booking deposit" };
  if (plan === "deposit") {
    return [deposit, { when: "Date to be confirmed", amount: balance, note: "Remaining balance" }];
  }
  // The last instalment absorbs the rounding
  const { count, dates } = pricing.instalments;
  const instalment = Math.round(balance / count);
  const last = balance - instalment * (count - 1);
  return [
    deposit,
    ...dates.map((when, i) => ({
      when,
      amount: i === count - 1 ? last : instalment,
      note: i === count - 1 ? "Final payment" : `Instalment ${i + 1} of ${count}`,
    })),
  ];
}
