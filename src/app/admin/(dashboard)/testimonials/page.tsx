import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Star, Quote, Clock } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import * as motion from "framer-motion/client";
import { deleteTestimonial } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

function timeAgo(date: Date) {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string; limit?: string }>;
}) {
  const { page = "1", sort = "desc", limit = "10" } = await searchParams;
  const currentPage = parseInt(page);
  const pageSize = parseInt(limit);
  const order = sort === "asc" ? "asc" : "desc";

  const [testimonials, totalTestimonials] = await Promise.all([
    // @ts-ignore - Handle runtime cases where client might be stale
    (prisma.testimonial || (prisma as any).testimonial).findMany({
      orderBy: { createdAt: order },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    // @ts-ignore
    (prisma.testimonial || (prisma as any).testimonial).count(),
  ]);

  const totalPages = Math.ceil(totalTestimonials / pageSize);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto bg-[#FDFBF7] min-h-screen"
    >
      <AdminHeader
        title="Guest Reviews"
        highlight="Overview"
        category="Public Relations"
        subtitle={`View guest testimonials submitted from the website. You can view all reviews or delete inappropriate ones. ${totalTestimonials} reviews received.`}
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-zinc-100 shadow-sm mt-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-zinc-50 p-1 rounded-lg border border-zinc-100">
            <Link
              href={`/admin/testimonials?page=1&sort=desc&limit=${pageSize}`}
              className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                order === "desc"
                  ? "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Newest
            </Link>
            <Link
              href={`/admin/testimonials?page=1&sort=asc&limit=${pageSize}`}
              className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                order === "asc"
                  ? "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Oldest
            </Link>
          </div>
        </div>
      </div>

      {totalTestimonials === 0 ? (
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm py-32 text-center">
          <Quote className="w-16 h-16 text-zinc-100 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-zinc-400 font-serif italic">
            No guest reviews yet
          </h2>
          <p className="text-sm text-zinc-300 mt-2 max-w-xs mx-auto">
            Testimonials submitted by guests on the homepage will automatically appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div 
                key={t.id} 
                className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-900 text-white font-bold text-sm uppercase border border-zinc-200">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-tight">{t.name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-2.5 h-2.5 ${i < t.rating ? "text-amber-400 fill-amber-400" : "text-zinc-200"}`} 
                                fill={i < t.rating ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-bold text-zinc-500">
                            ({t.rating}/5)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed italic line-clamp-5 mb-6 bg-zinc-50/50 p-3 rounded-xl border border-zinc-100">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                  <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {timeAgo(t.createdAt)}
                  </span>
                  <div className="flex items-center gap-2">
                    <DeleteButton 
                      id={t.id} 
                      name={t.name} 
                      title="Review" 
                      action={deleteTestimonial} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between bg-white p-4 rounded-xl border border-zinc-100 shadow-sm">
             <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Page {currentPage} of {totalPages || 1}
            </div>
            <div className="flex items-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/admin/testimonials?page=${currentPage - 1}&sort=${order}&limit=${pageSize}`}
                  className="px-4 py-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-900 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-zinc-100 transition-colors"
                >
                  Previous
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`/admin/testimonials?page=${currentPage + 1}&sort=${order}&limit=${pageSize}`}
                  className="px-4 py-2 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-sm"
                >
                  Next Page
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
