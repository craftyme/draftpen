import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-gray-50 min-h-screen`}
      >
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          {children}
        </main>
      </body>
    </html>
  );
}
