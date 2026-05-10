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
              className="bg-white overflow-hidden border border-zinc-200 flex flex-col cursor-pointer group"
            >
              <div className="h-64 overflow-hidden relative border-b border-zinc-200">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-0 left-0 bg-zinc-900 text-white text-[10px] font-bold px-4 py-2 uppercase tracking-widest">
                  {article.category}
                </div>
              </div>

              <div className="p-10 flex flex-col flex-grow">
                <div className="text-[11px] font-bold text-zinc-400 mb-6 uppercase tracking-widest">
                  {article.date}
                </div>
                <h4 className="text-2xl font-[family-name:var(--font-outfit)] font-semibold text-zinc-950 mb-6 group-hover:text-zinc-600 transition-colors line-clamp-2 leading-tight">
                  {article.title}
                </h4>
                <p className="text-zinc-600 mb-8 flex-grow text-base font-normal leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-auto border-t border-zinc-200 pt-8 flex items-center text-zinc-950 font-bold text-xs uppercase tracking-widest">
                  Read Article <span className="ml-3">→</span>
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
          className="mt-20 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 bg-zinc-950 text-white px-10 py-5 font-bold tracking-widest text-sm transition-all active:scale-95 uppercase"
          >
            Explore All Stories
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
