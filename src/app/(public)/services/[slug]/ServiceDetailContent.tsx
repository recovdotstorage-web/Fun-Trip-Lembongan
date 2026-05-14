"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
  Users,
} from "lucide-react";
import { formatCurrency, formatUSD } from "@/lib/utils";
import { CONTACT_INFO } from "@/constants/contact";

interface PriceTier {
  id: string;
  tierGroup: string;
  tierLabel: string;
  price: number;
  sortOrder: number;
}

interface ServiceDetailContentProps {
  activity: any;
  exchangeRate: number;
}

export default function ServiceDetailContent({ activity, exchangeRate }: ServiceDetailContentProps) {
  const primaryImage = activity.images.find((img: any) => img.isPrimary) ?? activity.images[0];
  const priceTiers: PriceTier[] = activity.priceTiers ?? [];
  const hasTiers = priceTiers.length > 0;

  // Derive unique tier groups (e.g., "4-Seater", "7-Seater")
  const tierGroups = useMemo(() => {
    const groups: string[] = [];
    priceTiers.forEach((t) => {
      if (!groups.includes(t.tierGroup)) groups.push(t.tierGroup);
    });
    return groups;
  }, [priceTiers]);

  const [selectedGroup, setSelectedGroup] = useState(tierGroups[0] ?? "");

  // Derive durations for selected group
  const groupTiers = useMemo(
    () => priceTiers.filter((t) => t.tierGroup === selectedGroup),
    [priceTiers, selectedGroup]
  );

  const [selectedTierId, setSelectedTierId] = useState(groupTiers[0]?.id ?? "");
  const [shareLabel, setShareLabel] = useState("Share");
  const [isYoutubeAvailable, setIsYoutubeAvailable] = useState<boolean | null>(null);

  // YouTube validation on front-end
  useEffect(() => {
    if (!activity.youtubeVideoId) {
      setIsYoutubeAvailable(false);
      return;
    }

    const img = new window.Image();
    img.src = `https://img.youtube.com/vi/${activity.youtubeVideoId}/mqdefault.jpg`;
    img.onload = () => {
      // YouTube returns a 120px width placeholder if the video ID is invalid
      if (img.width === 120) {
        setIsYoutubeAvailable(false);
      } else {
        setIsYoutubeAvailable(true);
      }
    };
    img.onerror = () => setIsYoutubeAvailable(false);
  }, [activity.youtubeVideoId]);

  // When group changes, reset to first duration of that group
  const handleGroupChange = (group: string) => {
    setSelectedGroup(group);
    const firstTier = priceTiers.find((t) => t.tierGroup === group);
    if (firstTier) setSelectedTierId(firstTier.id);
  };

  const activeTier = priceTiers.find((t) => t.id === selectedTierId);
  const displayPrice = hasTiers && activeTier ? activeTier.price : activity.price;

  // Build WhatsApp message
  const waMessage = useMemo(() => {
    if (hasTiers && activeTier) {
      return encodeURIComponent(
        `Hi Fun Trip Lembongan! 👋\nI'm interested in booking:\n*${activity.name}*\n\n🚗 Type: ${activeTier.tierGroup}\n⏱ Duration: ${activeTier.tierLabel}\n💰 Price: ${formatCurrency(activeTier.price)}\n\nCould you please confirm availability?`
      );
    }
    return encodeURIComponent(
      `Hi Fun Trip Lembongan! 👋\nI'm interested in booking:\n*${activity.name}*\n\nCould you please provide more details?`
    );
  }, [hasTiers, activeTier, activity.name]);

  const fadeIn: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="pt-24 lg:pt-32 pb-24 bg-[#FDFBF7]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12 flex items-center justify-between border-b border-zinc-200 pb-8"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Services
          </Link>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => {
                const url = window.location.href;
                if (navigator.share) {
                  navigator.share({
                    title: activity.name,
                    text: activity.shortDescription,
                    url: url,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(url);
                  setShareLabel("Copied!");
                  setTimeout(() => setShareLabel("Share"), 2000);
                }
              }}
              className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                {shareLabel}
              </span>
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Content */}
          <div className="lg:col-span-8">
            {/* Header Section */}
            <motion.div 
              initial="initial"
              animate="animate"
              variants={stagger}
              className="mb-12"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1.5 text-[10px] font-medium bg-zinc-900 text-white rounded-none uppercase tracking-[0.2em]">
                  {activity.category.name}
                </span>
                <div className="h-px w-12 bg-zinc-200" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                  Nusa Lembongan, Bali
                </span>
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-medium text-zinc-900 mb-8 font-(family-name:--font-outfit) leading-[1.1] tracking-tight">
                {activity.name}
              </motion.h1>
              <motion.div variants={fadeIn} className="flex flex-wrap gap-8 py-8 border-y border-zinc-100">
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
              </motion.div>
            </motion.div>

            {/* Main Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
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
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="grid grid-cols-4 sm:grid-cols-6 gap-4 mb-16"
              >
                {activity.images.map((img: any, idx: number) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative aspect-square border border-zinc-200 cursor-pointer grayscale hover:grayscale-0 transition-all"
                  >
                    <Image
                      src={img.imageUrl}
                      alt={activity.name}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Pricing Table (shown only for tiered activities) */}
            {hasTiers && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-8 flex items-center gap-4">
                  Pricing Packages <span className="h-px flex-grow bg-zinc-100" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tierGroups.map((group) => {
                    const tiers = priceTiers.filter((t) => t.tierGroup === group);
                    return (
                      <div key={group} className="border border-zinc-200 bg-white">
                        <div className="px-6 py-4 bg-zinc-900 text-white flex items-center gap-3">
                          <Users className="w-4 h-4" />
                          <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold">{group}</h3>
                        </div>
                        <div className="divide-y divide-zinc-100">
                          {tiers.map((tier) => (
                            <div key={tier.id} className="flex items-center justify-between px-6 py-4">
                              <div className="flex items-center gap-3">
                                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                                <span className="text-sm text-zinc-600 font-light">{tier.tierLabel}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-base font-medium text-zinc-900 font-(family-name:--font-outfit)">
                                  {formatCurrency(tier.price)}
                                </span>
                                <span className="block text-[11px] text-zinc-400 font-light">
                                  ≈ {formatUSD(tier.price, exchangeRate)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-8 flex items-center gap-4">
                Overview <span className="h-px flex-grow bg-zinc-100" />
              </h2>
              <div className="text-zinc-600 text-lg font-light leading-relaxed whitespace-pre-wrap max-w-none">
                {activity.description}
              </div>
            </motion.div>

            {/* YouTube Video */}
            {activity.youtubeVideoId && isYoutubeAvailable && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
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
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"
            >
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-950 text-white p-8 mb-8 border border-zinc-800"
            >
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
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="border border-zinc-900 bg-white p-8"
              >
                {/* Price Display */}
                {hasTiers ? (
                  <>
                    {/* Tier Group Selector (Buggy Type) */}
                    <div className="mb-6">
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-3">
                        Select Type
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {tierGroups.map((group) => (
                          <button
                            key={group}
                            onClick={() => handleGroupChange(group)}
                            className={`
                              px-4 py-3 text-[11px] uppercase tracking-[0.15em] font-bold transition-all border
                              ${selectedGroup === group
                                ? "bg-zinc-900 text-white border-zinc-900"
                                : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400"
                              }
                            `}
                          >
                            <Users className="w-3.5 h-3.5 mx-auto mb-1.5" />
                            {group}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Duration Selector */}
                    <div className="mb-6">
                      <label htmlFor="duration-select" className="text-[10px] text-zinc-400 uppercase tracking-widest mb-3 block">
                        Select Duration
                      </label>
                      <div className="relative group">
                        <select
                          id="duration-select"
                          value={selectedTierId}
                          onChange={(e) => setSelectedTierId(e.target.value)}
                          className="w-full appearance-none bg-white border border-zinc-200 px-5 py-4 text-[11px] uppercase tracking-[0.15em] font-bold text-zinc-900 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all cursor-pointer hover:border-zinc-400 rounded-none"
                        >
                          {groupTiers.map((tier) => (
                            <option key={tier.id} value={tier.id}>
                              {tier.tierLabel} — {formatCurrency(tier.price)}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 group-hover:text-zinc-900 transition-colors">
                          <Clock className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Active Price */}
                    <div className="mb-8 pb-6 border-b border-zinc-100">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={displayPrice}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">
                            Total Price
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-medium text-zinc-900 font-(family-name:--font-outfit)">
                              {formatCurrency(displayPrice)}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-400 mt-1 font-(family-name:--font-outfit)">
                            ≈ {formatUSD(displayPrice, exchangeRate)}
                          </p>
                          {activeTier && (
                            <p className="text-xs text-zinc-400 mt-2 font-light">
                              {activeTier.tierGroup} · {activeTier.tierLabel}
                            </p>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  /* Standard price display for non-tiered activities */
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
                    <p className="text-sm text-zinc-400 mt-1 font-(family-name:--font-outfit)">
                      ≈ {formatUSD(activity.price, exchangeRate)}
                    </p>
                  </div>
                )}

                {/* Quick Info (only for non-tiered) */}
                {!hasTiers && (
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
                )}

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-zinc-900 text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-all border border-zinc-900"
                  >
                    <Phone className="w-4 h-4" />
                    Book on WhatsApp
                  </a>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
                    Secure your spot today
                  </p>
                </div>
              </motion.div>

              {/* Trust Badge */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 border border-zinc-200 p-6 flex items-center gap-4 bg-zinc-50/50"
              >
                <div className="w-10 h-10 bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-zinc-900" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">Local Experts</p>
                  <p className="text-[10px] text-zinc-500 font-light mt-0.5">Licensed guides & operators</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
