import AppShell from "@/components/AppShell";
import { getTeasCached } from "@/lib/teas.cache";
import { getFavoriteTeaIds } from "@/lib/favorites";
import { getUser } from "@/lib/auth/dal";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [teas, user] = await Promise.all([getTeasCached(), getUser()]);
  const favoriteTeaIds = user ? await getFavoriteTeaIds(user.id) : new Set<string>();

  return <AppShell teas={teas} loggedIn={!!user} favoriteTeaIds={[...favoriteTeaIds]} />;
}
