import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Pros & Cons of a Tea Routine — Steep & Sip",
  description: "The upsides of building a daily tea routine, and a few things worth keeping in mind.",
};

const pros = [
  "A built-in mindfulness break — a few quiet minutes to slow down and breathe.",
  "Steady hydration throughout the day.",
  "Naturally occurring antioxidants (polyphenols) in tea leaves.",
  "For many people, gentler and steadier energy than coffee, thanks to L-theanine balancing the caffeine.",
  "A caffeine-free option for nearly any time of day, thanks to herbal infusions.",
  "Variety — different teas suit different moods and needs: focus, digestion, sleep, comfort.",
  "Low cost and low effort to start — no equipment beyond a kettle and a cup.",
  "A comforting ritual that can anchor your morning or evening.",
];

const cons = [
  "Caffeine sensitivity varies — even tea can affect sleep or cause jitters for some people.",
  "It's not a substitute for medical care or medication.",
  "Tannins can temporarily reduce iron absorption if tea is drunk alongside meals.",
  "Some herbal teas can interact with medications or aren't recommended during pregnancy — check with a doctor if unsure.",
  "Strong, frequent tea drinking can contribute to teeth staining over time.",
  "Consistency takes a little planning — steeping isn't as instant as some other drinks.",
  "Quality and taste vary a lot between brands and batches, so it can take some trial and error to find favorites.",
];

export default function ProsAndConsPage() {
  return (
    <ContentPage
      title="Pros & Cons of a Tea Routine"
      intro="Thinking about building tea into your daily rhythm? Here's an honest look at what tends to help, and what's worth keeping in mind."
      maxWidthClassName="max-w-4xl"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-primary/30 bg-primary-pale p-6">
          <h2 className="font-display text-lg font-semibold text-text">The Upsides</h2>
          <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-text-muted">
            {pros.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-outline bg-surface p-6">
          <h2 className="font-display text-lg font-semibold text-text">Worth Keeping in Mind</h2>
          <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-text-muted">
            {cons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-8 text-sm text-text-muted">
        This is general information, not medical advice. If you have a health condition or take
        medication, it&apos;s worth checking with a doctor before making any tea a daily habit.
      </p>
    </ContentPage>
  );
}
