export const MAX_ROUTINES = 7;

export interface RoutineRow {
  id: string;
  name: string | null;
  morning_tea_id: string | null;
  afternoon_tea_id: string | null;
  evening_tea_id: string | null;
}
