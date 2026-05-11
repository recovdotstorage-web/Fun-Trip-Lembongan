import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BlogForm } from "../../BlogForm";
import { deleteBlogPost } from "../../actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

type Props = { params: Promise<{ id: string }> };

export const metadata = { title: "Edit Post — Admin" };

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;

  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <BlogForm post={post} />

      {/* Danger zone */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-10">
        <div className="border border-red-100 rounded-[2.5rem] p-8 bg-white shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Danger Zone
              </h3>
              <p className="text-[11px] text-zinc-400 font-medium max-w-md">
                Deleting this post is permanent. All content, images, and SEO metadata associated with this entry will be lost forever.
              </p>
            </div>

            <DeleteButton 
              action={deleteBlogPost} 
              id={post.id} 
              name={post.title} 
              className="md:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
