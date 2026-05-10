import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, ArrowRight, Pen } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog & Stories | Fun Trip Lembongan",
  description:
    "Travel stories, tips, and guides for Nusa Lembongan. Get inspired for your next island adventure.",
};

export const revalidate = 60;

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

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  const [featured, ...rest] = posts;

  return (
    <div>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-purple-300 text-sm font-medium mb-6">
            <Pen className="w-4 h-4" />
            <span>Stories from the Island</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white">
            Blog &amp; <span className="text-purple-400">Stories</span>
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Travel tips, hidden gems, and real guest experiences from the
            beautiful island of Nusa Lembongan.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <BookOpen className="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-500">
                No stories yet
              </h2>
              <p className="mt-2 text-gray-400">
                Check back soon — we&apos;re writing about our adventures!
              </p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featured && (
                <div className="mb-12">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100"
                  >
                    <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[360px] bg-gradient-to-br from-indigo-200 to-purple-200">
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
                          <BookOpen className="w-20 h-20 text-indigo-400/40" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {estimateReadTime(featured.content)}
                        </span>
                        <span>{formatDate(featured.createdAt)}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-4 leading-tight">
                        {featured.title}
                      </h2>
                      {featured.metaDescription && (
                        <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                          {featured.metaDescription}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-indigo-600 font-medium">
                        Read Story
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Rest of posts grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {rest.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
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
                            <BookOpen className="w-10 h-10 text-indigo-400/40" />
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
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight mb-2">
                          {post.title}
                        </h3>
                        {post.metaDescription && (
                          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                            {post.metaDescription}
                          </p>
                        )}
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-sm font-medium text-indigo-600">
                            Read More
                          </span>
                          <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
