import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "~/auth/server";
import { openApiDocument } from "~/openapi";

export const GET = async (req: NextRequest) => {
  // Check if user is authenticated
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in to access API documentation." },
      { status: 401 },
    );
  }

  return NextResponse.json(openApiDocument);
};
