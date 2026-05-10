"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, ArrowRight, Flame, Search, X, ChevronDown } from "lucide-react";

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
  }).format(date);
}

function estimateReadTime(content: string) {
  const words = content.split(/\s+/).length;
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

function PostCard({ post, isHot = false }: { post: Post & { category: string }; isHot?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-cyan-100 to-sky-200">
        {post.thumbnailUrl ? (
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-sky-400/40" />
          </div>
        )}
        {isHot && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-rose-500 text-white rounded-full shadow-md">
              <Flame className="w-3 h-3" />
              Hot
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {estimateReadTime(post.content)}
          </span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-tight mb-2">
          {post.title}
        </h3>
        {post.metaDescription && (
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {post.metaDescription}
          </p>
        )}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm font-medium text-sky-600">Read More</span>
          <ArrowRight className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default function BlogPageClient({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Debounced search — 300 ms
  const searchQuery = useDebounce(searchInput, 300);

  // Close sort dropdown on outside click
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

  const [featured, ...rest] = filtered;
  const showFeatured = activeCategory === "All" && !searchQuery;

  return (
    <>
      {/* ─── Tab Filter Bar ─── */}
      <section className="bg-white border-b border-gray-200 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Category tabs */}
            <nav className="flex items-center overflow-x-auto no-scrollbar" aria-label="Blog categories">
              {CATEGORIES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`
                    relative flex-shrink-0 px-4 py-5 text-xs font-bold tracking-widest transition-colors
                    ${activeCategory === key
                      ? "text-sky-700"
                      : "text-gray-400 hover:text-gray-700"
                    }
                  `}
                >
                  {label}
                  {/* Active underline */}
                  {activeCategory === key && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-sky-600 rounded-t-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right side: Search + Sort */}
            <div className="flex items-center gap-3 flex-shrink-0 pl-4">
              {/* Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => { if (!searchInput) setSearchOpen(false); }}
                  className={`pl-8 pr-7 py-1.5 text-xs rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-500 ${
                    searchOpen ? "w-64" : "w-36"
                  }`}
                />
                {searchInput && (
                  <button
                    onClick={() => setSearchInput("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Sort dropdown */}
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setSortOpen((o) => !o)}
                  className="flex items-center gap-1 text-xs font-bold tracking-widest text-gray-500 hover:text-gray-800 transition py-5 whitespace-nowrap"
                >
                  SORT BY: {sortBy.toUpperCase()}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[120px] z-50">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSortBy(opt); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold tracking-wide transition ${
                          sortBy === opt ? "text-sky-600 bg-sky-50" : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {opt.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile search (shown below tabs) */}
          <div className="sm:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Posts ─── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <BookOpen className="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-500">No articles found</h2>
              <p className="mt-2 text-gray-400">Try a different category or search term.</p>
              <button
                onClick={() => { setActiveCategory("All"); setSearchInput(""); }}
                className="mt-6 px-5 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-medium hover:bg-sky-700 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && showFeatured && (
                <div className="mb-12">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100"
                  >
                    <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[360px] bg-gradient-to-br from-cyan-200 to-sky-300">
                      {featured.thumbnailUrl ? (
                        <Image
                          src={featured.thumbnailUrl}
                          alt={featured.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-20 h-20 text-sky-400/40" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 text-xs font-semibold bg-sky-600 text-white rounded-full shadow">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <span className="inline-block text-xs font-bold tracking-widest text-sky-600 uppercase mb-4">
                        {featured.category}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {estimateReadTime(featured.content)}
                        </span>
                        <span>{formatDate(featured.createdAt)}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors mb-4 leading-tight">
                        {featured.title}
                      </h2>
                      {featured.metaDescription && (
                        <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                          {featured.metaDescription}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-sky-600 font-medium">
                        Read Story
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Grid */}
              {(showFeatured ? rest : filtered).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {(showFeatured ? rest : filtered).map((post, i) => (
                    <PostCard key={post.id} post={post} isHot={i === 0} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
