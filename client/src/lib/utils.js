import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

// All the utlity functions

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
