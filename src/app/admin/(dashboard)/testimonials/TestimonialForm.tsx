"use client";

import { useState, useTransition, useRef } from "react";
import { Star, ArrowLeft, ImagePlus, X, Loader2, Save } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createTestimonial, updateTestimonial } from "./actions";

interface TestimonialFormProps {
  initialData?: {
    id: string;
    name: string;
    content: string;
    rating: number;
    status: string;
    imageUrl?: string | null;
  };
}

export default function TestimonialForm({ initialData }: TestimonialFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [rating, setRating] = useState(initialData?.rating || 5);
  const [preview, setPreview] = useState<string | null>(initialData?.imageUrl || null);
  const [removeImage, setRemoveImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setRemoveImage(false);
    }
  }

  function handleRemoveImage() {
    setPreview(null);
    setRemoveImage(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("rating", rating.toString());
    formData.set("removeImage", removeImage.toString());
    
    startTransition(async () => {
      try {
        if (initialData) {
          await updateTestimonial(initialData.id, formData);
        } else {
          await createTestimonial(formData);
        }
        router.push("/admin/testimonials");
        router.refresh();
      } catch (error) {
        alert("Something went wrong");
      }
    });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <Link 
          href="/admin/testimonials"
          className="inline-flex items-center gap-2 text-[10px] font-bold text-zinc-400 hover:text-zinc-900 uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to List
        </Link>
        <div className="h-px flex-1 bg-zinc-100 mx-6" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-3xl border border-zinc-100 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-2xl font-medium text-zinc-900 font-serif italic">
            {initialData ? "Edit Review" : "Capture Kindness"}
          </h2>
          <p className="text-sm text-zinc-400 font-light">
            Share what our guests have to say about their experience.
          </p>
        </div>

        {/* Photo Upload */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Guest Photo</label>
          <div className="flex gap-4 items-center">
            <input
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            {preview ? (
              <div className="relative rounded-full overflow-hidden w-20 h-20 shrink-0 bg-zinc-100 border-2 border-white shadow-md">
                <Image
                  src={preview}
                  alt="Guest"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center w-20 h-20 shrink-0 border-2 border-dashed border-zinc-100 rounded-full cursor-pointer hover:border-zinc-300 hover:bg-zinc-50 transition group"
              >
                <ImagePlus className="w-5 h-5 text-zinc-300 group-hover:text-zinc-400" />
              </button>
            )}
            <div className="flex-1">
              <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
                Optional: Add a face to the name. Square aspect ratio works best.
              </p>
            </div>
          </div>
        </div>

        {/* Name Input */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Guest Name</label>
          <input
            name="name"
            defaultValue={initialData?.name}
            required
            placeholder="e.g. Amanda C."
            className="w-full px-5 py-4 rounded-xl border border-zinc-100 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all text-sm font-medium"
          />
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Experience Rating</label>
          <div className="flex items-center gap-3 bg-zinc-50/50 p-4 rounded-xl border border-zinc-100">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setRating(val)}
                className="group transition-transform active:scale-90"
              >
                <Star 
                  className={`w-6 h-6 transition-colors ${val <= rating ? "text-amber-400 fill-amber-400" : "text-zinc-200"}`} 
                />
              </button>
            ))}
            <span className="ml-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              {rating} / 5 Stars
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Testimonial Text</label>
          <textarea
            name="content"
            defaultValue={initialData?.content}
            required
            rows={5}
            placeholder="Paste the guest's review here..."
            className="w-full px-5 py-4 rounded-xl border border-zinc-100 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all text-sm leading-relaxed"
          />
        </div>

        {/* Status */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Visibility Status</label>
          <select 
            name="status"
            defaultValue={initialData?.status || "PUBLISHED"}
            className="w-full px-5 py-4 rounded-xl border border-zinc-100 bg-zinc-50/50 focus:bg-white outline-none transition-all text-sm font-medium appearance-none"
          >
            <option value="PUBLISHED">Published (Visible on site)</option>
            <option value="DRAFT">Draft (Hidden)</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={pending}
          className="w-full py-5 bg-zinc-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {pending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4" />
              {initialData ? "Update Testimonial" : "Post Testimonial"}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
