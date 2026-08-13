import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildPageMetadata({
    title: "Steep & Sip — Find Your Tea Routine",
    description:
      "Take a free 30-second quiz and get a personalized tea routine matched to your goals, caffeine preference, and taste.",
    path: "/",
  }),
};

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');
// Hide the server-rendered homepage instantly if we're about to resume a saved quiz on
// reload — avoids a flash of the homepage before React swaps in the quiz. The "resume-quiz-
// pending" class is removed by AppShell once it's decided what to actually show.
if(location.pathname==='/'&&sessionStorage.getItem('steep-sip-quiz-progress')&&sessionStorage.getItem('steep-sip-quiz-view-active')==='1')document.documentElement.classList.add('resume-quiz-pending');
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-bg text-text">
        {/* Plain inline script, not next/script: beforeInteractive's execution is queued
            behind Next's own async runtime chunk and does NOT block the browser's first
            paint of the streamed SSR HTML, so it can't prevent a flash on its own. A native
            <script> tag blocks parsing/paint until it runs, which is what this needs. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {children}
        {/* Umami analytics: pageview tracking, not needed before the page is usable, so the
            default afterInteractive strategy (Next's recommended one for analytics) is fine. */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="e6aebde7-5f3a-4c58-9d30-feb9e2a35bd5"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
