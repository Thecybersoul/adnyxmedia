import { NextResponse } from "next/server";
import { listMedia } from "@/lib/db/media";

export async function GET() {
  const media = await listMedia();
  return NextResponse.json({ media });
}
