import type { MetadataRoute } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/tea-library`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/tea-routine-pros-and-cons`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/history-of-tea`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms-of-use`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const { data: publicProfiles } = await supabaseAdmin
    .from("profiles")
    .select("username")
    .eq("is_public", true)
    .not("username", "is", null);

  const profileRoutes: MetadataRoute.Sitemap = (publicProfiles ?? []).map((profile) => ({
    url: `${SITE_URL}/u/${profile.username}`,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...profileRoutes];
}
