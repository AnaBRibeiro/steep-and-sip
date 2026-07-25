import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalHeading, LegalParagraph, LegalList } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Steep & Sip",
  description: "How Steep & Sip handles your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 25, 2026">
      <LegalParagraph>
        Steep &amp; Sip is built to be simple and private by design. This page explains what
        little data is involved when you use the site.
      </LegalParagraph>

      <LegalHeading>No account, no database</LegalHeading>
      <LegalParagraph>
        There&apos;s no sign-up for this site. Your quiz answers (your goal, caffeine preference,
        timing, flavor, and ritual pace) are processed entirely in your browser to generate your
        tea routine. We don&apos;t transmit them to a server or store them in a database — closing
        or refreshing the page clears them completely.
      </LegalParagraph>

      <LegalHeading>The newsletter and contact forms</LegalHeading>
      <LegalParagraph>
        The newsletter signup and the contact page ask for a first name and email address (and a
        message, for contact). This site is a demonstration: nothing you type into these forms is
        transmitted anywhere, saved, or stored. It only exists in your browser while the page is
        open, and disappears the moment you navigate away or refresh.
      </LegalParagraph>

      <LegalHeading>Information we don&apos;t collect</LegalHeading>
      <LegalParagraph>
        Beyond what&apos;s typed into the forms above (and never sent anywhere), we don&apos;t ask
        for or collect:
      </LegalParagraph>
      <LegalList>
        <li>Payment information.</li>
        <li>Health records or other sensitive personal data.</li>
      </LegalList>

      <LegalHeading>Hosting and technical logs</LegalHeading>
      <LegalParagraph>
        Like most websites, the infrastructure that hosts Steep &amp; Sip may automatically log
        basic technical information (such as IP address and browser type) for security and
        performance purposes. We don&apos;t use this information for advertising or tracking, and
        we don&apos;t sell or share it with third parties.
      </LegalParagraph>

      <LegalHeading>Cookies and local storage</LegalHeading>
      <LegalParagraph>
        Steep &amp; Sip doesn&apos;t use cookies for tracking or advertising. The only thing it
        stores in your browser is your light/dark theme choice, saved via local storage (not a
        cookie) so it&apos;s remembered on your next visit. This stays on your device and is never
        sent to a server. See our{" "}
        <Link href="/cookie-policy" className="text-primary underline underline-offset-2">
          Cookie Policy
        </Link>{" "}
        for details.
      </LegalParagraph>

      <LegalHeading>Children&apos;s privacy</LegalHeading>
      <LegalParagraph>
        This site is not directed at children and doesn&apos;t knowingly collect personal
        information from anyone.
      </LegalParagraph>

      <LegalHeading>Changes to this policy</LegalHeading>
      <LegalParagraph>
        If this policy changes, we&apos;ll update this page and the date above.
      </LegalParagraph>

      <LegalHeading>Contact</LegalHeading>
      <LegalParagraph>
        Questions about this policy? Reach out through the contact details provided on this
        website.
      </LegalParagraph>
    </LegalPage>
  );
}
