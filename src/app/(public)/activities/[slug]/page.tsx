import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Check,
  X,
  MapPin,
  Phone,
  Share2,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Activity Details",
    description: "View tour details, itinerary, and pricing.",
  };
}

// Sample activity data (replace with API fetch when DB is ready)
const sampleActivity = {
  name: "Snorkeling at Crystal Bay",
  slug: "snorkeling-crystal-bay",
  category: { name: "Water Sports", slug: "water-sports" },
  price: 350000,
  duration: "3 Hours",
  shortDescription:
    "Dive into crystal-clear waters and swim with colorful tropical fish and majestic manta rays.",
  description:
    "Experience the underwater paradise of Crystal Bay, one of the most spectacular snorkeling spots in Bali. Our expert guides will take you to the best spots where you can swim alongside vibrant coral reefs, colorful tropical fish, and if you're lucky, the majestic oceanic manta rays. We provide all professional-grade equipment and safety briefing before each session. This tour is suitable for all skill levels, from beginners to experienced snorkelers.",
  youtubeVideoId: null,
  itineraries: [
    {
      stepOrder: 1,
      title: "Hotel Pickup",
      description: "We pick you up from your accommodation in Lembongan.",
    },
    {
      stepOrder: 2,
      title: "Safety Briefing",
      description:
        "Quick safety briefing and equipment fitting at our base.",
    },
    {
      stepOrder: 3,
      title: "Snorkeling Session",
      description:
        "2-hour snorkeling at Crystal Bay and surrounding coral gardens.",
    },
    {
      stepOrder: 4,
      title: "Refreshments",
      description: "Enjoy fresh coconut water and local snacks on the beach.",
    },
    {
      stepOrder: 5,
      title: "Return",
      description: "Drop-off back to your accommodation.",
    },
  ],
  includes: [
    { item: "Hotel pickup & drop-off" },
    { item: "Professional snorkeling equipment" },
    { item: "Licensed guide" },
    { item: "Fresh coconut & snacks" },
    { item: "Insurance coverage" },
  ],
  excludes: [
    { item: "Personal expenses" },
    { item: "Tips (optional)" },
    { item: "Underwater camera rental" },
  ],
  images: [] as { imageUrl: string; isPrimary: boolean }[],
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default async function ActivityDetailPage() {
  const activity = sampleActivity;

  return (
    <div className="pt-20 lg:pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/activities"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Activities
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-200 via-teal-200 to-cyan-200 mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-20 h-20 text-emerald-500/30" />
              </div>
              {/* Share Button */}
              <button className="absolute top-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white transition shadow-sm">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              {/* Category */}
              <div className="absolute bottom-4 left-4">
                <span className="px-4 py-2 text-sm font-semibold bg-white/90 backdrop-blur-sm text-emerald-700 rounded-full">
                  {activity.category.name}
                </span>
              </div>
            </div>

            {/* Title & Meta */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {activity.name}
              </h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <span>{activity.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span>Nusa Lembongan</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About This Activity
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {activity.description}
              </p>
            </div>

            {/* Itinerary */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Itinerary
              </h2>
              <div className="space-y-0">
                {activity.itineraries.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">
                        {step.stepOrder}
                      </div>
                      {i < activity.itineraries.length - 1 && (
                        <div className="w-0.5 h-full bg-emerald-100 my-1" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-8">
                      <h3 className="font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Include / Exclude */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  What&apos;s Included
                </h2>
                <ul className="space-y-3">
                  {activity.includes.map((inc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{inc.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Not Included
                </h2>
                <ul className="space-y-3">
                  {activity.excludes.map((exc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-500"
                    >
                      <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span>{exc.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">
                  Price starts from
                </p>
                <p className="text-3xl font-bold text-emerald-600">
                  {formatCurrency(activity.price)}
                </p>
                <p className="text-sm text-gray-400 mt-1">per person</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                  <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Duration: {activity.duration}</span>
                </div>
              </div>

              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  `Hi, I'm interested in "${activity.name}". Can you tell me more?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                Book via WhatsApp
              </a>

              <Link
                href="/contact"
                className="w-full mt-3 inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all"
              >
                Send Inquiry
              </Link>

              <p className="text-xs text-gray-400 text-center mt-4">
                Free cancellation up to 24h before
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
