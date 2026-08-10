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
            "radial-gradient(circle at 20% 20%, rgba(193,60,60,0.35), transparent 55%), radial-gradient(circle at 85% 70%, rgba(230,80,80,0.25), transparent 55%), radial-gradient(circle at 60% 100%, rgba(122,32,32,0.35), transparent 55%)",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width={56} height={56} viewBox="0 0 744 744" style={{ display: "flex" }}>
            <path
              fill="#C13C3C"
              d="M335 611l176 0 138 0 -6 -154 -118 -79 -190 233zm300 -370l-79 98 85 56 -6 -154zm-551 357l-10 13 104 0 104 0 208 -256 -136 -91 -127 158 -143 176zm549 -419l37 -46 -263 66 -21 26 136 91 111 -137z"
            />
          </svg>
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
          Your brand, impossible to miss.
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#a3a1b5" }}>
          Premium billboards across Bangalore
        </div>
      </div>
    ),
    { ...size }
  );
}
