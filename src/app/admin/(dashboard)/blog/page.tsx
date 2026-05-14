import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, BookOpen, Clock } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EditButton, ViewButton, DeleteButton } from "@/components/admin/AdminButtons";
import { deleteBlogPost } from "./actions";

export const dynamic = "force-dynamic";

function timeAgo(date: Date) {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string; limit?: string }>;
}) {
  const { page = "1", sort = "desc", limit = "10" } = await searchParams;
  const currentPage = parseInt(page);
  const pageSize = parseInt(limit);
  const order = sort === "asc" ? "asc" : "desc";

  const [posts, totalPosts] = await Promise.all([
    prisma.blogPost.findMany({
      orderBy: { createdAt: order },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prisma.blogPost.count(),
  ]);

  const totalPages = Math.ceil(totalPosts / pageSize);

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto bg-[#FDFBF7] min-h-screen">
      <AdminHeader
        title="Blog &"
        highlight="Stories"
        category="Content Management"
        subtitle={`Manage your journal entries and guides. ${totalPosts} total posts recorded.`}
        addButton={{
          href: "/admin/blog/new",
          label: "New Post",
        }}
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-zinc-100 shadow-sm mt-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-zinc-50 p-1 rounded-lg border border-zinc-100">
            <Link
              href={`/admin/blog?page=1&sort=desc&limit=${pageSize}`}
              className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                order === "desc"
                  ? "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Newest
            </Link>
            <Link
              href={`/admin/blog?page=1&sort=asc&limit=${pageSize}`}
              className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                order === "asc"
                  ? "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Oldest
            </Link>
          </div>
          
          <div className="h-4 w-[1px] bg-zinc-100" />
          
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Show:</span>
            <div className="flex items-center bg-zinc-50 p-1 rounded-lg border border-zinc-100">
              {[10, 50, 100].map((val) => (
                <Link
                  key={val}
                  href={`/admin/blog?page=1&sort=${order}&limit=${val}`}
                  className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                    pageSize === val
                      ? "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  {val}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {totalPosts === 0 ? (
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm py-32 text-center">
          <BookOpen className="w-16 h-16 text-zinc-100 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-zinc-400 font-serif italic">
            No journal entries yet
          </h2>
          <p className="text-sm text-zinc-300 mt-2 mb-8 max-w-xs mx-auto">
            Your publication is currently empty. Start by sharing an island story.
          </p>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-3 px-8 py-3 bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            Write First Post
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white border border-zinc-100 rounded-xl overflow-hidden shadow-sm">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-50">
                    <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Post Details</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Created</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {posts.map((post) => (
                    <tr key={post.id} className="group hover:bg-zinc-50 transition-colors duration-500">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 group-hover:scale-105 transition-transform duration-500">
                            {post.thumbnailUrl ? (
                              <Image
                                src={post.thumbnailUrl}
                                alt={post.title}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-200">
                                <BookOpen className="w-6 h-6" strokeWidth={1} />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-zinc-900 group-hover:translate-x-1 transition-transform duration-500 line-clamp-1">{post.title}</p>
                            <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest mt-1">/{post.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${
                          post.status === "PUBLISHED" ? "bg-indigo-50 text-indigo-600" : "bg-zinc-50 text-zinc-400"
                        }`}>
                          {post.status === "PUBLISHED" ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-[10px] text-zinc-300 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {timeAgo(post.createdAt)}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          {post.status === "PUBLISHED" && (
                            <ViewButton href={`/blog/${post.slug}`} />
                          )}
                          <EditButton href={`/admin/blog/${post.id}/edit`} />
                          <DeleteButton 
                            id={post.id} 
                            name={post.title} 
                            title="Blog Post" 
                            action={deleteBlogPost} 
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List View */}
            <div className="md:hidden divide-y divide-zinc-50">
              {posts.map((post) => (
                <div key={post.id} className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0">
                      {post.thumbnailUrl ? (
                        <Image
                          src={post.thumbnailUrl}
                          alt={post.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-200">
                          <BookOpen className="w-8 h-8" strokeWidth={1} />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-bold text-zinc-900 line-clamp-2">{post.title}</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1 truncate">/{post.slug}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-widest ${
                          post.status === "PUBLISHED" ? "bg-indigo-50 text-indigo-600" : "bg-zinc-50 text-zinc-400"
                        }`}>
                          {post.status === "PUBLISHED" ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <EditButton href={`/admin/blog/${post.id}/edit`} variant="full" label="Edit Post" />
                    {post.status === "PUBLISHED" && (
                      <ViewButton href={`/blog/${post.slug}`} variant="full" />
                    )}
                    <DeleteButton 
                      id={post.id} 
                      name={post.title} 
                      title="Blog Post" 
                      action={deleteBlogPost} 
                      variant="full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-zinc-100 shadow-sm">
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Page {currentPage} of {totalPages || 1}
            </div>
            <div className="flex items-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/admin/blog?page=${currentPage - 1}&sort=${order}&limit=${pageSize}`}
                  className="px-4 py-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-900 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-zinc-100 transition-colors"
                >
                  Previous
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`/admin/blog?page=${currentPage + 1}&sort=${order}&limit=${pageSize}`}
                  className="px-4 py-2 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-sm"
                >
                  Next Page
                </Link>
              )}
            </div>
          </div>
        </>
      )}

      {/* Decorative Architecture */}
      <div className="mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-10 pb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-zinc-100" />
          <p className="text-[9px] text-zinc-300 font-bold uppercase tracking-[0.4em]">End of entries</p>
        </div>
        <p className="text-[9px] text-zinc-300 font-medium uppercase tracking-widest">FTM Blog Module v1.1</p>
      </div>
    </div>
  );
}

