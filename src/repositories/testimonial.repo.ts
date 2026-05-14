import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const testimonialRepo = {
  async findMany(params: {
    where?: Prisma.TestimonialWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.TestimonialOrderByWithRelationInput;
  }) {
    const { where, skip = 0, take = 12, orderBy = { createdAt: "desc" } } = params;
    const [data, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      prisma.testimonial.count({ where }),
    ]);
    return { data, total };
  },

  async findById(id: string) {
    return prisma.testimonial.findUnique({
      where: { id },
    });
  },

  async create(data: Prisma.TestimonialCreateInput) {
    return prisma.testimonial.create({
      data,
    });
  },

  async update(id: string, data: Prisma.TestimonialUpdateInput) {
    return prisma.testimonial.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.testimonial.delete({ where: { id } });
  },
};
