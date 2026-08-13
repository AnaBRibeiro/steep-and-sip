import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { PROTECTED_PREFIXES } from "@/lib/auth/protectedRoutes";

/**
 * A lightweight "are you even signed in" check for protected routes, redirecting signed-out
 * visitors before the page renders. This is an optimistic check only (no database query) - the
 * real checks (admin role, etc.) happen close to the data in each protected route's own
 * layout/page, per Next.js's own guidance for Proxy-based auth.
 *
 * Only runs on the protected prefixes themselves (see `matcher` below) - it doesn't need to run
 * on every page just to keep the session cookie fresh, since the browser Supabase client
 * (@supabase/ssr's createBrowserClient, used in AuthNav on every page) already auto-refreshes
 * the session and syncs it to cookies on its own.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = PROTECTED_PREFIXES.some((prefix) => request.nextUrl.pathname.startsWith(prefix));

  if (!user && isProtected) {
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

// Next.js requires matcher values to be literal constants (statically analyzed at build time,
// per its own docs) - can't derive this from PROTECTED_PREFIXES at runtime. Keep these two in
// sync with that array by hand.
export const config = {
  matcher: ["/admin/:path*", "/myprofile/:path*"],
};
