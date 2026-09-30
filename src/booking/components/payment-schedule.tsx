"use client";

import {
  formatEuro,
  paymentSchedule,
  type PaymentPlan,
} from "@/booking/booking-config";
import { Dialog } from "@/booking/components/dialog";

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="label-mono text-muted-foreground">{label}</span>
      <span
        className={
          highlight
            ? "rounded-md bg-accent px-2 py-0.5 font-display text-lg text-accent-foreground"
            : "font-display text-lg"
        }
      >
        {value}
      </span>
    </div>
  );
}

/** "View payment schedule" link and the dialog listing each payment */
export function PaymentScheduleDialog({
  plan,
  total,
  triggerLabel = "View payment schedule",
}: {
  plan: PaymentPlan;
  total: number;
  triggerLabel?: string;
}) {
  const schedule = paymentSchedule(plan, total);
  const today = schedule[0].amount;

  return (
    <Dialog
      trigger={(open) => (
        <button
          type="button"
          onClick={(e) => {
            // Opening the schedule must not select the plan card around it
            e.stopPropagation();
            open();
          }}
          onKeyDown={(e) => e.stopPropagation()}
          className="label-mono underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-primary"
        >
          {triggerLabel}
        </button>
      )}
      className="max-w-lg gap-4 rounded-3xl p-6 sm:max-w-lg sm:rounded-lg"
      title={(titleId) => (
        <div className="flex flex-col space-y-1.5 text-left">
          <h2
            id={titleId}
            className="display-xl text-3xl font-semibold leading-none tracking-tight"
          >
            Your payment schedule
          </h2>
        </div>
      )}
    >
      <ol className="mt-2 divide-y divide-border border-y border-border">
        {schedule.map((payment, i) => (
          <li key={i} className="flex items-baseline justify-between gap-4 py-4">
            <div>
              <p className="font-display text-lg uppercase leading-none">
                {payment.when}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{payment.note}</p>
            </div>
            <span className="display-xl text-2xl">{formatEuro(payment.amount)}</span>
          </li>
        ))}
      </ol>
      <div className="mt-2 space-y-2 rounded-2xl bg-secondary p-4">
        <Row label="Total retreat price" value={formatEuro(total)} />
        <Row label="Paid today" value={formatEuro(today)} highlight />
        <Row label="Remaining balance" value={formatEuro(total - today)} />
      </div>
    </Dialog>
  );
}
