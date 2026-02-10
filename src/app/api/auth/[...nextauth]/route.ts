import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import whitelist from "@/data/whitelist.json";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // ✅ Check if user's email is in whitelist
        const userEmail = user.email?.toLowerCase();
        
        // ✅ Add safety check for userEmail
        if (!userEmail) {
          console.log("No email provided by Google");
          return false;
        }

        // ✅ Ensure whitelist.emails exists and is an array
        const allowedEmails = Array.isArray(whitelist.emails) ? whitelist.emails : [];
        
        const isAllowed = allowedEmails.some(
          (email) => email.toLowerCase() === userEmail
        );
        
        if (!isAllowed) {
          console.log(`User ${userEmail} not in whitelist`);
          return "/unauthorized?error=AccessDenied"; // Redirect to error page
        }
        
        return true; // Allow sign-in
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/unauthorized",
  },
});

export { handler as GET, handler as POST };
