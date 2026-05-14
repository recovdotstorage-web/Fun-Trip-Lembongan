import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const activityRepo = {
  async findMany(params: {
    where?: Prisma.ActivityWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.ActivityOrderByWithRelationInput;
  }) {
    const { where, skip = 0, take = 12, orderBy = { createdAt: "desc" } } = params;
    const [data, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          category: true,
          images: { where: { isPrimary: true }, take: 1 },
        },
      }),
      prisma.activity.count({ where }),
    ]);
    return { data, total };
  },

  async findBySlug(slug: string) {
    return prisma.activity.findUnique({
      where: { slug },
      include: {
        category: true,
        images: { orderBy: { isPrimary: "desc" } },
        itineraries: { orderBy: { stepOrder: "asc" } },
        includes: true,
        excludes: true,
        priceTiers: { orderBy: { sortOrder: "asc" } },
      },
    });
  },

  async findById(id: string) {
    return prisma.activity.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { isPrimary: "desc" } },
        itineraries: { orderBy: { stepOrder: "asc" } },
        includes: true,
        excludes: true,
        priceTiers: { orderBy: { sortOrder: "asc" } },
      },
    });
  },

  async create(data: Prisma.ActivityCreateInput) {
    return prisma.activity.create({
      data,
      include: { category: true, images: true },
    });
  },

  async update(id: string, data: Prisma.ActivityUpdateInput) {
    return prisma.activity.update({
      where: { id },
      data,
      include: { category: true, images: true },
    });
  },

  async delete(id: string) {
    return prisma.activity.delete({ where: { id } });
  },

  async getImagesByActivityId(activityId: string) {
    return prisma.activityImage.findMany({
      where: { activityId },
    });
  },
};
