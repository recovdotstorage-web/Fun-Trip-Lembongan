import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    text: "We had an incredible morning snorkeling with the team. We took our 7 year old daughter along and the guides were great - they made sure she felt safe and comfortable the entire time.",
    name: "axfordfamily",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 2,
    text: "What an amazing day! The snorkelling was so beautiful, we were so excited to swim with 4 beautiful Manta Rays. The guides on the trip were all very helpful.",
    name: "Amanda C",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 3,
    text: "Amazing experience. Seeing it all (the Manta Rays, tropical fish and coral, and the scenery) with our own eyes was incredible. The operation is well run with excellent, prompt communication.",
    name: "Alicia Martin",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 4,
    text: "We had such an amazing time yesterday snorkeling and seeing turtles, Manta Rays, Dolphins and all the colourful and beautiful fish in the sea. Highly recommended.",
    name: "Tenaya Reddish",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 5,
    text: "Each of the 3 snorkelling spots was unique and beautiful. The staff were friendly, professional and helpful of all skill levels. We also enjoyed being part of a small group.",
    name: "Mandy Burns",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 6,
    text: "Had so much fun on this trip - got to see a Manta Ray swim right beneath me which was surreal! The coral reefs and fish were absolutely stunning! We also went through the Mangrove.",
    name: "Trish",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
  },
];

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-24 bg-[#f8f9fc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[#005b96] font-bold tracking-widest uppercase text-sm mb-2">
            What They Say
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Guest Testimonials
          </h3>
          <p className="text-lg text-slate-600">
            Real stories from foreign travelers who explored the island with us.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee-unlimited flex">
          {[1, 2, 3, 4].map((blockIndex) => (
            <div key={`block-${blockIndex}`} className="flex gap-6 pr-6 shrink-0">
              {testimonials.map((t) => (
                <div
                  key={`${blockIndex}-${t.id}`}
                  className="w-[320px] md:w-[400px] shrink-0 bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col cursor-pointer"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-amber-500 fill-amber-500"
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 italic mb-8 flex-grow leading-relaxed text-[15px]">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover border-2 border-slate-100"
                      unoptimized
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {t.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                          alt="Google"
                          className="w-3.5 h-3.5"
                        />
                        <p className="text-xs text-slate-500 font-medium">
                          Google Review
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
