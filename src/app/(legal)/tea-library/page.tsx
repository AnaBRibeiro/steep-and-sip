import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import Newsletter from "@/components/Newsletter";
import FavoriteButton from "@/components/FavoriteButton";
import GuestFavoriteHint from "@/components/GuestFavoriteHint";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTeasCached } from "@/lib/teas.cache";
import { getFavoriteTeaIds } from "@/lib/favorites";
import { getUser } from "@/lib/auth/dal";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tea Library — Steep & Sip",
  description:
    "Browse our full tea library — green, black, herbal, and more — with caffeine levels, steep times, and tasting notes.",
  path: "/tea-library",
});

export const dynamic = "force-dynamic";

const CAFFEINE_LABELS: Record<string, string> = {
  none: "Caffeine-free",
  low: "Low caffeine",
  medium: "Medium caffeine",
  high: "High caffeine",
};

export default async function TeaLibraryPage() {
  const [teas, user] = await Promise.all([getTeasCached(), getUser()]);
  const favoriteTeaIds = user ? await getFavoriteTeaIds(user.id) : new Set<string>();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Tea Library", path: "/tea-library" }]} />
      <ContentPage
        title="The Teas We Recommend"
        intro="Every tea that can show up in your quiz results, all in one place — with what to expect from each cup."
        maxWidthClassName="max-w-5xl"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teas.map((tea) => (
            <div
              key={tea.id}
              id={tea.id}
              className="scroll-mt-24 rounded-lg border border-outline bg-surface p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-3xl" aria-hidden="true">
                  {tea.emoji}
                </span>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-primary-pale px-2.5 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
                    {CAFFEINE_LABELS[tea.caffeine]}
                  </span>
                  {user ? (
                    <FavoriteButton
                      teaId={tea.id}
                      teaName={tea.name}
                      initialFavorited={favoriteTeaIds.has(tea.id)}
                    />
                  ) : (
                    <GuestFavoriteHint />
                  )}
                </div>
              </div>
              <h2 className="mt-3 font-display text-lg font-semibold text-text">{tea.name}</h2>
              <p className="text-xs font-semibold tracking-wide text-text-muted uppercase">
                {tea.category}
              </p>
              <p className="mt-2 text-sm text-text-muted">{tea.description}</p>
              <p className="mt-3 text-xs font-medium text-text-muted">
                {tea.steepTemp} · {tea.steepTime}
              </p>
            </div>
          ))}
        </div>
      </ContentPage>
      <Newsletter />
    </>
  );
}
