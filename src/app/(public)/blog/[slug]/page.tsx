import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ChevronRight } from "lucide-react";
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
      post.metaDescription ?? post.content.replace(/<[^>]*>?/gm, "").substring(0, 160),
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
  const words = content.replace(/<[^>]*>?/gm, "").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.thumbnailUrl || "https://funtriplembongan.com/images/hero.png",
    "datePublished": post.createdAt.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Fun Trip Lembongan",
      "url": "https://funtriplembongan.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fun Trip Lembongan",
      "logo": {
        "@type": "ImageObject",
        "url": "https://funtriplembongan.com/images/hero.png"
      }
    },
    "description": post.metaDescription || post.content.replace(/<[^>]*>?/gm, "").substring(0, 160),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://funtriplembongan.com/blog/${post.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
      {/* Header / Hero */}
      <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb / Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 uppercase tracking-widest hover:text-zinc-950 mb-12 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Stories
          </Link>

          {/* Title & Meta */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8">
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-none border border-zinc-200">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-none border border-zinc-200">
                <Clock className="w-3.5 h-3.5" />
                {estimateReadTime(post.content)}
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-(family-name:--font-outfit) font-semibold text-zinc-950 leading-[0.9] tracking-tight mb-4">
              {post.title}
            </h1>
          </div>

          {/* Featured Image - Boxed Style */}
          {post.thumbnailUrl && (
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-none border border-zinc-200 shadow-2xl shadow-zinc-200/50 mb-16">
              <Image
                src={post.thumbnailUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Article Content */}
          <article className="lg:col-span-8">
            <div 
              className="prose prose-zinc prose-lg sm:prose-xl max-w-none 
                font-(family-name:--font-outfit)
                prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-zinc-950 
                prose-p:text-zinc-600 prose-p:leading-[1.8] prose-p:font-normal
                prose-a:text-zinc-950 prose-a:font-semibold hover:prose-a:text-zinc-700 
                prose-img:rounded-none prose-img:border prose-img:border-zinc-200
                prose-strong:text-zinc-950 prose-strong:font-semibold
                prose-blockquote:italic prose-blockquote:border-l-4 prose-blockquote:border-zinc-200 prose-blockquote:text-zinc-700"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            {/* Social Share / Meta Bottom */}
            <div className="mt-20 pt-10 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="text-xs uppercase tracking-widest font-bold text-zinc-400">
                Published in <span className="text-zinc-950">Stories & Insights</span>
              </div>
            </div>
          </article>

          {/* Sidebar - Boxed CTA */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="p-10 bg-zinc-950 rounded-none text-white overflow-hidden relative group">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <img src="https://images.unsplash.com/photo-1506929197327-fb062b803651?q=80&w=600&auto=format&fit=crop" alt="Texture" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-(family-name:--font-outfit) font-semibold mb-4 leading-tight">
                    Experience the Magic of Lembongan
                  </h3>
                  <p className="text-zinc-400 mb-8 font-light text-sm leading-relaxed">
                    Book your tour or activity directly with our local guides. Experience the island like a local.
                  </p>
                  <Link
                    href="/#services"
                    className="flex items-center justify-center gap-2 w-full py-5 bg-white text-zinc-950 font-bold rounded-none transition-all active:scale-95 shadow-xl shadow-black/20"
                  >
                    View All Activities
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Need Help Card */}
              <div className="p-10 border border-zinc-200 rounded-none bg-white">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-950 mb-6">Need Help?</h4>
                <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                  Have questions about this article or planning your trip? We&apos;re here to help.
                </p>
                <Link href="/#contact" className="text-zinc-950 font-bold text-sm border-b border-zinc-950 pb-1 hover:text-zinc-600 hover:border-zinc-600 transition-colors">
                  Get in touch
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
      </div>
    </>
  );
}
