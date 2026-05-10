"use client";

import { Car, Bike, Ship, MapPin, CheckCircle, Send, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

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

interface ServicesSectionProps {
  onWaClick: (message?: string) => void;
}

const services = [
  {
    id: 1,
    title: "Buggy Car Rental",
    slug: "buggy-car-rental",
    price: "Best Price",
    icon: <Car className="h-6 w-6 text-zinc-900" />,
    image: "/images/surfing.png",
    features: [
      "Comfortable seating for groups",
      "Explore Lembongan easily",
      "No access to Nusa Ceningan (Bridge limit)",
      "Fuel included",
    ],
  },
  {
    id: 2,
    title: "Scooter Rental",
    slug: "scooter-rental",
    price: "Best Price",
    icon: <Bike className="h-6 w-6 text-zinc-900" />,
    image: "/images/diving.png",
    features: [
      "No driving license required",
      "Helmets provided",
      "Full island access (Lembongan & Ceningan)",
      "Note: No damage guarantee",
    ],
    popular: true,
  },
  {
    id: 3,
    title: "Snorkeling Safari",
    slug: "snorkeling-safari",
    price: "Best Price",
    icon: <Ship className="h-6 w-6 text-zinc-900" />,
    image: "/images/snorkeling.png",
    features: [
      "Swim with Manta Rays",
      "Visit Crystal Bay & Mangrove Point",
      "Snorkeling Equipment provided",
      "Professional Guide & Boat",
    ],
  },
  {
    id: 4,
    title: "Lembongan Island Tour",
    slug: "lembongan-island-tour",
    price: "Best Price",
    icon: <MapPin className="h-6 w-6 text-zinc-900" />,
    image: "/images/island-tour.png",
    features: [
      "Dream Beach & Devil's Tear",
      "Yellow Bridge & Panorama Point",
      "Mangrove Forest Tour",
      "Local Expert Driver",
    ],
  },
];

export function ServicesSection({ onWaClick }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 bg-[#FDFBF7]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2 variants={fadeUpVariants} className="text-zinc-900 font-light tracking-widest uppercase text-sm mb-2">
            What We Offer
          </motion.h2>
          <motion.h3 variants={fadeUpVariants} className="text-3xl md:text-5xl font-medium text-zinc-900 mb-6">
            Our Services &amp; Rentals
          </motion.h3>
          <motion.p variants={fadeUpVariants} className="text-lg text-zinc-600 font-light">
            Choose from our premium rentals to explore on your own, or join our
            guided tours to see the best of Nusa Lembongan.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((srv) => (
            <ServiceCard key={srv.id} service={srv} onWaClick={onWaClick} />
          ))}
        </motion.div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="mt-16 text-center"
        >
          <Link 
            href="/services"
            className="inline-flex items-center gap-3 px-10 py-5 bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all group"
          >
            Show All Services
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  onWaClick,
}: {
  service: (typeof services)[0];
  onWaClick: (message?: string) => void;
}) {
  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `*Service Inquiry*\n*Item:* ${service.title}\n\nHi Funtrip Lembongan, I want to book this. How much is it?`;
    onWaClick(message);
  };

  return (
    <motion.div
      variants={fadeUpVariants}
      className={`group bg-white overflow-hidden border transition-all duration-300 hover:border-zinc-900 flex flex-col rounded-none ${
        service.popular ? "border-zinc-900 relative" : "border-zinc-200"
      }`}
    >
      <Link href={`/services/${service.slug}`} className="flex flex-col flex-grow">
        {service.popular && (
          <div className="absolute top-4 right-4 bg-zinc-900 text-white text-[10px] font-medium px-3 py-1.5 z-10 uppercase tracking-widest">
            Most Booked
          </div>
        )}
        <div className="h-48 overflow-hidden relative">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-zinc-50 p-2 shrink-0 group-hover:bg-zinc-100 transition-colors">{service.icon}</div>
            <h4 className="text-lg font-medium text-zinc-900 leading-tight group-hover:text-zinc-900">{service.title}</h4>
          </div>
          <div className="text-lg font-medium text-zinc-900 mb-4 border-b border-zinc-100 pb-4">
            {service.price}{" "}
            <span className="text-[10px] font-light text-zinc-500 uppercase tracking-widest ml-1">
              Via WhatsApp
            </span>
          </div>

          <ul className="space-y-3 mb-6 flex-grow">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start text-zinc-600 text-sm font-light">
                <CheckCircle className="h-4 w-4 text-zinc-900 mr-3 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleBook}
              className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-medium transition-colors flex justify-center items-center gap-2 text-[10px] uppercase tracking-widest"
            >
              <Send className="h-3 w-3" /> Book on WhatsApp
            </button>
            <div className="flex items-center justify-center gap-2 text-zinc-500 text-[10px] uppercase tracking-widest font-medium py-2 group-hover:text-zinc-900 transition-colors">
              View Details <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

