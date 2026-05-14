import { NextRequest, NextResponse } from "next/server";
import { activityService } from "@/services/activity.service";
import { activityQuerySchema } from "@/validations/activity.schema";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = activityQuerySchema.parse({
      status: searchParams.get("status") ?? undefined,
      categorySlug: searchParams.get("categorySlug") ?? undefined,
      page: searchParams.get("page") ?? 1,
      limit: searchParams.get("limit") ?? 12,
      search: searchParams.get("search") ?? undefined,
    });

    const result = await activityService.list(query);

    return NextResponse.json({
      success: true,
      message: "Activities fetched successfully",
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
