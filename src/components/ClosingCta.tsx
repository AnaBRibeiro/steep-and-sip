"use client";

import { useInView } from "@/lib/useInView";

interface ClosingCtaProps {
  onStart: () => void;
}

export default function ClosingCta({ onStart }: ClosingCtaProps) {
  const { ref, state: revealState } = useInView<HTMLDivElement>();

  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-xl bg-primary">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full border border-on-primary/20"
        />
        <div
          ref={ref}
          className={`entrance-on-scroll relative px-6 py-14 text-center sm:px-12 sm:py-16 ${
            revealState !== "idle" ? revealState : ""
          }`}
        >
          <h2 className="font-display text-2xl font-bold text-on-primary sm:text-3xl">
            Your tea routine is one quiz away
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-on-primary/80">
            Experience the serenity of a personalized blend and ritual, brewed specifically for
            your day.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="mt-8 rounded-lg bg-on-primary px-7 py-3 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-bg focus-visible:outline-3 focus-visible:outline-on-primary"
          >
            Start the Quiz
          </button>
        </div>
      </div>
    </section>
  );
}
