"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Same logic as components/layout/mode-toggle.tsx (the site's existing
 * light/dark control), restyled to this folder's own idiom instead of the
 * shared shadcn Button — sized to match the hamburger button beside it.
 */
export function ModeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "relative inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--v-line)] text-[var(--v-faint)] transition-colors hover:text-[var(--v-fg)]",
        className,
      )}
    >
      <Sun
        className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        strokeWidth={1.5}
      />
      <Moon
        className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        strokeWidth={1.5}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
