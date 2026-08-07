import type { Metadata } from "next";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { requireUser } from "@/lib/auth/dal";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getFavoriteTeaIds } from "@/lib/favorites";
import { getTeas, getTeasByIds } from "@/lib/teas";
import { getRoutines } from "@/lib/routines.server";
import ProfileSettingsForm from "@/components/ProfileSettingsForm";

export const metadata: Metadata = {
  title: "My Profile — Steep & Sip",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/** Turns a name/email into a username suggestion. Deterministic per user so it stays stable across reloads. */
function suggestUsername(seed: string, userId: string): string {
  const base = seed
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 15);

  const hash = parseInt(userId.replace(/-/g, "").slice(0, 8), 16);
  const suffix = (hash % 9000) + 1000;

  return `${base || "user"}_${suffix}`.slice(0, 20);
}

export default async function MyProfilePage() {
  const user = await requireUser();

  const { data: profile, error } = await supabaseAdmin
    .from("profiles")
    .select(
      "display_name, username, avatar_url, bio, website, is_public, bio_public, website_public, favorites_public, routines_public"
    )
    .eq("id", user.id)
    .single();

  if (error) throw new Error(error.message);

  const fallbackDisplayName = getGoogleName(user) || user.email?.split("@")[0] || "";

  const initialValues = {
    ...profile,
    display_name: profile.display_name ?? fallbackDisplayName.slice(0, 40),
    username: profile.username ?? suggestUsername(fallbackDisplayName || user.email || "user", user.id),
  };

  const favoriteTeaIds = await getFavoriteTeaIds(user.id);
  const favoriteTeas = await getTeasByIds([...favoriteTeaIds]);
  const [teas, routines] = await Promise.all([getTeas(), getRoutines(user.id)]);

  return (
    <section className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">My Profile</h1>
      <p className="mt-3 text-text-muted">Edit how your profile appears.</p>
      {profile.is_public && profile.username && (
        <p className="mt-1 text-sm text-text-muted">
          Your public profile:{" "}
          <Link
            href={`/u/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            /u/{profile.username}
          </Link>
        </p>
      )}

      <ProfileSettingsForm
        initialValues={initialValues}
        favoriteTeas={favoriteTeas}
        routines={routines}
        teas={teas}
      />
    </section>
  );
}

function getGoogleName(user: User): string {
  return (user.user_metadata?.full_name as string | undefined) ?? "";
}
