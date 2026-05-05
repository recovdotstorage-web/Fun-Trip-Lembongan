import { z } from "zod";

export const createActivitySchema = z.object({
  name: z.string().min(3, "Nama activity minimal 3 karakter"),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug harus lowercase, tanpa spasi"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  price: z.number().int().positive("Harga harus lebih dari 0"),
  duration: z.string().min(1, "Durasi wajib diisi"),
  shortDescription: z.string().min(10, "Deskripsi singkat minimal 10 karakter"),
  description: z.string().min(20, "Deskripsi minimal 20 karakter"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  youtubeVideoId: z.string().nullable().optional(),
  itineraries: z
    .array(
      z.object({
        stepOrder: z.number().int().positive(),
        title: z.string().min(1),
        description: z.string().min(1),
      })
    )
    .optional(),
  includes: z.array(z.object({ item: z.string().min(1) })).optional(),
  excludes: z.array(z.object({ item: z.string().min(1) })).optional(),
  images: z
    .array(
      z.object({
        publicId: z.string(),
        imageUrl: z.string().url(),
        isPrimary: z.boolean().default(false),
      })
    )
    .optional(),
});

export const updateActivitySchema = createActivitySchema.partial();

export const activityQuerySchema = z.object({
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  categorySlug: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(12),
  search: z.string().optional(),
});

export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type UpdateActivityInput = z.infer<typeof updateActivitySchema>;
export type ActivityQueryInput = z.infer<typeof activityQuerySchema>;
