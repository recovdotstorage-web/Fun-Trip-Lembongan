"use client";

import { useState } from "react";
import { MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";

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
        />
        <div className="absolute inset-0 bg-slate-950/85" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Contact Info */}
          <div className="text-white">
            <h2 className="text-sky-400 font-bold tracking-widest uppercase text-sm mb-2">
              Fast Response
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Book Directly via WhatsApp
            </h3>
            <p className="text-slate-300 text-lg mb-10 max-w-md">
              Fill out the form to auto-generate a WhatsApp message, or simply
              click the WhatsApp button to chat with us directly.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-white/10 backdrop-blur-sm p-3 mr-4 border border-white/20">
                  <MapPin className="h-6 w-6 text-sky-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Our Location</h4>
                  <p className="text-slate-400">
                    Jl. Jungutbatu, Nusa Lembongan,
                    <br />
                    Klungkung Regency, Bali 80771
                  </p>
                </div>
              </div>

              <div
                className="flex items-start cursor-pointer hover:bg-white/10 p-2 -ml-2 transition-colors border border-transparent hover:border-white/10 backdrop-blur-sm"
                onClick={() => onWaClick()}
              >
                <div className="bg-[#25D366]/20 p-3 mr-4 border border-[#25D366]/50">
                  <Phone className="h-6 w-6 text-[#25D366]" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 text-white">WhatsApp</h4>
                  <p className="text-[#25D366] font-medium">
                    +62 812 3456 7890{" "}
                    <span className="text-slate-400 text-sm font-normal">
                      (Click to chat)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-8 sm:p-10 shadow-2xl border-t-4 border-[#005b96]">
            <h4 className="text-2xl font-bold text-slate-900 mb-6">
              Send an Inquiry
            </h4>
            <form className="space-y-5" onSubmit={handleFormSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005b96] focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
                    Interested In
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005b96] focus:border-transparent transition-all cursor-pointer"
                  >
                    <option>Buggy Car Rental</option>
                    <option>Scooter Rental</option>
                    <option>Snorkeling Trip</option>
                    <option>Island Tour</option>
                    <option>Other / General</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005b96] focus:border-transparent transition-all cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005b96] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your trip details..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-lg transition-all shadow-md flex justify-center items-center gap-2 mt-2"
              >
                <Send className="h-5 w-5" /> Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
