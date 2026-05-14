"use client";

import { Star } from "lucide-react";
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

const testimonials = [
  {
    id: 1,
    text: "The buggy car rental was a game changer for our family. It was so easy to drive and allowed us to explore the island's beaches comfortably with our 7 year old daughter. Great service!",
    name: "axfordfamily",
    image: "/images/testi-1.jpg",
  },
  {
    id: 2,
    text: "What an amazing day! The views around Nusa Lembongan are simply breathtaking. We visited the cliff points and the scenery was so beautiful. Highly recommend for the photos alone!",
    name: "Amanda C",
    image: "/images/testi-2.jpg",
  },
  {
    id: 3,
    text: "Incredible scenery! Every stop on the tour offered a new, stunning perspective of the island. The operation is well run with excellent, prompt communication and friendly local guides.",
    name: "Alicia Martin",
    image: "/images/testi-3.JPG",
  },
  {
    id: 4,
    text: "We had such an amazing time exploring the island. The landscape is so unique and photogenic, especially the hidden spots and cliff views. A must-do if you want to see the best of the island.",
    name: "Tenaya Reddish",
    image: "/images/testi-4.JPG",
  },
  {
    id: 5,
    text: "Renting a scooter was the best way to get around! The bikes were in great condition and very reliable. It gave us the freedom to explore every corner of Lembongan and Ceningan at our own pace.",
    name: "Mandy Burns",
    image: "/images/testi-5.JPG",
  },
  {
    id: 6,
    text: "Had so much fun on this trip! The island's natural beauty is surreal. From the turquoise waters to the dramatic cliff views, everything was absolutely stunning! A truly memorable experience.",
    name: "Trish",
    image: "/images/testi-6.JPG",
  },

];

export function TestimonialsSection({ testimonials: dbTestimonials }: { testimonials?: any[] }) {
  const displayTestimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : testimonials;

  return (
    <section id="reviews" className="py-24 bg-[#FAFAFA] overflow-hidden border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeUpVariants} className="text-zinc-900 font-light tracking-widest uppercase text-sm mb-2">
            What They Say
          </motion.h2>
          <motion.h3 variants={fadeUpVariants} className="text-3xl md:text-5xl font-medium text-zinc-900 mb-6">
            Guest Testimonials
          </motion.h3>
          <motion.p variants={fadeUpVariants} className="text-lg text-zinc-600 font-light">
            Real stories from foreign travelers who explored the island with us.
          </motion.p>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {displayTestimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={fadeUpVariants}
              className="bg-white border border-zinc-200 flex flex-col group/card"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={t.image || t.imageUrl || "/images/placeholder-testi.jpg"}
                  alt={t.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/5 group-hover/card:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-500 fill-amber-500"
                    />
                  ))}
                </div>
                <p className="text-zinc-600 italic mb-8 flex-grow leading-relaxed text-sm md:text-base font-light">
                  &ldquo;{t.text || t.content}&rdquo;
                </p>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-zinc-100">
                  <div>
                    <h4 className="font-semibold text-zinc-900 text-sm md:text-base uppercase tracking-wider">
                      {t.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-2">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                        alt="Google"
                        className="w-3.5 h-3.5"
                      />
                      <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-light">
                        Google Review
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>


    </section>
  );
}
