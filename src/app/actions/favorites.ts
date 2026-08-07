"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/dal";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function toggleFavorite(teaId: string): Promise<{ favorited: boolean }> {
  const user = await requireUser();

  const { data: existing } = await supabaseAdmin
    .from("favorites")
    .select("tea_id")
    .eq("user_id", user.id)
    .eq("tea_id", teaId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabaseAdmin
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("tea_id", teaId);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabaseAdmin.from("favorites").insert({ user_id: user.id, tea_id: teaId });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/tea-library");
  revalidatePath("/myprofile");

  return { favorited: !existing };
}
