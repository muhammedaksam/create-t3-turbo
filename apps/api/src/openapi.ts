import { generateOpenApiDocument } from "trpc-to-openapi";

import { appRouter } from "@acme/api";

import { env } from "~/env";

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "T3 Turbo API",
  version: "1.0.0",
  baseUrl: `${env.API_URL || "http://localhost:3002"}/api`,
  description:
    "REST API for T3 Turbo application with authentication and post management",
  docsUrl: "https://github.com/muhammedaksam/create-t3-turbo",
  tags: ["posts", "auth"],
  securitySchemes: {
    Authorization: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      description: "Enter your Bearer token from Better Auth",
    },
  },
});
