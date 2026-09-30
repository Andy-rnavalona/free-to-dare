/*
 * FREE TO DARE — booking configuration.
 * The single source for every price, the deposit and the Stripe Payment Links,
 * used by the landing page (/) and the booking pages
 * (/booking). Change a value here and it changes everywhere.
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
  shared: 2050,
  private: 2150,
  none: 1750,
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
   Links from the payment mockup: the deposit and instalment plans all go through
   the same €500 deposit link, whatever the stay. */

export type PaymentPlan = "deposit" | "full" | "instalments";

const DEPOSIT_LINK = "https://buy.stripe.com/8x24gAcQA9ysa7zbYyg362C";

export const STRIPE_LINKS: Record<StayId, Record<PaymentPlan, string>> = {
  shared: {
    deposit: DEPOSIT_LINK,
    instalments: DEPOSIT_LINK,
    full: "https://buy.stripe.com/7sY00kcQAaCw7Zre6Gg362F",
  },
  private: {
    deposit: DEPOSIT_LINK,
    instalments: DEPOSIT_LINK,
    full: "https://buy.stripe.com/3cI7sM9EodOIfrT3s2g362E",
  },
  none: {
    deposit: DEPOSIT_LINK,
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

/** The Payment Link for a stay and plan, or null while it is still a TODO */
export function stripeLink(stay: StayId, plan: PaymentPlan) {
  const link = STRIPE_LINKS[stay][plan];
  return link.startsWith("https://") ? link : null;
}

export function formatEuro(amount: number) {
  return `€${amount.toLocaleString("en-GB")}`;
}

/** Retreat price after the plan's discount */
export function planTotal(plan: PaymentPlan, price: number) {
  return plan === "full" ? price - FULL_PAYMENT_DISCOUNT : price;
}

export function dueToday(plan: PaymentPlan, price: number) {
  return plan === "full" ? planTotal("full", price) : DEPOSIT;
}

export function remainingBalance(plan: PaymentPlan, price: number) {
  return planTotal(plan, price) - dueToday(plan, price);
}

export type ScheduledPayment = { when: string; amount: number; note: string };

export function paymentSchedule(plan: PaymentPlan, price: number): ScheduledPayment[] {
  if (plan === "full") {
    return [
      {
        when: "Today",
        amount: planTotal("full", price),
        note: `Full retreat payment (saves ${formatEuro(FULL_PAYMENT_DISCOUNT)})`,
      },
    ];
  }
  const balance = price - DEPOSIT;
  const deposit = { when: "Today", amount: DEPOSIT, note: "Booking deposit" };
  if (plan === "deposit") {
    return [deposit, { when: "Date to be confirmed", amount: balance, note: "Remaining balance" }];
  }
  // The last instalment absorbs the rounding
  const { count, dates } = INSTALMENTS;
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
