"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Phone } from "lucide-react";
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

interface FAQSectionProps {
  onWaClick: (message?: string) => void;
}

const faqs = [
  {
    q: "Can I drive the Buggy Car to Nusa Ceningan?",
    a: "No, the Buggy Cars are strictly for Nusa Lembongan only. The Yellow Bridge connecting the islands is too narrow for buggies. If you want to explore both islands, we highly recommend renting a scooter.",
  },
  {
    q: "Do I need an international driving license to rent a scooter?",
    a: "No driving license is required to rent and ride a scooter here in Nusa Lembongan. However, we always provide helmets and urge you to drive safely.",
  },
  {
    q: "What happens if the rental scooter gets damaged?",
    a: "Please note that we do not provide damage insurance or guarantees. Any damage that occurs during your rental period will be your full responsibility to cover.",
  },
  {
    q: "How do I make a booking?",
    a: "All our bookings are handled directly via WhatsApp for fast and personal service. Simply click any 'Book via WhatsApp' button on our website to chat with us, check availability, and arrange your booking without any credit card hassle.",
  },
];

export function FAQSection({ onWaClick }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Side: Sticky Header & CTA */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="text-zinc-900 font-light tracking-widest uppercase text-sm mb-2">
              Got Questions?
            </h2>
            <h3 className="text-3xl md:text-5xl font-medium text-zinc-900 mb-6">
              Frequently Asked Questions
            </h3>
            <p className="text-lg text-zinc-600 mb-10 font-light">
              Find quick answers to common questions about our rentals, tours, and
              policies. Need more details? We are just a message away.
            </p>

            <div className="bg-white border border-zinc-200 p-8 flex flex-col items-start relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-zinc-100 rounded-full blur-2xl group-hover:bg-zinc-200 transition-colors" />
              <div className="w-14 h-14 bg-zinc-900 text-white flex justify-center items-center mb-6">
                <Phone className="h-6 w-6 text-zinc-100" />
              </div>
              <h4 className="font-medium text-xl text-zinc-900 mb-2 relative z-10">
                Still have questions?
              </h4>
              <p className="text-zinc-600 mb-8 relative z-10 font-light">
                Our local team is ready to help you plan your perfect Lembongan
                trip.
              </p>
              <button
                onClick={() =>
                  onWaClick(
                    "Hi Funtrip Lembongan, I have a few questions before I book."
                  )
                }
                className="text-zinc-900 font-medium uppercase tracking-widest text-[11px] flex items-center gap-3 hover:text-zinc-600 transition-colors relative z-10"
              >
                Ask on WhatsApp <span className="text-xl leading-none">→</span>
              </button>
            </div>
          </motion.div>

          {/* Right Side: Accordion List */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-7 space-y-4 mt-4 lg:mt-0">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`border bg-white transition-all duration-300 ${
                  openIndex === idx
                    ? "border-zinc-300 border-l-2 border-l-zinc-900 shadow-sm"
                    : "border-zinc-200 hover:border-zinc-900 border-l-2 border-l-transparent"
                }`}
              >
                <button
                  className="w-full px-6 py-6 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                >
                  <span
                    className={`font-medium text-lg pr-4 ${
                      openIndex === idx ? "text-zinc-900" : "text-zinc-800"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`shrink-0 w-8 h-8 flex items-center justify-center border transition-colors ${
                      openIndex === idx
                        ? "bg-zinc-900 border-zinc-900 text-white"
                        : "bg-zinc-50 border-zinc-200 text-zinc-500"
                    }`}
                  >
                    {openIndex === idx ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === idx
                      ? "max-h-64 pb-6 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-zinc-600 font-light leading-relaxed border-t border-zinc-100 pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
