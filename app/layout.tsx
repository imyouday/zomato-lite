import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zomato Lite",
  description: "Write a review. See the restaurant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-10 border-b border-[#EBEBEB] bg-white/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-[560px] items-center justify-between px-4 py-3 sm:px-6">
            <Link
              href="/"
              className="text-xl font-bold italic tracking-tight text-[#E23744] transition-opacity hover:opacity-80"
            >
              zomato
              <span className="ml-1 text-sm font-semibold not-italic text-[#4F4F4F]">
                lite
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-[#4F4F4F]">
              <Link href="/restaurant/1" className="transition-colors hover:text-[#E23744]">
                Restaurant
              </Link>
              <Link
                href="/review/1"
                className="rounded-full bg-[#E23744] px-4 py-1.5 text-white transition-colors hover:bg-[#C02432]"
              >
                Write a review
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}