import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteTea } from "./actions";

export const dynamic = "force-dynamic";

interface TeaSummary {
  id: string;
  name: string;
  emoji: string;
  category: string;
  caffeine: string;
}

export default async function AdminTeasPage() {
  const { data, error } = await supabaseAdmin
    .from("teas")
    .select("id, name, emoji, category, caffeine")
    .order("name");

  if (error) throw new Error(error.message);
  const teas = (data ?? []) as TeaSummary[];

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-text">Teas</h1>
        <Link
          href="/admin/teas/new"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover"
        >
          Add tea
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-lg border border-outline">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-muted text-xs font-semibold tracking-wide text-text-muted uppercase">
            <tr>
              <th className="px-4 py-3">Tea</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Caffeine</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teas.map((tea) => (
              <tr key={tea.id} className="border-t border-outline">
                <td className="px-4 py-3 text-text">
                  <span aria-hidden="true" className="mr-2">
                    {tea.emoji}
                  </span>
                  {tea.name}
                </td>
                <td className="px-4 py-3 text-text-muted">{tea.category}</td>
                <td className="px-4 py-3 text-text-muted">{tea.caffeine}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/teas/${tea.id}/edit`}
                    className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    action={deleteTea}
                    id={tea.id}
                    confirmLabel={`Delete ${tea.name}?`}
                    className="ml-4"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {teas.length === 0 && <p className="p-6 text-center text-sm text-text-muted">No teas yet.</p>}
      </div>
    </section>
  );
}
