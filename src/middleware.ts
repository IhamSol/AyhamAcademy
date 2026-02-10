import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {
  return undefined;
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
