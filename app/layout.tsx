// Minimal passthrough — html/body are defined in the locale-specific layouts:
//   app/[locale]/layout.tsx  (marketing + docs, locale from URL)
//   app/(app)/layout.tsx     (auth + protected, locale from NEXT_LOCALE cookie)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
