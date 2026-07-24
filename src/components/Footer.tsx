import Link from "next/link";

const exploreLinks = [
  { href: "/tea-guide", label: "Tea Guide" },
  { href: "/tea-routine-pros-and-cons", label: "Pros & Cons" },
  { href: "/history-of-tea", label: "History of Tea" },
];

const contactLinks = [{ href: "/contact", label: "Send a Message" }];

const legalLinks = [
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-outline bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-primary">
              <span aria-hidden="true">🍃</span> Steep &amp; Sip
            </p>
            <p className="mt-2 max-w-xs text-sm text-text-muted">
              Grown from good habits, brewed one cup at a time.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest text-text-muted uppercase">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-muted transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest text-text-muted uppercase">Contact</p>
            <ul className="mt-3 space-y-2 text-sm">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-muted transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest text-text-muted uppercase">Legal</p>
            <ul className="mt-3 space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-muted transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-outline pt-6 text-sm text-text-muted sm:flex sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            Steep &amp; Sip.
          </p>
          <p className="mt-1 sm:mt-0">For wellness inspiration only — not medical advice.</p>
        </div>
      </div>
    </footer>
  );
}
