"use client";

import { ThemeProvider } from "next-themes";

import { Analytics } from "@/components/analytics";
import { TailwindIndicator } from "@/components/tailwind-indicator";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // defaultTheme is "dark", not "system": the homepage (components/)
    // is art-directed as one dark composition, so a first-time visitor should
    // land there regardless of OS preference. An explicit user choice (either
    // toggle) always overrides this via localStorage.
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Analytics />
      <TailwindIndicator />
    </ThemeProvider>
  );
}
