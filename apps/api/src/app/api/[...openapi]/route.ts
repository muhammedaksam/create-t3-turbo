import type { NextRequest } from "next/server";
import { createOpenApiFetchHandler } from "trpc-to-openapi";

import { appRouter, createTRPCContext } from "@acme/api";

import { auth } from "~/auth/server";

const handler = (req: NextRequest) => {
  return createOpenApiFetchHandler({
    endpoint: "/api",
    router: appRouter,
    createContext: () =>
      createTRPCContext({
        auth: auth,
        headers: req.headers,
      }),
    req,
  });
};

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
