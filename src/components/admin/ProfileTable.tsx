"use client";

import { useState } from "react";
import RoleSelect from "./RoleSelect";

interface ProfileRow {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  created_at: string;
}

interface ProfileTableProps {
  profiles: ProfileRow[];
  currentAdminId: string;
  onUpdateRole: (formData: FormData) => void | Promise<void>;
}

export default function ProfileTable({ profiles, currentAdminId, onUpdateRole }: ProfileTableProps) {
  const [query, setQuery] = useState("");

  const filtered = profiles.filter((profile) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (profile.display_name ?? "").toLowerCase().includes(q) ||
      profile.email.toLowerCase().includes(q)
    );
  });

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
          placeholder="Search profiles by name or email..."
          aria-label="Search profiles"
          className="w-full rounded-lg border border-outline bg-surface py-2.5 pr-4 pl-10 text-text"
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-outline">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-muted text-xs font-semibold tracking-wide text-text-muted uppercase">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((profile) => {
              const joined = new Date(profile.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <tr key={profile.id} className="border-t border-outline">
                  <td className="px-4 py-3 text-text">
                    <div className="flex items-center gap-2">
                      {profile.avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element -- small external avatar
                        <img
                          src={profile.avatar_url}
                          alt=""
                          className="h-7 w-7 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-pale text-xs font-semibold text-primary"
                        >
                          {(profile.display_name || profile.email).charAt(0).toUpperCase()}
                        </span>
                      )}
                      {profile.display_name || <span className="text-text-muted">—</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{profile.email}</td>
                  <td className="px-4 py-3 text-text-muted">{joined}</td>
                  <td className="px-4 py-3">
                    <RoleSelect
                      id={profile.id}
                      role={profile.role}
                      isSelf={profile.id === currentAdminId}
                      action={onUpdateRole}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="p-6 text-center text-sm text-text-muted">
            {profiles.length === 0 ? "No one has signed in yet." : "No profiles match your search."}
          </p>
        )}
      </div>
    </div>
  );
}
