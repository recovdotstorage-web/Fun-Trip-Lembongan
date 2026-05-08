import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Check,
  X,
  MapPin,
  Phone,
  Share2,
} from "lucide-react";
import { activityRepo } from "@/repositories/activity.repo";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = await activityRepo.findBySlug(slug);
  if (!activity) {
    return { title: "Activity Not Found | Fun Trip Lembongan" };
  }
  return {
    title: `${activity.name} | Fun Trip Lembongan`,
    description: activity.shortDescription,
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const activity = await activityRepo.findBySlug(slug);

  if (!activity || activity.status !== "PUBLISHED") {
    notFound();
  }

  const primaryImage = activity.images.find((img) => img.isPrimary) ?? activity.images[0];

  const waMessage = encodeURIComponent(
    `Hi Fun Trip Lembongan! 👋\nI'm interested in booking:\n*${activity.name}*\n\nCould you please provide more details?`
  );

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
              {primaryImage ? (
                <Image
                  src={primaryImage.imageUrl}
                  alt={activity.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-20 h-20 text-emerald-500/30" />
                </div>
              )}

              {/* Share Button */}
              <button
                aria-label="Share this activity"
                className="absolute top-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white transition shadow-sm"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>

              {/* Category Badge */}
              <div className="absolute bottom-4 left-4">
                <span className="px-4 py-2 text-sm font-semibold bg-white/90 backdrop-blur-sm text-emerald-700 rounded-full">
                  {activity.category.name}
                </span>
              </div>
            </div>

            {/* Image gallery thumbnails */}
            {activity.images.length > 1 && (
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                {activity.images.map((img) => (
                  <div
                    key={img.id}
                    className="relative w-24 h-16 shrink-0 rounded-xl overflow-hidden border-2 border-transparent hover:border-emerald-400 transition cursor-pointer"
                  >
                    <Image
                      src={img.imageUrl}
                      alt={activity.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                ))}
              </div>
            )}

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
                  <span>Nusa Lembongan, Bali</span>
                </div>
              </div>
            </div>

            {/* YouTube Video */}
            {activity.youtubeVideoId && (
              <div className="mb-10">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${activity.youtubeVideoId}`}
                    title={`${activity.name} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div className="prose prose-gray max-w-none mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About This Activity
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {activity.description}
              </p>
            </div>

            {/* Itinerary */}
            {activity.itineraries.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Itinerary
                </h2>
                <div className="space-y-0">
                  {activity.itineraries.map((step, i) => (
                    <div key={step.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">
                          {step.stepOrder}
                        </div>
                        {i < activity.itineraries.length - 1 && (
                          <div className="w-0.5 h-full bg-emerald-100 my-1" />
                        )}
                      </div>
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
            )}

            {/* Include / Exclude */}
            {(activity.includes.length > 0 || activity.excludes.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                {activity.includes.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      What&apos;s Included
                    </h2>
                    <ul className="space-y-3">
                      {activity.includes.map((inc) => (
                        <li
                          key={inc.id}
                          className="flex items-start gap-3 text-gray-600"
                        >
                          <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{inc.item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activity.excludes.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Not Included
                    </h2>
                    <ul className="space-y-3">
                      {activity.excludes.map((exc) => (
                        <li
                          key={exc.id}
                          className="flex items-start gap-3 text-gray-500"
                        >
                          <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                          <span>{exc.item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Important Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
              <h3 className="font-semibold text-amber-800 mb-2">
                🏝️ Good to Know
              </h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• No driver&apos;s license required to ride in Nusa Lembongan</li>
                <li>• Buggy car cannot cross the bridge to Nusa Ceningan</li>
                <li>• Motor/scooter can reach Nusa Ceningan via the Yellow Bridge</li>
              </ul>
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
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Nusa Lembongan, Bali</span>
                </div>
              </div>

              <a
                href={`https://wa.me/6281234567890?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                id="book-whatsapp-btn"
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
                Free cancellation up to 24h before the tour
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
