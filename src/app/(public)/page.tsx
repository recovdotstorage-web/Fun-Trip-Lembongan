import { HomePageClient } from "@/components/home/HomePageClient";
import { Metadata } from "next";
import { CONTACT_INFO } from "@/constants/contact";
import { activityRepo } from "@/repositories/activity.repo";
import { blogPostRepo } from "@/repositories/blog-post.repo";
import { testimonialRepo } from "@/repositories/testimonial.repo";
import { getIDRtoUSDRate } from "@/lib/exchange-rate";

export const metadata: Metadata = {
  title: "Fun Trip Lembongan — Best Nusa Lembongan Tours & Rentals",
  description: "Experience Nusa Lembongan with the most trusted local tour operator. We offer Buggy Car rentals, Scooter rentals, Snorkeling safaris, and Island tours. Book your adventure via WhatsApp today!",
  openGraph: {
    title: "Fun Trip Lembongan — Best Nusa Lembongan Tours & Rentals",
    description: "Experience Nusa Lembongan with the most trusted local tour operator. Buggy, Scooter, Snorkeling & Tours.",
  },
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [servicesData, blogData, testimonialsData, rate] = await Promise.all([
    activityRepo.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "asc" },
      take: 8,
    }),
    blogPostRepo.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    testimonialRepo.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    getIDRtoUSDRate(),
  ]);
  
  const { data: services } = servicesData;
  const { data: posts } = blogData;
  const { data: testimonials } = testimonialsData;

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient services={services} posts={posts} testimonials={testimonials} exchangeRate={rate} />
    </>
  );
}
