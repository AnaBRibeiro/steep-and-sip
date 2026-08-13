"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { PROTECTED_PREFIXES } from "@/lib/auth/protectedRoutes";

export default function AuthNav() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"user" | "admin" | null>(null);
  const [profileAvatarUrl, setProfileAvatarUrl] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const loadProfile = useCallback(
    async (userId: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("role, avatar_url, display_name")
        .eq("id", userId)
        .single();
      setRole(data?.role ?? null);
      setProfileAvatarUrl(data?.avatar_url ?? null);
      setProfileName(data?.display_name ?? null);
    },
    [supabase]
  );

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user);
      if (data.user) await loadProfile(data.user.id);
      setLoaded(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setRole(null);
        setProfileAvatarUrl(null);
        setProfileName(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, loadProfile]);

  useEffect(() => {
    if (!user) return;

    function handleProfileUpdated() {
      if (user) loadProfile(user.id);
    }

    window.addEventListener("profile:updated", handleProfileUpdated);
    return () => window.removeEventListener("profile:updated", handleProfileUpdated);
  }, [user, loadProfile]);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  async function signIn() {
    const next = new URLSearchParams(window.location.search).get("next") ?? window.location.pathname;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
    setMenuOpen(false);

    const onProtectedPage = PROTECTED_PREFIXES.some((prefix) =>
      window.location.pathname.startsWith(prefix)
    );
    if (onProtectedPage) {
      router.push("/");
    } else {
      router.refresh();
    }
  }

  if (!loaded) {
    return <div className="h-11 w-11 shrink-0" aria-hidden="true" />;
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={signIn}
        aria-label="Sign in with Google"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-lg text-text transition-colors hover:text-primary"
      >
        <span className="emoji-tint-primary" aria-hidden="true">👤</span>
      </button>
    );
  }

  const avatarUrl = profileAvatarUrl;
  const displayName =
    profileName || (user.user_metadata?.full_name as string | undefined) || user.email || "Account";

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label={`Account menu for ${displayName}`}
        className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-outline transition-colors hover:border-primary/50"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- small external avatar, not worth Next's image pipeline
          <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-sm font-semibold text-primary" aria-hidden="true">
            {displayName.charAt(0).toUpperCase()}
          </span>
        )}
      </button>

      {menuOpen && (
        // Plain list of links/buttons, not role="menu" - that ARIA role implies the native
        // menu keyboard pattern (arrow keys, Home/End, auto-focus on open), which this doesn't
        // implement. Mislabeling it "menu" would tell screen readers to expect behavior that
        // isn't there; standard Tab navigation over real links/buttons is more accessible here.
        <div className="entrance absolute top-full right-0 z-20 mt-2 w-48 rounded-lg border border-outline bg-surface p-2 shadow-ambient">
          <p className="truncate px-3 py-2 text-xs text-text-muted">{displayName}</p>
          <Link
            href="/myprofile"
            onClick={() => setMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-left text-sm font-semibold text-text transition-colors hover:bg-primary-pale hover:text-primary"
          >
            My Profile
          </Link>
          {role === "admin" && (
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-left text-sm font-semibold text-text transition-colors hover:bg-primary-pale hover:text-primary"
            >
              Admin panel
            </Link>
          )}
          <button
            type="button"
            onClick={signOut}
            className="block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-text transition-colors hover:bg-primary-pale hover:text-primary"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
