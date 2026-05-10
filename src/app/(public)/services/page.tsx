import type { Metadata } from "next";
import { activityRepo } from "@/repositories/activity.repo";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Our Services | Fun Trip Lembongan",
  description:
    "Explore our premium tours and activities in Nusa Lembongan. From snorkeling to buggy car rentals, we provide the best island experiences.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const { data: services } = await activityRepo.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "asc" },
    take: 50,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://funtriplembongan.com/services/${service.slug}`,
      "name": service.name,
      "description": service.shortDescription,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesContent services={services} />
    </>
  );
}
