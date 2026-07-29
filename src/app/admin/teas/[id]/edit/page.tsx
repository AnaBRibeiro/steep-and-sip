import Link from "next/link";
import { notFound } from "next/navigation";
import TeaForm from "@/components/admin/TeaForm";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { updateTea } from "../../actions";

export const dynamic = "force-dynamic";

interface EditTeaPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTeaPage({ params }: EditTeaPageProps) {
  const { id } = await params;

  const { data: tea, error } = await supabaseAdmin
    .from("teas")
    .select(
      "id, name, emoji, category, caffeine, flavors, goals, times, steep_temp, steep_time, description, ritual"
    )
    .eq("id", id)
    .single();

  if (error || !tea) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/admin/teas" className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover">
        ← Back to teas
      </Link>
      <h1 className="mt-3 font-display text-3xl font-bold text-text">Edit {tea.name}</h1>
      <TeaForm action={updateTea} initialValues={tea} isEditing submitLabel="Save changes" />
    </section>
  );
}
