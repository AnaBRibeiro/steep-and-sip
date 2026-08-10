import { ImageResponse } from "next/og";

export const alt = "Steep & Sip — Find Your Tea Routine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9f7f2",
          backgroundImage: "linear-gradient(135deg, #e8eee9 0%, #f9f7f2 65%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 140 }}>🍃</div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            color: "#2d2d2d",
            marginTop: 12,
          }}
        >
          Steep &amp; Sip
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#4a654f",
            marginTop: 20,
          }}
        >
          Find Your Perfect Tea Routine
        </div>
      </div>
    ),
    { ...size }
  );
}
