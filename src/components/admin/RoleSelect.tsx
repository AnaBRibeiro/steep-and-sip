"use client";

import { useTransition } from "react";

interface RoleSelectProps {
  id: string;
  role: "user" | "admin";
  isSelf: boolean;
  action: (formData: FormData) => void | Promise<void>;
}

export default function RoleSelect({ id, role, isSelf, action }: RoleSelectProps) {
  const [isPending, startTransition] = useTransition();

  if (isSelf) {
    return (
      <span className="text-sm text-text-muted" title="You can't change your own role">
        {role} (you)
      </span>
    );
  }

  return (
    <select
      value={role}
      disabled={isPending}
      onChange={(e) => {
        const formData = new FormData();
        formData.set("id", id);
        formData.set("role", e.target.value);
        startTransition(() => action(formData));
      }}
      aria-label="Change role"
      className="rounded-lg border border-outline bg-surface px-3 py-2 text-sm text-text disabled:opacity-40"
    >
      <option value="user">user</option>
      <option value="admin">admin</option>
    </select>
  );
}
