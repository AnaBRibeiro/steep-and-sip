import Link from "next/link";

export default function AdminHomePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-text">Admin</h1>
      <p className="mt-2 text-text-muted">Manage the site&apos;s newsletter subscribers and tea catalog.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/teas"
          className="rounded-lg border border-outline bg-surface p-6 transition-colors hover:border-primary/50"
        >
          <h2 className="font-display text-lg font-semibold text-text">Teas</h2>
          <p className="mt-1 text-sm text-text-muted">Add, edit, or remove teas from the catalog.</p>
        </Link>
        <Link
          href="/admin/newsletter"
          className="rounded-lg border border-outline bg-surface p-6 transition-colors hover:border-primary/50"
        >
          <h2 className="font-display text-lg font-semibold text-text">Newsletter Subscribers</h2>
          <p className="mt-1 text-sm text-text-muted">View, edit, or remove newsletter signups.</p>
        </Link>
      </div>
    </section>
  );
}
