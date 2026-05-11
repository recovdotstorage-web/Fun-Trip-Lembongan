"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { v2 as cloudinary } from "cloudinary";
import { recordAuditLog } from "@/lib/audit";
import { sanitizeString } from "@/lib/utils/sanitization";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as any)?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session as any;
}

function buildSlug(name: string) {
  return slugify(name, { lower: true, strict: true });
}

export async function createService(formData: FormData) {
  await requireAdmin();

  const name = sanitizeString(formData.get("name") as string);
  const categoryId = formData.get("categoryId") as string;
  const price = Math.round(parseFloat(formData.get("price") as string) * 100);
  const duration = sanitizeString(formData.get("duration") as string);
  const shortDescription = sanitizeString(formData.get("shortDescription") as string);
  const description = sanitizeString(formData.get("description") as string);
  const status = formData.get("status") as string;
  const youtubeVideoId = sanitizeString((formData.get("youtubeVideoId") as string) || "");

  const includes = (formData.getAll("includes") as string[]).map(s => sanitizeString(s)).filter(Boolean);
  const excludes = (formData.getAll("excludes") as string[]).map(s => sanitizeString(s)).filter(Boolean);
  const imageFiles = formData.getAll("images") as File[];

  let slug = buildSlug(name);
  const existing = await prisma.activity.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const uploadedImages = [];
  for (const file of imageFiles) {
    if (file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await new Promise<{ public_id: string; secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "funtriplembongan/services", resource_type: "image" },
              (err, res) => (err ? reject(err) : resolve(res as any))
            )
            .end(buffer);
        }
      );
      uploadedImages.push({
        publicId: result.public_id,
        imageUrl: result.secure_url,
        isPrimary: uploadedImages.length === 0,
      });
    }
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
      youtubeVideoId: youtubeVideoId || null,
      includes: {
        create: includes.map((item) => ({ item })),
      },
      excludes: {
        create: excludes.map((item) => ({ item })),
      },
      images: {
        create: uploadedImages,
      },
    },
  });

  await recordAuditLog({
    action: "CREATE",
    entity: "Activity",
    entityId: activity.id,
    entityName: activity.name,
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();

  const name = sanitizeString(formData.get("name") as string);
  const categoryId = formData.get("categoryId") as string;
  const price = Math.round(parseFloat(formData.get("price") as string) * 100);
  const duration = sanitizeString(formData.get("duration") as string);
  const shortDescription = sanitizeString(formData.get("shortDescription") as string);
  const description = sanitizeString(formData.get("description") as string);
  const status = formData.get("status") as string;
  const youtubeVideoId = sanitizeString((formData.get("youtubeVideoId") as string) || "");

  const includes = (formData.getAll("includes") as string[]).map(s => sanitizeString(s)).filter(Boolean);
  const excludes = (formData.getAll("excludes") as string[]).map(s => sanitizeString(s)).filter(Boolean);

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
        youtubeVideoId: youtubeVideoId || null,
        includes: {
          create: includes.map((item) => ({ item })),
        },
        excludes: {
          create: excludes.map((item) => ({ item })),
        },
      },
    }),
  ]);

  await recordAuditLog({
    action: "UPDATE",
    entity: "Activity",
    entityId: id,
    entityName: name,
  });

  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${id}/edit`);
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireAdmin();

  const existing = await prisma.activity.findUnique({ where: { id } });
  if (!existing) return;

  const images = await prisma.activityImage.findMany({ where: { activityId: id } });
  await Promise.all(
    images.map((img) => cloudinary.uploader.destroy(img.publicId).catch(() => { }))
  );

  await prisma.activity.delete({ where: { id } });

  await recordAuditLog({
    action: "DELETE",
    entity: "Activity",
    entityId: id,
    entityName: existing.name,
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function uploadServiceImage(
  serviceId: string,
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
          { folder: "funtriplembongan/services", resource_type: "image" },
          (err, res) => (err ? reject(err) : resolve(res as any))
        )
        .end(buffer);
    }
  );

  if (isPrimary) {
    await prisma.activityImage.updateMany({
      where: { activityId: serviceId },
      data: { isPrimary: false },
    });
  }

  await prisma.activityImage.create({
    data: {
      activityId: serviceId,
      publicId: result.public_id,
      imageUrl: result.secure_url,
      isPrimary,
    },
  });

  revalidatePath(`/admin/services/${serviceId}/edit`);
  revalidatePath("/services");
}

export async function deleteServiceImage(imageId: string, serviceId: string) {
  await requireAdmin();

  const image = await prisma.activityImage.findUnique({ where: { id: imageId } });
  if (!image) return;

  await cloudinary.uploader.destroy(image.publicId).catch(() => { });
  await prisma.activityImage.delete({ where: { id: imageId } });

  revalidatePath(`/admin/services/${serviceId}/edit`);
  revalidatePath("/services");
}

export async function setPrimaryImage(imageId: string, serviceId: string) {
  await requireAdmin();

  await prisma.$transaction([
    prisma.activityImage.updateMany({
      where: { activityId: serviceId },
      data: { isPrimary: false },
    }),
    prisma.activityImage.update({
      where: { id: imageId },
      data: { isPrimary: true },
    }),
  ]);

  revalidatePath(`/admin/services/${serviceId}/edit`);
}

