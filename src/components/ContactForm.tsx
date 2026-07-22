"use client";

import { useState } from "react";

const CONTACT_EMAIL = "hello@steepandsip.app";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Message from ${name || "the Steep & Sip site"}`;
    const body = `${message}\n\n— ${name} (${email})`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-text">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-lg border border-outline bg-surface px-4 py-2.5 text-text"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-text">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-lg border border-outline bg-surface px-4 py-2.5 text-text"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-text">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full resize-y rounded-lg border border-outline bg-surface px-4 py-2.5 text-text"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover"
      >
        Send Message
      </button>

      <p className="text-xs text-text-muted">
        Prefer email directly?{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">
          {CONTACT_EMAIL}
        </a>
      </p>
    </form>
  );
}
