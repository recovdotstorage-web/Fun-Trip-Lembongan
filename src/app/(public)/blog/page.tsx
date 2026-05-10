import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import BlogPageClient from "@/components/blog/BlogPageClient";

export const metadata: Metadata = {
  title: "Blog & Stories | Fun Trip Lembongan",
  description:
    "Travel stories, tips, and guides for Nusa Lembongan. Get inspired for your next island adventure.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* Hero — full-bleed photo */}
      <section className="relative h-[420px] sm:h-[520px] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero.png"
          alt="Nusa Lembongan ocean view"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
          <h1
            className="text-4xl sm:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            Island Tales &amp; Travel Guides
          </h1>
          <p
            className="mt-5 text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
          >
            Discover the hidden secrets of Nusa Lembongan through the eyes of our guests and local experts.
          </p>
        </div>
      </section>

      <BlogPageClient posts={posts} />
    </div>
  );
}
