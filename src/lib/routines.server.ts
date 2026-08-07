import "server-only";
import { supabaseAdmin } from "./supabaseAdmin";
import type { RoutineRow } from "./routines";

export async function getRoutines(userId: string): Promise<RoutineRow[]> {
  const { data, error } = await supabaseAdmin
    .from("routines")
    .select("id, name, morning_tea_id, afternoon_tea_id, evening_tea_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  return data ?? [];
}
