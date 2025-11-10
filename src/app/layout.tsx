import type { Metadata } from "next";
import { maziusDisplay, ebGaramond, ubuntuMono } from "@/lib/fonts";
import "./globals.css";
// import { ThemeProvider } from "next-themes";
import { Providers } from "@/providers/providers";

export const metadata: Metadata = {
  title: "Raid Guild",
  description: "We are slaying Moloch, one web3 build at a time.",
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
