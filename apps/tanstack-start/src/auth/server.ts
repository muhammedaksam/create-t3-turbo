import { reactStartCookies } from "better-auth/react-start";

import { initAuth } from "@acme/auth";

import { env } from "~/env";

// Point to the API server for auth
const baseUrl =
  env.VERCEL_ENV === "production"
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.VERCEL_ENV === "preview"
      ? `https://${env.VERCEL_URL}`
      : "http://localhost:3002";

export const auth = initAuth({
  baseUrl,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  productionUrl: env.API_URL,
  secret: env.AUTH_SECRET,
  discordClientId: env.AUTH_DISCORD_ID,
  discordClientSecret: env.AUTH_DISCORD_SECRET,

  extraPlugins: [reactStartCookies()],
});
