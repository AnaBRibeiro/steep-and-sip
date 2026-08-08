import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalHeading, LegalParagraph, LegalList } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Steep & Sip",
  description: "How Steep & Sip handles your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 2026">
      <LegalParagraph>
        Steep &amp; Sip is built to be simple and private by design. This page explains what data
        is involved when you use the site — whether you&apos;re just taking the quiz or you&apos;ve
        created an account.
      </LegalParagraph>

      <LegalHeading>Browsing without an account</LegalHeading>
      <LegalParagraph>
        You don&apos;t need an account to use the core of the site. Your quiz answers (your goal,
        caffeine preference, timing, flavor, and ritual pace) are processed entirely in your
        browser to generate your tea routine. We don&apos;t transmit them to a server or store
        them in a database — closing or refreshing the page clears them completely.
      </LegalParagraph>

      <LegalHeading>Creating an account</LegalHeading>
      <LegalParagraph>
        Signing in with Google is optional, and unlocks a few extra things: saving teas to your
        Favorites, building and saving up to 7 of your own tea Routines, and an editable profile
        page you can choose to make public at a shareable URL. When you sign in, Google shares
        your name, email address, and profile photo with us — we never see or store your Google
        password.
      </LegalParagraph>

      <LegalHeading>Your profile data</LegalHeading>
      <LegalParagraph>
        If you create an account, we store the following, tied to your account:
      </LegalParagraph>
      <LegalList>
        <li>Your email address (from Google) — never shown publicly.</li>
        <li>A display name and username, which you can edit at any time.</li>
        <li>An optional profile photo you upload (JPG or PNG file, up to 2MB), or your Google photo.</li>
        <li>An optional short bio and link.</li>
        <li>Your Favorites (teas you&apos;ve saved) and Routines (custom tea combinations you&apos;ve built).</li>
      </LegalList>

      <LegalHeading>Public profiles</LegalHeading>
      <LegalParagraph>
        Your profile is private by default. If you turn on &ldquo;Make my profile public&rdquo; in
        My Profile, your display name and photo become visible to anyone at a public URL
        (<code className="rounded bg-primary-pale px-1 py-0.5 text-sm">/u/your-username</code>).
        Your bio, link, favorites, and routines each have their own separate toggle — none of them
        are shown publicly unless you switch them on individually. You can turn any of this off
        again at any time.
      </LegalParagraph>

      <LegalHeading>Newsletter signups</LegalHeading>
      <LegalParagraph>
        If you sign up for the newsletter, we store your first name and email address so we can
        send you updates. We don&apos;t use it for anything else, and don&apos;t sell or share it
        with third parties.
      </LegalParagraph>

      <LegalHeading>The contact form</LegalHeading>
      <LegalParagraph>
        The contact page asks for a first name, email address, and message. This form is a
        demonstration: nothing you type into it is transmitted anywhere, saved, or stored. It only
        exists in your browser while the page is open, and disappears the moment you navigate away
        or refresh.
      </LegalParagraph>

      <LegalHeading>Information we don&apos;t collect</LegalHeading>
      <LegalParagraph>Beyond what&apos;s described above, we don&apos;t ask for or collect:</LegalParagraph>
      <LegalList>
        <li>Payment information.</li>
        <li>Health records or other sensitive personal data.</li>
        <li>Your Google password.</li>
      </LegalList>

      <LegalHeading>Who can see your account information</LegalHeading>
      <LegalParagraph>
        Beyond what you choose to make public, only site administrators can see account details
        (such as your email and join date) — used solely to operate and support the site,
        such as managing the tea catalog or handling account issues.
      </LegalParagraph>

      <LegalHeading>Hosting and technical logs</LegalHeading>
      <LegalParagraph>
        Like most websites, the infrastructure that hosts Steep &amp; Sip may automatically log
        basic technical information (such as IP address and browser type) for security and
        performance purposes. We don&apos;t use this information for advertising or tracking, and
        we don&apos;t sell or share it with third parties.
      </LegalParagraph>

      <LegalHeading>Cookies and sign-in sessions</LegalHeading>
      <LegalParagraph>
        Steep &amp; Sip doesn&apos;t use cookies for tracking or advertising. If you sign in, a
        secure cookie keeps you logged in between visits. Your light/dark theme choice is saved
        via local storage (not a cookie), stays on your device, and is never sent to a server. See
        our{" "}
        <Link
          href="/cookie-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2"
        >
          Cookie Policy
        </Link>{" "}
        for details.
      </LegalParagraph>

      <LegalHeading>Deleting your account</LegalHeading>
      <LegalParagraph>
        You can sign out at any time from the account menu. To permanently delete your account and
        all associated data (profile, favorites, and routines), reach out through the contact
        details provided on this website.
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
