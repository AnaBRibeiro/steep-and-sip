import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { teas } from "@/lib/teas";

export const metadata: Metadata = {
  title: "Tea Guide — Steep & Sip",
  description: "Every tea Steep & Sip can recommend, with steep times and tasting notes.",
};

const CAFFEINE_LABELS: Record<string, string> = {
  none: "Caffeine-free",
  low: "Low caffeine",
  medium: "Medium caffeine",
  high: "High caffeine",
};

export default function TeaGuidePage() {
  return (
    <ContentPage
      title="The Teas We Recommend"
      intro="Every tea that can show up in your quiz results, all in one place — with what to expect from each cup."
      maxWidthClassName="max-w-5xl"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teas.map((tea) => (
          <div key={tea.id} className="rounded-lg border border-outline bg-surface p-6">
            <div className="flex items-start justify-between gap-3">
              <span className="text-3xl" aria-hidden="true">
                {tea.emoji}
              </span>
              <span className="rounded-lg bg-primary-pale px-2.5 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
                {CAFFEINE_LABELS[tea.caffeine]}
              </span>
            </div>
            <h2 className="mt-3 font-display text-lg font-semibold text-text">{tea.name}</h2>
            <p className="text-xs font-semibold tracking-wide text-text-muted uppercase">
              {tea.category}
            </p>
            <p className="mt-2 text-sm text-text-muted">{tea.description}</p>
            <p className="mt-3 text-xs font-medium text-text-muted">
              {tea.steepTemp} · {tea.steepTime}
            </p>
          </div>
        ))}
      </div>
    </ContentPage>
  );
}
