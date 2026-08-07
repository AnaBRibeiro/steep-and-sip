"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/dal";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { MAX_ROUTINES } from "@/lib/routines";

export interface AddRoutineState {
  error?: string;
  success?: boolean;
}

export async function addRoutine(
  _prevState: AddRoutineState,
  formData: FormData
): Promise<AddRoutineState> {
  const user = await requireUser();

  const name = String(formData.get("name") ?? "").trim();
  const morningTeaId = String(formData.get("morning_tea_id") ?? "").trim() || null;
  const afternoonTeaId = String(formData.get("afternoon_tea_id") ?? "").trim() || null;
  const eveningTeaId = String(formData.get("evening_tea_id") ?? "").trim() || null;

  if (!morningTeaId && !afternoonTeaId && !eveningTeaId) {
    return { error: "Pick at least one tea for your routine." };
  }
  if (name.length > 40) {
    return { error: "Routine name must be 40 characters or fewer." };
  }

  const { count, error: countError } = await supabaseAdmin
    .from("routines")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);
  if (countError) return { error: countError.message };

  if ((count ?? 0) >= MAX_ROUTINES) {
    return { error: `You can save up to ${MAX_ROUTINES} routines.` };
  }

  const { error } = await supabaseAdmin.from("routines").insert({
    user_id: user.id,
    name: name || null,
    morning_tea_id: morningTeaId,
    afternoon_tea_id: afternoonTeaId,
    evening_tea_id: eveningTeaId,
  });
  if (error) return { error: error.message };

  revalidatePath("/myprofile");
  return { success: true };
}

export async function deleteRoutine(formData: FormData): Promise<void> {
  const user = await requireUser();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { error } = await supabaseAdmin
    .from("routines")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);
  if (error) throw new Error(error.message);

  revalidatePath("/myprofile");
}
