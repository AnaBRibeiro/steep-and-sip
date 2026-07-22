interface LegalPageProps {
  title: string;
  updated: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: {updated}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function LegalHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-8 font-display text-xl font-semibold text-text first:mt-0">{children}</h2>;
}

export function LegalParagraph({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 leading-relaxed text-text-muted">{children}</p>;
}

export function LegalList({ children }: { children: React.ReactNode }) {
  return <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-text-muted">{children}</ul>;
}
