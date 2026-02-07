import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";

import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Robert Damiano | Senior Platform Engineer",
    template: "%s | Robert Damiano",
  },
  description: "Senior platform engineer focused on AWS-first IaC, delivery automation, and observability.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="min-h-dvh">
            <SiteHeader />
            <main className="mx-auto w-full max-w-5xl px-4 py-10">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

