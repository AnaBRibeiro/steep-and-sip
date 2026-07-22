import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { LegalHeading, LegalParagraph } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "History of Tea — Steep & Sip",
  description: "A brief summary of how tea spread from ancient China to the rest of the world.",
};

export default function HistoryOfTeaPage() {
  return (
    <ContentPage
      title="A Brief History of Tea"
      intro="From a legendary accident in ancient China to a daily ritual for billions of people — here's the short version."
    >
      <LegalHeading>Ancient Origins in China</LegalHeading>
      <LegalParagraph>
        Legend has it that tea was discovered around 2737 BCE, when a few leaves from a wild tree
        blew into a pot of water Emperor Shennong was boiling. Whether or not that&apos;s exactly
        how it happened, tea drinking in China does stretch back thousands of years — first as a
        medicinal drink, and later as an everyday pleasure. By the Tang Dynasty (7th–10th
        century), tea culture had become sophisticated enough that the scholar Lu Yu wrote the{" "}
        <em>Cha Jing</em> (&ldquo;The Classic of Tea&rdquo;), the first known book entirely
        devoted to the subject.
      </LegalParagraph>

      <LegalHeading>Tea Reaches Japan</LegalHeading>
      <LegalParagraph>
        Buddhist monks studying in China brought tea seeds and traditions back to Japan around the
        9th century. Over the following centuries, this grew into something distinctly Japanese:
        the tea ceremony, or <em>chanoyu</em> — a slow, deliberate ritual shaped by Zen Buddhist
        ideas of mindfulness and simplicity, built around whisked matcha rather than steeped
        leaves.
      </LegalParagraph>

      <LegalHeading>Trade Routes to the West</LegalHeading>
      <LegalParagraph>
        Tea traveled along Central Asian trade routes for centuries before it ever reached Europe.
        That changed in the early 1600s, when Portuguese and Dutch traders began shipping tea back
        from China — first as a rare luxury for the wealthy, then as a fashionable drink across
        European courts.
      </LegalParagraph>

      <LegalHeading>Britain&apos;s Tea Obsession</LegalHeading>
      <LegalParagraph>
        Tea took hold in Britain in the mid-1600s and never really let go. By the 18th century it
        was a national staple, taxed heavily and traded on a massive scale by the East India
        Company. That taxation had real consequences — including, famously, the 1773 Boston Tea
        Party, where American colonists protesting &ldquo;taxation without representation&rdquo;
        dumped an entire shipment of tea into Boston Harbor.
      </LegalParagraph>

      <LegalHeading>Plantations in India and Sri Lanka</LegalHeading>
      <LegalParagraph>
        Wanting an alternative to relying on Chinese tea exports, the British East India Company
        began cultivating tea in India during the 19th century, establishing the now-famous
        growing regions of Assam and Darjeeling. Tea cultivation also took root in Ceylon (modern
        Sri Lanka), which remains one of the world&apos;s major tea producers today.
      </LegalParagraph>

      <LegalHeading>Tea Today</LegalHeading>
      <LegalParagraph>
        Today tea is the second most consumed drink in the world after water, with traditions as
        varied as Moroccan mint tea, Indian masala chai, and Argentinian yerba mate. Alongside
        those long-standing traditions, a newer wave of specialty and wellness-focused tea culture
        has grown — which is exactly the spirit Steep &amp; Sip is built in.
      </LegalParagraph>
    </ContentPage>
  );
}
