import type { Metadata } from "next";
import {
  grinder,
  grinderRetalic,
  maziusDisplay,
  ubuntu,
  ubuntuMono,
} from "@/lib/fonts";
import "./globals.css";
// import { ThemeProvider } from "next-themes";
import { Providers } from "@/providers/providers";
import VercelAnalytics from "@/components/VercelAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.raidguild.org"),
  title: {
    default: "RaidGuild — Web3 Design & Development Collective",
    template: "%s | RaidGuild",
  },
  description:
    "A builder-owned collective shipping smart contracts, dApps, AI systems, and DAO tooling since 2019. Clients include Gitcoin, Gnosis, Pocket Network, and Unlock Protocol.",
  openGraph: {
    siteName: "RaidGuild",
    type: "website",
    url: "https://www.raidguild.org",
    title: "RaidGuild — Web3 Design & Development Collective",
    description:
      "A builder-owned collective shipping smart contracts, dApps, AI systems, and DAO tooling since 2019.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RaidGuild — Web3 Design & Development Collective",
    description:
      "A builder-owned collective shipping smart contracts, dApps, AI systems, and DAO tooling since 2019.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k="raidguild-theme",s=localStorage.getItem(k),t=s==="light"||s==="dark"?s:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){document.documentElement.dataset.theme="light"}})();`,
          }}
        />
        <script
          async
          src="https://plausible-production-78b3.up.railway.app/js/pa-FkymWO7gixkQ6_9ux01Qn.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};\n  plausible.init()",
          }}
        />
      </head>
      <body
        className={`${grinder.variable} ${grinderRetalic.variable} ${maziusDisplay.variable} ${ubuntu.variable} ${ubuntuMono.variable} antialiased`}
      >
        <VercelAnalytics />
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
