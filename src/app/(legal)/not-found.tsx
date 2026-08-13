import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found — Steep & Sip",
};

// Local to this route group so it renders inside (legal)/layout.tsx's own <main> instead of
// the root app/not-found.tsx - that file renders wrapped by whatever layout is active for the
// segment notFound() was called from, so using it here would double up (legal)'s Header/Footer.
export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
      <p className="text-6xl" aria-hidden="true">
        🍂
      </p>
      <h1 className="mt-6 font-display text-3xl font-bold text-text sm:text-4xl">
        This page has steeped away
      </h1>
      <p className="mt-3 text-text-muted">
        We couldn&apos;t find the page you were looking for. It may have been moved or never
        existed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-3 focus-visible:outline-primary"
      >
        Back to Home
      </Link>
    </section>
  );
}
