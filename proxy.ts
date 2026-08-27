import createMiddleware from "next-intl/middleware";

import { defaultLocale, locales } from "@/i18n/config";

// Locale routing for every route in the app — there's no auth-gated or
// unprefixed route tree left to special-case (this repo only ever renders
// app/[locale]/(landing)/*).
export const proxy = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|.*\\..*$).*)"],
};
