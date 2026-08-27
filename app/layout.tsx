import "@/styles/globals.css";

import { fontMono, fontSans, fontSerif } from "@/assets/fonts";

import { constructMetadata } from "@/lib/utils";
import { Providers } from "@/components/providers";

export const metadata = constructMetadata({
  title: "Velombe — Full-Stack Developer & AI Builder",
  description:
    "I architect AI systems that ship to production: real-time voice platforms, vertical SaaS, and measured AI-native delivery. Full-stack developer and AI engineer based in Istanbul.",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} bg-background min-h-screen font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
