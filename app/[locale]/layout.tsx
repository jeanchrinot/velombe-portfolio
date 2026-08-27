import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import "@/styles/globals.css";

import { fontMono, fontSans, fontSerif } from "@/assets/fonts";

import { locales, type Locale } from "@/i18n/config";
import { constructMetadata } from "@/lib/utils";
import { Providers } from "@/components/providers";

export const metadata = constructMetadata({
  title: "Velombe — Full-Stack Developer & AI Builder",
  description:
    "I architect AI systems that ship to production: real-time voice platforms, vertical SaaS, and measured AI-native delivery. Full-stack developer and AI engineer based in Istanbul.",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} bg-background min-h-screen font-sans antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
