import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
  const nextCookies = cookies();
  const reqUrl = new URL(request.url);

  const token = nextCookies.get("token")?.value || null;

  const isPublicPath =
    reqUrl.pathname === "/auth/login" || reqUrl.pathname === "/auth/signup";

  const isPrivatePath =
    reqUrl.pathname === "/cart" ||
    reqUrl.pathname === "/wishlist" ||
    reqUrl.pathname === "/orders";

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && isPrivatePath) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.append("redirect", reqUrl.pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
