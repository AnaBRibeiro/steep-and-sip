"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#f9f7f2",
          color: "#2d2d2d",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p style={{ fontSize: "3.5rem", margin: 0 }} aria-hidden="true">
          🫖💥
        </p>
        <h1 style={{ marginTop: "1.5rem", fontSize: "1.75rem", fontWeight: 700 }}>
          Something spilled
        </h1>
        <p style={{ marginTop: "0.75rem", color: "#5c5c5c", maxWidth: "28rem" }}>
          We hit an unexpected error loading Steep &amp; Sip. It&apos;s on our end, not yours —
          please try again in a moment.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "2rem",
            borderRadius: "0.5rem",
            backgroundColor: "#4a654f",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.875rem",
            padding: "0.75rem 1.75rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
