import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Fraunces } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import config from "@/config/config";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  openGraph: {
    title: config.title,
    description: config.description,
    type: "website",
  },
  twitter: {
    title: config.title,
    description: config.description,
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.className} ${fraunces.variable}`}>
      <body className="antialiased bg-[#F5F7FA] min-h-screen">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
