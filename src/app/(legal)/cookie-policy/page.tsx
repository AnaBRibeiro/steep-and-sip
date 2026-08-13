import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalHeading, LegalParagraph, LegalList } from "@/components/LegalPage";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Cookie Policy — Steep & Sip",
  description: "How Steep & Sip uses cookies and similar technologies on our website.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updated="August 2026">
      <BreadcrumbJsonLd
        items={[{ name: "Home", path: "/" }, { name: "Cookie Policy", path: "/cookie-policy" }]}
      />
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
        Steep &amp; Sip doesn&apos;t use cookies for advertising. We use a privacy-focused
        analytics tool to see overall traffic patterns, and it doesn&apos;t use cookies either —
        see our{" "}
        <Link
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2"
        >
          Privacy Policy
        </Link>{" "}
        for details. If you sign in with Google, we set a strictly necessary cookie to keep you
        signed in between visits and to know which account you&apos;re acting as. This cookie is
        removed when you sign out, and isn&apos;t used to track you across other sites.
      </LegalParagraph>
      <LegalParagraph>
        It also uses your browser&apos;s local storage — a similar but separate technology from
        cookies — to remember your light/dark theme choice between visits. This value stays only
        on your device, isn&apos;t sent to any server, and isn&apos;t used to identify or track
        you.
      </LegalParagraph>
      <LegalParagraph>
        The infrastructure that hosts the site may set strictly necessary cookies required for
        basic security and performance (for example, to protect against abuse). Signing in with
        Google may also involve cookies set by Google itself, governed by Google&apos;s own
        privacy policy. These are not used by us to identify you or track your activity across
        other sites.
      </LegalParagraph>

      <LegalHeading>Managing cookies</LegalHeading>
      <LegalParagraph>
        Most browsers let you view, delete, or block cookies through their settings. You can use
        the quiz without cookies, but blocking them will prevent you from staying signed in.
      </LegalParagraph>
      <LegalList>
        <li>Chrome, Edge, and other Chromium browsers: Settings → Privacy and security → Cookies.</li>
        <li>Firefox: Settings → Privacy &amp; Security → Cookies and Site Data.</li>
        <li>Safari: Settings → Privacy → Manage Website Data.</li>
      </LegalList>

      <LegalHeading>Changes to this policy</LegalHeading>
      <LegalParagraph>
        If this ever changes, we&apos;ll update this page and the date above, along with our{" "}
        <Link
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2"
        >
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
