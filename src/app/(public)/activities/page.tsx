import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { activityRepo } from "@/repositories/activity.repo";
import { ActivityCard } from "@/components/shared/ActivityCard";

export const metadata: Metadata = {
  title: "Tours & Activities | Fun Trip Lembongan",
  description:
    "Browse all tours and activities in Nusa Lembongan. Snorkeling, buggy car, motor rental, island tour, and more.",
};

export const revalidate = 60; // revalidate every 60s

export default async function ActivitiesPage() {
  const { data: activities } = await activityRepo.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "asc" },
    take: 50,
  });

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Banner */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-emerald-300 text-sm font-medium mb-6">
            <Compass className="w-4 h-4" />
            <span>Discover Lembongan</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white">
            Tours &amp; <span className="text-emerald-400">Activities</span>
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Choose from our carefully curated selection of tours and activities
            designed to make your Lembongan trip unforgettable.
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activities.length === 0 ? (
            <div className="text-center py-24">
              <Compass className="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-500">
                No activities available yet
              </h2>
              <p className="mt-2 text-gray-400">
                Check back soon — exciting activities are coming!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  name={activity.name}
                  slug={activity.slug}
                  shortDescription={activity.shortDescription}
                  price={activity.price}
                  duration={activity.duration}
                  imageUrl={activity.images[0]?.imageUrl}
                  categoryName={activity.category.name}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
