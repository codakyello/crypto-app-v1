import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer"; // Default import
import GeometricBackground from "@/app/components/layout/GeometricBackground";
import { Providers } from "@/app/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const august = localFont({
  src: "./font/August-Bold.ttf",
  variable: "--font-heading",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Alpha Coin | Real-World Utility",
  description: "The premium tokenized access platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${august.variable} antialiased flex flex-col min-h-screen bg-black text-white selection:bg-primary selection:text-black`}
      >
        <GeometricBackground />
        <Providers>
          <Navbar />
          <main className="grow relative z-10 w-full">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
