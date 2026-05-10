import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { activityRepo } from "@/repositories/activity.repo";
import ServiceDetailContent from "./ServiceDetailContent";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = await activityRepo.findBySlug(slug);
  if (!activity) {
    return { title: "Service Not Found | Fun Trip Lembongan" };
  }
  return {
    title: `${activity.name} | Fun Trip Lembongan`,
    description: activity.shortDescription,
    openGraph: {
      title: `${activity.name} | Fun Trip Lembongan`,
      description: activity.shortDescription,
      images: activity.images?.[0] ? [activity.images[0].imageUrl] : ["/images/hero.png"],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const activity = await activityRepo.findBySlug(slug);

  if (!activity || activity.status !== "PUBLISHED") {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": activity.name,
    "description": activity.shortDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Fun Trip Lembongan",
      "url": "https://funtriplembongan.com"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Nusa Lembongan, Bali"
    },
    "image": activity.images?.[0] || "https://funtriplembongan.com/images/hero.png",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailContent activity={activity} />
    </>
  );
}
