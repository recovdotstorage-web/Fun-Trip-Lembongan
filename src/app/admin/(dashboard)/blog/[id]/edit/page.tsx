import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BlogForm } from "../../BlogForm";
import { deleteBlogPost } from "../../actions";
import { DangerZone } from "@/components/admin/DangerZone";

type Props = { params: Promise<{ id: string }> };

export const metadata = { title: "Edit Post — Admin" };

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;

  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <BlogForm post={post} />

      <DangerZone 
        action={deleteBlogPost} 
        id={post.id} 
        name={post.title} 
        title="Blog Post"
        redirectTo="/admin/blog"
        containerClassName="max-w-4xl px-6 lg:px-8 mx-auto mb-12"
      />
    </div>
  );
}
