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

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6z" />
    </svg>
  );
}

export default function Testimonials() {
  const { ref, state: revealState } = useInView<HTMLDivElement>();

  return (
    <section className="bg-surface-muted px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        <div>
          <p className="text-xs font-semibold tracking-widest text-text-muted uppercase">
            Loved by tea lovers
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold text-text sm:text-3xl">
            What people are saying
          </h2>
          <p className="mt-3 text-text-muted">
            Join thousands of mindful drinkers who found their ritual with Steep &amp; Sip.
          </p>
          <div className="mt-5 flex gap-1 text-primary" aria-hidden="true">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
        </div>

        <div ref={ref} className="flex flex-col gap-5">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              style={{ animationDelay: `${index * 120}ms` }}
              className={`entrance-on-scroll rounded-lg border border-outline bg-surface p-6 ${
                revealState !== "idle" ? revealState : ""
              }`}
            >
              <span className="font-display text-4xl text-primary-pale" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="-mt-3 text-sm text-text">{testimonial.quote}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-pale text-sm font-semibold text-primary"
                >
                  {initials(testimonial.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text">{testimonial.name}</span>
                  <span className="block text-xs text-text-muted">{testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
