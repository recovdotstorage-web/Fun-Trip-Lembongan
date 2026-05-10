import { Map, ThumbsUp, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { type ReactNode } from "react";

const reasons = [
  {
    id: 1,
    icon: <Map className="h-6 w-6" />,
    title: "Local Experts",
    description:
      "Born and raised in Lembongan. We know the hidden gems, best tides for snorkeling, and safest routes.",
  },
  {
    id: 2,
    icon: <ThumbsUp className="h-6 w-6" />,
    title: "No Hidden Fees",
    description:
      "What we quote on WhatsApp is what you pay. No surprise charges, no credit card fees, direct and honest.",
  },
  {
    id: 3,
    icon: <Clock className="h-6 w-6" />,
    title: "Flexible & Fast",
    description:
      "Skip the complicated forms. Chat directly to customize your itinerary or rent a scooter in minutes.",
  },
  {
    id: 4,
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Trusted Operator",
    description:
      "Years of experience serving foreign travelers with consistent 5-star ratings on Google and TripAdvisor.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side: Image Layout */}
          <div className="relative order-2 lg:order-1 mt-12 lg:mt-0 px-4 sm:px-8 lg:px-0">
            <div className="absolute -top-6 -left-2 lg:-left-6 w-full h-full bg-[#005b96] z-0" />
            <div className="relative z-10 bg-slate-200">
              <Image
                src="/images/island-tour.png"
                alt="Exploring Nusa Lembongan"
                width={800}
                height={550}
                className="w-full h-[450px] md:h-[550px] object-cover border border-slate-100 shadow-xl"
              />
            </div>
            <div className="absolute -bottom-8 -right-2 lg:-right-8 bg-amber-500 text-white p-6 z-20 shadow-2xl border-2 border-white">
              <h4 className="text-4xl md:text-5xl font-black mb-1">2016</h4>
              <p className="font-bold tracking-widest uppercase text-xs">
                Established
              </p>
            </div>
          </div>

          {/* Right Side: Content Layout */}
          <div className="order-1 lg:order-2">
            <h2 className="text-[#005b96] font-bold tracking-widest uppercase text-sm mb-2">
              The Funtrip Difference
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-10">
              Why Travel With Us
            </h3>
            <div className="space-y-6">
              {reasons.map((reason) => (
                <ReasonCard key={reason.id} reason={reason} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReasonCard({
  reason,
}: {
  reason: { id: number; icon: ReactNode; title: string; description: string };
}) {
  return (
    <div className="flex items-start gap-5 p-6 bg-slate-50 border border-slate-100 hover:border-[#005b96] transition-colors group">
      <div className="shrink-0 w-14 h-14 bg-[#005b96] flex items-center justify-center text-white group-hover:bg-amber-500 transition-colors">
        {reason.icon}
      </div>
      <div>
        <h4 className="text-lg font-bold text-slate-900 mb-2">{reason.title}</h4>
        <p className="text-slate-600 text-sm leading-relaxed">
          {reason.description}
        </p>
      </div>
    </div>
  );
}
