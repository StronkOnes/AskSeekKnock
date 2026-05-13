import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/signup");
      const isPublicPage = nextUrl.pathname === "/landing" || nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/api");

      if (isLoggedIn) {
        if (isAuthPage) return Response.redirect(new URL("/", nextUrl));
        return true;
      }
      return isPublicPage;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        (session.user as any).isOnboarded = token.isOnboarded;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id;
        token.isOnboarded = (user as any).isOnboarded;
      }
      if (trigger === "update" && session) {
          token.isOnboarded = session.isOnboarded;
      }
      return token;
    },
  },
  providers: [], // Providers are added in auth.ts
} satisfies NextAuthConfig;
