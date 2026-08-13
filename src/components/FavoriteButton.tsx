"use client";

import { useState, useTransition } from "react";
import { toggleFavorite } from "@/app/actions/favorites";

interface FavoriteButtonProps {
  teaId: string;
  teaName: string;
  initialFavorited: boolean;
  className?: string;
}

export default function FavoriteButton({
  teaId,
  teaName,
  initialFavorited,
  className,
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const optimistic = !favorited;
    setFavorited(optimistic);
    startTransition(async () => {
      try {
        const result = await toggleFavorite(teaId);
        setFavorited(result.favorited);
      } catch {
        setFavorited(!optimistic);
      }
    });
  }

  return (
    <div className={`group relative inline-flex ${className ?? ""}`}>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-pressed={favorited}
        aria-label={favorited ? `Remove ${teaName} from favorites` : `Add ${teaName} to favorites`}
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-tertiary/10 disabled:opacity-50 disabled:hover:scale-100 ${
          favorited ? "text-tertiary" : "text-text-muted hover:text-tertiary"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill={favorited ? "currentColor" : "none"}
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
        {favorited ? "Remove from Favorites" : "Add to Favorites"}
      </span>
    </div>
  );
}
