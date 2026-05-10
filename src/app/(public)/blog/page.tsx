import type { Metadata } from "next";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Fun Trip Lembongan Blog",
    "description": "Travel stories and guides for Nusa Lembongan",
    "publisher": {
      "@type": "Organization",
      "name": "Fun Trip Lembongan",
      "logo": {
        "@type": "ImageObject",
        "url": "https://funtriplembongan.com/images/hero.png"
      }
    },
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `https://funtriplembongan.com/blog/${post.slug}`,
      "datePublished": post.createdAt.toISOString(),
      "image": post.thumbnailUrl || "https://funtriplembongan.com/images/hero.png",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPageClient posts={posts} />
    </>
  );
}
