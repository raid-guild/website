import { EB_Garamond, Ubuntu_Mono } from "next/font/google";
import localFont from "next/font/local";

// Primary Display Font - Mazius Display
export const maziusDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/MAZIUSREVIEW20.09-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/MAZIUSREVIEW20.09-Regular.woff",
      weight: "450",
      style: "normal",
    },
    {
      path: "../../public/fonts/MAZIUSREVIEW20.09-Regular.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

// Secondary Body Font - EB Garamond
export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});
