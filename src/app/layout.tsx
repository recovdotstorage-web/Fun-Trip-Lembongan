import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://funtriplembongan.com"),
  title: {
    default: "Fun Trip Lembongan — Tour & Service Nusa Lembongan",
    template: "%s | Fun Trip Lembongan",
  },
  description:
    "Discover the best tours and services in Nusa Lembongan, Bali. Snorkeling, mangrove tours, island hopping, and more. Book your adventure today!",
  keywords: [
    "Nusa Lembongan",
    "Bali tour",
    "snorkeling Lembongan",
    "island hopping Bali",
    "mangrove tour",
    "Lembongan services",
  ],
  openGraph: {
    title: "Fun Trip Lembongan — Tour & Service Nusa Lembongan",
    description:
      "Discover the best tours and services in Nusa Lembongan, Bali.",
    type: "website",
    locale: "id_ID",
  },
};

import { LoadingProvider } from "@/components/ui/LoadingProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
