import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "GUISOGA",
  description: "Voyez plus loin, ensemble.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Le ?v=4 force le navigateur à rafraîchir l'icône immédiatement */}
        <link rel="icon" href="/favicon.ico?v=4" />
        <link rel="apple-touch-icon" href="/icon-192.png?v=4" />
        <link rel="manifest" href="/manifest.json?v=4" />
        <meta name="theme-color" content="#d4af37" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}