import type { Metadata } from "next";
import Link from "next/link";
import AuthNav from "@/components/AuthNav";
import ThemeToggle from "@/components/ThemeToggle";
import { requireAdmin } from "@/lib/auth/dal";

export const metadata: Metadata = {
  title: "Admin — Steep & Sip",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="w-full border-b border-outline bg-surface">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-lg font-semibold text-primary">
              Admin
            </Link>
            <Link href="/admin/teas" className="text-sm font-semibold text-text-muted transition-colors hover:text-primary">
              Teas
            </Link>
            <Link
              href="/admin/newsletter"
              className="text-sm font-semibold text-text-muted transition-colors hover:text-primary"
            >
              Newsletter
            </Link>
            <Link
              href="/admin/profiles"
              className="text-sm font-semibold text-text-muted transition-colors hover:text-primary"
            >
              Profiles
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-text-muted transition-colors hover:text-primary"
            >
              View site →
            </Link>
            <ThemeToggle />
            <AuthNav />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
