"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getTeas } from "@/lib/teas";
import { Tea } from "@/lib/types";

function matches(tea: Tea, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    tea.name.toLowerCase().includes(q) ||
    tea.category.toLowerCase().includes(q) ||
    tea.description.toLowerCase().includes(q)
  );
}

interface TeaSearchProps {
  onOpenChange?: (open: boolean) => void;
}

export default function TeaSearch({ onOpenChange }: TeaSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [teas, setTeas] = useState<Tea[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();

    if (teas === null) {
      getTeas()
        .then(setTeas)
        .catch(() => setLoadError(true));
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        return;
      }
      // Trap Tab within the dialog: aria-modal="true" claims only this content is
      // interactive, so keyboard focus shouldn't be able to walk out into the page behind it.
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function open() {
    setIsOpen(true);
    onOpenChange?.(true);
  }

  function close() {
    setIsOpen(false);
    setQuery("");
    triggerRef.current?.focus();
    onOpenChange?.(false);
  }

  const results = teas?.filter((tea) => matches(tea, query)) ?? [];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        aria-label="Search teas"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-lg text-text transition-colors hover:text-primary"
      >
        <span className="emoji-tint-primary" aria-hidden="true">🔍</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-text/40 px-4 pt-24">
          <button
            type="button"
            aria-label="Close search"
            onClick={close}
            className="absolute inset-0 -z-10 cursor-default"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search teas"
            className="entrance w-full max-w-lg rounded-lg bg-surface p-6 shadow-ambient"
          >
            <div className="flex items-center gap-3">
              <span className="emoji-tint-primary shrink-0 text-lg text-text-muted" aria-hidden="true">
                🔍
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search teas by name, category, or flavor..."
                className="search-input w-full bg-transparent text-text placeholder:text-text-muted focus:outline-none"
              />
            </div>

            <div className="mt-4 max-h-80 space-y-1 overflow-y-auto border-t border-outline pt-4">
              {loadError && (
                <p className="py-4 text-center text-sm text-text-muted">
                  Couldn&apos;t load teas right now.
                </p>
              )}
              {!loadError && teas === null && (
                <p className="py-4 text-center text-sm text-text-muted">Loading teas…</p>
              )}
              {!loadError && teas !== null && results.length === 0 && (
                <p className="py-4 text-center text-sm text-text-muted">No teas found.</p>
              )}
              {results.map((tea) => (
                <Link
                  key={tea.id}
                  href={`/tea-library#${tea.id}`}
                  onClick={close}
                  className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-primary-pale"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {tea.emoji}
                  </span>
                  <span>
                    <span className="block font-semibold text-text">{tea.name}</span>
                    <span className="block text-xs font-semibold tracking-wide text-text-muted uppercase">
                      {tea.category}
                    </span>
                    <span className="mt-0.5 block text-sm text-text-muted">{tea.description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
