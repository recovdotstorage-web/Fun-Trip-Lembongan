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




export function BlogSection({ posts = [] }: { posts?: any[] }) {
  if (!posts || posts.length === 0) return null;

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
          {posts.map((post) => (
            <motion.article
              variants={fadeUpVariants}
              key={post.id}
              className="bg-white overflow-hidden border border-zinc-200 flex flex-col cursor-pointer group"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                <div className="h-64 overflow-hidden relative border-b border-zinc-200">
                  <Image
                    src={post.thumbnailUrl || "/images/placeholder.png"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {post.metaTitle && (
                    <div className="absolute top-0 left-0 bg-zinc-900 text-white text-[10px] font-bold px-4 py-2 uppercase tracking-widest">
                      {post.metaTitle}
                    </div>
                  )}
                </div>

                <div className="p-10 flex flex-col flex-grow">
                  <div className="text-[11px] font-bold text-zinc-400 mb-6 uppercase tracking-widest">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h4 className="text-2xl font-[family-name:var(--font-outfit)] font-semibold text-zinc-950 mb-6 group-hover:text-zinc-600 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h4>
                  <p className="text-zinc-600 mb-8 flex-grow text-base font-normal leading-relaxed line-clamp-3">
                    {post.metaDescription || post.content.replace(/<[^>]*>/g, '').slice(0, 160) + "..."}
                  </p>
                  <div className="mt-auto border-t border-zinc-200 pt-8 flex items-center text-zinc-950 font-bold text-xs uppercase tracking-widest">
                    Read Article <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
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
