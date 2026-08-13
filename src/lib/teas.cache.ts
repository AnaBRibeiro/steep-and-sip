import "server-only";
import { unstable_cache } from "next/cache";
import { getTeas } from "./teas";

/**
 * The tea catalog barely changes (only admin edits touch it), but `/` and `/tea-library` were
 * hitting the database for the full list on every single request. Cached here instead, tagged
 * "teas" so admin/teas/actions.ts can invalidate it immediately on create/update/delete.
 */
export const getTeasCached = unstable_cache(getTeas, ["teas"], {
  tags: ["teas"],
  revalidate: 300,
});
