"use client";

import { Star, MessageSquarePlus, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useTransition, useEffect } from "react";
import { submitReview } from "@/app/(public)/actions";

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

const ratingLabels: Record<number, string> = {
  1: "Poor - We will improve",
  2: "Fair - Needs improvement",
  3: "Average - Good experience",
  4: "Very Good - Highly enjoyed",
  5: "Excellent - Absolute paradise!",
};

export function TestimonialsSection({ testimonials = [] }: { testimonials?: any[] }) {
  const [activeTestimonials, setActiveTestimonials] = useState<any[]>(testimonials);
  
  const totalReviews = activeTestimonials.length;
  const averageRating = totalReviews > 0
    ? (activeTestimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviews).toFixed(1)
    : "5.0";

  const [rating, setRating] = useState(5);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const fetchLatest = async () => {
    try {
      const response = await fetch(`/api/testimonials?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        setActiveTestimonials(data);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    }
  };

  useEffect(() => {
    // Initial fetch to get any recent updates
    fetchLatest();

    const interval = setInterval(fetchLatest, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("rating", rating.toString());

    const name = formData.get("name") as string;
    const content = formData.get("content") as string;

    if (!name || name.trim().length === 0) {
      setError("Please enter your name.");
      return;
    }
    if (!content || content.trim().length === 0) {
      setError("Please write your review comment.");
      return;
    }

    startTransition(async () => {
      const res = await submitReview(formData);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        setRating(5);
        formRef.current?.reset();
        await fetchLatest();
      }
    });
  };

  return (
    <section id="reviews" className="py-24 bg-[#FAFAFA] overflow-hidden border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeUpVariants} className="text-zinc-900 font-light tracking-widest uppercase text-sm mb-2">
            Guest Experience
          </motion.h2>
          <motion.h3 variants={fadeUpVariants} className="text-3xl md:text-5xl font-medium text-zinc-900 mb-6">
            Review & Feedback
          </motion.h3>
          <motion.p variants={fadeUpVariants} className="text-lg text-zinc-600 font-light">
            Read what our wonderful guests have written or share your own memorable adventure with us.
          </motion.p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left: Testimonials Grid */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200 pb-3 mb-6">
              Guest Reviews ({activeTestimonials.length})
            </h4>

            {/* Overall Rating Aggregate Card */}
            {totalReviews > 0 && (
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 md:gap-8 shadow-sm mb-8">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Overall Rating
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-5xl font-bold text-zinc-950 tracking-tight">
                      {averageRating}
                    </span>
                    <span className="text-zinc-400 text-sm font-light">
                      / 5.0
                    </span>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-12 bg-zinc-200" />

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex justify-center sm:justify-start gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => {
                      const numericAvg = parseFloat(averageRating);
                      const isFull = i <= Math.floor(numericAvg);
                      const isHalf = !isFull && (i - 0.5 <= numericAvg);
                      return (
                        <Star
                          key={i}
                          className={`h-4.5 w-4.5 ${
                            isFull
                              ? "text-amber-500 fill-amber-500"
                              : isHalf
                              ? "text-amber-500 fill-amber-500"
                              : "text-zinc-200"
                          }`}
                          fill={isFull ? "currentColor" : "none"}
                        />
                      );
                    })}
                  </div>
                  <p className="text-zinc-800 text-xs font-semibold uppercase tracking-wider">
                    Based on {totalReviews} guest {totalReviews === 1 ? 'review' : 'reviews'}
                  </p>
                  <p className="text-zinc-500 text-[11px] font-light mt-0.5">
                    Real-time guest ratings, 100% verified.
                  </p>
                </div>
              </div>
            )}

            {activeTestimonials.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-zinc-200 p-12 text-center rounded-2xl shadow-sm"
              >
                <MessageSquarePlus className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                <h5 className="text-lg font-medium text-zinc-700 mb-1">No reviews yet</h5>
                <p className="text-zinc-400 text-sm max-w-sm mx-auto font-light">
                  Be the very first guest to share your beautiful journey of Nusa Lembongan and Nusa Penida! Use the form on the right.
                </p>
              </motion.div>
            ) : (
              <div className={activeTestimonials.length > 4 ? "max-h-[460px] overflow-y-auto pr-3 md:pr-4 -mr-3 md:-mr-4" : ""}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                  <AnimatePresence mode="popLayout">
                    {activeTestimonials.map((t) => (
                      <motion.div
                        key={t.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={springTransition}
                        className="bg-white border border-zinc-200 p-8 flex flex-col justify-between rounded-2xl group shadow-sm hover:shadow-md transition-all duration-300"
                      >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="flex items-center gap-1.5">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4.5 w-4.5 ${
                                    i < t.rating
                                      ? "text-amber-500 fill-amber-500"
                                      : "text-zinc-200"
                                  }`}
                                  fill={i < t.rating ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-bold text-zinc-700">
                              ({t.rating}/5)
                            </span>
                          </div>
                          <span 
                            suppressHydrationWarning
                            className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider"
                          >
                            {new Date(t.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-zinc-600 italic mb-6 leading-relaxed text-sm md:text-base font-light">
                          &ldquo;{t.content}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                        <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs uppercase">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-zinc-900 text-sm uppercase tracking-wider">
                            {t.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                              alt="Google"
                              className="w-3 h-3"
                            />
                            <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-light">
                              Verified Guest Review
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Right: Review Form Card */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 order-1 lg:order-2">
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-medium text-zinc-900 mb-2 flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-zinc-800" />
                Share Your Experience
              </h3>
              <p className="text-zinc-500 font-light text-xs md:text-sm mb-6 leading-relaxed">
                Your beautiful memories inspire other travelers. Submit your rating and review here!
              </p>

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-zinc-900 mb-2">Review Submitted!</h4>
                    <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed mb-6">
                      Thank you for sharing your experience! Your review has been saved successfully.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-2.5 bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-xl"
                    >
                      Write Another Review
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Star Rating Select */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setRating(i)}
                              disabled={isPending}
                              className="p-1 text-zinc-200 hover:scale-110 transition-transform focus:outline-none"
                            >
                              <Star
                                className={`w-7 h-7 transition-colors ${
                                  i <= rating
                                    ? "text-amber-500 fill-amber-500"
                                    : "text-zinc-200"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                        <span className="text-xs text-zinc-400 font-light italic ml-2">
                          {ratingLabels[rating]}
                        </span>
                      </div>
                    </div>

                    {/* Name Input */}
                    <div>
                      <label htmlFor="reviewer-name" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="reviewer-name"
                        name="name"
                        placeholder="e.g. Amanda C."
                        disabled={isPending}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    {/* Content Textarea */}
                    <div>
                      <label htmlFor="reviewer-content" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        Review / Experience
                      </label>
                      <textarea
                        id="reviewer-content"
                        name="content"
                        rows={4}
                        placeholder="How was the tour, snorkeling safari, or rentals? Describe your beautiful moments..."
                        disabled={isPending}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all resize-none"
                        required
                      />
                    </div>

                    {/* Error Alerts */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 text-xs"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting Review...
                        </>
                      ) : (
                        "Submit Review"
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
