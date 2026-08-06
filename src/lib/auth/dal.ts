import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export const getUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  is_public: boolean;
  role: "user" | "admin";
}

export const getProfile = cache(async (): Promise<Profile | null> => {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, email, display_name, username, avatar_url, bio, website, is_public, role")
    .eq("id", user.id)
    .single();

  return data;
});

/** Redirects away if there's no signed-in user at all. Call from pages any signed-in user can reach. */
export async function requireUser(): Promise<User> {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  return user;
}

/** Redirects away if there's no signed-in admin. Call from admin pages/layouts. */
export async function requireAdmin(): Promise<Profile> {
  const profile = await getProfile();
  if (!profile || profile.role !== "admin") {
    redirect("/");
  }
  return profile;
}
