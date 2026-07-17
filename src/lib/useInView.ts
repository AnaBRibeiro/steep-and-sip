"use client";

import { useLayoutEffect, useRef, useState } from "react";

export type RevealState = "idle" | "pending" | "revealed";

/**
 * Drives a scroll-triggered entrance. Stays "idle" (fully visible, matching the
 * server-rendered HTML) for elements already on screen at mount, so they never blink -
 * only elements actually off-screen get marked "pending" (hidden) and later "revealed"
 * (animated in) once the user scrolls them into view.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState<RevealState>("idle");

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) return;

    setState("pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("revealed");
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, state } as const;
}
