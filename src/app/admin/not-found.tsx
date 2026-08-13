import Link from "next/link";

// Local to /admin so it renders inside admin/layout.tsx's own <main> instead of the root
// app/not-found.tsx - that file renders wrapped by whatever layout is active for the segment
// notFound() was called from, so using it here would double up the admin nav bar with the
// public site header from the root not-found page.
export default function AdminNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-bold text-text">Not found</h1>
      <p className="mt-3 text-text-muted">
        We couldn&apos;t find what you were looking for. It may have been deleted or never
        existed.
      </p>
      <Link
        href="/admin/teas"
        className="mt-8 inline-flex rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-3 focus-visible:outline-primary"
      >
        Back to Teas
      </Link>
    </section>
  );
}
