import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getFavoriteTeaIds } from "@/lib/favorites";
import { getTeasByIds } from "@/lib/teas";
import FavoritesList from "@/components/FavoritesList";

export const dynamic = "force-dynamic";

interface PublicProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params;

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select(
      "id, username, display_name, avatar_url, bio, bio_public, website, website_public, is_public, favorites_public"
    )
    .eq("username", username)
    .maybeSingle();

  if (!profile || !profile.is_public) notFound();

  let favoriteTeas: Awaited<ReturnType<typeof getTeasByIds>> = [];
  if (profile.favorites_public) {
    const favoriteTeaIds = await getFavoriteTeaIds(profile.id);
    favoriteTeas = await getTeasByIds([...favoriteTeaIds]);
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex items-center gap-4">
        {profile.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element -- small avatar, not worth Next's image pipeline
          <img
            src={profile.avatar_url}
            alt=""
            className="h-20 w-20 rounded-full border border-outline object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-outline bg-primary-pale text-2xl font-semibold text-primary">
            {(profile.display_name || profile.username || "?").charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="font-display text-2xl font-bold text-text sm:text-3xl">
            {profile.display_name || profile.username}
          </h1>
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
    </section>
  );
}
