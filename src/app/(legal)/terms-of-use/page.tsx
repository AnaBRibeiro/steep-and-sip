import type { Metadata } from "next";
import LegalPage, { LegalHeading, LegalParagraph, LegalList } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use — Steep & Sip",
  description: "The terms that govern your use of Steep & Sip.",
};

export default function TermsOfUsePage() {
  return (
    <LegalPage title="Terms of Use" updated="July 22, 2026">
      <LegalParagraph>
        Welcome to Steep &amp; Sip. By using this website, you agree to the terms below. If you
        don&apos;t agree with them, please don&apos;t use the site.
      </LegalParagraph>

      <LegalHeading>What Steep &amp; Sip is</LegalHeading>
      <LegalParagraph>
        Steep &amp; Sip is a free web app that suggests a personalized tea routine based on
        answers you give in a short quiz. There&apos;s no account, no sign-up, and no purchase
        involved — the quiz runs entirely in your browser and doesn&apos;t save your answers
        anywhere.
      </LegalParagraph>

      <LegalHeading>Not medical advice</LegalHeading>
      <LegalParagraph>
        The recommendations you receive are for general wellness inspiration only. They are not
        medical, dietary, or professional advice, and shouldn&apos;t be treated as a substitute
        for guidance from a qualified health professional — especially if you are pregnant,
        managing a health condition, or sensitive to caffeine.
      </LegalParagraph>

      <LegalHeading>Acceptable use</LegalHeading>
      <LegalParagraph>When using this site, please don&apos;t:</LegalParagraph>
      <LegalList>
        <li>Attempt to disrupt, overload, or gain unauthorized access to the site or its infrastructure.</li>
        <li>Use automated tools to scrape or misuse the site beyond normal browsing.</li>
        <li>Use the site for any unlawful purpose.</li>
      </LegalList>

      <LegalHeading>Intellectual property</LegalHeading>
      <LegalParagraph>
        The Steep &amp; Sip name, design, and content are provided as-is for your personal,
        non-commercial use while browsing the site. You&apos;re welcome to share a link to the
        site, but please don&apos;t reproduce or redistribute its content without permission.
      </LegalParagraph>

      <LegalHeading>No warranty</LegalHeading>
      <LegalParagraph>
        Steep &amp; Sip is provided &ldquo;as is,&rdquo; without warranties of any kind. We do our
        best to keep the site accurate and available, but we don&apos;t guarantee it will be
        error-free, uninterrupted, or perfectly suited to your needs.
      </LegalParagraph>

      <LegalHeading>Limitation of liability</LegalHeading>
      <LegalParagraph>
        To the fullest extent permitted by law, Steep &amp; Sip isn&apos;t liable for any damages
        arising from your use of the site or reliance on its tea recommendations.
      </LegalParagraph>

      <LegalHeading>Changes to these terms</LegalHeading>
      <LegalParagraph>
        We may update these terms from time to time. Changes will be posted on this page with an
        updated date above.
      </LegalParagraph>

      <LegalHeading>Contact</LegalHeading>
      <LegalParagraph>
        Questions about these terms? Reach out through the contact details provided on this
        website.
      </LegalParagraph>
    </LegalPage>
  );
}
