import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Steep & Sip",
  description: "Get in touch with Steep & Sip.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">Get in Touch</h1>
      <p className="mt-3 text-text-muted">
        Question, feedback, or just want to talk tea? Fill this in and it&apos;ll open in your
        email app, ready to send.
      </p>
      <ContactForm />
    </section>
  );
}
