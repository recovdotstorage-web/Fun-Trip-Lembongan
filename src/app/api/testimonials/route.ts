import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonials);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
