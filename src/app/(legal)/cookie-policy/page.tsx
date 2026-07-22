import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalHeading, LegalParagraph, LegalList } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy — Steep & Sip",
  description: "How Steep & Sip uses cookies.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updated="July 22, 2026">
      <LegalParagraph>
        This page explains how Steep &amp; Sip uses (and mostly doesn&apos;t use) cookies.
      </LegalParagraph>

      <LegalHeading>What are cookies?</LegalHeading>
      <LegalParagraph>
        Cookies are small text files a website can store in your browser to remember information
        between visits, such as preferences or login state.
      </LegalParagraph>

      <LegalHeading>Cookies we use</LegalHeading>
      <LegalParagraph>
        Steep &amp; Sip doesn&apos;t use cookies for tracking, analytics, or advertising. The site
        has no accounts and no preferences to remember, so it currently sets no cookies of its
        own.
      </LegalParagraph>
      <LegalParagraph>
        The infrastructure that hosts the site may set strictly necessary cookies required for
        basic security and performance (for example, to protect against abuse). These are not used
        to identify you or track your activity across other sites.
      </LegalParagraph>

      <LegalHeading>Managing cookies</LegalHeading>
      <LegalParagraph>
        Most browsers let you view, delete, or block cookies through their settings. Since this
        site doesn&apos;t rely on cookies for its core functionality, blocking them won&apos;t
        affect your ability to use the quiz.
      </LegalParagraph>
      <LegalList>
        <li>Chrome, Edge, and other Chromium browsers: Settings → Privacy and security → Cookies.</li>
        <li>Firefox: Settings → Privacy &amp; Security → Cookies and Site Data.</li>
        <li>Safari: Settings → Privacy → Manage Website Data.</li>
      </LegalList>

      <LegalHeading>Changes to this policy</LegalHeading>
      <LegalParagraph>
        If this ever changes — for example, if we add analytics in the future — we&apos;ll update
        this page and the date above, along with our{" "}
        <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </LegalParagraph>

      <LegalHeading>Contact</LegalHeading>
      <LegalParagraph>
        Questions about this policy? Reach out through the contact details provided on this
        website.
      </LegalParagraph>
    </LegalPage>
  );
}
