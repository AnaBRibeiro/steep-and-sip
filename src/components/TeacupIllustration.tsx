/**
 * Line-art teacup illustration, previously used in the Hero section before it was
 * swapped for a real photo. Kept here in case it's useful again later.
 */
export default function TeacupIllustration() {
  return (
    <svg
      viewBox="0 0 240 220"
      className="h-auto w-full max-w-xs text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M95 55c0-8 8-8 8-16s-8-8-8-16" opacity="0.45" />
      <path d="M120 55c0-8 8-8 8-16s-8-8-8-16" opacity="0.45" />
      <path d="M145 55c0-8 8-8 8-16s-8-8-8-16" opacity="0.45" />
      <path d="M60 90h120v28c0 28-27 50-60 50s-60-22-60-50z" />
      <path d="M180 100c16 0 28 11 28 24s-12 24-28 24" />
      <ellipse cx="120" cy="185" rx="78" ry="9" />
    </svg>
  );
}
