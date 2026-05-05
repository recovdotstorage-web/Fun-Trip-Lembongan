import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const inquiryRepo = {
  async findMany(params: {
    where?: Prisma.InquiryWhereInput;
    skip?: number;
    take?: number;
  }) {
    const { where, skip = 0, take = 20 } = params;
    const [data, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
        include: { activity: { select: { name: true, slug: true } } },
      }),
      prisma.inquiry.count({ where }),
    ]);
    return { data, total };
  },

  async create(data: Prisma.InquiryCreateInput) {
    return prisma.inquiry.create({ data });
  },

  async updateStatus(id: string, status: string) {
    return prisma.inquiry.update({
      where: { id },
      data: { status },
    });
  },
};
