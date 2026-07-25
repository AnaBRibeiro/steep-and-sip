"use client";

import { useState } from "react";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="entrance mt-8 rounded-lg bg-primary-pale px-6 py-4 text-sm font-semibold text-primary">
        Thanks, {firstName}! Your message has been sent — we&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-text">
          First name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
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
    </form>
  );
}
