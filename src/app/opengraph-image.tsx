import { ImageResponse } from "next/og";
import { company } from "@/lib/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          backgroundColor: "#050508",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(124,92,255,0.35), transparent 55%), radial-gradient(circle at 85% 70%, rgba(46,230,214,0.28), transparent 55%), radial-gradient(circle at 60% 100%, rgba(255,79,216,0.22), transparent 55%)",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              display: "flex",
              backgroundImage: "linear-gradient(135deg, #7c5cff, #2ee6d6 55%, #ff4fd8)",
            }}
          />
          <span style={{ fontSize: 34, color: "#f3f2f9", fontWeight: 700, letterSpacing: -1 }}>
            {company.name}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 64,
            fontWeight: 600,
            color: "#f3f2f9",
            textAlign: "center",
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          The city is your canvas after dark.
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#a3a1b5" }}>
          Premium digital billboards across Bangalore
        </div>
      </div>
    ),
    { ...size }
  );
}
