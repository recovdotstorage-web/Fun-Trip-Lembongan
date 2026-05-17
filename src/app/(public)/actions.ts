"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sanitizeString } from "@/lib/utils/sanitization";

export async function submitReview(formData: FormData) {
  try {
    const name = sanitizeString(formData.get("name") as string);
    const content = sanitizeString(formData.get("content") as string);
    const rating = parseInt(formData.get("rating") as string) || 5;

    if (!name || name.trim().length === 0) {
      return { error: "Name is required" };
    }
    if (!content || content.trim().length === 0) {
      return { error: "Review message is required" };
    }
    if (rating < 1 || rating > 5) {
      return { error: "Rating must be between 1 and 5 stars" };
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name: name.trim(),
        content: content.trim(),
        rating,
        status: "PUBLISHED", // Submitted reviews go live instantly
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");

    return { success: true, testimonial };
  } catch (error: any) {
    console.error("Error in submitReview:", error);
    return { error: error.message || "Failed to submit your review" };
  }
}
