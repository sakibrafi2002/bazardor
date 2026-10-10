import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Load a Bangla-capable Google font. next/font downloads it at build time and
// self-hosts it, so there is no layout shift and no external request at runtime.
const bengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  variable: "--font-bengali", // exposes the font as a CSS variable used in globals.css
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Default SEO info shown in the browser tab and search results
export const metadata: Metadata = {
  title: {
    default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    template: "%s | বাজার দর", // pages can set their own title, this adds the suffix
  },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর, বাজারভিত্তিক দাম এবং দামের পরিবর্তন এক জায়গায়।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={bengali.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Providers>
          {/* Appears on every page */}
          <Navbar />

          {/* flex-1 makes this area grow, which pushes the footer to the bottom
        even on short pages. max-w-6xl + px = the centered container
        from the requirements. */}
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
