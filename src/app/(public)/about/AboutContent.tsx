"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  Star,
  Shield,
  Car,
  Bike,
  Waves,
  Compass,
  ArrowRight,
} from "lucide-react";

// --- High-End Animation Config ---
const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: springTransition
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    }
  }
};

// --- Data ---
const values = [
  {
    icon: Heart,
    title: "Locally Owned",
    desc: "Born and raised in Nusa Lembongan. We love our island and we want you to love it too.",
  },
  {
    icon: Shield,
    title: "Safe & Reliable",
    desc: "All activities come with proper safety briefings and well-maintained equipment.",
  },
  {
    icon: Users,
    title: "Personal Service",
    desc: "We treat every guest like family. Direct communication via WhatsApp.",
  },
  {
    icon: Star,
    title: "Best Experience",
    desc: "We know every hidden gem, sunset spot, and local secret — so you don't miss a thing.",
  },
];

const services = [
  {
    icon: Car,
    name: "Buggy Car Rental",
    desc: "Explore the island in style. No driver's license required! Note: Buggy cannot cross to Nusa Ceningan.",
  },
  {
    icon: Bike,
    name: "Motor / Scooter Rental",
    desc: "Freedom to roam. Reach Nusa Ceningan via the iconic Yellow Bridge. No license needed in Lembongan.",
  },
  {
    icon: Waves,
    name: "Snorkeling",
    desc: "Swim with tropical fish, turtles, and manta rays in the crystal-clear waters.",
  },
  {
    icon: Compass,
    name: "Island Tour",
    desc: "A guided full-day or half-day tour covering the best spots on Nusa Lembongan and Nusa Ceningan.",
  },
];

export default function AboutContent() {
  return (
    <div className="bg-[#FDFBF7] selection:bg-zinc-900 selection:text-white overflow-hidden font-sans text-zinc-900">
      
      {/* Editorial Split Hero Section */}
      <section className="relative min-h-[100dvh] pt-32 pb-24 flex items-center">
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Typography Left */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="w-full lg:w-1/2 z-10"
            >
              <motion.div variants={fadeUpVariants} className="flex items-center gap-3 mb-8">
                <span className="w-8 h-[1px] bg-zinc-900"></span>
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-zinc-900">Our Story</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeUpVariants} 
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-[family-name:var(--font-outfit)] font-medium tracking-tight leading-[1.05] text-zinc-950 mb-8"
              >
                Managed by local island experts.
              </motion.h1>
              
              <motion.p 
                variants={fadeUpVariants} 
                className="text-lg sm:text-xl text-zinc-600 leading-relaxed font-normal max-w-lg mb-12"
              >
                Deeply rooted in the tides of Nusa Lembongan, we curate experiences that honor our heritage and showcase our home.
              </motion.p>
              
              <motion.div variants={fadeUpVariants}>
                <Link 
                  href="/activities"
                  className="group relative inline-flex items-center gap-3 bg-zinc-950 text-white rounded-full px-8 py-4 font-medium transition-all duration-300 hover:bg-zinc-800 active:scale-[0.98]"
                >
                  <span>Plan your trip</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Asset Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-zinc-200 relative shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                <img 
                  src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=1200&auto=format&fit=crop" 
                  alt="Nusa Lembongan Coastline" 
                  className="w-full h-full object-cover scale-105 transition-transform duration-1000 hover:scale-100"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]"></div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* The Legacy Narrative */}
      <section className="py-32 relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 
              variants={fadeUpVariants} 
              className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-outfit)] font-medium tracking-tight text-zinc-950 mb-10 leading-tight"
            >
              A Legacy of Island Hospitality
            </motion.h2>
            
            <motion.div variants={fadeUpVariants} className="space-y-8 text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed">
              <p>
                Founded in 2016 by Kak Trisna, Funtrip Lembongan began as a humble family-run service on the island. Initially transitioning from local craftsmanship, our founder envisioned a tourism model where visitors could explore the island&apos;s hidden gems safely while directly supporting the local economy.
              </p>
              <p>
                Today, we have grown into one of Lembongan&apos;s premier boutique rental and tour agencies, yet our heart remains completely local. We don&apos;t just provide vehicles or tours; we share the stories of our cliffs, the secrets of our mangroves, and the genuine warmth of our community.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2x2 Editorial Grid: Our Values */}
      <section className="py-32 bg-white border-t border-zinc-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-zinc-400"></span>
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-zinc-500">Core Principles</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-[family-name:var(--font-outfit)] font-medium tracking-tight text-zinc-950">
                Why Travelers Choose Us
              </h2>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 lg:gap-y-24"
          >
            {values.map((val, idx) => (
              <motion.div key={val.title} variants={fadeUpVariants} className="group flex flex-col">
                <div className="pt-8 border-t border-zinc-200 transition-colors duration-500 group-hover:border-zinc-900">
                  <div className="flex items-start gap-6">
                    <div className="shrink-0 text-zinc-400 transition-colors duration-500 group-hover:text-zinc-950">
                      <val.icon className="w-8 h-8" strokeWidth={1} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-[family-name:var(--font-outfit)] font-medium text-zinc-950 mb-4">{val.title}</h3>
                      <p className="text-zinc-500 leading-relaxed max-w-[40ch]">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Minimalist Services List */}
      <section className="py-32 bg-[#FDFBF7]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="mb-20"
          >
             <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-zinc-400"></span>
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-zinc-500">Experiences</span>
              </div>
            <h2 className="text-4xl sm:text-5xl font-[family-name:var(--font-outfit)] font-medium tracking-tight text-zinc-950">
              Curated Services
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col border-t border-zinc-200"
          >
            {services.map((svc) => (
              <motion.div 
                key={svc.name} 
                variants={fadeUpVariants}
                className="group border-b border-zinc-200 py-10 transition-colors duration-500 hover:bg-white"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 px-4">
                  <div className="shrink-0 text-zinc-400 transition-colors duration-500 group-hover:text-zinc-950">
                    <svc.icon className="w-8 h-8" strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl md:w-1/3 font-[family-name:var(--font-outfit)] font-medium text-zinc-950">
                    {svc.name}
                  </h3>
                  <p className="text-zinc-500 md:w-2/3 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}

