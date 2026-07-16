"use client";

import { useId, useState } from "react";
import { questions } from "@/lib/quiz";
import { useFadeNavigate } from "@/lib/useFadeNavigate";
import { QuizAnswers } from "@/lib/types";

type PartialAnswers = Partial<Record<keyof QuizAnswers, string>>;

interface QuizFlowProps {
  onComplete: (answers: QuizAnswers) => void;
  onCancel: () => void;
}

export default function QuizFlow({ onComplete, onCancel }: QuizFlowProps) {
  const { value: stepIndex, visible, navigate: navigateStep } = useFadeNavigate(0);
  const [answers, setAnswers] = useState<PartialAnswers>({});
  const groupName = useId();

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
      onComplete(answers as QuizAnswers);
    } else {
      navigateStep(stepIndex + 1);
    }
  }

  function handleBack() {
    if (stepIndex === 0) {
      onCancel();
    } else {
      navigateStep(stepIndex - 1);
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-primary/10"
        role="progressbar"
        aria-valuenow={stepIndex + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Question ${stepIndex + 1} of ${total}`}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${((stepIndex + 1) / total) * 100}%` }}
        />
      </div>
      <p className="mt-3 text-sm font-medium text-text/50">
        Step {stepIndex + 1} of {total}
      </p>

      <form
        className={`page-transition ${visible ? "is-visible" : "is-hidden"}`}
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <fieldset className="mt-4">
          <legend className="font-display text-2xl font-semibold text-text sm:text-3xl">
            {question.question}
          </legend>
          <p className="mt-2 text-text/60">{question.helper}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {question.options.map((option) => {
              const inputId = `${groupName}-${question.id}-${option.value}`;
              const isChecked = selected === option.value;
              return (
                <label
                  key={option.value}
                  htmlFor={inputId}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 bg-surface p-4 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-accent ${
                    isChecked ? "border-primary" : "border-primary/15 hover:border-primary/40"
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
                    <span className="block text-sm text-text/60">{option.description}</span>
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
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-text/60 transition-colors hover:text-text"
          >
            {stepIndex === 0 ? "Cancel" : "Back"}
          </button>
          <button
            type="submit"
            disabled={!selected}
            className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
          >
            {isLast ? "Get My Tea Routine" : "Next"}
          </button>
        </div>
      </form>
    </section>
  );
}
