"use client";

import Link from "next/link";

interface HeaderProps {
  onLogoClick?: () => void;
}

export default function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="w-full border-b border-primary/10 bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={onLogoClick}
          className="group flex items-center gap-2 rounded-md text-left"
          aria-label="Steep & Sip home"
        >
          <span
            className="inline-block text-2xl transition-transform duration-200 group-hover:-rotate-12 group-hover:scale-110"
            aria-hidden="true"
          >
            🍃
          </span>
          <span className="font-display text-xl font-semibold text-primary sm:text-2xl">
            Steep &amp; Sip
          </span>
        </Link>
        <span className="hidden text-sm font-medium text-text/60 sm:block">
          Your personal tea routine, brewed in minutes
        </span>
      </div>
    </header>
  );
}
