import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";

import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
  getSession: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/auth/session",
        summary: "Get current session",
        description: "Retrieve the current user session information",
        tags: ["auth"],
        protect: false,
      },
    })
    .input(z.void())
    .output(z.any())
    .query(({ ctx }) => {
      return ctx.session;
    }),
  getSecretMessage: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/auth/secret",
        summary: "Get secret message",
        description: "Get a secret message (requires authentication)",
        tags: ["auth"],
        protect: true,
      },
    })
    .input(z.void())
    .output(z.string())
    .query(() => {
      return "you can see this secret message!";
    }),
} satisfies TRPCRouterRecord;
