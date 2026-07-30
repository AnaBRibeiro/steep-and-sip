"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

interface TeaSummary {
  id: string;
  name: string;
  emoji: string;
  category: string;
  caffeine: string;
}

interface TeaTableProps {
  teas: TeaSummary[];
  onDelete: (formData: FormData) => void | Promise<void>;
}

const CAFFEINE_ORDER = ["none", "low", "medium", "high"];
const selectClass = "rounded-lg border border-outline bg-surface px-3 py-2 text-sm text-text";

export default function TeaTable({ teas, onDelete }: TeaTableProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [caffeine, setCaffeine] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(teas.map((tea) => tea.category))).sort(),
    [teas]
  );
  const caffeineLevels = useMemo(
    () =>
      Array.from(new Set(teas.map((tea) => tea.caffeine))).sort(
        (a, b) => CAFFEINE_ORDER.indexOf(a) - CAFFEINE_ORDER.indexOf(b)
      ),
    [teas]
  );

  const filtered = teas.filter((tea) => {
    const q = query.trim().toLowerCase();
    if (q && !tea.name.toLowerCase().includes(q) && !tea.category.toLowerCase().includes(q)) {
      return false;
    }
    if (category && tea.category !== category) return false;
    if (caffeine && tea.caffeine !== caffeine) return false;
    return true;
  });

  const hasActiveFilters = query || category || caffeine;

  return (
    <div className="mt-8">
      <div className="relative">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search teas by name or category..."
          aria-label="Search teas"
          className="w-full rounded-lg border border-outline bg-surface py-2.5 pr-4 pl-10 text-text"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-text-muted">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className={selectClass}
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-text-muted">
          Caffeine
          <select
            value={caffeine}
            onChange={(e) => setCaffeine(e.target.value)}
            aria-label="Filter by caffeine level"
            className={selectClass}
          >
            <option value="">All</option>
            {caffeineLevels.map((level) => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </label>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("");
              setCaffeine("");
            }}
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-outline">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-muted text-xs font-semibold tracking-wide text-text-muted uppercase">
            <tr>
              <th className="px-4 py-3">Tea</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Caffeine</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tea) => (
              <tr key={tea.id} className="border-t border-outline">
                <td className="px-4 py-3 text-text">
                  <span aria-hidden="true" className="mr-2">
                    {tea.emoji}
                  </span>
                  {tea.name}
                </td>
                <td className="px-4 py-3 text-text-muted">{tea.category}</td>
                <td className="px-4 py-3 text-text-muted">{tea.caffeine}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/teas/${tea.id}/edit`}
                    className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    action={onDelete}
                    id={tea.id}
                    confirmLabel={`Delete ${tea.name}?`}
                    className="ml-4"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="p-6 text-center text-sm text-text-muted">
            {teas.length === 0 ? "No teas yet." : "No teas match your filters."}
          </p>
        )}
      </div>
    </div>
  );
}
