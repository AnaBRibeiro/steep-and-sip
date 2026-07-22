interface ContentPageProps {
  title: string;
  intro?: string;
  maxWidthClassName?: string;
  children: React.ReactNode;
}

export default function ContentPage({
  title,
  intro,
  maxWidthClassName = "max-w-3xl",
  children,
}: ContentPageProps) {
  return (
    <section className={`mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 ${maxWidthClassName}`}>
      <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">{title}</h1>
      {intro && <p className="mt-3 max-w-2xl text-text-muted">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
