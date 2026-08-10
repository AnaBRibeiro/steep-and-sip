"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
          <p className="text-6xl" aria-hidden="true">
            🫖💥
          </p>
          <h1 className="mt-6 font-display text-3xl font-bold text-text sm:text-4xl">
            Something spilled
          </h1>
          <p className="mt-3 text-text-muted">
            We hit an unexpected error while brewing this page. It&apos;s on our end, not yours —
            please try again in a moment.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-3 focus-visible:outline-primary"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex rounded-lg border border-outline px-7 py-3 text-sm font-semibold text-text transition-colors duration-200 hover:bg-primary-pale"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
