"use client";

import { useInView } from "@/lib/useInView";

interface ClosingCtaProps {
  onStart: () => void;
}

export default function ClosingCta({ onStart }: ClosingCtaProps) {
  const { ref, state: revealState } = useInView<HTMLDivElement>();

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className={`entrance-on-scroll mx-auto max-w-4xl px-6 py-16 text-center sm:px-12 sm:py-24 ${
          revealState !== "idle" ? revealState : ""
        }`}
      >
        <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
          Your tea routine is one quiz away
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-text-muted">
          Experience the serenity of a personalized blend and ritual, brewed specifically for
          your day.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="mt-8 rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-3 focus-visible:outline-primary"
        >
          Start the Quiz
        </button>
      </div>
    </section>
  );
}
