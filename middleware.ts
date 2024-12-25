import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { Role } from "@prisma/client";

export default withAuth(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function middleware(request: any) {
    const role = request?.nextauth?.token?.user?.role;

    if (!role) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (request.nextUrl.pathname === "/configuration") {
      if (role !== Role.PROFESSIONAL) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // The middleware function will only be invoked if the authorized callback returns true.
      authorized: () => {
        return true;
      },
    },
  }
);
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/book", "/book/:path", "/appointments", "/configuration"],
};
