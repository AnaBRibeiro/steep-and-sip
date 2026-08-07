import "server-only";
import { supabaseAdmin } from "./supabaseAdmin";

export async function getFavoriteTeaIds(userId: string): Promise<Set<string>> {
  const { data, error } = await supabaseAdmin.from("favorites").select("tea_id").eq("user_id", userId);

  if (error) throw new Error(error.message);

  return new Set((data ?? []).map((row) => row.tea_id as string));
}
