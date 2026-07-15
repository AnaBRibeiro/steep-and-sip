export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-primary/10 bg-surface/60">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="font-display text-lg text-secondary">🍃 Steep &amp; Sip</p>
        <p className="mt-2 text-sm text-text/60">
          Grown from good habits, brewed one cup at a time.
        </p>
        <p className="mt-4 text-xs text-text/40">
          &copy; {new Date().getFullYear()} Steep &amp; Sip. For wellness inspiration only — not medical advice.
        </p>
      </div>
    </footer>
  );
}
