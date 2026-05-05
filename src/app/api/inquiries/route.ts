import { NextRequest, NextResponse } from "next/server";
import { inquiryRepo } from "@/repositories/inquiry.repo";
import { inquirySchema } from "@/validations/inquiry.schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = inquirySchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Error",
          error: validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { activityId, email, ...rest } = validated.data;

    const inquiry = await inquiryRepo.create({
      ...rest,
      email: email || null,
      activity: activityId ? { connect: { id: activityId } } : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully",
        data: inquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/inquiries error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
