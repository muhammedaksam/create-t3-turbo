import type { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createTRPCContext } from "@acme/api";

import { auth } from "~/auth/server";

/**
 * Configure CORS headers for cross-origin requests with credentials
 */
const setCorsHeaders = (res: Response, req: NextRequest) => {
  const origin = req.headers.get("origin");
  // Allow requests from localhost:3000 (web app) and expo://
  const allowedOrigins = ["http://localhost:3000", "expo://"];

  if (
    origin &&
    (allowedOrigins.includes(origin) || origin.startsWith("expo://"))
  ) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }

  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
};

export const OPTIONS = (req: NextRequest) => {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response, req);
  return response;
};

const handler = async (req: NextRequest) => {
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () =>
      createTRPCContext({
        auth: auth,
        headers: req.headers,
      }),
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error);
    },
  });

  setCorsHeaders(response, req);
  return response;
};

export { handler as GET, handler as POST };
