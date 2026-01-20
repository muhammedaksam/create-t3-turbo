import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";

import { CreatePostSchema } from "@acme/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/posts",
        summary: "Get all posts",
        description: "Retrieve a list of the 10 most recent posts",
        tags: ["posts"],
        protect: false,
      },
    })
    .input(z.void())
    .output(
      z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          content: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
        }),
      ),
    )
    .query(({ ctx }) => {
      return ctx.db.post.findMany({ orderBy: { createdAt: "desc" }, take: 10 });
    }),

  byId: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/posts/{id}",
        summary: "Get post by ID",
        description: "Retrieve a single post by its unique identifier",
        tags: ["posts"],
        protect: false,
      },
    })
    .input(z.object({ id: z.string() }))
    .output(
      z
        .object({
          id: z.string(),
          title: z.string(),
          content: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
        .nullable(),
    )
    .query(({ ctx, input }) => {
      return ctx.db.post.findFirst({ where: { id: input.id } });
    }),

  create: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/posts",
        summary: "Create a new post",
        description:
          "Create a new post.\n\n**Authorization:** Requires authentication. Post will be created with the authenticated user as the author.\n\n**Errors:**\n- 401: Unauthorized - Authentication required",
        tags: ["posts"],
        protect: true,
      },
    })
    .input(CreatePostSchema)
    .output(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.post.create({ data: input });
    }),

  delete: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/posts/{id}",
        summary: "Delete a post",
        description:
          "Delete a post by its ID.\n\n**Authorization:**\n- Must be authenticated\n- Must be the post author OR\n- Must have organization 'post:delete' permission (admin/owner role)\n\n**Errors:**\n- 401: Unauthorized - Authentication required\n- 403: Forbidden - Not the post author and no organization permission\n- 404: Not Found - Post does not exist",
        tags: ["posts"],
        protect: true,
      },
    })
    .input(z.object({ id: z.string() }))
    .output(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({ where: { id: input.id } });
    }),
} satisfies TRPCRouterRecord;
