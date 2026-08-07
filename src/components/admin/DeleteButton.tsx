"use client";

import { useTransition } from "react";

interface DeleteButtonProps {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  confirmLabel?: string;
  className?: string;
}

export default function DeleteButton({ action, id, confirmLabel, className = "" }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        if (confirmLabel && !confirm(confirmLabel)) return;
        startTransition(() => action(formData));
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
  );
}
