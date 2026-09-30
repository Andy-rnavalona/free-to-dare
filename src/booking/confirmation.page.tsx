"use client";

import { Check, Mail } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  RETREAT,
  dueToday,
  formatEuro,
  isPaymentPlan,
  isStayId,
  planTotal,
  remainingBalance,
} from "@/booking/booking-config";
import {
  readBookingChoice,
  type BookingChoice,
} from "@/booking/booking-storage";
import { findStay } from "@/booking/stays";

function Amount({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <dt className="label-mono text-muted-foreground">{label}</dt>
      <dd
        className={
          highlight
            ? "display-xl mt-1 inline-block rounded-md bg-accent px-2 text-2xl text-accent-foreground"
            : "display-xl mt-1 text-2xl"
        }
      >
        {value}
      </dd>
    </div>
  );
}

/** The confirmation page for the `?stay=&plan=&next=` of the URL, read in the browser (static export), inside a <Suspense> */
export function ConfirmationPageFromUrl() {
  const searchParams = useSearchParams();
  const stay = searchParams.get("stay");
  const plan = searchParams.get("plan");

  return (
    <ConfirmationPage
      // Reset when "View my booking" changes the URL
      key={searchParams.toString()}
      choice={isStayId(stay) && isPaymentPlan(plan) ? { stay, plan } : null}
      next={searchParams.get("next")}
    />
  );
}

/**
 * Where Stripe sends the customer after a successful payment.
 * The booking comes from `?stay=&plan=` when the Payment Link's redirect URL
 * carries them, otherwise from the choice saved just before leaving for Stripe.
 * `?next=<label>|<amount>` optionally shows the next payment.
 */
export function ConfirmationPage({
  choice: choiceFromUrl,
  next,
}: {
  choice: BookingChoice | null;
  next: string | null;
}) {
  const [choice, setChoice] = useState(choiceFromUrl);

  useEffect(() => {
    // sessionStorage only exists in the browser, hence after the first render
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!choiceFromUrl) setChoice(readBookingChoice());
  }, [choiceFromUrl]);

  const pkg = choice ? findStay(choice.stay) : null;
  const [nextWhen, nextAmount] = next ? next.split("|") : [];

  const search = new URLSearchParams();
  if (choice) {
    search.set("stay", choice.stay);
    search.set("plan", choice.plan);
  }
  if (next) search.set("next", next);
  const query = search.toString();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
          <span className="label-mono inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-accent-foreground">
            <Check className="size-4" /> Booking confirmed
          </span>
          <h1 className="display-xl mt-6 text-5xl md:text-7xl">
            You&apos;re coming to Lisbon.
          </h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">
            Your place at {RETREAT.name} is officially reserved.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-5 py-12 md:px-8">
        <div className="card-editorial p-6 md:p-8">
          <span className="label-mono text-muted-foreground">Booking confirmed</span>
          <h2 className="display-xl mt-2 text-3xl">{RETREAT.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{RETREAT.dates}</p>
          {pkg && choice && (
            <>
              <p className="font-display mt-6 text-xl uppercase">{pkg.title}</p>
              <dl className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                <Amount
                  label="Total retreat"
                  value={formatEuro(planTotal(choice.plan, pkg.price))}
                />
                <Amount
                  label="Paid today"
                  value={formatEuro(dueToday(choice.plan, pkg.price))}
                  highlight
                />
                <Amount
                  label="Remaining"
                  value={formatEuro(remainingBalance(choice.plan, pkg.price))}
                />
              </dl>
            </>
          )}
          {nextWhen && nextAmount && (
            <div className="mt-6 rounded-2xl border border-border bg-secondary p-5">
              <p className="label-mono text-muted-foreground">Next payment</p>
              <p className="display-xl mt-1 text-2xl">
                {nextWhen} — {formatEuro(Number(nextAmount))}
              </p>
            </div>
          )}
          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="size-4" />A confirmation email with your booking
            details is on its way.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/booking/confirmation${query ? `?${query}` : ""}`}
              className="font-display rounded-full bg-primary px-7 py-3.5 text-sm uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View my booking
            </Link>
            <Link
              href="/"
              className="font-display rounded-full border border-primary px-7 py-3.5 text-sm uppercase tracking-wide transition-colors hover:bg-secondary"
            >
              Back to Free to Dare
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
