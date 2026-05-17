"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { recordAuditLog } from "@/lib/audit";
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

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
