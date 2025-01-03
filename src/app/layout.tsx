import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "DraftPen - Beautiful Essays",
  description: "Share your thoughts in beautifully crafted essays",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="antialiased bg-[#F5F7FA] min-h-screen">{children}</body>
    </html>
  );
}
