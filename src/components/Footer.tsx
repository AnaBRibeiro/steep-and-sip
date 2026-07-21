export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-outline bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-primary">🍃 Steep &amp; Sip</p>
            <p className="mt-2 max-w-xs text-sm text-text-muted">
              Grown from good habits, brewed one cup at a time.
            </p>
          </div>
          <div className="text-sm text-text-muted sm:text-right">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              Steep &amp; Sip.
            </p>
            <p className="mt-1">For wellness inspiration only — not medical advice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
