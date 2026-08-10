import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Auth is already enforced for all /api/admin/* routes by src/proxy.ts.
        return {
          allowedContentTypes: ["image/*", "video/*"],
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // The client creates the media DB record itself after upload()
        // resolves, since this webhook isn't reachable from localhost dev.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
