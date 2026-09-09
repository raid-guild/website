import { Ubuntu_Mono } from "next/font/google";
import localFont from "next/font/local";

// Afacad Flux, self-hosted with its SIL Open Font License.
export const afacadFlux = localFont({
  src: "../../public/fonts/AfacadFlux-Variable.ttf",
  weight: "100 1000",
  style: "normal",
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
