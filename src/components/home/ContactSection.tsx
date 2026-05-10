"use client";

import { useState } from "react";
import { MapPin, Phone, Send } from "lucide-react";
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


interface ContactSectionProps {
  onWaClick: (message?: string) => void;
}

export function ContactSection({ onWaClick }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    service: "Buggy Car Rental",
    date: "",
    message: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Website Contact Form*\n\n*Name:* ${formData.name}\n*Interested In:* ${formData.service}\n*Travel Date:* ${formData.date || "Not decided yet"}\n*Message:* ${formData.message || "-"}`;
    onWaClick(message);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/diving.png"
          alt="Lembongan Coastline"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-zinc-950/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Contact Info */}
          <motion.div variants={fadeUpVariants} className="text-white">
            <h2 className="text-zinc-400 font-light tracking-widest uppercase text-sm mb-2">
              Fast Response
            </h2>
            <h3 className="text-3xl md:text-5xl font-medium text-white mb-6">
              Book Directly via WhatsApp
            </h3>
            <p className="text-zinc-300 text-lg mb-10 max-w-md font-light">
              Fill out the form to auto-generate a WhatsApp message, or simply
              click the WhatsApp button to chat with us directly.
            </p>

            <div className="space-y-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Jl.+Jungutbatu,+Nusa+Lembongan,+Bali+80771"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start cursor-pointer hover:bg-zinc-800/40 p-2 -ml-2 transition-colors border border-transparent hover:border-zinc-700/50 backdrop-blur-sm group"
              >
                <div className="bg-zinc-900/40 p-3 mr-4 border border-zinc-800 group-hover:bg-zinc-800 transition-colors">
                  <MapPin className="h-6 w-6 text-zinc-300 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-medium text-xl mb-1 text-white">Our Location</h4>
                  <p className="text-zinc-400 font-light text-sm group-hover:text-zinc-300 transition-colors">
                    Jl. Jungutbatu, Nusa Lembongan,
                    <br />
                    Klungkung Regency, Bali 80771{" "}
                    <span className="text-zinc-500 text-xs font-light block mt-1">
                      (Click to view on map)
                    </span>
                  </p>
                </div>
              </a>

              <div
                className="flex items-start cursor-pointer hover:bg-zinc-800/40 p-2 -ml-2 transition-colors border border-transparent hover:border-zinc-700/50 backdrop-blur-sm"
                onClick={() => onWaClick()}
              >
                <div className="bg-zinc-900/40 p-3 mr-4 border border-zinc-800">
                  <Phone className="h-6 w-6 text-zinc-300" />
                </div>
                <div>
                  <h4 className="font-medium text-xl mb-1 text-white">WhatsApp</h4>
                  <p className="text-zinc-300 font-light">
                    +62 812 3456 7890{" "}
                    <span className="text-zinc-500 text-xs font-light">
                      (Click to chat)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div variants={fadeUpVariants} className="bg-[#FDFBF7] p-8 sm:p-10 border border-zinc-200">
            <h4 className="text-2xl font-medium text-zinc-900 mb-6">
              Send an Inquiry
            </h4>
            <form className="space-y-5" onSubmit={handleFormSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest pl-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all font-light"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest pl-1">
                    Interested In
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all cursor-pointer font-light"
                  >
                    <option>Buggy Car Rental</option>
                    <option>Scooter Rental</option>
                    <option>Snorkeling Trip</option>
                    <option>Island Tour</option>
                    <option>Other / General</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest pl-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all cursor-pointer font-light"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest pl-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all resize-none font-light"
                  placeholder="Tell us about your trip details..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-[11px] transition-all flex justify-center items-center gap-2 mt-2 uppercase tracking-widest"
              >
                <Send className="h-4 w-4" /> Send via WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
