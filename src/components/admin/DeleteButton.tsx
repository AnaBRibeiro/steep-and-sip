"use client";

import { useState, useTransition } from "react";

interface DeleteButtonProps {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  confirmLabel?: string;
  className?: string;
}

export default function DeleteButton({ action, id, confirmLabel, className = "" }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [failed, setFailed] = useState(false);

  return (
    <>
      <form
        action={(formData) => {
          if (confirmLabel && !confirm(confirmLabel)) return;
          startTransition(async () => {
            try {
              await action(formData);
            } catch {
              // Delete actions throw on failure (e.g. a network hiccup) - catch it here so
              // that stays a small, recoverable moment instead of crashing the whole page.
              setFailed(true);
              setTimeout(() => setFailed(false), 3000);
            }
          });
        }}
        className={`inline ${className}`}
      >
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          disabled={isPending}
          className="text-sm font-semibold text-tertiary transition-colors hover:opacity-70 disabled:opacity-40"
        >
          {isPending ? "Deleting…" : "Delete"}
        </button>
      </form>

      {failed && (
        <p
          role="alert"
          className="entrance fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-text px-4 py-2.5 text-sm font-semibold text-bg shadow-ambient"
        >
          Couldn&apos;t delete — please try again.
        </p>
      )}
    </>
  );
}
