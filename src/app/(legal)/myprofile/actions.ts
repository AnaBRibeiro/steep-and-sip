"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/dal";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png"];
const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/;

export interface UpdateProfileState {
  error?: string;
  success?: boolean;
}

export async function updateProfile(
  _prevState: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const user = await requireUser();

  const displayName = String(formData.get("display_name") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const bio = String(formData.get("bio") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();
  const isPublic = formData.get("is_public") === "on";
  const avatarFile = formData.get("avatar");
  const removeAvatar = formData.get("remove_avatar") === "true";

  if (!displayName) {
    return { error: "Display name is required." };
  }
  if (displayName.length > 40) {
    return { error: "Display name must be 40 characters or fewer." };
  }
  if (!username || !USERNAME_PATTERN.test(username)) {
    return {
      error: "Username must be 3-20 characters: lowercase letters, numbers, and underscores only.",
    };
  }
  if (bio.length > 250) {
    return { error: "Bio must be 250 characters or fewer." };
  }

  const updates: Record<string, unknown> = {
    display_name: displayName,
    username,
    bio: bio || null,
    website: website || null,
    is_public: isPublic,
  };

  if (avatarFile instanceof File && avatarFile.size > 0) {
    if (avatarFile.size > MAX_AVATAR_BYTES) {
      return { error: "Avatar must be 2MB or smaller." };
    }
    if (!ALLOWED_AVATAR_TYPES.includes(avatarFile.type)) {
      return { error: "Avatar must be a JPG or PNG image." };
    }

    const path = `${user.id}/avatar`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from("avatars")
      .upload(path, avatarFile, { upsert: true, contentType: avatarFile.type });
    if (uploadError) {
      return { error: "Couldn't upload the image. Please try again." };
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("avatars").getPublicUrl(path);
    updates.avatar_url = `${publicUrl}?v=${Date.now()}`;
  } else if (removeAvatar) {
    await supabaseAdmin.storage.from("avatars").remove([`${user.id}/avatar`]);
    updates.avatar_url = null;
  }

  const { error } = await supabaseAdmin.from("profiles").update(updates).eq("id", user.id);
  if (error) {
    if (error.code === "23505") {
      return { error: "That username is already taken." };
    }
    return { error: error.message };
  }

  revalidatePath("/myprofile");
  return { success: true };
}
