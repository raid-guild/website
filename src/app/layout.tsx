import type { Metadata } from "next";
import { maziusDisplay, ebGaramond, ubuntuMono } from "@/lib/fonts";
import "./globals.css";
// import { ThemeProvider } from "next-themes";
import { Providers } from "@/providers/providers";
import Fathom from "@/components/Fathom";

export const metadata: Metadata = {
  title: "Raid Guild",
  description: "Elite Raiders Conquering the Web3 Realm. Legendary design, development, and consulting. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${maziusDisplay.variable} ${ebGaramond.variable} ${ubuntuMono.variable} antialiased`}
      >
        <Fathom />
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        > */}
        <Providers>{children}</Providers>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
