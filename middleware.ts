import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isOnboardingPage = nextUrl.pathname === "/onboarding";
  const isAuthPage = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/signup");
  const isLandingPage = nextUrl.pathname === "/landing" || nextUrl.pathname === "/";

  if (isLoggedIn) {
    const isOnboarded = (req.auth?.user as any)?.isOnboarded;
    
    // Redirect to onboarding if not done and not already there
    if (!isOnboarded && !isOnboardingPage && !isAuthPage && !isLandingPage) {
      return Response.redirect(new URL("/onboarding", nextUrl));
    }

    // Redirect to home if logged in and trying to access auth pages
    if (isAuthPage) {
      return Response.redirect(new URL("/", nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
