"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Check,
  X,
  MapPin,
  Phone,
  Share2,
  Calendar,
  Info,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

interface ActivityDetailClientProps {
  activity: any; // Using any for brevity here, should ideally be typed
}

export default function ActivityDetailClient({ activity }: ActivityDetailClientProps) {
  const primaryImage = activity.images.find((img: any) => img.isPrimary) ?? activity.images[0];

  const waMessage = encodeURIComponent(
    `Hi Fun Trip Lembongan! 👋\nI'm interested in booking:\n*${activity.name}*\n\nCould you please provide more details?`
  );

  return (
    <div className="pt-24 lg:pt-32 pb-24 bg-[#FDFBF7]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-12 flex items-center justify-between border-b border-zinc-200 pb-8"
        >
          <Link
            href="/#services"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
          <div className="flex items-center gap-6">
            <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:col-span-8"
          >
            {/* Header Section */}
            <motion.div variants={fadeUp} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1.5 text-[10px] font-medium bg-zinc-900 text-white rounded-none uppercase tracking-[0.2em]">
                  {activity.category.name}
                </span>
                <div className="h-px w-12 bg-zinc-200" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                  Nusa Lembongan, Bali
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-medium text-zinc-900 mb-8 font-(family-name:--font-outfit) leading-[1.1] tracking-tight">
                {activity.name}
              </h1>
              <div className="flex flex-wrap gap-8 py-8 border-y border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-zinc-50 border border-zinc-200">
                    <Clock className="w-4 h-4 text-zinc-900" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-0.5">Duration</p>
                    <p className="text-sm font-medium text-zinc-900">{activity.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-zinc-50 border border-zinc-200">
                    <MapPin className="w-4 h-4 text-zinc-900" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-0.5">Location</p>
                    <p className="text-sm font-medium text-zinc-900">Jungutbatu, Lembongan</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-zinc-50 border border-zinc-200">
                    <Calendar className="w-4 h-4 text-zinc-900" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-0.5">Availability</p>
                    <p className="text-sm font-medium text-zinc-900">Daily Departure</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Image */}
            <motion.div 
              variants={fadeUp}
              className="relative aspect-video border border-zinc-200 mb-8 overflow-hidden grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
            >
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
                <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-zinc-300" />
                </div>
              )}
            </motion.div>

            {/* Gallery Thumbnails */}
            {activity.images.length > 1 && (
              <motion.div variants={fadeUp} className="grid grid-cols-4 sm:grid-cols-6 gap-4 mb-16">
                {activity.images.map((img: any) => (
                  <div
                    key={img.id}
                    className="relative aspect-square border border-zinc-200 cursor-pointer grayscale hover:grayscale-0 transition-all"
                  >
                    <Image
                      src={img.imageUrl}
                      alt={activity.name}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                ))}
              </motion.div>
            )}

            {/* Description */}
            <motion.div variants={fadeUp} className="mb-20">
              <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-8 flex items-center gap-4">
                Overview <span className="h-px flex-grow bg-zinc-100" />
              </h2>
              <div className="text-zinc-600 text-lg font-light leading-relaxed whitespace-pre-wrap max-w-none">
                {activity.description}
              </div>
            </motion.div>

            {/* YouTube Video */}
            {activity.youtubeVideoId && (
              <motion.div variants={fadeUp} className="mb-20">
                <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-8 flex items-center gap-4">
                  Visual Experience <span className="h-px flex-grow bg-zinc-100" />
                </h2>
                <div className="relative aspect-video border border-zinc-200 grayscale-[0.2] hover:grayscale-0 transition-all duration-500">
                  <iframe
                    src={`https://www.youtube.com/embed/${activity.youtubeVideoId}`}
                    title={`${activity.name} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            )}

            {/* Itinerary */}
            {activity.itineraries.length > 0 && (
              <motion.div variants={fadeUp} className="mb-20">
                <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-10 flex items-center gap-4">
                  Itinerary <span className="h-px flex-grow bg-zinc-100" />
                </h2>
                <div className="space-y-0 border-l border-zinc-200 ml-5">
                  {activity.itineraries.map((step: any) => (
                    <div key={step.id} className="relative pl-12 pb-12 last:pb-0">
                      <div className="absolute -left-[13px] top-0 w-6 h-6 bg-white border-2 border-zinc-900 flex items-center justify-center font-bold text-[10px]">
                        {step.stepOrder}
                      </div>
                      <h3 className="text-lg font-medium text-zinc-900 mb-3 font-(family-name:--font-outfit)">
                        {step.title}
                      </h3>
                      <p className="text-sm text-zinc-500 font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Include / Exclude */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              {activity.includes.length > 0 && (
                <div className="border border-zinc-200 p-8">
                  <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-8">
                    Inclusions
                  </h2>
                  <ul className="space-y-4">
                    {activity.includes.map((inc: any) => (
                      <li key={inc.id} className="flex items-start gap-4 text-zinc-600">
                        <Check className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                        <span className="text-sm font-light">{inc.item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activity.excludes.length > 0 && (
                <div className="border border-zinc-200 p-8">
                  <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-8">
                    Exclusions
                  </h2>
                  <ul className="space-y-4">
                    {activity.excludes.map((exc: any) => (
                      <li key={exc.id} className="flex items-start gap-4 text-zinc-400">
                        <X className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="text-sm font-light italic">{exc.item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Good to Know */}
            <motion.div variants={fadeUp} className="bg-zinc-950 text-white p-8 mb-8 border border-zinc-800">
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-5 h-5 text-zinc-400" />
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold">Good to Know</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light text-zinc-400">
                <li className="flex items-start gap-3">
                  <span className="text-zinc-600">•</span>
                  <span>No driver&apos;s license required to ride in Nusa Lembongan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-600">•</span>
                  <span>Buggy car cannot cross the bridge to Nusa Ceningan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-600">•</span>
                  <span>Motor/scooter can reach Nusa Ceningan via the Yellow Bridge</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-600">•</span>
                  <span>Always bring sunscreen and swimwear for snorkeling tours</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column: Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="sticky top-32">
              <div className="border border-zinc-900 bg-white p-8">
                <div className="mb-8 pb-8 border-b border-zinc-100">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
                    Premium Experience
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-medium text-zinc-900 font-(family-name:--font-outfit)">
                      {formatCurrency(activity.price)}
                    </span>
                    <span className="text-xs text-zinc-400 uppercase tracking-widest font-light">
                      / Person
                    </span>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <Clock className="w-4 h-4 text-zinc-900 mt-1" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Time</p>
                      <p className="text-sm font-medium text-zinc-900">{activity.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-4 h-4 text-zinc-900 mt-1" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Location</p>
                      <p className="text-sm font-medium text-zinc-900">Pickup Available</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/6281234567890?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-zinc-900 text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-all border border-zinc-900"
                  >
                    <Phone className="w-4 h-4" />
                    Book on WhatsApp
                  </a>
                  <Link
                    href="/#contact"
                    className="w-full flex items-center justify-center px-8 py-5 bg-transparent text-zinc-900 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-50 transition-all border border-zinc-200"
                  >
                    Send Inquiry
                  </Link>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
                    Secure your spot today
                  </p>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 border border-zinc-200 p-6 flex items-center gap-4 bg-zinc-50/50">
                <div className="w-10 h-10 bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-zinc-900" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">Local Experts</p>
                  <p className="text-[10px] text-zinc-500 font-light mt-0.5">Licensed guides & operators</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
