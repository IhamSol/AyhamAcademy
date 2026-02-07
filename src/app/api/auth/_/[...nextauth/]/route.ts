import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import whitelist from "@/data/whitelist.json";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email && whitelist.includes(user.email)) {
        return true;
      }
      return "/unauthorized";
    },
  },
  pages: {
    signIn: "/login",
    error: "/unauthorized",
  },
});

export { handler as GET, handler as POST };
