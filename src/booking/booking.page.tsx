"use client";

import { Check, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  DEPOSIT,
  FULL_PAYMENT_DISCOUNT,
  RETREAT,
  dueToday as dueTodayFor,
  formatEuro,
  planTotal,
  stripeLink,
  type PaymentPlan,
  type StayId,
} from "@/booking/booking-config";
import { saveBookingChoice } from "@/booking/booking-storage";
import { BookingSummary } from "@/booking/components/booking-summary";
import { Checkbox } from "@/booking/components/checkbox";
import { HomeSection } from "@/booking/components/home-section";
import { PaymentScheduleDialog } from "@/booking/components/payment-schedule";
import { PlanCard } from "@/booking/components/plan-card";
import { StayCard } from "@/booking/components/stay-card";
import { PLAN_LABELS, STAYS, findStay } from "@/booking/stays";

const STEPS = ["Choose your stay", "Payment plan", "Accept & pay"];

type Step = 0 | 1 | 2;

const smooth: ScrollIntoViewOptions = { behavior: "smooth", block: "start" };

/**
 * Booking page, one step at a time: 01 choose a stay → 02 choose a payment
 * plan → 03 accept the terms and pay through the matching Stripe Payment Link.
 * Choosing moves on to the next step; the step bar and the browser's Back
 * button return to an earlier one, keeping the choices made. The booking
 * summary only shows on step 03, right before paying.
 * `initialStay` / `initialPlan` come from `?stay=` / `?plan=`: a stay alone opens
 * step 02, a stay and a plan (e.g. back from a cancelled payment) open step 03.
 */
