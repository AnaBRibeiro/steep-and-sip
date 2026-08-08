"use client";

import { useActionState } from "react";
import { addRoutine, type AddRoutineState } from "@/app/actions/routines";
import type { Tea } from "@/lib/types";

interface RoutineFormProps {
  teas: Tea[];
  disabled: boolean;
  maxRoutines: number;
}

const initialState: AddRoutineState = {};

export default function RoutineForm({ teas, disabled, maxRoutines }: RoutineFormProps) {
  const [state, formAction, pending] = useActionState(addRoutine, initialState);

  if (disabled) {
    return (
      <p className="text-sm text-text-muted">
        You&apos;ve saved the maximum of {maxRoutines} routines. Delete one to add another.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-3 rounded-lg border border-outline bg-surface p-4">
      <div>
        <label htmlFor="routine_name" className="block text-sm font-semibold text-text">
          Name <span className="font-normal text-text-muted">(optional)</span>
        </label>
        <input
          id="routine_name"
          name="name"
          type="text"
          maxLength={40}
          placeholder="e.g. Weekday routine"
          className="mt-2 w-full rounded-lg border border-outline bg-bg px-4 py-2.5 text-text"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <TeaSelect label="Morning" name="morning_tea_id" teas={teas} />
        <TeaSelect label="Afternoon" name="afternoon_tea_id" teas={teas} />
        <TeaSelect label="Evening" name="evening_tea_id" teas={teas} />
      </div>

      {state.error && (
        <p className="rounded-lg bg-primary-pale px-4 py-3 text-sm font-semibold text-tertiary">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover disabled:opacity-40"
      >
        {pending ? "Saving…" : "Save routine"}
      </button>
    </form>
  );
}

function TeaSelect({ label, name, teas }: { label: string; name: string; teas: Tea[] }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold tracking-wide text-text-muted uppercase"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="mt-1 w-full rounded-lg border border-outline bg-bg px-3 py-2 text-sm text-text"
      >
        <option value="">None</option>
        {teas.map((tea) => (
          <option key={tea.id} value={tea.id}>
            {tea.emoji} {tea.name}
          </option>
        ))}
      </select>
    </div>
  );
}
