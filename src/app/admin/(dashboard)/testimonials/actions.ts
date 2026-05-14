"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { recordAuditLog } from "@/lib/audit";
import { sanitizeString } from "@/lib/utils/sanitization";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function createTestimonial(formData: FormData) {
  try {
    await requireAdmin();

    const name = sanitizeString(formData.get("name") as string);
    const content = sanitizeString(formData.get("content") as string);
    const rating = parseInt(formData.get("rating") as string) || 5;
    const status = formData.get("status") as string || "PUBLISHED";
    const imageFile = formData.get("image") as File | null;

    let imagePublicId: string | null = null;
    let imageUrl: string | null = null;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await new Promise<{ public_id: string; secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "funtriplembongan/testimonials", resource_type: "image" },
              (err, res) => (err ? reject(err) : resolve(res as any))
            )
            .end(buffer);
        }
      );
      imagePublicId = result.public_id;
      imageUrl = result.secure_url;
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        content,
        rating,
        status,
        imageUrl,
        imagePublicId,
      },
    });

    await recordAuditLog({
      action: "CREATE",
      entity: "Testimonial",
      entityId: testimonial.id,
      entityName: testimonial.name,
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");

    return testimonial;
  } catch (error) {
    console.error("Error in createTestimonial:", error);
    throw error;
  }
}

export async function updateTestimonial(id: string, formData: FormData) {
  try {
    await requireAdmin();

    const name = sanitizeString(formData.get("name") as string);
    const content = sanitizeString(formData.get("content") as string);
    const rating = parseInt(formData.get("rating") as string) || 5;
    const status = formData.get("status") as string;
    const imageFile = formData.get("image") as File | null;

    const removeImage = formData.get("removeImage") === "true";

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) throw new Error("Testimonial not found");

    let imagePublicId = existing.imagePublicId;
    let imageUrl = existing.imageUrl;

    if (imageFile && imageFile.size > 0) {
      // Delete old image if exists
      if (imagePublicId) {
        await cloudinary.uploader.destroy(imagePublicId).catch(() => { });
      }

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await new Promise<{ public_id: string; secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "funtriplembongan/testimonials", resource_type: "image" },
              (err, res) => (err ? reject(err) : resolve(res as any))
            )
            .end(buffer);
        }
      );
      imagePublicId = result.public_id;
      imageUrl = result.secure_url;
    } else if (removeImage) {
      // Delete image if requested and no new image uploaded
      if (imagePublicId) {
        await cloudinary.uploader.destroy(imagePublicId).catch(() => { });
      }
      imagePublicId = null;
      imageUrl = null;
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name,
        content,
        rating,
        status,
        imageUrl,
        imagePublicId,
      },
    });

    await recordAuditLog({
      action: "UPDATE",
      entity: "Testimonial",
      entityId: id,
      entityName: name,
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");

    return testimonial;
  } catch (error) {
    console.error("Error in updateTestimonial:", error);
    throw error;
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await requireAdmin();

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return { error: "Testimonial not found" };
    }

    if (existing.imagePublicId) {
      await cloudinary.uploader.destroy(existing.imagePublicId).catch((err) => {
        console.error("Cloudinary delete error:", err);
      });
    }

    await prisma.testimonial.delete({ where: { id } });

    await recordAuditLog({
      action: "DELETE",
      entity: "Testimonial",
      entityId: id,
      entityName: existing.name,
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    
    return { success: true };
  } catch (error: any) {
    console.error("Error in deleteTestimonial:", error);
    return { error: error.message || "Failed to delete testimonial" };
  }
}

export async function toggleTestimonialStatus(id: string, currentStatus: string) {
  await requireAdmin();

  const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

  await prisma.testimonial.update({
    where: { id },
    data: { status: newStatus }
  });

  revalidatePath("/admin/testimonials");
}
