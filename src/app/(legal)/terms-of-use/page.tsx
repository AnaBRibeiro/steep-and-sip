import type { Metadata } from "next";
import LegalPage, { LegalHeading, LegalParagraph, LegalList } from "@/components/LegalPage";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use — Steep & Sip",
  description: "The terms and conditions that govern your use of the Steep & Sip website.",
  path: "/terms-of-use",
});

export default function TermsOfUsePage() {
  return (
    <LegalPage title="Terms of Use" updated="August 2026">
      <BreadcrumbJsonLd
        items={[{ name: "Home", path: "/" }, { name: "Terms of Use", path: "/terms-of-use" }]}
      />
      <LegalParagraph>
        Welcome to Steep &amp; Sip. By using this website, you agree to the terms below. If you
        don&apos;t agree with them, please don&apos;t use the site.
      </LegalParagraph>

      <LegalHeading>What Steep &amp; Sip is</LegalHeading>
      <LegalParagraph>
        Steep &amp; Sip is a free web app that suggests a personalized tea routine based on
        answers you give in a short quiz. No account or purchase is required to use the quiz — it
        runs entirely in your browser and doesn&apos;t save your answers anywhere. Signing in with
        Google is optional and unlocks extra features like Favorites, saved Routines, and a
        shareable public profile.
      </LegalParagraph>

      <LegalHeading>Accounts</LegalHeading>
      <LegalParagraph>
        To sign in, you use your Google account. You&apos;re responsible for any activity that
        happens under your account, and for keeping your Google account secure. Your display name
        and username must not impersonate someone else, or be misleading, offensive, or unlawful.
        We may suspend or remove an account that violates these terms.
      </LegalParagraph>

      <LegalHeading>Public profiles and your content</LegalHeading>
      <LegalParagraph>
        If you choose to make your profile public, you&apos;re responsible for what you share in
        it (display name, profile image, bio, link, favorites, and routines). Don&apos;t use it to
        post anything
        illegal, abusive, or that infringes someone else&apos;s rights. We may remove public
        content, or turn a profile private, if it violates these terms.
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
        <li>Use automated tools to scrape or misuse the site, or to create accounts, beyond normal browsing.</li>
        <li>Access or attempt to access another user&apos;s account or private profile data.</li>
        <li>Use the site for any unlawful purpose.</li>
      </LegalList>

      <LegalHeading>Intellectual property</LegalHeading>
      <LegalParagraph>
        The Steep &amp; Sip name, design, and content are provided as-is for your personal,
        non-commercial use while browsing the site. You&apos;re welcome to share a link to the
        site, but please don&apos;t reproduce or redistribute its content without permission. You
        retain ownership of anything you add to your profile (name, bio, photo, etc.), and by
        making it public you allow us to display it on the site as part of the service.
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
