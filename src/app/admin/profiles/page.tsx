import { requireAdmin } from "@/lib/auth/dal";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import ProfileTable from "@/components/admin/ProfileTable";
import { updateProfileRole } from "./actions";

export const dynamic = "force-dynamic";

interface ProfileRow {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  created_at: string;
}

export default async function AdminProfilesPage() {
  const currentAdmin = await requireAdmin();

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("id, email, display_name, avatar_url, role, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  const profiles = (data ?? []) as ProfileRow[];

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-text">Profiles</h1>
      <p className="mt-2 text-text-muted">
        {profiles.length} {profiles.length === 1 ? "person has" : "people have"} signed in
      </p>

      <ProfileTable
        profiles={profiles}
        currentAdminId={currentAdmin.id}
        onUpdateRole={updateProfileRole}
      />
    </section>
  );
}
