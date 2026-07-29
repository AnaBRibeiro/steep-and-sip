"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function parseTeaForm(formData: FormData) {
  return {
    id: String(formData.get("id") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    emoji: String(formData.get("emoji") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    caffeine: String(formData.get("caffeine") ?? "none"),
    flavors: formData.getAll("flavors").map(String),
    goals: formData.getAll("goals").map(String),
    times: formData.getAll("times").map(String),
    steep_temp: String(formData.get("steep_temp") ?? "").trim(),
    steep_time: String(formData.get("steep_time") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    ritual: String(formData.get("ritual") ?? "").trim(),
  };
}

function revalidateTeaPages() {
  revalidatePath("/admin/teas");
  revalidatePath("/tea-library");
  revalidatePath("/");
}

export async function createTea(formData: FormData) {
  const tea = parseTeaForm(formData);
  if (!tea.id || !tea.name) throw new Error("Id and name are required.");

  const { error } = await supabaseAdmin.from("teas").insert(tea);
  if (error) throw new Error(error.message);

  revalidateTeaPages();
  redirect("/admin/teas");
}

export async function updateTea(formData: FormData) {
  const tea = parseTeaForm(formData);
  if (!tea.id || !tea.name) throw new Error("Id and name are required.");

  const { error } = await supabaseAdmin.from("teas").update(tea).eq("id", tea.id);
  if (error) throw new Error(error.message);

  revalidateTeaPages();
  redirect("/admin/teas");
}

export async function deleteTea(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { error } = await supabaseAdmin.from("teas").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateTeaPages();
}
