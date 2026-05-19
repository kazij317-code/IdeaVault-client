import { headers } from 'next/headers';
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // if not logged in
  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);

    // save current route
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/ideas/:id*",
    // "/dashboard/:path*",
    // "/ideas/:path",
    "/ideas/:id",
    "/add-idea",
    "/my-ideas",
    "/my-interactions",
  ],
};