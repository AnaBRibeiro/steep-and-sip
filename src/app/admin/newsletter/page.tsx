import { supabaseAdmin } from "@/lib/supabaseAdmin";
import SubscriberTable from "@/components/admin/SubscriberTable";
import { createSubscriber, updateSubscriber, deleteSubscriber } from "./actions";

export const dynamic = "force-dynamic";

interface Subscriber {
  id: string;
  first_name: string;
  email: string;
  created_at: string;
}

export default async function AdminNewsletterPage() {
  const { data, error } = await supabaseAdmin
    .from("newsletter_signups")
    .select("id, first_name, email, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  const subscribers = (data ?? []) as Subscriber[];

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-text">Newsletter Subscribers</h1>
      <p className="mt-2 text-text-muted">
        {subscribers.length} subscriber{subscribers.length === 1 ? "" : "s"}
      </p>

      <form
        action={createSubscriber}
        className="mt-8 flex flex-col gap-3 rounded-lg border border-outline bg-surface p-5 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label htmlFor="new-first-name" className="block text-sm font-semibold text-text">
            First name
          </label>
          <input
            id="new-first-name"
            name="first_name"
            type="text"
            required
            className="mt-2 w-full rounded-lg border border-outline bg-surface px-4 py-2.5 text-text"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="new-email" className="block text-sm font-semibold text-text">
            Email
          </label>
          <input
            id="new-email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-lg border border-outline bg-surface px-4 py-2.5 text-text"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover"
        >
          Add subscriber
        </button>
      </form>

      <SubscriberTable
        subscribers={subscribers}
        onUpdate={updateSubscriber}
        onDelete={deleteSubscriber}
      />
    </section>
  );
}
