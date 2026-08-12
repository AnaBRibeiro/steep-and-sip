"use client";

import { useCallback, useRef, useState } from "react";

const FADE_MS = 220;

function fadeDuration(): number {
  if (typeof window === "undefined") return 0;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : FADE_MS;
}

/**
 * Swaps `value` via a fade-out -> swap (+ scroll to top) -> fade-in sequence,
 * so the visible jump happens while content is hidden instead of mid-frame.
 */
export function useFadeNavigate<T>(initialValue: T) {
  const [value, setValue] = useState(initialValue);
  const [visible, setVisible] = useState(true);
  const nextValue = useRef(initialValue);

  const navigate = useCallback((next: T) => {
    nextValue.current = next;
    setVisible(false);
    window.setTimeout(() => {
      setValue(nextValue.current);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setVisible(true);
    }, fadeDuration());
  }, []);

  /** Sets the value immediately, with no fade — for correcting the initial view before first paint. */
  const jumpTo = useCallback((next: T) => {
    nextValue.current = next;
    setValue(next);
  }, []);

  return { value, visible, navigate, jumpTo } as const;
}
