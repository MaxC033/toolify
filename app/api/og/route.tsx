import { ImageResponse } from "next/og";
import toolsData from "@/data/tools.json";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const tool = slug ? toolsData.find((t) => t.slug === slug) : null;

  const title = tool ? tool.title : "Toolify — Free Online Tools";
  const description = tool
    ? tool.shortDescription
    : "Fast, free, privacy-first tools for developers, writers & designers.";
  const icon = tool ? tool.icon : "⚡";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a30 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,110,255,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(224,108,255,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top badge */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "40px",
            padding: "8px 20px",
          }}
        >
          <span style={{ fontSize: "22px" }}>⚡</span>
          <span
            style={{
              color: "#9090b0",
              fontSize: "18px",
              fontWeight: "600",
              letterSpacing: "0.05em",
            }}
          >
            toolify.vercel.app
          </span>
        </div>

        {/* Main icon */}
        <div style={{ fontSize: "80px", marginBottom: "20px" }}>{icon}</div>

        {/* Title */}
        <div
          style={{
            fontSize: tool ? "60px" : "72px",
            fontWeight: "800",
            color: "#f0f0f8",
            lineHeight: "1.1",
            marginBottom: "16px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "26px",
            color: "#9090b0",
            lineHeight: "1.4",
            maxWidth: "800px",
          }}
        >
          {description}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #7c6eff, #e06cff)",
              borderRadius: "10px",
              padding: "10px 20px",
              color: "white",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            Free · No Login Required
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
