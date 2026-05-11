"use client";

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

const values = [
  {
    icon: Heart,
    title: "Locally Owned",
    desc: "Born and raised in Nusa Lembongan. We love our island and we want you to love it too.",
  },
  {
    icon: Shield,
    title: "Safe & Reliable",
    desc: "All services come with proper safety briefings and well-maintained equipment.",
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

const serviceBriefs = [
  {
    icon: Car,
    name: "Buggy Car Rental",
    slug: "buggy-car-rental",
    desc: "Explore the island in style. No driver's license required! Note: Buggy cannot cross to Nusa Ceningan.",
  },
  {
    icon: Bike,
    name: "Motor / Scooter Rental",
    slug: "scooter-rental",
    desc: "Freedom to roam. Reach Nusa Ceningan via the iconic Yellow Bridge. No license needed in Lembongan.",
  },
  {
    icon: Waves,
    name: "Snorkeling",
    slug: "snorkeling-safari",
    desc: "Swim with tropical fish, turtles, and manta rays in the crystal-clear waters.",
  },
  {
    icon: Compass,
    name: "Island Tour",
    slug: "lembongan-island-tour",
    desc: "A guided full-day or half-day tour covering the best spots on Nusa Lembongan and Nusa Ceningan.",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* Hero Section - Boxed Editorial Style */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-zinc-200 rounded-none overflow-hidden bg-white">
            {/* Content Box */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 p-8 sm:p-12 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-zinc-200"
            >
              <motion.div variants={fadeUpVariants} className="flex items-center gap-3 mb-8">
                <span className="w-8 h-[1px] bg-zinc-900"></span>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-900">Our Heritage</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeUpVariants} 
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-[family-name:var(--font-outfit)] font-semibold tracking-tight leading-[0.95] text-zinc-950 mb-10"
              >
                Local roots.<br />
                <span className="text-zinc-400">Global vision.</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeUpVariants} 
                className="text-xl text-zinc-600 leading-relaxed font-normal max-w-xl mb-12"
              >
                Deeply rooted in the tides of Nusa Lembongan, we curate experiences that honor our heritage and showcase the raw beauty of our home.
              </motion.p>
              
              <motion.div variants={fadeUpVariants}>
                <Link 
                  href="/services"
                  className="group relative inline-flex items-center gap-3 bg-zinc-950 text-white rounded-none px-10 py-5 text-lg font-medium transition-colors hover:bg-zinc-800"
                >
                  <span>Explore our services</span>
                  <div className="w-8 h-8 rounded-none bg-white/10 flex items-center justify-center transition-transform duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Image Box */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1] }}
              className="lg:col-span-5 relative h-[400px] lg:h-auto bg-zinc-100"
            >
              <img 
                src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=1200&auto=format&fit=crop" 
                alt="Nusa Lembongan Coastline" 
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Narrative Section - Boxed Bento Style */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-zinc-200">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="p-10 sm:p-16 bg-white flex flex-col justify-center border-b md:border-b-0 md:border-r border-zinc-200"
            >
              <h2 className="text-4xl sm:text-5xl font-[family-name:var(--font-outfit)] font-semibold tracking-tight text-zinc-950 mb-8 leading-tight">
                The Legacy of <br />Island Hospitality
              </h2>
              <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
                <p>
                  Founded in 2016 by Trisna, Fun Trip Lembongan began as a humble family-run service. Initially transitioning from local craftsmanship, our founder envisioned a tourism model where visitors could explore the island&apos;s hidden gems safely while directly supporting the local community.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="p-10 sm:p-16 bg-zinc-950 text-white flex flex-col justify-center"
            >
              <p className="text-xl sm:text-2xl font-light leading-relaxed mb-8 italic text-zinc-300">
                &ldquo;We don&apos;t just provide vehicles or tours; we share the stories of our cliffs, the secrets of our mangroves, and the genuine warmth of our community.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                  <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold">Founder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid - Strict Editorial Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-zinc-200 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 text-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="inline-flex items-center gap-3 mb-6 bg-zinc-50 px-4 py-2 rounded-none border border-zinc-200"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-600">Core Principles</span>
            </motion.div>
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="text-4xl sm:text-6xl font-[family-name:var(--font-outfit)] font-semibold tracking-tight text-zinc-950"
            >
              Why Travelers Choose Us
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-zinc-200">
            {values.map((val, idx) => (
              <motion.div 
                key={val.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariants}
                className="p-10 border-r border-b border-zinc-200 bg-white"
              >
                <div className="shrink-0 text-zinc-950 mb-12">
                  <val.icon className="w-12 h-12" strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-[family-name:var(--font-outfit)] font-semibold text-zinc-950 mb-6">{val.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences List - Premium Minimalist Table */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-zinc-950"></span>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-950">Curated Experiences</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-[family-name:var(--font-outfit)] font-semibold tracking-tight text-zinc-950">
                Our Services
              </h2>
            </div>
            <Link href="/services" className="text-zinc-500 hover:text-zinc-950 transition-colors font-medium flex items-center gap-2 group border-b border-transparent hover:border-zinc-950 pb-1">
              Explore all services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="flex flex-col border-t border-zinc-200">
            {serviceBriefs.map((svc) => (
              <Link 
                key={svc.name}
                href={`/services/${svc.slug}`}
                className="group block"
              >
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpVariants}
                  className="border-b border-zinc-200 py-12 px-0 rounded-none bg-white transition-colors"
                >
                  <div className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-6 md:gap-12 px-8 md:px-0">
                    <div className="md:col-span-1 text-zinc-950 ml-0 md:ml-8">
                      <svc.icon className="w-12 h-12" strokeWidth={1} />
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-outfit)] font-semibold text-zinc-950 transition-colors group-hover:text-zinc-600">
                        {svc.name}
                      </h3>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-lg text-zinc-500 leading-relaxed font-light">
                        {svc.desc}
                      </p>
                    </div>
                    <div className="md:col-span-1 flex justify-end mr-8">
                      <div className="w-12 h-12 rounded-none border border-zinc-200 flex items-center justify-center text-zinc-400 transition-all duration-300">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="bg-zinc-950 rounded-none p-12 sm:p-24 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <img src="https://images.unsplash.com/photo-1506929197327-fb062b803651?q=80&w=1200&auto=format&fit=crop" alt="Texture" className="w-full h-full object-cover" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl sm:text-6xl font-[family-name:var(--font-outfit)] font-semibold text-white mb-8 tracking-tight leading-tight">
                Ready to live the island life?
              </h2>
              <p className="text-xl text-zinc-400 mb-12 font-light">
                Connect with us directly to customize your perfect Nusa Lembongan experience.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  href="/#contact"
                  className="w-full sm:w-auto px-10 py-5 bg-white text-zinc-950 rounded-none font-bold text-lg hover:bg-zinc-100 transition-colors"
                >
                  Contact us
                </Link>
                <Link 
                  href="/services"
                  className="w-full sm:w-auto px-10 py-5 border border-zinc-800 text-white rounded-none font-bold text-lg hover:bg-zinc-900 transition-colors"
                >
                  View Services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
