"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { v2 as cloudinary } from "cloudinary";

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
}

function buildSlug(name: string) {
  return slugify(name, { lower: true, strict: true });
}

// ── Create Activity ──────────────────────────────────────────────────────────

export async function createActivity(formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = Math.round(parseFloat(formData.get("price") as string) * 100);
  const duration = formData.get("duration") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as string;
  const youtubeVideoId = (formData.get("youtubeVideoId") as string) || null;

  const includes = (formData.getAll("includes") as string[]).filter(Boolean);
  const excludes = (formData.getAll("excludes") as string[]).filter(Boolean);

  let slug = buildSlug(name);

  // Ensure unique slug
  const existing = await prisma.activity.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  const activity = await prisma.activity.create({
    data: {
      name,
      slug,
      categoryId,
      price,
      duration,
      shortDescription,
      description,
      status,
      youtubeVideoId,
      includes: {
        create: includes.map((item) => ({ item })),
      },
      excludes: {
        create: excludes.map((item) => ({ item })),
      },
    },
  });

  revalidatePath("/admin/activities");
  revalidatePath("/activities");
  redirect(`/admin/activities/${activity.id}/edit`);
}

// ── Update Activity ──────────────────────────────────────────────────────────

export async function updateActivity(id: string, formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = Math.round(parseFloat(formData.get("price") as string) * 100);
  const duration = formData.get("duration") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as string;
  const youtubeVideoId = (formData.get("youtubeVideoId") as string) || null;

  const includes = (formData.getAll("includes") as string[]).filter(Boolean);
  const excludes = (formData.getAll("excludes") as string[]).filter(Boolean);

  await prisma.$transaction([
    prisma.activityInclude.deleteMany({ where: { activityId: id } }),
    prisma.activityExclude.deleteMany({ where: { activityId: id } }),
    prisma.activity.update({
      where: { id },
      data: {
        name,
        categoryId,
        price,
        duration,
        shortDescription,
        description,
        status,
        youtubeVideoId,
        includes: {
          create: includes.map((item) => ({ item })),
        },
        excludes: {
          create: excludes.map((item) => ({ item })),
        },
      },
    }),
  ]);

  revalidatePath("/admin/activities");
  revalidatePath(`/admin/activities/${id}/edit`);
  revalidatePath("/activities");
}

// ── Delete Activity ──────────────────────────────────────────────────────────

export async function deleteActivity(id: string) {
  await requireAdmin();

  // Delete Cloudinary images first
  const images = await prisma.activityImage.findMany({ where: { activityId: id } });
  await Promise.all(
    images.map((img) => cloudinary.uploader.destroy(img.publicId).catch(() => {}))
  );

  await prisma.activity.delete({ where: { id } });

  revalidatePath("/admin/activities");
  revalidatePath("/activities");
  redirect("/admin/activities");
}

// ── Upload Activity Image ─────────────────────────────────────────────────────

export async function uploadActivityImage(
  activityId: string,
  formData: FormData
) {
  await requireAdmin();

  const file = formData.get("image") as File;
  const isPrimary = formData.get("isPrimary") === "true";

  if (!file || file.size === 0) throw new Error("No file provided");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{ public_id: string; secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "funtriplembongan/activities",
            resource_type: "image",
          },
          (err, res) => (err ? reject(err) : resolve(res as any))
        )
        .end(buffer);
    }
  );

  // If primary, unset all others first
  if (isPrimary) {
    await prisma.activityImage.updateMany({
      where: { activityId },
      data: { isPrimary: false },
    });
  }

  await prisma.activityImage.create({
    data: {
      activityId,
      publicId: result.public_id,
      imageUrl: result.secure_url,
      isPrimary,
    },
  });

  revalidatePath(`/admin/activities/${activityId}/edit`);
  revalidatePath("/activities");
}

// ── Delete Activity Image ─────────────────────────────────────────────────────

export async function deleteActivityImage(imageId: string, activityId: string) {
  await requireAdmin();

  const image = await prisma.activityImage.findUnique({ where: { id: imageId } });
  if (!image) return;

  await cloudinary.uploader.destroy(image.publicId).catch(() => {});
  await prisma.activityImage.delete({ where: { id: imageId } });

  revalidatePath(`/admin/activities/${activityId}/edit`);
  revalidatePath("/activities");
}

// ── Set Primary Image ─────────────────────────────────────────────────────────

export async function setPrimaryImage(imageId: string, activityId: string) {
  await requireAdmin();

  await prisma.$transaction([
    prisma.activityImage.updateMany({
      where: { activityId },
      data: { isPrimary: false },
    }),
    prisma.activityImage.update({
      where: { id: imageId },
      data: { isPrimary: true },
    }),
  ]);

  revalidatePath(`/admin/activities/${activityId}/edit`);
}
