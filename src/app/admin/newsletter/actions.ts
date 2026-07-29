"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function createSubscriber(formData: FormData) {
  const firstName = String(formData.get("first_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  if (!firstName || !email) throw new Error("First name and email are required.");

  const { error } = await supabaseAdmin.from("newsletter_signups").insert({
    first_name: firstName,
    email,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/newsletter");
}

export async function updateSubscriber(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const firstName = String(formData.get("first_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  if (!id || !firstName || !email) throw new Error("First name and email are required.");

  const { error } = await supabaseAdmin
    .from("newsletter_signups")
    .update({ first_name: firstName, email })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/newsletter");
}

export async function deleteSubscriber(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { error } = await supabaseAdmin.from("newsletter_signups").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/newsletter");
}
