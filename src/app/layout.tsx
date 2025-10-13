import type { Metadata } from "next";
import { maziusDisplay, ebGaramond, ubuntuMono } from "@/lib/fonts";
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${maziusDisplay.variable} ${ebGaramond.variable} ${ubuntuMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
