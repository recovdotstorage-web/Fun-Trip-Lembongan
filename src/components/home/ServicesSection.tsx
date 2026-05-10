"use client";

import { Car, Bike, Ship, MapPin, CheckCircle, Send } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

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
          className="grid grid-cols-4 gap-6"
        >
          {services.map((srv) => (
            <ServiceCard key={srv.id} service={srv} onWaClick={onWaClick} />
          ))}
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
  const handleBook = () => {
    const message = `*Service Inquiry*\n*Item:* ${service.title}\n\nHi Funtrip Lembongan, I want to book this. How much is it?`;
    onWaClick(message);
  };

  return (
    <motion.div
      variants={fadeUpVariants}
      className={`bg-white overflow-hidden border transition-transform duration-300 hover:-translate-y-1 flex flex-col ${
        service.popular ? "border-zinc-900 relative" : "border-zinc-200"
      }`}
    >
      {service.popular && (
        <div className="absolute top-4 right-4 bg-zinc-900 text-white text-[10px] font-medium px-3 py-1.5 z-10 uppercase tracking-widest">
          Most Booked
        </div>
      )}
      <div className="h-40 overflow-hidden relative">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        {/* Icon + Title on same row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-zinc-50 p-2 shrink-0">{service.icon}</div>
          <h4 className="text-lg font-medium text-zinc-900 leading-tight">{service.title}</h4>
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

        <button
          onClick={handleBook}
          className="w-full py-3.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-medium transition-colors flex justify-center items-center gap-2 text-[11px] uppercase tracking-widest"
        >
          <Send className="h-3 w-3" /> Book on WhatsApp
        </button>
      </div>
    </motion.div>
  );
}
