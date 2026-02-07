import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import whitelist from "./data/whitelist.json";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const email = token?.email;

    // If the user is logged in but not in the whitelist, redirect to unauthorized
    if (email && !whitelist.includes(email)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Protect all lecture pages that are not free
// Note: This simple middleware protects ALL /lecture/:id paths.
// For more granular control (free vs paid), we handle it inside the page component as well.
export const config = { matcher: ["/lecture/:path*"] };
