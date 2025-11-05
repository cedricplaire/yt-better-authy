import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoute = ["/dashboard/profile", "/dashboard/admin/desktop"];

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const sessionCookie = getSessionCookie(req);

  const res = NextResponse.next();
  const isLoggedIn = !!sessionCookie;
  const isOnProtectedRoute = protectedRoute.includes(nextUrl.pathname);
  const isOnAuthRoute = nextUrl.pathname.startsWith("/dashboard/auth");

  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard/auth/login", req.url));
  }
  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard/profile", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
