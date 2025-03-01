import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Draftpen - Create Beautiful Visual Content",
  description: "Create beautiful screenshots, code snippets, essays, and social proof assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script 
          defer 
          src="https://umami.craftled.com/script.js" 
          data-website-id="3d9a5c0a-2b51-40f8-b105-5223c1b6bcf5"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider 
          defaultTheme="system" 
          storageKey="draftpen-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
