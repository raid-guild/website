import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import localFont from "next/font/local";

// Display face of the Venture Beyond design. Grinder ships a single weight
// (usWeightClass 500), so the 100-900 range maps every requested weight onto
// the one real cut and stops browsers from synthesising a faux bold.
export const grinder = localFont({
  src: [
    {
      path: "../../public/fonts/grinder/Grinder-Regular.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/grinder/Grinder-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-grinder",
  display: "swap",
});

// Retalic is Grinder's reverse-italic cut. Figma ships it as its own family
// ("Grinder Retalic"), so it cannot be reached through font-style and needs a
// variable of its own rather than a synthetic skew.
export const grinderRetalic = localFont({
  src: [
    {
      path: "../../public/fonts/grinder/Grinder-Retalic.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-grinder-retalic",
  display: "swap",
});

// Legacy display face, still used by the pre-redesign pages.
// Primary Display Font - Mazius Display
export const maziusDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/MAZIUSREVIEW20.09-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/MaziusDisplay-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

// Secondary Body Font - EB Garamond (bundled to keep production builds deterministic)
export const ebGaramond = localFont({
  src: [
    {
      path: "../../public/fonts/EBGaramond-VariableFont_wght.ttf",
      weight: "400 800",
      style: "normal",
    },
    {
      path: "../../public/fonts/EBGaramond-Italic-VariableFont_wght.ttf",
      weight: "400 800",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

export const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

// Figma's supporting/body face. Kept separate from the display fallback so the
// hierarchy remains stable when the proprietary Grinder family is unavailable.
export const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});
