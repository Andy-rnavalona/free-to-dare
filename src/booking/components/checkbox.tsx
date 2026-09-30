"use client";

import { Check } from "lucide-react";

/** Checkbox styled like the mockup's. A <button>, so a wrapping <label> toggles it too. */
export function Checkbox({
  checked,
  onCheckedChange,
  className = "",
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      onClick={() => onCheckedChange(!checked)}
      className={`peer grid h-4 w-4 shrink-0 cursor-pointer place-content-center rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ${className}`}
    >
      {checked && (
        <span className="grid place-content-center text-current">
          <Check className="h-4 w-4" />
        </span>
      )}
    </button>
  );
}
