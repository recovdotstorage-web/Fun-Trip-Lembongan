"use client";

import { Star } from "lucide-react";
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

export function TrustedSection() {
  return (
    <section id="reviews-summary" className="py-12 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20 opacity-80"
        >
          <motion.div variants={fadeUpVariants} className="flex flex-col items-center">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <p className="font-medium text-zinc-900 text-lg uppercase tracking-widest">
              TripAdvisor
            </p>
            <p className="text-[11px] text-zinc-500 font-light uppercase tracking-widest mt-1">
              Highly Recommended
            </p>
          </motion.div>
          <motion.div variants={fadeUpVariants} className="flex flex-col items-center">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <p className="font-medium text-zinc-900 text-lg uppercase tracking-widest">
              Google Reviews
            </p>
            <p className="text-[11px] text-zinc-500 font-light uppercase tracking-widest mt-1">
              Top Rated in Lembongan
            </p>
          </motion.div>
          <motion.div variants={fadeUpVariants} className="flex flex-col items-center">
            <h3 className="text-3xl font-medium text-zinc-900 tracking-widest uppercase">Since 2016</h3>
            <p className="text-[11px] text-zinc-500 font-light uppercase tracking-widest mt-1">Trusted Local Operator</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
