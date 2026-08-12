"use client";

import { useEffect, useId, useState } from "react";
import { questions, QUIZ_PROGRESS_STORAGE_KEY } from "@/lib/quiz";
import { useFadeNavigate } from "@/lib/useFadeNavigate";
import { QuizAnswers } from "@/lib/types";

type PartialAnswers = Partial<Record<keyof QuizAnswers, string>>;

interface StoredProgress {
  stepIndex: number;
  answers: PartialAnswers;
}

function loadStoredProgress(): StoredProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(QUIZ_PROGRESS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredProgress;
    if (typeof parsed.stepIndex !== "number" || parsed.stepIndex >= questions.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

interface QuizFlowProps {
  onComplete: (answers: QuizAnswers) => void;
  onCancel: () => void;
}

export default function QuizFlow({ onComplete, onCancel }: QuizFlowProps) {
  const stored = loadStoredProgress();
  const { value: stepIndex, visible, navigate: navigateStep } = useFadeNavigate(stored?.stepIndex ?? 0);
  const [answers, setAnswers] = useState<PartialAnswers>(stored?.answers ?? {});
  const groupName = useId();

  useEffect(() => {
    sessionStorage.setItem(QUIZ_PROGRESS_STORAGE_KEY, JSON.stringify({ stepIndex, answers }));
  }, [stepIndex, answers]);

  // Give the current step its own history entry so Back can return to it, without disturbing
  // the entry that was already there. Two cases land here:
  //  - Fresh start (from landing): the current entry is the plain homepage entry, so push a
  //    new one for this step — the homepage entry survives as the eventual back-stop.
  //  - Resumed after a reload: the browser already restored this exact quizStep on the current
  //    entry from before the reload, so there's nothing to do — pushing again would duplicate it.
  useEffect(() => {
    const state = window.history.state as { quizStep?: number } | null;
    if (state?.quizStep !== stepIndex) {
      window.history.pushState({ quizStep: stepIndex }, "", window.location.href);
    }
    // Intentionally only on mount: this labels whichever entry we arrived on, once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Each forward step pushes a history entry, so the browser's own Back/Forward buttons can
  // step through questions — and exit the quiz once you've gone back past question 1.
  useEffect(() => {
    function handlePopState(event: PopStateEvent) {
      const state = event.state as { quizStep?: number } | null;
      const step = state?.quizStep;
      if (typeof step === "number" && step >= 0 && step < questions.length) {
        navigateStep(step);
      } else {
        sessionStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY);
        onCancel();
      }
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigateStep, onCancel]);

  const question = questions[stepIndex];
  const total = questions.length;
  const selected = answers[question.id];
  const isLast = stepIndex === total - 1;

  function handleSelect(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function handleNext() {
    if (!selected) return;
    if (isLast) {
      sessionStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY);
      onComplete(answers as QuizAnswers);
    } else {
      window.history.pushState({ quizStep: stepIndex + 1 }, "", window.location.href);
      navigateStep(stepIndex + 1);
    }
  }

  function handleBack() {
    // Delegate to the browser so the in-app Back button and the browser's own Back
    // button behave identically — both trigger the same popstate handling above.
    window.history.back();
  }

  function handleStartOver() {
    setAnswers({});
    window.history.pushState({ quizStep: 0 }, "", window.location.href);
    navigateStep(0);
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="h-1 w-full overflow-hidden rounded-full bg-outline/40"
        role="progressbar"
        aria-valuenow={stepIndex + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Question ${stepIndex + 1} of ${total}`}
      >
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((stepIndex + 1) / total) * 100}%` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm font-medium text-text-muted">
          Step {stepIndex + 1} of {total}
        </p>
        {stepIndex > 0 && (
          <button
            type="button"
            onClick={handleStartOver}
            className="text-sm font-semibold text-text-muted transition-colors hover:text-tertiary"
          >
            Start over
          </button>
        )}
      </div>

      <form
        className={`page-transition ${visible ? "is-visible" : "is-hidden"}`}
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <fieldset className="mt-4">
          <legend className="font-display text-2xl font-bold text-text sm:text-3xl">
            {question.question}
          </legend>
          <p className="mt-2 text-text-muted">{question.helper}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {question.options.map((option) => {
              const inputId = `${groupName}-${question.id}-${option.value}`;
              const isChecked = selected === option.value;
              return (
                <label
                  key={option.value}
                  htmlFor={inputId}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border bg-surface p-4 transition duration-200 has-[:checked]:border-primary has-[:checked]:bg-primary-pale has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-primary ${
                    isChecked
                      ? "border-primary"
                      : "border-outline hover:border-primary/50 hover:shadow-ambient"
                  }`}
                >
                  <input
                    type="radio"
                    id={inputId}
                    name={question.id}
                    value={option.value}
                    checked={isChecked}
                    onChange={() => handleSelect(option.value)}
                    className="sr-only-input"
                  />
                  <span className="text-2xl" aria-hidden="true">
                    {option.emoji}
                  </span>
                  <span>
                    <span className="block font-semibold text-text">{option.label}</span>
                    <span className="block text-sm text-text-muted">{option.description}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-text-muted transition-colors hover:text-text"
          >
            {stepIndex === 0 ? "Cancel" : "Back"}
          </button>
          <button
            type="submit"
            disabled={!selected}
            className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLast ? "Get My Tea Routine" : "Next"}
          </button>
        </div>
      </form>
    </section>
  );
}
