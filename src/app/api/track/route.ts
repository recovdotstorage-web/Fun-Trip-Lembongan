import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { path } = await req.json();
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";

    // Skip logging for localhost/development
    const isLocalhost = ip === "127.0.0.1" || ip === "::1" || ip === "localhost";
    if (isLocalhost) {
      return NextResponse.json({ success: true, skipped: true });
    }

    const userAgent = req.headers.get("user-agent") || "Unknown";
    
    // Country detection from common headers (Vercel, Cloudflare, etc.)
    const countryCode = req.headers.get("x-vercel-ip-country") || 
                       req.headers.get("cf-ipcountry") || 
                       "ID";

    // Insert visitor log
    await prisma.visitorLog.create({
      data: {
        ip,
        userAgent,
        path: path || "/",
        countryCode: countryCode,
        country: countryCode === "ID" ? "Indonesia" : "Foreign",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track visitor:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
