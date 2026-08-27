import { Figtree, Fira_Code, Lora, Poppins } from "next/font/google";
// export const fontSans = Poppins({
//   weight: ["100", "300", "500", "600", "900"],
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

// export const fontUrban = Urbanist({
//   subsets: ["latin"],
//   variable: "--font-urban",
// })

// export const fontHeading = localFont({
//   src: "./CalSans-SemiBold.woff2",
//   variable: "--font-heading",
// })

export const fontSans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});
