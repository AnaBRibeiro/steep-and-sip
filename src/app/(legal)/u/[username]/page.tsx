import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getFavoriteTeaIds } from "@/lib/favorites";
import { getTeasByIds } from "@/lib/teas";
import { getTeasCached } from "@/lib/teas.cache";
import { getRoutines } from "@/lib/routines.server";
import FavoritesList from "@/components/FavoritesList";
import RoutineList from "@/components/RoutineList";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface PublicProfilePageProps {
  params: Promise<{ username: string }>;
}

const PROFILE_COLUMNS =
  "id, username, display_name, avatar_url, bio, bio_public, website, website_public, is_public, favorites_public, routines_public";

const getPublicProfile = cache(async (username: string) => {
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select(PROFILE_COLUMNS)
    .eq("username", username)
    .maybeSingle();

  return profile;
});

export async function generateMetadata({ params }: PublicProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await getPublicProfile(username);

  if (!profile || !profile.is_public) {
    return { title: "Profile not found — Steep & Sip", robots: { index: false, follow: false } };
  }

  const name = profile.display_name || profile.username;

  return buildPageMetadata({
    title: `${name} — Steep & Sip`,
    description: `${name}'s tea profile on Steep & Sip — see favorite teas and daily tea routines.`,
    path: `/u/${profile.username}`,
  });
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params;
  const profile = await getPublicProfile(username);

  if (!profile || !profile.is_public) notFound();

  let favoriteTeas: Awaited<ReturnType<typeof getTeasByIds>> = [];
  if (profile.favorites_public) {
    const favoriteTeaIds = await getFavoriteTeaIds(profile.id);
    favoriteTeas = await getTeasByIds([...favoriteTeaIds]);
  }

  let routines: Awaited<ReturnType<typeof getRoutines>> = [];
  let teas: Awaited<ReturnType<typeof getTeasCached>> = [];
  if (profile.routines_public) {
    [routines, teas] = await Promise.all([getRoutines(profile.id), getTeasCached()]);
  }

  const displayName = profile.display_name || profile.username;

  return (
    <section className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: `@${profile.username}`, path: `/u/${profile.username}` },
        ]}
      />
      <div className="flex items-center gap-4">
        {profile.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element -- small avatar, not worth Next's image pipeline
          <img
            src={profile.avatar_url}
            alt={`${displayName}'s profile photo`}
            className="h-20 w-20 rounded-full border border-outline object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-outline bg-primary-pale text-2xl font-semibold text-primary">
            {(profile.display_name || profile.username || "?").charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="font-display text-2xl font-bold text-text sm:text-3xl">{displayName}</h1>
          <p className="text-sm text-text-muted">@{profile.username}</p>
        </div>
      </div>

      {profile.bio_public && profile.bio && <p className="mt-6 text-text-muted">{profile.bio}</p>}

      {profile.website_public && profile.website && (
        <p className="mt-3">
          <Link
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            {profile.website}
          </Link>
        </p>
      )}

      {profile.favorites_public && (
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold text-text">Favorites</h2>
          <div className="mt-4">
            <FavoritesList teas={favoriteTeas} emptyMessage="No favorites shared yet." />
          </div>
        </div>
      )}

      {profile.routines_public && (
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold text-text">Routines</h2>
          <div className="mt-4">
            <RoutineList routines={routines} teas={teas} emptyMessage="No routines shared yet." />
          </div>
        </div>
      )}
    </section>
  );
}
