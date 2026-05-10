"use client";

import { Phone } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onWaClick: (message?: string) => void;
}

export function HeroSection({ onWaClick }: HeroSectionProps) {
  return (
    <section className="relative pt-20 h-[90vh] min-h-[640px] flex flex-col items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Nusa Lembongan Beach"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Subtle, warmer gradient for the editorial feel */}
        <div className="absolute inset-0 bg-zinc-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/20" />
      </div>

      {/* Hero Content — centered, max-width capped for balance */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-start lg:items-start justify-center h-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl xl:max-w-3xl"
        >

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.05] tracking-tight mb-6">
            Explore{" "}
            <span className="font-semibold">Nusa<br className="hidden sm:block" /> Lembongan</span>{" "}
            Your Way
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl lg:text-2xl text-zinc-200 mb-10 max-w-xl font-light leading-relaxed">
            Buggy Cars, Scooter Rentals, Snorkeling Safaris & Island Tours — all
            booked directly via WhatsApp. No apps. No hassle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#services"
              className="bg-white text-zinc-900 hover:bg-zinc-100 px-8 py-4 font-medium tracking-wide text-base lg:text-lg transition-colors flex items-center justify-center gap-2 text-center"
            >
              View All Services
            </a>
            <button
              onClick={() =>
                onWaClick(
                  "Hello Funtrip Lembongan, I want to ask about your services."
                )
              }
              className="bg-zinc-900/40 backdrop-blur-md border border-white/20 hover:bg-zinc-900/60 text-white px-8 py-4 font-medium tracking-wide text-base lg:text-lg transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" /> WhatsApp Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
