"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, ArrowRight, Flame, Search, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import { sanitizeString } from "@/lib/utils/sanitization";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnailUrl: string | null;
  metaDescription: string | null;
  createdAt: Date;
};

const CATEGORIES = [
  { key: "All", label: "ALL STORIES" },
  { key: "Travel Tips", label: "TRAVEL TIPS" },
  { key: "Guest Diaries", label: "GUEST DIARIES" },
  { key: "Adventures", label: "ADVENTURES" },
  { key: "Island Exploration", label: "ISLAND EXPLORATION" },
];

const SORT_OPTIONS = ["Latest", "Oldest"];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function estimateReadTime(content: string) {
  const words = content.replace(/<[^>]*>?/gm, "").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function getCategory(post: Post, index: number): string {
  const text = (post.title + " " + (post.metaDescription ?? "")).toLowerCase();
  if (text.includes("snorkel") || text.includes("dive") || text.includes("surf") || text.includes("adventure"))
    return "Adventures";
  if (text.includes("explore") || text.includes("island") || text.includes("hidden") || text.includes("secret"))
    return "Island Exploration";
  if (text.includes("diary") || text.includes("guest") || text.includes("experience") || text.includes("story"))
    return "Guest Diaries";
  if (text.includes("tip") || text.includes("trick") || text.includes("how") || text.includes("best"))
    return "Travel Tips";
  const cycle = ["Travel Tips", "Guest Diaries", "Adventures", "Island Exploration"];
  return cycle[index % cycle.length];
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

function PostCard({ post, index }: { post: Post & { category: string }; index: number }) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block bg-white border border-zinc-200 rounded-none transition-all duration-500 hover:border-zinc-400"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-50 border-b border-zinc-100">
          {post.thumbnailUrl ? (
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-zinc-200" strokeWidth={1} />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-[10px] font-bold bg-white text-zinc-950 border border-zinc-200 tracking-widest uppercase">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-8">
          <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-zinc-400 mb-6 uppercase">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {estimateReadTime(post.content)}
            </span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <h3 className="text-2xl font-semibold text-zinc-950 group-hover:text-zinc-600 transition-colors leading-tight mb-4">
            {post.title}
          </h3>
          {post.metaDescription && (
            <p className="text-zinc-500 line-clamp-2 text-sm leading-relaxed mb-8">
              {post.metaDescription}
            </p>
          )}
          <div className="flex items-center gap-2 text-zinc-950 font-bold text-xs tracking-widest uppercase border-b border-transparent group-hover:border-zinc-950 w-fit pb-1 transition-all">
            Read Story
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPageClient({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const searchQuery = useDebounce(searchInput, 300);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const postsWithCategories = posts.map((post, i) => ({
    ...post,
    category: getCategory(post, i),
  }));

  const filtered = postsWithCategories
    .filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.metaDescription ?? "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) =>
      sortBy === "Latest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  const featuredPost = filtered[0];
  const regularPosts = filtered.slice(1);
  const showFeatured = activeCategory === "All" && !searchQuery && filtered.length > 0;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24">
      {/* Editorial Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-200 pb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-zinc-950"></span>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-950">The Archive</span>
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold text-zinc-950 tracking-tight leading-[0.9] mb-8">
                Stories &<br /><span className="text-zinc-400 italic font-light">Perspectives.</span>
              </h1>
              <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-xl">
                A curated collection of island guides, travel narratives, and local insights from the heart of Nusa Lembongan.
              </p>
            </motion.div>

            {/* Filter Bar Inside Header Area */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-6 px-6 py-4 bg-white border border-zinc-200 rounded-none text-xs font-bold tracking-widest uppercase hover:border-zinc-400 transition-colors"
                >
                  Sort: {sortBy}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 bg-white border border-zinc-200 rounded-none py-2 min-w-[160px] z-50 shadow-xl"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setSortBy(opt); setSortOpen(false); }}
                          className={`w-full text-left px-6 py-3 text-[10px] font-bold tracking-widest uppercase transition-colors ${
                            sortBy === opt ? "bg-zinc-50 text-zinc-950" : "text-zinc-400 hover:text-zinc-950 hover:bg-zinc-50"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="SEARCH THE ARCHIVE..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(sanitizeString(e.target.value))}
                  className="pl-12 pr-6 py-4 bg-white border border-zinc-200 rounded-none text-[10px] font-bold tracking-widest uppercase focus:outline-none focus:border-zinc-950 w-full md:w-64 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar border-b border-zinc-100 pb-4">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`
                  relative flex-shrink-0 text-[10px] font-black tracking-[0.2em] uppercase transition-colors pb-4
                  ${activeCategory === key ? "text-zinc-950" : "text-zinc-300 hover:text-zinc-500"}
                `}
              >
                {label}
                {activeCategory === key && (
                  <motion.div 
                    layoutId="cat-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {filtered.length === 0 ? (
            <div className="py-32 text-center border border-dashed border-zinc-200">
              <BookOpen className="w-12 h-12 text-zinc-200 mx-auto mb-6" strokeWidth={1} />
              <h2 className="text-xl font-semibold text-zinc-950 mb-2">No entries found</h2>
              <p className="text-zinc-500 text-sm mb-8">Refine your search or try another category.</p>
              <button 
                onClick={() => { setActiveCategory("All"); setSearchInput(""); }}
                className="px-8 py-4 bg-zinc-950 text-white text-[10px] font-bold tracking-widest uppercase hover:bg-zinc-800 transition-all"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-24">
              {/* Featured Section */}
              {showFeatured && featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative"
                >
                  <Link 
                    href={`/blog/${featuredPost.slug}`}
                    className="grid grid-cols-1 lg:grid-cols-12 border border-zinc-200 rounded-none overflow-hidden bg-white hover:border-zinc-400 transition-colors duration-500"
                  >
                    <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[400px] bg-zinc-50 overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-200">
                      {featuredPost.thumbnailUrl ? (
                        <Image
                          src={featuredPost.thumbnailUrl}
                          alt={featuredPost.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-20 h-20 text-zinc-100" strokeWidth={1} />
                        </div>
                      )}
                      <div className="absolute top-8 left-8">
                        <span className="px-4 py-2 bg-zinc-950 text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                          Featured Entry
                        </span>
                      </div>
                    </div>
                    <div className="lg:col-span-5 p-10 sm:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-zinc-400 mb-8 uppercase">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {estimateReadTime(featuredPost.content)}
                        </span>
                        <span>{formatDate(featuredPost.createdAt)}</span>
                      </div>
                      <h2 className="text-4xl sm:text-5xl font-semibold text-zinc-950 leading-[1.1] mb-8 group-hover:text-zinc-600 transition-colors">
                        {featuredPost.title}
                      </h2>
                      {featuredPost.metaDescription && (
                        <p className="text-lg text-zinc-500 font-light leading-relaxed mb-12 line-clamp-4">
                          {featuredPost.metaDescription}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-zinc-950 font-bold text-sm tracking-[0.2em] uppercase border-b border-zinc-950 w-fit pb-2 transition-all group-hover:gap-5">
                        Read the full story
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Grid Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {(showFeatured ? regularPosts : filtered).map((post, idx) => (
                  <PostCard key={post.id} post={post} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
