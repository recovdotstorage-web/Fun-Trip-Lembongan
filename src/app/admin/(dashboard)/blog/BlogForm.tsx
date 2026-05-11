"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, ImagePlus, X } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { createBlogPost, updateBlogPost } from "./actions";
import type { BlogPost } from "@prisma/client";

type Props = {
  post?: BlogPost;
};

export function BlogForm({ post }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState("");
  const [preview, setPreview] = useState<string | null>(
    post?.thumbnailUrl ?? null
  );

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      if (post) {
        await updateBlogPost(post.id, fd);
        setFeedback("Saved!");
        setTimeout(() => setFeedback(""), 3000);
      } else {
        await createBlogPost(fd);
      }
    });
  }

  const inputCls =
    "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white";
  const labelCls = "block text-sm font-semibold text-gray-700 mb-1.5";

  function fillDummyData() {
    const form = document.querySelector("form") as HTMLFormElement;
    if (!form) return;

    const dummyData: Record<string, string> = {
      title: "Discover the Hidden Gems of Nusa Lembongan",
      status: "PUBLISHED",
      content: `Nusa Lembongan is more than just a day trip from Bali. It's a sanctuary of tranquility and natural beauty.

In this guide, we'll explore:
1. Devil's Tears - Nature's Raw Power
2. Dream Beach - The Ultimate Relaxation
3. Mangrove Forest - A Serene Escape
4. Yellow Bridge - The Iconic Landmark

Make sure to bring your camera and your sense of adventure!`,
      metaTitle: "Hidden Gems of Nusa Lembongan | Fun Trip Guide",
      metaDescription: "Explore the best-kept secrets of Nusa Lembongan. From Devil's Tears to the Mangrove Forest, discover why this island is a must-visit.",
    };

    Object.entries(dummyData).forEach(([key, val]) => {
      const input = form.querySelector(`[name="${key}"]`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      if (input) {
        input.value = val;
      }
    });
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <AdminHeader
        title={post ? "Edit" : "New"}
        highlight={post ? "Post" : "Blog Post"}
        subtitle={post ? `Currently editing: /${post.slug}` : "Create a new story for your audience. Share insights, updates, and more."}
        category="Blog Management"
        backButton={{ href: "/admin/blog" }}
      >
        {!post && (
          <button
            type="button"
            onClick={fillDummyData}
            className="text-xs font-bold text-zinc-400 hover:text-zinc-900 uppercase tracking-widest border border-zinc-200 px-4 py-2 rounded-xl hover:bg-zinc-50 transition-all active:scale-95 h-fit self-end mb-1"
          >
            Fill Dummy
          </button>
        )}
        {feedback && (
          <div className="self-end mb-1">
            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {feedback}
            </span>
          </div>
        )}
      </AdminHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main content */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">
            Content
          </h2>

          {/* Thumbnail */}
          <div>
            <label className={labelCls}>Thumbnail Image</label>
            <div className="flex gap-4 items-start">
              {preview ? (
                <div className="relative rounded-xl overflow-hidden w-40 h-28 shrink-0 bg-gray-100">
                  <Image
                    src={preview}
                    alt="Thumbnail preview"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                    }}
                    className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 rounded-md text-white transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-40 h-28 shrink-0 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/50 transition">
                  <ImagePlus className="w-6 h-6 text-gray-300 mb-1" />
                  <span className="text-xs text-gray-400">Choose image</span>
                  <input
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
              <div className="flex-1">
                <p className="text-xs text-gray-400">
                  Recommended: 1200×630px (16:9). JPG or PNG.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>Title *</label>
            <input
              name="title"
              type="text"
              required
              defaultValue={post?.title}
              placeholder="e.g. Top 5 Things to Do in Nusa Lembongan"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Status *</label>
            <select
              name="status"
              required
              defaultValue={post?.status ?? "DRAFT"}
              className={inputCls}
            >
              <option value="DRAFT">Draft (hidden)</option>
              <option value="PUBLISHED">Published (live)</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Content *</label>
            <textarea
              name="content"
              required
              rows={14}
              defaultValue={post?.content}
              placeholder="Write your blog post here…"
              className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
            />
            <p className="text-xs text-gray-400 mt-1">
              Plain text — line breaks will be preserved when displayed.
            </p>
          </div>
        </section>

        {/* SEO */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">
            SEO
          </h2>

          <div>
            <label className={labelCls}>Meta Title</label>
            <input
              name="metaTitle"
              type="text"
              defaultValue={post?.metaTitle ?? ""}
              placeholder="Leave blank to use the post title"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Meta Description</label>
            <textarea
              name="metaDescription"
              rows={3}
              defaultValue={post?.metaDescription ?? ""}
              placeholder="Brief summary (150–160 chars) for search engines"
              className={`${inputCls} resize-none`}
            />
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-indigo-500/20 disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving…
              </>
            ) : post ? (
              "Save Changes"
            ) : (
              "Publish Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
