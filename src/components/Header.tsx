interface HeaderProps {
  onLogoClick?: () => void;
}

export default function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="w-full border-b border-primary/10 bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onLogoClick}
          className="flex items-center gap-2 rounded-md text-left"
          aria-label="Steep & Sip home"
        >
          <span className="text-2xl" aria-hidden="true">
            🍃
          </span>
          <span className="font-display text-xl font-semibold text-secondary sm:text-2xl">
            Steep &amp; Sip
          </span>
        </button>
        <span className="hidden text-sm font-medium text-text/60 sm:block">
          Your personal tea routine, brewed in minutes
        </span>
      </div>
    </header>
  );
}
