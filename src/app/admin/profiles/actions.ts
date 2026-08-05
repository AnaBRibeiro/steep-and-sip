"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/dal";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function updateProfileRole(formData: FormData) {
  const currentAdmin = await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const role = String(formData.get("role") ?? "");

  if (!id || (role !== "user" && role !== "admin")) {
    throw new Error("Invalid profile update.");
  }

  if (id === currentAdmin.id) {
    throw new Error("You can't change your own role.");
  }

  const { error } = await supabaseAdmin.from("profiles").update({ role }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/profiles");
}
