import DeleteButton from "./admin/DeleteButton";
import { deleteRoutine } from "@/app/actions/routines";
import type { Tea } from "@/lib/types";
import type { RoutineRow } from "@/lib/routines";

interface RoutineListProps {
  routines: RoutineRow[];
  teas: Tea[];
  editable?: boolean;
  emptyMessage?: string;
}

const SLOTS: {
  key: "morning_tea_id" | "afternoon_tea_id" | "evening_tea_id";
  label: string;
}[] = [
  { key: "morning_tea_id", label: "Morning" },
  { key: "afternoon_tea_id", label: "Afternoon" },
  { key: "evening_tea_id", label: "Evening" },
];

function defaultRoutineName(routine: RoutineRow): string {
  const filledSlots = SLOTS.filter(({ key }) => routine[key]).map(({ label }) => label);
  return `${filledSlots.join(" · ")} Routine`;
}

export default function RoutineList({
  routines,
  teas,
  editable = false,
  emptyMessage = "No routines yet.",
}: RoutineListProps) {
  if (routines.length === 0) {
    return <p className="text-sm text-text-muted">{emptyMessage}</p>;
  }

  const teaById = new Map(teas.map((tea) => [tea.id, tea]));

  return (
    <ul className="space-y-3">
      {routines.map((routine) => {
        const displayName = routine.name || defaultRoutineName(routine);
        return (
          <li key={routine.id} className="rounded-lg border border-outline bg-surface p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-text">{displayName}</p>
              {editable && <DeleteButton action={deleteRoutine} id={routine.id} />}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
              {SLOTS.map(({ key, label }) => {
                const teaId = routine[key];
                if (!teaId) return null;
                const tea = teaById.get(teaId);
                if (!tea) return null;
                return (
                  <span key={key}>
                    <span className="font-semibold">{label}:</span>{" "}
                    <span aria-hidden="true">{tea.emoji}</span> {tea.name}
                  </span>
                );
              })}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
