"use client";

import { useInView } from "@/lib/useInView";

interface HeroProps {
  onStart: () => void;
}

const steps = [
  {
    emoji: "📝",
    title: "Quick Assessment",
    body: "Answer a few questions about your lifestyle. We value your time as much as your calm.",
  },
  {
    emoji: "🍵",
    title: "Get matched instantly",
    body: "No sign-up — just a routine generated on the spot, for instant clarity in your daily brew.",
  },
  {
    emoji: "🌤️",
    title: "Sip through your day",
    body: "Receive a full morning, afternoon, and evening routine tailored to your energy flow.",
  },
];

export default function Hero({ onStart }: HeroProps) {
  const { ref: stepsRef, state: revealState } = useInView<HTMLDivElement>();

  return (
    <>
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="font-display text-4xl leading-tight font-bold tracking-tight text-text sm:text-5xl">
              Find your perfect <span className="italic">tea routine</span>, brewed in minutes
            </h1>
            <p className="mt-5 max-w-md text-lg text-text-muted">
              Answer a few questions about how you want to feel, and we&apos;ll steep
              together a routine matched to your goals, taste, and time of day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-3 focus-visible:outline-primary"
              >
                Take the Quiz
                <span aria-hidden="true">→</span>
              </button>
              <div className="text-xs">
                <p className="font-semibold tracking-wide text-text uppercase">No account. Just tea.</p>
                <p className="mt-0.5 text-text-muted italic">Takes less than 30s</p>
              </div>
            </div>
          </div>

          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-xl bg-surface-muted sm:block lg:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element -- serve the static file
                directly, bypassing Next's on-the-fly AVIF/WebP optimizer entirely */}
            <img
              src="/images/tea-hero.webp"
              alt="A steaming cup of tea resting on a stack of books"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-widest text-text-muted uppercase">The Process</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-text sm:text-3xl">
            Answer 5 quick questions
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-text-muted">
            Your goal, caffeine preference, timing, flavor, and ritual style — personalized for your
            life.
          </p>
        </div>

        <div ref={stepsRef} className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              style={{ animationDelay: `${index * 120}ms` }}
              className={`entrance-on-scroll rounded-lg border border-outline bg-surface p-6 ${
                revealState !== "idle" ? revealState : ""
              }`}
            >
              <span className="text-2xl" aria-hidden="true">
                {step.emoji}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
