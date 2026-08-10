import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact — Steep & Sip",
  description:
    "Contact Steep & Sip with questions about tea routines, recommendations, or your account.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">Get in Touch</h1>
      <p className="mt-3 text-text-muted">
        Question, feedback, or just want to talk tea? Send us a message.
      </p>
      <ContactForm />
    </section>
  );
}
