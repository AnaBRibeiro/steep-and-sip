"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface HeaderProps {
  onLogoClick?: () => void;
  onStartQuiz?: () => void;
}

const navLinks = [
  { href: "/tea-guide", label: "Tea Guide" },
  { href: "/history-of-tea", label: "History of Tea" },
];

const QUIZ_LABEL = "Brew My Routine";

export default function Header({ onLogoClick, onStartQuiz }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const quizHref = onStartQuiz ? "/" : "/?openQuiz=1";

  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

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

        <div className="hidden items-center gap-6 sm:flex">
          <Link
            href={quizHref}
            onClick={onStartQuiz}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover"
          >
            {QUIZ_LABEL}
          </Link>
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-text-muted transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center rounded-md text-text transition-colors hover:text-primary sm:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="h-6 w-6"
          >
            {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-outline bg-surface px-4 py-4 sm:hidden">
          <ul className="flex flex-col gap-1">
            <li className="mb-2">
              <Link
                href={quizHref}
                onClick={() => {
                  setMenuOpen(false);
                  onStartQuiz?.();
                }}
                className="block rounded-lg bg-primary px-2 py-2.5 text-center text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover"
              >
                {QUIZ_LABEL}
              </Link>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-sm font-semibold text-text-muted transition-colors hover:bg-primary-pale hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
