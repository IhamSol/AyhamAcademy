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
    async signIn({ user }) {
      // ✅ Check if user's email is in whitelist
      const userEmail = user.email?.toLowerCase();
      const isAllowed = whitelist.emails.some(
        (email) => email.toLowerCase() === userEmail
      );
      
      if (!isAllowed) {
        return false; // Reject sign-in
      }
      
      return true; // Allow sign-in
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/api/auth/signin",  // ✅ Use built-in NextAuth page
    error: "/auth/error",         // Optional: custom error page
  },
});

export { handler as GET, handler as POST };
