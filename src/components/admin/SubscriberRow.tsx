"use client";

import { useState, useTransition } from "react";
import DeleteButton from "./DeleteButton";

interface Subscriber {
  id: string;
  first_name: string;
  email: string;
  created_at: string;
}

interface SubscriberRowProps {
  subscriber: Subscriber;
  onUpdate: (formData: FormData) => void | Promise<void>;
  onDelete: (formData: FormData) => void | Promise<void>;
}

export default function SubscriberRow({ subscriber, onUpdate, onDelete }: SubscriberRowProps) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const formattedDate = new Date(subscriber.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (editing) {
    return (
      <tr className="border-t border-outline">
        <td className="px-4 py-3" colSpan={4}>
          <form
            action={(formData) => {
              startTransition(async () => {
                await onUpdate(formData);
                setEditing(false);
              });
            }}
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <input type="hidden" name="id" value={subscriber.id} />
            <div className="flex-1">
              <label className="block text-xs font-semibold text-text-muted uppercase">First name</label>
              <input
                name="first_name"
                type="text"
                required
                defaultValue={subscriber.first_name}
                className="mt-1 w-full rounded-lg border border-outline bg-surface px-3 py-2 text-text"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-text-muted uppercase">Email</label>
              <input
                name="email"
                type="email"
                required
                defaultValue={subscriber.email}
                className="mt-1 w-full rounded-lg border border-outline bg-surface px-3 py-2 text-text"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover disabled:opacity-40"
              >
                {isPending ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-lg border border-outline px-4 py-2 text-sm font-semibold text-text transition-colors hover:bg-primary-pale"
              >
                Cancel
              </button>
            </div>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-t border-outline">
      <td className="px-4 py-3 text-text">{subscriber.first_name}</td>
      <td className="px-4 py-3 text-text">{subscriber.email}</td>
      <td className="px-4 py-3 text-text-muted">{formattedDate}</td>
      <td className="px-4 py-3 text-right">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Edit
        </button>
        <DeleteButton
          action={onDelete}
          id={subscriber.id}
          confirmLabel={`Delete ${subscriber.email}?`}
          className="ml-4"
        />
      </td>
    </tr>
  );
}
