"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { v2 as cloudinary } from "cloudinary";
import { recordAuditLog } from "@/lib/audit";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function requireAdmin() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

function buildSlug(title: string) {
  return slugify(title, { lower: true, strict: true });
}

export async function createBlogPost(formData: FormData) {
  const session = await requireAdmin();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const metaTitle = (formData.get("metaTitle") as string) || null;
  const metaDescription = (formData.get("metaDescription") as string) || null;
  const status = formData.get("status") as string;
  const imageFile = formData.get("thumbnail") as File | null;

  let slug = buildSlug(title);
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  let thumbnailPublicId: string | null = null;
  let thumbnailUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await new Promise<{ public_id: string; secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "funtriplembongan/blog", resource_type: "image" },
            (err, res) => (err ? reject(err) : resolve(res as any))
          )
          .end(buffer);
      }
    );
    thumbnailPublicId = result.public_id;
    thumbnailUrl = result.secure_url;
  }

  const post = await prisma.blogPost.create({
    data: {
      title,
      slug,
      content,
      metaTitle,
      metaDescription,
      status,
      thumbnailPublicId,
      thumbnailUrl,
    },
  });

  await recordAuditLog({
    action: "CREATE",
    entity: "BlogPost",
    entityId: post.id,
    entityName: post.title,
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const session = await requireAdmin();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const metaTitle = (formData.get("metaTitle") as string) || null;
  const metaDescription = (formData.get("metaDescription") as string) || null;
  const status = formData.get("status") as string;
  const imageFile = formData.get("thumbnail") as File | null;

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) throw new Error("Post not found");

  let thumbnailPublicId = existing.thumbnailPublicId;
  let thumbnailUrl = existing.thumbnailUrl;

  if (imageFile && imageFile.size > 0) {
    // Delete old image
    if (thumbnailPublicId) {
      await cloudinary.uploader.destroy(thumbnailPublicId).catch(() => { });
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await new Promise<{ public_id: string; secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "funtriplembongan/blog", resource_type: "image" },
            (err, res) => (err ? reject(err) : resolve(res as any))
          )
          .end(buffer);
      }
    );
    thumbnailPublicId = result.public_id;
    thumbnailUrl = result.secure_url;
  }

  await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      content,
      metaTitle,
      metaDescription,
      status,
      thumbnailPublicId,
      thumbnailUrl,
    },
  });

  await recordAuditLog({
    action: "UPDATE",
    entity: "BlogPost",
    entityId: id,
    entityName: title,
  });

  revalidatePath("/admin/blog");
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  const session = await requireAdmin();

  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return;

  if (post.thumbnailPublicId) {
    await cloudinary.uploader.destroy(post.thumbnailPublicId).catch(() => { });
  }

  await prisma.blogPost.delete({ where: { id } });

  await recordAuditLog({
    action: "DELETE",
    entity: "BlogPost",
    entityId: id,
    entityName: post.title,
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}
