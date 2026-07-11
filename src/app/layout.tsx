import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SessionProvider from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.luoleagueofnations.com"),
  title: {
    default: "Luo League of Nations",
    template: "%s · Luo League of Nations",
  },
  description: "Preserving and sharing the rich cultural heritage and history of the Luo people",
  openGraph: {
    title: "Luo League of Nations",
    description: "Preserving and sharing the rich cultural heritage and history of the Luo people",
    url: "https://www.luoleagueofnations.com",
    siteName: "Luo League of Nations",
    type: "website",
  },
  icons: {
    icon: "/LLNLOGO.svg",
    shortcut: "/LLNLOGO.svg",
    apple: "/LLNLOGO.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID || ''} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
