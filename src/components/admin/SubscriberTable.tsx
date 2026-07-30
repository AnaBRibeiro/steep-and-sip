"use client";

import { useState } from "react";
import SubscriberRow from "./SubscriberRow";

interface Subscriber {
  id: string;
  first_name: string;
  email: string;
  created_at: string;
}

interface SubscriberTableProps {
  subscribers: Subscriber[];
  onUpdate: (formData: FormData) => void | Promise<void>;
  onDelete: (formData: FormData) => void | Promise<void>;
}

const dateInputClass = "rounded-lg border border-outline bg-surface px-3 py-2 text-sm text-text";

export default function SubscriberTable({ subscribers, onUpdate, onDelete }: SubscriberTableProps) {
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = subscribers.filter((subscriber) => {
    const q = query.trim().toLowerCase();
    if (
      q &&
      !subscriber.first_name.toLowerCase().includes(q) &&
      !subscriber.email.toLowerCase().includes(q)
    ) {
      return false;
    }
    const signupDate = subscriber.created_at.slice(0, 10);
    if (fromDate && signupDate < fromDate) return false;
    if (toDate && signupDate > toDate) return false;
    return true;
  });

  const hasActiveFilters = query || fromDate || toDate;

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
          placeholder="Search subscribers by name or email..."
          aria-label="Search subscribers"
          className="w-full rounded-lg border border-outline bg-surface py-2.5 pr-4 pl-10 text-text"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-text-muted">
          Signed up from
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            aria-label="Signed up from date"
            className={dateInputClass}
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-text-muted">
          to
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            aria-label="Signed up to date"
            className={dateInputClass}
          />
        </label>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFromDate("");
              setToDate("");
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
              <th className="px-4 py-3">First name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Signed up</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((subscriber) => (
              <SubscriberRow
                key={subscriber.id}
                subscriber={subscriber}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="p-6 text-center text-sm text-text-muted">
            {subscribers.length === 0 ? "No subscribers yet." : "No subscribers match your filters."}
          </p>
        )}
      </div>
    </div>
  );
}
