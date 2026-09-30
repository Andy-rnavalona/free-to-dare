import type { ReactNode } from "react";
import {
  FULL_PAYMENT_DISCOUNT,
  RETREAT,
  formatEuro,
  remainingBalance,
  type PaymentPlan,
} from "@/booking/booking-config";
import type { StayPackage } from "@/booking/stays";

/** "Your booking" card: the stay, the plan and what is due today */
export function BookingSummary({
  pkg,
  dueToday,
  plan,
  planLabel,
  children,
}: {
  pkg: StayPackage;
  dueToday: number;
  plan: PaymentPlan | null;
  planLabel?: string;
  children?: ReactNode;
}) {
  const full = plan === "full";
  const remaining = plan ? remainingBalance(plan, pkg.price) : pkg.price - dueToday;

  return (
    <aside className="card-editorial p-6">
      <span className="label-mono text-muted-foreground">Your booking</span>
      <h3 className="display-xl mt-2 text-2xl">{RETREAT.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{RETREAT.datesShort}</p>
      <div className="mt-5 border-t border-border pt-5">
        <p className="font-display text-xl uppercase leading-none">{pkg.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">1 guest</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {planLabel && (
            <p className="label-mono inline-block rounded-full bg-secondary px-3 py-1">
              {planLabel}
            </p>
          )}
          {full && (
            <p className="label-mono inline-block rounded-full bg-accent px-3 py-1 text-accent-foreground">
              You save {formatEuro(FULL_PAYMENT_DISCOUNT)}
            </p>
          )}
        </div>
      </div>
      <dl className="mt-5 space-y-3 border-t border-border pt-5">
        <div className="flex items-center justify-between">
          <dt className="label-mono text-muted-foreground">Total retreat price</dt>
          <dd className="font-display text-lg">{formatEuro(pkg.price)}</dd>
        </div>
        {full && (
          <div className="flex items-center justify-between">
            <dt className="label-mono text-muted-foreground">Full payment discount</dt>
            <dd className="font-display text-lg text-primary">
              − {formatEuro(FULL_PAYMENT_DISCOUNT)}
            </dd>
          </div>
        )}
        <div className="flex items-center justify-between rounded-2xl bg-accent px-4 py-3 text-accent-foreground">
          <dt className="label-mono">Due today</dt>
          <dd className="display-xl text-2xl">{formatEuro(dueToday)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="label-mono text-muted-foreground">Remaining balance</dt>
          <dd className="font-display text-lg">{formatEuro(remaining)}</dd>
        </div>
      </dl>
      {children && <div className="mt-5 border-t border-border pt-5">{children}</div>}
    </aside>
  );
}
