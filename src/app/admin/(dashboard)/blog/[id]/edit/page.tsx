import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BlogForm } from "../../BlogForm";
import { deleteBlogPost } from "../../actions";
import { Trash2 } from "lucide-react";

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
        <div className="border border-red-100 rounded-2xl p-6 bg-red-50/40">
          <h3 className="text-sm font-semibold text-red-700 mb-1">Danger Zone</h3>
          <p className="text-sm text-red-500 mb-4">
            Deleting this post is permanent and cannot be undone.
          </p>
          <form
            action={async () => {
              "use server";
              await deleteBlogPost(id);
            }}
          >
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
