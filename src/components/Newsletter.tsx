"use client";

import { useId, useState } from "react";
import { useInView } from "@/lib/useInView";
import { supabase } from "@/lib/supabaseClient";

const UNIQUE_VIOLATION = "23505";

export default function Newsletter() {
  const { ref, state: revealState } = useInView<HTMLDivElement>();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nameId = useId();
  const emailId = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("newsletter_signups")
      .insert({ first_name: firstName, email });

    setSubmitting(false);

    if (insertError && insertError.code !== UNIQUE_VIOLATION) {
      setError("Something went wrong — please try again.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <section className="bg-surface-muted px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div
        ref={ref}
        className={`entrance-on-scroll mx-auto max-w-xl text-center ${
          revealState !== "idle" ? revealState : ""
        }`}
      >
        <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">Stay in the loop</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-text-muted">
          Occasional notes on new teas, seasonal routines, and rituals worth trying. No spam, ever.
        </p>

        {submitted ? (
          <p className="entrance mt-8 rounded-lg bg-primary-pale px-6 py-4 text-sm font-semibold text-primary">
            You&apos;re subscribed, {firstName}! Keep an eye on your inbox.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-3 text-left sm:flex-row sm:items-end"
          >
            <div className="flex-[1.4]">
              <label htmlFor={nameId} className="block text-sm font-semibold text-text">
                First name
              </label>
              <input
                id={nameId}
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-outline bg-surface px-4 py-2.5 text-text"
              />
            </div>
            <div className="flex-[2.2]">
              <label htmlFor={emailId} className="block text-sm font-semibold text-text">
                Email
              </label>
              <input
                id={emailId}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-lg border border-outline bg-surface px-4 py-2.5 text-text"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-primary px-7 py-2.5 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}

        {error && <p className="mt-3 text-sm font-semibold text-tertiary">{error}</p>}
      </div>
    </section>
  );
}
