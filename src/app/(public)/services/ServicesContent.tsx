"use client";

import { motion } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";
import { ActivityCard } from "@/components/shared/ActivityCard";
import { CONTACT_INFO } from "@/constants/contact";

interface ServicesContentProps {
  services: any[];
}

export default function ServicesContent({ services }: ServicesContentProps) {
  const waMessage = encodeURIComponent("Hi Fun Trip Lembongan, I'd like to plan a custom trip.");

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-24 pb-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-7xl font-medium text-zinc-900 mb-8 font-[family-name:var(--font-outfit)] leading-tight tracking-tight">
              Our <span className="italic font-light text-zinc-400">Premium</span> Services
            </h1>
            <p className="max-w-2xl mx-auto text-zinc-500 font-light text-lg leading-relaxed">
              Discover the beauty of Nusa Lembongan through our handpicked collection of 
              tours and professional services. Tailored for your perfect island getaway.
            </p>
          </motion.div>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-zinc-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-zinc-200 rounded-full blur-3xl opacity-30" />
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="text-center py-32 border border-dashed border-zinc-200">
              <Compass className="w-12 h-12 text-zinc-300 mx-auto mb-6" />
              <h2 className="text-xl font-medium text-zinc-900 mb-2">No services found</h2>
              <p className="text-zinc-500 font-light">We are currently updating our offerings. Please check back later.</p>
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                >
                  <ActivityCard
                    name={service.name}
                    slug={service.slug}
                    shortDescription={service.shortDescription}
                    price={service.price}
                    duration={service.duration}
                    imageUrl={service.images[0]?.imageUrl}
                    categoryName={service.category.name}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="bg-zinc-900 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl text-white font-medium mb-8 font-[family-name:var(--font-outfit)] leading-tight">
            Want a Custom Itinerary?
          </h2>
          <p className="text-zinc-400 font-light mb-12 text-lg">
            Our local experts can help you design the perfect trip based on your preferences and group size.
          </p>
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 bg-white text-zinc-900 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-100 transition-colors"
          >
            Contact our concierge
          </a>
        </div>
      </section>
    </div>
  );
}
