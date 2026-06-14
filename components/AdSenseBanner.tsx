"use client";

import { useEffect, useRef } from "react";

interface Props {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

// Only renders the real ad unit if NEXT_PUBLIC_ADSENSE_CLIENT is set.
// Otherwise shows a styled placeholder (development mode).
export function AdSenseBanner({ slot, format = "auto", className = "" }: Props) {
  const adRef = useRef<HTMLModElement>(null);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!client) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [client]);

  if (!client) {
    // Dev placeholder — shows where the ad will appear
    return (
      <div
        className={className}
        style={{
          background: "rgba(124,110,255,0.04)",
          border: "1px dashed rgba(124,110,255,0.2)",
          borderRadius: "12px",
          padding: "16px",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "12px",
        }}
      >
        📢 Ad slot: {slot} (AdSense pending approval)
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
