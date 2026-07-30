import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import TeaTable from "@/components/admin/TeaTable";
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

      <TeaTable teas={teas} onDelete={deleteTea} />
    </section>
  );
}
