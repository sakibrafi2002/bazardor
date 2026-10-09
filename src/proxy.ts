// src/proxy.ts   (or src/middleware.ts on Next 15 and older)
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// On Next 15 or older: rename this function to `middleware`
export function proxy(request: NextRequest) {
  // Fast check: does the browser have a Better Auth session cookie?
  // NOTE: this only checks the cookie EXISTS, not that it is valid.
  // The real security check happens in the page via requireSession().
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const { pathname, search } = request.nextUrl;

    // Build /signin?redirect=/product/ada&reason=login-required
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("redirect", pathname + search);
    signInUrl.searchParams.set("reason", "login-required");

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next(); // logged in, let the request continue
}

// Only run on the protected routes (not on Home, categories or auth pages)
export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};