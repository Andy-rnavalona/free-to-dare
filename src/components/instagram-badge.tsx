import { InstagramIcon } from "@/components/icons";

export const PAMELA_INSTAGRAM = {
  url: "https://www.instagram.com/pamela_aerialist/",
  handle: "@pamela_aerialist",
};

/**
 * White Instagram button whose handle slides out to its left.
 * The animation is driven by the closest `group/ig` ancestor (hover or keyboard focus),
 * so the caller decides what triggers it: a whole card or just the badge.
 */
export function InstagramBadge({
  handle,
  size = "md",
}: {
  handle: string;
  size?: "sm" | "md";
}) {
  return (
    <span className="flex items-center rounded-full p-1 transition-colors duration-500 ease-out group-hover/ig:bg-ink/40 group-hover/ig:backdrop-blur-md group-focus-visible/ig:bg-ink/40 group-focus-visible/ig:backdrop-blur-md">
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold text-white opacity-0 transition-all duration-500 ease-out group-hover/ig:mx-3 group-hover/ig:max-w-40 group-hover/ig:opacity-100 group-focus-visible/ig:mx-3 group-focus-visible/ig:max-w-40 group-focus-visible/ig:opacity-100">
        {handle}
      </span>
      <span
        className={`grid shrink-0 place-items-center rounded-full bg-white text-forest shadow-sm ${
          size === "sm" ? "size-10" : "size-12"
        }`}
      >
        <InstagramIcon className={size === "sm" ? "size-[1.1rem]" : "size-5"} />
      </span>
    </span>
  );
}
