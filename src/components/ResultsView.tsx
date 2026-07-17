"use client";

import { useMemo } from "react";
import { buildRoutine, ritualText, TIME_LABELS } from "@/lib/quiz";
import { QuizAnswers } from "@/lib/types";

interface ResultsViewProps {
  answers: QuizAnswers;
  onRetake: () => void;
  onStartOver: () => void;
}

const GOAL_LABELS: Record<QuizAnswers["goal"], string> = {
  relax: "relaxing and unwinding",
  energy: "boosting energy and focus",
  digestion: "easing digestion",
  sleep: "better sleep",
  wellness: "everyday wellness",
};

export default function ResultsView({ answers, onRetake, onStartOver }: ResultsViewProps) {
  const { primary, routine } = useMemo(() => buildRoutine(answers), [answers]);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
          <span aria-hidden="true">✨</span> Your routine is ready
        </p>
        <h1 className="mt-5 font-display text-3xl font-semibold text-text sm:text-4xl">
          Brewed for {GOAL_LABELS[answers.goal]}
        </h1>
      </div>

      <div className="entrance mt-10 rounded-3xl border border-primary/15 bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div
            style={{ animationDelay: "120ms" }}
            className="entrance flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-4xl"
          >
            <span aria-hidden="true">{primary.emoji}</span>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {primary.category} · Right now
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-text sm:text-3xl">
              {primary.name}
            </h2>
            <p className="mt-3 text-text/70">{primary.description}</p>

            <dl className="mt-5 grid grid-cols-2 gap-4 sm:max-w-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-text/50">
                  Water Temp
                </dt>
                <dd className="mt-1 font-medium text-text">{primary.steepTemp}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-text/50">
                  Steep Time
                </dt>
                <dd className="mt-1 font-medium text-text">{primary.steepTime}</dd>
              </div>
            </dl>

            <div className="mt-5 rounded-xl bg-bg p-4">
              <p className="text-sm font-semibold text-secondary">Your ritual</p>
              <p className="mt-1 text-sm text-text/70">{ritualText(primary, answers.pace)}</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-12 text-center font-display text-2xl font-semibold text-text">
        Your full-day routine
      </h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {routine.map(({ time, tea }, index) => {
          const isCurrent = time === answers.time;
          return (
            <div
              key={time}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`entrance rounded-2xl border-2 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                isCurrent ? "border-primary bg-primary/5" : "border-primary/10 bg-surface"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                {TIME_LABELS[time]}
                {isCurrent && " · You are here"}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">
                  {tea.emoji}
                </span>
                <span className="font-display text-lg font-semibold text-text">{tea.name}</span>
              </div>
              <p className="mt-2 text-sm text-text/60">{tea.category}</p>
              <p className="mt-2 text-sm text-text/70">
                {tea.steepTemp} · {tea.steepTime}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onRetake}
          className="w-full rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-md sm:w-auto"
        >
          Retake the Quiz
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="w-full rounded-full border-2 border-primary/20 px-8 py-3 text-sm font-semibold text-text/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 sm:w-auto"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
}
