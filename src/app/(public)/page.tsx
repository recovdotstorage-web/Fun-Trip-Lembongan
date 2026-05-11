import { HomePageClient } from "@/components/home/HomePageClient";
import { Metadata } from "next";
import { CONTACT_INFO } from "@/constants/contact";

export const metadata: Metadata = {
  title: "Fun Trip Lembongan — Best Nusa Lembongan Tours & Rentals",
  description: "Experience Nusa Lembongan with the most trusted local tour operator. We offer Buggy Car rentals, Scooter rentals, Snorkeling safaris, and Island tours. Book your adventure via WhatsApp today!",
  openGraph: {
    title: "Fun Trip Lembongan — Best Nusa Lembongan Tours & Rentals",
    description: "Experience Nusa Lembongan with the most trusted local tour operator. Buggy, Scooter, Snorkeling & Tours.",
    images: ["/images/hero.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Fun Trip Lembongan",
  "image": "https://funtriplembongan.com/images/hero.png",
  "@id": "https://funtriplembongan.com",
  "url": "https://funtriplembongan.com",
  "telephone": CONTACT_INFO.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Nusa Lembongan",
    "addressLocality": "Bali",
    "postalCode": "80771",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -8.6775,
    "longitude": 115.4497
  },
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
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.tripadvisor.com/",
    "https://www.google.com/maps/"
  ],
  "priceRange": "$$"
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
