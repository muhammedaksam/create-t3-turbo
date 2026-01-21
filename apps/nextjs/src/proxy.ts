import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { auth } from "~/auth/server";
import { routing } from "./i18n/routing";

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

/**
 * Combined Middleware
 *
 * This middleware handles:
 * 1. Internationalization routing (next-intl)
 * 2. Route protection (auth)
 */
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // First, handle internationalization
  const intlResponse = intlMiddleware(request);

  // Extract locale from path (e.g., /en/dashboard -> en)
  const pathSegments = pathname.split("/").filter(Boolean);
  const locale = pathSegments[0] ?? "en";

  // Check if the route is a protected dashboard route
  // Pattern: /[locale]/dashboard or /[locale]/dashboard/*
  const dashboardPattern = /^\/[^/]+\/dashboard(\/.*)?$/;
  const isDashboardRoute =
    pathSegments[1] === "dashboard" || dashboardPattern.exec(pathname) !== null;

  // If not a dashboard route, return the intl response
  if (!isDashboardRoute) {
    return intlResponse;
  }

  // Check authentication status using better-auth
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // If not authenticated, redirect to login page
  if (!session) {
    const loginUrl = new URL(`/${locale}/auth/login`, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // User is authenticated, return the intl response
  return intlResponse;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
