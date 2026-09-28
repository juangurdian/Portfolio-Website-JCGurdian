import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "JC Gurdian - AI Engineer, Tampa FL";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0c0c0c",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #c9a227 0%, #c9a227 40%, transparent 100%)",
          }}
        />

        {/* Status badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
            }}
          />
          <span
            style={{
              fontSize: "18px",
              color: "#a8a29e",
              letterSpacing: "0.05em",
            }}
          >
            Open to Tampa hybrid/onsite and US remote
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 600,
            color: "#f5f5f4",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
            lineHeight: 1.1,
          }}
        >
          JC Gurdian
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 500,
            color: "#c9a227",
            marginBottom: "24px",
          }}
        >
          AI Engineer @ yorCMO · Co-Founder & CTO, Gynka
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "24px",
            color: "#a8a29e",
            lineHeight: 1.5,
            maxWidth: "900px",
          }}
        >
          Production LLM agents, RAG systems, and MCP integrations for real clients.
        </div>

        {/* Bottom info */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#c9a227",
              }}
            />
            <span style={{ fontSize: "18px", color: "#78716c" }}>
              Tampa, FL
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#c9a227",
              }}
            />
            <span style={{ fontSize: "18px", color: "#78716c" }}>
              jcgurdian.io
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
