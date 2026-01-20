import type { NextRequest } from "next/server";

import { auth } from "~/auth/server";
import { env } from "~/env";

const allowedOrigins = [
  env.WEB_URL,
  env.TANSTACK_START_URL,
  "http://localhost:3000",
  "http://localhost:3001",
  "expo://",
];

// Handle CORS preflight
export const OPTIONS = (req: NextRequest) => {
  const origin = req.headers.get("origin");

  const response = new Response(null, { status: 204 });

  if (
    origin &&
    (allowedOrigins.includes(origin) || origin.startsWith("expo://"))
  ) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  response.headers.set("Access-Control-Max-Age", "86400");

  return response;
};

// Wrap auth.handler to add CORS headers
const createAuthHandler = (handler: typeof auth.handler) => {
  return async (req: NextRequest) => {
    console.log(`[AUTH] ${req.method} ${req.url}`);

    const response = await handler(req);

    // Add CORS headers to response
    const origin = req.headers.get("origin");

    if (
      origin &&
      (allowedOrigins.includes(origin) || origin.startsWith("expo://"))
    ) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
    }

    console.log(`[AUTH] Response status: ${response.status}`);
    return response;
  };
};

export const GET = createAuthHandler(auth.handler);
export const POST = createAuthHandler(auth.handler);
