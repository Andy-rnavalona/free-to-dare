"use client";

import type { ReactNode } from "react";

/** One payment plan of step 02; the whole card selects it */
export function PlanCard({
  active,
  onSelect,
  title,
  big,
  text,
  rows,
  extra,
  badge,
  strike,
  note,
  cta,
  featured,
}: {
  active: boolean;
  onSelect: () => void;
  title: string;
  big: string;
  text: string;
  rows: [string, string][];
  extra?: ReactNode;
  badge?: string;
  strike?: string;
  note?: string;
  cta: string;
  featured?: boolean;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`card-editorial relative flex cursor-pointer flex-col p-6 ${
        featured && !active ? "border-primary/50 shadow-lg md:-translate-y-1" : ""
      } ${active ? "card-selected" : "hover:border-primary/40"}`}
    >
      {badge && (
        <span className="font-display absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-sm uppercase tracking-wide text-accent-foreground shadow">
          {badge}
        </span>
      )}
      <div className="flex items-start justify-between gap-2">
        <p className="font-display text-base uppercase leading-tight">{title}</p>
        {active && (
          <span className="label-mono rounded-full bg-primary px-2.5 py-1 text-primary-foreground">
            Selected
          </span>
        )}
      </div>
      {strike && (
        <p className="font-display mt-4 text-lg text-muted-foreground line-through decoration-2">
          {strike}
        </p>
      )}
      <p className={`display-xl text-3xl text-primary ${strike ? "mt-0" : "mt-4"}`}>
        {big}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      <dl className="mt-5 space-y-2 border-t border-border pt-4">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="font-display">{value}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-3 text-xs text-muted-foreground">{note}</p>}
      {extra && <div className="mt-4">{extra}</div>}
      <div className="mt-auto pt-5">
        <span
          className={`font-display block w-full rounded-full px-4 py-3 text-center text-sm uppercase tracking-wide transition-colors ${
            active || featured
              ? "bg-primary text-primary-foreground"
              : "border border-primary text-primary"
          }`}
        >
          {active ? "✓ " : ""}
          {cta}
        </span>
      </div>
    </div>
  );
}
