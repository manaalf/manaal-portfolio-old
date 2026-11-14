import type { Metadata } from "next";
// Geist ships as an npm package, so the fonts are bundled with the site
// (no request to Google Fonts at load time, and the build works offline).
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://manaal-portfolio.vercel.app"),
  title: "Manaal Fatima — Analytics & AI Strategy",
  description:
    "Manaal Fatima, business analyst with an MS in Business Analytics from UC Irvine. Case studies in consulting, machine learning, and applied AI.",
  openGraph: {
    title: "Manaal Fatima — Analytics & AI Strategy",
    description: "Case studies in consulting, machine learning, and applied AI.",
    images: ["/photo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
