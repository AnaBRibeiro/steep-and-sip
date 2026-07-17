"use client";

import { useInView } from "@/lib/useInView";

interface ClosingCtaProps {
  onStart: () => void;
}

export default function ClosingCta({ onStart }: ClosingCtaProps) {
  const { ref, state: revealState } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-24 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl"
      />
      <div
        ref={ref}
        className={`entrance-on-scroll relative mx-auto max-w-3xl px-6 py-4 text-center ${
          revealState !== "idle" ? revealState : ""
        }`}
      >
        <span className="text-2xl" aria-hidden="true">
          🍃
        </span>
        <h2 className="mt-4 font-display text-xl font-semibold text-text sm:text-2xl">
          Your tea routine is one quiz away
        </h2>
        <button
          type="button"
          onClick={onStart}
          className="mt-7 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-md active:translate-y-0 focus-visible:outline-3 focus-visible:outline-accent"
        >
          Start the Quiz
        </button>
      </div>
    </section>
  );
}
