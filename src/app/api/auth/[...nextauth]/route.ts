import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import credentials from "@/data/credentials.json";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials_input) {
        if (!credentials_input?.email || !credentials_input?.password) {
          return null;
        }

        const email = credentials_input.email.toLowerCase();

        // Find user in credentials store (case-insensitive email match)
        const user = credentials.users.find(
          (u) => u.email.toLowerCase() === email
        );

        if (!user) {
          return null;
        }

        // Verify password against bcrypt hash
        const isValid = await bcrypt.compare(
          credentials_input.password,
          user.passwordHash
        );

        if (!isValid) {
          return null;
        }

        // Return user object (NextAuth expects id, email, name)
        return { id: email, email: user.email, name: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST };
