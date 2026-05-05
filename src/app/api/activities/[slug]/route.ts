import { NextRequest, NextResponse } from "next/server";
import { activityService } from "@/services/activity.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const activity = await activityService.getBySlug(slug);

    return NextResponse.json({
      success: true,
      message: "Activity fetched successfully",
      data: activity,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Not found";
    return NextResponse.json(
      { success: false, message },
      { status: 404 }
    );
  }
}
