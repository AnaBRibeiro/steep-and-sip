interface HeroProps {
  onStart: () => void;
}

const steps = [
  {
    emoji: "📝",
    title: "Answer 5 quick questions",
    body: "Your goal, caffeine preference, timing, flavor, and ritual style.",
  },
  {
    emoji: "🍵",
    title: "Get matched instantly",
    body: "No sign-up — just a routine generated on the spot.",
  },
  {
    emoji: "🌤️",
    title: "Sip through your day",
    body: "Receive a full morning, afternoon, and evening tea routine.",
  },
];

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
          <span aria-hidden="true">🌱</span> No account. Just tea.
        </p>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-text sm:text-5xl lg:text-6xl">
          Find your perfect{" "}
          <span className="italic text-primary">tea routine</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-text/70 sm:text-xl">
          Answer a few questions about how you want to feel, and we&apos;ll steep
          together a routine matched to your goals, taste, and time of day.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onStart}
            className="w-full rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-secondary focus-visible:outline-3 focus-visible:outline-accent sm:w-auto"
          >
            Start the Quiz
          </button>
          <span className="text-sm text-text/50">Takes less than 30 seconds</span>
        </div>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border border-primary/10 bg-surface/70 p-6 text-center shadow-sm"
          >
            <span className="text-3xl" aria-hidden="true">
              {step.emoji}
            </span>
            <h2 className="mt-3 font-display text-lg font-semibold text-secondary">
              {step.title}
            </h2>
            <p className="mt-2 text-sm text-text/70">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
