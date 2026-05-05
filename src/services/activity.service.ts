import { activityRepo } from "@/repositories/activity.repo";
import type {
  CreateActivityInput,
  UpdateActivityInput,
  ActivityQueryInput,
} from "@/validations/activity.schema";
import type { Prisma } from "@prisma/client";

export const activityService = {
  async list(query: ActivityQueryInput) {
    const { status, categorySlug, page, limit, search } = query;

    const where: Prisma.ActivityWhereInput = {};
    if (status) where.status = status;
    if (categorySlug) where.category = { slug: categorySlug };
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { shortDescription: { contains: search } },
      ];
    }

    const skip = (page - 1) * limit;
    const { data, total } = await activityRepo.findMany({
      where,
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getBySlug(slug: string) {
    const activity = await activityRepo.findBySlug(slug);
    if (!activity) throw new Error("Activity not found");
    return activity;
  },

  async getById(id: string) {
    const activity = await activityRepo.findById(id);
    if (!activity) throw new Error("Activity not found");
    return activity;
  },

  async create(input: CreateActivityInput) {
    const { itineraries, includes, excludes, images, categoryId, ...rest } =
      input;

    const data: Prisma.ActivityCreateInput = {
      ...rest,
      category: { connect: { id: categoryId } },
      itineraries: itineraries
        ? { createMany: { data: itineraries } }
        : undefined,
      includes: includes ? { createMany: { data: includes } } : undefined,
      excludes: excludes ? { createMany: { data: excludes } } : undefined,
      images: images ? { createMany: { data: images } } : undefined,
    };

    return activityRepo.create(data);
  },

  async update(id: string, input: UpdateActivityInput) {
    const { categoryId, ...rest } = input;

    const data: Prisma.ActivityUpdateInput = {
      ...rest,
    };

    if (categoryId) {
      data.category = { connect: { id: categoryId } };
    }

    return activityRepo.update(id, data);
  },

  async delete(id: string) {
    // Get images to delete from Cloudinary
    const images = await activityRepo.getImagesByActivityId(id);
    // TODO: Delete images from Cloudinary using publicId
    // for (const img of images) { await cloudinary.delete(img.publicId); }

    return activityRepo.delete(id);
  },
};
