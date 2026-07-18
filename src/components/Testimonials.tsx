"use client";

import { useInView } from "@/lib/useInView";

const testimonials = [
  {
    quote:
      "This turned my chaotic tea habit into an actual routine. I didn't expect a 30-second quiz to know me this well.",
    name: "Priya M.",
    role: "Home barista",
  },
  {
    quote:
      "I've tried a handful of tea apps. This is the first one that just works — no sign-up, no clutter, just my routine.",
    name: "Jonas R.",
    role: "Remote worker",
  },
  {
    quote:
      "The ritual tips are what sold me. It's not just “drink tea” — it's how to actually slow down and enjoy it.",
    name: "Amara K.",
    role: "Tea enthusiast",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default function Testimonials() {
  const { ref, state: revealState } = useInView<HTMLDivElement>();

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
            <span aria-hidden="true">💬</span> Loved by tea lovers
          </p>
          <h2 className="mt-5 font-display text-2xl font-semibold text-text sm:text-3xl">
            What people are saying
          </h2>
        </div>

        <div ref={ref} className="mt-10 grid gap-6 sm:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              style={{ animationDelay: `${index * 120}ms` }}
              className={`entrance-on-scroll flex flex-col rounded-2xl border border-primary/10 bg-surface/70 p-6 shadow-sm ${
                revealState !== "idle" ? revealState : ""
              }`}
            >
              <blockquote className="flex-1 text-sm text-text/80">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                >
                  {initials(testimonial.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text">{testimonial.name}</span>
                  <span className="block text-xs text-text/60">{testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
