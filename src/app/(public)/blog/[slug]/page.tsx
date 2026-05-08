import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Post Not Found | Fun Trip Lembongan" };
  return {
    title: `${post.metaTitle ?? post.title} | Fun Trip Lembongan`,
    description:
      post.metaDescription ?? post.content.substring(0, 160),
  };
}

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

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <div className="pt-20 lg:pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-5">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {estimateReadTime(post.content)}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
          {post.title}
        </h1>

        {/* Thumbnail */}
        {post.thumbnailUrl && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-lg">
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-a:text-indigo-600 prose-img:rounded-xl whitespace-pre-wrap">
          {post.content}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Ready to experience Lembongan?
          </h3>
          <p className="text-gray-500 mb-6">
            Book your tour or activity directly via WhatsApp — no registration needed.
          </p>
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            Browse Activities
          </Link>
        </div>
      </article>
    </div>
  );
}
