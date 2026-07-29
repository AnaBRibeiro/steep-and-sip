import Link from "next/link";
import TeaForm from "@/components/admin/TeaForm";
import { createTea } from "../actions";

export default function NewTeaPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/admin/teas" className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover">
        ← Back to teas
      </Link>
      <h1 className="mt-3 font-display text-3xl font-bold text-text">Add a tea</h1>
      <TeaForm action={createTea} submitLabel="Create tea" />
    </section>
  );
}
