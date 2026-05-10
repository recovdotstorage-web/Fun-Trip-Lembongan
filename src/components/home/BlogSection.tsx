"use client";

import Image from "next/image";
import Link from "next/link";
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


const articles = [
  {
    id: 1,
    title: "A Complete Guide to Snorkeling with Manta Rays in Nusa Penida",
    excerpt:
      "Everything you need to know about swimming with these gentle giants, the best times to go, and what to expect during your trip.",
    category: "Snorkeling Guide",
    date: "May 10, 2026",
    image: "/images/snorkeling.png",
  },
  {
    id: 2,
    title: "Top 5 Hidden Beaches in Nusa Lembongan You Must Visit",
    excerpt:
      "Escape the crowds and discover pristine white sands and crystal clear waters at these secret spots only locals know about.",
    category: "Island Exploration",
    date: "April 28, 2026",
    image: "/images/hero.png",
  },
  {
    id: 3,
    title: "How to Get to Nusa Lembongan from Bali: Fast Boat Guide",
    excerpt:
      "Planning your trip? Here is the ultimate transportation guide from Sanur harbor to Nusa Lembongan, including tips and schedules.",
    category: "Travel Tips",
    date: "April 15, 2026",
    image: "/images/island-tour.png",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2 variants={fadeUpVariants} className="text-zinc-500 font-medium tracking-[0.2em] uppercase text-xs mb-3">
            Lembongan Guide
          </motion.h2>
          <motion.h3 variants={fadeUpVariants} className="text-3xl md:text-5xl font-light text-zinc-900 mb-6 tracking-tight">
            Latest Travel Articles
          </motion.h3>
          <motion.p variants={fadeUpVariants} className="text-lg text-zinc-600 font-light leading-relaxed">
            Discover local tips, itinerary ideas, and everything you need to know
            before visiting our beautiful island.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {articles.map((article) => (
            <motion.article
              variants={fadeUpVariants}
              key={article.id}
              className="bg-white overflow-hidden border border-zinc-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col cursor-pointer group"
            >
              <div className="h-56 overflow-hidden relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-md text-white text-[10px] font-medium px-3 py-1 uppercase tracking-widest">
                  {article.category}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="text-[11px] font-medium text-zinc-400 mb-4 uppercase tracking-widest">
                  {article.date}
                </div>
                <h4 className="text-xl font-medium text-zinc-900 mb-4 group-hover:text-zinc-600 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <p className="text-zinc-600 mb-8 flex-grow text-sm font-light leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-auto border-t border-zinc-100 pt-6 flex items-center text-zinc-900 font-medium text-xs uppercase tracking-widest group-hover:text-zinc-500 transition-colors">
                  Read Article <span className="ml-2 font-normal">→</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="mt-16 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-transparent border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white px-8 py-4 font-medium tracking-wide text-sm transition-colors mx-auto uppercase"
          >
            View All Articles
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
