// import { NextRequest, NextResponse } from "next/server";
// const publicRoutes = ["/login", "/register", "/forget-password", "/reset-password"];

// export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const token = request.cookies.get("auth_token")?.value || null;

//   const rawUser = request.cookies.get("user_data")?.value || null;
//   let user: any = null;

//   try {
//     user = rawUser ? JSON.parse(rawUser) : null;
//   } catch {
//     user = null;
//   }

//   const isPublicRoute = publicRoutes.some((r) => pathname.startsWith(r));
//   const isAdminRoute = pathname.startsWith("/admin");
//   const isUserRoute = pathname.startsWith("/user");

//   if (!token && !isPublicRoute) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (token && user) {
//     if (isAdminRoute && user.role !== "admin") {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     if (isUserRoute && !["user", "admin"].includes(user.role)) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   if (isPublicRoute && token) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*", "/user/:path*", "/login", "/register"],
// };

import { NextRequest, NextResponse } from "next/server";
import { getAuthToken, getUserData } from "@/lib/cookie";

const publicRoutes = ["/login", "/register", "/forget-password", "/reset-password"];
const adminRoutes = ["/admin"];
const userRoutes = ["/user"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getAuthToken();
  const user = token ? await getUserData() : null;

  const isPublicRoute = publicRoutes.some((r) => pathname.startsWith(r));
  const isAdminRoute = adminRoutes.some((r) => pathname.startsWith(r));
  const isUserRoute = userRoutes.some((r) => pathname.startsWith(r));

  // not logged in -> block private routes
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // logged in -> role based
  if (token && user) {
    if (isAdminRoute && user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isUserRoute && user.role !== "user" && user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // logged in shouldn't see login/register
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login", "/register"],
};
