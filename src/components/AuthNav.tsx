"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export default function AuthNav() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"user" | "admin" | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadRole(userId: string) {
      const { data } = await supabase.from("profiles").select("role").eq("id", userId).single();
      setRole(data?.role ?? null);
    }

    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user);
      if (data.user) await loadRole(data.user.id);
      setLoaded(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadRole(session.user.id);
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

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
    router.refresh();
  }

  if (!loaded) {
    return <div className="h-9 w-9 shrink-0" aria-hidden="true" />;
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={signIn}
        aria-label="Sign in with Google"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-text transition-colors hover:text-primary"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
        </svg>
      </button>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const displayName = (user.user_metadata?.full_name as string | undefined) || user.email || "Account";

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label={`Account menu for ${displayName}`}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-outline transition-colors hover:border-primary/50"
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
        <div
          role="menu"
          className="entrance absolute top-full right-0 mt-2 w-48 rounded-lg border border-outline bg-surface p-2 shadow-ambient"
        >
          <p className="truncate px-3 py-2 text-xs text-text-muted">{displayName}</p>
          {role === "admin" && (
            <Link
              href="/admin"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-left text-sm font-semibold text-text transition-colors hover:bg-primary-pale hover:text-primary"
            >
              Admin panel
            </Link>
          )}
          <button
            type="button"
            role="menuitem"
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