export function BookingPage({
  initialStay,
  initialPlan,
}: {
  initialStay: StayId | null;
  initialPlan: PaymentPlan | null;
}) {
  const [stay, setStay] = useState(initialStay);
  const [plan, setPlan] = useState(initialStay ? initialPlan : null);
  const [step, setStep] = useState<Step>(initialStay ? (initialPlan ? 2 : 1) : 0);
  const [accepted, setAccepted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [showError, setShowError] = useState(false);
  const content = useRef<HTMLElement>(null);
  const summary = useRef<HTMLDivElement>(null);

  const pkg = stay ? findStay(stay) : null;
  const dueToday = pkg && plan ? dueTodayFor(plan, pkg.price) : DEPOSIT;

  const reachable = (i: Step) => i === 0 || (i === 1 && !!stay) || (i === 2 && !!stay && !!plan);

  /** Shows a step and makes it a browser history entry, so Back returns to the previous one */
  function goToStep(next: Step, choice?: { stay?: StayId; plan?: PaymentPlan }) {
    if (choice?.stay) setStay(choice.stay);
    if (choice?.plan) setPlan(choice.plan);
    if (next !== step) {
      window.history.pushState({ ...window.history.state, ftdStep: next }, "");
      setStep(next);
    }
    content.current?.scrollIntoView(smooth);
  }

  // Back / forward between steps; the choices made so far are kept
  useEffect(() => {
    window.history.replaceState({ ...window.history.state, ftdStep: step }, "");
    const onPopState = (e: PopStateEvent) => {
      const target = e.state?.ftdStep;
      if (target === 0 || target === 1 || target === 2) setStep(target);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
    // Registered once; the initial entry records the step the page opened on
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Opened on step 02 or 03 (from a price card, or back from Stripe): show it,
  // and on step 03 get the terms checkbox ready
  useEffect(() => {
    if (step === 0) return;
    content.current?.scrollIntoView(smooth);
    if (step === 2) {
      const checkbox = summary.current?.querySelector<HTMLElement>('button[role="checkbox"]');
      setTimeout(() => checkbox?.focus({ preventScroll: true }), 500);
    }
    // Only on the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The URL mirrors the choice, so going back from Stripe restores it. Also run
  // on step changes: a Back between steps restores that entry's older URL.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("stay");
    url.searchParams.delete("plan");
    if (stay) url.searchParams.set("stay", stay);
    if (stay && plan) url.searchParams.set("plan", plan);
    if (url.href !== window.location.href) {
      window.history.replaceState(window.history.state, "", url);
    }
  }, [stay, plan, step]);

  // Back from Stripe through the back/forward cache: the page is live again
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setRedirecting(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  function pay() {
    if (!pkg || !plan || !accepted) {
      setShowError(true);
      return;
    }
    const link = stripeLink(pkg.id, plan);
    if (!link) {
      window.alert(
        `Online payment for this option is not available yet. Please choose the ${formatEuro(DEPOSIT)} deposit or contact us.`,
      );
      return;
    }
    saveBookingChoice({ stay: pkg.id, plan });
    setRedirecting(true);
    window.location.assign(link);
  }

  const payLabel = redirecting
    ? "Redirecting to secure payment…"
    : plan === "full"
      ? `Pay ${formatEuro(dueToday)} & confirm my booking`
      : `Pay ${formatEuro(dueToday)} & reserve my place`;

  const acceptAndPay =
    pkg && plan ? (
      <div>
        {plan === "instalments" && (
          <div className="mb-4">
            <PaymentScheduleDialog plan="instalments" total={pkg.price} />
          </div>
        )}
        <label className="flex items-start gap-3 text-sm">
          <Checkbox
            checked={accepted}
            onCheckedChange={(checked) => {
              setAccepted(checked);
              setShowError(false);
            }}
            className="mt-0.5"
          />
          <span>
            I have read and accept the{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2 hover:text-primary"
            >
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a
              href="/cancellation-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2 hover:text-primary"
            >
              Cancellation Policy
            </a>
            .
          </span>
        </label>
        <p className="mt-2 pl-9 text-xs text-muted-foreground/80">
          After booking, you will also receive the full Terms &amp; Conditions by
          email for electronic signature.
        </p>
        {showError && !accepted && (
          <p className="mt-3 text-sm text-destructive">
            Please accept the Terms &amp; Conditions to continue.
          </p>
        )}
        <button
          type="button"
          onClick={pay}
          disabled={redirecting || !accepted}
          className="font-display mt-5 w-full rounded-full bg-primary px-6 py-4 text-base uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {payLabel}
          {redirecting ? "" : " →"}
        </button>
        <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <Lock className="size-3.5 shrink-0" />
          Secure payment via our payment provider&apos;s checkout.
        </p>
      </div>
    ) : null;

  return (
    <div className="min-h-screen bg-background">

      <div className=" border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 ">
          <span className="label-mono text-muted-foreground">{RETREAT.name}</span>
          <h1 className="display-xl mt-3 text-5xl md:text-7xl">Book your escape</h1>
          <p className="font-display mt-3 text-xl uppercase text-primary">
            {RETREAT.dates}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {formatEuro(DEPOSIT)} deposit secures your place • Flexible payment
            options
          </p>
          {/* Stepper: numbered circles joined by a line, green up to the
              furthest step that can be reached. Circles sit above the lines. */}
          <ol className="mt-8 flex items-start">
            {STEPS.map((label, index) => {
              const i = index as Step;
              const current = i === step;
              // A step is done once its choice is made, even when showing an earlier one
              const done = !current && ((i === 0 && !!stay) || (i === 1 && !!plan));
              const open = reachable(i);
              return (
                <li key={label} className="relative flex flex-1 justify-center">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className={`absolute top-5 right-1/2 z-0 h-0.5 w-full -translate-y-1/2 transition-colors ${
                        open ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                  <button
                    type="button"
                    disabled={!open}
                    aria-current={current ? "step" : undefined}
                    onClick={() => goToStep(i)}
                    className="group relative z-10 flex cursor-pointer flex-col items-center gap-2 px-1 text-center disabled:cursor-not-allowed"
                  >
                    <span
                      className={`flex size-10 items-center justify-center rounded-full border-2 font-display text-lg transition-all ${
                        current
                          ? "border-primary bg-primary text-primary-foreground ring-4 ring-accent/60"
                          : done
                            ? "border-accent bg-accent text-accent-foreground group-hover:scale-105"
                            : open
                              ? "border-primary bg-background text-primary group-hover:scale-105"
                              : "border-border bg-background text-muted-foreground/70"
                      }`}
                    >
                      {done ? <Check className="size-5" /> : `0${i + 1}`}
                    </span>
                    {/* Tighter letter spacing on phones, where the three labels share one line */}
                    <span
                      className={`label-mono max-sm:tracking-widest ${
                        current ? "text-primary" : open ? "text-foreground" : "text-muted-foreground/70"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-5 md:px-8">
        <main ref={content} className="scroll-mt-24">
          {step === 0 && (
            <>
              <section id="stay" className="reveal-step scroll-mt-24">
                <span className="label-mono text-muted-foreground">01 / Your stay</span>
                <h2 className="display-xl mt-2 text-4xl md:text-5xl">
                  Choose how you want to stay
                </h2>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                  Choose the option that feels right for you. Your {formatEuro(DEPOSIT)}{" "}
                  deposit secures your place today.
                </p>
                <div className="mt-8 space-y-5">
                  {STAYS.map((option) => (
                    <StayCard
                      key={option.id}
                      pkg={option}
                      selected={stay === option.id}
                      onSelect={() => goToStep(1, { stay: option.id })}
                    />
                  ))}
                </div>
              </section>

              <HomeSection />
            </>
          )}

          {step === 1 && pkg && (
            <section className="reveal-step">
              <span className="label-mono text-muted-foreground">02 / Payment plan</span>
              <h2 className="display-xl mt-2 text-4xl md:text-5xl">
                Choose your payment plan
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                This is how much you pay and when. You&apos;ll choose your payment
                method in the final step.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <PlanCard
                  active={plan === "deposit"}
                  onSelect={() => goToStep(2, { plan: "deposit" })}
                  title={PLAN_LABELS.deposit}
                  big={`${formatEuro(DEPOSIT)} today`}
                  text="Secure your place now and pay the remaining balance later."
                  rows={[
                    ["Retreat total", formatEuro(pkg.price)],
                    ["Pay today", formatEuro(DEPOSIT)],
                    ["Remaining", formatEuro(pkg.price - DEPOSIT)],
                  ]}
                  cta="Choose deposit"
                  extra={<PaymentScheduleDialog plan="deposit" total={pkg.price} />}
                />
                <PlanCard
                  featured
                  active={plan === "full"}
                  onSelect={() => goToStep(2, { plan: "full" })}
                  badge={`Save ${formatEuro(FULL_PAYMENT_DISCOUNT)}`}
                  title={PLAN_LABELS.full}
                  strike={formatEuro(pkg.price)}
                  big={`${formatEuro(planTotal("full", pkg.price))} today`}
                  text={`Pay your retreat in full today and save ${formatEuro(FULL_PAYMENT_DISCOUNT)}.`}
                  rows={[
                    ["Standard price", formatEuro(pkg.price)],
                    ["Full payment discount", `− ${formatEuro(FULL_PAYMENT_DISCOUNT)}`],
                    ["Remaining", formatEuro(0)],
                  ]}
                  note="Nothing left to pay later."
                  cta={`Pay in full & save ${formatEuro(FULL_PAYMENT_DISCOUNT)}`}
                />
                <PlanCard
                  active={plan === "instalments"}
                  onSelect={() => goToStep(2, { plan: "instalments" })}
                  title={PLAN_LABELS.instalments}
                  big={`${formatEuro(DEPOSIT)} today`}
                  text="Reserve your place and split the remaining balance into manageable payments."
                  rows={[
                    ["Retreat total", formatEuro(pkg.price)],
                    ["Pay today", formatEuro(DEPOSIT)],
                    ["Remaining", formatEuro(pkg.price - DEPOSIT)],
                  ]}
                  note="Remaining balance paid according to the instalment schedule."
                  cta="Choose instalments"
                  extra={<PaymentScheduleDialog plan="instalments" total={pkg.price} />}
                />
              </div>
            </section>
          )}

          {step === 2 && pkg && plan && (
            <div ref={summary} className="reveal-step mx-auto max-w-xl">
              <BookingSummary
                pkg={pkg}
                dueToday={dueToday}
                plan={plan}
                planLabel={PLAN_LABELS[plan]}
              >
                {acceptAndPay}
              </BookingSummary>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
