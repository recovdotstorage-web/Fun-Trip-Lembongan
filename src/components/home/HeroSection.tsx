"use client";

import { Phone, Star, ChevronDown } from "lucide-react";
import Image from "next/image";

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
        />
        {/* Stronger gradient for readability on wide screens */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      </div>

      {/* Hero Content — centered, max-width capped for balance */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-start lg:items-start justify-center h-full">
        <div className="max-w-2xl xl:max-w-3xl">

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            Explore{" "}
            <span className="text-sky-400">Nusa<br className="hidden sm:block" /> Lembongan</span>{" "}
            Your Way
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-200/90 mb-10 max-w-xl font-light leading-relaxed">
            Buggy Cars, Scooter Rentals, Snorkeling Safaris & Island Tours — all
            booked directly via WhatsApp. No apps. No hassle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#services"
              className="bg-[#005b96] hover:bg-[#004a7a] text-white px-8 py-4 font-bold text-base lg:text-lg transition-all shadow-lg hover:shadow-blue-900/30 flex items-center justify-center gap-2 text-center"
            >
              View All Services
            </a>
            <button
              onClick={() =>
                onWaClick(
                  "Hello Funtrip Lembongan, I want to ask about your services."
                )
              }
              className="bg-[#25D366] hover:bg-[#1ebe57] text-white px-8 py-4 font-bold text-base lg:text-lg transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" /> WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
