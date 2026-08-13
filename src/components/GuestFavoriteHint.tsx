"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface GuestFavoriteHintProps {
  className?: string;
}

export default function GuestFavoriteHint({ className }: GuestFavoriteHintProps) {
  const [supabase] = useState(() => createClient());

  async function signIn() {
    const next = window.location.pathname;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
  }

  return (
    <div className={`group relative inline-flex ${className ?? ""}`}>
      <button
        type="button"
        onClick={signIn}
        aria-label="Sign in with Google to save this tea to your favorites"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-muted transition-all duration-200 hover:scale-110 hover:bg-tertiary/10 hover:text-tertiary"
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
          <path d="M12 21s-7.5-4.7-10-9.3C.3 8.2 2 4.5 5.6 4A5 5 0 0 1 12 7a5 5 0 0 1 6.4-3c3.6.5 5.3 4.2 3.6 7.7C19.5 16.3 12 21 12 21z" />
        </svg>
      </button>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 rounded-md bg-text px-2 py-1 text-xs font-semibold whitespace-nowrap text-bg opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        Sign in to save
      </span>
    </div>
  );
}
