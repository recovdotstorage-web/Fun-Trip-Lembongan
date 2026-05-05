import type { Metadata } from "next";
import { Search, Filter, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "Browse all tours and activities in Nusa Lembongan. Snorkeling, mangrove tours, island hopping, and more.",
};

// Sample static data (replace with API fetch when DB is ready)
const sampleActivities = [
  {
    id: "1",
    name: "Snorkeling at Crystal Bay",
    slug: "snorkeling-crystal-bay",
    shortDescription:
      "Dive into crystal-clear waters and swim with colorful tropical fish and majestic manta rays at Crystal Bay.",
    price: 350000,
    duration: "3 Hours",
    categoryName: "Water Sports",
    imageUrl: null,
  },
  {
    id: "2",
    name: "Mangrove Forest Kayaking",
    slug: "mangrove-forest-kayaking",
    shortDescription:
      "Paddle through lush mangrove forests and discover the unique ecosystem of Nusa Lembongan.",
    price: 250000,
    duration: "2 Hours",
    categoryName: "Nature",
    imageUrl: null,
  },
  {
    id: "3",
    name: "Three Islands Day Trip",
    slug: "three-islands-day-trip",
    shortDescription:
      "Experience the best of Nusa Lembongan, Nusa Ceningan, and Nusa Penida in one unforgettable day.",
    price: 750000,
    duration: "Full Day",
    categoryName: "Island Hopping",
    imageUrl: null,
  },
  {
    id: "4",
    name: "Sunset Sailing Cruise",
    slug: "sunset-sailing-cruise",
    shortDescription:
      "Watch the stunning Bali sunset from a traditional jukung boat with drinks and light snacks included.",
    price: 450000,
    duration: "2.5 Hours",
    categoryName: "Cruises",
    imageUrl: null,
  },
  {
    id: "5",
    name: "Devil's Tear & Dream Beach Tour",
    slug: "devils-tear-dream-beach",
    shortDescription:
      "Visit the dramatic Devil's Tear cliff and relax on the pristine Dream Beach.",
    price: 200000,
    duration: "3 Hours",
    categoryName: "Sightseeing",
    imageUrl: null,
  },
  {
    id: "6",
    name: "Diving Experience",
    slug: "diving-experience",
    shortDescription:
      "Professional guided diving at the best spots around Nusa Lembongan. Perfect for beginners and pros.",
    price: 800000,
    duration: "4 Hours",
    categoryName: "Water Sports",
    imageUrl: null,
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function ActivitiesPage() {
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
            Our <span className="text-emerald-400">Activities</span>
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Choose from our carefully curated selection of tours and activities
            designed to make your Lembongan trip unforgettable.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-16 lg:top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm"
              />
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition text-sm font-medium text-gray-700">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {sampleActivities.map((activity) => (
              <a
                key={activity.id}
                href={`/activities/${activity.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100"
              >
                {/* Image placeholder */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-emerald-200 to-teal-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Compass className="w-16 h-16 text-emerald-600/30" />
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-xs font-semibold bg-white/90 backdrop-blur-sm text-emerald-700 rounded-full">
                      {activity.categoryName}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {activity.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {activity.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Starts from
                      </p>
                      <p className="text-lg font-bold text-emerald-600">
                        {formatCurrency(activity.price)}
                      </p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {activity.duration}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-600">
                      View Details
                    </span>
                    <span className="text-emerald-600 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
