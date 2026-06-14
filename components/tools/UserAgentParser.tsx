"use client";

import { useState, useEffect } from "react";

interface ParsedUA {
  browser: string;
  os: string;
  device: string;
  engine: string;
}

function parseUAString(ua: string): ParsedUA {
  if (!ua) return { browser: "Unknown", os: "Unknown", device: "Unknown", engine: "Unknown" };

  let browser = "Unknown";
  let os = "Unknown";
  let device = "Desktop";
  let engine = "Unknown";

  // Engine
  if (/webkit/i.test(ua)) engine = "WebKit";
  else if (/gecko/i.test(ua)) engine = "Gecko";
  else if (/trident/i.test(ua)) engine = "Trident";
  else if (/presto/i.test(ua)) engine = "Presto";

  // OS
  if (/windows/i.test(ua)) os = "Windows";
  else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/linux/i.test(ua)) os = "Linux";

  // Device
  if (/mobile/i.test(ua)) device = "Mobile";
  if (/ipad|tablet/i.test(ua)) device = "Tablet";

  // Browser
  if (/edg/i.test(ua)) browser = "Microsoft Edge";
  else if (/chrome|crios/i.test(ua) && !/opr|opios|edg/i.test(ua)) browser = "Google Chrome";
  else if (/safari/i.test(ua) && !/chrome|crios|opr|opios|edg/i.test(ua)) browser = "Apple Safari";
  else if (/firefox|fxios/i.test(ua)) browser = "Mozilla Firefox";
  else if (/opr|opera/i.test(ua)) browser = "Opera";
  else if (/trident|msie/i.test(ua)) browser = "Internet Explorer";

  return { browser, os, device, engine };
}

export default function UserAgentParser() {
  const [uaString, setUaString] = useState("");
  const [parsed, setParsed] = useState<ParsedUA | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUA = navigator.userAgent;
      setUaString(currentUA);
      setParsed(parseUAString(currentUA));
    }
  }, []);

  const handleParse = () => {
    setParsed(parseUAString(uaString));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
          User Agent String
        </label>
        <textarea
          className="input w-full font-mono text-sm"
          rows={4}
          placeholder="Paste user agent string here…"
          value={uaString}
          onChange={(e) => setUaString(e.target.value)}
        />
      </div>

      <button className="btn self-start" onClick={handleParse}>
        Parse User Agent
      </button>

      {parsed && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Browser", value: parsed.browser },
            { label: "Operating System", value: parsed.os },
            { label: "Device Type", value: parsed.device },
            { label: "Layout Engine", value: parsed.engine },
          ].map((item) => (
            <div key={item.label} className="bg-[var(--surface-2)] p-4 rounded-xl text-center border border-[var(--border)]">
              <div className="text-xs text-[var(--text-muted)] mb-1 uppercase font-semibold">{item.label}</div>
              <div className="text-lg font-bold text-[var(--text-primary)]">{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
