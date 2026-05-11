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

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://funtriplembongan.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Fun Trip Lembongan - Best Tours & Snorkeling Nusa Lembongan",
    template: "%s | Fun Trip Lembongan",
  },
  description:
    "Experience the ultimate Nusa Lembongan adventure with Fun Trip Lembongan. We offer premium snorkeling tours, mangrove explorations, island hopping, and surfing lessons. Book your Bali paradise trip today!",
  keywords: [
    "Nusa Lembongan tours",
    "Snorkeling Nusa Lembongan",
    "Mangrove tour Lembongan",
    "Island hopping Bali",
    "Best tour guide Lembongan",
    "Lembongan surfing lessons",
    "Nusa Penida day trip from Lembongan",
    "Fun Trip Lembongan",
  ],
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Fun Trip Lembongan — Best Tours & Snorkeling Nusa Lembongan",
    description: "Discover premium snorkeling, mangrove tours, and island hopping in Nusa Lembongan. Book your Bali adventure today!",
    url: baseUrl,
    siteName: "Fun Trip Lembongan",
    images: [
      {
        url: `${baseUrl}/images/hero.png`,
        width: 1200,
        height: 630,
        alt: "Fun Trip Lembongan - Nusa Lembongan Adventures",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fun Trip Lembongan — Best Tours & Snorkeling Nusa Lembongan",
    description: "Discover premium snorkeling, mangrove tours, and island hopping in Nusa Lembongan.",
    images: [`${baseUrl}/images/hero.png`],
  },
};

import { LoadingProvider } from "@/components/ui/LoadingProvider";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Fun Trip Lembongan",
              "image": `${baseUrl}/images/hero.png`,
              "@id": baseUrl,
              "url": baseUrl,
              "telephone": "+6281234567890", // Placeholder, check if real one exists later
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Nusa Lembongan",
                "addressLocality": "Klungkung",
                "addressRegion": "Bali",
                "postalCode": "80771",
                "addressCountry": "ID"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -8.6757,
                "longitude": 115.4468
              },
              "description": "Premium tours and snorkeling services in Nusa Lembongan, Bali.",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "08:00",
                "closes": "17:00"
              },
              "sameAs": [
                "https://www.instagram.com/funtriplembongan"
              ]
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <LoadingProvider>
          {children}
          <Analytics />
        </LoadingProvider>
      </body>
    </html>
  );
}
