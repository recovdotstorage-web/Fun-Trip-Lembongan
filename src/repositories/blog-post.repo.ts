import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const blogPostRepo = {
  async findMany(params: {
    where?: Prisma.BlogPostWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.BlogPostOrderByWithRelationInput;
  }) {
    const { where, skip = 0, take = 12, orderBy = { createdAt: "desc" } } = params;
    const [data, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      prisma.blogPost.count({ where }),
    ]);
    return { data, total };
  },

  async findBySlug(slug: string) {
    return prisma.blogPost.findUnique({
      where: { slug },
    });
  },

  async findById(id: string) {
    return prisma.blogPost.findUnique({
      where: { id },
    });
  },

  async create(data: Prisma.BlogPostCreateInput) {
    return prisma.blogPost.create({
      data,
    });
  },

  async update(id: string, data: Prisma.BlogPostUpdateInput) {
    return prisma.blogPost.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.blogPost.delete({ where: { id } });
  },
};
