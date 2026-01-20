import { createAuthClient } from "better-auth/react";

const getAuthBaseUrl = () => {
  // Browser: use same origin (Next.js will proxy to API server)
  if (typeof window !== "undefined") return window.location.origin;

  // SSR fallback
  return "http://localhost:3002";
};

export const authClient = createAuthClient({
  baseURL: getAuthBaseUrl(),
  // Ensure credentials are included for cross-origin requests
  fetchOptions: {
    credentials: "include",
  },
});
