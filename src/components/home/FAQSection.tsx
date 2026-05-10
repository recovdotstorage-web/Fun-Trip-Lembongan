"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Phone } from "lucide-react";

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
    <section id="faq" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Sticky Header & CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="text-[#005b96] font-bold tracking-widest uppercase text-sm mb-2">
              Got Questions?
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Frequently Asked Questions
            </h3>
            <p className="text-lg text-slate-600 mb-10">
              Find quick answers to common questions about our rentals, tours, and
              policies. Need more details? We are just a message away.
            </p>

            <div className="bg-slate-50 border border-slate-200 p-8 flex flex-col items-start relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#005b96]/5 rounded-full blur-2xl group-hover:bg-[#005b96]/10 transition-colors" />
              <div className="w-14 h-14 bg-[#005b96] text-white flex justify-center items-center mb-6 shadow-md">
                <Phone className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-xl text-slate-900 mb-2 relative z-10">
                Still have questions?
              </h4>
              <p className="text-slate-600 mb-8 relative z-10">
                Our local team is ready to help you plan your perfect Lembongan
                trip.
              </p>
              <button
                onClick={() =>
                  onWaClick(
                    "Hi Funtrip Lembongan, I have a few questions before I book."
                  )
                }
                className="text-[#005b96] font-bold uppercase tracking-widest text-sm flex items-center gap-3 hover:text-amber-500 transition-colors relative z-10"
              >
                Ask on WhatsApp <span className="text-xl leading-none">→</span>
              </button>
            </div>
          </div>

          {/* Right Side: Accordion List */}
          <div className="lg:col-span-7 space-y-4 mt-4 lg:mt-0">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`border bg-white transition-all duration-300 ${
                  openIndex === idx
                    ? "border-slate-300 border-l-4 border-l-[#005b96] shadow-lg"
                    : "border-slate-200 hover:border-[#005b96] border-l-4 border-l-transparent"
                }`}
              >
                <button
                  className="w-full px-6 py-6 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                >
                  <span
                    className={`font-bold text-lg pr-4 ${
                      openIndex === idx ? "text-[#005b96]" : "text-slate-800"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`shrink-0 w-8 h-8 flex items-center justify-center border transition-colors ${
                      openIndex === idx
                        ? "bg-[#005b96] border-[#005b96] text-white"
                        : "bg-slate-50 border-slate-200 text-slate-500"
                    }`}
                  >
                    {openIndex === idx ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
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
                  <p className="text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
