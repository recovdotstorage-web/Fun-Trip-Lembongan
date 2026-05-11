"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Compass, MapPin, Wallet, Calendar, Backpack, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/constants/contact";

const faqs = [
  {
    question: "How do I get to Nusa Lembongan?",
    answer: "Nusa Lembongan is accessible via a 30-45 minute fast boat ride from Sanur Beach or Serangan Harbor in Bali. We can help you arrange these boat transfers for a seamless journey.",
    icon: <Compass className="w-5 h-5" />,
  },
  {
    question: "What is the best time to visit?",
    answer: "The best time is during the dry season (April to October) when the weather is perfect for snorkeling and outdoor activities. However, the island's tropical beauty can be enjoyed year-round.",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    question: "Are there ATMs on the island?",
    answer: "Yes, there are several ATMs on the island, primarily in the Jungut Batu and Mushroom Bay areas. However, we recommend bringing some cash as backup in case of connection issues.",
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    question: "Do I need to book tours in advance?",
    answer: "While you can book on arrival, we recommend booking at least 1-2 days in advance, especially during peak season, to ensure your preferred time slot and availability.",
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    question: "What should I bring for a snorkeling tour?",
    answer: "We recommend bringing swimwear, reef-safe sunscreen, a towel, a hat, and a camera. We provide high-quality snorkeling equipment, life jackets, and professional guides.",
    icon: <Backpack className="w-5 h-5" />,
  },
  {
    question: "Is hotel pickup and drop-off included?",
    answer: "Yes, most of our tours include complimentary pickup and drop-off for hotels within the Nusa Lembongan area. For Ceningan, we can arrange a meeting point near the Yellow Bridge.",
    icon: <Car className="w-5 h-5" />,
  },
];

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-medium mb-4"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Everything you need to know about your trip to Nusa Lembongan. Can't find what you're looking for? Feel free to contact us.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group rounded-2xl border transition-all duration-300",
                activeIndex === index
                  ? "border-emerald-200 bg-emerald-50/30 shadow-sm"
                  : "border-gray-100 bg-white hover:border-emerald-100 hover:shadow-md"
              )}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    activeIndex === index ? "bg-emerald-600 text-white" : "bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-500"
                  )}>
                    {faq.icon}
                  </div>
                  <span className={cn(
                    "font-semibold text-lg transition-colors",
                    activeIndex === index ? "text-emerald-900" : "text-gray-700"
                  )}>
                    {faq.question}
                  </span>
                </div>
                <ChevronDown className={cn(
                  "w-5 h-5 text-gray-400 transition-transform duration-300",
                  activeIndex === index && "rotate-180 text-emerald-600"
                )} />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-20 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-4">Still have more questions?</p>
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all hover:scale-105 shadow-lg shadow-emerald-200"
          >
            Chat with us on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
