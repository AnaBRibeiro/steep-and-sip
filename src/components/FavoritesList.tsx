import Link from "next/link";
import type { Tea } from "@/lib/types";
import FavoriteButton from "./FavoriteButton";

interface FavoritesListProps {
  teas: Tea[];
  editable?: boolean;
  emptyMessage?: string;
}

export default function FavoritesList({
  teas,
  editable = false,
  emptyMessage = "No favorites yet.",
}: FavoritesListProps) {
  if (teas.length === 0) {
    return <p className="text-sm text-text-muted">{emptyMessage}</p>;
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {teas.map((tea) => (
        <li
          key={tea.id}
          className="flex items-center justify-between gap-3 rounded-lg border border-outline bg-surface p-4"
        >
          <Link href={`/tea-library#${tea.id}`} className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 text-2xl" aria-hidden="true">
              {tea.emoji}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-semibold text-text">{tea.name}</span>
              <span className="block text-xs font-semibold tracking-wide text-text-muted uppercase">
                {tea.category}
              </span>
            </span>
          </Link>
          {editable && <FavoriteButton teaId={tea.id} teaName={tea.name} initialFavorited={true} />}
        </li>
      ))}
    </ul>
  );
}
