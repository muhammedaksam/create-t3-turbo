import { createIsomorphicFn } from "@tanstack/react-start";
import {
  createTRPCClient,
  httpBatchStreamLink,
  loggerLink,
} from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import SuperJSON from "superjson";

import type { AppRouter } from "@acme/api";

import { env } from "~/env";
import { getBaseUrl } from "~/lib/url";

export const makeTRPCClient = createIsomorphicFn()
  .server(() => {
    // Server-side: call API server via HTTP
    return createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: (op) =>
            env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: env.API_URL + "/api/trpc",
          headers() {
            const headers = new Headers();
            headers.set("x-trpc-source", "tanstack-start-server");
            return headers;
          },
        }),
      ],
    });
  })
  .client(() => {
    // Client-side: use proxy via same origin
    return createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: (op) =>
            env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: getBaseUrl() + "/api/trpc",
          headers() {
            const headers = new Headers();
            headers.set("x-trpc-source", "tanstack-start-client");
            return headers;
          },
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include", // Include cookies in cross-origin requests
            });
          },
        }),
      ],
    });
  });

export const { useTRPC, TRPCProvider } = createTRPCContext<AppRouter>();
